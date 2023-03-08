import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

constructor(private router: Router){}

  ngOnInit(): void {
  }

userName  : string = '';
password: string = '';

  login(){
    this.router.navigate(['dashboard'], {queryParams: {'userName': this.userName, 'userPassword': this.password}})
  console.log(this.userName)
    console.log(this.password)
  }
}
