import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSiteCustomDialogComponent } from './edit-site-custom-dialog.component';

describe('EditSiteCustomDialogComponent', () => {
  let component: EditSiteCustomDialogComponent;
  let fixture: ComponentFixture<EditSiteCustomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSiteCustomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSiteCustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
