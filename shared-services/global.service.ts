import { NotificationService } from "./notification.service";
import { environment } from "./../src/environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class GlobalService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  // variables
  private isLoggedIn = false;
  private token: string;
  private apiBaseUrl: string = environment.apiBaseUrl;

  // subjects
  private loggedInSubject = new Subject<boolean>();
  private loggedInSubjectListener = new Subject<boolean>().asObservable();

  getToken() {
    return this.token;
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  async userLogin(loginObject) {
    let api = this.apiBaseUrl + `auth/login`;
    let login = {
      Id: loginObject.Id,
      password: loginObject.password,
    };
    //  try {
    let result = await this.http
      .post<{ message: string; designation: string; signedToken: string }>(
        api,
        login
      )
      .toPromise();
    console.log(result);
    this.token = result.signedToken;

    // 1. save the token in local storage
    this.saveToken(this.token);

    // 2. Notify our App
    this.loggedInSubject.next(true);

    // 3. Appropriate routing
    if (result.designation == "student") {
      this.router.navigateByUrl("v1/student/dashboard");
    } else if (result.designation == "employee") {
      this.router.navigateByUrl("v1/employee/dashboard");
    } else if (result.designation == "security") {
      this.router.navigateByUrl("v1/security/dashboard");
    }
  }

  saveToken(token: string) {
    localStorage.setItem("GPMSTOKEN", token);
  }

  forgotPassword(idObject) {
    let api = this.apiBaseUrl + `auth/forgotpassword`;
    return this.http.post<{ message: string }>(api, idObject);
  }

  resetPassword(resetPasswordObject, token) {
    let api = this.apiBaseUrl + `auth/resetpassword/${token}`;

    return this.http.patch<{ message: string }>(api, resetPasswordObject);
  }

  changePassword(idObject) {
    let api = this.apiBaseUrl + `auth/changepassword`;
    return this.http.post<{ message: string }>(api, idObject);
  }

  getUserFile(filename: string) {
    let api = this.apiBaseUrl + `file/userfile`;
    return this.http.post(
      api,
      { filename: filename },
      { responseType: "blob" }
    );
  }
  getUserImage(filename: string) {
    let api = this.apiBaseUrl + `file/userimage`;
    return this.http.post(
      api,
      { filename: filename },
      { responseType: "blob" }
    );
  }
}
