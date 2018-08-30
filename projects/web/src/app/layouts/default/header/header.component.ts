import { Component } from '@angular/core';
import { ApplicationService, LayoutService } from '@store';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  constructor(
    public appService: ApplicationService,
    public layoutService: LayoutService,
  ) {}

  toggleCollapsedSideabar() {
    this.layoutService.setSidebarCollapsed(
      !this.layoutService.sidebarCollapsed,
    );
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }
}
