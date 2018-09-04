import { Component } from '@angular/core';
import { NavigationEnd, NavigationError, RouteConfigLoadStart, Router } from '@angular/router';
import { MenuService, ScrollService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';

import { ComponentType } from '../../routes/features/entity.form.component';
import { EntityListComponent } from '../../routes/features/entity.list.component';

@Component({
  selector: 'layout-default',
  templateUrl: './default.component.html',
})
export class LayoutDefaultComponent {
  isFetching = false;
  isFilterVisible = false;
  entityListComp: ComponentType;

  constructor(
    router: Router,
    scroll: ScrollService,
    private _message: NzMessageService,
    public menuSrv: MenuService,
  ) {
    // scroll to top in change page
    router.events.subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError) {
        this.isFetching = false;
        this._message.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      setTimeout(() => {
        scroll.scrollToTop();
        this.isFetching = false;
      }, 100);
    });
  }

  onActivate(componentRef): void {
    if (componentRef instanceof EntityListComponent) {
      this.entityListComp = componentRef;
      this.entityListComp.layoutComp = this;
    }
  }

  newEntity() {
    if (this.entityListComp) this.entityListComp.createEntity();
  }

  openFilter() {
    this.isFilterVisible = true;
  }

  close() {
    this.isFilterVisible = false;
  }
}
