import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    CreateDataStore(datajson: string, worksapcename: any) :Observable<any> {
        const headers = new HttpHeaders({
            'accept': 'text/html',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
        });
        const datastorecreateurl = this.baseurl + "/" + worksapcename + "/datastores";
        return this.http.post<any>(datastorecreateurl, datajson, { headers });
     }

    private baseurl = 'https://geosolutions-arcgis.centralindia.cloudapp.azure.com/geoserver/rest/workspaces'; // Base REST API Url
                     // 'https://geosolutions-arcgis.centralindia.cloudapp.azure.com/geoserver/rest/workspaces'
    private username = 'admin';  
    private password = 'L360@28Geo21P';  

    constructor(private http: HttpClient) { }

    CreateWorkspaceByName(workspaceName: any): Observable<any> {
        const headers = new HttpHeaders({
            'accept': 'text/html',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
        });
        return this.http.post<any>(this.baseurl, JSON.stringify(workspaceName), { headers });
    }
    GetWorkspaceList(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
        });
        return this.http.get<any>(this.baseurl, { headers });
    }
    GetDataStoreListByWorkspace(worksapce: string): Observable<any> {

        const abcd = this.baseurl + "/" + worksapce + "/datastores";
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`)
        });
        return this.http.get<any>(abcd, { headers });

    }
}