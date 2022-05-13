/**
 * The UserFavoritesComponent displays the movies that the current user has favorited from
 * the movie-card.
 * The cards display the same information as the 'movies' view: title, director, genre, description
 * User can remove favorite movie by clicking on the heart icon 
 * @module UserFavoritesComponent
 */
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'
import { combineLatest } from 'rxjs';
// imported components
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss']
})
export class UserFavoritesComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserAndFavoriteMovies();
  }

  getUserAndFavoriteMovies() {
    // this.isLoading = true;
    combineLatest([this.fetchApiData.getUser(), this.fetchApiData.getAllMovies()]).subscribe(([user, movies]) => {
      this.user = user;

      this.favoriteMovies = movies.filter((movie: any) => {
        return this.user.FavoriteMovies.includes(movie._id)
      });

      // this.isLoading = false;
    })
  }

  /**
   * Gets a list of all the movies from the API and then filters this list to get movies
   * with MovieID that matches the MovieIDs in user.FavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favoriteMovies = res.filter((movie: any) => {
        return this.user.FavoriteMovies.includes(movie._id)
      });
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    })
  }

  /**
   * Removes a movie object from the current user's favorites list using an API call
   * Page reloads to update the UI
   * @param MovieID the _id of the movie that the user chose
   * @param Title of the movie
   * @returns an updated favorites list
   */
  removeFavoriteMovie(MovieID: string, Title: string): void {
    this.fetchApiData.deleteFavoriteMovie(MovieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${Title} has been removed from your favorites`, 'OK', 
      { duration: 3000, 
      }
      );
      window.location.reload();
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
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

}
