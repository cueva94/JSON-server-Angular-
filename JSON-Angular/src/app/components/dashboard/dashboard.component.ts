import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { CardDialogComponent } from '../card-dialog/card-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName', 
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

userName: string = "";

  constructor(
    private _dialog: MatDialog, private _emService: EmployeeService, private currentRoute: ActivatedRoute
    ){}

ngOnInit(): void {
  this.getEmployeeList();

  this.currentRoute.queryParams.subscribe((params: Params) => {
    this.userName = params['userName'];
  })
}

    openDialogFrom(){
      this._dialog.open(CardDialogComponent);
   }

   getEmployeeList(){
    this._emService.getEmployeeList().subscribe({
      next: (res) => {
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    })
   }

   applyFilter (event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
