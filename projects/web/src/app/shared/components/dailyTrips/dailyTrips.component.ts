import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, forwardRef, Inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TravelAgendaService } from '@store';

export interface ITestBiz {
    id: string;
}

export interface ITestDailyTripBiz extends ITestBiz {
    travelViewPoints: ITestTravelViewPointBiz[];
}

export interface ITestTravelViewPointBiz extends ITestBiz {
    distanceToNext: number;
    name: string;
}


@Component({
    selector: 'bt-daily-trips',
    templateUrl: 'dailyTrips.component.html',
    styleUrls: ['./dailyTrips.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DailyTripsComponent),
            multi: true
        }
    ]
})
export class DailyTripsComponent implements ControlValueAccessor {

    //#region Private member

    private _selectedDailyTrip: ITestDailyTripBiz;
    private _selectedTravelViewPoint: ITestTravelViewPointBiz;

    //#endregion

    //#region Protected member

    //#endregion

    //#region Public member

    @Input() dailyTrips: ITestDailyTripBiz[] = [];

    //#endregion

    //#region Protected property
    public get selectedDailyTrip(): ITestDailyTripBiz {
        return this._selectedDailyTrip;
    }

    public get selectedTravelViewPoint(): ITestTravelViewPointBiz {
        return this._selectedTravelViewPoint;
    }
    //#endregion

    //#region Constructor

    constructor(
        @Inject(DOCUMENT) private _document: Document,
        private _element: ElementRef,
        public _travelAgendaService: TravelAgendaService,
    ) {
    }

    //#endregion

    //#region Public methods
    getTravelViewPointClass(travelViewPoint: ITestTravelViewPointBiz) {
        return {
            'vp-item-selected': this.isTravelViewPointSelected(travelViewPoint)
        }
    }

    getDailyTripClass(dailyTrip: ITestDailyTripBiz) {
        return {
            'dt-item-selected': this.isDailyTripSelected(dailyTrip)
        }
    }

    dailyTripSelected(dailyTrip: ITestDailyTripBiz) {
        this._selectedDailyTrip = dailyTrip;
    }


    travelViewPointSelected(travelViewPoint: ITestTravelViewPointBiz) {
        this._selectedTravelViewPoint = travelViewPoint;
    }


    //#endregion

    //#region Private methods

    isDailyTripSelected(dailyTrip: ITestDailyTripBiz) {
        return (!!this._selectedDailyTrip) && (this._selectedDailyTrip.id === dailyTrip.id);
    }

    isTravelViewPointSelected(travelViewPoint: ITestTravelViewPointBiz) {
        return (!!this._selectedTravelViewPoint) && (this._selectedTravelViewPoint.id === travelViewPoint.id);
    }

    //#endregion

    //#region Interface implementation

    writeValue(obj: any): void {
        console.log(`obj ${obj}`);
        this.dailyTrips = obj;
    }
    registerOnChange(fn: any): void {
        console.log(`fn ${fn}`);
    }
    registerOnTouched(fn: any): void {
        console.log(`fn ${fn}`);
    }
    setDisabledState?(isDisabled: boolean): void {
        console.log(`isDisabled ${isDisabled}`);
    }

    //#endregion
}
