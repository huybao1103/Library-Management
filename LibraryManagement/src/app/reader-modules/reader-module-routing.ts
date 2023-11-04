import { RouterModule, Routes } from "@angular/router";
import { BookSearchComponent } from "./book-search/book-search/book-search.component";
import { MainPageComponent } from "../main-page/main-page.component";
import { ReaderMainPageComponent } from "./reader-main-page/reader-main-page.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  // {
  //   path: 'reader',
  //   redirectTo: 'reader',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'reader',
  //   component: ReaderMainPageComponent,
  //   children: [
  //     {
  //       path: 'book-search',
  //       component: BookSearchComponent
  //     },
  //   ]
  // }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReaderRoutingModule { }