import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Menu, MenuItem } from '@dhis2/ui';
import React from 'react';

@Component({
  selector: 'ng-dhis2-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  menu = () => (
    <div>
      <Menu>
        <MenuItem
          label="Dashboard"
          value="dashboard"
          active
          className="menu-background"
          onClick={(e: any) => {
            this.onSelectPage(e);
          }}
        />
        <MenuItem
          label="Components"
          value="components"
          className="menu-background"
          onClick={(e: any) => {
            this.onSelectPage(e);
          }}
        />
      </Menu>
    </div>
  );

  onSelectPage(menuChange: any) {
    this.router.navigate([`${menuChange.value}`]);
  }
}
