import { Component, inject, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';

interface Project {
  key: string;
  image: string;
  tags: string[];
  liveUrl: string;
  categoryKey: string;
  featureCount: number;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ScrollRevealDirective, TranslatePipe],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class PortfolioComponent {
  private i18n = inject(TranslationService);

  selectedTag = signal('All');
  selectedProject = signal<Project | null>(null);

  tags = ['All', 'React', 'Angular', 'Node.js', 'Python', 'Flutter', 'AWS'];

  projects: Project[] = [
    {
      key: 'fintrack',
      image: '',
      tags: ['React', 'Node.js', 'AWS'],
      liveUrl: '#',
      categoryKey: 'webApp',
      featureCount: 4
    },
    {
      key: 'healthconnect',
      image: '',
      tags: ['Angular', 'Python', 'AWS'],
      liveUrl: '#',
      categoryKey: 'healthcare',
      featureCount: 4
    },
    {
      key: 'shopverse',
      image: '',
      tags: ['React', 'Node.js', 'AWS'],
      liveUrl: '#',
      categoryKey: 'ecommerce',
      featureCount: 4
    },
    {
      key: 'eduplatform',
      image: '',
      tags: ['Angular', 'Python'],
      liveUrl: '#',
      categoryKey: 'edtech',
      featureCount: 4
    },
    {
      key: 'fitlife',
      image: '',
      tags: ['Flutter', 'Node.js'],
      liveUrl: '#',
      categoryKey: 'mobile',
      featureCount: 4
    },
    {
      key: 'clouddeploy',
      image: '',
      tags: ['Angular', 'Python', 'AWS'],
      liveUrl: '#',
      categoryKey: 'devops',
      featureCount: 4
    }
  ];

  get filteredProjects(): Project[] {
    const tag = this.selectedTag();
    if (tag === 'All') return this.projects;
    return this.projects.filter(p => p.tags.includes(tag));
  }

  filterByTag(tag: string): void {
    this.selectedTag.set(tag);
  }

  featureIndexes(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  translatedTag(tag: string): string {
    return tag === 'All' ? this.i18n.t('portfolio.filterAll') : tag;
  }

  openModal(project: Project): void {
    this.selectedProject.set(project);
  }

  closeModal(): void {
    this.selectedProject.set(null);
  }
}
