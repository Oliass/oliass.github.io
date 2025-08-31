import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GradesService } from '../services/grades-service';
import { SubjectGrades } from '../model/SubjectGrades.type';
import { MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import * as XLSX from 'xlsx';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StudentsList } from '../model/StudentsList.type';
import { Subjects } from '../model/Subjects.type';
import { PostGrade } from '../model/PostGrade.type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-grades',
  imports: [MatTableModule, MatInputModule, MatButton, MatIconModule, MatSelectModule, MatFormFieldModule, NgIf],
  templateUrl: './grades.html',
  styleUrl: './grades.css'
})
export class Grades implements AfterViewInit{

  displayColumn:string[] = ['Student','Subject','Grades','Year','Class','Average'];
  datasource = new MatTableDataSource<SubjectGrades>;
  //gradeService = inject(GradesService)
  selectedStudent:number = 0;
  selectedSubject = '';
  selectedGrade:number = 0;
  addnew:boolean=false;
  constructor(private gradeService:GradesService){};
  average:any=undefined;

  subjectgrades:SubjectGrades ={
    student: '',
    subject: '',
    beginyear: 0,
    classletter:'',
    grades: '',
    average: this.average
  }
  grades:SubjectGrades[]=[]
  filteredgrades:SubjectGrades[]=[]

  students:StudentsList[]=[];
  subjects:Subjects[]=[];

  ngAfterViewInit():void{
    this.gradeService.fetchAllGrades().subscribe((data) => {
      this.grades=data;
      this.datasource = new MatTableDataSource<SubjectGrades>(data);
          console.log(this.grades);
    })
    this.gradeService.fetchAllStudents().subscribe((data) => {
      this.students=data;
    })
    this.gradeService.fetchAllSubjects().subscribe((data) => {
      this.subjects=data;
    })
  }

  AddGrade(){
    let tempgrade:PostGrade = {
    grade: this.selectedGrade,
    weight:1,
    subject: this.selectedSubject,
    student: this.selectedStudent,
    teacher: Number(sessionStorage.getItem("userid")),
    semester:1
  }
    this.gradeService.AddGrade(tempgrade).subscribe({
      next: (data)=>{
        console.log('grade added Successfully')
        this.addnew=false;
        window.location.reload();
      },
      error:(err)=>{
        console.log("no usser");
        console.log(err);
      }
    });
  }
  searchGrade(input:string){
    this.filteredgrades = this.grades.filter(item => item.student.toLocaleLowerCase().includes(input.toLocaleLowerCase()) || item.subject.toLocaleLowerCase().includes(input.toLocaleLowerCase()) || item.beginyear.toString().includes(input) || item.classletter.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
    this.datasource = new MatTableDataSource<SubjectGrades>(this.filteredgrades);
  }
  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.datasource.data); // Convert data to worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'User'); // Add the sheet to workbook

    // Create an Excel file and trigger the download
    XLSX.writeFile(wb, 'user_list.xlsx');
  }

}
