import { Component, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contactForm') contactForm!: ElementRef<HTMLElement>;
  private observer: IntersectionObserver | null = null;
  isVisible = signal(false);
  isSubmitted = signal(false);
  isSubmitting = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  projectTypes = [
    'Web Application',
    'Mobile App',
    'E-Commerce Platform',
    'Cloud Infrastructure',
    'AI / Machine Learning',
    'Custom Software',
    'UI/UX Design',
    'Other'
  ];

  formData = {
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  };

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
          if (entry.isIntersecting) {
            this.isVisible.set(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (this.contactForm) {
      this.observer.observe(this.contactForm.nativeElement);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.isSubmitting.set(true);

    // Simulate form submission
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);

      // Reset form after animation
      setTimeout(() => {
        this.resetForm();
      }, 3000);
    }, 1500);
  }

  resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      company: '',
      projectType: '',
      budget: '',
      message: ''
    };
    this.isSubmitted.set(false);
  }
}
