import { Component, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddItem(): void {
    const newIngredient: Ingredient = { name: this.nameInputRef.nativeElement.value, amount: this.amountInputRef.nativeElement.value };
    this.shoppingListService.addIngredient(newIngredient);
  }
}
