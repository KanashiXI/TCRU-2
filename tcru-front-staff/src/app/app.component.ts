import { Component, OnInit } from '@angular/core';
import { SidebarService } from './Service/sidebar.service';
import { mainContentAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    mainContentAnimation()
  ]
})
export class AppComponent implements OnInit {
  title = 'TCRU';
  sidebarState : string;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.sidebarService.sidebarStateObservable$.subscribe((newState: string) => {
      this.sidebarState = newState;
    });
  }
}
