import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { uniqueId } from 'lodash';
import { IDialogType } from 'src/app/models/modal/dialog';
import { ToastService } from 'src/app/services/toast.service';
import { BookDetailFields } from './book-info-form';
import { IAuthor } from 'src/app/models/author.model';
import { AuthorInfoEditComponent } from '../../authors-management/author-info-edit/author-info-edit.component';
import { of } from 'rxjs';
import { IBook, IBookAuthor, IBookImage, IBookPublisher, IBookSave } from 'src/app/models/book.model';
import { HttpService } from 'src/app/services/http-service.service';
import { BookService } from '../service/book.service';
import { MessageType } from 'src/app/enums/toast-message.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { FileUpload } from 'primeng/fileupload';
import { BookAuthorEditComponent } from './book-author-edit/book-author-edit.component';
import { BookPublisherEditComponent } from './book-publisher-edit/book-publisher-edit.component';
import { IPublisher } from 'src/app/models/publisher.model';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.edit.component.html',
  styleUrls: ['./book-info.edit.component.css']
})
export class BookInfoEditComponent implements IDialogType {
  uniqueId: string = uniqueId('book-info');
  title: string = '';

  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {
    formState: {
      optionList: {
        author: of(),
        categories: this.bookService.getCategoriesOption()
      }
    }
  };
  
  data: IBookSave = {
    name: '',
    publishYear: '',
    inputDay: new Date().toISOString()
  };

  authors: IBookAuthor[] = [];
  publishers: IBookPublisher[] = [];
  bookImage: IBookImage[] = [];

  constructor(
    private modalService: NgbModal,
    private modal: NgbActiveModal,
    private _toastService: ToastService,
    private bookService: BookService
  ) {
  }
  
  dialogInit(para: {id: string}): void {
    this.title = "Add Book";
    if (para.id) {
      this.title = "Edit Book Information";
      this.loadData(para.id);
    } else {
      this.fields = BookDetailFields();
    }
  }

  loadData(bookId: string) {
    this.bookService.getBookById(bookId).subscribe({
      next: (res) => {
        if(res) {
          this.data = {
            ...res,
            categories: res.bookCategories?.map(cate => cate.categoryId)
          };
          
          if(this.data.bookAuthors?.length) {
            this.authors = [...this.data.bookAuthors]
          }

          if(this.data.bookImages?.length) {
            this.bookImage = [...this.data.bookImages]
          }

          if(this.data.bookPublishers?.length) {
            this.publishers = [...this.data.bookPublishers]
          }
          
          this.fields = BookDetailFields();
        }
      }
    })
  }

  addAuthor() {
    const modalRef = this.modalService.open(BookAuthorEditComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static'
    })

    modalRef.componentInstance.selectedAuthors = [...this.authors.map(x => x.author)];

    modalRef.result.then((res: IAuthor[]) => {
      this.authors = res.map(i => {
        return {
          authorId: i.id,
          author: {...i}
        }
      })
    });
  }

  removeAuthor(id: string) {
    this.authors = this.authors.filter(x => x.author.id !== id)
  }

  removePublisher(id: string) {
    this.publishers = this.publishers.filter(x => x.publisher.id !== id)
  }

  addPublisher() {
    const modalRef = this.modalService.open(BookPublisherEditComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static'
    })
    
    modalRef.componentInstance.selectedPublishers = [...this.publishers.map(x => x.publisher)];

    modalRef.result.then((res: IPublisher[]) => {
      this.publishers = res.map(i => {
        return {
          publisherId: i.id,
          publisher: {...i}
        }
      })
      console.log(this.publishers)
    });
  }

  uploadFile(event: {files: File[]}, uploader: FileUpload) {
    console.log(event.files)
    for(let file of event.files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        // Will print the base64 here.
        this.bookImage.push({
          base64: fileReader.result as string,
          file: { fileName: file.name }
        })
        fileReader.abort();
      };
    }
  }

  removeFile(fileId: string) {
    console.log(fileId)
    this.bookImage = this.bookImage.filter(file => file.id !== fileId);
  }

  submit() {
    console.log(this.form.value)
    if(this.data) {
      this.data = {
        ...this.data,
        authors: this.authors.map(a => a.authorId ? a.authorId : ''),
        publishers: this.publishers.map(p => p.publisherId ? p.publisherId : ''),
        bookImages: this.bookImage
      }
      
      this.bookService.save(this.data).subscribe({
        next: (res) => {
          this._toastService.show(MessageType.success, 'Add Book successfully');
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
