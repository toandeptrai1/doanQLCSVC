import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDSThanhLyComponent } from './list-dsthanh-ly.component';

describe('ListDSThanhLyComponent', () => {
  let component: ListDSThanhLyComponent;
  let fixture: ComponentFixture<ListDSThanhLyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDSThanhLyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDSThanhLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
