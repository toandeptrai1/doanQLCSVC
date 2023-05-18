import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhLyDetailComponent } from './thanh-ly-detail.component';

describe('ThanhLyDetailComponent', () => {
  let component: ThanhLyDetailComponent;
  let fixture: ComponentFixture<ThanhLyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanhLyDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanhLyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
