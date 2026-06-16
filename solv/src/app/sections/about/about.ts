import { Component, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Counter {
  label: string;
  target: number;
  suffix: string;
  current: number;
}

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('aboutSection') aboutSection!: ElementRef<HTMLElement>;
  private observer: IntersectionObserver | null = null;
  private animated = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  counters: Counter[] = [
    { label: 'Projects Completed', target: 150, suffix: '+', current: 0 },
    { label: 'Happy Clients', target: 80, suffix: '+', current: 0 },
    { label: 'Team Members', target: 35, suffix: '+', current: 0 },
    { label: 'Years of Experience', target: 12, suffix: '+', current: 0 },
  ];

  techCategories = [
    {
      name: 'Frontend',
      icons: [
        { name: 'Angular', letter: 'A', color: '#dd0031' },
        { name: 'React', letter: 'R', color: '#61dafb' },
        { name: 'Vue', letter: 'V', color: '#42b883' },
        { name: 'TypeScript', letter: 'TS', color: '#3178c6' },
      ]
    },
    {
      name: 'Backend',
      icons: [
        { name: 'Node.js', letter: 'N', color: '#68a063' },
        { name: 'Python', letter: 'Py', color: '#3776ab' },
        { name: 'Java', letter: 'J', color: '#f89820' },
        { name: 'Go', letter: 'Go', color: '#00add8' },
      ]
    }
  ];

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.animated) {
            this.animated = true;
            this.animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (this.aboutSection) {
      this.observer.observe(this.aboutSection.nativeElement);
    }
  }

  private animateCounters(): void {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      this.counters.forEach(counter => {
        counter.current = Math.floor(counter.target * eased);
      });

      if (step >= steps) {
        clearInterval(timer);
        this.counters.forEach(counter => {
          counter.current = counter.target;
        });
      }
    }, interval);
  }
}
