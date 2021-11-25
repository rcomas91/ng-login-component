import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosFormComponent } from './servicios-form.component';

describe('ServiciosFormComponent', () => {
  let component: ServiciosFormComponent;
  let fixture: ComponentFixture<ServiciosFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
