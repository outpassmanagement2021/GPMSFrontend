import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalService } from "shared-services/global.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private globalservice: GlobalService,
    private messageService: MessageService
  ) {}
  hide = true;
  role;
  isLoading = false;
  ngOnInit(): void {}

  async onLogin(userObj) {
    try {
      this.isLoading = true;
      await this.globalservice.userLogin(userObj);
      this.messageService.add({
        key: "toastElement",
        severity: "success",
        summary: "Success",
        detail: "Succesfully logged in",
        sticky: false,
      });

      // 3. Appropriate routing
      this.router.navigateByUrl("v1/student/dashboard");

      console.log("after login");
      this.isLoading = false;
      // tslint:disable-next-line: max-line-length
    } catch (error) {
      console.log("in catch block");
      console.log(error);
      this.messageService.add({
        key: "toastElement",
        severity: "error",
        summary: "AUTHENTICATION ERROR",
        detail: error.error.message,
        sticky: true,
      });

      //routing
    }
  }
}
