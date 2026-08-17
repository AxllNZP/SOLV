import { Component } from '@angular/core';
import { NavbarComponent } from './core/navbar/navbar';
import { HeroComponent } from './sections/hero/hero';
import { ServicesComponent } from './sections/services/services';
import { PortfolioComponent } from './sections/portfolio/portfolio';
import { AboutComponent } from './sections/about/about';
import { TechStackComponent } from './sections/tech-stack/tech-stack';
import { TestimonialsComponent } from './sections/testimonials/testimonials';
import { ContactComponent } from './sections/contact/contact';
import { FooterComponent } from './shared/footer/footer';
import { DigitalFlowComponent } from "./shared/digital-flow/digital-flow";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    PortfolioComponent,
    AboutComponent,
    TechStackComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
    DigitalFlowComponent
],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
