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

  // this function will fetch the movies from the FetchApiDataService service via getAllMovies()
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

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

  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: {
        Title: title,
        Description: description
      },
      width: '500px'
    });
  }

  // get list of user's favorites
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      // console.log(this.favorites);
      return this.favorites;
    });
  }

  // returns if movie id is in user's favorites list
  isFavorited(MovieId: string): boolean{
    return this.favorites.includes(MovieId);
  }

  // adds favorited movie to user's favorites list
  addFavorite(MovieId: string, Title: string): void {
    this.fetchApiData.addFavorite(MovieId).subscribe((resp: any) => {
      this.snackBar.open(`${Title} has been added to your favorites`, 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
    return this.getFavorites();
  }

  // removes movie from user's favorite list
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

  toggleFavorite(movie: any): void {
    console.log(movie);
    this.isFavorited(movie._id)
      ? this.removeFavorite(movie._id, movie.Title)
      : this.addFavorite(movie._id, movie.Title);
  }
}
