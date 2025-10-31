
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  
    getInfoSByUser(): any {
        return this.readFromSession("WADAGIN_SOUTIEN_USER_PUBLIC_TO_OPERATION");
    }
    // Définir le rôle dans le localStorage
    saveInfoByUser(role: string): void {
        this.saveToSession("WADAGIN_SOUTIEN_USER_PUBLIC_TO_OPERATION", role);
    }



    //end 
    private readFromSession(key: string): any {
        let result = null;
        try {
            const json: any = localStorage.getItem(key);
            if (json) {
                const decoded = decodeURIComponent(escape(atob(json)));
                result = JSON.parse(decoded);
            }
        } catch (e) {
            //console.error("Error", e);
        }
        return result;
    }

    private saveToSession(key: string, value: any): void {

        //console.log("j'appelle le localstorage");

        try {
            const stringified = btoa(unescape(encodeURIComponent(JSON.stringify(value))));
            localStorage.setItem(key, stringified);

            //console.log("value",value);

        } catch (e) {
            //console.error("Error", e);
        }
    }


}