import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageEntryComponent } from './damage-entry.component';

describe('DamageEntryComponent', () => {
  let component: DamageEntryComponent;
  let fixture: ComponentFixture<DamageEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamageEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamageEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
