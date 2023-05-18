import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTTDCComponent } from './list-ttdc.component';

describe('ListTTDCComponent', () => {
  let component: ListTTDCComponent;
  let fixture: ComponentFixture<ListTTDCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTTDCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTTDCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
