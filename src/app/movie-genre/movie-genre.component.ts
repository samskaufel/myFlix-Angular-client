/**
 * The MovieGenre component renders the movie genre dialog when the user clicks on the button
 * @module MovieGenreComponent
 */

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent implements OnInit {

  /**
   * The data passed to the Movie Genre dialog is injected into the constructor
   * using MAT_DIALOG_DATA and is then available to the view.
   * @param data 
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string;
    }
  ) { }

  ngOnInit(): void {

  }

}
