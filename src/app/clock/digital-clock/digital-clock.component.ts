import { AfterViewInit, Component, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ComunicationService } from '../../shared/services/comunication.service';



@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.scss']
})
export class DigitalClockComponent implements AfterViewInit, OnDestroy {


  clickedDate$ = this.comunicationService.currentDate$
  isDarkMode$ = this.comunicationService.isDarkMode$
  protected ngUnsubscribe: Subject<void> = new Subject<void>();


  constructor(public comunicationService: ComunicationService){}

  ngAfterViewInit(): void {
    this.isDarkMode$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      isDarkMode => {
        const clock = document.getElementById('clock')


        if(isDarkMode){
          if(clock){
            this.setDarkColor(clock);
          }
          return
        }
        if(clock){
          this.setWhiteColor(clock);
        }

      }
    )
  }

  setDarkColor(clock:any){
    clock!.style.backgroundColor = 'black';
    clock!.style.color = '#fff';
  }
  setWhiteColor(clock:any){
    clock!.style.backgroundColor = '#fff';
    clock!.style.color = 'black';
  }

  ngOnDestroy() {
    // This aborts all streams.
    this.ngUnsubscribe.next();
    // This completes the subject properlly.
    this.ngUnsubscribe.complete();

  }
}
