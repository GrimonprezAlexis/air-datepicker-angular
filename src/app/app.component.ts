import { Component, VERSION } from '@angular/core';
import AirDatepicker from 'air-datepicker';
import localeFr from 'air-datepicker/locale/fr';
import dayjs from 'dayjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  ngOnInit() {
    new AirDatepicker('#airPicker', {
      locale: localeFr,
      inline: true,
      range: true,
      dynamicRange: false,
      multipleDatesSeparator: '-',
      onRenderCell({ date, cellType }) {
        console.log('date', date, cellType);

        if (cellType === 'day') {
          if (date.getDate() === 12) {
            return {
              classes: '-current-week-',
            };
          }
        }
      },
      onSelect: ({ date, formattedDate, datepicker }) => {
        console.log('date', date);
        console.log('formattedDate', formattedDate);
        console.log('datepicker', datepicker);
        console.log('-----');
      },
      buttons: [
        {
          content: 'Select this week',
          className: 'custom-button-classname',
          onClick: (dp) => {
            let date = dayjs().format('YYYY-MM-DD');
            dp.selectDate(date);
            dp.setViewDate(date);
          },
        },
        'clear',
      ], // Custom button, and pre-installed 'clear' button
    });
  }
}
