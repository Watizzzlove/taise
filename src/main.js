import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HeroBuildingScene } from './components/heroScene.js';
import { MenuInteractions } from './components/menuInteractions.js';

gsap.registerPlugin(ScrollTrigger);

class TaiseApp {
  constructor() {
    this.isInside = false;
    this.initLenis();
    this.initHeroScene();
    this.initMenuInteractions();
    this.bindEvents();
  }

  initLenis() {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true
    });

    // Sync Lenis with GSAP ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Stop scrolling initially while in the Hero 3D view
    this.lenis.stop();
  }

  initHeroScene() {
    this.heroScene = new HeroBuildingScene('hero-canvas-container');
  }

  initMenuInteractions() {
    this.menu = new MenuInteractions();
  }

  bindEvents() {
    const enterBtn = document.getElementById('btn-enter-trigger');
    const backBtn = document.getElementById('btn-back-street');
    const heroSection = document.getElementById('hero-section');
    const nightExperience = document.getElementById('night-experience');
    const heroContent = document.querySelector('.hero-content-col');
    const bookingForm = document.getElementById('table-booking-form');
    const navBookingBtn = document.getElementById('nav-book-btn');

    // 1. Enter Night Atmosphere
    if (enterBtn) {
      enterBtn.addEventListener('click', () => {
        if (this.isInside) return;
        this.isInside = true;

        // Animate out Hero left content
        gsap.to(heroContent, {
          opacity: 0,
          x: -40,
          duration: 0.6,
          ease: 'power2.in'
        });

        // Trigger 3D camera flight into the entrance
        this.heroScene.flyIntoEntrance(() => {
          // Switch to Night Mode while screen is pure black
          document.body.classList.add('night-mode');
          heroSection.classList.add('departed');
          nightExperience.classList.add('active');

          // Pause 3D render loop to ensure 0% GPU/CPU usage while inside the lounge
          this.heroScene.pause();

          // Unlock smooth scrolling at top of night lounge
          window.scrollTo(0, 0);
          this.lenis.start();
          this.lenis.scrollTo(0, { immediate: true });

          // Smoothly lift the black curtain revealing the night lounge
          const portalFlash = document.getElementById('portal-flash');
          if (portalFlash) {
            gsap.to(portalFlash, {
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out'
            });
          }
        });
      });
    }

    // 2. Return Back to Street
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!this.isInside) return;

        const portalFlash = document.getElementById('portal-flash');
        // Fade to black first
        gsap.to(portalFlash, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            this.lenis.stop();
            document.body.classList.remove('night-mode');
            heroSection.classList.remove('departed');
            nightExperience.classList.remove('active');
            window.scrollTo(0, 0);

            // Resume 3D rendering before starting camera glide back outside
            this.heroScene.resume();

            this.heroScene.flyBackToStreet(() => {
              this.isInside = false;
              gsap.to(heroContent, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: 'power2.out'
              });
            });

            // Fade out black curtain smoothly as camera pulls back out and doors close
            gsap.to(portalFlash, {
              opacity: 0,
              duration: 0.6,
              delay: 0.1,
              ease: 'power2.out'
            });
          }
        });
      });
    }

    // 3. Quick Table Booking Navigation
    if (navBookingBtn) {
      navBookingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!this.isInside && enterBtn) {
          // If user hasn't entered, enter first then scroll to booking
          enterBtn.click();
          gsap.delayedCall(2.8, () => {
            this.lenis.scrollTo('#tattu-reveal-footer', { duration: 1.6 });
          });
        } else {
          this.lenis.scrollTo('#tattu-reveal-footer', { duration: 1.6 });
        }
      });
    }

    // 4. Booking Form Submit
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span class="btn-text">СТОЛ ЗАБРОНИРОВАН ✓</span>';
        submitBtn.style.borderColor = 'var(--neon-amber)';
        submitBtn.style.color = 'var(--neon-amber)';

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          bookingForm.reset();
        }, 4000);
      });
    }
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    window.__taiseApp = new TaiseApp();
  });
} else {
  window.__taiseApp = new TaiseApp();
}
