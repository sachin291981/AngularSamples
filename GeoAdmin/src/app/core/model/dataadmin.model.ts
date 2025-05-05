
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
    
    
export interface ConnectionParameter {
      '@key': string;
      '$': string;
    }
    
    export interface DataStoreJson {
      name: string;
      connectionParameters: {
        entry: ConnectionParameter[];
      };
    }
    