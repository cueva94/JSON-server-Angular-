import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.scss']
})
export class CardDialogComponent {

  emFrom: FormGroup;

  education: string[] =[
    'Diplomado',
    'Graduado',
    'Post Graduado'
  ];


  constructor(private _fb: FormBuilder, private _emService: EmployeeService, private _dialogRef: DialogRef<CardDialogComponent>){
    this.emFrom = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company:'',
      experience:'',
      package:'',

    })
  }

  onFormSubmit(){
    if(this.emFrom.valid){
     this._emService.addEmployee(this.emFrom.value).subscribe({
      next: (val:any) => {
        alert('Empleado agregado con exito');
        this._dialogRef.close()
      },
      error: (err:any) => {
        console.error(err)
      }  
     });
    }
  }
}
