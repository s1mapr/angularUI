import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfEditComponent } from './prof-edit.component';

describe('ProfEditComponent', () => {
  let component: ProfEditComponent;
  let fixture: ComponentFixture<ProfEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
