import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reader-account-list',
  templateUrl: './reader-account-list.component.html',
  styleUrls: ['./reader-account-list.component.css']
})
export class ReaderAccountListComponent {
  constructor(private router: Router) {}
  searchQuery: string = '';

  readerAccounts: any[] = [
    {
      id: 1,
      name: 'John Doe',
      cardId: '12345',
      email: 'abc@gmail.com',
      status: 'Active',
      cardImages: [
        {
          base64: 'image_base64_data'
        }
      ]
    },
    {
      id: 1,
      name: 'John Doe',
      cardId: '12345',
      email: 'abc@gmail.com',
      status: 'Deactivated',
      cardImages: [
        {
          base64: 'image_base64_data'
        }
      ]
    },
    // Add more dummy data here
  ];

  edit(cardId: string) {
    this.router.navigate([{ outlets: { modal: ['reader-account-list', 'edit', cardId] } }]);

  }

  deleteReaderAccount(card: any) {
    // Find the index of the reader account in the array
    const index = this.readerAccounts.findIndex(account => account.id === card.id);

    if (index !== -1) {
      // Perform delete logic here, such as removing the reader account from the array
      this.readerAccounts.splice(index, 1);
    }
  }

  search() {
    // Perform search logic here, such as filtering the readerAccounts array based on the searchQuery
    // For example, you can filter by name or cardId
    const filteredAccounts = this.readerAccounts.filter(account =>
      account.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      account.cardId.includes(this.searchQuery)
    );

    // Update the readerAccounts array with the filtered results
    // Alternatively, you can store the filtered results in a separate variable for display
    this.readerAccounts = filteredAccounts;
  }
}
