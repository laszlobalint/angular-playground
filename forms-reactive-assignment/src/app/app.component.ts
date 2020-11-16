import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  public form: FormGroup;
  public projectStates = ["Stable", "Critical", "Finished"];

  ngOnInit(): void {
    this.form = new FormGroup({
      projectName: new FormControl(null, [
        Validators.required,
        this.projectNameValidator.bind(this),
      ]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.asyncEmailValidator.bind(this)
      ),
      projectStatus: new FormControl("Stable", Validators.required),
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

  projectNameValidator(formControl: FormControl): { [s: string]: boolean } {
    if (formControl.value === "test") return { isNotAllowed: true };

    return null;
  }

  asyncEmailValidator(
    formControl: FormControl
  ): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (formControl.value === "test@test.com") {
          resolve({ isNotAllowed: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }
}
