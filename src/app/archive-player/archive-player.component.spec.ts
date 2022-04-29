import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePlayerComponent } from './archive-player.component';

describe('ArchivePlayerComponent', () => {
  let component: ArchivePlayerComponent;
  let fixture: ComponentFixture<ArchivePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivePlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
