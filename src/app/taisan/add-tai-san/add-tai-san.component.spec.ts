import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaiSanComponent } from './add-tai-san.component';

describe('AddTaiSanComponent', () => {
  let component: AddTaiSanComponent;
  let fixture: ComponentFixture<AddTaiSanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaiSanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaiSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
