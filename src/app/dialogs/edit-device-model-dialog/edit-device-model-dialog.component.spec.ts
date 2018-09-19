import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceModelDialogComponent } from './edit-device-model-dialog.component';

describe('EditDeviceModelDialogComponent', () => {
  let component: EditDeviceModelDialogComponent;
  let fixture: ComponentFixture<EditDeviceModelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeviceModelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeviceModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
