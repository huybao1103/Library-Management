import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ngx-formly/core";
import * as i3 from "@ngx-formly/core/select";
export class FormlyFieldMultiCheckbox extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            props: {
                formCheck: 'default', // 'default' | 'inline' | 'switch' | 'inline-switch'
            },
        };
    }
    onChange(value, checked) {
        this.formControl.markAsDirty();
        if (this.props.type === 'array') {
            this.formControl.patchValue(checked
                ? [...(this.formControl.value || []), value]
                : [...(this.formControl.value || [])].filter((o) => o !== value));
        }
        else {
            this.formControl.patchValue({ ...this.formControl.value, [value]: checked });
        }
        this.formControl.markAsTouched();
    }
    isChecked(option) {
        const value = this.formControl.value;
        return value && (this.props.type === 'array' ? value.indexOf(option.value) !== -1 : value[option.value]);
    }
}
FormlyFieldMultiCheckbox.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldMultiCheckbox, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldMultiCheckbox.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldMultiCheckbox, selector: "formly-field-multicheckbox", usesInheritance: true, ngImport: i0, template: `
    <ng-template #fieldTypeTemplate>
      <div
        *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index"
        class="form-check"
        [ngClass]="{
          'form-check-inline': props.formCheck === 'inline' || props.formCheck === 'inline-switch',
          'form-switch': props.formCheck === 'switch' || props.formCheck === 'inline-switch'
        }"
      >
        <input
          type="checkbox"
          [id]="id + '_' + i"
          class="form-check-input"
          [value]="option.value"
          [checked]="isChecked(option)"
          [formlyAttributes]="field"
          [disabled]="formControl.disabled || option.disabled"
          (change)="onChange(option.value, $any($event.target).checked)"
        />
        <label class="form-check-label" [for]="id + '_' + i">
          {{ option.label }}
        </label>
      </div>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }], pipes: { "async": i1.AsyncPipe, "formlySelectOptions": i3.FormlySelectOptionsPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldMultiCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-multicheckbox',
                    template: `
    <ng-template #fieldTypeTemplate>
      <div
        *ngFor="let option of props.options | formlySelectOptions : field | async; let i = index"
        class="form-check"
        [ngClass]="{
          'form-check-inline': props.formCheck === 'inline' || props.formCheck === 'inline-switch',
          'form-switch': props.formCheck === 'switch' || props.formCheck === 'inline-switch'
        }"
      >
        <input
          type="checkbox"
          [id]="id + '_' + i"
          class="form-check-input"
          [value]="option.value"
          [checked]="isChecked(option)"
          [formlyAttributes]="field"
          [disabled]="formControl.disabled || option.disabled"
          (change)="onChange(option.value, $any($event.target).checked)"
        />
        <label class="form-check-label" [for]="id + '_' + i">
          {{ option.label }}
        </label>
      </div>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGljaGVja2JveC50eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL2Jvb3RzdHJhcC9tdWx0aWNoZWNrYm94L3NyYy9tdWx0aWNoZWNrYm94LnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUV6RSxPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLGtDQUFrQyxDQUFDOzs7OztBQXdDL0UsTUFBTSxPQUFPLHdCQUF5QixTQUFRLFNBQThDO0lBOUI1Rjs7UUErQlcsbUJBQWMsR0FBRztZQUN4QixLQUFLLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLFNBQWtCLEVBQUUsb0RBQW9EO2FBQ3BGO1NBQ0YsQ0FBQztLQXFCSDtJQW5CQyxRQUFRLENBQUMsS0FBVSxFQUFFLE9BQWdCO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQ3pCLE9BQU87Z0JBQ0wsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztnQkFDNUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQ25FLENBQUM7U0FDSDthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUM5RTtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFXO1FBQ25CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBRXJDLE9BQU8sS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNHLENBQUM7O3NIQXpCVSx3QkFBd0I7MEdBQXhCLHdCQUF3Qix5RkE1QnpCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJUOzRGQUdVLHdCQUF3QjtrQkE5QnBDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZUNvbmZpZywgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRm9ybWx5RmllbGRQcm9wcyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC9mb3JtLWZpZWxkJztcblxuaW50ZXJmYWNlIE11bHRpQ2hlY2tib3hQcm9wcyBleHRlbmRzIEZvcm1seUZpZWxkUHJvcHMge1xuICBmb3JtQ2hlY2s6ICdkZWZhdWx0JyB8ICdpbmxpbmUnIHwgJ3N3aXRjaCcgfCAnaW5saW5lLXN3aXRjaCc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5TXVsdGlDaGVja2JveEZpZWxkQ29uZmlnIGV4dGVuZHMgRm9ybWx5RmllbGRDb25maWc8TXVsdGlDaGVja2JveFByb3BzPiB7XG4gIHR5cGU6ICdtdWx0aWNoZWNrYm94JyB8IFR5cGU8Rm9ybWx5RmllbGRNdWx0aUNoZWNrYm94Pjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZpZWxkLW11bHRpY2hlY2tib3gnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZmllbGRUeXBlVGVtcGxhdGU+XG4gICAgICA8ZGl2XG4gICAgICAgICpuZ0Zvcj1cImxldCBvcHRpb24gb2YgcHJvcHMub3B0aW9ucyB8IGZvcm1seVNlbGVjdE9wdGlvbnMgOiBmaWVsZCB8IGFzeW5jOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgY2xhc3M9XCJmb3JtLWNoZWNrXCJcbiAgICAgICAgW25nQ2xhc3NdPVwie1xuICAgICAgICAgICdmb3JtLWNoZWNrLWlubGluZSc6IHByb3BzLmZvcm1DaGVjayA9PT0gJ2lubGluZScgfHwgcHJvcHMuZm9ybUNoZWNrID09PSAnaW5saW5lLXN3aXRjaCcsXG4gICAgICAgICAgJ2Zvcm0tc3dpdGNoJzogcHJvcHMuZm9ybUNoZWNrID09PSAnc3dpdGNoJyB8fCBwcm9wcy5mb3JtQ2hlY2sgPT09ICdpbmxpbmUtc3dpdGNoJ1xuICAgICAgICB9XCJcbiAgICAgID5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICBbaWRdPVwiaWQgKyAnXycgKyBpXCJcbiAgICAgICAgICBjbGFzcz1cImZvcm0tY2hlY2staW5wdXRcIlxuICAgICAgICAgIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIlxuICAgICAgICAgIFtjaGVja2VkXT1cImlzQ2hlY2tlZChvcHRpb24pXCJcbiAgICAgICAgICBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiXG4gICAgICAgICAgW2Rpc2FibGVkXT1cImZvcm1Db250cm9sLmRpc2FibGVkIHx8IG9wdGlvbi5kaXNhYmxlZFwiXG4gICAgICAgICAgKGNoYW5nZSk9XCJvbkNoYW5nZShvcHRpb24udmFsdWUsICRhbnkoJGV2ZW50LnRhcmdldCkuY2hlY2tlZClcIlxuICAgICAgICAvPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsXCIgW2Zvcl09XCJpZCArICdfJyArIGlcIj5cbiAgICAgICAgICB7eyBvcHRpb24ubGFiZWwgfX1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlGaWVsZE11bHRpQ2hlY2tib3ggZXh0ZW5kcyBGaWVsZFR5cGU8RmllbGRUeXBlQ29uZmlnPE11bHRpQ2hlY2tib3hQcm9wcz4+IHtcbiAgb3ZlcnJpZGUgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgIGZvcm1DaGVjazogJ2RlZmF1bHQnIGFzIGNvbnN0LCAvLyAnZGVmYXVsdCcgfCAnaW5saW5lJyB8ICdzd2l0Y2gnIHwgJ2lubGluZS1zd2l0Y2gnXG4gICAgfSxcbiAgfTtcblxuICBvbkNoYW5nZSh2YWx1ZTogYW55LCBjaGVja2VkOiBib29sZWFuKSB7XG4gICAgdGhpcy5mb3JtQ29udHJvbC5tYXJrQXNEaXJ0eSgpO1xuICAgIGlmICh0aGlzLnByb3BzLnR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wucGF0Y2hWYWx1ZShcbiAgICAgICAgY2hlY2tlZFxuICAgICAgICAgID8gWy4uLih0aGlzLmZvcm1Db250cm9sLnZhbHVlIHx8IFtdKSwgdmFsdWVdXG4gICAgICAgICAgOiBbLi4uKHRoaXMuZm9ybUNvbnRyb2wudmFsdWUgfHwgW10pXS5maWx0ZXIoKG8pID0+IG8gIT09IHZhbHVlKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2wucGF0Y2hWYWx1ZSh7IC4uLnRoaXMuZm9ybUNvbnRyb2wudmFsdWUsIFt2YWx1ZV06IGNoZWNrZWQgfSk7XG4gICAgfVxuICAgIHRoaXMuZm9ybUNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICB9XG5cbiAgaXNDaGVja2VkKG9wdGlvbjogYW55KSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmZvcm1Db250cm9sLnZhbHVlO1xuXG4gICAgcmV0dXJuIHZhbHVlICYmICh0aGlzLnByb3BzLnR5cGUgPT09ICdhcnJheScgPyB2YWx1ZS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgIT09IC0xIDogdmFsdWVbb3B0aW9uLnZhbHVlXSk7XG4gIH1cbn1cbiJdfQ==