import { Component, ComponentRef } from '@angular/core';
import { NavigationEnd, NavigationError, RouteConfigLoadStart, Router } from '@angular/router';
import { MenuService, ScrollService } from '@delon/theme';
import { ComponentType, EntityListComponent } from '@routes/features/entity.list.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'layout-default',
  templateUrl: './default.component.html',
})
export class LayoutDefaultComponent {
  isFetching = false;
  isFilterVisible = false;
  entityListComp: ComponentType;
  filterComponent: any = null;

  outputs = {
    filterSelectedEvent: () => this.close()
  }

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
    this.filterComponent = null;
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

  filter() {
    if (this.entityListComp) return this.entityListComp.filterComp();
  }

  injector() {
    if (this.entityListComp) return this.entityListComp.injector();
  }

  hasFilters() {
    if (this.filterComponent === null) return false;

    if (!this.filter()) return false;

    return this.filterComponent.currentFilters().length > 0;
  }

  filterCreated(compRef: ComponentRef<any>) {
    this.filterComponent = compRef.instance;
  }
}
