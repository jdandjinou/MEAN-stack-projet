import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostEditComponent } from './blogpost-edit.component';

describe('BlogpostEditComponent', () => {
  let component: BlogpostEditComponent;
  let fixture: ComponentFixture<BlogpostEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogpostEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
