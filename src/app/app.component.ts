import { Component, VERSION, ViewChild } from '@angular/core';
import AirDatepicker from 'air-datepicker';
import localeFr from 'air-datepicker/locale/fr';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  @ViewChild('airPicker') airPickerComponent: AirDatepicker;

  ngOnInit() {
    let button = {
      content: 'Select Previous Week',
      className: 'custom-button-classname',
      onClick: (dp) => {
        //let date = new Date('2021-07-26');
        let dateRange = [
          new Date(2021, 6, 13),
          new Date(2021, 6, 14)
        ]
        dp.selectDate(dateRange);
        dp.setViewDate(dateRange);
      },
    };

    new AirDatepicker('#airPicker', {
      locale: localeFr,
      inline: true,
      range: true,
      dynamicRange: false,
      multipleDates: true,
      onRenderCell({ date, cellType }) {
        let dateUtc = dayjs(date).utc();
        let utcWeekStart = dayjs().utc().startOf('week');
        let utcWeekEnd = dayjs().utc().endOf('week');

        if (
          dateUtc.isSameOrAfter(utcWeekStart) &&
          dateUtc.isSameOrBefore(utcWeekEnd)
        ) {
          return {
            classes: '-current-week-',
          };
        }
      },
      onSelect: ({ date, formattedDate, datepicker }) => {
        console.log('date', date);
        console.log('formattedDate', formattedDate);
        console.log('datepicker', datepicker);
        console.log('-----');

        /** 
        datepicker.selectDate([
          new Date(2021, 6, 13),
          new Date(2021, 6, 14),
          new Date(2021, 6, 15)
        ])
        */

        //datepicker.selectDate(new date)


      },
      buttons: [button, 'clear'], // Custom button, and pre-installed 'clear' button
    });

    this.airPickerComponent.selectDate;
  }
}
