import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-course-recipe-book-2c7bc-default-rtdb.firebaseio.com//recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    //this is the way of checking the latest value once only when we fetch recipes, otherwise for multiple user update events, this code will run unnecessarily making server get calls
    //this is the on-demand way of checking a subscribed value
    //exhaustMap waits for the first observable that is user to return data, then unsubscribes from that observable,
    //then it is replaced by the http observable in the observable chain, and finally the http observable is returned to the outside world
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http
        .get<Recipe[]>(
          'https://ng-course-recipe-book-2c7bc-default-rtdb.firebaseio.com//recipes.json',
          {
            params: new HttpParams().set('auth', user.token) //setting the user token
          }
        );
    }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
