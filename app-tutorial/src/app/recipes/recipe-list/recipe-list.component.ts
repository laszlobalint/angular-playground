import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [
    {
      name: 'Test',
      description: 'Test recipe',
      imagePath:
        'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FSeries%2F2020-07-medi-monday-one-pot-eggplant-caponata-pasta%2FKitchn_MediMonday_Eggplant_1',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
