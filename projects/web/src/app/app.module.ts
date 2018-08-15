import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DelonModule } from './delon.module';
import { DefaultInterceptor } from '@core/net/default.interceptor';
import { CoreModule } from '@core/core.module';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layouts/layout.module';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@store';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    StoreModule.forRoot(),
    RoutesModule,
    SharedModule,
    LayoutModule,
    DelonModule.forRoot(),
    CoreModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
