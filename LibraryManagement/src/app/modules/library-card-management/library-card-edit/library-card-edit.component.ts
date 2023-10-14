import { IDialogType } from 'src/app/models/modal/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { uniqueId } from 'lodash';
import { FileUpload } from 'primeng/fileupload';
import { of } from 'rxjs';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { IAuthor } from 'src/app/models/author.model';
import { IBookAuthor, IBookImage, IBookPublisher, IBookSave } from 'src/app/models/book.model';
import { ToastService } from 'src/app/services/toast.service';
import { BookAuthorEditComponent } from '../../books-management/book-info-edit/book-author-edit/book-author-edit.component';
import { LibraryCardInfoField } from './library-card-info.form';
import { ILibraryCardInfo, IStudentImage } from 'src/app/models/library-card.model';
import { LibraryCardService } from '../service/library-card.service';
import { LibraryCardStatus } from 'src/app/enums/library-card-status';

@Component({
  selector: 'app-library-card-edit',
  templateUrl: './library-card-edit.component.html',
  styleUrls: ['./library-card-edit.component.css']
})
export class LibraryCardEditComponent implements IDialogType {
  uniqueId: string = uniqueId('book-info');
  title: string = '';

  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
      }
    }
  };
  
  data: ILibraryCardInfo = {
    name: '',
    class: '',
    expiryDate: new Date().toISOString(),
    status: LibraryCardStatus.Active,
    description: '',
    studentId: ''
  };

  studentImage: IStudentImage[] = [];

  constructor(
    private modalService: NgbModal,
    private modal: NgbActiveModal,
    private _toastService: ToastService,
    private libraryCardService: LibraryCardService
  ) {
  }
  
  dialogInit(para: {id: string}): void {
    this.title = "Add Library Card";
    if (para.id) {
      this.title = "Edit Library Card Information";
      this.loadData(para.id);
    } else {
      this.fields = LibraryCardInfoField();
    }
  }

  loadData(bookId: string) {
    this.libraryCardService.getLibraryCardById(bookId).subscribe({
      next: (res) => {
        if(res) {
          this.data = {
            ...res,
          };

          if(this.data.studentImages?.length) {
            this.studentImage = [...this.data.studentImages]
          }
          
          this.fields = LibraryCardInfoField();
        }
      }
    })
  }

  uploadFile(event: {files: File[]}, uploader: FileUpload) {
    console.log(event.files)
    for(let file of event.files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        // Will print the base64 here.
        this.studentImage.push({
          base64: fileReader.result as string,
          file: { fileName: file.name }
        })
        fileReader.abort();
      };
    }
  }

  removeFile(fileId: string) {
    this.studentImage = this.studentImage.filter(file => file.id !== fileId);
  }

  submit() {
    if(this.data) {
      this.data = {
        ...this.data,
        studentImages: this.studentImage
      }
      
      this.libraryCardService.save(this.data).subscribe({
        next: (res) => {
          this._toastService.show(MessageType.success, 'Add Library Card successfully');
          this.close();
        },
        error: (err: HttpErrorResponse) => {
          this._toastService.show(MessageType.error, err.error?.detail);
        }
      })
    }
  }

  close() { this.modal.close() }
}
