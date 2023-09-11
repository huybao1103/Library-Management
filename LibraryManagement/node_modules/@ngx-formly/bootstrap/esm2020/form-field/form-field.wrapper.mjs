import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-formly/core";
import * as i2 from "@angular/common";
export class FormlyWrapperFormField extends FieldWrapper {
}
FormlyWrapperFormField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyWrapperFormField, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyWrapperFormField.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyWrapperFormField, selector: "formly-wrapper-form-field", usesInheritance: true, ngImport: i0, template: `
    <ng-template #labelTemplate>
      <label *ngIf="props.label && props.hideLabel !== true" [attr.for]="id" class="form-label">
        {{ props.label }}
        <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true">*</span>
      </label>
    </ng-template>

    <div class="mb-3" [class.form-floating]="props.labelPosition === 'floating'" [class.has-error]="showError">
      <ng-container *ngIf="props.labelPosition !== 'floating'">
        <ng-container [ngTemplateOutlet]="labelTemplate"></ng-container>
      </ng-container>

      <ng-template #fieldComponent></ng-template>

      <ng-container *ngIf="props.labelPosition === 'floating'">
        <ng-container [ngTemplateOutlet]="labelTemplate"></ng-container>
      </ng-container>

      <div *ngIf="showError" class="invalid-feedback" [style.display]="'block'">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>

      <small *ngIf="props.description" class="form-text text-muted">{{ props.description }}</small>
    </div>
  `, isInline: true, components: [{ type: i1.ɵFormlyValidationMessage, selector: "formly-validation-message", inputs: ["field"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyWrapperFormField, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-wrapper-form-field',
                    template: `
    <ng-template #labelTemplate>
      <label *ngIf="props.label && props.hideLabel !== true" [attr.for]="id" class="form-label">
        {{ props.label }}
        <span *ngIf="props.required && props.hideRequiredMarker !== true" aria-hidden="true">*</span>
      </label>
    </ng-template>

    <div class="mb-3" [class.form-floating]="props.labelPosition === 'floating'" [class.has-error]="showError">
      <ng-container *ngIf="props.labelPosition !== 'floating'">
        <ng-container [ngTemplateOutlet]="labelTemplate"></ng-container>
      </ng-container>

      <ng-template #fieldComponent></ng-template>

      <ng-container *ngIf="props.labelPosition === 'floating'">
        <ng-container [ngTemplateOutlet]="labelTemplate"></ng-container>
      </ng-container>

      <div *ngIf="showError" class="invalid-feedback" [style.display]="'block'">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>

      <small *ngIf="props.description" class="form-text text-muted">{{ props.description }}</small>
    </div>
  `,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1maWVsZC53cmFwcGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3VpL2Jvb3RzdHJhcC9mb3JtLWZpZWxkL3NyYy9mb3JtLWZpZWxkLndyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUErRCxNQUFNLGtCQUFrQixDQUFDOzs7O0FBcUM3RyxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsWUFBaUQ7O29IQUFoRixzQkFBc0I7d0dBQXRCLHNCQUFzQix3RkEzQnZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJUOzRGQUVVLHNCQUFzQjtrQkE3QmxDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJUO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFdyYXBwZXIsIEZvcm1seUZpZWxkQ29uZmlnLCBGb3JtbHlGaWVsZFByb3BzIGFzIENvcmVGb3JtbHlGaWVsZFByb3BzIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5RmllbGRQcm9wcyBleHRlbmRzIENvcmVGb3JtbHlGaWVsZFByb3BzIHtcbiAgaGlkZUxhYmVsPzogYm9vbGVhbjtcbiAgaGlkZVJlcXVpcmVkTWFya2VyPzogYm9vbGVhbjtcbiAgbGFiZWxQb3NpdGlvbj86ICdmbG9hdGluZyc7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS13cmFwcGVyLWZvcm0tZmllbGQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjbGFiZWxUZW1wbGF0ZT5cbiAgICAgIDxsYWJlbCAqbmdJZj1cInByb3BzLmxhYmVsICYmIHByb3BzLmhpZGVMYWJlbCAhPT0gdHJ1ZVwiIFthdHRyLmZvcl09XCJpZFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPlxuICAgICAgICB7eyBwcm9wcy5sYWJlbCB9fVxuICAgICAgICA8c3BhbiAqbmdJZj1cInByb3BzLnJlcXVpcmVkICYmIHByb3BzLmhpZGVSZXF1aXJlZE1hcmtlciAhPT0gdHJ1ZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPio8L3NwYW4+XG4gICAgICA8L2xhYmVsPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8ZGl2IGNsYXNzPVwibWItM1wiIFtjbGFzcy5mb3JtLWZsb2F0aW5nXT1cInByb3BzLmxhYmVsUG9zaXRpb24gPT09ICdmbG9hdGluZydcIiBbY2xhc3MuaGFzLWVycm9yXT1cInNob3dFcnJvclwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInByb3BzLmxhYmVsUG9zaXRpb24gIT09ICdmbG9hdGluZydcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciBbbmdUZW1wbGF0ZU91dGxldF09XCJsYWJlbFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLXRlbXBsYXRlICNmaWVsZENvbXBvbmVudD48L25nLXRlbXBsYXRlPlxuXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwicHJvcHMubGFiZWxQb3NpdGlvbiA9PT0gJ2Zsb2F0aW5nJ1wiPlxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cImxhYmVsVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8ZGl2ICpuZ0lmPVwic2hvd0Vycm9yXCIgY2xhc3M9XCJpbnZhbGlkLWZlZWRiYWNrXCIgW3N0eWxlLmRpc3BsYXldPVwiJ2Jsb2NrJ1wiPlxuICAgICAgICA8Zm9ybWx5LXZhbGlkYXRpb24tbWVzc2FnZSBbZmllbGRdPVwiZmllbGRcIj48L2Zvcm1seS12YWxpZGF0aW9uLW1lc3NhZ2U+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHNtYWxsICpuZ0lmPVwicHJvcHMuZGVzY3JpcHRpb25cIiBjbGFzcz1cImZvcm0tdGV4dCB0ZXh0LW11dGVkXCI+e3sgcHJvcHMuZGVzY3JpcHRpb24gfX08L3NtYWxsPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBGb3JtbHlXcmFwcGVyRm9ybUZpZWxkIGV4dGVuZHMgRmllbGRXcmFwcGVyPEZvcm1seUZpZWxkQ29uZmlnPEZvcm1seUZpZWxkUHJvcHM+PiB7fVxuIl19