import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  defaultValues = [
    { email: "akhilcruise35@gmail.com" },
    { branch: "cse" },
    { address: "35-379/27, karimnagar" },
    { state: "telangana" },
  ];

  edit1: boolean = false;
  edit2: boolean = true;

  value: string = "edit profile";

  editProfile() {
    if (this.edit2 == true) {
      this.value = "back";
      this.edit1 = true;
      this.edit2 = false;
      //this.edit1 = false;
    } else {
      this.edit1 = false;
      this.edit2 = true;
      this.value = "edit profile";
      window.location.reload();
    }
  }

  //form validation
  form = new FormGroup({
    email: new FormControl(this.defaultValues[0].email, [Validators.required]),
    branch: new FormControl(this.defaultValues[1].branch, Validators.required),
    address: new FormControl(
      this.defaultValues[2].address,
      Validators.required
    ),
    state: new FormControl(this.defaultValues[3].state, Validators.required),
  });

  backToHome() {
    this.router.navigate(["/dashboard"]);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
