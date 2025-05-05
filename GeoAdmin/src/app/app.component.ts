import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataAdminComponent } from './features/data-admin/data-admin.component';
  
@Component({
  selector: 'app-root',
  imports: [DataAdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Geo Server Admin Console';
}
