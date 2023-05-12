import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhongComponent } from './add-phong.component';

describe('AddPhongComponent', () => {
  let component: AddPhongComponent;
  let fixture: ComponentFixture<AddPhongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
