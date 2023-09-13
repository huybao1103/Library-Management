import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MessageType } from '../enums/toast-message.enum';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) { }

  show(type: MessageType, message?: string) {
    this.messageService.add({ severity: type, summary: type, detail: message });
  }
}
