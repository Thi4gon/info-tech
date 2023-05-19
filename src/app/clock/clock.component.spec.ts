import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { ClockComponent } from './clock.component';
import { ComunicationService } from '../shared/services/comunication.service';
import { DataUtilsService } from '../shared/utils/data.utils.service';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;
  let communicationServiceMock: Partial<ComunicationService>;
  let dataUtilsServiceMock: Partial<DataUtilsService>;
  let currentDateSubject: BehaviorSubject<any>;

  beforeEach(() => {
    currentDateSubject = new BehaviorSubject<any>('');
    communicationServiceMock = {
      currentDate$: currentDateSubject.asObservable(),
      sendNextDate: (date: any) => {
        currentDateSubject.next(date);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ClockComponent],
      providers: [
        { provide: ComunicationService, useValue: communicationServiceMock },
        { provide: DataUtilsService, useValue: dataUtilsServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClockComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start clock with selected timezone', () => {
    const timezone = 'America/New_York';
    spyOn(component, 'startInterval');
    spyOn(component, 'setTimeZoneBckup');

    component.startClock(timezone);

    expect(component.startInterval).toHaveBeenCalledWith(timezone);
    expect(component.setTimeZoneBckup).toHaveBeenCalledWith(timezone);
  });

  it('should start clock with standard timezone if no timezone selected', () => {
    spyOn(component, 'startInterval');
    spyOn(component, 'setTimeZoneBckup');

    component.startClock('');

    expect(component.startInterval).toHaveBeenCalledWith('');
    expect(component.setTimeZoneBckup).toHaveBeenCalledWith('');
  });

  it('should update clickedDate and marker position when date is received', () => {
    const date = new Date();
    const expectedMarkerPosition = (date.getHours() * 60 + date.getMinutes()) / 1440 * 100;

    component.setDate(date);

    expect(component.clickedDate).toEqual(date);
    expect(component.markerPosition).toBe(expectedMarkerPosition);
  });

  it('should stop interval if timezone backup exists', () => {
    component.timeZoneBckup = 'America/New_York';
    spyOn(window, 'clearInterval');

    component.checkIfHaveInterval();

    expect(window.clearInterval).toHaveBeenCalled();
  });

  it('should not stop interval if timezone backup does not exist', () => {
    spyOn(window, 'clearInterval');

    component.checkIfHaveInterval();

    expect(window.clearInterval).not.toHaveBeenCalled();
  });



});
