import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ListboxModule } from 'primeng/listbox';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormlyModule as AppFormlyModule } from './formly/formly.module';
import { FeatureModule } from './modules/feature.module';
import { ToastService } from './services/toast.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmDialogService } from './services/confirm-dialog.service';
import { LoginComponent } from './login-register/login/login.component';
import { RegisterComponent } from './login-register/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
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
    FormlyModule.forChild({}),
    ConfirmDialogModule,
    FormsModule,
    AppFormlyModule,
    ReactiveFormsModule,
  ],
  providers: [
    MessageService, 
    ToastService,
    ConfirmDialogService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
