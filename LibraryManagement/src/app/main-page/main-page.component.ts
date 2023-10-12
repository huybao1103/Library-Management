import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Excel from '@grapecity/spread-excelio';
import * as GC from '@grapecity/spread-sheets';
import * as $ from "jquery";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  spreadBackColor = 'aliceblue';
  hostStyle = {
    width: '95vw',
    height: '80vh'
  };
  private spread;
  private excelIO;

  constructor() {
    this.spread = new GC.Spread.Sheets.Workbook();
    this.excelIO = new Excel.IO();
  }

  workbookInit(args: any) {
    const self = this;
    self.spread = args.spread;
    const sheet = self.spread.getActiveSheet();
    sheet.getCell(0, 0).text('Test Excel').foreColor('blue');
    sheet.getCell(1, 0).text('Test Excel').foreColor('blue');
    sheet.getCell(2, 0).text('Test Excel').foreColor('blue');
    sheet.getCell(3, 0).text('Test Excel').foreColor('blue');
    sheet.getCell(0, 1).text('Test Excel').foreColor('blue');
    sheet.getCell(1, 1).text('Test Excel').foreColor('blue');
    sheet.getCell(2, 1).text('Test Excel').foreColor('blue');
    sheet.getCell(3, 1).text('Test Excel').foreColor('blue');
    sheet.getCell(0, 2).text('Test Excel').foreColor('blue');
    sheet.getCell(1, 2).text('Test Excel').foreColor('blue');
    sheet.getCell(2, 2).text('Test Excel').foreColor('blue');
    sheet.getCell(3, 2).text('Test Excel').foreColor('blue');
    sheet.getCell(0, 3).text('Test Excel').foreColor('blue');
    sheet.getCell(1, 3).text('Test Excel').foreColor('blue');
    sheet.getCell(2, 3).text('Test Excel').foreColor('blue');
    sheet.getCell(3, 3).text('Test Excel').foreColor('blue');
 }

  ngOnInit(): void {
    // Minified Sidebar
    $(() => {
      if(!$('body').hasClass('mini-sidebar')) {
        $('body').addClass('mini-sidebar');
        $('.subdrop + ul').slideUp();
      }
    });

    $(document).on('mouseover', (e) => {
      e.stopPropagation();
      if ($('body').hasClass('mini-sidebar')) {
        const targ = $(e.target).closest('.sidebar').length;
        if (targ) {
          $('body').addClass('expand-menu');
          $('.subdrop + ul').slideDown();
        } else {
          $('body').removeClass('expand-menu');
          $('.subdrop + ul').slideUp(1);
        }
      }
    });

    $('body').append('<div class="sidebar-overlay"></div>');
    $(document).on('click', '#mobile_btn', () => {
      var $wrapper = $('.main-wrapper');
      $wrapper.toggleClass('slide-nav');
      $('.sidebar-overlay').toggleClass('opened');
      $('html').addClass('menu-opened');
      $('#task_window').removeClass('opened');
      return false;
    });

    $(".sidebar-overlay").on("click", () => {
      var $wrapper = $('.main-wrapper');
      $('html').removeClass('menu-opened');
      $(this).removeClass('opened');
      $wrapper.removeClass('slide-nav');
      $('.sidebar-overlay').removeClass('opened');
      $('#task_window').removeClass('opened');
    });
  }
}

