import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'primeng/api';
import { ListboxModule } from 'primeng/listbox';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatureModule } from './modules/feature.module';
import { ToastService } from './services/toast.service';
import { FormlyModule } from './formly/formly.module';
import { ModalbaseComponent } from './layout/modalbase/modalbase.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MenubarModule,
    SidebarModule,
    BrowserAnimationsModule,
    ListboxModule,
    FontAwesomeModule,
    ToastModule,
    FeatureModule,
    FormlyModule
  ],
  providers: [
    MessageService, 
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
