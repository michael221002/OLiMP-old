import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitializeComponent } from './initialize.component';

describe('InitializeComponent', () => {
  let component: InitializeComponent;
  let fixture: ComponentFixture<InitializeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitializeComponent]
    });
    fixture = TestBed.createComponent(InitializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
