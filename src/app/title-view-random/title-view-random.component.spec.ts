import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleViewRandomComponent } from './title-view-random.component';

describe('TitleViewRandomComponent', () => {
  let component: TitleViewRandomComponent;
  let fixture: ComponentFixture<TitleViewRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleViewRandomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleViewRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
