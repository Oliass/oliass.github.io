import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SubjectGrades } from '../model/SubjectGrades.type';
import { Observable } from 'rxjs';
import { StudentsList } from '../model/StudentsList.type';
import { Subjects } from '../model/Subjects.type';
import { PostGrade } from '../model/PostGrade.type';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  constructor(private _httpClient:HttpClient){}
  gradesUrl:String="api/grades";
  studentsUrl:String="api/students";
  subjectsUrl:String="api/subjects"

  fetchAllGrades():Observable<SubjectGrades[]>{
    return this._httpClient.get<SubjectGrades[]>(`https://cors-anywhere.herokuapp.com/http://51.21.254.31:5001/${this.gradesUrl}`)
  }

  fetchAllStudents(){
    return this._httpClient.get<StudentsList[]>(`https://cors-anywhere.herokuapp.com/http://51.21.254.31:5001/${this.studentsUrl}`);
  }

  fetchAllSubjects(){
    return this._httpClient.get<Subjects[]>(`https://cors-anywhere.herokuapp.com/http://51.21.254.31:5001/${this.subjectsUrl}`);
  }
  AddGrade(data:PostGrade){
    return this._httpClient.post<PostGrade>(`https://cors-anywhere.herokuapp.com/http://51.21.254.31:5001/${this.gradesUrl}`,data);
  }
}
