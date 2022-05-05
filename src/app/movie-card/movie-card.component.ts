/** 
 * The MovieCardComponent is used to display the data retrieved from the movies collection of the
 * myFlix database. The data is looped through using the ngFor directive and each movie is rendered as
 * a card in the template. The cards display the title, director and an image of the movie and contains
 * buttons that can be opened to display dialogs with more information about the director or genre, 
 * or a movie description. Movies can be added to or removed from the user's favorites list by clicking on a 
 * heart icon contained in the top right corner of each card. The heart color toggles accordingly to reflect 
 * the movie's status.
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  // variable 'movies' declared as an array
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  // this lifecycle hook is called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   *this function will fetch the movies from the FetchApiDataService service
   * @function getAllMovies
   * @returns movies in JSON format
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * function opens the genre dialog 
   * @param name 
   * @param description
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }
  /**
   * function opens the director dialog
   * @param name 
   * @param bio 
   * @param born 
   * @param died 
   */
  openDirectorDialog(name: string, bio: string, born: string, died: string): void {
    this.dialog.open(MovieDirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Born: born,
        Died: died,
      },
      width: '500px'
    });
  }
  /**
   * function opens the movie description dialog
   * @param title 
   * @param description 
   */
  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px'
    });
  }

  /**
   * gets list of user's favorite movies
   * @function getUser
   * @returns an array with movie objects from user's favorites list
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }

  /**
   * returns if movie id is in user's favorites list
   * @param MovieId 
   * @returns true or false
   */
  isFavorited(MovieId: string): boolean{
    return this.favorites.includes(MovieId);
  }

  /**
   * adds favorited movie to user's favorites list
   * @param MovieId 
   * @param Title 
   * @returns an updated array of movie objects in the user's favorites list
   */
  addFavorite(MovieId: string, Title: string): void {
    this.fetchApiData.addFavorite(MovieId).subscribe((resp: any) => {
      this.snackBar.open(`${Title} has been added to your favorites`, 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
    return this.getFavorites();
  }

  /**
   * removes movie from user's favorite list
   * @param MovieId 
   * @param Title 
   * @returns an updated array of movie objects in the user's favorites
   */
  removeFavorite(MovieId: string, Title: string): void {
    this.fetchApiData.deleteFavorite(MovieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${Title} has been removed from your favorites`,
        'OK',
        {
          duration: 3000,
        }
      );
      this.ngOnInit();
    });
    return this.getFavorites();
  }

}
