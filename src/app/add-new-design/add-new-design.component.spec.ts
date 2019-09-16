import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDesignComponent } from './add-new-design.component';

describe('AddNewDesignComponent', () => {
  let component: AddNewDesignComponent;
  let fixture: ComponentFixture<AddNewDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
