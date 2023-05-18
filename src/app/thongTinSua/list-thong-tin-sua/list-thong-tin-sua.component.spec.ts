import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListThongTinSuaComponent } from './list-thong-tin-sua.component';

describe('ListThongTinSuaComponent', () => {
  let component: ListThongTinSuaComponent;
  let fixture: ComponentFixture<ListThongTinSuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListThongTinSuaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListThongTinSuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
