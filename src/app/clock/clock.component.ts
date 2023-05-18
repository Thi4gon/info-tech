import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';

import { DataUtilsService } from '../shared/utils/data.utils.service';
import { ComunicationService } from '../shared/services/comunication.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  markerPosition = 0;

  constructor(public dataUtils: DataUtilsService,
    private elementRef: ElementRef,
    public comunicationService: ComunicationService) { }
  isChecked = false;
  timeZones = this.dataUtils?.getAllTimezone()
  clickedDate: any;
  timeZoneBckup = '';
  interval: any;
  currentTimeZone = new Date()
  valorSelecionado: any;


  @HostBinding('class') className = ''
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';

  ngOnInit(): void {
    this.checkPreviusTz();

  }



  checkPreviusTz() {
    const currentTz = sessionStorage.getItem('currentTz');
    if (currentTz) {
      this.startClock(currentTz);
      this.setPickedValue(currentTz);
    }else{
      this.startClock('');
      this.setPickedValue('');
    }
  }

  setPickedValue(tz: string) {
    this.valorSelecionado = tz;
  }

  saveTzStorage(tz: any) {
    sessionStorage.setItem("currentTz", tz);
  }

  startClock(timeZone: any) {
    this.startInterval(timeZone);
    this.setTimeZoneBckup(timeZone);
  }

  startInterval(timeZone: any) {

    this.saveTzStorage(timeZone);

    //check if have some interval running
    this.checkIfHaveInterval();

    //start interval
    this.interval = setInterval(() => {
      //if Have timezone comming from screen

      if (timeZone) {
        this.getChoosedTimeZone(timeZone);
        return
      }
      // if don`t have timezone coming from screen ( go standard )
      this.standardTimeZone();
    }, 500)
  }

  getChoosedTimeZone(timeZone: any) {
    let date = new Date();
    const strTime = date.toLocaleString("en-US", { timeZone: `${timeZone}` });
    const datePicked = new Date(strTime);
    this.setDate(datePicked);
  }

  standardTimeZone() {
    let date = new Date();
    this.setDate(date);
  }

  stopInterval() {
    clearInterval(this.interval)
  }

  setDate(date: any) {
    this.clickedDate = date
    this.comunicationService.sendNextDate(date);
    this.updateMarkerPosition(date)
  }

  setTimeZoneBckup(time: any) {
    if (time) {
      this.timeZoneBckup = time;
      return
    }
    this.timeZoneBckup = new Date() + '';
  }

  checkIfHaveInterval() {
    if (this.timeZoneBckup) {
      this.stopInterval();
    }
  }


  updateMarkerPosition(date: any) {
    const dayHours = 24
    const hourMinutes = 60
    const totalDayMinutes = dayHours * hourMinutes;

    //get the marker value. ( current hour(in minutes) + minutes )
    const actualMarkerValue = date.getHours() * hourMinutes + date.getMinutes();

    //get the marker position in percentage
    this.markerPosition = (actualMarkerValue / totalDayMinutes) * 100;
  }


  onChangeToogle($event: any) {
    this.isChecked = $event.checked;
    this.setTheme(this.isChecked);
    if (this.isChecked) {
      this.setDarkColor();

      return
    }
    this.setWhiteColor();
  }

  setTheme(isChecked: boolean) {
    this.className = isChecked ? this.darkClassName : this.lightClassName;
  }

  setDarkColor() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';


    const timeline = document.getElementById('timeline')
    timeline!.style.backgroundColor = '#140a54';

    const marker = document.getElementById('marker')
    marker!.style.backgroundColor = 'blue';
    this.comunicationService.sendDarkmode(true);

  }

  setWhiteColor() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff';

    const timeline = document.getElementById('timeline')
    timeline!.style.backgroundColor = '#f0f0f0';

    const marker = document.getElementById('marker')
    marker!.style.backgroundColor = 'steelBlue';
    this.comunicationService.sendDarkmode(false);

  }


}
