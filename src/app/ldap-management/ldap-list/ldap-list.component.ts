import { Component, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserLdap } from '../../model/user-ldap';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css']
})
export class LdapListComponent implements OnInit, AfterViewInit{

  displayedColumns: string[] = ['nomComplet','mail','employeNumero',];
  dataSource = new MatTableDataSource<UserLdap>([]);
  unactiveSelected=false;

  @ViewChild(MatPaginator,{static:true}) paginator : MatPaginator;

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    //console.log('Value on ngOninit():');
    this.dataSource.paginator = this.paginator;
    // this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);
    this.getUsers();
    // console.log('mat paginator : ', this.paginator );

  }

  ngAfterViewInit(): void {


  }


  filterPredicate(data,filter):boolean{
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent):void{
    const filterValue=($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getUsers():void{
    this.usersService.getUsers().subscribe(
      users => {
        if (this.unactiveSelected) {
          this.dataSource.data = users.filter( users =>
            users.active === false
          );
        } else {
          this.dataSource.data = users
        }
      });
  }

  unactiveChanged($event:MatSlideToggleChange):void{
    this.unactiveSelected=$event.checked;
    this.getUsers();
  }

  edit(id : number){
    this.router.navigate(['/users', id]).then( (e) => {
      if (! e) {
        console.log('navigation has failed ');

      }
    })
  }

  addUser(){
    this.router.navigate(['/users/add']).then( (e) => {
      if (! e){
        console.log('Navigation has failed!');
      }
    });
  }
}
