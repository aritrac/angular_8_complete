import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-2c7bc-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
            response => {
                console.log(response);
            }
        );
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-2c7bc-default-rtdb.firebaseio.com/recipes.json',)
        .pipe(map(recipes => { //this map is from rxjs used to transform the response
            return recipes.map( recipes => {//this map is a method which will run for all the recipes in the array
                return {...recipes, ingredients: recipes.ingredients? recipes.ingredients : []};
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
        )
    }
}