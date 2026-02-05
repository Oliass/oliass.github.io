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
  extraCurrUrl:string = "api/extracurriculum/";
  extraxCurrUrl:string="api/extracurriculumx/";
  extraSaveUrl:string="api/extrasave";
  
  fetchAllExtracurriculum():Observable<Extracurriculum[]>{
    return this._httpClient.get<Extracurriculum[]>(`https://cors-anywhere.herokuapp.com/http://51.21.254.31:5001/${this.extraCurrUrl}`)
  }
  
  fetchStudentExtracurriculum(id:number):Observable<Extracurriculum[]>{
    return this._httpClient.get<Extracurriculum[]>(`https://cors-anywhere.herokuapp.com/http://51.21.254.31:5001/${this.extraCurrUrl}`+id)
  }
  
  fetchExceptStudentExtracurriculum(id:number):Observable<Extracurriculum[]>{
    return this._httpClient.get<Extracurriculum[]>(`https://cors-anywhere.herokuapp.com/http://51.21.254.31:5001/${this.extraxCurrUrl}`+id)
  }

  AddExtracurriculum(data:PostExtra){
      return this._httpClient.post<PostExtra>(`https://cors-anywhere.herokuapp.com/http://51.21.254.31:5001/${this.extraCurrUrl}`,data);
  }

  AddExtraStudent(data:PostExtraStudent){
      return this._httpClient.post<PostExtraStudent>(`https://cors-anywhere.herokuapp.com/http://51.21.254.31:5001/${this.extraSaveUrl}`,data);
  }
  DeleteExtraStudent(extraid:number, student:number){
      return this._httpClient.delete<PostExtraStudent>(`https://cors-anywhere.herokuapp.com/http://51.21.254.31:5001/${this.extraSaveUrl}`,{body:{"extraid":extraid,"student":student}});
  }
}
