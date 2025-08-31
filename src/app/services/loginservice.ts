import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginRequest } from '../model/loginRequest.type';

@Injectable({
  providedIn: 'root'
})
export class Loginservice {
  constructor(private _httpClient:HttpClient){}
  loginUrl:String="https://51.21.254.31/api/login";
  logoutUrl:String="https://51.21.254.31/api/logout";

  loginService(data:string){
    return this._httpClient.post<loginRequest>(`${this.loginUrl}`,data,{
      				headers: {
					"Content-Type": "application/json",
				},
				//credentials: "include", 

    });

  }

  
  logoutService(data:string){
    return this._httpClient.post<loginRequest>(`${this.logoutUrl}`,data);

  }
  
}
