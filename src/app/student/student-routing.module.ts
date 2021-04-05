import { ProfileComponent } from "./profile/profile.component";
import { ViewoutpassesComponent } from "./viewoutpasses/viewoutpasses.component";
import { RequestoutpassComponent } from "./requestoutpass/requestoutpass.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "v1/student/dashboard",
    component: DashboardComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "requestoutpass", component: RequestoutpassComponent },
      { path: "viewoutpass", component: ViewoutpassesComponent },
      { path: "profile", component: ProfileComponent },
      // {path :'mentordetails' , component: MentordetailsComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
