import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-settings-opt',
  templateUrl: './settings-opt.component.html',
  styleUrls: ['./settings-opt.component.css']
})
export class SettingsOptComponent implements OnInit {
  items: MenuItem[] = [];
  dash: MenuItem = {};

  constructor(
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.items = [

      { label: 'Configuraciones' },

    ];
    this.dash = { icon: 'pi pi-cog', routerLink: '/home-ticket/configuraciones' };
  }
  setHolidays(){
    this.router.navigate(['home-ticket/configuraciones-holidays']);

  }

}
