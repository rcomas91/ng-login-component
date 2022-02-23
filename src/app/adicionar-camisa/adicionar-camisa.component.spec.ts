import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarCamisaComponent } from './adicionar-camisa.component';

describe('AdicionarCamisaComponent', () => {
  let component: AdicionarCamisaComponent;
  let fixture: ComponentFixture<AdicionarCamisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarCamisaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarCamisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
