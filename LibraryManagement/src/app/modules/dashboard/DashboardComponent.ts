import { Component, OnInit } from '@angular/core';
import { DashboardService } from './service/dashboard-service';
import { IBookChapter } from 'src/app/models/bookchapter.model';
import { BookChapterStatus } from 'src/app/enums/book-chapter-status';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/models/book.model';
import { IAuthor } from 'src/app/models/author.model';
import { IPublisher } from 'src/app/models/publisher.model';
import { IAccountInfo } from 'src/app/models/account.model';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    data: any;
    data2: any;
    options: any;
    options2: any;
    statictis: IBookChapter[] = [];
    monthArr: number[] = [];
    totalBookFree: number[] = [];
    totalBookBorrowed: number[] = [];
    totalBookchapter: number[] = [];
    monthArrLost: number[] = [];
    authors: IAuthor[] = [];
    publishers: IPublisher[] = [];
    books: IBook[] = [];
    readers: IAccountInfo[] = [];
    totalAuthors: number = 0;
    totalPublishers: number = 0;
    totalBooks: number = 0;
    totalReaders: number = 0;

    constructor(
        private dashboardService: DashboardService
    ) {
    }
    
    ngOnInit() {
        this.getStatictis();
    }
    getStatictis() {
        this.dashboardService.getReaders().subscribe({
            next: (res) => {
                if(res)
                    this.readers = res;
                    this.totalReaders = this.readers.length;
                }
            })
        this.dashboardService.getBooks().subscribe({
            next: (res) => {
                if(res)
                    this.books = res;
                    this.totalBooks = this.books.length;
                }
            })
        this.dashboardService.getAuthors().subscribe({
        next: (res) => {
            if(res)
                this.authors = res;
                this.totalAuthors = this.authors.length;
            }
        })
        this.dashboardService.getPublishers().subscribe({
            next: (res) => {
                if(res)
                    this.publishers = res;
                    this.totalPublishers = this.publishers.length;
                }
            })        
        this.dashboardService.getStatistic().subscribe({
            next: (res) => {
                if (res)
                this.statictis = res;
                this.totalBookchapter.push(
                    this.statictis.filter((s) => {
                        if (s.chapter) {
                            return s.chapter;
                        }
                        return null;
                    }).length
                );
                this.totalBookFree.push(
                    this.statictis.filter((s) => {
                        if (s.status === BookChapterStatus.Free) {
                            return s.status === BookChapterStatus.Free ? s : null;
                        }
                        return null;
                    }).length
                );
                this.totalBookBorrowed.push(
                    this.statictis.filter((s) => {
                        if (s.status === BookChapterStatus.Borrowed) {
                            return s.status === BookChapterStatus.Borrowed ? s : null;
                        }
                        return null;
                    }).length
                );
                console.log(this.statictis)
                for (let month = 1; month <= 12; month++) {
                    this.monthArr.push(
                        this.statictis.filter((s) => {
                            if (s.lostOrDestroyedDate) {
                                return new Date(s.lostOrDestroyedDate).getMonth() + 1 === month && s.status === BookChapterStatus.Destroyed ? s : null;
                            }
                            return null;
                        }).length
                    );
                    this.monthArrLost.push(
                        this.statictis.filter((s) => {
                            if (s.lostOrDestroyedDate) {
                                return new Date(s.lostOrDestroyedDate).getMonth() + 1 === month && s.status === BookChapterStatus.Lost ? s : null;
                            }
                            return null;
                        }).length
                    );
                }
                console.log("borrowed"+ this.statictis);
                this.loadData();
            }
        });
    }
    loadData() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Books are detroyed',
                    backgroundColor: documentStyle.getPropertyValue('--orange-500'),
                    borderColor: documentStyle.getPropertyValue('--orange-500'),
                    data: this.monthArr
                },
                {
                    label: 'Lost books',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: this.monthArrLost
                }
            ]
        };
        this.data2 = {
            labels: ['Total book chapters', 'chapters are borrowed', 'chapters are free'],
            datasets: [
                {
                    data: [this.totalBookchapter, this.totalBookBorrowed, this.totalBookFree],
                    backgroundColor: [documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--pink-500')],
                    hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--pink-400')]
                }
            ]
        };
        this.options2 = {
            cutout: '70%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            maintainAspectRatio: false,
            aspectRatio: 1.1,
        };
        this.options = {
            indexAxis: 'x',
            maintainAspectRatio: false,
            aspectRatio: 0.9,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}
