import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "GPMSFrontend";
  public qrdata: string = null;
  constructor() {
    console.log("AppComponent running");
    this.qrdata = "608eb63f4b4d6b5730fb3262:student";
  }

  myUploader(obj) {
    console.log(obj.originalEvent.body);
  }
  myProgress(obj) {}
}
