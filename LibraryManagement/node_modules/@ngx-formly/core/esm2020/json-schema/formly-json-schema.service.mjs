import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ɵreverseDeepMerge as reverseDeepMerge, ɵgetFieldValue as getFieldValue, ɵclone as clone, ɵhasKey as hasKey, } from '@ngx-formly/core';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
// https://stackoverflow.com/a/27865285
function decimalPlaces(a) {
    if (!isFinite(a)) {
        return 0;
    }
    let e = 1, p = 0;
    while (Math.round(a * e) / e !== a) {
        e *= 10;
        p++;
    }
    return p;
}
function isEmpty(v) {
    return v === '' || v == null;
}
function isObject(v) {
    return v != null && typeof v === 'object' && !Array.isArray(v);
}
function isInteger(value) {
    return Number.isInteger ? Number.isInteger(value) : typeof value === 'number' && Math.floor(value) === value;
}
function isConst(schema) {
    return typeof schema === 'object' && (schema.hasOwnProperty('const') || (schema.enum && schema.enum.length === 1));
}
function totalMatchedFields(field) {
    if (!field.fieldGroup) {
        return hasKey(field) && getFieldValue(field) !== undefined ? 1 : 0;
    }
    const total = field.fieldGroup.reduce((s, f) => totalMatchedFields(f) + s, 0);
    if (total === 0 && hasKey(field)) {
        const value = getFieldValue(field);
        if (value === null ||
            (value !== undefined && ((field.fieldArray && Array.isArray(value)) || (!field.fieldArray && isObject(value))))) {
            return 1;
        }
    }
    return total;
}
export class FormlyJsonschema {
    toFieldConfig(schema, options) {
        return this._toFieldConfig(schema, { schema, ...(options || {}) });
    }
    _toFieldConfig(schema, { key, ...options }) {
        schema = this.resolveSchema(schema, options);
        const types = this.guessSchemaType(schema);
        let field = {
            type: types[0],
            defaultValue: schema.default,
            props: {
                label: schema.title,
                readonly: schema.readOnly,
                description: schema.description,
            },
        };
        if (key != null) {
            field.key = key;
        }
        if (!options.ignoreDefault && (schema.readOnly || options.readOnly)) {
            field.props.disabled = true;
            options = { ...options, readOnly: true };
        }
        if (options.resetOnHide) {
            field.resetOnHide = true;
        }
        if (key && options.strict) {
            this.addValidator(field, 'type', (c, f) => {
                const value = getFieldValue(f);
                if (value != null) {
                    switch (field.type) {
                        case 'string': {
                            return typeof value === 'string';
                        }
                        case 'integer': {
                            return isInteger(value);
                        }
                        case 'number': {
                            return typeof value === 'number';
                        }
                        case 'object': {
                            return isObject(value);
                        }
                        case 'array': {
                            return Array.isArray(value);
                        }
                    }
                }
                return true;
            });
        }
        if (options.shareFormControl === false) {
            field.shareFormControl = false;
        }
        if (options.ignoreDefault) {
            delete field.defaultValue;
        }
        this.addValidator(field, 'type', {
            schemaType: types,
            expression: ({ value }) => {
                if (value === undefined) {
                    return true;
                }
                if (value === null && types.indexOf('null') !== -1) {
                    return true;
                }
                switch (types[0]) {
                    case 'null': {
                        return typeof value === null;
                    }
                    case 'string': {
                        return typeof value === 'string';
                    }
                    case 'integer': {
                        return isInteger(value);
                    }
                    case 'number': {
                        return typeof value === 'number';
                    }
                    case 'object': {
                        return isObject(value);
                    }
                    case 'array': {
                        return Array.isArray(value);
                    }
                }
                return true;
            },
        });
        switch (field.type) {
            case 'number':
            case 'integer': {
                field.parsers = [(v) => (isEmpty(v) ? undefined : Number(v))];
                if (schema.hasOwnProperty('minimum')) {
                    field.props.min = schema.minimum;
                }
                if (schema.hasOwnProperty('maximum')) {
                    field.props.max = schema.maximum;
                }
                if (schema.hasOwnProperty('exclusiveMinimum')) {
                    field.props.exclusiveMinimum = schema.exclusiveMinimum;
                    this.addValidator(field, 'exclusiveMinimum', ({ value }) => isEmpty(value) || value > schema.exclusiveMinimum);
                }
                if (schema.hasOwnProperty('exclusiveMaximum')) {
                    field.props.exclusiveMaximum = schema.exclusiveMaximum;
                    this.addValidator(field, 'exclusiveMaximum', ({ value }) => isEmpty(value) || value < schema.exclusiveMaximum);
                }
                if (schema.hasOwnProperty('multipleOf')) {
                    field.props.step = schema.multipleOf;
                    this.addValidator(field, 'multipleOf', ({ value }) => {
                        if (isEmpty(value) || typeof value !== 'number' || value === 0 || schema.multipleOf <= 0) {
                            return true;
                        }
                        // https://github.com/ajv-validator/ajv/issues/652#issue-283610859
                        const multiplier = Math.pow(10, decimalPlaces(schema.multipleOf));
                        return Math.round(value * multiplier) % Math.round(schema.multipleOf * multiplier) === 0;
                    });
                }
                break;
            }
            case 'string': {
                field.parsers = [
                    (v) => {
                        if (types.indexOf('null') !== -1) {
                            v = isEmpty(v) ? null : v;
                        }
                        else if (!field.props.required) {
                            v = v === '' ? undefined : v;
                        }
                        return v;
                    },
                ];
                ['minLength', 'maxLength', 'pattern'].forEach((prop) => {
                    if (schema.hasOwnProperty(prop)) {
                        field.props[prop] = schema[prop];
                    }
                });
                break;
            }
            case 'object': {
                if (!field.fieldGroup) {
                    field.fieldGroup = [];
                }
                const { propDeps, schemaDeps } = this.resolveDependencies(schema);
                Object.keys(schema.properties || {}).forEach((property) => {
                    const isRequired = Array.isArray(schema.required) && schema.required.indexOf(property) !== -1;
                    const f = this._toFieldConfig(schema.properties[property], {
                        ...options,
                        key: property,
                        isOptional: options.isOptional || !isRequired,
                    });
                    field.fieldGroup.push(f);
                    if (isRequired || propDeps[property]) {
                        f.expressions = {
                            ...(f.expressions || {}),
                            'props.required': (f) => {
                                let parent = f.parent;
                                const model = f.fieldGroup && f.key != null ? parent.model : f.model;
                                while (parent.key == null && parent.parent) {
                                    parent = parent.parent;
                                }
                                const required = parent && parent.props ? parent.props.required : false;
                                if (!model && !required) {
                                    return false;
                                }
                                if (Array.isArray(schema.required) && schema.required.indexOf(property) !== -1) {
                                    return true;
                                }
                                return propDeps[property] && f.model && propDeps[property].some((k) => !isEmpty(f.model[k]));
                            },
                        };
                    }
                    if (schemaDeps[property]) {
                        const getConstValue = (s) => {
                            return s.hasOwnProperty('const') ? s.const : s.enum[0];
                        };
                        const oneOfSchema = schemaDeps[property].oneOf;
                        if (oneOfSchema &&
                            oneOfSchema.every((o) => o.properties && o.properties[property] && isConst(o.properties[property]))) {
                            oneOfSchema.forEach((oneOfSchemaItem) => {
                                const { [property]: constSchema, ...properties } = oneOfSchemaItem.properties;
                                field.fieldGroup.push({
                                    ...this._toFieldConfig({ ...oneOfSchemaItem, properties }, { ...options, resetOnHide: true }),
                                    expressions: {
                                        hide: (f) => !f.model || getConstValue(constSchema) !== f.model[property],
                                    },
                                });
                            });
                        }
                        else {
                            field.fieldGroup.push({
                                ...this._toFieldConfig(schemaDeps[property], options),
                                expressions: {
                                    hide: (f) => !f.model || isEmpty(f.model[property]),
                                },
                            });
                        }
                    }
                });
                if (schema.oneOf) {
                    field.fieldGroup.push(this.resolveMultiSchema('oneOf', schema.oneOf, { ...options, shareFormControl: false }));
                }
                if (schema.anyOf) {
                    field.fieldGroup.push(this.resolveMultiSchema('anyOf', schema.anyOf, options));
                }
                break;
            }
            case 'array': {
                if (schema.hasOwnProperty('minItems')) {
                    field.props.minItems = schema.minItems;
                    this.addValidator(field, 'minItems', (c, f) => {
                        const value = getFieldValue(f);
                        return isEmpty(value) || value.length >= schema.minItems;
                    });
                    if (!options.isOptional && schema.minItems > 0 && field.defaultValue === undefined) {
                        field.defaultValue = Array.from(new Array(schema.minItems));
                    }
                }
                if (schema.hasOwnProperty('maxItems')) {
                    field.props.maxItems = schema.maxItems;
                    this.addValidator(field, 'maxItems', (c, f) => {
                        const value = getFieldValue(f);
                        return isEmpty(value) || value.length <= schema.maxItems;
                    });
                }
                if (schema.hasOwnProperty('uniqueItems')) {
                    field.props.uniqueItems = schema.uniqueItems;
                    this.addValidator(field, 'uniqueItems', (c, f) => {
                        const value = getFieldValue(f);
                        if (isEmpty(value) || !schema.uniqueItems) {
                            return true;
                        }
                        const uniqueItems = Array.from(new Set(value.map((v) => JSON.stringify(v))));
                        return uniqueItems.length === value.length;
                    });
                }
                // resolve items schema needed for isEnum check
                if (schema.items && !Array.isArray(schema.items)) {
                    schema.items = this.resolveSchema(schema.items, options);
                }
                // TODO: remove isEnum check once adding an option to skip extension
                if (!this.isEnum(schema)) {
                    field.fieldArray = (root) => {
                        if (!Array.isArray(schema.items)) {
                            // When items is a single schema, the additionalItems keyword is meaningless, and it should not be used.
                            const f = schema.items ? this._toFieldConfig(schema.items, options) : {};
                            if (f.props) {
                                f.props.required = true;
                            }
                            return f;
                        }
                        const length = root.fieldGroup ? root.fieldGroup.length : 0;
                        const itemSchema = schema.items[length] ? schema.items[length] : schema.additionalItems;
                        const f = itemSchema ? this._toFieldConfig(itemSchema, options) : {};
                        if (f.props) {
                            f.props.required = true;
                        }
                        if (schema.items[length]) {
                            f.props.removable = false;
                        }
                        return f;
                    };
                }
                break;
            }
        }
        if (schema.hasOwnProperty('const')) {
            field.props.const = schema.const;
            this.addValidator(field, 'const', ({ value }) => value === schema.const);
            if (!field.type) {
                field.defaultValue = schema.const;
            }
        }
        if (this.isEnum(schema)) {
            field.props.multiple = field.type === 'array';
            field.type = 'enum';
            field.props.options = this.toEnumOptions(schema);
        }
        if (schema.oneOf && !field.type) {
            delete field.key;
            field.fieldGroup = [
                this.resolveMultiSchema('oneOf', schema.oneOf, { ...options, key, shareFormControl: false }),
            ];
        }
        if (schema.oneOf && !field.type) {
            delete field.key;
            field.fieldGroup = [
                this.resolveMultiSchema('oneOf', schema.oneOf, { ...options, key, shareFormControl: false }),
            ];
        }
        // map in possible formlyConfig options from the widget property
        if (schema.widget?.formlyConfig) {
            field = this.mergeFields(field, schema.widget.formlyConfig);
        }
        field.templateOptions = field.props;
        // if there is a map function passed in, use it to allow the user to
        // further customize how fields are being mapped
        return options.map ? options.map(field, schema) : field;
    }
    resolveSchema(schema, options) {
        if (schema && schema.$ref) {
            schema = this.resolveDefinition(schema, options);
        }
        if (schema && schema.allOf) {
            schema = this.resolveAllOf(schema, options);
        }
        return schema;
    }
    resolveAllOf({ allOf, ...baseSchema }, options) {
        if (!allOf.length) {
            throw Error(`allOf array can not be empty ${allOf}.`);
        }
        return allOf.reduce((base, schema) => {
            schema = this.resolveSchema(schema, options);
            if (base.required && schema.required) {
                base.required = [...base.required, ...schema.required];
            }
            if (schema.uniqueItems) {
                base.uniqueItems = schema.uniqueItems;
            }
            // resolve to min value
            ['maxLength', 'maximum', 'exclusiveMaximum', 'maxItems', 'maxProperties'].forEach((prop) => {
                if (!isEmpty(base[prop]) && !isEmpty(schema[prop])) {
                    base[prop] = base[prop] < schema[prop] ? base[prop] : schema[prop];
                }
            });
            // resolve to max value
            ['minLength', 'minimum', 'exclusiveMinimum', 'minItems', 'minProperties'].forEach((prop) => {
                if (!isEmpty(base[prop]) && !isEmpty(schema[prop])) {
                    base[prop] = base[prop] > schema[prop] ? base[prop] : schema[prop];
                }
            });
            return reverseDeepMerge(base, schema);
        }, baseSchema);
    }
    resolveMultiSchema(mode, schemas, options) {
        return {
            type: 'multischema',
            fieldGroup: [
                {
                    type: 'enum',
                    defaultValue: -1,
                    props: {
                        multiple: mode === 'anyOf',
                        options: schemas.map((s, i) => ({ label: s.title, value: i, disabled: s.readOnly })),
                    },
                    hooks: {
                        onInit: (f) => f.formControl.valueChanges.pipe(tap(() => f.options.detectChanges(f.parent))),
                    },
                },
                {
                    fieldGroup: schemas.map((s, i) => ({
                        ...this._toFieldConfig(s, { ...options, resetOnHide: true }),
                        expressions: {
                            hide: (f, forceUpdate) => {
                                const control = f.parent.parent.fieldGroup[0].formControl;
                                if (control.value === -1 || forceUpdate) {
                                    let value = f.parent.fieldGroup
                                        .map((f, i) => [f, i, this.isFieldValid(f, i, schemas, options)])
                                        .sort(([f1, , f1Valid], [f2, , f2Valid]) => {
                                        if (f1Valid !== f2Valid) {
                                            return f2Valid ? 1 : -1;
                                        }
                                        const matchedFields1 = totalMatchedFields(f1);
                                        const matchedFields2 = totalMatchedFields(f2);
                                        if (matchedFields1 === matchedFields2) {
                                            if (f1.props.disabled === f2.props.disabled) {
                                                return 0;
                                            }
                                            return matchedFields2 > matchedFields1 ? 1 : -1;
                                        }
                                        return matchedFields2 > matchedFields1 ? 1 : -1;
                                    })
                                        .map(([, i]) => i);
                                    if (mode === 'anyOf') {
                                        const definedValue = value.filter((i) => totalMatchedFields(f.parent.fieldGroup[i]));
                                        value = definedValue.length > 0 ? definedValue : [value[0] || 0];
                                    }
                                    value = value.length > 0 ? value : [0];
                                    control.setValue(mode === 'anyOf' ? value : value[0]);
                                }
                                return Array.isArray(control.value) ? control.value.indexOf(i) === -1 : control.value !== i;
                            },
                        },
                    })),
                },
            ],
        };
    }
    resolveDefinition(schema, options) {
        const [uri, pointer] = schema.$ref.split('#/');
        if (uri) {
            throw Error(`Remote schemas for ${schema.$ref} not supported yet.`);
        }
        const definition = !pointer
            ? null
            : pointer
                .split('/')
                .reduce((def, path) => (def?.hasOwnProperty(path) ? def[path] : null), options.schema);
        if (!definition) {
            throw Error(`Cannot find a definition for ${schema.$ref}.`);
        }
        if (definition.$ref) {
            return this.resolveDefinition(definition, options);
        }
        return {
            ...definition,
            ...['title', 'description', 'default', 'widget'].reduce((annotation, p) => {
                if (schema.hasOwnProperty(p)) {
                    annotation[p] = schema[p];
                }
                return annotation;
            }, {}),
        };
    }
    resolveDependencies(schema) {
        const propDeps = {};
        const schemaDeps = {};
        Object.keys(schema.dependencies || {}).forEach((prop) => {
            const dependency = schema.dependencies[prop];
            if (Array.isArray(dependency)) {
                // Property dependencies
                dependency.forEach((dep) => {
                    if (!propDeps[dep]) {
                        propDeps[dep] = [prop];
                    }
                    else {
                        propDeps[dep].push(prop);
                    }
                });
            }
            else {
                // schema dependencies
                schemaDeps[prop] = dependency;
            }
        });
        return { propDeps, schemaDeps };
    }
    guessSchemaType(schema) {
        const type = schema?.type;
        if (!type && schema?.properties) {
            return ['object'];
        }
        if (Array.isArray(type)) {
            if (type.length === 1) {
                return type;
            }
            if (type.length === 2 && type.indexOf('null') !== -1) {
                return type.sort((t1) => (t1 == 'null' ? 1 : -1));
            }
            return type;
        }
        return type ? [type] : [];
    }
    addValidator(field, name, validator) {
        field.validators = field.validators || {};
        field.validators[name] = validator;
    }
    isEnum(schema) {
        return (!!schema.enum ||
            (schema.anyOf && schema.anyOf.every(isConst)) ||
            (schema.oneOf && schema.oneOf.every(isConst)) ||
            (schema.uniqueItems && schema.items && !Array.isArray(schema.items) && this.isEnum(schema.items)));
    }
    toEnumOptions(schema) {
        if (schema.enum) {
            return schema.enum.map((value) => ({ value, label: value }));
        }
        const toEnum = (s) => {
            const value = s.hasOwnProperty('const') ? s.const : s.enum[0];
            const option = { value, label: s.title || value };
            if (s.readOnly) {
                option.disabled = true;
            }
            return option;
        };
        if (schema.anyOf) {
            return schema.anyOf.map(toEnum);
        }
        if (schema.oneOf) {
            return schema.oneOf.map(toEnum);
        }
        return this.toEnumOptions(schema.items);
    }
    isFieldValid(root, i, schemas, options) {
        if (!root._schemasFields) {
            Object.defineProperty(root, '_schemasFields', { enumerable: false, writable: true, configurable: true });
            root._schemasFields = {};
        }
        let field = root._schemasFields[i];
        const model = root.model ? clone(root.model) : root.fieldArray ? [] : {};
        if (!field) {
            field = root._schemasFields[i] = root.options.build({
                form: Array.isArray(model) ? new FormArray([]) : new FormGroup({}),
                fieldGroup: [
                    this._toFieldConfig(schemas[i], {
                        ...options,
                        resetOnHide: true,
                        ignoreDefault: true,
                        map: null,
                        strict: true,
                    }),
                ],
                model,
                options: {},
            });
        }
        else {
            field.model = model;
            root.options.build(field);
        }
        return field.form.valid;
    }
    mergeFields(f1, f2) {
        for (let prop in f2) {
            const f1Prop = prop === 'templateOptions' ? 'props' : prop;
            if (isObject(f1[f1Prop]) && isObject(f2[prop])) {
                f1[f1Prop] = this.mergeFields(f1[f1Prop], f2[prop]);
            }
            else if (f2[prop] != null) {
                f1[f1Prop] = f2[prop];
            }
        }
        return f1;
    }
}
FormlyJsonschema.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyJsonschema, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormlyJsonschema.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyJsonschema, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyJsonschema, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LWpzb24tc2NoZW1hLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9qc29uLXNjaGVtYS9zcmMvZm9ybWx5LWpzb24tc2NoZW1hLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQW1CLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQ0wsaUJBQWlCLElBQUksZ0JBQWdCLEVBQ3JDLGNBQWMsSUFBSSxhQUFhLEVBQy9CLE1BQU0sSUFBSSxLQUFLLEVBQ2YsT0FBTyxJQUFJLE1BQU0sR0FDbEIsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBZXJDLHVDQUF1QztBQUN2QyxTQUFTLGFBQWEsQ0FBQyxDQUFTO0lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEIsT0FBTyxDQUFDLENBQUM7S0FDVjtJQUVELElBQUksQ0FBQyxHQUFHLENBQUMsRUFDUCxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2xDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDUixDQUFDLEVBQUUsQ0FBQztLQUNMO0lBRUQsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsQ0FBTTtJQUNyQixPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQztBQUMvQixDQUFDO0FBRUQsU0FBUyxRQUFRLENBQUMsQ0FBTTtJQUN0QixPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEtB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JztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBKU09OU2NoZW1hNywgSlNPTlNjaGVtYTdEZWZpbml0aW9uIH0gZnJvbSAnanNvbi1zY2hlbWEnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQXJyYXksIEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIMm1cmV2ZXJzZURlZXBNZXJnZSBhcyByZXZlcnNlRGVlcE1lcmdlLFxuICDJtWdldEZpZWxkVmFsdWUgYXMgZ2V0RmllbGRWYWx1ZSxcbiAgybVjbG9uZSBhcyBjbG9uZSxcbiAgybVoYXNLZXkgYXMgaGFzS2V5LFxufSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBGb3JtbHlKc29uc2NoZW1hT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBhbGxvd3MgdG8gaW50ZXJjZXB0IHRoZSBtYXBwaW5nLCB0YWtpbmcgdGhlIGFscmVhZHkgbWFwcGVkXG4gICAqIGZvcm1seSBmaWVsZCBhbmQgdGhlIG9yaWdpbmFsIEpTT05TY2hlbWEgc291cmNlIGZyb20gd2hpY2ggaXRcbiAgICogd2FzIG1hcHBlZC5cbiAgICovXG4gIG1hcD86IChtYXBwZWRGaWVsZDogRm9ybWx5RmllbGRDb25maWcsIG1hcFNvdXJjZTogSlNPTlNjaGVtYTcpID0+IEZvcm1seUZpZWxkQ29uZmlnO1xufVxuXG5pbnRlcmZhY2UgRm9ybWx5SlNPTlNjaGVtYTcgZXh0ZW5kcyBKU09OU2NoZW1hNyB7XG4gIHdpZGdldD86IHsgZm9ybWx5Q29uZmlnOiBGb3JtbHlGaWVsZENvbmZpZyB9O1xufVxuXG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjc4NjUyODVcbmZ1bmN0aW9uIGRlY2ltYWxQbGFjZXMoYTogbnVtYmVyKSB7XG4gIGlmICghaXNGaW5pdGUoYSkpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGxldCBlID0gMSxcbiAgICBwID0gMDtcbiAgd2hpbGUgKE1hdGgucm91bmQoYSAqIGUpIC8gZSAhPT0gYSkge1xuICAgIGUgKj0gMTA7XG4gICAgcCsrO1xuICB9XG5cbiAgcmV0dXJuIHA7XG59XG5cbmZ1bmN0aW9uIGlzRW1wdHkodjogYW55KSB7XG4gIHJldHVybiB2ID09PSAnJyB8fCB2ID09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHY6IGFueSkge1xuICByZXR1cm4gdiAhPSBudWxsICYmIHR5cGVvZiB2ID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2KTtcbn1cblxuZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiBhbnkpIHtcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIgPyBOdW1iZXIuaXNJbnRlZ2VyKHZhbHVlKSA6IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBpc0NvbnN0KHNjaGVtYTogSlNPTlNjaGVtYTdEZWZpbml0aW9uKSB7XG4gIHJldHVybiB0eXBlb2Ygc2NoZW1hID09PSAnb2JqZWN0JyAmJiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdjb25zdCcpIHx8IChzY2hlbWEuZW51bSAmJiBzY2hlbWEuZW51bS5sZW5ndGggPT09IDEpKTtcbn1cblxuZnVuY3Rpb24gdG90YWxNYXRjaGVkRmllbGRzKGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyk6IG51bWJlciB7XG4gIGlmICghZmllbGQuZmllbGRHcm91cCkge1xuICAgIHJldHVybiBoYXNLZXkoZmllbGQpICYmIGdldEZpZWxkVmFsdWUoZmllbGQpICE9PSB1bmRlZmluZWQgPyAxIDogMDtcbiAgfVxuXG4gIGNvbnN0IHRvdGFsID0gZmllbGQuZmllbGRHcm91cC5yZWR1Y2UoKHMsIGYpID0+IHRvdGFsTWF0Y2hlZEZpZWxkcyhmKSArIHMsIDApO1xuICBpZiAodG90YWwgPT09IDAgJiYgaGFzS2V5KGZpZWxkKSkge1xuICAgIGNvbnN0IHZhbHVlID0gZ2V0RmllbGRWYWx1ZShmaWVsZCk7XG4gICAgaWYgKFxuICAgICAgdmFsdWUgPT09IG51bGwgfHxcbiAgICAgICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICgoZmllbGQuZmllbGRBcnJheSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSkgfHwgKCFmaWVsZC5maWVsZEFycmF5ICYmIGlzT2JqZWN0KHZhbHVlKSkpKVxuICAgICkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvdGFsO1xufVxuXG5pbnRlcmZhY2UgSU9wdGlvbnMgZXh0ZW5kcyBGb3JtbHlKc29uc2NoZW1hT3B0aW9ucyB7XG4gIHNjaGVtYTogRm9ybWx5SlNPTlNjaGVtYTc7XG4gIHJlc2V0T25IaWRlPzogYm9vbGVhbjtcbiAgc2hhcmVGb3JtQ29udHJvbD86IGJvb2xlYW47XG4gIGlnbm9yZURlZmF1bHQ/OiBib29sZWFuO1xuICBzdHJpY3Q/OiBib29sZWFuO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIGtleT86IEZvcm1seUZpZWxkQ29uZmlnWydrZXknXTtcbiAgaXNPcHRpb25hbD86IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgRm9ybWx5SnNvbnNjaGVtYSB7XG4gIHRvRmllbGRDb25maWcoc2NoZW1hOiBKU09OU2NoZW1hNywgb3B0aW9ucz86IEZvcm1seUpzb25zY2hlbWFPcHRpb25zKTogRm9ybWx5RmllbGRDb25maWcge1xuICAgIHJldHVybiB0aGlzLl90b0ZpZWxkQ29uZmlnKHNjaGVtYSwgeyBzY2hlbWEsIC4uLihvcHRpb25zIHx8IHt9KSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3RvRmllbGRDb25maWcoc2NoZW1hOiBGb3JtbHlKU09OU2NoZW1hNywgeyBrZXksIC4uLm9wdGlvbnMgfTogSU9wdGlvbnMpOiBGb3JtbHlGaWVsZENvbmZpZyB7XG4gICAgc2NoZW1hID0gdGhpcy5yZXNvbHZlU2NoZW1hKHNjaGVtYSwgb3B0aW9ucyk7XG4gICAgY29uc3QgdHlwZXMgPSB0aGlzLmd1ZXNzU2NoZW1hVHlwZShzY2hlbWEpO1xuXG4gICAgbGV0IGZpZWxkOiBGb3JtbHlGaWVsZENvbmZpZyAmIHsgc2hhcmVGb3JtQ29udHJvbD86IGJvb2xlYW4gfSA9IHtcbiAgICAgIHR5cGU6IHR5cGVzWzBdLFxuICAgICAgZGVmYXVsdFZhbHVlOiBzY2hlbWEuZGVmYXVsdCxcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIGxhYmVsOiBzY2hlbWEudGl0bGUsXG4gICAgICAgIHJlYWRvbmx5OiBzY2hlbWEucmVhZE9ubHksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBzY2hlbWEuZGVzY3JpcHRpb24sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgIGZpZWxkLmtleSA9IGtleTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuaWdub3JlRGVmYXVsdCAmJiAoc2NoZW1hLnJlYWRPbmx5IHx8IG9wdGlvbnMucmVhZE9ubHkpKSB7XG4gICAgICBmaWVsZC5wcm9wcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICBvcHRpb25zID0geyAuLi5vcHRpb25zLCByZWFkT25seTogdHJ1ZSB9O1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnJlc2V0T25IaWRlKSB7XG4gICAgICBmaWVsZC5yZXNldE9uSGlkZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGtleSAmJiBvcHRpb25zLnN0cmljdCkge1xuICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICd0eXBlJywgKGM6IEFic3RyYWN0Q29udHJvbCwgZjogRm9ybWx5RmllbGRDb25maWcpID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGYpO1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzoge1xuICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2ludGVnZXInOiB7XG4gICAgICAgICAgICAgIHJldHVybiBpc0ludGVnZXIodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzoge1xuICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlzT2JqZWN0KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgJ2FycmF5Jzoge1xuICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zaGFyZUZvcm1Db250cm9sID09PSBmYWxzZSkge1xuICAgICAgZmllbGQuc2hhcmVGb3JtQ29udHJvbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmlnbm9yZURlZmF1bHQpIHtcbiAgICAgIGRlbGV0ZSBmaWVsZC5kZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRWYWxpZGF0b3IoZmllbGQsICd0eXBlJywge1xuICAgICAgc2NoZW1hVHlwZTogdHlwZXMsXG4gICAgICBleHByZXNzaW9uOiAoeyB2YWx1ZSB9OiBBYnN0cmFjdENvbnRyb2wpID0+IHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCAmJiB0eXBlcy5pbmRleE9mKCdudWxsJykgIT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHR5cGVzWzBdKSB7XG4gICAgICAgICAgY2FzZSAnbnVsbCc6IHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ3N0cmluZyc6IHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdpbnRlZ2VyJzoge1xuICAgICAgICAgICAgcmV0dXJuIGlzSW50ZWdlcih2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNhc2UgJ251bWJlcic6IHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgICAgICByZXR1cm4gaXNPYmplY3QodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdhcnJheSc6IHtcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdpbnRlZ2VyJzoge1xuICAgICAgICBmaWVsZC5wYXJzZXJzID0gWyh2OiBzdHJpbmcgfCBudW1iZXIpID0+IChpc0VtcHR5KHYpID8gdW5kZWZpbmVkIDogTnVtYmVyKHYpKV07XG4gICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoJ21pbmltdW0nKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLm1pbiA9IHNjaGVtYS5taW5pbXVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWF4aW11bScpKSB7XG4gICAgICAgICAgZmllbGQucHJvcHMubWF4ID0gc2NoZW1hLm1heGltdW07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdleGNsdXNpdmVNaW5pbXVtJykpIHtcbiAgICAgICAgICBmaWVsZC5wcm9wcy5leGNsdXNpdmVNaW5pbXVtID0gc2NoZW1hLmV4Y2x1c2l2ZU1pbmltdW07XG4gICAgICAgICAgdGhpcy5hZGRWYWxpZGF0b3IoXG4gICAgICAgICAgICBmaWVsZCxcbiAgICAgICAgICAgICdleGNsdXNpdmVNaW5pbXVtJyxcbiAgICAgICAgICAgICh7IHZhbHVlIH06IEFic3RyYWN0Q29udHJvbCkgPT4gaXNFbXB0eSh2YWx1ZSkgfHwgdmFsdWUgPiBzY2hlbWEuZXhjbHVzaXZlTWluaW11bSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnZXhjbHVzaXZlTWF4aW11bScpKSB7XG4gICAgICAgICAgZmllbGQucHJvcHMuZXhjbHVzaXZlTWF4aW11bSA9IHNjaGVtYS5leGNsdXNpdmVNYXhpbXVtO1xuICAgICAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKFxuICAgICAgICAgICAgZmllbGQsXG4gICAgICAgICAgICAnZXhjbHVzaXZlTWF4aW11bScsXG4gICAgICAgICAgICAoeyB2YWx1ZSB9OiBBYnN0cmFjdENvbnRyb2wpID0+IGlzRW1wdHkodmFsdWUpIHx8IHZhbHVlIDwgc2NoZW1hLmV4Y2x1c2l2ZU1heGltdW0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2hlbWEuaGFzT3duUHJvcGVydHkoJ211bHRpcGxlT2YnKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLnN0ZXAgPSBzY2hlbWEubXVsdGlwbGVPZjtcbiAgICAgICAgICB0aGlzLmFkZFZhbGlkYXRvcihmaWVsZCwgJ211bHRpcGxlT2YnLCAoeyB2YWx1ZSB9OiBBYnN0cmFjdENvbnRyb2wpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0VtcHR5KHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgIT09ICdudW1iZXInIHx8IHZhbHVlID09PSAwIHx8IHNjaGVtYS5tdWx0aXBsZU9mIDw9IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hanYtdmFsaWRhdG9yL2Fqdi9pc3N1ZXMvNjUyI2lzc3VlLTI4MzYxMDg1OVxuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBkZWNpbWFsUGxhY2VzKHNjaGVtYS5tdWx0aXBsZU9mKSk7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqIG11bHRpcGxpZXIpICUgTWF0aC5yb3VuZChzY2hlbWEubXVsdGlwbGVPZiAqIG11bHRpcGxpZXIpID09PSAwO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnc3RyaW5nJzoge1xuICAgICAgICBmaWVsZC5wYXJzZXJzID0gW1xuICAgICAgICAgICh2KSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZXMuaW5kZXhPZignbnVsbCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICB2ID0gaXNFbXB0eSh2KSA/IG51bGwgOiB2O1xuICAgICAgICAgICAgfSBlbHNlIGlmICghZmllbGQucHJvcHMucmVxdWlyZWQpIHtcbiAgICAgICAgICAgICAgdiA9IHYgPT09ICcnID8gdW5kZWZpbmVkIDogdjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICBbJ21pbkxlbmd0aCcsICdtYXhMZW5ndGgnLCAncGF0dGVybiddLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICBmaWVsZC5wcm9wc1twcm9wXSA9IChzY2hlbWEgYXMgYW55KVtwcm9wXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ29iamVjdCc6IHtcbiAgICAgICAgaWYgKCFmaWVsZC5maWVsZEdyb3VwKSB7XG4gICAgICAgICAgZmllbGQuZmllbGRHcm91cCA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBwcm9wRGVwcywgc2NoZW1hRGVwcyB9ID0gdGhpcy5yZXNvbHZlRGVwZW5kZW5jaWVzKHNjaGVtYSk7XG4gICAgICAgIE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzIHx8IHt9KS5mb3JFYWNoKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlzUmVxdWlyZWQgPSBBcnJheS5pc0FycmF5KHNjaGVtYS5yZXF1aXJlZCkgJiYgc2NoZW1hLnJlcXVpcmVkLmluZGV4T2YocHJvcGVydHkpICE9PSAtMTtcbiAgICAgICAgICBjb25zdCBmID0gdGhpcy5fdG9GaWVsZENvbmZpZyg8SlNPTlNjaGVtYTc+c2NoZW1hLnByb3BlcnRpZXNbcHJvcGVydHldLCB7XG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAga2V5OiBwcm9wZXJ0eSxcbiAgICAgICAgICAgIGlzT3B0aW9uYWw6IG9wdGlvbnMuaXNPcHRpb25hbCB8fCAhaXNSZXF1aXJlZCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaChmKTtcbiAgICAgICAgICBpZiAoaXNSZXF1aXJlZCB8fCBwcm9wRGVwc1twcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgIGYuZXhwcmVzc2lvbnMgPSB7XG4gICAgICAgICAgICAgIC4uLihmLmV4cHJlc3Npb25zIHx8IHt9KSxcbiAgICAgICAgICAgICAgJ3Byb3BzLnJlcXVpcmVkJzogKGYpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFyZW50ID0gZi5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kZWwgPSBmLmZpZWxkR3JvdXAgJiYgZi5rZXkgIT0gbnVsbCA/IHBhcmVudC5tb2RlbCA6IGYubW9kZWw7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudC5rZXkgPT0gbnVsbCAmJiBwYXJlbnQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gcGFyZW50ICYmIHBhcmVudC5wcm9wcyA/IHBhcmVudC5wcm9wcy5yZXF1aXJlZCA6IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghbW9kZWwgJiYgIXJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hLnJlcXVpcmVkKSAmJiBzY2hlbWEucmVxdWlyZWQuaW5kZXhPZihwcm9wZXJ0eSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcERlcHNbcHJvcGVydHldICYmIGYubW9kZWwgJiYgcHJvcERlcHNbcHJvcGVydHldLnNvbWUoKGspID0+ICFpc0VtcHR5KGYubW9kZWxba10pKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNjaGVtYURlcHNbcHJvcGVydHldKSB7XG4gICAgICAgICAgICBjb25zdCBnZXRDb25zdFZhbHVlID0gKHM6IEpTT05TY2hlbWE3KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBzLmhhc093blByb3BlcnR5KCdjb25zdCcpID8gcy5jb25zdCA6IHMuZW51bVswXTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IG9uZU9mU2NoZW1hID0gc2NoZW1hRGVwc1twcm9wZXJ0eV0ub25lT2YgYXMgSlNPTlNjaGVtYTdbXTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgb25lT2ZTY2hlbWEgJiZcbiAgICAgICAgICAgICAgb25lT2ZTY2hlbWEuZXZlcnkoKG8pID0+IG8ucHJvcGVydGllcyAmJiBvLnByb3BlcnRpZXNbcHJvcGVydHldICYmIGlzQ29uc3Qoby5wcm9wZXJ0aWVzW3Byb3BlcnR5XSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgb25lT2ZTY2hlbWEuZm9yRWFjaCgob25lT2ZTY2hlbWFJdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBbcHJvcGVydHldOiBjb25zdFNjaGVtYSwgLi4ucHJvcGVydGllcyB9ID0gb25lT2ZTY2hlbWFJdGVtLnByb3BlcnRpZXM7XG4gICAgICAgICAgICAgICAgZmllbGQuZmllbGRHcm91cC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIC4uLnRoaXMuX3RvRmllbGRDb25maWcoeyAuLi5vbmVPZlNjaGVtYUl0ZW0sIHByb3BlcnRpZXMgfSwgeyAuLi5vcHRpb25zLCByZXNldE9uSGlkZTogdHJ1ZSB9KSxcbiAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIGhpZGU6IChmKSA9PiAhZi5tb2RlbCB8fCBnZXRDb25zdFZhbHVlKGNvbnN0U2NoZW1hIGFzIEpTT05TY2hlbWE3KSAhPT0gZi5tb2RlbFtwcm9wZXJ0eV0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGZpZWxkLmZpZWxkR3JvdXAucHVzaCh7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5fdG9GaWVsZENvbmZpZyhzY2hlbWFEZXBzW3Byb3BlcnR5XSwgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbnM6IHtcbiAgICAgICAgICAgICAgICAgIGhpZGU6IChmKSA9PiAhZi5tb2RlbCB8fCBpc0VtcHR5KGYubW9kZWxbcHJvcGVydHldKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzY2hlbWEub25lT2YpIHtcbiAgICAgICAgICBmaWVsZC5maWVsZEdyb3VwLnB1c2goXG4gICAgICAgICAgICB0aGlzLnJlc29sdmVNdWx0aVNjaGVtYSgnb25lT2YnLCA8SlNPTlNjaGVtYTdbXT5zY2hlbWEub25lT2YsIHsgLi4ub3B0aW9ucywgc2hhcmVGb3JtQ29udHJvbDogZmFsc2UgfSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2hlbWEuYW55T2YpIHtcbiAgICAgICAgICBmaWVsZC5maWVsZEdyb3VwLnB1c2godGhpcy5yZXNvbHZlTXVsdGlTY2hlbWEoJ2FueU9mJywgPEpTT05TY2hlbWE3W10+c2NoZW1hLmFueU9mLCBvcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdhcnJheSc6IHtcbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWluSXRlbXMnKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLm1pbkl0ZW1zID0gc2NoZW1hLm1pbkl0ZW1zO1xuICAgICAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKGZpZWxkLCAnbWluSXRlbXMnLCAoYzogQWJzdHJhY3RDb250cm9sLCBmOiBGb3JtbHlGaWVsZENvbmZpZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGYpO1xuICAgICAgICAgICAgcmV0dXJuIGlzRW1wdHkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA+PSBzY2hlbWEubWluSXRlbXM7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoIW9wdGlvbnMuaXNPcHRpb25hbCAmJiBzY2hlbWEubWluSXRlbXMgPiAwICYmIGZpZWxkLmRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBmaWVsZC5kZWZhdWx0VmFsdWUgPSBBcnJheS5mcm9tKG5ldyBBcnJheShzY2hlbWEubWluSXRlbXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgnbWF4SXRlbXMnKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLm1heEl0ZW1zID0gc2NoZW1hLm1heEl0ZW1zO1xuICAgICAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKGZpZWxkLCAnbWF4SXRlbXMnLCAoYzogQWJzdHJhY3RDb250cm9sLCBmOiBGb3JtbHlGaWVsZENvbmZpZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGYpO1xuICAgICAgICAgICAgcmV0dXJuIGlzRW1wdHkodmFsdWUpIHx8IHZhbHVlLmxlbmd0aCA8PSBzY2hlbWEubWF4SXRlbXM7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eSgndW5pcXVlSXRlbXMnKSkge1xuICAgICAgICAgIGZpZWxkLnByb3BzLnVuaXF1ZUl0ZW1zID0gc2NoZW1hLnVuaXF1ZUl0ZW1zO1xuICAgICAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKGZpZWxkLCAndW5pcXVlSXRlbXMnLCAoYzogQWJzdHJhY3RDb250cm9sLCBmOiBGb3JtbHlGaWVsZENvbmZpZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBnZXRGaWVsZFZhbHVlKGYpO1xuICAgICAgICAgICAgaWYgKGlzRW1wdHkodmFsdWUpIHx8ICFzY2hlbWEudW5pcXVlSXRlbXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVuaXF1ZUl0ZW1zID0gQXJyYXkuZnJvbShuZXcgU2V0KHZhbHVlLm1hcCgodjogYW55KSA9PiBKU09OLnN0cmluZ2lmeSh2KSkpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHVuaXF1ZUl0ZW1zLmxlbmd0aCA9PT0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVzb2x2ZSBpdGVtcyBzY2hlbWEgbmVlZGVkIGZvciBpc0VudW0gY2hlY2tcbiAgICAgICAgaWYgKHNjaGVtYS5pdGVtcyAmJiAhQXJyYXkuaXNBcnJheShzY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgICAgc2NoZW1hLml0ZW1zID0gdGhpcy5yZXNvbHZlU2NoZW1hKDxKU09OU2NoZW1hNz5zY2hlbWEuaXRlbXMsIG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVE9ETzogcmVtb3ZlIGlzRW51bSBjaGVjayBvbmNlIGFkZGluZyBhbiBvcHRpb24gdG8gc2tpcCBleHRlbnNpb25cbiAgICAgICAgaWYgKCF0aGlzLmlzRW51bShzY2hlbWEpKSB7XG4gICAgICAgICAgZmllbGQuZmllbGRBcnJheSA9IChyb290OiBGb3JtbHlGaWVsZENvbmZpZykgPT4ge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgICAgICAgLy8gV2hlbiBpdGVtcyBpcyBhIHNpbmdsZSBzY2hlbWEsIHRoZSBhZGRpdGlvbmFsSXRlbXMga2V5d29yZCBpcyBtZWFuaW5nbGVzcywgYW5kIGl0IHNob3VsZCBub3QgYmUgdXNlZC5cbiAgICAgICAgICAgICAgY29uc3QgZiA9IHNjaGVtYS5pdGVtcyA/IHRoaXMuX3RvRmllbGRDb25maWcoPEpTT05TY2hlbWE3PnNjaGVtYS5pdGVtcywgb3B0aW9ucykgOiB7fTtcbiAgICAgICAgICAgICAgaWYgKGYucHJvcHMpIHtcbiAgICAgICAgICAgICAgICBmLnByb3BzLnJlcXVpcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSByb290LmZpZWxkR3JvdXAgPyByb290LmZpZWxkR3JvdXAubGVuZ3RoIDogMDtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1TY2hlbWEgPSBzY2hlbWEuaXRlbXNbbGVuZ3RoXSA/IHNjaGVtYS5pdGVtc1tsZW5ndGhdIDogc2NoZW1hLmFkZGl0aW9uYWxJdGVtcztcbiAgICAgICAgICAgIGNvbnN0IGYgPSBpdGVtU2NoZW1hID8gdGhpcy5fdG9GaWVsZENvbmZpZyg8SlNPTlNjaGVtYTc+aXRlbVNjaGVtYSwgb3B0aW9ucykgOiB7fTtcbiAgICAgICAgICAgIGlmIChmLnByb3BzKSB7XG4gICAgICAgICAgICAgIGYucHJvcHMucmVxdWlyZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNjaGVtYS5pdGVtc1tsZW5ndGhdKSB7XG4gICAgICAgICAgICAgIGYucHJvcHMucmVtb3ZhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hLmhhc093blByb3BlcnR5KCdjb25zdCcpKSB7XG4gICAgICBmaWVsZC5wcm9wcy5jb25zdCA9IHNjaGVtYS5jb25zdDtcbiAgICAgIHRoaXMuYWRkVmFsaWRhdG9yKGZpZWxkLCAnY29uc3QnLCAoeyB2YWx1ZSB9OiBBYnN0cmFjdENvbnRyb2wpID0+IHZhbHVlID09PSBzY2hlbWEuY29uc3QpO1xuICAgICAgaWYgKCFmaWVsZC50eXBlKSB7XG4gICAgICAgIGZpZWxkLmRlZmF1bHRWYWx1ZSA9IHNjaGVtYS5jb25zdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0VudW0oc2NoZW1hKSkge1xuICAgICAgZmllbGQucHJvcHMubXVsdGlwbGUgPSBmaWVsZC50eXBlID09PSAnYXJyYXknO1xuICAgICAgZmllbGQudHlwZSA9ICdlbnVtJztcbiAgICAgIGZpZWxkLnByb3BzLm9wdGlvbnMgPSB0aGlzLnRvRW51bU9wdGlvbnMoc2NoZW1hKTtcbiAgICB9XG5cbiAgICBpZiAoc2NoZW1hLm9uZU9mICYmICFmaWVsZC50eXBlKSB7XG4gICAgICBkZWxldGUgZmllbGQua2V5O1xuICAgICAgZmllbGQuZmllbGRHcm91cCA9IFtcbiAgICAgICAgdGhpcy5yZXNvbHZlTXVsdGlTY2hlbWEoJ29uZU9mJywgPEpTT05TY2hlbWE3W10+c2NoZW1hLm9uZU9mLCB7IC4uLm9wdGlvbnMsIGtleSwgc2hhcmVGb3JtQ29udHJvbDogZmFsc2UgfSksXG4gICAgICBdO1xuICAgIH1cblxuICAgIGlmIChzY2hlbWEub25lT2YgJiYgIWZpZWxkLnR5cGUpIHtcbiAgICAgIGRlbGV0ZSBmaWVsZC5rZXk7XG4gICAgICBmaWVsZC5maWVsZEdyb3VwID0gW1xuICAgICAgICB0aGlzLnJlc29sdmVNdWx0aVNjaGVtYSgnb25lT2YnLCA8SlNPTlNjaGVtYTdbXT5zY2hlbWEub25lT2YsIHsgLi4ub3B0aW9ucywga2V5LCBzaGFyZUZvcm1Db250cm9sOiBmYWxzZSB9KSxcbiAgICAgIF07XG4gICAgfVxuXG4gICAgLy8gbWFwIGluIHBvc3NpYmxlIGZvcm1seUNvbmZpZyBvcHRpb25zIGZyb20gdGhlIHdpZGdldCBwcm9wZXJ0eVxuICAgIGlmIChzY2hlbWEud2lkZ2V0Py5mb3JtbHlDb25maWcpIHtcbiAgICAgIGZpZWxkID0gdGhpcy5tZXJnZUZpZWxkcyhmaWVsZCwgc2NoZW1hLndpZGdldC5mb3JtbHlDb25maWcpO1xuICAgIH1cblxuICAgIGZpZWxkLnRlbXBsYXRlT3B0aW9ucyA9IGZpZWxkLnByb3BzO1xuICAgIC8vIGlmIHRoZXJlIGlzIGEgbWFwIGZ1bmN0aW9uIHBhc3NlZCBpbiwgdXNlIGl0IHRvIGFsbG93IHRoZSB1c2VyIHRvXG4gICAgLy8gZnVydGhlciBjdXN0b21pemUgaG93IGZpZWxkcyBhcmUgYmVpbmcgbWFwcGVkXG4gICAgcmV0dXJuIG9wdGlvbnMubWFwID8gb3B0aW9ucy5tYXAoZmllbGQsIHNjaGVtYSkgOiBmaWVsZDtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZVNjaGVtYShzY2hlbWE6IEpTT05TY2hlbWE3LCBvcHRpb25zOiBJT3B0aW9ucyk6IEpTT05TY2hlbWE3IHtcbiAgICBpZiAoc2NoZW1hICYmIHNjaGVtYS4kcmVmKSB7XG4gICAgICBzY2hlbWEgPSB0aGlzLnJlc29sdmVEZWZpbml0aW9uKHNjaGVtYSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYSAmJiBzY2hlbWEuYWxsT2YpIHtcbiAgICAgIHNjaGVtYSA9IHRoaXMucmVzb2x2ZUFsbE9mKHNjaGVtYSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjaGVtYTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZUFsbE9mKHsgYWxsT2YsIC4uLmJhc2VTY2hlbWEgfTogRm9ybWx5SlNPTlNjaGVtYTcsIG9wdGlvbnM6IElPcHRpb25zKSB7XG4gICAgaWYgKCFhbGxPZi5sZW5ndGgpIHtcbiAgICAgIHRocm93IEVycm9yKGBhbGxPZiBhcnJheSBjYW4gbm90IGJlIGVtcHR5ICR7YWxsT2Z9LmApO1xuICAgIH1cblxuICAgIHJldHVybiAoYWxsT2YgYXMgRm9ybWx5SlNPTlNjaGVtYTdbXSkucmVkdWNlKChiYXNlOiBGb3JtbHlKU09OU2NoZW1hNywgc2NoZW1hOiBGb3JtbHlKU09OU2NoZW1hNykgPT4ge1xuICAgICAgc2NoZW1hID0gdGhpcy5yZXNvbHZlU2NoZW1hKHNjaGVtYSwgb3B0aW9ucyk7XG4gICAgICBpZiAoYmFzZS5yZXF1aXJlZCAmJiBzY2hlbWEucmVxdWlyZWQpIHtcbiAgICAgICAgYmFzZS5yZXF1aXJlZCA9IFsuLi5iYXNlLnJlcXVpcmVkLCAuLi5zY2hlbWEucmVxdWlyZWRdO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2NoZW1hLnVuaXF1ZUl0ZW1zKSB7XG4gICAgICAgIGJhc2UudW5pcXVlSXRlbXMgPSBzY2hlbWEudW5pcXVlSXRlbXM7XG4gICAgICB9XG5cbiAgICAgIC8vIHJlc29sdmUgdG8gbWluIHZhbHVlXG4gICAgICAoXG4gICAgICAgIFsnbWF4TGVuZ3RoJywgJ21heGltdW0nLCAnZXhjbHVzaXZlTWF4aW11bScsICdtYXhJdGVtcycsICdtYXhQcm9wZXJ0aWVzJ10gYXMgKGtleW9mIEZvcm1seUpTT05TY2hlbWE3KVtdXG4gICAgICApLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgICAgaWYgKCFpc0VtcHR5KGJhc2VbcHJvcF0pICYmICFpc0VtcHR5KHNjaGVtYVtwcm9wXSkpIHtcbiAgICAgICAgICAoYmFzZSBhcyBhbnkpW3Byb3BdID0gYmFzZVtwcm9wXSA8IHNjaGVtYVtwcm9wXSA/IGJhc2VbcHJvcF0gOiBzY2hlbWFbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyByZXNvbHZlIHRvIG1heCB2YWx1ZVxuICAgICAgKFxuICAgICAgICBbJ21pbkxlbmd0aCcsICdtaW5pbXVtJywgJ2V4Y2x1c2l2ZU1pbmltdW0nLCAnbWluSXRlbXMnLCAnbWluUHJvcGVydGllcyddIGFzIChrZXlvZiBGb3JtbHlKU09OU2NoZW1hNylbXVxuICAgICAgKS5mb3JFYWNoKChwcm9wKSA9PiB7XG4gICAgICAgIGlmICghaXNFbXB0eShiYXNlW3Byb3BdKSAmJiAhaXNFbXB0eShzY2hlbWFbcHJvcF0pKSB7XG4gICAgICAgICAgKGJhc2UgYXMgYW55KVtwcm9wXSA9IGJhc2VbcHJvcF0gPiBzY2hlbWFbcHJvcF0gPyBiYXNlW3Byb3BdIDogc2NoZW1hW3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJldmVyc2VEZWVwTWVyZ2UoYmFzZSwgc2NoZW1hKTtcbiAgICB9LCBiYXNlU2NoZW1hKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZU11bHRpU2NoZW1hKG1vZGU6ICdvbmVPZicgfCAnYW55T2YnLCBzY2hlbWFzOiBKU09OU2NoZW1hN1tdLCBvcHRpb25zOiBJT3B0aW9ucyk6IEZvcm1seUZpZWxkQ29uZmlnIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ211bHRpc2NoZW1hJyxcbiAgICAgIGZpZWxkR3JvdXA6IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdlbnVtJyxcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6IC0xLFxuICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBtdWx0aXBsZTogbW9kZSA9PT0gJ2FueU9mJyxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNjaGVtYXMubWFwKChzLCBpKSA9PiAoeyBsYWJlbDogcy50aXRsZSwgdmFsdWU6IGksIGRpc2FibGVkOiBzLnJlYWRPbmx5IH0pKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGhvb2tzOiB7XG4gICAgICAgICAgICBvbkluaXQ6IChmKSA9PiBmLmZvcm1Db250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKHRhcCgoKSA9PiBmLm9wdGlvbnMuZGV0ZWN0Q2hhbmdlcyhmLnBhcmVudCkpKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmllbGRHcm91cDogc2NoZW1hcy5tYXAoKHMsIGkpID0+ICh7XG4gICAgICAgICAgICAuLi50aGlzLl90b0ZpZWxkQ29uZmlnKHMsIHsgLi4ub3B0aW9ucywgcmVzZXRPbkhpZGU6IHRydWUgfSksXG4gICAgICAgICAgICBleHByZXNzaW9uczoge1xuICAgICAgICAgICAgICBoaWRlOiAoZiwgZm9yY2VVcGRhdGU/OiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IGYucGFyZW50LnBhcmVudC5maWVsZEdyb3VwWzBdLmZvcm1Db250cm9sO1xuICAgICAgICAgICAgICAgIGlmIChjb250cm9sLnZhbHVlID09PSAtMSB8fCBmb3JjZVVwZGF0ZSkge1xuICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZi5wYXJlbnQuZmllbGRHcm91cFxuICAgICAgICAgICAgICAgICAgICAubWFwKFxuICAgICAgICAgICAgICAgICAgICAgIChmLCBpKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgW2YsIGksIHRoaXMuaXNGaWVsZFZhbGlkKGYsIGksIHNjaGVtYXMsIG9wdGlvbnMpXSBhcyBbRm9ybWx5RmllbGRDb25maWcsIG51bWJlciwgYm9vbGVhbl0sXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLnNvcnQoKFtmMSwgLCBmMVZhbGlkXSwgW2YyLCAsIGYyVmFsaWRdKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGYxVmFsaWQgIT09IGYyVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmMlZhbGlkID8gMSA6IC0xO1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoZWRGaWVsZHMxID0gdG90YWxNYXRjaGVkRmllbGRzKGYxKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVkRmllbGRzMiA9IHRvdGFsTWF0Y2hlZEZpZWxkcyhmMik7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZWRGaWVsZHMxID09PSBtYXRjaGVkRmllbGRzMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGYxLnByb3BzLmRpc2FibGVkID09PSBmMi5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZWRGaWVsZHMyID4gbWF0Y2hlZEZpZWxkczEgPyAxIDogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoZWRGaWVsZHMyID4gbWF0Y2hlZEZpZWxkczEgPyAxIDogLTE7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKFssIGldKSA9PiBpKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKG1vZGUgPT09ICdhbnlPZicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmaW5lZFZhbHVlID0gdmFsdWUuZmlsdGVyKChpKSA9PiB0b3RhbE1hdGNoZWRGaWVsZHMoZi5wYXJlbnQuZmllbGRHcm91cFtpXSkpO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlZmluZWRWYWx1ZS5sZW5ndGggPiAwID8gZGVmaW5lZFZhbHVlIDogW3ZhbHVlWzBdIHx8IDBdO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmxlbmd0aCA+IDAgPyB2YWx1ZSA6IFswXTtcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2wuc2V0VmFsdWUobW9kZSA9PT0gJ2FueU9mJyA/IHZhbHVlIDogdmFsdWVbMF0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KGNvbnRyb2wudmFsdWUpID8gY29udHJvbC52YWx1ZS5pbmRleE9mKGkpID09PSAtMSA6IGNvbnRyb2wudmFsdWUgIT09IGk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZURlZmluaXRpb24oc2NoZW1hOiBGb3JtbHlKU09OU2NoZW1hNywgb3B0aW9uczogSU9wdGlvbnMpOiBGb3JtbHlKU09OU2NoZW1hNyB7XG4gICAgY29uc3QgW3VyaSwgcG9pbnRlcl0gPSBzY2hlbWEuJHJlZi5zcGxpdCgnIy8nKTtcbiAgICBpZiAodXJpKSB7XG4gICAgICB0aHJvdyBFcnJvcihgUmVtb3RlIHNjaGVtYXMgZm9yICR7c2NoZW1hLiRyZWZ9IG5vdCBzdXBwb3J0ZWQgeWV0LmApO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmluaXRpb24gPSAhcG9pbnRlclxuICAgICAgPyBudWxsXG4gICAgICA6IHBvaW50ZXJcbiAgICAgICAgICAuc3BsaXQoJy8nKVxuICAgICAgICAgIC5yZWR1Y2UoKGRlZiwgcGF0aCkgPT4gKGRlZj8uaGFzT3duUHJvcGVydHkocGF0aCkgPyAoZGVmIGFzIGFueSlbcGF0aF0gOiBudWxsKSwgb3B0aW9ucy5zY2hlbWEpO1xuXG4gICAgaWYgKCFkZWZpbml0aW9uKSB7XG4gICAgICB0aHJvdyBFcnJvcihgQ2Fubm90IGZpbmQgYSBkZWZpbml0aW9uIGZvciAke3NjaGVtYS4kcmVmfS5gKTtcbiAgICB9XG5cbiAgICBpZiAoZGVmaW5pdGlvbi4kcmVmKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXNvbHZlRGVmaW5pdGlvbihkZWZpbml0aW9uLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uZGVmaW5pdGlvbixcbiAgICAgIC4uLlsndGl0bGUnLCAnZGVzY3JpcHRpb24nLCAnZGVmYXVsdCcsICd3aWRnZXQnXS5yZWR1Y2UoKGFubm90YXRpb24sIHApID0+IHtcbiAgICAgICAgaWYgKHNjaGVtYS5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgICAgIGFubm90YXRpb25bcF0gPSAoc2NoZW1hIGFzIGFueSlbcF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYW5ub3RhdGlvbjtcbiAgICAgIH0sIHt9IGFzIGFueSksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzb2x2ZURlcGVuZGVuY2llcyhzY2hlbWE6IEpTT05TY2hlbWE3KSB7XG4gICAgY29uc3QgcHJvcERlcHM6IHsgW2lkOiBzdHJpbmddOiBzdHJpbmdbXSB9ID0ge307XG4gICAgY29uc3Qgc2NoZW1hRGVwczogeyBbaWQ6IHN0cmluZ106IEpTT05TY2hlbWE3IH0gPSB7fTtcblxuICAgIE9iamVjdC5rZXlzKHNjaGVtYS5kZXBlbmRlbmNpZXMgfHwge30pLmZvckVhY2goKHByb3ApID0+IHtcbiAgICAgIGNvbnN0IGRlcGVuZGVuY3kgPSBzY2hlbWEuZGVwZW5kZW5jaWVzW3Byb3BdIGFzIEpTT05TY2hlbWE3O1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGVwZW5kZW5jeSkpIHtcbiAgICAgICAgLy8gUHJvcGVydHkgZGVwZW5kZW5jaWVzXG4gICAgICAgIGRlcGVuZGVuY3kuZm9yRWFjaCgoZGVwKSA9PiB7XG4gICAgICAgICAgaWYgKCFwcm9wRGVwc1tkZXBdKSB7XG4gICAgICAgICAgICBwcm9wRGVwc1tkZXBdID0gW3Byb3BdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9wRGVwc1tkZXBdLnB1c2gocHJvcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHNjaGVtYSBkZXBlbmRlbmNpZXNcbiAgICAgICAgc2NoZW1hRGVwc1twcm9wXSA9IGRlcGVuZGVuY3k7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4geyBwcm9wRGVwcywgc2NoZW1hRGVwcyB9O1xuICB9XG5cbiAgcHJpdmF0ZSBndWVzc1NjaGVtYVR5cGUoc2NoZW1hOiBKU09OU2NoZW1hNykge1xuICAgIGNvbnN0IHR5cGUgPSBzY2hlbWE/LnR5cGU7XG4gICAgaWYgKCF0eXBlICYmIHNjaGVtYT8ucHJvcGVydGllcykge1xuICAgICAgcmV0dXJuIFsnb2JqZWN0J107XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHlwZSkpIHtcbiAgICAgIGlmICh0eXBlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUubGVuZ3RoID09PSAyICYmIHR5cGUuaW5kZXhPZignbnVsbCcpICE9PSAtMSkge1xuICAgICAgICByZXR1cm4gdHlwZS5zb3J0KCh0MSkgPT4gKHQxID09ICdudWxsJyA/IDEgOiAtMSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZSA/IFt0eXBlXSA6IFtdO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRWYWxpZGF0b3IoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnLCBuYW1lOiBzdHJpbmcsIHZhbGlkYXRvcjogRm9ybWx5RmllbGRDb25maWdbJ3ZhbGlkYXRvcnMnXSkge1xuICAgIGZpZWxkLnZhbGlkYXRvcnMgPSBmaWVsZC52YWxpZGF0b3JzIHx8IHt9O1xuICAgIGZpZWxkLnZhbGlkYXRvcnNbbmFtZV0gPSB2YWxpZGF0b3I7XG4gIH1cblxuICBwcml2YXRlIGlzRW51bShzY2hlbWE6IEpTT05TY2hlbWE3KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICEhc2NoZW1hLmVudW0gfHxcbiAgICAgIChzY2hlbWEuYW55T2YgJiYgKHNjaGVtYS5hbnlPZiBhcyBKU09OU2NoZW1hN1tdKS5ldmVyeShpc0NvbnN0KSkgfHxcbiAgICAgIChzY2hlbWEub25lT2YgJiYgKHNjaGVtYS5vbmVPZiBhcyBKU09OU2NoZW1hN1tdKS5ldmVyeShpc0NvbnN0KSkgfHxcbiAgICAgIChzY2hlbWEudW5pcXVlSXRlbXMgJiYgc2NoZW1hLml0ZW1zICYmICFBcnJheS5pc0FycmF5KHNjaGVtYS5pdGVtcykgJiYgdGhpcy5pc0VudW0oPEpTT05TY2hlbWE3PnNjaGVtYS5pdGVtcykpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9FbnVtT3B0aW9ucyhzY2hlbWE6IEpTT05TY2hlbWE3KTogeyB2YWx1ZTogYW55OyBsYWJlbDogYW55IH1bXSB7XG4gICAgaWYgKHNjaGVtYS5lbnVtKSB7XG4gICAgICByZXR1cm4gc2NoZW1hLmVudW0ubWFwKCh2YWx1ZSkgPT4gKHsgdmFsdWUsIGxhYmVsOiB2YWx1ZSB9KSk7XG4gICAgfVxuXG4gICAgY29uc3QgdG9FbnVtID0gKHM6IEpTT05TY2hlbWE3KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHMuaGFzT3duUHJvcGVydHkoJ2NvbnN0JykgPyBzLmNvbnN0IDogcy5lbnVtWzBdO1xuICAgICAgY29uc3Qgb3B0aW9uOiBhbnkgPSB7IHZhbHVlLCBsYWJlbDogcy50aXRsZSB8fCB2YWx1ZSB9O1xuICAgICAgaWYgKHMucmVhZE9ubHkpIHtcbiAgICAgICAgb3B0aW9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9wdGlvbjtcbiAgICB9O1xuXG4gICAgaWYgKHNjaGVtYS5hbnlPZikge1xuICAgICAgcmV0dXJuIChzY2hlbWEuYW55T2YgYXMgSlNPTlNjaGVtYTdbXSkubWFwKHRvRW51bSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS5vbmVPZikge1xuICAgICAgcmV0dXJuIChzY2hlbWEub25lT2YgYXMgSlNPTlNjaGVtYTdbXSkubWFwKHRvRW51bSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudG9FbnVtT3B0aW9ucyg8SlNPTlNjaGVtYTc+c2NoZW1hLml0ZW1zKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNGaWVsZFZhbGlkKFxuICAgIHJvb3Q6IEZvcm1seUZpZWxkQ29uZmlnICYgeyBfc2NoZW1hc0ZpZWxkcz86IHsgW2tleTogbnVtYmVyXTogRm9ybWx5RmllbGRDb25maWcgfSB9LFxuICAgIGk6IG51bWJlcixcbiAgICBzY2hlbWFzOiBKU09OU2NoZW1hN1tdLFxuICAgIG9wdGlvbnM6IElPcHRpb25zLFxuICApOiBib29sZWFuIHtcbiAgICBpZiAoIXJvb3QuX3NjaGVtYXNGaWVsZHMpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyb290LCAnX3NjaGVtYXNGaWVsZHMnLCB7IGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgICAgcm9vdC5fc2NoZW1hc0ZpZWxkcyA9IHt9O1xuICAgIH1cblxuICAgIGxldCBmaWVsZCA9IHJvb3QuX3NjaGVtYXNGaWVsZHNbaV07XG4gICAgY29uc3QgbW9kZWwgPSByb290Lm1vZGVsID8gY2xvbmUocm9vdC5tb2RlbCkgOiByb290LmZpZWxkQXJyYXkgPyBbXSA6IHt9O1xuICAgIGlmICghZmllbGQpIHtcbiAgICAgIGZpZWxkID0gcm9vdC5fc2NoZW1hc0ZpZWxkc1tpXSA9IHJvb3Qub3B0aW9ucy5idWlsZCh7XG4gICAgICAgIGZvcm06IEFycmF5LmlzQXJyYXkobW9kZWwpID8gbmV3IEZvcm1BcnJheShbXSkgOiBuZXcgRm9ybUdyb3VwKHt9KSxcbiAgICAgICAgZmllbGRHcm91cDogW1xuICAgICAgICAgIHRoaXMuX3RvRmllbGRDb25maWcoc2NoZW1hc1tpXSwge1xuICAgICAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgICAgIHJlc2V0T25IaWRlOiB0cnVlLFxuICAgICAgICAgICAgaWdub3JlRGVmYXVsdDogdHJ1ZSxcbiAgICAgICAgICAgIG1hcDogbnVsbCxcbiAgICAgICAgICAgIHN0cmljdDogdHJ1ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgbW9kZWwsXG4gICAgICAgIG9wdGlvbnM6IHt9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIChmaWVsZCBhcyBhbnkpLm1vZGVsID0gbW9kZWw7XG4gICAgICByb290Lm9wdGlvbnMuYnVpbGQoZmllbGQpO1xuICAgIH1cblxuICAgIHJldHVybiBmaWVsZC5mb3JtLnZhbGlkO1xuICB9XG5cbiAgcHJpdmF0ZSBtZXJnZUZpZWxkcyhmMTogYW55LCBmMjogYW55KSB7XG4gICAgZm9yIChsZXQgcHJvcCBpbiBmMikge1xuICAgICAgY29uc3QgZjFQcm9wID0gcHJvcCA9PT0gJ3RlbXBsYXRlT3B0aW9ucycgPyAncHJvcHMnIDogcHJvcDtcbiAgICAgIGlmIChpc09iamVjdChmMVtmMVByb3BdKSAmJiBpc09iamVjdChmMltwcm9wXSkpIHtcbiAgICAgICAgZjFbZjFQcm9wXSA9IHRoaXMubWVyZ2VGaWVsZHMoZjFbZjFQcm9wXSwgZjJbcHJvcF0pO1xuICAgICAgfSBlbHNlIGlmIChmMltwcm9wXSAhPSBudWxsKSB7XG4gICAgICAgIGYxW2YxUHJvcF0gPSBmMltwcm9wXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZjE7XG4gIH1cbn1cbiJdfQ==