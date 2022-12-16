import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockmovementreportComponent } from './stockmovementreport.component';

describe('StockmovementreportComponent', () => {
  let component: StockmovementreportComponent;
  let fixture: ComponentFixture<StockmovementreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockmovementreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockmovementreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
