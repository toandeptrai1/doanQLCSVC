import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LapDSThanhLyComponent } from './lap-dsthanh-ly.component';

describe('LapDSThanhLyComponent', () => {
  let component: LapDSThanhLyComponent;
  let fixture: ComponentFixture<LapDSThanhLyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LapDSThanhLyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LapDSThanhLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
