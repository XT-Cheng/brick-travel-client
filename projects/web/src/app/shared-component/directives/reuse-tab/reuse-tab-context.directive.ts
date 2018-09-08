import { Directive, HostListener, Input } from '@angular/core';

import { ReuseItem } from '../../interfaces/reuse-tab/interface';
import { ReuseTabContextService } from '../../services/reuse-tab/reuse-tab-context.service';

@Directive({
  selector: '[btContextMenu]',
})
export class ReuseTabContextDirective {
  @Input() btContextMenu: ReuseItem;

  constructor(private srv: ReuseTabContextService) { }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    this.srv.show.next({
      event,
      item: this.btContextMenu,
    });
    event.preventDefault();
    event.stopPropagation();
  }
}
