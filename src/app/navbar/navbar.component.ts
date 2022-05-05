/**
 * The navbar component displays a navbar at the top of the page once the user has logged in
 * the navbar consists of links that routes the user to the 'movies' view and 'profile' view, and a logout button
 * that brings the user back to the 'welcome' view
 * @module NavbarComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule,
  ) { }

  ngOnInit(): void {
  }

  openMovieCardView(): void {
    this.router.navigate(['movies']);
  }

  openUserProfileView(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    localStorage.clear();
    this.snackBar.open('Logged Out Successfully', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }

}
