import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientCustomDialogComponent } from './add-client-custom-dialog.component';

describe('AddClientCustomDialogComponent', () => {
  let component: AddClientCustomDialogComponent;
  let fixture: ComponentFixture<AddClientCustomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientCustomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientCustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
