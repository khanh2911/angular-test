import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from './component/menubar/menubar.component';
import { HomeComponent } from './component/home/home.component';
import { CardComponent } from './component/card/card.component';
import { DialogAnimationsDialog, TableComponent } from './component/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormdesignComponent } from './component/formdesign/formdesign.component';
import { PopupComponent } from './component/popup/popup.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RootComponent } from './component/root.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    MenubarComponent,
    HomeComponent,
    CardComponent,
    TableComponent,
    FormdesignComponent,
    PopupComponent,
    DialogAnimationsDialog,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1500 // Thiết lập thời gian tồn tại là 1,5 giây
    }),
    CommonModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
