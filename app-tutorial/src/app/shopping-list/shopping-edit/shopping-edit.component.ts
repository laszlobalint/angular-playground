import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  onAddItem(): void {
    const newIngredient: Ingredient = { name: this.nameInputRef.nativeElement.value, amount: this.amountInputRef.nativeElement.value };
    this.ingredientAdded.emit(newIngredient);
  }
}
