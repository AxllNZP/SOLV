import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  logoIcon = '</>';
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  serviceLinks = [
    'Web Development',
    'Mobile Apps',
    'Cloud Solutions',
    'AI & Machine Learning',
    'Cybersecurity',
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
