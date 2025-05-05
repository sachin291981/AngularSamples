import { NgModule } from '@angular/core';
import {    provideHttpClient } from '@angular/common/http';
import { DataAdminComponent } from './features/data-admin/data-admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';

@NgModule({
   
  imports: [   AppComponent, FontAwesomeModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [   ]
})
export class AppModule { }