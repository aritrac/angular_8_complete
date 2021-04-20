import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Paw Bhaji',
    //     'This is simply a test',
    //     'https://c.ndtvimg.com/2019-01/nqbcj8k_pav-bhaji_625x300_25_January_19.jpg',
    //     [
    //         new Ingredient('Bread',2),
    //         new Ingredient('Paw Bhaji Masala',1)
    //     ]),
    //     new Recipe('Butter Chicken',
    //     'This is simply a test',
    //     'https://www.daringgourmet.com/wp-content/uploads/2018/07/Butter-Chicken-1-square.jpg',
    //     [
    //         new Ingredient('Butter',2),
    //         new Ingredient('Chicken',2)
    //     ])
    //   ];

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice(); //return copy of the array to outside, so it is not modified accidentally from outside
    }

    getRecipe(id: number){
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe)
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}