import {
  Component,
  HostBinding,
  OnInit,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { VERSION as VERSION_ALAIN, TitleService } from '@delon/theme';
import { VERSION as VERSION_ZORRO } from 'ng-zorro-antd';
import { LayoutService } from '@store';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  @HostBinding('class.aside-collapsed')
  get isCollapsed() {
    return this.layout.sidebarCollapsed;
  }

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private layout: LayoutService,
    private router: Router,
    private titleSrv: TitleService,
  ) {
    renderer.setAttribute(
      el.nativeElement,
      'ng-alain-version',
      VERSION_ALAIN.full,
    );
    renderer.setAttribute(
      el.nativeElement,
      'ng-zorro-version',
      VERSION_ZORRO.full,
    );
  }

  ngOnInit() {
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => this.titleSrv.setTitle());
  }
}
