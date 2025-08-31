import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf,MatButton,MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  title = signal('TeacherHelper');

  logout(){

    sessionStorage.clear();
  }

  checksessionstorage(){
    if(sessionStorage.getItem("usertype") == "student") return true;
    else if(sessionStorage.getItem("usertype") == "teacher") return true;
    else return false;

  }

}
