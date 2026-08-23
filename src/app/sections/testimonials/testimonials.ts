import { Component, signal, OnDestroy, OnInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

interface Testimonial {
  key: string;
  name: string;
  company: string;
  avatar: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  @ViewChild('testimonialsSection') testimonialsSection!: ElementRef<HTMLElement>;

  currentIndex = signal(0);
  isPaused = signal(false);
  private autoplayInterval: ReturnType<typeof setInterval> | null = null;
  private visibilityObserver: IntersectionObserver | null = null;
  private isInViewport = true;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  testimonials: Testimonial[] = [
    { key: 'sarah', name: 'Sarah Chen', company: 'Finova Capital', avatar: 'SC', rating: 5 },
    { key: 'marcus', name: 'Marcus Rodriguez', company: 'MediConnect', avatar: 'MR', rating: 5 },
    { key: 'emily', name: 'Emily Watson', company: 'RetailPro', avatar: 'EW', rating: 5 },
    { key: 'david', name: 'David Kim', company: 'EduSphere', avatar: 'DK', rating: 5 },
    { key: 'lisa', name: 'Lisa Andersen', company: 'LogiTrack', avatar: 'LA', rating: 5 },
  ];

  ngOnInit(): void {
    this.startAutoplay();
    this.setupVisibilityObserver();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    this.visibilityObserver?.disconnect();
  }

  private setupVisibilityObserver(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.visibilityObserver = new IntersectionObserver(
      (entries) => { this.isInViewport = entries[0]?.isIntersecting ?? true; },
      { threshold: 0 },
    );
    if (this.testimonialsSection) {
      this.visibilityObserver.observe(this.testimonialsSection.nativeElement);
    }
  }

  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused() && this.isInViewport) {
        this.next();
      }
    }, 5000);
  }

  stopAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  next(): void {
    this.currentIndex.update(i => (i + 1) % this.testimonials.length);
  }

  prev(): void {
    this.currentIndex.update(i =>
      i === 0 ? this.testimonials.length - 1 : i - 1
    );
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
  }

  pause(): void {
    this.isPaused.set(true);
  }

  resume(): void {
    this.isPaused.set(false);
  }
}
