import { Component } from '@angular/core';
import { NgIf,NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [NgIf,RouterLink,MatButton,MatButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  checkStudent():boolean{
    if(sessionStorage.getItem("usertype") == "student") return true;
    return false;
  }

  checkTeacher():boolean{
    if(sessionStorage.getItem("usertype") == "teacher") return true;
    return false;
  }

}
