import { NgModule } from '@angular/core';
import {    provideHttpClient } from '@angular/common/http';
import { DataAdminComponent } from './features/data-admin/data-admin.component';
  
@NgModule({
   
  imports: [   
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [  ]
})
export class AppModule { }