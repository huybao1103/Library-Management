import { Component } from '@angular/core';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent {
  newCard = {
    name: '',
    class: '',
    expirydate: '',
    status: '',
    avatar: ''
  };

  nameError: string = '';
  classError: string = '';
  expiryDateError: string = '';
  statusError: string = '';

  addCard() {
    this.nameError = '';
    this.classError = '';
    this.expiryDateError = '';
    this.statusError = '';

    if (this.newCard.name.trim() === '') {
      this.nameError = 'Name is required.';
    }

    if (this.newCard.class.trim() === '') {
      this.classError = 'Class is required.';
    }

    if (this.newCard.expirydate.trim() === '') {
      this.expiryDateError = 'Expiry Date is required.';
    }

    if (this.newCard.status.trim() === '') {
      this.statusError = 'Status is required.';
    }

    if (
      this.newCard.name.trim() !== '' &&
      this.newCard.class.trim() !== '' &&
      this.newCard.expirydate.trim() !== '' &&
      this.newCard.status.trim() !== ''
    ) {
      // Logic thêm card vào hệ thống
      // Ví dụ: this.libraryCards.push(this.newCard)
      this.newCard.expirydate = new Date().toISOString().slice(0, 10);

      // Sau khi thêm card xong, reset giá trị của newCard
      this.resetForm();
    }
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        this.newCard.avatar = reader.result.toString();
      }
    };

    reader.readAsDataURL(file);
  }

  resetForm() {
    this.newCard = {
      name: '',
      class: '',
      expirydate: '',
      status: '',
      avatar: ''
    };
  }
}
