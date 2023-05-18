import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanCongQLComponent } from './phan-cong-ql.component';

describe('PhanCongQLComponent', () => {
  let component: PhanCongQLComponent;
  let fixture: ComponentFixture<PhanCongQLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhanCongQLComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhanCongQLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
