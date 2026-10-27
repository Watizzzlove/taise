import gsap from 'gsap';

export class MenuInteractions {
  constructor() {
    this.initCardTilt();
    this.initSubZeroTabs();
    this.initDishHoverPreview();
  }

  /**
   * 3D Perspective Tilt on the Menu Mockup Cards
   */
  initCardTilt() {
    const cards = document.querySelectorAll('.mockup-card');

    cards.forEach((card) => {
      const stage = card.querySelector('.mockup-stage');
      const glow = card.querySelector('.mockup-ambient-glow');
      if (!stage) return;

      card.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 12;

        gsap.to(stage, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 1000
        });

        if (glow) {
          gsap.to(glow, {
            x: ((x - centerX) / centerX) * 25,
            y: ((y - centerY) / centerY) * 25,
            scale: 1.1,
            opacity: 0.65,
            duration: 0.4
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(stage, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: 'power3.out'
        });

        if (glow) {
          gsap.to(glow, {
            x: 0,
            y: 0,
            scale: 1.0,
            opacity: 0.45,
            duration: 0.7
          });
        }
      });
    });
  }

  /**
   * Sub Zero Distressed Tab Filter [ ЕДА | АЛКО | СПЕШЛЫ ]
   */
  initSubZeroTabs() {
    const tabs = document.querySelectorAll('.subzero-tab');
    const rows = document.querySelectorAll('.menu-row');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-filter');

        rows.forEach((row) => {
          const rowCategory = row.getAttribute('data-category');
          if (category === 'all' || rowCategory === category) {
            gsap.to(row, {
              opacity: 1,
              height: 'auto',
              paddingTop: '24px',
              paddingBottom: '24px',
              duration: 0.4,
              display: 'grid',
              ease: 'power2.out'
            });
          } else {
            gsap.to(row, {
              opacity: 0,
              height: 0,
              paddingTop: 0,
              paddingBottom: 0,
              duration: 0.3,
              display: 'none',
              ease: 'power2.in'
            });
          }
        });
      });
    });
  }

  /**
   * Floating Dish Preview on Row Hover
   */
  initDishHoverPreview() {
    const preview = document.getElementById('dish-preview-tooltip');
    const previewImg = preview ? preview.querySelector('img') : null;
    const rows = document.querySelectorAll('.menu-row');

    if (!preview || !previewImg) return;

    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        const imgSrc = row.getAttribute('data-image');
        if (imgSrc) {
          previewImg.src = imgSrc;
          preview.classList.add('visible');
        }
      });

      row.addEventListener('mousemove', (e) => {
        gsap.to(preview, {
          left: e.clientX + 30,
          top: e.clientY - 40,
          duration: 0.15,
          ease: 'power1.out'
        });
      });

      row.addEventListener('mouseleave', () => {
        preview.classList.remove('visible');
      });
    });
  }
}
