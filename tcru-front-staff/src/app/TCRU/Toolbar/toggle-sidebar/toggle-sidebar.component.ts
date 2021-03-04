import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../Service/sidebar.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Input } from '@angular/core';

@Component({
  selector: 'app-toggle-sidebar',
  templateUrl: './toggle-sidebar.component.html',
  styleUrls: ['./toggle-sidebar.component.css']
})
export class ToggleSidebarComponent {

  @Input() sidenav: MatSidenav

  constructor(
    private SidebarService: SidebarService
  ) { }

  toggleSideNav() {
    this.SidebarService.toggle();
  }

}
