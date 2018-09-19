import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceCustomDialogComponent } from './edit-device-custom-dialog.component';

describe('EditDeviceCustomDialogComponent', () => {
  let component: EditDeviceCustomDialogComponent;
  let fixture: ComponentFixture<EditDeviceCustomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeviceCustomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeviceCustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
