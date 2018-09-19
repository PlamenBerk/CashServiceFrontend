import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSiteCustomDialogComponent } from './add-site-custom-dialog.component';

describe('AddSiteCustomDialogComponent', () => {
  let component: AddSiteCustomDialogComponent;
  let fixture: ComponentFixture<AddSiteCustomDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSiteCustomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSiteCustomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
