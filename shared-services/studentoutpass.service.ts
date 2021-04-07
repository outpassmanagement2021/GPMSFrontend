import { environment } from "../src/environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { NotificationService } from "./notification.service";

@Injectable({ providedIn: "root" })
export class StudentOutpassService {
  private apiBaseUrl: string =
    environment.apiBaseUrl + "outpass/studentoutpass/";

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  createNewStudentOutPass(outpassObject) {
    let api = this.apiBaseUrl;
    return this.http.post<{ message: string }>(api, outpassObject);
  }
}
