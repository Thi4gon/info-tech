import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { ComunicationService } from '../../shared/services/comunication.service';
import { DigitalClockComponent } from './digital-clock.component';

describe('DigitalClockComponent', () => {
  let component: DigitalClockComponent;
  let fixture: ComponentFixture<DigitalClockComponent>;
  let communicationServiceMock: Partial<ComunicationService>;
  let currentDateSubject: BehaviorSubject<any>;

  beforeEach(() => {
    currentDateSubject = new BehaviorSubject<any>('');
    communicationServiceMock = {
      currentDate$: currentDateSubject.asObservable()
    };

    TestBed.configureTestingModule({
      declarations: [DigitalClockComponent],
      providers: [
        { provide: ComunicationService, useValue: communicationServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DigitalClockComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the clicked date', () => {
    const date = new Date();
    currentDateSubject.next(date);
    fixture.detectChanges();

    const dateElement = fixture.debugElement.query(By.css('.clicked-date'))?.nativeElement;
    expect(dateElement?.textContent).toBe(undefined);
  });

  it('should display an empty date initially', () => {
    fixture.detectChanges();

    const dateElement:any = fixture.debugElement.query(By.css('.clicked-date'))?.nativeElement;
    expect(dateElement?.textContent).toBe(undefined);
  });
});
