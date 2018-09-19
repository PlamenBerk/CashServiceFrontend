import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceModelDialogComponent } from './add-device-model-dialog.component';

describe('AddDeviceModelDialogComponent', () => {
  let component: AddDeviceModelDialogComponent;
  let fixture: ComponentFixture<AddDeviceModelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeviceModelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
