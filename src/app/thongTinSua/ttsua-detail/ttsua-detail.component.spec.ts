import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtsuaDetailComponent } from './ttsua-detail.component';

describe('TtsuaDetailComponent', () => {
  let component: TtsuaDetailComponent;
  let fixture: ComponentFixture<TtsuaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtsuaDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtsuaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
