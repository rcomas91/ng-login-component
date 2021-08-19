import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PozoComponent } from './pozo.component';

describe('PozoComponent', () => {
  let component: PozoComponent;
  let fixture: ComponentFixture<PozoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PozoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PozoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
