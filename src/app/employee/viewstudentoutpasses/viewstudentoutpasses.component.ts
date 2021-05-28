import { StudentService } from "./../../../../shared-services/student.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { GlobalService } from "shared-services/global.service";
import { StudentOutpassService } from "shared-services/studentoutpass.service";

@Component({
  selector: "app-viewstudentoutpasses",
  templateUrl: "./viewstudentoutpasses.component.html",
  styleUrls: ["./viewstudentoutpasses.component.scss"],
  providers: [MessageService],
})
export class ViewstudentoutpassesComponent implements OnInit {
  constructor(
    private globalservice: GlobalService,
    private studentoutpassservice: StudentOutpassService,
    private router: Router,
    private route: ActivatedRoute,
    private studentservice: StudentService,
    private messageService: MessageService
  ) {}

  presentEmployee: any;
  presentStudent: any;
  presentStudentOutpasses: any;

  async ngOnInit() {
    this.route.paramMap.subscribe(async (parammap) => {
      let studentId = parammap.get("studentId");
      try {
        this.presentEmployee = await this.globalservice.getUserBasedOnToken();
        this.presentStudent = (
          await this.studentservice.getSingleStudent(studentId).toPromise()
        ).studentObj;
        this.presentStudentOutpasses = (
          await this.studentoutpassservice
            .getStudentAllOutPasses(studentId)
            .toPromise()
        ).allStudentOutPasses;
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
    });
  }
}
