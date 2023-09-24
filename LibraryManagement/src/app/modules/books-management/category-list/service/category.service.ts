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
    private _category$?: BehaviorSubject<ICategory[]>;


    constructor(
      private httpService: HttpService,
      private toastService: ToastService
      ) { }
    
    /////api/Categories/get-by-id/{id}
    getAll() {
      return this.httpService.getAll<ICategory[]>({ controller: 'Categories' });
    }
  
    getCategoryById(id: string) {
      return this.httpService.getById<ICategory>({controller: 'Categories'}, id);
    }
  
    save(data: ICategory) {
      return this.httpService.save<ICategory>({ controller: 'Categories', data, op: 'category-info'});
    }
  
    getCategoryOption() {
      return this.httpService.getOption<IComboboxOption>({ controller: 'Categories' });
    }
  
    updateCategoryrState(res: ICategory): Observable<null> {
      this._category$?.next([...this._category$.value, res]);
      console.log(this._category$?.value)
      return of(null);
    }

    delete(id: string){
      return this.httpService.delete<ICategory>({controller: 'Categories'}, id);
    }

  }
  