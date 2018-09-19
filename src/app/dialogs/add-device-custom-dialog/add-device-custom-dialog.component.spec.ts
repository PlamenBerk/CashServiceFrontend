import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceCustomDialogComponent } from './add-device-custom-dialog.component';

describe('AddDeviceCustomDialogComponent', () => {
  let component: AddDeviceCustomDialogComponent;
  let fixture: ComponentFixture<AddDeviceCustomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeviceCustomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceCustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
