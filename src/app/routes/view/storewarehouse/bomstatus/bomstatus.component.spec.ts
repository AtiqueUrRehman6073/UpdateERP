import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BOMStatusComponent } from './bomstatus.component';

describe('BOMStatusComponent', () => {
  let component: BOMStatusComponent;
  let fixture: ComponentFixture<BOMStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BOMStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BOMStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
