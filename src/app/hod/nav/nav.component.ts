import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { GlobalService } from "shared-services/global.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
  providers: [MessageService],
})
export class NavComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private globalservice: GlobalService,
    private messageService: MessageService,
    private router: Router
  ) {}

  presentHod;
  async ngOnInit() {
    try {
      this.presentHod = await this.globalservice.getUserBasedOnToken();
    } catch (error) {
      this.messageService.add({
        key: "toastElement",
        severity: "error",
        summary: "ERROR",
        detail: error.error.message,
        sticky: false,
      });
    }
  }
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  onDashBoardClick() {
    this.router.navigateByUrl("v1/hod/dashboard");
  }

  logOut() {
    this.globalservice.logout();
  }
}
