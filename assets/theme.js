/**
 * Softable Theme JavaScript
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    initMobileMenu();
    initQuantitySelectors();
    initProductOptions();
    initProductThumbnails();
    initAddToCart();
    initScrollAnimations();
  }

  /**
   * Mobile Menu Toggle
   */
  function initMobileMenu() {
    const toggle = document.querySelector('.header__mobile-toggle');
    const mobileMenu = document.querySelector('.header__mobile-menu');
    
    if (!toggle || !mobileMenu) return;

    toggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        toggle.classList.remove('active');
      }
    });
  }

  /**
   * Quantity Selectors
   */
  function initQuantitySelectors() {
    const minusButtons = document.querySelectorAll('[data-quantity-minus]');
    const plusButtons = document.querySelectorAll('[data-quantity-plus]');

    minusButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input[type="number"]');
        const currentValue = parseInt(input.value);
        const minValue = parseInt(input.min) || 1;
        
        if (currentValue > minValue) {
          input.value = currentValue - 1;
          input.dispatchEvent(new Event('change'));
        }
      });
    });

    plusButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input[type="number"]');
        const currentValue = parseInt(input.value);
        const maxValue = parseInt(input.max) || 999;
        
        if (currentValue < maxValue) {
          input.value = currentValue + 1;
          input.dispatchEvent(new Event('change'));
        }
      });
    });
  }

  /**
   * Product Option Selection
   */
  function initProductOptions() {
    const optionButtons = document.querySelectorAll('.product-option__value');

    optionButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Remove active class from siblings
        const siblings = this.parentElement.querySelectorAll('.product-option__value');
        siblings.forEach(function(sibling) {
          sibling.classList.remove('active');
        });

        // Add active class to clicked button
        this.classList.add('active');

        // Update variant (you'll need to implement variant logic based on your product structure)
        updateProductVariant();
      });
    });
  }

  /**
   * Product Thumbnail Navigation
   */
  function initProductThumbnails() {
    const thumbnails = document.querySelectorAll('.product-showcase__thumbnail');
    const mainImage = document.querySelector('.product-showcase__main-image img');

    if (!mainImage) return;

    thumbnails.forEach(function(thumbnail, index) {
      thumbnail.addEventListener('click', function() {
        // Remove active class from all thumbnails
        thumbnails.forEach(function(thumb) {
          thumb.classList.remove('active');
        });

        // Add active class to clicked thumbnail
        this.classList.add('active');

        // Update main image
        const newImageSrc = this.querySelector('img').src.replace('150x', '800x');
        mainImage.src = newImageSrc;
      });
    });
  }

  /**
   * Update Product Variant
   */
  function updateProductVariant() {
    // Get all selected options
    const selectedOptions = [];
    const optionContainers = document.querySelectorAll('.product-option');

    optionContainers.forEach(function(container) {
      const activeButton = container.querySelector('.product-option__value.active');
      if (activeButton) {
        selectedOptions.push(activeButton.dataset.optionValue);
      }
    });

    // Find matching variant
    // This is a simplified version - you'll need to implement full variant matching
    console.log('Selected options:', selectedOptions);

    // Update hidden variant ID input
    // const variantId = findVariantId(selectedOptions);
    // document.querySelector('input[name="id"]').value = variantId;
  }

  /**
   * Add to Cart
   */
  function initAddToCart() {
    const forms = document.querySelectorAll('.product-showcase__form');

    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        // Show loading state
        button.textContent = 'Añadiendo...';
        button.disabled = true;

        fetch(window.routes.cart_add_url, {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          // Update cart count
          updateCartCount();

          // Show success message
          button.textContent = '¡Añadido!';
          
          setTimeout(function() {
            button.textContent = originalText;
            button.disabled = false;
          }, 2000);
        })
        .catch(error => {
          console.error('Error:', error);
          button.textContent = 'Error - Inténtalo de nuevo';
          
          setTimeout(function() {
            button.textContent = originalText;
            button.disabled = false;
          }, 2000);
        });
      });
    });
  }

  /**
   * Update Cart Count
   */
  function updateCartCount() {
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        const cartCountElements = document.querySelectorAll('[data-cart-count]');
        cartCountElements.forEach(function(element) {
          element.textContent = cart.item_count;
        });
      })
      .catch(error => console.error('Error updating cart count:', error));
  }

  /**
   * Scroll Animations
   */
  function initScrollAnimations() {
    // Simple fade-in on scroll
    const animatedElements = document.querySelectorAll('[data-aos]');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      animatedElements.forEach(function(element) {
        observer.observe(element);
      });
    } else {
      // Fallback: just add the class immediately
      animatedElements.forEach(function(element) {
        element.classList.add('aos-animate');
      });
    }
  }

  /**
   * Smooth Scroll for Anchor Links
   */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /**
   * Header Scroll Behavior
   */
  let lastScrollTop = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow when scrolled
    if (scrollTop > 10) {
      header.classList.remove('header--transparent');
    } else {
      if (document.body.classList.contains('template-index')) {
        header.classList.add('header--transparent');
      }
    }

    lastScrollTop = scrollTop;
  });

})();
