import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Paw Bhaji',
        'This is simply a test',
        'https://c.ndtvimg.com/2019-01/nqbcj8k_pav-bhaji_625x300_25_January_19.jpg',
        [
            new Ingredient('Bread',2),
            new Ingredient('Paw Bhaji Masala',1)
        ]),
        new Recipe('Butter Chicken',
        'This is simply a test',
        'https://www.daringgourmet.com/wp-content/uploads/2018/07/Butter-Chicken-1-square.jpg',
        [
            new Ingredient('Butter',2),
            new Ingredient('Chicken',2)
        ])
      ];

    constructor(private shoppingListService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice(); //return copy of the array to outside, so it is not modified accidentally from outside
    }

    getRecipe(id: number){
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }
}