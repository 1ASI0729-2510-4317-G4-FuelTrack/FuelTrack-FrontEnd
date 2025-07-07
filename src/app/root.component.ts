import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core"
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="lang-switcher">
      <label for="lang">🌐</label>
      <select id="lang" (change)="changeLang($event)">
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>

    <router-outlet></router-outlet>
  `,
  styles: [`
    .lang-switcher {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 1000;
    }
    select {
      padding: 4px;
      border-radius: 6px;
    }
  `]
})
export class RootComponent {
  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('lang') || 'es';
    translate.addLangs(['es', 'en']);
    translate.setDefaultLang('es');
    translate.use(lang);
  }

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

}

