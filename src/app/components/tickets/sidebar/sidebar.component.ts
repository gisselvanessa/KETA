import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../moduleusers/services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarCollapsed = false;
  constructor(private authservice:AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
  logout(){
    this.authservice.logout();
    this.route.navigate(['']);
  }

}
