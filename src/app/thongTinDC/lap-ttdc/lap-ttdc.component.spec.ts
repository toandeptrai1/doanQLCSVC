import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LapTTDCComponent } from './lap-ttdc.component';

describe('LapTTDCComponent', () => {
  let component: LapTTDCComponent;
  let fixture: ComponentFixture<LapTTDCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LapTTDCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LapTTDCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
