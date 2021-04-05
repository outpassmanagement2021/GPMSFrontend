import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: "View recent out-passes", cols: 2, rows: 1, rank: 1 },
          {
            title: "My Details",
            cols: 2,
            rows: 1,
            rank: 2,
            content: "Details of students",
            name: "Akhil Dharavath",
            department: "CSE",
            email: "akhilcruise35@gmail.com",
          },

          { title: "Mentor Details", cols: 2, rows: 1, rank: 3 },
          { title: "HOD Details", cols: 2, rows: 1, rank: 4 },
          { title: "Document", cols: 2, rows: 1, rank: 5 },
        ];
      }

      return [
        { title: "View recent out-passes", cols: 2, rows: 1, rank: 1 },
        {
          title: "My Details",
          cols: 1,
          rows: 1,
          rank: 2,
          content: "Details of students",
          name: "Akhil Dharavath",
          department: "CSE",
          email: "akhilcruise35@gmail.com",
        },

        { title: "Mentor Details", cols: 1, rows: 1, rank: 3 },
        { title: "HOD Details", cols: 1, rows: 1, rank: 4 },
        { title: "Document", cols: 1, rows: 1, rank: 5 },
      ];
    })
  );

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {}

  morebtnfun() {
    this.router.navigate(["/dashboard/viewoutpass"]);
  }
}
