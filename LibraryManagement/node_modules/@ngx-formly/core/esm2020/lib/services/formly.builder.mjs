import { Injectable, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { defineHiddenProp, observe, disableTreeValidityCall } from '../utils';
import * as i0 from "@angular/core";
import * as i1 from "./formly.config";
import * as i2 from "@angular/forms";
export class FormlyFormBuilder {
    constructor(config, injector, viewContainerRef, parentForm) {
        this.config = config;
        this.injector = injector;
        this.viewContainerRef = viewContainerRef;
        this.parentForm = parentForm;
    }
    buildForm(form, fieldGroup = [], model, options) {
        this.build({ fieldGroup, model, form, options });
    }
    build(field) {
        if (!this.config.extensions.core) {
            throw new Error('NgxFormly: missing `forRoot()` call. use `forRoot()` when registering the `FormlyModule`.');
        }
        if (!field.parent) {
            this._setOptions(field);
            disableTreeValidityCall(field.form, () => {
                this._build(field);
                const options = field.options;
                options.checkExpressions?.(field, true);
                options.detectChanges?.(field);
            });
        }
        else {
            this._build(field);
        }
    }
    _build(field) {
        if (!field) {
            return;
        }
        const extensions = Object.values(this.config.extensions);
        extensions.forEach((extension) => extension.prePopulate?.(field));
        extensions.forEach((extension) => extension.onPopulate?.(field));
        field.fieldGroup?.forEach((f) => this._build(f));
        extensions.forEach((extension) => extension.postPopulate?.(field));
    }
    _setOptions(field) {
        field.form = field.form || new FormGroup({});
        field.model = field.model || {};
        field.options = field.options || {};
        const options = field.options;
        if (!options._viewContainerRef) {
            defineHiddenProp(options, '_viewContainerRef', this.viewContainerRef);
        }
        if (!options._injector) {
            defineHiddenProp(options, '_injector', this.injector);
        }
        if (!options.build) {
            options._buildForm = () => {
                console.warn(`Formly: 'options._buildForm' is deprecated since v6.0, use 'options.build' instead.`);
                this.build(field);
            };
            options.build = (f = field) => {
                this.build(f);
                return f;
            };
        }
        if (!options.parentForm && this.parentForm) {
            defineHiddenProp(options, 'parentForm', this.parentForm);
            observe(options, ['parentForm', 'submitted'], ({ firstChange }) => {
                if (!firstChange) {
                    options.checkExpressions(field);
                    options.detectChanges(field);
                }
            });
        }
    }
}
FormlyFormBuilder.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFormBuilder, deps: [{ token: i1.FormlyConfig }, { token: i0.Injector }, { token: i0.ViewContainerRef, optional: true }, { token: i2.FormGroupDirective, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
FormlyFormBuilder.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFormBuilder, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FormlyFormBuilder, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.FormlyConfig }, { type: i0.Injector }, { type: i0.ViewContainerRef, decorators: [{
                    type: Optional
                }] }, { type: i2.FormGroupDirective, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWx5LmJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9zcmMvbGliL3NlcnZpY2VzL2Zvcm1seS5idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVksUUFBUSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUNqRixPQUFPLEVBQUUsU0FBUyxFQUFpQyxNQUFNLGdCQUFnQixDQUFDO0FBRzFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxVQUFVLENBQUM7Ozs7QUFHOUUsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixZQUNVLE1BQW9CLEVBQ3BCLFFBQWtCLEVBQ04sZ0JBQWtDLEVBQ2xDLFVBQThCO1FBSDFDLFdBQU0sR0FBTixNQUFNLENBQWM7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNOLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZUFBVSxHQUFWLFVBQVUsQ0FBb0I7SUFDakQsQ0FBQztJQUVKLFNBQVMsQ0FBQyxJQUEyQixFQUFFLGFBQWtDLEVBQUUsRUFBRSxLQUFVLEVBQUUsT0FBMEI7UUFDakgsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUF3QjtRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkZBQTJGLENBQUMsQ0FBQztTQUM5RztRQUVELElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsdUJBQXVCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLE1BQU0sT0FBTyxHQUFJLEtBQWdDLENBQUMsT0FBTyxDQUFDO2dCQUMxRCxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVPLE1BQU0sQ0FBQyxLQUE2QjtRQUMxQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTztTQUNSO1FBRUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLEtBQUssQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVPLFdBQVcsQ0FBQyxLQUE2QjtRQUMvQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNoQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ3BDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtZQUM5QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdkU7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUN0QixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN2RDtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2xCLE9BQU8sQ0FBQyxVQUFVLEdBQUcsR0FBRyxFQUFFO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLHFGQUFxRixDQUFDLENBQUM7Z0JBQ3BHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDO1lBRUYsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQXVCLEtBQUssRUFBRSxFQUFFO2dCQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVkLE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDO1NBQ0g7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pELE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7Z0JBQ2hFLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ2hCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDOUI7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7K0dBOUVVLGlCQUFpQjttSEFBakIsaUJBQWlCLGNBREosTUFBTTs0RkFDbkIsaUJBQWlCO2tCQUQ3QixVQUFVO21CQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRTs7MEJBSzdCLFFBQVE7OzBCQUNSLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciwgT3B0aW9uYWwsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUFycmF5LCBGb3JtR3JvdXBEaXJlY3RpdmUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtbHlDb25maWcgfSBmcm9tICcuL2Zvcm1seS5jb25maWcnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcsIEZvcm1seUZvcm1PcHRpb25zLCBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IGRlZmluZUhpZGRlblByb3AsIG9ic2VydmUsIGRpc2FibGVUcmVlVmFsaWRpdHlDYWxsIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEZvcm1seUZvcm1CdWlsZGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWc6IEZvcm1seUNvbmZpZyxcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBwYXJlbnRGb3JtOiBGb3JtR3JvdXBEaXJlY3RpdmUsXG4gICkge31cblxuICBidWlsZEZvcm0oZm9ybTogRm9ybUdyb3VwIHwgRm9ybUFycmF5LCBmaWVsZEdyb3VwOiBGb3JtbHlGaWVsZENvbmZpZ1tdID0gW10sIG1vZGVsOiBhbnksIG9wdGlvbnM6IEZvcm1seUZvcm1PcHRpb25zKSB7XG4gICAgdGhpcy5idWlsZCh7IGZpZWxkR3JvdXAsIG1vZGVsLCBmb3JtLCBvcHRpb25zIH0pO1xuICB9XG5cbiAgYnVpbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5leHRlbnNpb25zLmNvcmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTmd4Rm9ybWx5OiBtaXNzaW5nIGBmb3JSb290KClgIGNhbGwuIHVzZSBgZm9yUm9vdCgpYCB3aGVuIHJlZ2lzdGVyaW5nIHRoZSBgRm9ybWx5TW9kdWxlYC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIWZpZWxkLnBhcmVudCkge1xuICAgICAgdGhpcy5fc2V0T3B0aW9ucyhmaWVsZCk7XG4gICAgICBkaXNhYmxlVHJlZVZhbGlkaXR5Q2FsbChmaWVsZC5mb3JtLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2J1aWxkKGZpZWxkKTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IChmaWVsZCBhcyBGb3JtbHlGaWVsZENvbmZpZ0NhY2hlKS5vcHRpb25zO1xuICAgICAgICBvcHRpb25zLmNoZWNrRXhwcmVzc2lvbnM/LihmaWVsZCwgdHJ1ZSk7XG4gICAgICAgIG9wdGlvbnMuZGV0ZWN0Q2hhbmdlcz8uKGZpZWxkKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9idWlsZChmaWVsZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGQoZmllbGQ6IEZvcm1seUZpZWxkQ29uZmlnQ2FjaGUpIHtcbiAgICBpZiAoIWZpZWxkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZXh0ZW5zaW9ucyA9IE9iamVjdC52YWx1ZXModGhpcy5jb25maWcuZXh0ZW5zaW9ucyk7XG4gICAgZXh0ZW5zaW9ucy5mb3JFYWNoKChleHRlbnNpb24pID0+IGV4dGVuc2lvbi5wcmVQb3B1bGF0ZT8uKGZpZWxkKSk7XG4gICAgZXh0ZW5zaW9ucy5mb3JFYWNoKChleHRlbnNpb24pID0+IGV4dGVuc2lvbi5vblBvcHVsYXRlPy4oZmllbGQpKTtcbiAgICBmaWVsZC5maWVsZEdyb3VwPy5mb3JFYWNoKChmKSA9PiB0aGlzLl9idWlsZChmKSk7XG4gICAgZXh0ZW5zaW9ucy5mb3JFYWNoKChleHRlbnNpb24pID0+IGV4dGVuc2lvbi5wb3N0UG9wdWxhdGU/LihmaWVsZCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0T3B0aW9ucyhmaWVsZDogRm9ybWx5RmllbGRDb25maWdDYWNoZSkge1xuICAgIGZpZWxkLmZvcm0gPSBmaWVsZC5mb3JtIHx8IG5ldyBGb3JtR3JvdXAoe30pO1xuICAgIGZpZWxkLm1vZGVsID0gZmllbGQubW9kZWwgfHwge307XG4gICAgZmllbGQub3B0aW9ucyA9IGZpZWxkLm9wdGlvbnMgfHwge307XG4gICAgY29uc3Qgb3B0aW9ucyA9IGZpZWxkLm9wdGlvbnM7XG5cbiAgICBpZiAoIW9wdGlvbnMuX3ZpZXdDb250YWluZXJSZWYpIHtcbiAgICAgIGRlZmluZUhpZGRlblByb3Aob3B0aW9ucywgJ192aWV3Q29udGFpbmVyUmVmJywgdGhpcy52aWV3Q29udGFpbmVyUmVmKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuX2luamVjdG9yKSB7XG4gICAgICBkZWZpbmVIaWRkZW5Qcm9wKG9wdGlvbnMsICdfaW5qZWN0b3InLCB0aGlzLmluamVjdG9yKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMuYnVpbGQpIHtcbiAgICAgIG9wdGlvbnMuX2J1aWxkRm9ybSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS53YXJuKGBGb3JtbHk6ICdvcHRpb25zLl9idWlsZEZvcm0nIGlzIGRlcHJlY2F0ZWQgc2luY2UgdjYuMCwgdXNlICdvcHRpb25zLmJ1aWxkJyBpbnN0ZWFkLmApO1xuICAgICAgICB0aGlzLmJ1aWxkKGZpZWxkKTtcbiAgICAgIH07XG5cbiAgICAgIG9wdGlvbnMuYnVpbGQgPSAoZjogRm9ybWx5RmllbGRDb25maWcgPSBmaWVsZCkgPT4ge1xuICAgICAgICB0aGlzLmJ1aWxkKGYpO1xuXG4gICAgICAgIHJldHVybiBmO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMucGFyZW50Rm9ybSAmJiB0aGlzLnBhcmVudEZvcm0pIHtcbiAgICAgIGRlZmluZUhpZGRlblByb3Aob3B0aW9ucywgJ3BhcmVudEZvcm0nLCB0aGlzLnBhcmVudEZvcm0pO1xuICAgICAgb2JzZXJ2ZShvcHRpb25zLCBbJ3BhcmVudEZvcm0nLCAnc3VibWl0dGVkJ10sICh7IGZpcnN0Q2hhbmdlIH0pID0+IHtcbiAgICAgICAgaWYgKCFmaXJzdENoYW5nZSkge1xuICAgICAgICAgIG9wdGlvbnMuY2hlY2tFeHByZXNzaW9ucyhmaWVsZCk7XG4gICAgICAgICAgb3B0aW9ucy5kZXRlY3RDaGFuZ2VzKGZpZWxkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=