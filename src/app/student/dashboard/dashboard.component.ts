import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
   //logout function
  logoutfun()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  //home function
  dashboardfun()
  {
    this.router.navigate(['/dashboard'])
  }

  //request function
  requestoutpassfun()
  {
    this.router.navigate(['/dashboard/requestoutpass']);
  }

  //viewoutpass function
  viewoutpassfun()
  {
    this.router.navigate(['/dashboard/viewoutpass']);
  }

  //reqoutpass function
  mentorfun()
  {
    this.router.navigate(['/dashboard/mentordetails']);
  }

  //showprofile function
  profilefun()
  {
    this.router.navigate(['/dashboard/profile']);
  }

}
