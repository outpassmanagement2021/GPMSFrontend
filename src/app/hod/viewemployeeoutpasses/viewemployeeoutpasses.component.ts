import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { EmployeeService } from "shared-services/employee.service";
import { EmployeeOutpassService } from "shared-services/employeeoutpass.service";
import { GlobalService } from "shared-services/global.service";

@Component({
  selector: "app-viewemployeeoutpasses",
  templateUrl: "./viewemployeeoutpasses.component.html",
  styleUrls: ["./viewemployeeoutpasses.component.scss"],
  providers: [MessageService],
})
export class ViewemployeeoutpassesComponent implements OnInit {
  constructor(
    private globalservice: GlobalService,
    private employeeoutpassservice: EmployeeOutpassService,
    private router: Router,
    private route: ActivatedRoute,
    private employeeservice: EmployeeService,
    private messageService: MessageService
  ) {}

  presentHod: any;
  presentEmployee: any;
  presentEmployeeOutPasses: any;

  async ngOnInit() {
    this.route.paramMap.subscribe(async (parammap) => {
      let employeeId = parammap.get("employeeId");
      try {
        this.presentHod = await this.globalservice.getUserBasedOnToken();
        this.presentEmployee = (
          await this.employeeservice.getSingleEmployee(employeeId).toPromise()
        ).employeeObj;
        this.presentEmployeeOutPasses = (
          await this.employeeoutpassservice
            .getEmployeeAllOutPasses(employeeId)
            .toPromise()
        ).allEmployeeOutPasses;
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
