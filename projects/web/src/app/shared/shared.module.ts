import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { TranslateModule } from '@ngx-translate/core';
import { AutofocusDirective } from './directives/autofocus.directive';
import { SidebarNavComponent } from '@shared/components/sidebar/sidebar-nav.component';
import { ModalComponent } from '@shared/components/modal/modal.component';

const THIRDMODULES = [NgZorroAntdModule, TranslateModule];

const COMPONENTS = [SidebarNavComponent, ModalComponent];
const DIRECTIVES = [AutofocusDirective];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule,
    DelonABCModule,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {}
