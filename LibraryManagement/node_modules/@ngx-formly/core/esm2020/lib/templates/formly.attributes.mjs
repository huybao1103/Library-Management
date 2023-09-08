import { Directive, Input, Inject, } from '@angular/core';
import { defineHiddenProp, FORMLY_VALIDATORS, observe } from '../utils';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
/**
 * Allow to link the `field` HTML attributes (`id`, `name` ...) and Event attributes (`focus`, `blur` ...) to an element in the DOM.
 */
export class FormlyAttributes {
    constructor(renderer, elementRef, _document) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.uiAttributesCache = {};
        /**
         * HostBinding doesn't register listeners conditionally which may produce some perf issues.
         *
         * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1991
         */
        this.uiEvents = {
            listeners: [],
            events: ['click', 'keyup', 'keydown', 'keypress', 'focus', 'blur', 'change'],
            callback: (eventName, $event) => {
                switch (eventName) {
                    case 'focus':
                        return this.onFocus($event);
                    case 'blur':
                        return this.onBlur($event);
                    case 'change':
                        return this.onChange($event);
                    default:
                        return this.props[eventName](this.field, $event);
                }
            },
        };
        this.document = _document;
    }
    get props() {
        return this.field.props || {};
    }
    get fieldAttrElements() {
        return this.field?.['_elementRefs'] || [];
    }
    ngOnChanges(changes) {
        if (changes.field) {
            this.field.name && this.setAttribute('name', this.field.name);
            this.uiEvents.listeners.forEach((listener) => listener());
            this.uiEvents.events.forEach((eventName) => {
                if (this.props?.[eventName] || ['focus', 'blur', 'change'].indexOf(eventName) !== -1) {
                    this.uiEvents.listeners.push(this.renderer.listen(this.elementRef.nativeElement, eventName, (e) => this.uiEvents.callback(eventName, e)));
                }
            });
            if (this.props?.attributes) {
                observe(this.field, ['props', 'attributes'], ({ currentValue, previousValue }) => {
                    if (previousValue) {
                        Object.keys(previousValue).forEach((attr) => this.removeAttribute(attr));
                    }
                    if (currentValue) {
                        Object.keys(currentValue).forEach((attr) => {
                            if (currentValue[attr] != null) {
                                this.setAttribute(attr, currentValue[attr]);
                            }
                        });
                    }
                });
            }
            this.detachElementRef(changes.field.previousValue);
            this.attachElementRef(changes.field.currentValue);
            if (this.fieldAttrElements.length === 1) {
                !this.id && this.field.id && this.setAttribute('id', this.field.id);
                this.focusObserver = observe(this.field, ['focus'], ({ currentValue }) => {
                    this.toggleFocus(currentValue);
                });
            }
        }
        if (changes.id) {
            this.setAttribute('id', this.id);
        }
    }
    /**
     * We need to re-evaluate all the attributes on every change detection cycle, because
     * by using a HostBinding we run into certain edge cases. This means that whatever logic
     * is in here has to be super lean or we risk seriously damaging or destroying the performance.
     *
     * Formly issue: https://github.com/ngx-formly/ngx-formly/issues/1317
     * Material issue: https://github.com/angular/components/issues/14024
     */
    ngDoCheck() {
        if (!this.uiAttributes) {
            const element = this.elementRef.nativeElement;
            this.uiAttributes = [...FORMLY_VALIDATORS, 'tabindex', 'placeholder', 'readonly', 'disabled', 'step'].filter((attr) => !element.hasAttribute || !element.hasAttribute(attr));
        }
        this.uiAttributes.forEach((attr) => {
            const value = this.props[attr];
            if (this.uiAttributesCache[attr] !== value &&
                (!this.props.attributes || !this.props.attributes.hasOwnProperty(attr.toLowerCase()))) {
                this.uiAttributesCache[attr] = value;
                if (value || value === 0) {
                    this.setAttribute(attr, value === true ? attr : `${value}`);
                }
                else {
                    this.removeAttribute(attr);
                }
            }
        });
    }
    ngOnDestroy() {
        this.uiEvents.listeners.forEach((listener) => listener());
        this.detachElementRef(this.field);
        this.focusObserver?.unsubscribe();
    }
    toggleFocus(value) {
        const element = this.fieldAttrElements ? this.fieldAttrElements[0] : null;
        if (!element || !element.nativeElement.focus) {
            return;
        }
        const isFocused = !!this.document.activeElement &&
            this.fieldAttrElements.some(({ nativeElement }) => this.document.activeElement === nativeElement || nativeElement.contains(this.document.activeElement));
        if (value && !isFocused) {
            Promise.resolve().then(() => element.nativeElement.focus());
        }
        else if (!value && isFocused) {
            Promise.resolve().then(() => element.nativeElement.blur());
        }
    }
    onFocus($event) {
        this.focusObserver?.setValue(true);
        this.props.focus?.(this.field, $event);
    }
    onBlur($event) {
        this.focusObserver?.setValue(false);
        this.props.blur?.(this.field, $event);
    }
    // handle custom `change` event, for regular ones rely on DOM listener
    onHostChange($event) {
        if ($event instanceof Event) {
            return;
        }
        this.onChange($event);
    }
    onChange($event) {
        this.props.change?.(this.field, $event);
        this.field.formControl?.markAsDirty();
    }
    attachElementRef(f) {
        if (!f) {
            return;
        }
        if (f['_elementRefs']?.indexOf(this.elementRef) === -1) {
            f['_elementRefs'].push(this.elementRef);
        }
        else {
            defineHiddenProp(f, '_elementRefs', [this.elementRef]);
        }
    }
    detachElementRef(f) {
        const index = f?.['_elementRefs'] ? this.fieldAttrElements.indexOf(this.elementRef) : -1;
        if (index !== -1) {
            f['_elementRefs'].splice(index, 1);
        }
    }
    setAttribute(attr, value) {
        this.renderer.setAttribute(this.elementRef.nativeElement, attr, value);
    }
    removeAttribute(attr) {
        this.renderer.removeAttribute(this.elementRef.nativeElement, attr);
    }
}
FormlyAttributes.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyAttributes, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
FormlyAttributes.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FormlyAttributes, selector: "[formlyAttributes]", inputs: { field: ["formlyAttributes", "field"], id: "id" }, host: { listeners: { "change": "onHostChange($event)" } }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyAttributes, decorators: [{
            type: Directive,
            args: [{
                    selector: '[formlyAttributes]',
                    host: {
                        '(change)': 'onHostChange($event)',
                    },
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { field: [{
                type: Input,
                args: ['formlyAttributes']
            }], id: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmF0dHJpYnV0ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9zcmMvbGliL3RlbXBsYXRlcy9mb3JtbHkuYXR0cmlidXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFLTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBYSxNQUFNLFVBQVUsQ0FBQztBQUNuRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRTNDOztHQUVHO0FBT0gsTUFBTSxPQUFPLGdCQUFnQjtJQXdDM0IsWUFBb0IsUUFBbUIsRUFBVSxVQUFzQixFQUFvQixTQUFjO1FBQXJGLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBbEMvRCxzQkFBaUIsR0FBUSxFQUFFLENBQUM7UUFJcEM7Ozs7V0FJRztRQUNLLGFBQVEsR0FBRztZQUNqQixTQUFTLEVBQUUsRUFBZ0I7WUFDM0IsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO1lBQzVFLFFBQVEsRUFBRSxDQUFDLFNBQWlCLEVBQUUsTUFBVyxFQUFFLEVBQUU7Z0JBQzNDLFFBQVEsU0FBUyxFQUFFO29CQUNqQixLQUFLLE9BQU87d0JBQ1YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM5QixLQUFLLE1BQU07d0JBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUM3QixLQUFLLFFBQVE7d0JBQ1gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMvQjt3QkFDRSxP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QUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDOzs4R0FsTVUsZ0JBQWdCLHFFQXdDc0QsUUFBUTtrR0F4QzlFLGdCQUFnQjs0RkFBaEIsZ0JBQWdCO2tCQU41QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLElBQUksRUFBRTt3QkFDSixVQUFVLEVBQUUsc0JBQXNCO3FCQUNuQztpQkFDRjs7MEJBeUMyRSxNQUFNOzJCQUFDLFFBQVE7NENBdEM5RCxLQUFLO3NCQUEvQixLQUFLO3VCQUFDLGtCQUFrQjtnQkFDaEIsRUFBRTtzQkFBVixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBSZW5kZXJlcjIsXG4gIERvQ2hlY2ssXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1seUZpZWxkQ29uZmlnLCBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IGRlZmluZUhpZGRlblByb3AsIEZPUk1MWV9WQUxJREFUT1JTLCBvYnNlcnZlLCBJT2JzZXJ2ZXIgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8qKlxuICogQWxsb3cgdG8gbGluayB0aGUgYGZpZWxkYCBIVE1MIGF0dHJpYnV0ZXMgKGBpZGAsIGBuYW1lYCAuLi4pIGFuZCBFdmVudCBhdHRyaWJ1dGVzIChgZm9jdXNgLCBgYmx1cmAgLi4uKSB0byBhbiBlbGVtZW50IGluIHRoZSBET00uXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tmb3JtbHlBdHRyaWJ1dGVzXScsXG4gIGhvc3Q6IHtcbiAgICAnKGNoYW5nZSknOiAnb25Ib3N0Q2hhbmdlKCRldmVudCknLFxuICB9LFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlBdHRyaWJ1dGVzIGltcGxlbWVudHMgT25DaGFuZ2VzLCBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICAvKiogVGhlIGZpZWxkIGNvbmZpZy4gKi9cbiAgQElucHV0KCdmb3JtbHlBdHRyaWJ1dGVzJykgZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnO1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuXG4gIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50O1xuICBwcml2YXRlIHVpQXR0cmlidXRlc0NhY2hlOiBhbnkgPSB7fTtcbiAgcHJpdmF0ZSB1aUF0dHJpYnV0ZXM6IHN0cmluZ1tdO1xuICBwcml2YXRlIGZvY3VzT2JzZXJ2ZXI6IElPYnNlcnZlcjxib29sZWFuPjtcblxuICAvKipcbiAgICogSG9zdEJpbmRpbmcgZG9lc24ndCByZWdpc3RlciBsaXN0ZW5lcnMgY29uZGl0aW9uYWxseSB3aGljaCBtYXkgcHJvZHVjZSBzb21lIHBlcmYgaXNzdWVzLlxuICAgKlxuICAgKiBGb3JtbHkgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9uZ3gtZm9ybWx5L25neC1mb3JtbHkvaXNzdWVzLzE5OTFcbiAgICovXG4gIHByaXZhdGUgdWlFdmVudHMgPSB7XG4gICAgbGlzdGVuZXJzOiBbXSBhcyBGdW5jdGlvbltdLFxuICAgIGV2ZW50czogWydjbGljaycsICdrZXl1cCcsICdrZXlkb3duJywgJ2tleXByZXNzJywgJ2ZvY3VzJywgJ2JsdXInLCAnY2hhbmdlJ10sXG4gICAgY2FsbGJhY2s6IChldmVudE5hbWU6IHN0cmluZywgJGV2ZW50OiBhbnkpID0+IHtcbiAgICAgIHN3aXRjaCAoZXZlbnROYW1lKSB7XG4gICAgICAgIGNhc2UgJ2ZvY3VzJzpcbiAgICAgICAgICByZXR1cm4gdGhpcy5vbkZvY3VzKCRldmVudCk7XG4gICAgICAgIGNhc2UgJ2JsdXInOlxuICAgICAgICAgIHJldHVybiB0aGlzLm9uQmx1cigkZXZlbnQpO1xuICAgICAgICBjYXNlICdjaGFuZ2UnOlxuICAgICAgICAgIHJldHVybiB0aGlzLm9uQ2hhbmdlKCRldmVudCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHNbZXZlbnROYW1lXSh0aGlzLmZpZWxkLCAkZXZlbnQpO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgcHJpdmF0ZSBnZXQgcHJvcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGQucHJvcHMgfHwgKHt9IGFzIEZvcm1seUZpZWxkQ29uZmlnQ2FjaGVbJ3Byb3BzJ10pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgZmllbGRBdHRyRWxlbWVudHMoKTogRWxlbWVudFJlZltdIHtcbiAgICByZXR1cm4gKHRoaXMuZmllbGQgYXMgRm9ybWx5RmllbGRDb25maWdDYWNoZSk/LlsnX2VsZW1lbnRSZWZzJ10gfHwgW107XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnkpIHtcbiAgICB0aGlzLmRvY3VtZW50ID0gX2RvY3VtZW50O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzLmZpZWxkKSB7XG4gICAgICB0aGlzLmZpZWxkLm5hbWUgJiYgdGhpcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLmZpZWxkLm5hbWUpO1xuICAgICAgdGhpcy51aUV2ZW50cy5saXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IGxpc3RlbmVyKCkpO1xuICAgICAgdGhpcy51aUV2ZW50cy5ldmVudHMuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzPy5bZXZlbnROYW1lXSB8fCBbJ2ZvY3VzJywgJ2JsdXInLCAnY2hhbmdlJ10uaW5kZXhPZihldmVudE5hbWUpICE9PSAtMSkge1xuICAgICAgICAgIHRoaXMudWlFdmVudHMubGlzdGVuZXJzLnB1c2goXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZXZlbnROYW1lLCAoZSkgPT4gdGhpcy51aUV2ZW50cy5jYWxsYmFjayhldmVudE5hbWUsIGUpKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMucHJvcHM/LmF0dHJpYnV0ZXMpIHtcbiAgICAgICAgb2JzZXJ2ZSh0aGlzLmZpZWxkLCBbJ3Byb3BzJywgJ2F0dHJpYnV0ZXMnXSwgKHsgY3VycmVudFZhbHVlLCBwcmV2aW91c1ZhbHVlIH0pID0+IHtcbiAgICAgICAgICBpZiAocHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXMocHJldmlvdXNWYWx1ZSkuZm9yRWFjaCgoYXR0cikgPT4gdGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXR0cikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGN1cnJlbnRWYWx1ZSkuZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgICAgICAgICBpZiAoY3VycmVudFZhbHVlW2F0dHJdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHRyLCBjdXJyZW50VmFsdWVbYXR0cl0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRldGFjaEVsZW1lbnRSZWYoY2hhbmdlcy5maWVsZC5wcmV2aW91c1ZhbHVlKTtcbiAgICAgIHRoaXMuYXR0YWNoRWxlbWVudFJlZihjaGFuZ2VzLmZpZWxkLmN1cnJlbnRWYWx1ZSk7XG4gICAgICBpZiAodGhpcy5maWVsZEF0dHJFbGVtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgIXRoaXMuaWQgJiYgdGhpcy5maWVsZC5pZCAmJiB0aGlzLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmZpZWxkLmlkKTtcbiAgICAgICAgdGhpcy5mb2N1c09ic2VydmVyID0gb2JzZXJ2ZTxib29sZWFuPih0aGlzLmZpZWxkLCBbJ2ZvY3VzJ10sICh7IGN1cnJlbnRWYWx1ZSB9KSA9PiB7XG4gICAgICAgICAgdGhpcy50b2dnbGVGb2N1cyhjdXJyZW50VmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5pZCkge1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5pZCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdlIG5lZWQgdG8gcmUtZXZhbHVhdGUgYWxsIHRoZSBhdHRyaWJ1dGVzIG9uIGV2ZXJ5IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUsIGJlY2F1c2VcbiAgICogYnkgdXNpbmcgYSBIb3N0QmluZGluZyB3ZSBydW4gaW50byBjZXJ0YWluIGVkZ2UgY2FzZXMuIFRoaXMgbWVhbnMgdGhhdCB3aGF0ZXZlciBsb2dpY1xuICAgKiBpcyBpbiBoZXJlIGhhcyB0byBiZSBzdXBlciBsZWFuIG9yIHdlIHJpc2sgc2VyaW91c2x5IGRhbWFnaW5nIG9yIGRlc3Ryb3lpbmcgdGhlIHBlcmZvcm1hbmNlLlxuICAgKlxuICAgKiBGb3JtbHkgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9uZ3gtZm9ybWx5L25neC1mb3JtbHkvaXNzdWVzLzEzMTdcbiAgICogTWF0ZXJpYWwgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzE0MDI0XG4gICAqL1xuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKCF0aGlzLnVpQXR0cmlidXRlcykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgdGhpcy51aUF0dHJpYnV0ZXMgPSBbLi4uRk9STUxZX1ZBTElEQVRPUlMsICd0YWJpbmRleCcsICdwbGFjZWhvbGRlcicsICdyZWFkb25seScsICdkaXNhYmxlZCcsICdzdGVwJ10uZmlsdGVyKFxuICAgICAgICAoYXR0cikgPT4gIWVsZW1lbnQuaGFzQXR0cmlidXRlIHx8ICFlbGVtZW50Lmhhc0F0dHJpYnV0ZShhdHRyKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy51aUF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cikgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzW2F0dHJdO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnVpQXR0cmlidXRlc0NhY2hlW2F0dHJdICE9PSB2YWx1ZSAmJlxuICAgICAgICAoIXRoaXMucHJvcHMuYXR0cmlidXRlcyB8fCAhdGhpcy5wcm9wcy5hdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KGF0dHIudG9Mb3dlckNhc2UoKSkpXG4gICAgICApIHtcbiAgICAgICAgdGhpcy51aUF0dHJpYnV0ZXNDYWNoZVthdHRyXSA9IHZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgfHwgdmFsdWUgPT09IDApIHtcbiAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSA9PT0gdHJ1ZSA/IGF0dHIgOiBgJHt2YWx1ZX1gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy51aUV2ZW50cy5saXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IGxpc3RlbmVyKCkpO1xuICAgIHRoaXMuZGV0YWNoRWxlbWVudFJlZih0aGlzLmZpZWxkKTtcbiAgICB0aGlzLmZvY3VzT2JzZXJ2ZXI/LnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICB0b2dnbGVGb2N1cyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmZpZWxkQXR0ckVsZW1lbnRzID8gdGhpcy5maWVsZEF0dHJFbGVtZW50c1swXSA6IG51bGw7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpc0ZvY3VzZWQgPVxuICAgICAgISF0aGlzLmRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiZcbiAgICAgIHRoaXMuZmllbGRBdHRyRWxlbWVudHMuc29tZShcbiAgICAgICAgKHsgbmF0aXZlRWxlbWVudCB9KSA9PlxuICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gbmF0aXZlRWxlbWVudCB8fCBuYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRoaXMuZG9jdW1lbnQuYWN0aXZlRWxlbWVudCksXG4gICAgICApO1xuXG4gICAgaWYgKHZhbHVlICYmICFpc0ZvY3VzZWQpIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCkpO1xuICAgIH0gZWxzZSBpZiAoIXZhbHVlICYmIGlzRm9jdXNlZCkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuYmx1cigpKTtcbiAgICB9XG4gIH1cblxuICBvbkZvY3VzKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5mb2N1c09ic2VydmVyPy5zZXRWYWx1ZSh0cnVlKTtcbiAgICB0aGlzLnByb3BzLmZvY3VzPy4odGhpcy5maWVsZCwgJGV2ZW50KTtcbiAgfVxuXG4gIG9uQmx1cigkZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuZm9jdXNPYnNlcnZlcj8uc2V0VmFsdWUoZmFsc2UpO1xuICAgIHRoaXMucHJvcHMuYmx1cj8uKHRoaXMuZmllbGQsICRldmVudCk7XG4gIH1cblxuICAvLyBoYW5kbGUgY3VzdG9tIGBjaGFuZ2VgIGV2ZW50LCBmb3IgcmVndWxhciBvbmVzIHJlbHkgb24gRE9NIGxpc3RlbmVyXG4gIG9uSG9zdENoYW5nZSgkZXZlbnQ6IGFueSkge1xuICAgIGlmICgkZXZlbnQgaW5zdGFuY2VvZiBFdmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMub25DaGFuZ2UoJGV2ZW50KTtcbiAgfVxuXG4gIG9uQ2hhbmdlKCRldmVudDogYW55KSB7XG4gICAgdGhpcy5wcm9wcy5jaGFuZ2U/Lih0aGlzLmZpZWxkLCAkZXZlbnQpO1xuICAgIHRoaXMuZmllbGQuZm9ybUNvbnRyb2w/Lm1hcmtBc0RpcnR5KCk7XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaEVsZW1lbnRSZWYoZjogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIGlmICghZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChmWydfZWxlbWVudFJlZnMnXT8uaW5kZXhPZih0aGlzLmVsZW1lbnRSZWYpID09PSAtMSkge1xuICAgICAgZlsnX2VsZW1lbnRSZWZzJ10ucHVzaCh0aGlzLmVsZW1lbnRSZWYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKGYsICdfZWxlbWVudFJlZnMnLCBbdGhpcy5lbGVtZW50UmVmXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRhY2hFbGVtZW50UmVmKGY6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBjb25zdCBpbmRleCA9IGY/LlsnX2VsZW1lbnRSZWZzJ10gPyB0aGlzLmZpZWxkQXR0ckVsZW1lbnRzLmluZGV4T2YodGhpcy5lbGVtZW50UmVmKSA6IC0xO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGZbJ19lbGVtZW50UmVmcyddLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRBdHRyaWJ1dGUoYXR0cjogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIGF0dHIsIHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQXR0cmlidXRlKGF0dHI6IHN0cmluZykge1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCBhdHRyKTtcbiAgfVxufVxuIl19