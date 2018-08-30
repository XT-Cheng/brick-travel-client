import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '@store';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(
    public userService: UserService,
    public msgSrv: NzMessageService,
  ) {}
}
