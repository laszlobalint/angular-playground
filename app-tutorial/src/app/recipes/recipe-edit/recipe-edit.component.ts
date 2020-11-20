import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, AbstractControl, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [
    `
      input.ng-invalid.ng-touched,
      textarea.ng-invalid.ng-touched {
        border: 1px solid red;
      }
    `,
  ],
})
export class RecipeEditComponent implements OnInit {
  public id?: number;
  public editMode = false;
  public form: FormGroup;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly recipeService: RecipeService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      if (params.id) {
        this.editMode = true;
      }
      this.initForm();
    });
  }

  private initForm(): void {
    let name = '';
    let imagePath = '';
    let description = '';
    const ingredients = new FormArray([]);

    if (this.editMode && (this.id || this.id === 0)) {
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient) =>
          ingredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            }),
          ),
        );
      }
    }

    this.form = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description),
      ingredients,
    });
  }

  get controls(): AbstractControl[] {
    return (this.form.get('ingredients') as FormArray).controls;
  }

  onSubmit(): void {
    console.log(this.editMode);
    this.editMode ? this.recipeService.updateRecipe(this.id, this.form.value) : this.recipeService.addRecipe(this.form.value);
    this.onCancel();
  }

  onAddIngredient(): void {
    this.controls.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      }),
    );
  }

  onDeleteIngredient(id: number): void {
    (this.form.get('ingredients') as FormArray).removeAt(id);
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
