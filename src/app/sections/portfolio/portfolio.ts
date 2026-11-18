import { Component, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { DigitalFlowComponent } from '../../shared/digital-flow/digital-flow';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  category: string;
  features: string[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ScrollRevealDirective, DigitalFlowComponent],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class PortfolioComponent {
  selectedTag = signal('All');
  selectedProject = signal<Project | null>(null);

  tags = ['All', 'React', 'Angular', 'Node.js', 'Python', 'Flutter', 'AWS'];

  projects: Project[] = [
    {
      title: 'FinTrack Pro',
      description: 'Real-time financial dashboard with live stock tracking and portfolio analytics.',
      image: '',
      tags: ['React', 'Node.js', 'AWS'],
      liveUrl: '#',
      category: 'Web App',
      features: ['Real-time data streaming', 'Interactive charts', 'Portfolio optimization', 'Mobile responsive']
    },
    {
      title: 'HealthConnect',
      description: 'Telemedicine platform connecting patients with healthcare providers.',
      image: '',
      tags: ['Angular', 'Python', 'AWS'],
      liveUrl: '#',
      category: 'Healthcare',
      features: ['Video consultations', 'Appointment scheduling', 'Medical records', 'Payment integration']
    },
    {
      title: 'ShopVerse',
      description: 'Multi-vendor e-commerce marketplace with AI-powered recommendations.',
      image: '',
      tags: ['React', 'Node.js', 'AWS'],
      liveUrl: '#',
      category: 'E-Commerce',
      features: ['AI recommendations', 'Multi-vendor support', 'Inventory management', 'Analytics dashboard']
    },
    {
      title: 'EduPlatform',
      description: 'Online learning management system with interactive courses and certifications.',
      image: '',
      tags: ['Angular', 'Python'],
      liveUrl: '#',
      category: 'EdTech',
      features: ['Video streaming', 'Progress tracking', 'Certification engine', 'Live classrooms']
    },
    {
      title: 'FitLife App',
      description: 'Cross-platform fitness tracking app with personalized workout plans.',
      image: '',
      tags: ['Flutter', 'Node.js'],
      liveUrl: '#',
      category: 'Mobile',
      features: ['Workout tracking', 'Nutrition planning', 'Social features', 'Wearable integration']
    },
    {
      title: 'CloudDeploy',
      description: 'CI/CD automation platform for streamlined deployment workflows.',
      image: '',
      tags: ['Angular', 'Python', 'AWS'],
      liveUrl: '#',
      category: 'DevOps',
      features: ['Pipeline builder', 'Auto-scaling', 'Monitoring', 'Multi-cloud support']
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

  openModal(project: Project): void {
    this.selectedProject.set(project);
  }

  closeModal(): void {
    this.selectedProject.set(null);
  }
}
