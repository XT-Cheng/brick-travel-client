import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITestDailyTripBiz } from '@shared/components/dailyTrips/dailyTrips.component';

@Component({
  selector: 'bt-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less'],
})
export class TestComponent {
  form: FormGroup;

  data: ITestDailyTripBiz[] = [
    {
      id: '1.1',
      travelViewPoints: [
        {
          id: '2.1',
          name: 'VP1',
          distanceToNext: 1
        },
        {
          id: '2.2',
          name: 'VP2',
          distanceToNext: 2
        }
      ]
    },
    {
      id: '1.2',
      travelViewPoints: [
        {
          id: '2.3',
          name: 'VP3',
          distanceToNext: 3
        },
        {
          id: '2.4',
          name: 'VP4',
          distanceToNext: 4
        }
      ]
    }
  ]
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      dailyTrips: [this.data, null]
    });
  }

  clicked(event) {
    console.log(this.form.value);
  }
}
