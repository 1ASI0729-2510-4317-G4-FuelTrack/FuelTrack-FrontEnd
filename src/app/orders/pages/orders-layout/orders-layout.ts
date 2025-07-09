import { Component } from '@angular/core';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-orders-layout',
  imports: [
    MatSidenavContent,
    MatSidenavContainer,
    RouterOutlet,
    MatSidenav,
    SidebarComponent,
    MatNavList,
    MatListItem,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './orders-layout.html',
  styleUrl: './orders-layout.css'
})
export class OrdersLayoutComponent {

}
