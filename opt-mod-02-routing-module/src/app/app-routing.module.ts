import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes' ,
    loadChildren: './recipes/recipes.module#RecipesModule' //This is for lazy loading the module files, thereby reducing the main.js file size
  },
  {
    path: 'shopping-list', 
    loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
