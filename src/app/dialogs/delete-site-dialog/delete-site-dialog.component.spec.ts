import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSiteDialogComponent } from './delete-site-dialog.component';

describe('DeleteSiteDialogComponent', () => {
  let component: DeleteSiteDialogComponent;
  let fixture: ComponentFixture<DeleteSiteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSiteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
