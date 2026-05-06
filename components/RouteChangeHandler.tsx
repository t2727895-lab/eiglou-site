'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Re-initializes jQuery/vanilla JS plugins after every client-side route change.
 * Next.js does SPA-style navigation — scripts in <Script> tags only run once on
 * first load, so carousels, WOW, GSAP, jarallax, etc. need to be re-triggered
 * whenever the page content changes.
 */
export default function RouteChangeHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to let React finish rendering the new page DOM
    const timer = setTimeout(() => {
      if (typeof window === 'undefined') return;
      const $ = (window as any).$;
      if (!$) return;

      // ── Owl Carousel ──────────────────────────────────────────────
      const carousels: Record<string, object> = {
        '.main-slider__carousel': {
          loop: true, animateOut: 'fadeOut', animateIn: 'fadeIn', margin: 0,
          nav: true, dots: true, smartSpeed: 500, autoplay: true, autoplayTimeout: 7000,
          navText: ['<span class="icon-right-arrow"></span>', '<span class="icon-right-arrow"></span>'],
          responsive: { 0: { items: 1 }, 600: { items: 1 }, 800: { items: 1 }, 992: { items: 1 } },
        },
        '.service-one__carousel': {
          loop: true, margin: 30, nav: false, dots: false, smartSpeed: 500,
          autoplay: true, autoplayTimeout: 7000,
          navText: ['<span class="icon-right-arrow-1"></span>', '<span class="icon-right-arrow-1"></span>'],
          responsive: { 0: { items: 1 }, 768: { items: 2 }, 992: { items: 3 }, 1200: { items: 4 }, 1320: { items: 4 } },
        },
        '.project-one__carousel': {
          loop: true, margin: 30, nav: false, dots: true, smartSpeed: 500,
          autoplay: true, autoplayTimeout: 7000,
          navText: ['<span class="icon-right-up"></span>', '<span class="icon-right-up"></span>'],
          responsive: { 0: { items: 1 }, 768: { items: 1 }, 992: { items: 1 }, 1200: { items: 1 }, 1320: { items: 1 } },
        },
        '.brand-one__carousel': {
          loop: true, margin: 30, nav: false, dots: false, smartSpeed: 500,
          autoplay: true, autoplayTimeout: 7000,
          navText: ['<span class="icon-left-arrow"></span>', '<span class="icon-next"></span>'],
          responsive: { 0: { items: 1 }, 540: { items: 2 }, 768: { items: 2 }, 992: { items: 3 }, 1200: { items: 4 }, 1320: { items: 5 } },
        },
        '.testimonial-one__carousel': {
          loop: true, margin: 30, nav: false, dots: true, smartSpeed: 500,
          autoplay: true, autoplayTimeout: 7000,
          navText: ['<span class="icon-right-up"></span>', '<span class="icon-right-up"></span>'],
          responsive: { 0: { items: 1 }, 768: { items: 2 }, 992: { items: 2 }, 1200: { items: 3 }, 1320: { items: 3 } },
        },
      };

      Object.entries(carousels).forEach(([selector, options]) => {
        const el = $(selector);
        if (!el.length) return;
        // Destroy existing instance before re-init to avoid duplicates
        if (el.hasClass('owl-loaded')) {
          el.owlCarousel('destroy');
        }
        el.owlCarousel(options);
      });

      // ── WOW Animations ────────────────────────────────────────────
      if ($('.wow').length && (window as any).WOW) {
        const wow = new (window as any).WOW({
          boxClass: 'wow',
          animateClass: 'animated',
          mobile: true,
          live: true,
        });
        wow.init();
      }

      // ── AOS ───────────────────────────────────────────────────────
      if ($('[data-aos]').length && (window as any).AOS) {
        (window as any).AOS.init({ duration: 1200, easing: 'ease', mirror: true });
      }

      // ── Jarallax ──────────────────────────────────────────────────
      if ((window as any).jarallax) {
        (window as any).jarallax(document.querySelectorAll('.jarallax'), { speed: 0.2 });
      }

      // ── Marquee / Sliding Text ────────────────────────────────────
      if ($('.marquee_mode-1').length && $.fn.marquee) {
        const $marquee = $('.marquee_mode-1');
        // If the plugin already wrapped the content, destroy it first
        // so we start from clean original HTML before re-initialising
        if ($marquee.find('.js-marquee-wrapper').length) {
          $marquee.marquee('destroy');
        }
        $marquee.marquee({
          speed: 40,
          gap: 20,
          delayBeforeStart: 0,
          direction: 'left',
          duplicated: true,
          pauseOnHover: true,
          startVisible: true,
        });
      }

      // ── Odometer ──────────────────────────────────────────────────
      if ($('.odometer').length) {
        $('.odometer').each(function (this: HTMLElement) {
          $(this).appear(function (this: HTMLElement) {
            const countNumber = $(this).attr('data-count');
            $(this).html(countNumber);
          });
        });
      }

      // ── Counter (count-text with data-stop) ───────────────────────
      if ($('.count-box').length) {
        $('.count-box').each(function (this: HTMLElement) {
          const box = $(this);
          box.appear(function () {
            box.find('.count-text').each(function (this: HTMLElement) {
              const el = $(this);
              if (el.data('counted')) return;
              el.data('counted', true);
              const stop = parseFloat(el.attr('data-stop') || '0');
              const speed = parseInt(el.attr('data-speed') || '1500', 10);
              const isDecimal = String(stop).includes('.');
              $({ countNum: 0 }).animate({ countNum: stop }, {
                duration: speed,
                easing: 'swing',
                step: function (this: { countNum: number }) {
                  el.text(isDecimal ? this.countNum.toFixed(1) : Math.floor(this.countNum));
                },
                complete: function (this: { countNum: number }) {
                  el.text(isDecimal ? stop.toFixed(1) : stop);
                },
              });
            });
          }, { accY: -50 });
        });
      }

      // ── Accordion ─────────────────────────────────────────────────
      if ($('.accrodion-grp').length) {
        $('.accrodion-grp').each(function (this: HTMLElement) {
          const Self = $(this);
          const accrodionName = Self.data('grp-name');
          const accordion = Self.find('.accrodion');

          // Add the group name as a class (original script behaviour)
          Self.addClass(accrodionName);

          // Hide all content, show active
          Self.find('.accrodion .accrodion-content').hide();
          Self.find('.accrodion.active').find('.accrodion-content').show();

          // Remove stale handlers then re-attach
          accordion.each(function (this: HTMLElement) {
            $(this).find('.accrodion-title').off('click.acc').on('click.acc', function (this: HTMLElement) {
              const parent = $(this).parent();
              if (!parent.hasClass('active')) {
                $('.accrodion-grp.' + accrodionName).find('.accrodion').removeClass('active');
                $('.accrodion-grp.' + accrodionName).find('.accrodion').find('.accrodion-content').slideUp();
                parent.addClass('active');
                parent.find('.accrodion-content').slideDown();
              }
            });
          });
        });
      }

      // ── Progress / Count Bars ─────────────────────────────────────
      if ($('.count-bar').length) {
        $('.count-bar').appear(function (this: HTMLElement) {
          const el = $(this);
          const percent = el.data('percent');
          el.css('width', percent).addClass('counted');
        }, { accY: -50 });
      }

      // ── Magnific Popup ────────────────────────────────────────────
      if ($('.video-popup').length) {
        $('.video-popup').magnificPopup({
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: true,
          fixedContentPos: false,
        });
      }

      // ── Sticky header content clone ───────────────────────────────
      if ($('.sticky-header__content').length && $('.main-menu').length) {
        const navContent = document.querySelector('.main-menu')?.innerHTML;
        const stickyContainer = document.querySelector('.sticky-header__content');
        if (navContent && stickyContainer) {
          stickyContainer.innerHTML = navContent;
        }
      }

      // ── Mobile nav content clone ──────────────────────────────────
      if ($('.main-menu__list').length && $('.mobile-nav__container').length) {
        const navContent = document.querySelector('.main-menu__list')?.outerHTML;
        const mobileNavContainer = document.querySelector('.mobile-nav__container');
        if (navContent && mobileNavContainer) {
          mobileNavContainer.innerHTML = navContent;
        }
      }

      // ── GSAP title animations ─────────────────────────────────────
      if ((window as any).gsap && (window as any).ScrollTrigger && (window as any).SplitText) {
        const { gsap, ScrollTrigger, SplitText, Back } = window as any;
        const quotes = document.querySelectorAll('.sec-title-animation .title-animation');
        quotes.forEach((quote: any) => {
          if (quote.animation) {
            quote.animation.progress(1).kill();
            quote.split?.revert();
          }
          const getclass = quote.closest('.sec-title-animation')?.className ?? '';
          const animation = getclass.split('animation-');
          if (animation[1] === 'style4') return;

          quote.split = new SplitText(quote, { type: 'lines,words,chars', linesClass: 'split-line' });
          gsap.set(quote, { perspective: 400 });

          if (animation[1] === 'style1') gsap.set(quote.split.chars, { opacity: 0, y: '90%', rotateX: '-40deg' });
          if (animation[1] === 'style2') gsap.set(quote.split.chars, { opacity: 0, x: '50' });
          if (animation[1] === 'style3') gsap.set(quote.split.chars, { opacity: 0 });

          quote.animation = gsap.to(quote.split.chars, {
            scrollTrigger: { trigger: quote, start: 'top 90%' },
            x: '0', y: '0', rotateX: '0', opacity: 1,
            duration: 1, ease: Back.easeOut, stagger: 0.02,
          });
        });
        ScrollTrigger.refresh();
      }

    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
