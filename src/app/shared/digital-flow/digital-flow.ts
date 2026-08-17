import {
  Component, ElementRef, ViewChild, Input, AfterViewInit, OnDestroy,
  Inject, PLATFORM_ID, ChangeDetectionStrategy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface FlowParticle {
  text: string;
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  blur: number;
  color: string;
}

interface LayerConfig {
  speed: number;
  size: number;
  opacity: number;
  blur: number;
}

const CONTENT_POOL: string[] = [
  'const solution = await solv.create();',
  '@Service',
  'SELECT * FROM solutions;',
  'class SolvService {}',
  'export default solve;',
  'async function process()',
  'BUILD', 'SOLVE', 'SECURE', 'INNOVATE',
  'SYSTEM_01', 'SECURITY_02', 'DIGITAL_03', 'NODE_07',
  '{ status: "ok" }',
  'return response;',
];

const DENSITY_MAP: Record<string, number[]> = {
  low: [8, 6, 5],
  medium: [12, 10, 8],
  high: [16, 14, 12],
};

const LAYER_CONFIG: LayerConfig[] = [
  { speed: 0.12, size: 11, opacity: 0.08, blur: 2.5 },
  { speed: 0.22, size: 13, opacity: 0.14, blur: 1 },
  { speed: 0.34, size: 15, opacity: 0.22, blur: 0 },
];

@Component({
  selector: 'app-digital-flow',
  standalone: true,
  templateUrl: './digital-flow.html',
  styleUrl: './digital-flow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DigitalFlowComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('host', { static: true }) hostRef!: ElementRef<HTMLElement>;

  @Input() density: 'low' | 'medium' | 'high' = 'low';
  @Input() speed = 1;

  private ctx: CanvasRenderingContext2D | null = null;
  private particles: FlowParticle[] = [];
  private rafId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private visibilityObserver: IntersectionObserver | null = null;
  private isVisible = true;
  private width = 0;
  private height = 0;
  private dpr = 1;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    this.resize();
    this.initParticles();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.hostRef.nativeElement);

    this.visibilityObserver = new IntersectionObserver(
      (entries) => { this.isVisible = entries[0]?.isIntersecting ?? true; },
      { threshold: 0 },
    );
    this.visibilityObserver.observe(this.hostRef.nativeElement);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      this.drawStatic();
    } else {
      this.loop();
    }
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    this.resizeObserver?.disconnect();
    this.visibilityObserver?.disconnect();
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const host = this.hostRef.nativeElement;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = host.clientWidth;
    this.height = host.clientHeight;
    canvas.width = this.width * this.dpr;
    canvas.height = this.height * this.dpr;
    this.ctx?.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private initParticles(): void {
    this.particles = [];
    const counts = DENSITY_MAP[this.density];
    counts.forEach((count, layer) => {
      for (let i = 0; i < count; i++) {
        this.particles.push(this.makeParticle(LAYER_CONFIG[layer]));
      }
    });
  }

  private makeParticle(config: LayerConfig): FlowParticle {
    return {
      text: CONTENT_POOL[Math.floor(Math.random() * CONTENT_POOL.length)],
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      speed: config.speed * this.speed * (0.7 + Math.random() * 0.6),
      size: config.size,
      opacity: config.opacity * (0.7 + Math.random() * 0.6),
      blur: config.blur,
      color: Math.random() > 0.5 ? '108, 92, 231' : '0, 206, 201',
    };
  }

  private drawParticle(p: FlowParticle): void {
    if (!this.ctx) return;
    this.ctx.save();
    this.ctx.filter = p.blur > 0 ? `blur(${p.blur}px)` : 'none';
    this.ctx.font = `${p.size}px 'JetBrains Mono', monospace`;
    this.ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
    this.ctx.fillText(p.text, p.x, p.y);
    this.ctx.restore();
  }

  private drawStatic(): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.particles) this.drawParticle(p);
  }

  private loop = (): void => {
    if (this.ctx && this.isVisible) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      for (const p of this.particles) {
        p.y -= p.speed;
        if (p.y < -20) {
          p.y = this.height + 20;
          p.x = Math.random() * this.width;
          p.text = CONTENT_POOL[Math.floor(Math.random() * CONTENT_POOL.length)];
        }
        this.drawParticle(p);
      }
    }
    this.rafId = requestAnimationFrame(this.loop);
  };
}
