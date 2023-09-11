import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@ngx-formly/core";
export class FormlyFieldTextArea extends FieldType {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            props: {
                cols: 1,
                rows: 1,
            },
        };
    }
}
FormlyFieldTextArea.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldTextArea, deps: null, target: i0.ɵɵFactoryTarget.Component });
FormlyFieldTextArea.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldTextArea, selector: "formly-field-textarea", usesInheritance: true, ngImport: i0, template: `
    <ng-template #fieldTypeTemplate>
      <textarea
        [formControl]="formControl"
        [cols]="props.cols"
        [rows]="props.rows"
        class="form-control"
        [class.is-invalid]="showError"
        [formlyAttributes]="field"
      >
      </textarea>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i2.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldTextArea, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-textarea',
                    template: `
    <ng-template #fieldTypeTemplate>
      <textarea
        [formControl]="formControl"
        [cols]="props.cols"
        [rows]="props.rows"
        class="form-control"
        [class.is-invalid]="showError"
        [formlyAttributes]="field"
      >
      </textarea>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEudHlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS9ib290c3RyYXAvdGV4dGFyZWEvc3JjL3RleHRhcmVhLnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUV6RSxPQUFPLEVBQUUsU0FBUyxFQUFvQixNQUFNLGtDQUFrQyxDQUFDOzs7O0FBNEIvRSxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsU0FBeUM7SUFqQmxGOztRQWtCVyxtQkFBYyxHQUFHO1lBQ3hCLEtBQUssRUFBRTtnQkFDTCxJQUFJLEVBQUUsQ0FBQztnQkFDUCxJQUFJLEVBQUUsQ0FBQzthQUNSO1NBQ0YsQ0FBQztLQUNIOztpSEFQWSxtQkFBbUI7cUdBQW5CLG1CQUFtQixvRkFmcEI7Ozs7Ozs7Ozs7OztHQVlUOzRGQUdVLG1CQUFtQjtrQkFqQi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7R0FZVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtpQkFDaEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGVDb25maWcsIEZvcm1seUZpZWxkQ29uZmlnIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGUsIEZvcm1seUZpZWxkUHJvcHMgfSBmcm9tICdAbmd4LWZvcm1seS9ib290c3RyYXAvZm9ybS1maWVsZCc7XG5cbmludGVyZmFjZSBUZXh0QXJlYVByb3BzIGV4dGVuZHMgRm9ybWx5RmllbGRQcm9wcyB7XG4gIGNvbHM/OiBudW1iZXI7XG4gIHJvd3M/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWx5VGV4dEFyZWFGaWVsZENvbmZpZyBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnPFRleHRBcmVhUHJvcHM+IHtcbiAgdHlwZTogJ3RleHRhcmVhJyB8IFR5cGU8Rm9ybWx5RmllbGRUZXh0QXJlYT47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Zvcm1seS1maWVsZC10ZXh0YXJlYScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNmaWVsZFR5cGVUZW1wbGF0ZT5cbiAgICAgIDx0ZXh0YXJlYVxuICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICBbY29sc109XCJwcm9wcy5jb2xzXCJcbiAgICAgICAgW3Jvd3NdPVwicHJvcHMucm93c1wiXG4gICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgW2NsYXNzLmlzLWludmFsaWRdPVwic2hvd0Vycm9yXCJcbiAgICAgICAgW2Zvcm1seUF0dHJpYnV0ZXNdPVwiZmllbGRcIlxuICAgICAgPlxuICAgICAgPC90ZXh0YXJlYT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWx5RmllbGRUZXh0QXJlYSBleHRlbmRzIEZpZWxkVHlwZTxGaWVsZFR5cGVDb25maWc8VGV4dEFyZWFQcm9wcz4+IHtcbiAgb3ZlcnJpZGUgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgIGNvbHM6IDEsXG4gICAgICByb3dzOiAxLFxuICAgIH0sXG4gIH07XG59XG4iXX0=