import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloPropioComponent } from './articulo-propio.component';

describe('ArticuloPropioComponent', () => {
  let component: ArticuloPropioComponent;
  let fixture: ComponentFixture<ArticuloPropioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloPropioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloPropioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
