import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  showConfirmDialog(message: string, header?: string): Observable<boolean> {
    return new Observable((res) => {
      this.confirmationService.confirm({
        message: message,
        header: header ? header : 'Confirmation',
        icon: 'fa fa-circle-exclamation',
        key: 'positionDialog',
        accept: () => res.next(true),
        reject: () => res.next(false),
      }).requireConfirmation$
    })
  }
}
