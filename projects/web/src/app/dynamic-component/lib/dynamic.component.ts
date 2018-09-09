import { ComponentInjector } from './component-injector';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  Output,
  StaticProvider,
  SimpleChanges,
  Type,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'dyn-dynamic',
  template: ''
})
export class DynamicComponent implements OnChanges, ComponentInjector {

  @Input() dynComponent: Type<any>;
  @Input() dynInjector: Injector;
  @Input() dynProviders: StaticProvider[];
  @Input() dynContent: any[][];

  @Output() dynComponentCreated: EventEmitter<ComponentRef<any>> = new EventEmitter();

  componentRef: ComponentRef<any> | null;

  constructor(
    private _vcr: ViewContainerRef,
    private _cfr: ComponentFactoryResolver
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dynComponent']) {
      this.createDynamicComponent();
    }
  }

  createDynamicComponent() {
    this._vcr.clear();
    this.componentRef = null;

    if (this.dynComponent) {
      if (this.dynInjector)
        this._cfr = this.dynInjector.get(ComponentFactoryResolver);

      this.componentRef = this._vcr.createComponent(
        this._cfr.resolveComponentFactory(this.dynComponent),
        0, this._resolveInjector(), this.dynContent
      );
      this.dynComponentCreated.emit(this.componentRef);
    }
  }

  private _resolveInjector(): Injector {
    let injector = this.dynInjector || this._vcr.parentInjector;

    if (this.dynProviders) {
      injector = Injector.create({
        providers: this.dynProviders,
        parent: injector,
      });
    }

    return injector;
  }

}
