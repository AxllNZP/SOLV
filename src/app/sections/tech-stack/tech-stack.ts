import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface TechItem {
  name: string;
  letter: string;
  color: string;
}

interface TechGroup {
  category: string;
  items: TechItem[];
}

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.scss',
})
export class TechStackComponent {
  groups: TechGroup[] = [
    {
      category: 'Frontend',
      items: [
        { name: 'Angular', letter: 'A', color: '#dd0031' },
        { name: 'React', letter: 'R', color: '#61dafb' },
        { name: 'Vue.js', letter: 'V', color: '#42b883' },
        { name: 'Next.js', letter: 'Nx', color: '#ffffff' },
        { name: 'TypeScript', letter: 'TS', color: '#3178c6' },
        { name: 'Tailwind', letter: 'Tw', color: '#06b6d4' },
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', letter: 'N', color: '#68a063' },
        { name: 'Python', letter: 'Py', color: '#3776ab' },
        { name: 'Java', letter: 'J', color: '#f89820' },
        { name: 'Go', letter: 'Go', color: '#00add8' },
        { name: 'Rust', letter: 'Rs', color: '#dea584' },
        { name: 'GraphQL', letter: 'GQ', color: '#e10098' },
      ]
    },
    {
      category: 'Database',
      items: [
        { name: 'PostgreSQL', letter: 'Pg', color: '#336791' },
        { name: 'MongoDB', letter: 'M', color: '#47a248' },
        { name: 'Redis', letter: 'Rd', color: '#dc382d' },
        { name: 'MySQL', letter: 'My', color: '#4479a1' },
        { name: 'DynamoDB', letter: 'Dy', color: '#4053d6' },
      ]
    },
    {
      category: 'DevOps',
      items: [
        { name: 'AWS', letter: 'AW', color: '#ff9900' },
        { name: 'Docker', letter: 'Dk', color: '#2496ed' },
        { name: 'Kubernetes', letter: 'K8', color: '#326ce5' },
        { name: 'Terraform', letter: 'Tf', color: '#7b42bc' },
        { name: 'GitHub Actions', letter: 'GH', color: '#2088ff' },
      ]
    }
  ];
}
