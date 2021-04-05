import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
//import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-requestoutpass",
  templateUrl: "./requestoutpass.component.html",
  styleUrls: ["./requestoutpass.component.scss"],
})
export class RequestoutpassComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  //today's date
  todayDate: Date = new Date();

  //alert
  alert: boolean = false;

  //close-dialog
  close: boolean = true;

  // public useDefault = false;

  //form validation
  form = new FormGroup({
    oDate: new FormControl("", [Validators.required]),
    oTime: new FormControl("", Validators.required),
    rTime: new FormControl("", Validators.required),
    reason: new FormControl("", Validators.required),
    message: new FormControl("", [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  //current date
  myDate = Date.now();

  //outgoing date filter
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  selectedFile: any;
  //reasons
  reasons = [
    "accident of relativs/family members",
    "admission cancelled",
    "Attending funerals of relatives",
    "Attending the sports meet",
    "Attending workshop/seminars etc",
    "CASTING VOTE",
    "COVID-19 Effect",
    "Death of relatives",
    "Festival",
    "Family functions",
    "General Shopping",
    "PASSPORT verification",
    "GATE Exam",
    "NPTEL Exam",
    "Sport meet work",
    "Urgent visit to home",
    "Web Casting",
    "Internship certificate",
    "Internship related",
    "NSS related work",
    "Paper presentation",
    "semester break",
    "Public service exam",
    "Project work related",
    "Placement drive",
    "Cultural festwork",
    "Others",
  ];

  //onSubmit request form
  onSubmit() {
    if (this.form.valid) {
      console.log("form submited", this.form.value["oDate"]);

      let formData = new FormData();
      formData.append("outgoingDate", this.form.value["oDate"]);
      formData.append("outgoingTime", this.form.value["oTime"]);
      formData.append("incomingTime", this.form.value["rTime"]);
      formData.append("reason", this.form.value["reason"]);
      formData.append("description", this.form.value["message"]);
      if (this.selectedFile) formData.append("requestfile", this.selectedFile);

      console.log(formData.get("requestfile"));
      this.selectedFile = undefined;

      this.http
        .post("http://localhost:8000/api/v1/outpass/studentoutpass", formData)
        .subscribe((res) => {
          console.log(res);
        });

      //this.form.reset();
      this.alert = true;
    }
  }

  //reset form
  onReset() {
    this.form.reset();
  }

  //file upload
  myUploader(obj) {
    console.log(obj.files[0]);
    this.selectedFile = obj.files[0];
  }
}
