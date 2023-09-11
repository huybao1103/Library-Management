import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SelectControlValueAccessor } from '@angular/forms';
import { FieldType } from '@ngx-formly/bootstrap/form-field';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@ngx-formly/core";
import * as i4 from "@ngx-formly/core/select";
export class FormlyFieldSelect extends FieldType {
    constructor(ngZone, hostContainerRef) {
        super(hostContainerRef);
        this.ngZone = ngZone;
        this.defaultOptions = {
            props: {
                compareWith(o1, o2) {
                    return o1 === o2;
                },
            },
        };
    }
    // workaround for https://github.com/angular/angular/issues/10010
    /**
     * TODO: Check if this is still needed
     */
    set selectAccessor(s) {
        if (!s) {
            return;
        }
        const writeValue = s.writeValue.bind(s);
        if (s._getOptionId(s.value) === null) {
            writeValue(s.value);
        }
        s.writeValue = (value) => {
            const id = s._idCounter;
            writeValue(value);
            if (value === null) {
                this.ngZone.onStable
                    .asObservable()
                    .pipe(take(1))
                    .subscribe(() => {
                    if (id !== s._idCounter &&
                        s._getOptionId(value) === null &&
                        s._elementRef.nativeElement.selectedIndex !== -1) {
                        writeValue(value);
                    }
                });
            }
        };
    }
}
FormlyFieldSelect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldSelect, deps: [{ token: i0.NgZone }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
FormlyFieldSelect.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FormlyFieldSelect, selector: "formly-field-select", viewQueries: [{ propertyName: "selectAccessor", first: true, predicate: SelectControlValueAccessor, descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ng-template #fieldTypeTemplate>
      <select
        *ngIf="props.multiple; else singleSelect"
        class="form-select"
        multiple
        [formControl]="formControl"
        [compareWith]="props.compareWith"
        [class.is-invalid]="showError"
        [formlyAttributes]="field"
      >
        <ng-container *ngIf="props.options | formlySelectOptions : field | async as opts">
          <ng-container *ngFor="let opt of opts">
            <option *ngIf="!opt.group; else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">
              {{ opt.label }}
            </option>
            <ng-template #optgroup>
              <optgroup [label]="opt.label">
                <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                  {{ child.label }}
                </option>
              </optgroup>
            </ng-template>
          </ng-container>
        </ng-container>
      </select>

      <ng-template #singleSelect>
        <select
          class="form-select"
          [formControl]="formControl"
          [compareWith]="props.compareWith"
          [class.is-invalid]="showError"
          [formlyAttributes]="field"
        >
          <option *ngIf="props.placeholder" [ngValue]="undefined">{{ props.placeholder }}</option>
          <ng-container *ngIf="props.options | formlySelectOptions : field | async as opts">
            <ng-container *ngFor="let opt of opts">
              <option *ngIf="!opt.group; else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">
                {{ opt.label }}
              </option>
              <ng-template #optgroup>
                <optgroup [label]="opt.label">
                  <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                    {{ child.label }}
                  </option>
                </optgroup>
              </ng-template>
            </ng-container>
          </ng-container>
        </select>
      </ng-template>
    </ng-template>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.SelectMultipleControlValueAccessor, selector: "select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]", inputs: ["compareWith"] }, { type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.ɵFormlyAttributes, selector: "[formlyAttributes]", inputs: ["formlyAttributes", "id"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }], pipes: { "async": i1.AsyncPipe, "formlySelectOptions": i4.FormlySelectOptionsPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFieldSelect, decorators: [{
            type: Component,
            args: [{
                    selector: 'formly-field-select',
                    template: `
    <ng-template #fieldTypeTemplate>
      <select
        *ngIf="props.multiple; else singleSelect"
        class="form-select"
        multiple
        [formControl]="formControl"
        [compareWith]="props.compareWith"
        [class.is-invalid]="showError"
        [formlyAttributes]="field"
      >
        <ng-container *ngIf="props.options | formlySelectOptions : field | async as opts">
          <ng-container *ngFor="let opt of opts">
            <option *ngIf="!opt.group; else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">
              {{ opt.label }}
            </option>
            <ng-template #optgroup>
              <optgroup [label]="opt.label">
                <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                  {{ child.label }}
                </option>
              </optgroup>
            </ng-template>
          </ng-container>
        </ng-container>
      </select>

      <ng-template #singleSelect>
        <select
          class="form-select"
          [formControl]="formControl"
          [compareWith]="props.compareWith"
          [class.is-invalid]="showError"
          [formlyAttributes]="field"
        >
          <option *ngIf="props.placeholder" [ngValue]="undefined">{{ props.placeholder }}</option>
          <ng-container *ngIf="props.options | formlySelectOptions : field | async as opts">
            <ng-container *ngFor="let opt of opts">
              <option *ngIf="!opt.group; else optgroup" [ngValue]="opt.value" [disabled]="opt.disabled">
                {{ opt.label }}
              </option>
              <ng-template #optgroup>
                <optgroup [label]="opt.label">
                  <option *ngFor="let child of opt.group" [ngValue]="child.value" [disabled]="child.disabled">
                    {{ child.label }}
                  </option>
                </optgroup>
              </ng-template>
            </ng-container>
          </ng-container>
        </select>
      </ng-template>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: i0.ViewContainerRef }]; }, propDecorators: { selectAccessor: [{
                type: ViewChild,
                args: [SelectControlValueAccessor]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LnR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWkvYm9vdHN0cmFwL3NlbGVjdC9zcmMvc2VsZWN0LnR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQWtDLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTVELE9BQU8sRUFBRSxTQUFTLEVBQW9CLE1BQU0sa0NBQWtDLENBQUM7QUFDL0UsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFzRXRDLE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxTQUF1QztJQTJDNUUsWUFBb0IsTUFBYyxFQUFFLGdCQUFrQztRQUNwRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUROLFdBQU0sR0FBTixNQUFNLENBQVE7UUExQ3pCLG1CQUFjLEdBQUc7WUFDeEIsS0FBSyxFQUFFO2dCQUNMLFdBQVcsQ0FBQyxFQUFPLEVBQUUsRUFBTztvQkFDMUIsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDO2dCQUNuQixDQUFDO2FBQ0Y7U0FDRixDQUFDO0lBc0NGLENBQUM7SUFwQ0QsaUVBQWlFO0lBQ2pFOztPQUVHO0lBQ0gsSUFBMkMsY0FBYyxDQUFDLENBQU07UUFDOUQsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNOLE9BQU87U0FDUjtRQUVELE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3BDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckI7UUFFRCxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUU7WUFDNUIsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUN4QixVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO2dCQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7cUJBQ2pCLFlBQVksRUFBRTtxQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNiLFNBQVMsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QsSUFDRSxFQUFFLEtBQUssQ0FBQyxDQUFDLFVBQVU7d0JBQ25CLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSTt3QkFDOUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxLQUFLLENBQUMsQ0FBQyxFQUNoRDt3QkFDQSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ25CO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDOzsrR0F6Q1UsaUJBQWlCO21HQUFqQixpQkFBaUIsMkdBYWpCLDBCQUEwQix1RUFyRTNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFEVDs0RkFHVSxpQkFBaUI7a0JBMUQ3QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxRFQ7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzRIQWM0QyxjQUFjO3NCQUF4RCxTQUFTO3VCQUFDLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdDaGlsZCwgTmdab25lLCBUeXBlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZpZWxkVHlwZUNvbmZpZywgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICdAbmd4LWZvcm1seS9jb3JlJztcbmltcG9ydCB7IEZpZWxkVHlwZSwgRm9ybWx5RmllbGRQcm9wcyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2Jvb3RzdHJhcC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBGb3JtbHlGaWVsZFNlbGVjdFByb3BzIH0gZnJvbSAnQG5neC1mb3JtbHkvY29yZS9zZWxlY3QnO1xuXG5pbnRlcmZhY2UgU2VsZWN0UHJvcHMgZXh0ZW5kcyBGb3JtbHlGaWVsZFByb3BzLCBGb3JtbHlGaWVsZFNlbGVjdFByb3BzIHtcbiAgbXVsdGlwbGU/OiBib29sZWFuO1xuICBjb21wYXJlV2l0aD86IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1seVNlbGVjdEZpZWxkQ29uZmlnIGV4dGVuZHMgRm9ybWx5RmllbGRDb25maWc8U2VsZWN0UHJvcHM+IHtcbiAgdHlwZTogJ3NlbGVjdCcgfCBUeXBlPEZvcm1seUZpZWxkU2VsZWN0Pjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZm9ybWx5LWZpZWxkLXNlbGVjdCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLXRlbXBsYXRlICNmaWVsZFR5cGVUZW1wbGF0ZT5cbiAgICAgIDxzZWxlY3RcbiAgICAgICAgKm5nSWY9XCJwcm9wcy5tdWx0aXBsZTsgZWxzZSBzaW5nbGVTZWxlY3RcIlxuICAgICAgICBjbGFzcz1cImZvcm0tc2VsZWN0XCJcbiAgICAgICAgbXVsdGlwbGVcbiAgICAgICAgW2Zvcm1Db250cm9sXT1cImZvcm1Db250cm9sXCJcbiAgICAgICAgW2NvbXBhcmVXaXRoXT1cInByb3BzLmNvbXBhcmVXaXRoXCJcbiAgICAgICAgW2NsYXNzLmlzLWludmFsaWRdPVwic2hvd0Vycm9yXCJcbiAgICAgICAgW2Zvcm1seUF0dHJpYnV0ZXNdPVwiZmllbGRcIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwicHJvcHMub3B0aW9ucyB8IGZvcm1seVNlbGVjdE9wdGlvbnMgOiBmaWVsZCB8IGFzeW5jIGFzIG9wdHNcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBvcHQgb2Ygb3B0c1wiPlxuICAgICAgICAgICAgPG9wdGlvbiAqbmdJZj1cIiFvcHQuZ3JvdXA7IGVsc2Ugb3B0Z3JvdXBcIiBbbmdWYWx1ZV09XCJvcHQudmFsdWVcIiBbZGlzYWJsZWRdPVwib3B0LmRpc2FibGVkXCI+XG4gICAgICAgICAgICAgIHt7IG9wdC5sYWJlbCB9fVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgI29wdGdyb3VwPlxuICAgICAgICAgICAgICA8b3B0Z3JvdXAgW2xhYmVsXT1cIm9wdC5sYWJlbFwiPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IGNoaWxkIG9mIG9wdC5ncm91cFwiIFtuZ1ZhbHVlXT1cImNoaWxkLnZhbHVlXCIgW2Rpc2FibGVkXT1cImNoaWxkLmRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAgICB7eyBjaGlsZC5sYWJlbCB9fVxuICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L29wdGdyb3VwPlxuICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L3NlbGVjdD5cblxuICAgICAgPG5nLXRlbXBsYXRlICNzaW5nbGVTZWxlY3Q+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICBjbGFzcz1cImZvcm0tc2VsZWN0XCJcbiAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZm9ybUNvbnRyb2xcIlxuICAgICAgICAgIFtjb21wYXJlV2l0aF09XCJwcm9wcy5jb21wYXJlV2l0aFwiXG4gICAgICAgICAgW2NsYXNzLmlzLWludmFsaWRdPVwic2hvd0Vycm9yXCJcbiAgICAgICAgICBbZm9ybWx5QXR0cmlidXRlc109XCJmaWVsZFwiXG4gICAgICAgID5cbiAgICAgICAgICA8b3B0aW9uICpuZ0lmPVwicHJvcHMucGxhY2Vob2xkZXJcIiBbbmdWYWx1ZV09XCJ1bmRlZmluZWRcIj57eyBwcm9wcy5wbGFjZWhvbGRlciB9fTwvb3B0aW9uPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJwcm9wcy5vcHRpb25zIHwgZm9ybWx5U2VsZWN0T3B0aW9ucyA6IGZpZWxkIHwgYXN5bmMgYXMgb3B0c1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgb3B0IG9mIG9wdHNcIj5cbiAgICAgICAgICAgICAgPG9wdGlvbiAqbmdJZj1cIiFvcHQuZ3JvdXA7IGVsc2Ugb3B0Z3JvdXBcIiBbbmdWYWx1ZV09XCJvcHQudmFsdWVcIiBbZGlzYWJsZWRdPVwib3B0LmRpc2FibGVkXCI+XG4gICAgICAgICAgICAgICAge3sgb3B0LmxhYmVsIH19XG4gICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI29wdGdyb3VwPlxuICAgICAgICAgICAgICAgIDxvcHRncm91cCBbbGFiZWxdPVwib3B0LmxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBjaGlsZCBvZiBvcHQuZ3JvdXBcIiBbbmdWYWx1ZV09XCJjaGlsZC52YWx1ZVwiIFtkaXNhYmxlZF09XCJjaGlsZC5kaXNhYmxlZFwiPlxuICAgICAgICAgICAgICAgICAgICB7eyBjaGlsZC5sYWJlbCB9fVxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9vcHRncm91cD5cbiAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZpZWxkU2VsZWN0IGV4dGVuZHMgRmllbGRUeXBlPEZpZWxkVHlwZUNvbmZpZzxTZWxlY3RQcm9wcz4+IHtcbiAgb3ZlcnJpZGUgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgcHJvcHM6IHtcbiAgICAgIGNvbXBhcmVXaXRoKG8xOiBhbnksIG8yOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG8xID09PSBvMjtcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICAvLyB3b3JrYXJvdW5kIGZvciBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMDAxMFxuICAvKipcbiAgICogVE9ETzogQ2hlY2sgaWYgdGhpcyBpcyBzdGlsbCBuZWVkZWRcbiAgICovXG4gIEBWaWV3Q2hpbGQoU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3IpIHNldCBzZWxlY3RBY2Nlc3NvcihzOiBhbnkpIHtcbiAgICBpZiAoIXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB3cml0ZVZhbHVlID0gcy53cml0ZVZhbHVlLmJpbmQocyk7XG4gICAgaWYgKHMuX2dldE9wdGlvbklkKHMudmFsdWUpID09PSBudWxsKSB7XG4gICAgICB3cml0ZVZhbHVlKHMudmFsdWUpO1xuICAgIH1cblxuICAgIHMud3JpdGVWYWx1ZSA9ICh2YWx1ZTogYW55KSA9PiB7XG4gICAgICBjb25zdCBpZCA9IHMuX2lkQ291bnRlcjtcbiAgICAgIHdyaXRlVmFsdWUodmFsdWUpO1xuICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlXG4gICAgICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgaWQgIT09IHMuX2lkQ291bnRlciAmJlxuICAgICAgICAgICAgICBzLl9nZXRPcHRpb25JZCh2YWx1ZSkgPT09IG51bGwgJiZcbiAgICAgICAgICAgICAgcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNlbGVjdGVkSW5kZXggIT09IC0xXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgd3JpdGVWYWx1ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIGhvc3RDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBzdXBlcihob3N0Q29udGFpbmVyUmVmKTtcbiAgfVxufVxuIl19