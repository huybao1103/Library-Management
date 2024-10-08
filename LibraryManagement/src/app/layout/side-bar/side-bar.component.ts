import { SessionService } from 'src/app/services/session.service';
import { HttpService } from 'src/app/services/http-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { MenuItem } from 'src/app/models/menu';
import * as $ from "jquery";
import { ModuleEnum } from 'src/app/enums/module-enum';
import { IAccountInfo } from 'src/app/models/account.model';

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
  emptyItem: MenuItem = {
    code: '',
    icon: '',
    name: '',
    moduleEnum: ''
  }
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private httpService: HttpService,
    private sessionService: SessionService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        $(".main-wrapper").removeClass('slide-nav');
        $(".sidebar-overlay").removeClass('opened');
      }
    });
  }

  ngOnInit(): void {
    this.sessionService.getCurrentAccountState().subscribe({
      next: currentAccount => {
        if(currentAccount) {
          this.getMenu(currentAccount);
          // location.reload();
        }
      }
    });
  }

  getMenu(loggedInAccount: IAccountInfo) {
    const loggedInAccountId = loggedInAccount?.id;

    this.httpService.getWithCustomURL<MenuItem[]>(
      { 
        controller: "Data", 
        url: `Data/menu/${loggedInAccountId}`,
      })
      .pipe(first())
      .subscribe({
        next: (res) => {
          if(res?.length) {
            const currentAccountPermission = loggedInAccount?.role.roleModulePermissions;
            if(!currentAccountPermission)
              this.router.navigate(['/login']);
  
            this.menus = res.map(menuItem => {
              if(currentAccountPermission) {
                const module = currentAccountPermission.find(module => ModuleEnum[module.module] === menuItem.moduleEnum);
                if ( 
                  loggedInAccount?.role.name === "Reader"
                  &&
                  (
                    menuItem.moduleEnum === ModuleEnum[ModuleEnum.BookSearch]
                    ||
                    menuItem.moduleEnum === ModuleEnum[ModuleEnum.BookCategory]
                  )
                ) 
                {
                  return menuItem;
                }
  
                if(module?.access) {
                  if(menuItem.subMenus) {
                    menuItem.subMenus = menuItem.subMenus.map(subMenuItem => {
                      const subModule = currentAccountPermission.find(module => ModuleEnum[module.module] === subMenuItem.moduleEnum);
                      
                      if(subModule) {
                        return subModule?.access ? subMenuItem : this.emptyItem;
                      }
                      return subMenuItem;
                    })
                  }
                  return menuItem;
                } 
              }
              return this.emptyItem;
            });
  
            if(loggedInAccount?.role.name === "Reader" && this.router.url.includes("book-search")) {
              this.router.navigate(["book-search"])
            }
          }
          
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
