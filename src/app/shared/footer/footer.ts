import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  logoIcon = '</>';
  currentYear = new Date().getFullYear();

  quickLinks = [
    { key: 'nav.home', href: '#hero' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.portfolio', href: '#portfolio' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.contact', href: '#contact' },
  ];

  serviceLinks = [
    'services.items.webDev.title',
    'services.items.mobileApps.title',
    'services.items.cloudSolutions.title',
    'services.items.aiMl.title',
    'services.items.cybersecurity.title',
  ];

  socialLinks = [
    { name: 'GitHub', icon: 'GH', url: '#' },
    { name: 'LinkedIn', icon: 'LI', url: '#' },
    { name: 'Twitter', icon: 'TW', url: '#' },
    { name: 'Dribbble', icon: 'DR', url: '#' },
  ];

  scrollTo(href: string): void {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
