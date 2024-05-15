import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-commerce';
  showUpButton: boolean = false;
  toggle(sidenav:any){
    sidenav.toggle();
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showUpButton = (window.pageYOffset > 0);
  }
}

