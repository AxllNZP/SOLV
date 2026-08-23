import { Component, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

interface Service {
  key: string;
  icon: string;
  color: string;
  detailCount: number;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ScrollRevealDirective, TranslatePipe],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesComponent {
  flippedCard = signal<number | null>(null);

  services: Service[] = [
    { key: 'webDev', icon: '🌐', color: '#6c5ce7', detailCount: 4 },
    { key: 'mobileApps', icon: '📱', color: '#00cec9', detailCount: 4 },
    { key: 'cloudSolutions', icon: '☁️', color: '#fd79a8', detailCount: 4 },
    { key: 'aiMl', icon: '🤖', color: '#55efc4', detailCount: 4 },
    { key: 'cybersecurity', icon: '🔒', color: '#a29bfe', detailCount: 4 },
    { key: 'dataEngineering', icon: '📊', color: '#ffeaa7', detailCount: 4 },
  ];

  detailIndexes(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  toggleFlip(index: number): void {
    this.flippedCard.update(current => current === index ? null : index);
  }
}
