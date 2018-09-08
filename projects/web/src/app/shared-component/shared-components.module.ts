import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ReuseTabContextMenuComponent } from './components/reuse-tab/reuse-tab-context-menu.component';
import { ReuseTabContextComponent } from './components/reuse-tab/reuse-tab-context.component';
import { ReuseTabComponent } from './components/reuse-tab/reuse-tab.component';
import { ReuseTabContextDirective } from './directives/reuse-tab/reuse-tab-context.directive';

const COMPONENTS = [ReuseTabComponent];
const NOEXPORTS = [
    ReuseTabContextMenuComponent,
    ReuseTabContextComponent,
    ReuseTabContextDirective,
];

@NgModule({
    imports: [CommonModule, RouterModule, NgZorroAntdModule, OverlayModule],
    declarations: [...COMPONENTS, ...NOEXPORTS],
    entryComponents: [ReuseTabContextMenuComponent],
    exports: [...COMPONENTS],
})
export class SharedComponentModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedComponentModule,
        };
    }
}
