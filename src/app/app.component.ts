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
    this.qrdata =
      "Some random string , generated so on sdkj sbdkjqea hehahh fhewuh efuexbx byoabh cyula  ycpoa";
  }

  myUploader(obj) {
    console.log(obj.originalEvent.body);
  }
  myProgress(obj) {}
}
