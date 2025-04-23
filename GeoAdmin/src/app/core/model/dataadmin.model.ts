
export interface DataAdmin {
    workspacenames: string[]; 
    datastorenames: string[]; 
    workspacename: String;
     datastore: DataStore;

    }

    export interface DataStore{
        hostname:string;
        port: number;
        database:string;
        username: string
        password: string;


    }
    