import { ScannerComponent } from "./scanner/scanner.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PasswordchangeComponent } from "./passwordchange/passwordchange.component";

const routes: Routes = [
  {
    path: "v1/security/dashboard",
    component: DashboardComponent,
    children: [
      { path: "scanner", component: ScannerComponent },
      { path: "changepassword", component: PasswordchangeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
