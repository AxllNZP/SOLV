import { Component, signal, OnDestroy, OnInit } from '@angular/core';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  currentIndex = signal(0);
  isPaused = signal(false);
  private autoplayInterval: ReturnType<typeof setInterval> | null = null;

  testimonials: Testimonial[] = [
    {
      name: 'Sarah Chen',
      role: 'CTO',
      company: 'Finova Capital',
      quote: 'Solv transformed our legacy banking platform into a modern microservices architecture. Their team delivered 3 weeks ahead of schedule and the performance improvements were staggering.',
      avatar: 'SC',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Founder & CEO',
      company: 'MediConnect',
      quote: 'Working with Solv was a game-changer. They built our telemedicine platform from scratch, and it now serves over 100,000 patients monthly. Exceptional quality and communication.',
      avatar: 'MR',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'VP of Engineering',
      company: 'RetailPro',
      quote: 'The e-commerce solution Solv delivered handles our Black Friday traffic without breaking a sweat. Their scalable architecture saved us from hiring an entire DevOps team.',
      avatar: 'EW',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'Product Director',
      company: 'EduSphere',
      quote: 'Solv didn\'t just build an app — they understood our vision for accessible education. The platform they created increased student engagement by 400% in the first quarter.',
      avatar: 'DK',
      rating: 5
    },
    {
      name: 'Lisa Andersen',
      role: 'CTO',
      company: 'LogiTrack',
      quote: 'From IoT integration to real-time dashboards, Solv handled our complex logistics requirements with expertise. They\'re now our go-to technology partner.',
      avatar: 'LA',
      rating: 5
    }
  ];

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused()) {
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
