import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DigitalClockComponent } from './digital-clock.component';
import { ComunicationService } from '../../shared/services/comunication.service';

describe('DigitalClockComponent', () => {
  let component: DigitalClockComponent;
  let fixture: ComponentFixture<DigitalClockComponent>;
  let comunicationService: ComunicationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DigitalClockComponent],
      providers: [ComunicationService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalClockComponent);
    component = fixture.componentInstance;
    comunicationService = TestBed.inject(ComunicationService);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });



});
