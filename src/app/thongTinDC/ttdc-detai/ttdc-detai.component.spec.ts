import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtdcDetaiComponent } from './ttdc-detai.component';

describe('TtdcDetaiComponent', () => {
  let component: TtdcDetaiComponent;
  let fixture: ComponentFixture<TtdcDetaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtdcDetaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtdcDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
