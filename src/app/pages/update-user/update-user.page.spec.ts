import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateUserPage } from './update-user.page';

describe('UpdateUserPage', () => {
  let component: UpdateUserPage;
  let fixture: ComponentFixture<UpdateUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUserPage ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule, 
        RouterTestingModule,
        ReactiveFormsModule, 
        FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
