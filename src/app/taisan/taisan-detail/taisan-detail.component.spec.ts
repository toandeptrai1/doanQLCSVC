import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaisanDetailComponent } from './taisan-detail.component';

describe('TaisanDetailComponent', () => {
  let component: TaisanDetailComponent;
  let fixture: ComponentFixture<TaisanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaisanDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaisanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
