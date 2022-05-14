/**
 * The UserProfileComponent renders the 'profile' view where user can view their 
 * credentials, update their credentials, view their favorite movies list, and delete their
 * account
 * @module UserProfileComponent
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
// import components
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  /**
   * This getUser lifecycle hook  method is called when Angular is done creating the component
   * so that the data can be used to populate the template 
   */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Invokes the getUser method on the fetchApiData service and populates the user object 
   * with the response
   */
   getUser(): void {
    let user = localStorage.getItem('user');
    console.log(user);
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.user = res;
    });
  }

}