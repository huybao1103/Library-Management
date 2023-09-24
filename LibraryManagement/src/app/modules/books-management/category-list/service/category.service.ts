import { Injectable } from "@angular/core";
import { IComboboxOption } from "src/app/models/combobox-option.model";
import { HttpService } from "src/app/services/http-service.service";
import { BehaviorSubject, Observable, concatMap, map, of, switchMap, tap } from 'rxjs';
import { ToastService } from "src/app/services/toast.service";
import { ICategory } from "src/app/models/category.model";

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService {
    private category$: BehaviorSubject<ICategory[]> = new BehaviorSubject<ICategory[]>([]);;


    constructor(
      private httpService: HttpService,
      private toastService: ToastService
      ) { }
    
    /////api/Categories/get-by-id/{id}
    getAll() {
      return this.httpService.getAll<ICategory[]>({ controller: 'Categories' }).pipe(
        tap((x) => {
          if(x?.length) 
            this.category$.next(x)
        }),
        concatMap(() => this.category$ ? this.category$.asObservable() : of([]))
      );
    }
  
    getCategoryById(id: string) {
      return this.httpService.getById<ICategory>({controller: 'Categories'}, id);
    }
  
    save(data: ICategory) {
      return this.httpService.save<ICategory>({ controller: 'Categories', data, op: 'category-info'}).pipe(
        tap((res) => res ? this.updateCategoriesState(res) : of())
      );
    }
  
    getCategoryOption() {
      return this.httpService.getOption<IComboboxOption>({ controller: 'Categories' });
    }

    delete(id: string){
      return this.httpService.delete<ICategory>({controller: 'Categories'}, id).pipe(
        tap(() => this.updateCategoriesState(undefined, id))
      );
    }
  
    private updateCategoriesState(res?: ICategory, deletedCategoryId?: string, ) {
      let old = this.category$.value;
    
      if(res) {
        const updated = old.find(p => p.id === res.id);
        
        old = updated ? old.filter(p => p.id !== updated.id) : old;
    
        this.category$.next([res, ...old]);
      } else if(deletedCategoryId) {
        old = old.filter(p => p.id !== deletedCategoryId);
    
        this.category$.next([...old]);
      }
    
    }
  }
  