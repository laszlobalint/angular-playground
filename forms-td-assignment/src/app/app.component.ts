import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  public subscriptions = ["basic", "advanced", "pro"];
  public subscriptionValue = "advanced";

  public form = {
    email: "",
    subscription: "",
    password: "",
    submitted: false,
  };

  onSubmit(form: NgForm): void {
    this.form.email = form.value.email;
    this.form.subscription = form.value.subscription;
    this.form.password = form.value.password;
    this.form.submitted = true;
  }
}
