import { ViewContainerRef, ViewChild, Directive } from '@angular/core';
import { FieldType } from './field.type';
import * as i0 from "@angular/core";
export class FieldWrapper extends FieldType {
    set _staticContent(content) {
        this.fieldComponent = content;
    }
}
FieldWrapper.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldWrapper, deps: null, target: i0.ɵɵFactoryTarget.Directive });
FieldWrapper.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: FieldWrapper, viewQueries: [{ propertyName: "fieldComponent", first: true, predicate: ["fieldComponent"], descendants: true, read: ViewContainerRef }, { propertyName: "_staticContent", first: true, predicate: ["fieldComponent"], descendants: true, read: ViewContainerRef, static: true }], usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FieldWrapper, decorators: [{
            type: Directive
        }], propDecorators: { fieldComponent: [{
                type: ViewChild,
                args: ['fieldComponent', { read: ViewContainerRef }]
            }], _staticContent: [{
                type: ViewChild,
                args: ['fieldComponent', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQud3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3NyYy9saWIvdGVtcGxhdGVzL2ZpZWxkLndyYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7QUFJekMsTUFBTSxPQUFnQixZQUE4RCxTQUFRLFNBQVk7SUFFdEcsSUFBMkUsY0FBYyxDQUFDLE9BQXlCO1FBQ2pILElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0lBQ2hDLENBQUM7OzBHQUptQixZQUFZOzhGQUFaLFlBQVksdUhBQ0ssZ0JBQWdCLDJHQUNoQixnQkFBZ0I7NEZBRmpDLFlBQVk7a0JBRGpDLFNBQVM7OEJBRWlELGNBQWM7c0JBQXRFLFNBQVM7dUJBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7Z0JBQ29CLGNBQWM7c0JBQXhGLFNBQVM7dUJBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXdDb250YWluZXJSZWYsIFZpZXdDaGlsZCwgRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuL2ZpZWxkLnR5cGUnO1xuaW1wb3J0IHsgRm9ybWx5RmllbGRDb25maWcgfSBmcm9tICcuLi9tb2RlbHMnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGaWVsZFdyYXBwZXI8RiBleHRlbmRzIEZvcm1seUZpZWxkQ29uZmlnID0gRm9ybWx5RmllbGRDb25maWc+IGV4dGVuZHMgRmllbGRUeXBlPEY+IHtcbiAgQFZpZXdDaGlsZCgnZmllbGRDb21wb25lbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYgfSkgZmllbGRDb21wb25lbnQhOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdmaWVsZENvbXBvbmVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIHNldCBfc3RhdGljQ29udGVudChjb250ZW50OiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgdGhpcy5maWVsZENvbXBvbmVudCA9IGNvbnRlbnQ7XG4gIH1cbn1cbiJdfQ==