import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-library-card',
  templateUrl: './library-card.component.html',
  styleUrls: ['./library-card.component.css'],
})
export class LibraryCardComponent {
  libraryCards = [
    { name: 'Nguyen Van A', class: '10A', expirydate: '20/12/2023', status: 'Active', avatar: 'https://demoda.vn/wp-content/uploads/2022/04/hinh-cute-anh-cute-777x600.jpg' },
    { name: 'Tran Thi B', class: '11B', expirydate: '20/12/2023', status: 'Inactive', avatar: 'https://demoda.vn/wp-content/uploads/2022/04/hinh-cute-anh-cute-777x600.jpg' },
    { name: 'Le Van C', class: '12C', expirydate: '20/12/2023', status: 'Expired', avatar: 'https://demoda.vn/wp-content/uploads/2022/04/hinh-cute-anh-cute-777x600.jpg' }
  ];

  searchText: string = '';

  filteredLibraryCards: any[] = [];
  sortDirection: number = 1;
  sortBy: string = '';

  constructor(private router: Router) {
    this.filteredLibraryCards = this.libraryCards;
  }

  addCard() {
    this.router.navigate(['/add-card']);
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

  updateFilteredLibraryCards() {
    if (this.searchText.trim() === '') {
      this.filteredLibraryCards = this.libraryCards;
    } else {
      this.filteredLibraryCards = this.libraryCards.filter((card) =>
        card.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        card.class.toLowerCase().includes(this.searchText.toLowerCase()) ||
        card.expirydate.toLowerCase().includes(this.searchText.toLowerCase()) ||
        card.status.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
}
