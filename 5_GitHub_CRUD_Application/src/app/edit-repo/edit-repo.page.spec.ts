import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRepoPage } from './edit-repo.page';

describe('EditRepoPage', () => {
  let component: EditRepoPage;
  let fixture: ComponentFixture<EditRepoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditRepoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
