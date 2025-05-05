import { Component , OnInit} from '@angular/core';
import { DataAdmin, DataStore, DataStoreJson } from '../../core/model/dataadmin.model';
import { CommonModule, JsonPipe } from '@angular/common';  
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../../core/services/app.services';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

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
  faEyeSlash = faEyeSlash;
      faEye = faEye;
      hide = true;
toggleVisibility() {
throw new Error('Method not implemented.');
}

toggleFieldTextType() {
throw new Error('Method not implemented.');
}
fieldTextType: any;
  createDatastore() {
    const datastorejson: DataStoreJson = {
      name: this.datastore.database,
      connectionParameters: {
        entry: [
          { '@key': 'host', '$': this.dataadmin.datastore.hostname },
          { '@key': 'port', '$': this.datastore.port.toString() },
          { '@key': 'database', '$': this.datastore.database },
          { '@key': 'user', '$': this.datastore.username },
          { '@key': 'passwd', '$': this.datastore.password },
          { '@key': 'dbtype', '$': 'postgis' }
        ]
      }
    }
    this.LogMessage('Creating Datastore: ' + JSON.stringify(datastorejson));
    this.apiService.CreateDataStore(JSON.stringify(datastorejson), this.selectedWorkspaceItem.toString()).subscribe(response => {
    this.LogMessage(response.toString());
      
    }, error=> {
this.handleError(error);
      this.LogMessage(error.toString());
    }
    
  
  );
    
  
  
  }
createworkspace() {
//const data = { key: 'value' }; // Replace with your data
      
const workspaceName = {workspace: {name:  this.dataadmin.workspacename}};

  
  
   this.apiService.CreateWorkspaceByName(workspaceName).subscribe(response => {
    if (response == null)
    {
      this.LogMessage(this.dataadmin.workspacename + ' workspace created successfully!.');
      
    }
    

    }, error => {
    console.error('Error:', error);
   //this.activitylog = this.activitylog + '   ' + error.error.status + ' ' + error.error.statusCode;
   console.log(error.error.status);
   console.log(error.error.statusCode);
   this.handleError(error);
   
   this.LogMessage('workspace is not created.') ;
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
ondatastorechangeChange(event: Event) {
  const selecteddatastoreitem = event.target as HTMLSelectElement;
  this.LogMessage('Selected Datastore: ' + selecteddatastoreitem.value + ' Selected Datastore Index: ' +  selecteddatastoreitem.selectedIndex.toString());
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
     
this.LogMessage(response.toString());  
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
   this.LogMessage('Selected Worksapce: ' + this.selectedWorkspaceItem+ ' Selected Workspace Index: ' +  this.selectedWorkspaceIndex.toString());
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
    this.activitylog =  mesage.trim() + '\n' + this.activitylog; 
  }
  }

