import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  constructor(
    private router: Router
  ) {}

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

