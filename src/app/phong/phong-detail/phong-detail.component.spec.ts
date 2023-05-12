import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhongDetailComponent } from './phong-detail.component';

describe('PhongDetailComponent', () => {
  let component: PhongDetailComponent;
  let fixture: ComponentFixture<PhongDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhongDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhongDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
