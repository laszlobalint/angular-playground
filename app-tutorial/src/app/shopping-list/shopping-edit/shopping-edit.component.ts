import { Component, OnInit, OnDestroy, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form: NgForm;
  editingSubscription?: Subscription;
  editMode = false;
  editedItemId?: number;
  editedItem?: Ingredient;

  constructor(@Inject(PLATFORM_ID) private readonly platformId, private readonly shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.editingSubscription = this.shoppingListService.startedEditing.subscribe((id: number) => {
        this.editMode = true;
        this.editedItemId = id;
        this.editedItem = this.shoppingListService.getIngredient(id);
        this.form.setValue({ name: this.editedItem.name, amount: this.editedItem.amount });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.editingSubscription) {
      this.editingSubscription.unsubscribe();
    }
  }

  onSubmitItem(form: NgForm): void {
    const newIngredient: Ingredient = { name: form.value.name, amount: form.value.amount };
    this.editMode
      ? this.shoppingListService.updateIngredient(this.editedItemId, newIngredient)
      : this.shoppingListService.addIngredient(newIngredient);
    this.editMode = false;
    form.reset();
  }

  onClear(): void {
    this.form.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editedItemId);
    this.onClear();
  }
}
