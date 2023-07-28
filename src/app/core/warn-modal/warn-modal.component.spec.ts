import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnModalComponent } from './warn-modal.component';

describe('WarnModalComponent', () => {
  let component: WarnModalComponent;
  let fixture: ComponentFixture<WarnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarnModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
