import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './service/dashboard-service';
import { IBookChapter } from 'src/app/models/bookchapter.model';
import { BookChapterStatus } from 'src/app/enums/book-chapter-status';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/models/book.model';
import { IAuthor } from 'src/app/models/author.model';
import { IPublisher } from 'src/app/models/publisher.model';
import { IAccountInfo } from 'src/app/models/account.model';
import { BorrowHistoryStatus } from 'src/app/enums/borrow-history-status';
import { IBorrowHistoryInfo } from 'src/app/models/borrow-history.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowDetailComponent } from './show-detail/show-detail.component';


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
        private dashboardService: DashboardService,
        private modalService: NgbModal,
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

                // Lấy tổng số sách
                let total = 0;
                this.statictis.forEach(s => s.quantity ? total += s.quantity : 0);
                this.totalBookchapter.push(total);
                this.totalBooks = total;
                
                // Lấy só sách đang Free = tổng - khác free
                let notFree = 0;
                this.statictis.forEach(s => 
                    s.borrowHistories?.forEach(br => 
                        br.status === BorrowHistoryStatus.Active || br.status === BorrowHistoryStatus.Expired
                        ? notFree += 1
                        : 0
                ));
                this.totalBookFree.push(total - notFree);

                
                this.totalBookBorrowed.push(notFree);
                
                for (let month = 1; month <= 12; month++) {
                    this.monthArr.push(
                        this.statictis.filter((s) => {
                            if (s.borrowHistories?.length && s.borrowHistories.length > 0) {
                                return s.borrowHistories.filter(br => {
                                    if(br.lostOrDestroyedDate) {
                                        return new Date(br.lostOrDestroyedDate).getMonth() + 1 === month && br.status === BorrowHistoryStatus.Destroyed ? s : null
                                    }
                                    return null;
                                }).length
                            }
                            return null;
                        }).length
                    );
                    this.monthArrLost.push(
                        this.statictis.filter((s) => {
                            if (s.borrowHistories?.length) {
                                return s.borrowHistories.filter(br => {
                                    if(br.lostOrDestroyedDate) {
                                        return new Date(br.lostOrDestroyedDate).getMonth() + 1 === month && br.status === BorrowHistoryStatus.Lost ? s : null
                                    }
                                    return null;
                                }).length
                            }
                            return null;
                        }).length
                    );
                }
                console.log("borrowed"+ this.monthArr);
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

    value: any[] = [];
    dataSelect($event: any) {
        this.value = [];
        const status = $event.element.datasetIndex === 0 ? BorrowHistoryStatus.Destroyed : BorrowHistoryStatus.Lost;
        // let value;
        // this.statictis.forEach(bc => {
        //     if(bc.borrowHistories?.length) {
        //         value.push
        //     }
        // })

        this.statictis.forEach(bc => {
            if(bc.borrowHistories?.length) {
                bc.borrowHistories.forEach(br => {
                    if(br.lostOrDestroyedDate && new Date(br.lostOrDestroyedDate).getMonth() === $event.element.index  && br.status === status) {
                        const get = {
                            bookName: bc.book?.name,
                            chapter: bc.chapter,
                            quantity: bc.quantity,
                            lostOrDestroyedDate: br.lostOrDestroyedDate,
                            studentId: br.libraryCard?.studentId
                        }
                        this.value.push(get);
                    }
                })
            }
        })
        
        const modalRef = this.modalService.open(ShowDetailComponent, {
            size: 'xl',
            centered: true,
            backdrop: 'static'
        })
        
        modalRef.componentInstance.value = this.value;
        modalRef.componentInstance.title = $event.element.datasetIndex === 0 ? `Destroyed book in ${$event.element.index + 1}` : `Lost book in ${$event.element.index + 1}`;
    }
}
