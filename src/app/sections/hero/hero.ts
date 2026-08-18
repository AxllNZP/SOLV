import { Component, signal, OnInit, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { DigitalFlowComponent } from '../../shared/digital-flow/digital-flow';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [DigitalFlowComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  phrases = [
    'Digital Experiences',
    'Scalable Solutions',
    'Cloud-Native Apps'
  ];

  currentPhraseIndex = signal(0);
  currentPhrase = signal(this.phrases[0]);
  isDeleting = signal(false);
  displayedText = signal('');
  showScrollIndicator = signal(true);
  private typingInterval: ReturnType<typeof setInterval> | null = null;
  private phraseTimeout: ReturnType<typeof setTimeout> | null = null;
  private lastScrollY = 0;

  @ViewChild('digitalFlow') digitalFlow?: DigitalFlowComponent;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollIndicator.set(window.scrollY < 100);

    const delta = window.scrollY - this.lastScrollY;
    this.lastScrollY = window.scrollY;
    this.digitalFlow?.pulse(delta);
  }

  ngOnInit(): void {
    this.startTyping();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private startTyping(): void {
    let charIndex = 0;
    const phrase = this.phrases[this.currentPhraseIndex()];
    this.currentPhrase.set(phrase);
    this.isDeleting.set(false);

    this.typingInterval = setInterval(() => {
      if (!this.isDeleting()) {
        this.displayedText.set(phrase.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === phrase.length) {
          clearInterval(this.typingInterval!);
          this.typingInterval = null;

          // Pause at end of phrase
          this.phraseTimeout = setTimeout(() => {
            this.isDeleting.set(true);
            this.startDeleting(charIndex);
          }, 2000);
        }
      }
    }, 80);
  }

  private startDeleting(charIndex: number): void {
    this.typingInterval = setInterval(() => {
      if (this.isDeleting()) {
        const phrase = this.currentPhrase();
        this.displayedText.set(phrase.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          clearInterval(this.typingInterval!);
          this.typingInterval = null;
          this.isDeleting.set(false);

          // Move to next phrase
          this.currentPhraseIndex.update(
            i => (i + 1) % this.phrases.length
          );
          this.phraseTimeout = setTimeout(() => {
            this.startTyping();
          }, 500);
        }
      }
    }, 40);
  }

  private cleanup(): void {
    if (this.typingInterval) clearInterval(this.typingInterval);
    if (this.phraseTimeout) clearTimeout(this.phraseTimeout);
  }

  scrollToContact(): void {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToPortfolio(): void {
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  }
}
