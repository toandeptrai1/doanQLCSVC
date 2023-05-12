import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaiSanComponent } from './edit-tai-san.component';

describe('EditTaiSanComponent', () => {
  let component: EditTaiSanComponent;
  let fixture: ComponentFixture<EditTaiSanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaiSanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaiSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
