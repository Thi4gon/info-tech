import { TestBed } from '@angular/core/testing';
import { ComunicationService } from './comunication.service';

describe('ComunicationService', () => {
  let service: ComunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize currentDate with an empty value', () => {
    expect(service.currentDate.getValue()).toBe('');
  });

  it('should emit the next date', () => {
    const date = new Date();
    service.sendNextDate(date);
    expect(service.currentDate.getValue()).toBe(date);
  });
});
