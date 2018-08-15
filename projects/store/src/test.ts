// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataFlushService } from './lib/providers/dataFlush.service';
import { INIT_APP_STATE, IAppState } from './lib/store.model';
import { NgRedux } from '@angular-redux/store';
import { RootEpics } from './lib/store.epic';

export async function initTest() {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
  });

  const flushSrv = <DataFlushService>getTestBed().get(DataFlushService);
  const store = <NgRedux<IAppState>>getTestBed().get(NgRedux);
  const rootEpics = <RootEpics>getTestBed().get(RootEpics);
  // return flushSrv.restoreState().then(restoredState => {
  //   store.configureStore(
  //     rootReducer,
  //     <any>Immutable(deepExtend(INIT_APP_STATE, restoredState)),
  //     [
  //       createLogger({ stateTransformer: stateTransformer }),
  //       createEpicMiddleware(rootEpics.createEpics()),
  //     ],
  //   );
  // });
}

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
