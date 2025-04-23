import { Component , OnInit} from '@angular/core';
import { DataAdmin, DataStore } from '../../core/model/dataadmin.model';
import { CommonModule } from '@angular/common';  
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../../core/services/app.services';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
  
@Component({
  selector: 'app-data-admin',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './data-admin.component.html',
  styleUrl: './data-admin.component.css', 
  template: `
  Hello world!
  <p>{{ person | json }}</p>
`,
})
export class DataAdminComponent implements OnInit {
createDatastore() {
throw new Error('Method not implemented.');
}
createworkspace() {
//const data = { key: 'value' }; // Replace with your data
      
const workspaceName = {workspace: {name:  this.dataadmin.workspacename}};

  
  
   this.apiService.CreateWorkspaceByName(workspaceName).subscribe(response => {
    if (response == null)
    {
      this.LogMessage( this.dataadmin.workspacename + ' workspace created successfully!.');
      
    }
    

    }, error => {
    console.error('Error:', error);
   //this.activitylog = this.activitylog + '   ' + error.error.status + ' ' + error.error.statusCode;
   console.log(error.error.status);
   console.log(error.error.statusCode);
   this.handleError(error);
   
   this.LogMessage( ' workspace is not created.') ;
    });}

 
    private handleError(error: HttpErrorResponse) {
          let errorMessage = 'Unknown error!';
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          console.log('HTTP Status Code:', error.status ,error.message); // Log the HTTP status code
      if (error.status ==  HttpStatusCode.Conflict)
      {
        this.LogMessage( this.dataadmin.workspacename+  ' Wrokspace already exists!') ;
      }
      else{
        this.LogMessage(errorMessage);
      }
    
          // return throwError(errorMessage);
        }  
ondatastorechangeChange($event: Event) {
 }
selectedDataStoreItem: any;
getdatastoresbyworkspace() {
 
  this.LogMessage(  this.selectedWorkspaceItem);
  
  this.apiService.GetDataStoreListByWorkspace( this.selectedWorkspaceItem).subscribe( (response ) => {
 

const datastores = response.dataStores.dataStore;
  this.dataadmin.datastorenames = datastores.map((dataStore: any) => dataStore.name);
 
 

  // this.printResponse(response); // Call the method to print the response
   }, error => {
   console.error('Error:', error);
   });
 }
activitylog: any;

 
  constructor(private apiService: ApiService) { }

  getWorkspaceList() {
 
    
 
    this.apiService.GetWorkspaceList(  ).subscribe( (response ) => {
     
  
 const workspaces = response.workspaces.workspace;
       this.dataadmin.workspacenames = workspaces.map((workspace: any) => workspace.name);
  
  //console.log('Status Code:', this.statusCode);
  //console.log('Data:', this.data);
 
     //this.printResponse(response); // Call the method to print the response
     }, error => {
     console.error('Error:', error);
     });
 }
  selectedWorkspaceIndex: number | undefined;
onItemChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
    this.selectedWorkspaceItem = selectElement.value;
    this.selectedWorkspaceIndex = selectElement.selectedIndex;
     this.LogMessage(this.selectedWorkspaceIndex.toString());
    this.dataadmin.datastorenames = [];
 }
  rows = Array(4).fill(null);
  textRows = Array(4).fill(null);
  options = ['Option 1', 'Option 2', 'Option 3'];
  datastore: DataStore = {hostname:'test.com', port : 0, database: '', username: '', password: ''};
  dataadmin: DataAdmin = {datastore:this.datastore, workspacenames:[], workspacename:'', datastorenames:[]};
  selectedWorkspaceItem: any;
  ngOnInit(): void {
    // Initial actions if needed
  }
  private LogMessage(mesage:String)
  {
    this.activitylog += '\n' + mesage; 
  }
  }

