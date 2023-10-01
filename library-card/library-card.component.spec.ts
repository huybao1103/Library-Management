import { Component } from '@angular/core';

@Component({
  selector: 'app-library-card',
  templateUrl: './library-card.component.html',
  styleUrls: ['./library-card.component.css'],
})
export class LibraryCardComponent {
  libraryCards = [
    { name: 'Nguyen Van A', class: '10A', expirydate: '20/12/2023', status: 'Active' },
    { name: 'Tran Thi B', class: '11B', expirydate: '20/12/2023', status: 'Inactive' },
    { name: 'Le Van C', class: '12C', expirydate: '20/12/2023', status: 'Expired' }
  ];

  searchText: string = '';

  addCard() {
    // Logic for adding a new card
  }

  filteredLibraryCards: any[] = [];
  sortDirection: number = 1;
  sortBy: string = '';

  constructor() {
    this.filteredLibraryCards = this.libraryCards;
  }

  sort(key: string) {
    this.sortBy = key;
    this.filteredLibraryCards.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      if (valueA < valueB) {
        return -1 * this.sortDirection;
      } else if (valueA > valueB) {
        return 1 * this.sortDirection;
      } else {
        return 0;
      }
    });
    this.sortDirection = -this.sortDirection;
  }
}
