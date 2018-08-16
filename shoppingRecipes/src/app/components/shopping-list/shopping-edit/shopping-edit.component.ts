import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../../shared/ingredient.module';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') name: ElementRef;
  @ViewChild('amountInput') amount: ElementRef;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem() {
    const ingredientName = this.name.nativeElement.value;
    const ingredientAmount = this.amount.nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.shoppingService.addIngredient(newIngredient);
  }
}
