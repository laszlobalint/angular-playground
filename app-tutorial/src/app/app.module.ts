import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { RecipesModule } from './recipes/recipes.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, CoreModule, SharedModule, AuthModule, RecipesModule, ShoppingListModule, BrowserModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
