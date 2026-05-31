import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('Asilbek Hotel');
  protected readonly menuOpen = signal(false);

  protected toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  protected closeMenu() {
    this.menuOpen.set(false);
  }
}
