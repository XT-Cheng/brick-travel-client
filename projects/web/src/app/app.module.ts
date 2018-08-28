import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { I18NService } from '@core/i18n/i18n.service';
import { DefaultInterceptor } from '@core/net/default.interceptor';
import { StartupService } from '@core/startup.service';
import { ALAIN_I18N_TOKEN } from '@delon/theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '@shared/shared.module';
import { StoreConfig, StoreModule } from '@store';

import { AppComponent } from './app.component';
import { DelonModule } from './delon.module';
import { LayoutModule } from './layouts/layout.module';
import { RoutesModule } from './routes/routes.module';

export function storeConfig(): StoreConfig {
  return Object.assign(new StoreConfig(), <StoreConfig>{
    api_host: '',
  });
}

// 加载i18n语言文件
export function I18nHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `/assets/i18n/`, '.json');
}

export function StartupServiceFactory(
  startupService: StartupService,
): Function {
  return () => startupService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // i18n
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: I18nHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot(),
    RoutesModule,
    SharedModule,
    LayoutModule,
    DelonModule.forRoot(),
    CoreModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    },
    { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false },
    { provide: StoreConfig, useFactory: storeConfig },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
