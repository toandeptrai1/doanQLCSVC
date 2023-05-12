import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhongComponent } from './edit-phong.component';

describe('EditPhongComponent', () => {
  let component: EditPhongComponent;
  let fixture: ComponentFixture<EditPhongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPhongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
