import { HttpService } from 'src/app/services/http-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { MenuItem } from 'src/app/models/menu';
import * as $ from "jquery";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  @Input() expanded = true;

  urlComplete = {
    mainUrl: "",
    subUrl: "",
    childUrl: "",
  };

  sidebarMenus = {
    default: true,
    chat: false,
    settings: false,
  };

  menus: MenuItem[] = [];

  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private httpService: HttpService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        $(".main-wrapper").removeClass('slide-nav');
        $(".sidebar-overlay").removeClass('opened');
      }
    });
  }

  ngOnInit(): void {
    this.httpService.saveWithCustomURL<MenuItem[]>(
    { 
      controller: "Data", 
      url: "Data/menu"
    })
    .pipe(first())
    .subscribe({
      next: (res) => {
        if(res)
          this.menus = res;
        this.sidebarAnimation();
      }
    })
  }

  sidebarAnimation() {
    // Slide up and down of menus
    $(document).on("click", "#sidebar-menu a", function (e) {
      e.stopImmediatePropagation();
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      }
      if (!$(this).hasClass("subdrop")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");

        $('.icon-arrow-container').children('.icon-arrow').removeClass('la la-angle-down');
        $('.icon-arrow-container').children('.icon-arrow').addClass('la la-angle-up');
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      } else if ($(this).hasClass("subdrop")) {
        $('.icon-arrow-container').children('.icon-arrow').removeClass('la la-angle-up');
        $('.icon-arrow-container').children('.icon-arrow').addClass('la la-angle-down');
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      }
    });
  }
}
