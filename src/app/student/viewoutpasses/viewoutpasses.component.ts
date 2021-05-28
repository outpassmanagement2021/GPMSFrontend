import { RequestoutpassComponent } from "./../requestoutpass/requestoutpass.component";
import { Component, ViewChild, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { StudentOutpassService } from "shared-services/studentoutpass.service";
import { GlobalService } from "shared-services/global.service";

export interface data {
  id: number;
  date: Date;
  reason: string;
  status: string;
}

const REQUEST_DATA: data[] = [
  { id: 1, date: new Date("2020-08-01"), reason: "reason1", status: "pending" },
  { id: 2, date: new Date("2020-08-01"), reason: "reason2", status: "pending" },
  { id: 3, date: new Date("2020-08-01"), reason: "reason3", status: "pending" },
  { id: 4, date: new Date("2020-08-01"), reason: "reason4", status: "pending" },
  { id: 5, date: new Date("2020-08-01"), reason: "reason5", status: "pending" },
  { id: 6, date: new Date("2020-08-01"), reason: "reason6", status: "pending" },
  { id: 7, date: new Date("2020-08-01"), reason: "reason7", status: "pending" },
  { id: 8, date: new Date("2020-08-01"), reason: "reason8", status: "pending" },
  { id: 9, date: new Date("2020-08-01"), reason: "reason9", status: "pending" },
  {
    id: 10,
    date: new Date("2020-08-01"),
    reason: "reason10",
    status: "pending",
  },
  {
    id: 11,
    date: new Date("2020-08-01"),
    reason: "reason11",
    status: "pending",
  },
];

@Component({
  selector: "app-viewoutpasses",
  templateUrl: "./viewoutpasses.component.html",
  styleUrls: ["./viewoutpasses.component.scss"],
})
export class ViewoutpassesComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private studentoutpassservice: StudentOutpassService,
    private globalservice: GlobalService
  ) {}

  displayedColumns: string[] = ["no", "date", "reason", "status"];
  dataSource = new MatTableDataSource(REQUEST_DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    this.dialog.open(RequestoutpassComponent, dialogConfig);
  }

  async ngOnInit() {
    setTimeout(() => (this.dataSource.sort = this.sort));
    setTimeout(() => (this.dataSource.paginator = this.paginator));
    //avaneesh
    try {
      let studentObj = await this.globalservice.getUserBasedOnToken();
      let studentOutPasses = (
        await this.studentoutpassservice
          .getStudentAllOutPasses(studentObj._id)
          .toPromise()
      ).allStudentOutPasses;
      console.log("outpassess :", studentOutPasses);
    } catch (err) {}
  }
}
