import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiologConfirmComponent } from './dialog-confirm.component';

describe('DiologConfirmComponent', () => {
  let component: DiologConfirmComponent;
  let fixture: ComponentFixture<DiologConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiologConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiologConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
