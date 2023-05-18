import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LapCaTrucComponent } from './lap-ca-truc.component';

describe('LapCaTrucComponent', () => {
  let component: LapCaTrucComponent;
  let fixture: ComponentFixture<LapCaTrucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LapCaTrucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LapCaTrucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
