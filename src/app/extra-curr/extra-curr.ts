import { AfterViewInit, Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Extracurriculum } from '../model/Extracurriculum.type';
import { ExtracurrService } from '../services/extracurr-service';
import { PostExtra } from '../model/PostExtra.type';
import { PostExtraStudent } from '../model/PostExtraStudent.type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-extra-curr',
  imports: [MatTableModule, MatButtonModule, MatIconModule,ReactiveFormsModule,NgIf],
  templateUrl: './extra-curr.html',
  styleUrl: './extra-curr.css'
})
export class ExtraCurr implements AfterViewInit{
  private fBuilder:FormBuilder = inject(FormBuilder);
  newtitle:string='';
  newdesc:string='';
  addnew:boolean=false;
  fGroup = this.fBuilder.group({
    id:[''],
    title: ['',Validators.required],
    description: ['',Validators.required],    
  })


   dataSource = new MatTableDataSource<Extracurriculum>;
   dataSourceapp = new MatTableDataSource<Extracurriculum>;
   dataSourceex = new MatTableDataSource<Extracurriculum>;
  columnsToDisplay = ['title'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  extras:Extracurriculum[]=[];
  extras2:Extracurriculum[]=[];
  extras3:Extracurriculum[]=[];


  constructor(private extracurrService:ExtracurrService){};

  ngAfterViewInit(): void {
    this.extracurrService.fetchAllExtracurriculum().subscribe((data)=>{
      this.extras=data;
      this.dataSource=new MatTableDataSource<Extracurriculum>(data);
      console.log(this.extras);
    })
    let id:number = Number(sessionStorage.getItem("userid"))
    this.extracurrService.fetchStudentExtracurriculum(id).subscribe((data)=>{
      this.extras2=data;
      this.dataSourceapp=new MatTableDataSource<Extracurriculum>(data);
      console.log(this.extras2);
    })
    this.extracurrService.fetchExceptStudentExtracurriculum(id).subscribe((data)=>{
      this.extras3=data;
      this.dataSourceex=new MatTableDataSource<Extracurriculum>(data);
      console.log(this.extras3);
    })
  }

  expandedElement: Extracurriculum | null ={
  extraid: 0,
  title: '',
  description: '',
  firstname: '',
  lastname: '',
  };

  /** Checks whether an element is expanded. */
  isExpanded(element: Extracurriculum) {
    return this.expandedElement === element;
  }

  /** Toggles the expanded state of an element. */
  toggle(element: Extracurriculum) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }


AddExtracurr(){
    let tempextra:PostExtra = {
      title:this.newtitle,
      description: this.newdesc,
      teacher: Number(sessionStorage.getItem("userid")),
  }
    this.extracurrService.AddExtracurriculum(tempextra).subscribe({
      next: (data)=>{
        console.log('ExtraCurriculum added Successfully')
        this.addnew=false;
        window.location.reload();
      },
      error:(err)=>{
        console.log("Error");
        console.log(err);
      }
    });
  }
  AddExtracurrStud(id:string){
    let tempextrastud:PostExtraStudent = {
      extraid: Number(id),
      student: Number(sessionStorage.getItem("userid")),
  }
    this.extracurrService.AddExtraStudent(tempextrastud).subscribe({
      next: (data)=>{
        console.log('ExtraCurriculum Student added Successfully')
        window.location.reload();
      },
      error:(err)=>{
        console.log("Error");
        console.log(err);
      }
    });
  }
  DeleteExtracurrStud(id:string){
    let tempextrastud:PostExtraStudent = {
      extraid: Number(id),
      student: Number(sessionStorage.getItem("userid")),
  }
    this.extracurrService.DeleteExtraStudent(tempextrastud.extraid,tempextrastud.student).subscribe({
      next: (data)=>{
        console.log('ExtraCurriculum Student deleted Successfully')
        window.location.reload();
      },
      error:(err)=>{
        console.log("Error");
        console.log(err);
      }
    });
  }
  checkStudent():boolean{
    if(sessionStorage.getItem("usertype") == "student") return true;
    return false;
  }

  checkTeacher():boolean{
    if(sessionStorage.getItem("usertype") == "teacher") return true;
    return false;
  }
}