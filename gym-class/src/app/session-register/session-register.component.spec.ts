import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionRegisterComponent } from './session-register.component';

describe('SessionRegisterComponent', () => {
  let component: SessionRegisterComponent;
  let fixture: ComponentFixture<SessionRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
