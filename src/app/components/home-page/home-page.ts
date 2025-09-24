import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePageComponent {
  name = 'STANLEY OTIENO';
  profession = 'Software Developer';

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
    // Implement the logic to download your CV here.
    const cvUrl = 'assets/cv.pdf'; // Make sure this file exists in your assets folder
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Stanley-Otieno-CV.pdf';
    link.click();
    console.log('CV download initiated.');
  }
}