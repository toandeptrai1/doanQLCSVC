import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaiSanComponent } from './list-tai-san.component';

describe('ListTaiSanComponent', () => {
  let component: ListTaiSanComponent;
  let fixture: ComponentFixture<ListTaiSanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTaiSanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTaiSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
