import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the app name in the toolbar', () => {
    const toolbar = fixture.nativeElement.querySelector('.header-main mat-toolbar');
    expect(toolbar.textContent).toContain('Integra Test App');
  })

  it('should have a menu button', () => {
    const button = fixture.nativeElement.querySelector('.header-main mat-toolbar button');
    expect(button).toBeTruthy();
  })
});
