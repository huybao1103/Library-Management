import { Injectable } from "@angular/core";
import { ICategory, ICategorySave } from "src/app/models/category.model";
import { IComboboxOption } from "src/app/models/combobox-option.model";
import { HttpService } from "src/app/services/http-service.service";
import { BehaviorSubject, Observable, concatMap, map, of, switchMap, tap } from 'rxjs';
import { ToastService } from "src/app/services/toast.service";

@Injectable({
    providedIn: 'root'
  })
  export class CategoryService {
    private _category$?: BehaviorSubject<ICategory[]>;


    constructor(private httpService: HttpService,private toastService: ToastService) { }
    
    ////api/Categories
    getAll() {
      return this.httpService.getAll<ICategory[]>({ controller: 'Categories' });
    }
  
    getCategoryById(id: string) {
      return this.httpService.getById<ICategory>({controller: 'Categories'}, id);
    }
  
    save(data: ICategorySave) {
      return this.httpService.save<ICategorySave>({ controller: 'Categories', data, op: 'category-info'});
    }
  
    getBookOption() {
      return this.httpService.getOption<IComboboxOption>({ controller: 'Books' });
    }
  
    updateAuthorState(res: ICategory): Observable<null> {
      this._category$?.next([...this._category$.value, res]);
      console.log(this._category$?.value)
      return of(null);
    }
  }
  