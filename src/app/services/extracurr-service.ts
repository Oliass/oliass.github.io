import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Extracurriculum } from '../model/Extracurriculum.type';
import { PostExtra } from '../model/PostExtra.type';
import { PostExtraStudent } from '../model/PostExtraStudent.type';

@Injectable({
  providedIn: 'root'
})
export class ExtracurrService {
  constructor(private _httpClient:HttpClient){}
  extraCurrUrl:string = "api/extracurriculum";
  extraSaveUrl:string="api/extrasave";

  fetchAllExtracurriculum():Observable<Extracurriculum[]>{
    return this._httpClient.get<Extracurriculum[]>(`${this.extraCurrUrl}`)
  }

  AddExtracurriculum(data:PostExtra){
      return this._httpClient.post<PostExtra>(`${this.extraCurrUrl}`,data);
  }

  AddExtraStudent(data:PostExtraStudent){
      return this._httpClient.post<PostExtraStudent>(`${this.extraSaveUrl}`,data);
  }
}
