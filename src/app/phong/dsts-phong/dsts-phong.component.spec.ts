import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DstsPhongComponent } from './dsts-phong.component';

describe('DstsPhongComponent', () => {
  let component: DstsPhongComponent;
  let fixture: ComponentFixture<DstsPhongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DstsPhongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DstsPhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
