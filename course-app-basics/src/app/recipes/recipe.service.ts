import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe','This is simply a test','https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/The_Perfect_Breakfast.jpg/800px-The_Perfect_Breakfast.jpg'),
        new Recipe('Another Test Recipe','This is simply a test','https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/The_Perfect_Breakfast.jpg/800px-The_Perfect_Breakfast.jpg')
      ];

    getRecipes(){
        return this.recipes.slice(); //return copy of the array to outside, so it is not modified accidentally from outside
    }
}