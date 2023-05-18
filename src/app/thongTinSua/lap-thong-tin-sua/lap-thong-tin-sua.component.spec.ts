import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LapThongTinSuaComponent } from './lap-thong-tin-sua.component';

describe('LapThongTinSuaComponent', () => {
  let component: LapThongTinSuaComponent;
  let fixture: ComponentFixture<LapThongTinSuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LapThongTinSuaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LapThongTinSuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
