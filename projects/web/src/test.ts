// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'zone.js/dist/zone-testing';

import { NgRedux } from '@angular-redux/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CoreModule } from '@core/core.module';
import { DataFlushService, IAppState, INIT_APP_STATE, RootEpics, rootReducer, StoreModule } from '@store';
import { deepExtend } from '@utilities';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { stateTransformer } from 'redux-seamless-immutable';
import * as Immutable from 'seamless-immutable';

import { DelonModule } from './app/delon.module';

export async function initTest() {
  TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      CoreModule,
      DelonModule.forRoot(),
      StoreModule.forRoot()
    ]
  });

  const flushSrv = <DataFlushService>getTestBed().get(DataFlushService);
  const store = <NgRedux<IAppState>>getTestBed().get(NgRedux);
  const rootEpics = <RootEpics>getTestBed().get(RootEpics);
  const epicMiddleware = createEpicMiddleware();
  store.configureStore(
    rootReducer,
    <any>(
      Immutable(deepExtend(INIT_APP_STATE, flushSrv.restoreState()))
    ),
    [createLogger({ stateTransformer: stateTransformer }), epicMiddleware],
  );

  epicMiddleware.run(rootEpics.createEpics());
}

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
