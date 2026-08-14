import { Component, signal } from '@angular/core';

interface Service {
  icon: string;
  title: string;
  description: string;
  details: string[];
  color: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesComponent {
  flippedCard = signal<number | null>(null);

  services: Service[] = [
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks for performance and scalability.',
      details: ['React / Angular / Vue', 'Progressive Web Apps', 'E-Commerce Platforms', 'CMS Solutions'],
      color: '#6c5ce7'
    },
    {
      icon: '📱',
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile experiences that delight users.',
      details: ['React Native / Flutter', 'iOS & Android Native', 'UI/UX Design', 'App Store Optimization'],
      color: '#00cec9'
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration strategies for modern businesses.',
      details: ['AWS / Azure / GCP', 'Microservices Architecture', 'Serverless Computing', 'Cloud Migration'],
      color: '#fd79a8'
    },
    {
      icon: '🤖',
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by data and cutting-edge ML models.',
      details: ['Predictive Analytics', 'NLP & Chatbots', 'Computer Vision', 'Recommendation Engines'],
      color: '#55efc4'
    },
    {
      icon: '🔒',
      title: 'Cybersecurity',
      description: 'Protect your digital assets with enterprise-grade security solutions.',
      details: ['Security Audits', 'Penetration Testing', 'SOC Implementation', 'Compliance (GDPR, HIPAA)'],
      color: '#a29bfe'
    },
    {
      icon: '📊',
      title: 'Data Engineering',
      description: 'Robust data pipelines and analytics platforms for data-driven decisions.',
      details: ['ETL Pipelines', 'Data Warehousing', 'Real-time Analytics', 'Business Intelligence'],
      color: '#ffeaa7'
    }
  ];

  toggleFlip(index: number): void {
    this.flippedCard.update(current => current === index ? null : index);
  }
}
