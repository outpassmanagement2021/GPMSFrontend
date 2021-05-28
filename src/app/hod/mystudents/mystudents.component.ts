import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { GlobalService } from "shared-services/global.service";
import { StudentService } from "shared-services/student.service";

@Component({
  selector: "app-mystudents",
  templateUrl: "./mystudents.component.html",
  styleUrls: ["./mystudents.component.scss"],
  providers: [MessageService],
})
export class MystudentsComponent implements OnInit {
  presentHod: any;
  presentHodStudents: any;
  constructor(
    private globalservice: GlobalService,
    private studentservice: StudentService,
    private messageService: MessageService
  ) {}
  async ngOnInit() {
    try {
      this.presentHod = await this.globalservice.getUserBasedOnToken();
      this.presentHodStudents = (
        await this.studentservice.getAllStudents().toPromise()
      ).allStudentsObj;
    } catch (error) {
      console.log(error);
      this.messageService.add({
        key: "toastElement",
        severity: "error",
        summary: "ERROR",
        detail: error.error.message,
        sticky: false,
      });
    }
  }
}
