import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { Router, RouterLink } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, ReactiveFormsModule,Validators } from '@angular/forms';
import { Loginservice } from '../services/loginservice';
import { loginRequest } from '../model/loginRequest.type';
@Component({
  selector: 'app-home',
  imports: [MatTableModule, MatSelectModule, MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  selected:string='';

 private router = inject(Router)

  constructor(private loginservice:Loginservice){};

  login():void{
      if (this.fGroup.invalid) {
      return;
    }
    const v: any = this.fGroup.getRawValue();
    const body = JSON.stringify({name: v.name, password: v.password});
    console.log(body);
    this.loginservice.loginService(body).subscribe({
      next:(data)=>{
        console.log('login sucessfull');
        if(data.isteacher) {
          sessionStorage.setItem("usertype","teacher");
          sessionStorage.setItem("userid",data.teacher.toString())
        }
        if(data.isstudent){
          sessionStorage.setItem("usertype","student");
          sessionStorage.setItem("userid",data.student.toString());
        }
        this.router.navigate(['/dashboard']);
      },
      error:(err)=>{
        console.log("no usser");
        console.log(err);
      }
    });
  }

  private fBuilder:FormBuilder = inject(FormBuilder);

    fGroup = this.fBuilder.group({
    name: ['',Validators.required],
    password: ['',Validators.required],
    
  })

}
