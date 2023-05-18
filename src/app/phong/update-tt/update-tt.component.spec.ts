import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTTComponent } from './update-tt.component';

describe('UpdateTTComponent', () => {
  let component: UpdateTTComponent;
  let fixture: ComponentFixture<UpdateTTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
