import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe','This is simply a test','https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/The_Perfect_Breakfast.jpg/800px-The_Perfect_Breakfast.jpg'),
    new Recipe('A Test Recipe','This is simply a test','https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/The_Perfect_Breakfast.jpg/800px-The_Perfect_Breakfast.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
