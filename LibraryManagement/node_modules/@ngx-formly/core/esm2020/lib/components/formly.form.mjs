import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, ContentChildren, } from '@angular/core';
import { FormlyFormBuilder } from '../services/formly.builder';
import { clone, hasKey } from '../utils';
import { switchMap, filter, take } from 'rxjs/operators';
import { clearControl } from '../extensions/field-form/utils';
import { FormlyFieldTemplates, FormlyTemplate } from './formly.template';
import * as i0 from "@angular/core";
import * as i1 from "../services/formly.builder";
import * as i2 from "../services/formly.config";
import * as i3 from "./formly.template";
import * as i4 from "./formly.field";
/**
 * The `<form-form>` component is the main container of the form,
 * which takes care of managing the form state
 * and delegates the rendering of each field to `<formly-field>` component.
 */
export class FormlyForm {
    constructor(builder, config, ngZone, fieldTemplates) {
        this.builder = builder;
        this.config = config;
        this.ngZone = ngZone;
        this.fieldTemplates = fieldTemplates;
        /** Event that is emitted when the model value is changed */
        this.modelChange = new EventEmitter();
        this.field = { type: 'formly-group' };
        this._modelChangeValue = {};
        this.valueChangesUnsubscribe = () => { };
    }
    /** The form instance which allow to track model value and validation status. */
    set form(form) {
        this.field.form = form;
    }
    get form() {
        return this.field.form;
    }
    /** The model to be represented by the form. */
    set model(model) {
        if (this.config.extras.immutable && this._modelChangeValue === model) {
            return;
        }
        this.setField({ model });
    }
    get model() {
        return this.field.model;
    }
    /** The field configurations for building the form. */
    set fields(fieldGroup) {
        this.setField({ fieldGroup });
    }
    get fields() {
        return this.field.fieldGroup;
    }
    /** Options for the form. */
    set options(options) {
        this.setField({ options });
    }
    get options() {
        return this.field.options;
    }
    set templates(templates) {
        this.fieldTemplates.templates = templates;
    }
    ngDoCheck() {
        if (this.config.extras.checkExpressionOn === 'changeDetectionCheck') {
            this.checkExpressionChange();
        }
    }
    ngOnChanges(changes) {
        if (changes.fields && this.form) {
            clearControl(this.form);
        }
        if (changes.fields || changes.form || (changes.model && this._modelChangeValue !== changes.model.currentValue)) {
            this.valueChangesUnsubscribe();
            this.builder.build(this.field);
            this.valueChangesUnsubscribe = this.valueChanges();
        }
    }
    ngOnDestroy() {
        this.valueChangesUnsubscribe();
    }
    checkExpressionChange() {
        this.field.options.checkExpressions?.(this.field);
    }
    valueChanges() {
        this.valueChangesUnsubscribe();
        const sub = this.field.options.fieldChanges
            .pipe(filter(({ field, type }) => hasKey(field) && type === 'valueChanges'), switchMap(() => this.ngZone.onStable.asObservable().pipe(take(1))))
            .subscribe(() => this.ngZone.runGuarded(() => {
            // runGuarded is used to keep in sync the expression changes
            // https://github.com/ngx-formly/ngx-formly/issues/2095
            this.checkExpressionChange();
            this.modelChange.emit((this._modelChangeValue = clone(this.model)));
        }));
        return () => sub.unsubscribe();
    }
    setField(field) {
        if (this.config.extras.immutable) {
            this.field = { ...this.field, ...clone(field) };
        }
        else {
            Object.keys(field).forEach((p) => (this.field[p] = field[p]));
        }
    }
}
FormlyForm.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyForm, deps: [{ token: i1.FormlyFormBuilder }, { token: i2.FormlyConfig }, { token: i0.NgZone }, { token: i3.FormlyFieldTemplates }], target: i0.ɵɵFactoryTarget.Component });
FormlyForm.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyForm, selector: "formly-form", inputs: { form: "form", model: "model", fields: "fields", options: "options" }, outputs: { modelChange: "modelChange" }, providers: [FormlyFormBuilder, FormlyFieldTemplates], queries: [{ propertyName: "templates", predicate: FormlyTemplate }], usesOnChanges: true, ngImport: i0, template: '<formly-field [field]="field"></formly-field>', isInline: true, components: [{ type: i4.FormlyField, selector: "formly-field", inputs: ["field"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyForm, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-form',
                    template: '<formly-field [field]="field"></formly-field>',
                    providers: [FormlyFormBuilder, FormlyFieldTemplates],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.FormlyFormBuilder }, { type: i2.FormlyConfig }, { type: i0.NgZone }, { type: i3.FormlyFieldTemplates }]; }, propDecorators: { form: [{
                type: Input
            }], model: [{
                type: Input
            }], fields: [{
                type: Input
            }], options: [{
                type: Input
            }], modelChange: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [FormlyTemplate]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9zcmMvbGliL2NvbXBvbmVudHMvZm9ybWx5LmZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFHdkIsS0FBSyxFQUVMLFlBQVksRUFDWixNQUFNLEVBR04sZUFBZSxHQUVoQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDOUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7Ozs7QUFFekU7Ozs7R0FJRztBQU9ILE1BQU0sT0FBTyxVQUFVO0lBbURyQixZQUNVLE9BQTBCLEVBQzFCLE1BQW9CLEVBQ3BCLE1BQWMsRUFDZCxjQUFvQztRQUhwQyxZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUMxQixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxtQkFBYyxHQUFkLGNBQWMsQ0FBc0I7UUFkOUMsNERBQTREO1FBQ2xELGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUtoRCxVQUFLLEdBQTJCLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDO1FBQ2pELHNCQUFpQixHQUFRLEVBQUUsQ0FBQztRQUM1Qiw0QkFBdUIsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFPeEMsQ0FBQztJQXZESixnRkFBZ0Y7SUFDaEYsSUFDSSxJQUFJLENBQUMsSUFBMkI7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCwrQ0FBK0M7SUFDL0MsSUFDSSxLQUFLLENBQUMsS0FBVTtRQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssS0FBSyxFQUFFO1lBQ3BFLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFRCxzREFBc0Q7SUFDdEQsSUFDSSxNQUFNLENBQUMsVUFBK0I7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVELDRCQUE0QjtJQUM1QixJQUNJLE9BQU8sQ0FBQyxPQUEwQjtRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBSUQsSUFBcUMsU0FBUyxDQUFDLFNBQW9DO1FBQ2pGLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM1QyxDQUFDO0lBYUQsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEtBQUssc0JBQXNCLEVBQUU7WUFDbkUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQy9CLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekI7UUFFRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLGlCQUFpQixLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDOUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDcEQ7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTyxxQkFBcUI7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLFlBQVk7UUFDbEIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFFL0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWTthQUN4QyxJQUFJLENBQ0gsTUFBTSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssY0FBYyxDQUFDLEVBQ3JFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbkU7YUFDQSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQzFCLDREQUE0RDtZQUM1RCx1REFBdUQ7WUFDdkQsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVKLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFTyxRQUFRLENBQUMsS0FBNkI7UUFDNUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7WUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1NBQ2pEO2FBQU07WUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBRSxJQUFJLENBQUMsS0FBYSxDQUFDLENBQUMsQ0FBQyxHQUFJLEtBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakY7SUFDSCxDQUFDOzt3R0E5R1UsVUFBVTs0RkFBVixVQUFVLCtKQUhWLENBQUMsaUJBQWlCLEVBQUUsb0JBQW9CLENBQUMsb0RBOENuQyxjQUFjLGtEQS9DckIsK0NBQStDOzRGQUk5QyxVQUFVO2tCQU50QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsK0NBQStDO29CQUN6RCxTQUFTLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQztvQkFDcEQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzJMQUlLLElBQUk7c0JBRFAsS0FBSztnQkFVRixLQUFLO3NCQURSLEtBQUs7Z0JBY0YsTUFBTTtzQkFEVCxLQUFLO2dCQVVGLE9BQU87c0JBRFYsS0FBSztnQkFTSSxXQUFXO3NCQUFwQixNQUFNO2dCQUM4QixTQUFTO3NCQUE3QyxlQUFlO3VCQUFDLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBEb0NoZWNrLFxuICBPbkNoYW5nZXMsXG4gIElucHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBFdmVudEVtaXR0ZXIsXG4gIE91dHB1dCxcbiAgT25EZXN0cm95LFxuICBOZ1pvbmUsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUFycmF5IH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcsIEZvcm1seUZvcm1PcHRpb25zLCBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IEZvcm1seUZvcm1CdWlsZGVyIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybWx5LmJ1aWxkZXInO1xuaW1wb3J0IHsgRm9ybWx5Q29uZmlnIH0gZnJvbSAnLi4vc2VydmljZXMvZm9ybWx5LmNvbmZpZyc7XG5pbXBvcnQgeyBjbG9uZSwgaGFzS2V5IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwLCBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjbGVhckNvbnRyb2wgfSBmcm9tICcuLi9leHRlbnNpb25zL2ZpZWxkLWZvcm0vdXRpbHMnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRUZW1wbGF0ZXMsIEZvcm1seVRlbXBsYXRlIH0gZnJvbSAnLi9mb3JtbHkudGVtcGxhdGUnO1xuXG4vKipcbiAqIFRoZSBgPGZvcm0tZm9ybT5gIGNvbXBvbmVudCBpcyB0aGUgbWFpbiBjb250YWluZXIgb2YgdGhlIGZvcm0sXG4gKiB3aGljaCB0YWtlcyBjYXJlIG9mIG1hbmFnaW5nIHRoZSBmb3JtIHN0YXRlXG4gKiBhbmQgZGVsZWdhdGVzIHRoZSByZW5kZXJpbmcgb2YgZWFjaCBmaWVsZCB0byBgPGZvcm1seS1maWVsZD5gIGNvbXBvbmVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZvcm0nLFxuICB0ZW1wbGF0ZTogJzxmb3JtbHktZmllbGQgW2ZpZWxkXT1cImZpZWxkXCI+PC9mb3JtbHktZmllbGQ+JyxcbiAgcHJvdmlkZXJzOiBbRm9ybWx5Rm9ybUJ1aWxkZXIsIEZvcm1seUZpZWxkVGVtcGxhdGVzXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZvcm0gaW1wbGVtZW50cyBEb0NoZWNrLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIC8qKiBUaGUgZm9ybSBpbnN0YW5jZSB3aGljaCBhbGxvdyB0byB0cmFjayBtb2RlbCB2YWx1ZSBhbmQgdmFsaWRhdGlvbiBzdGF0dXMuICovXG4gIEBJbnB1dCgpXG4gIHNldCBmb3JtKGZvcm06IEZvcm1Hcm91cCB8IEZvcm1BcnJheSkge1xuICAgIHRoaXMuZmllbGQuZm9ybSA9IGZvcm07XG4gIH1cbiAgZ2V0IGZvcm0oKTogRm9ybUdyb3VwIHwgRm9ybUFycmF5IHtcbiAgICByZXR1cm4gdGhpcy5maWVsZC5mb3JtO1xuICB9XG5cbiAgLyoqIFRoZSBtb2RlbCB0byBiZSByZXByZXNlbnRlZCBieSB0aGUgZm9ybS4gKi9cbiAgQElucHV0KClcbiAgc2V0IG1vZGVsKG1vZGVsOiBhbnkpIHtcbiAgICBpZiAodGhpcy5jb25maWcuZXh0cmFzLmltbXV0YWJsZSAmJiB0aGlzLl9tb2RlbENoYW5nZVZhbHVlID09PSBtb2RlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0RmllbGQoeyBtb2RlbCB9KTtcbiAgfVxuICBnZXQgbW9kZWwoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5maWVsZC5tb2RlbDtcbiAgfVxuXG4gIC8qKiBUaGUgZmllbGQgY29uZmlndXJhdGlvbnMgZm9yIGJ1aWxkaW5nIHRoZSBmb3JtLiAqL1xuICBASW5wdXQoKVxuICBzZXQgZmllbGRzKGZpZWxkR3JvdXA6IEZvcm1seUZpZWxkQ29uZmlnW10pIHtcbiAgICB0aGlzLnNldEZpZWxkKHsgZmllbGRHcm91cCB9KTtcbiAgfVxuICBnZXQgZmllbGRzKCk6IEZvcm1seUZpZWxkQ29uZmlnW10ge1xuICAgIHJldHVybiB0aGlzLmZpZWxkLmZpZWxkR3JvdXA7XG4gIH1cblxuICAvKiogT3B0aW9ucyBmb3IgdGhlIGZvcm0uICovXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKG9wdGlvbnM6IEZvcm1seUZvcm1PcHRpb25zKSB7XG4gICAgdGhpcy5zZXRGaWVsZCh7IG9wdGlvbnMgfSk7XG4gIH1cbiAgZ2V0IG9wdGlvbnMoKTogRm9ybWx5Rm9ybU9wdGlvbnMge1xuICAgIHJldHVybiB0aGlzLmZpZWxkLm9wdGlvbnM7XG4gIH1cblxuICAvKiogRXZlbnQgdGhhdCBpcyBlbWl0dGVkIHdoZW4gdGhlIG1vZGVsIHZhbHVlIGlzIGNoYW5nZWQgKi9cbiAgQE91dHB1dCgpIG1vZGVsQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBDb250ZW50Q2hpbGRyZW4oRm9ybWx5VGVtcGxhdGUpIHNldCB0ZW1wbGF0ZXModGVtcGxhdGVzOiBRdWVyeUxpc3Q8Rm9ybWx5VGVtcGxhdGU+KSB7XG4gICAgdGhpcy5maWVsZFRlbXBsYXRlcy50ZW1wbGF0ZXMgPSB0ZW1wbGF0ZXM7XG4gIH1cblxuICBmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSA9IHsgdHlwZTogJ2Zvcm1seS1ncm91cCcgfTtcbiAgcHJpdmF0ZSBfbW9kZWxDaGFuZ2VWYWx1ZTogYW55ID0ge307XG4gIHByaXZhdGUgdmFsdWVDaGFuZ2VzVW5zdWJzY3JpYmUgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGJ1aWxkZXI6IEZvcm1seUZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgY29uZmlnOiBGb3JtbHlDb25maWcsXG4gICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICBwcml2YXRlIGZpZWxkVGVtcGxhdGVzOiBGb3JtbHlGaWVsZFRlbXBsYXRlcyxcbiAgKSB7fVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAodGhpcy5jb25maWcuZXh0cmFzLmNoZWNrRXhwcmVzc2lvbk9uID09PSAnY2hhbmdlRGV0ZWN0aW9uQ2hlY2snKSB7XG4gICAgICB0aGlzLmNoZWNrRXhwcmVzc2lvbkNoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5maWVsZHMgJiYgdGhpcy5mb3JtKSB7XG4gICAgICBjbGVhckNvbnRyb2wodGhpcy5mb3JtKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5maWVsZHMgfHwgY2hhbmdlcy5mb3JtIHx8IChjaGFuZ2VzLm1vZGVsICYmIHRoaXMuX21vZGVsQ2hhbmdlVmFsdWUgIT09IGNoYW5nZXMubW9kZWwuY3VycmVudFZhbHVlKSkge1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZXNVbnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5idWlsZGVyLmJ1aWxkKHRoaXMuZmllbGQpO1xuICAgICAgdGhpcy52YWx1ZUNoYW5nZXNVbnN1YnNjcmliZSA9IHRoaXMudmFsdWVDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy52YWx1ZUNoYW5nZXNVbnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0V4cHJlc3Npb25DaGFuZ2UoKSB7XG4gICAgdGhpcy5maWVsZC5vcHRpb25zLmNoZWNrRXhwcmVzc2lvbnM/Lih0aGlzLmZpZWxkKTtcbiAgfVxuXG4gIHByaXZhdGUgdmFsdWVDaGFuZ2VzKCkge1xuICAgIHRoaXMudmFsdWVDaGFuZ2VzVW5zdWJzY3JpYmUoKTtcblxuICAgIGNvbnN0IHN1YiA9IHRoaXMuZmllbGQub3B0aW9ucy5maWVsZENoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKHsgZmllbGQsIHR5cGUgfSkgPT4gaGFzS2V5KGZpZWxkKSAmJiB0eXBlID09PSAndmFsdWVDaGFuZ2VzJyksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLm5nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKHRha2UoMSkpKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT5cbiAgICAgICAgdGhpcy5uZ1pvbmUucnVuR3VhcmRlZCgoKSA9PiB7XG4gICAgICAgICAgLy8gcnVuR3VhcmRlZCBpcyB1c2VkIHRvIGtlZXAgaW4gc3luYyB0aGUgZXhwcmVzc2lvbiBjaGFuZ2VzXG4gICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25neC1mb3JtbHkvbmd4LWZvcm1seS9pc3N1ZXMvMjA5NVxuICAgICAgICAgIHRoaXMuY2hlY2tFeHByZXNzaW9uQ2hhbmdlKCk7XG4gICAgICAgICAgdGhpcy5tb2RlbENoYW5nZS5lbWl0KCh0aGlzLl9tb2RlbENoYW5nZVZhbHVlID0gY2xvbmUodGhpcy5tb2RlbCkpKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgcmV0dXJuICgpID0+IHN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRGaWVsZChmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5leHRyYXMuaW1tdXRhYmxlKSB7XG4gICAgICB0aGlzLmZpZWxkID0geyAuLi50aGlzLmZpZWxkLCAuLi5jbG9uZShmaWVsZCkgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmtleXMoZmllbGQpLmZvckVhY2goKHApID0+ICgodGhpcy5maWVsZCBhcyBhbnkpW3BdID0gKGZpZWxkIGFzIGFueSlbcF0pKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==