import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePageComponent implements OnInit {
  name = 'STANLEY OTIENO';
  profession = 'Software Developer';

  // Contact form data
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // Form submission state
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  ngOnInit() {
    emailjs.init('-klph3bqufq-O8DOl');
  }

  // EmailJS configuration
  private emailJSConfig = {
    serviceID: 'service_j7bdppv',
    templateID: 'template_c1wjqcw',
    publicKey: '-klph3bqufq-O8DOl'
  };

  // Projects data (your existing projects)
  projects = [
    {
      id: 1,
      title: 'Bank Individual Onboarding',
      image: '/assets/stanbic.jpeg',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'kubernetes'],
      description: 'A bank individual onboarding system that streamlines the customer registration process with identity verification and document management.',
      demoUrl: 'https://mevin.online',
      githubUrl: 'https://github.com/your-username/project1'
    },
    {
      id: 2,
      title: 'Bank Monitoring & alert system',
      image: 'assets/monitoring.png',
      technologies: ['Prometheus', 'Grafana', 'Loki'],
      description: 'A banking monitoring system that tracks application performance, server health, and logs using Prometheus and Grafana.',
      demoUrl: 'https://mevin.online',
      githubUrl: 'https://github.com/starkMrSnow'
    },
    {
      id: 3,
      title: 'Customer Care chat Support System',
      image: 'assets/chat1.png',
      technologies: ['SpringBoot', 'Web scokcets', 'Angular'],
      description: 'Customer care chat support system that enables real-time communication between customers and support agents with chat history and notifications.',
      demoUrl: 'https://mevin.online/chat',
      githubUrl: 'https://github.com/your-username/project3'
    },
    {
      id: 4,
      title: 'Microservices Architecture',
      image: 'assets/background.jpeg',
      technologies: ['Docker', 'Kubernetes', 'Java'],
      description: 'A scalable microservices architecture deployed on Kubernetes with CI/CD pipeline implementation.',
      demoUrl: 'https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHxGpCGjWccldHNwVpLqtcRflsvVLxLvwqnSCjDGVfvSCtvvXjWPMXkPHqvdvbRdfbCBJGV',
      githubUrl: 'https://github.com/your-username/project4'
    },
    {
      id: 5,
      title: 'Vidrotech Company website',
      image: 'assets/background1.jpeg',
      technologies: ['spring boot', 'Angular'],
      description: 'A company website for Vidrotech showcasing their services, portfolio, and contact information with a modern design.',
      demoUrl: 'https://demo-link.com',
      githubUrl: 'https://github.com/your-username/project5'
    },
    {
      id: 6,
      title: 'Maganji',
      image: 'assets/budget.jpeg',
      technologies: ['React', 'Django', 'postgreSQL'],
      description: 'A budget management system that helps users track their expenses, set budgets, and generate financial reports.',
      demoUrl: 'https://demo-link.com',
      githubUrl: 'https://github.com/your-username/project6'
    }
  ];

  // Slider properties
  currentProjectIndex = 0;
  projectsPerView = 3;
  projectWidth = 370;

  get currentDotIndex(): number {
    return Math.floor(this.currentProjectIndex / this.projectsPerView);
  }

  get paginationDots(): number[] {
    const totalDots = Math.ceil(this.projects.length / this.projectsPerView);
    return Array(totalDots).fill(0);
  }

  get maxIndex(): number {
    return Math.max(0, this.projects.length - this.projectsPerView);
  }

  get canGoNext(): boolean {
    return this.currentProjectIndex < this.maxIndex;
  }

  get canGoPrevious(): boolean {
    return this.currentProjectIndex > 0;
  }

  // Navigation methods
  navigateToSection(section: string) {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  learnMore() {
    this.navigateToSection('about');
  }
  
  downloadCV() {
    const cvUrl = 'assets/Stanley-Otieno-CV.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Stanley-Otieno-CV.pdf';
    link.click();
    console.log('CV download initiated.');
  }

  nextProject(): void {
    if (this.canGoNext) {
      this.currentProjectIndex += 1;
    }
  }

  previousProject(): void {
    if (this.canGoPrevious) {
      this.currentProjectIndex -= 1;
    }
  }

  goToProject(index: number): void {
    this.currentProjectIndex = Math.min(index, this.maxIndex);
  }

  viewProject(project: any): void {
    if (project.demoUrl) {
      window.open(project.demoUrl, '_blank');
    } else if (project.githubUrl) {
      window.open(project.githubUrl, '_blank');
    }
  }

  // Contact methods
  sendDirectEmail(): void {
    const email = 'stanleyonyango84@gmail.com';
    const subject = 'Hello Stanley - Portfolio Contact';
    const body = 'Hi Stanley,\n\nI visited your portfolio and would like to get in touch.\n\nBest regards,';
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Try Gmail first, fallback to mailto
    window.open(gmailUrl, '_blank');
    
    // Fallback for non-Gmail users
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1000);
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      this.submitMessage = 'Please fill in all required fields.';
      this.submitSuccess = false;
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';

    // EmailJS send - Fixed parameters
    emailjs.send(
      this.emailJSConfig.serviceID,
      this.emailJSConfig.templateID,
      {
        from_name: this.contactForm.name,
        from_email: this.contactForm.email,
        subject: this.contactForm.subject,
        message: this.contactForm.message,
        to_name: 'Stanley Otieno',
        to_email: 'stanleyonyango84@gmail.com', // Add this line
        reply_to: this.contactForm.email
      },
      this.emailJSConfig.publicKey
    ).then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
      this.submitSuccess = true;
      this.submitMessage = 'Message sent successfully! I\'ll get back to you soon.';
      this.resetForm();
    }).catch((error) => {
      console.error('Failed to send email:', error);
      this.submitSuccess = false;
      this.submitMessage = 'Failed to send message. Please try the direct email option.';
    }).finally(() => {
      this.isSubmitting = false;
      
      // Clear message after 5 seconds
      setTimeout(() => {
        this.submitMessage = '';
      }, 5000);
    });
  }

  private isFormValid(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.subject.trim() &&
      this.contactForm.message.trim()
    );
  }

  private resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}