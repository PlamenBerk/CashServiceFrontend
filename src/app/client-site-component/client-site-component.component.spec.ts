import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSiteComponentComponent } from './client-site-component.component';

describe('ClientSiteComponentComponent', () => {
  let component: ClientSiteComponentComponent;
  let fixture: ComponentFixture<ClientSiteComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSiteComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSiteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
