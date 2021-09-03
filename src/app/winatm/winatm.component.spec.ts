import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinatmComponent } from './winatm.component';

describe('WinatmComponent', () => {
  let component: WinatmComponent;
  let fixture: ComponentFixture<WinatmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinatmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinatmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
