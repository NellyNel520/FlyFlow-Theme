/**
 * FlyFlow Theme - Core JavaScript
 * Purpose: Main theme functionality including cart, navigation, search,
 *          product gallery, filtering, lazy loading, and UI interactions.
 * Dependencies: None (vanilla JS)
 * Last modified: 2026-02-17
 *
 * Modules:
 * - FlyFlow.Cart: Ajax cart operations
 * - FlyFlow.Navigation: Header, mobile menu, bottom nav
 * - FlyFlow.Search: Predictive search
 * - FlyFlow.ProductGallery: Image gallery with zoom and swipe
 * - FlyFlow.VariantSelector: Product variant management
 * - FlyFlow.Filters: Collection filtering
 * - FlyFlow.LazyLoad: Intersection Observer lazy loading
 * - FlyFlow.Modal: Modal and drawer management
 * - FlyFlow.Accordion: Accordion component
 * - FlyFlow.StickyATC: Sticky add to cart
 * - FlyFlow.Analytics: Event tracking
 */

'use strict';

/** @namespace FlyFlow */
window.FlyFlow = window.FlyFlow || {};

/* ==========================================================================
   Utility Functions
   ========================================================================== */

/**
 * Debounce function calls
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
FlyFlow.debounce = function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

/**
 * Fetch wrapper for Shopify AJAX API
 * @param {string} endpoint - API endpoint path
 * @param {Object} [body] - Request body for POST requests
 * @returns {Promise<Object>} Parsed JSON response
 * @throws {Error} On non-OK response
 */
FlyFlow.fetchAPI = async function fetchAPI(endpoint, body = null) {
  const options = {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, options);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.description || `Request failed: ${response.status}`);
  }
  return response.json();
};

/**
 * Format money value using Shopify's money format
 * @param {number} cents - Amount in cents
 * @returns {string} Formatted price string
 */
FlyFlow.formatMoney = function formatMoney(cents) {
  const amount = (cents / 100).toFixed(2);
  return `$${amount}`;
};

/**
 * Announce message to screen readers via ARIA live region
 * @param {string} message - Message to announce
 */
FlyFlow.announce = function announce(message) {
  const region = document.getElementById('sr-live-region');
  if (region) {
    region.textContent = message;
    setTimeout(() => {
      region.textContent = '';
    }, 3000);
  }
};

/**
 * Trap focus within an element (for modals/drawers)
 * @param {HTMLElement} element - Container to trap focus within
 * @returns {Function} Cleanup function to remove trap
 */
FlyFlow.trapFocus = function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function handler(e) {
    if (e.key !== 'Tab') {
      return;
    }
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  element.addEventListener('keydown', handler);
  if (first) {
    first.focus();
  }

  return function removeTrap() {
    element.removeEventListener('keydown', handler);
  };
};

/* ==========================================================================
   Cart Module
   ========================================================================== */

FlyFlow.Cart = (function () {
  let cartDrawer;
  let cartCountElements;
  let cartSubtotalElement;
  let overlay;
  let removeFocusTrap;
  const pendingLineKeys = new Set();
  let noteSaveTimer = null;

  /**
   * Initialize cart module
   */
  function init() {
    cartDrawer = document.querySelector('[data-cart-drawer]');
    cacheElements();
    overlay = document.querySelector('[data-overlay]');

    document.addEventListener('click', handleClick);
    document.addEventListener('change', handleChange);
    document.addEventListener('input', handleInput);
    if (overlay) {
      overlay.addEventListener('click', close);
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        close();
      }
    });
  }

  /**
   * Cache frequently accessed cart UI elements.
   */
  function cacheElements() {
    cartCountElements = document.querySelectorAll('[data-cart-count]');
    cartSubtotalElement = document.querySelector('[data-cart-subtotal]');
  }

  /**
   * Handle click events via delegation
   * @param {Event} e - Click event
   */
  function handleClick(e) {
    const target = e.target.closest('[data-cart-toggle]');
    if (target) {
      e.preventDefault();
      toggle();
      return;
    }

    const addBtn = e.target.closest('[data-add-to-cart]');
    if (addBtn) {
      e.preventDefault();
      handleAddToCart(addBtn);
      return;
    }

    const removeBtn = e.target.closest('[data-cart-remove]');
    if (removeBtn) {
      e.preventDefault();
      const key = removeBtn.dataset.cartRemove;
      if (pendingLineKeys.has(key)) {
        return;
      }
      updateItem(key, 0);
      return;
    }

    const qtyBtn = e.target.closest('[data-cart-qty]');
    if (qtyBtn) {
      e.preventDefault();
      handleQuantityChange(qtyBtn);
    }
  }

  /**
   * Handle change events via delegation
   * @param {Event} e - Change event
   */
  function handleChange(e) {
    const input = e.target.closest('[data-cart-qty-input]');
    if (!input) {
      return;
    }

    const key = getLineKeyFromElement(input);
    if (!key || pendingLineKeys.has(key)) {
      return;
    }

    const quantity = Math.max(0, parseInt(input.value, 10) || 0);
    input.value = quantity;
    updateItem(key, quantity);
  }

  /**
   * Handle input events for cart note autosave in drawer
   * @param {Event} e - Input event
   */
  function handleInput(e) {
    const noteField = e.target.closest('[data-cart-note-drawer]');
    if (!noteField || !noteField.closest('[data-cart-drawer]')) {
      return;
    }

    if (noteSaveTimer) {
      window.clearTimeout(noteSaveTimer);
    }

    noteSaveTimer = window.setTimeout(function () {
      FlyFlow.fetchAPI('/cart/update.js', { note: noteField.value }).catch(function () {
        // Silent failure to avoid disrupting checkout flow
      });
    }, 500);
  }

  /**
   * Handle add to cart button click
   * @param {HTMLElement} btn - Add to cart button
   */
  async function handleAddToCart(btn) {
    const form = btn.closest('form');
    let variantId;
    let quantity = 1;

    if (form) {
      const idInput = form.querySelector('[name="id"]');
      const qtyInput = form.querySelector('[name="quantity"]');
      variantId = idInput ? idInput.value : btn.dataset.variantId;
      quantity = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
    } else {
      variantId = btn.dataset.variantId;
      /* Check for quick-view quantity input */
      const qvQty = document.querySelector('[data-quick-view-qty]');
      if (qvQty && btn.closest('#quick-view-modal')) {
        quantity = parseInt(qvQty.value, 10) || 1;
      }
    }

    if (!variantId) {
      return;
    }

    const parsedVariantId = parseInt(variantId, 10);
    if (!Number.isFinite(parsedVariantId) || parsedVariantId <= 0) {
      return;
    }

    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Adding...';

    try {
      await FlyFlow.fetchAPI('/cart/add.js', {
        items: [{ id: parsedVariantId, quantity: Math.max(1, quantity) }],
      });

      await refreshCart();
      open();
      FlyFlow.announce('Item added to bag');

      btn.textContent = 'Added!';
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = btn.dataset.addText || originalText;
      }, 1500);
    } catch {
      btn.disabled = false;
      btn.textContent = btn.dataset.addText || originalText;

      redirectToCartPermalink(parsedVariantId, quantity);
    }
  }

  /**
   * Fallback to Shopify cart permalink add flow.
   * Uses absolute myshopify domain when available to avoid local dev host quirks.
   * @param {number} variantId - Variant ID
   * @param {number} quantity - Quantity
   */
  function redirectToCartPermalink(variantId, quantity) {
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const shopDomain =
      window.Shopify && window.Shopify.shop ? `https://${window.Shopify.shop}` : '';
    window.location.href = `${shopDomain}/cart/${variantId}:${qty}`;
  }

  /**
   * Handle quantity increment/decrement
   * @param {HTMLElement} btn - Quantity button
   */
  function handleQuantityChange(btn) {
    const key = btn.dataset.lineKey;
    if (!key || pendingLineKeys.has(key)) {
      return;
    }
    const direction = btn.dataset.cartQty;
    const input = btn.parentElement.querySelector('[data-cart-qty-input]');
    let qty = parseInt(input.value, 10);

    qty = direction === 'plus' ? qty + 1 : Math.max(0, qty - 1);
    input.value = qty;
    updateItem(key, qty);
  }

  /**
   * Update cart line item quantity
   * @param {string} key - Line item key
   * @param {number} quantity - New quantity
   */
  async function updateItem(key, quantity) {
    pendingLineKeys.add(key);
    setLineItemBusy(key, true);
    try {
      await FlyFlow.fetchAPI('/cart/change.js', { id: key, quantity });
      await refreshCart();
      if (quantity === 0) {
        FlyFlow.announce('Item removed from cart');
      }
    } catch {
      FlyFlow.announce('Could not update cart');
    } finally {
      pendingLineKeys.delete(key);
      setLineItemBusy(key, false);
    }
  }

  /**
   * Refresh cart drawer contents using Section Rendering API
   */
  async function refreshCart() {
    try {
      const [cart, sections] = await Promise.all([
        FlyFlow.fetchAPI('/cart.js'),
        fetch('/?sections=cart-drawer').then(function (response) {
          return response.json();
        }),
      ]);
      updateCartCount(cart.item_count);
      updateShippingBar(cart.total_price);

      if (cartSubtotalElement) {
        cartSubtotalElement.textContent = FlyFlow.formatMoney(cart.total_price);
      }

      // Use Section Rendering API for full cart HTML update
      if (sections['cart-drawer'] && cartDrawer) {
        const temp = document.createElement('div');
        temp.innerHTML = sections['cart-drawer'];
        const nextDrawer = temp.querySelector('[data-cart-drawer]');
        if (nextDrawer) {
          cartDrawer.innerHTML = nextDrawer.innerHTML;
          cacheElements();
        }
      }
    } catch {
      // Fallback: reload page on section rendering failure
      window.location.reload();
    }
  }

  /**
   * Update all cart count badge elements
   * @param {number} count - Number of items in cart
   */
  function updateCartCount(count) {
    cartCountElements.forEach(function (el) {
      el.textContent = count;
      el.style.display = count > 0 ? '' : 'none';
    });
  }

  /**
   * Update shipping progress bar
   * @param {number} totalCents - Cart total in cents
   */
  function updateShippingBar(totalCents) {
    const bar = document.querySelector('[data-shipping-bar]');
    if (!bar) {
      return;
    }

    const threshold = parseFloat(bar.dataset.threshold) * 100;
    const fill = bar.querySelector('[data-shipping-fill]');
    const message = bar.querySelector('[data-shipping-message]');

    if (!threshold || !fill || !message) {
      return;
    }

    const progress = Math.min((totalCents / threshold) * 100, 100);
    fill.style.width = progress + '%';

    if (totalCents >= threshold) {
      message.textContent = bar.dataset.qualifiedMessage || 'You qualify for free shipping!';
      bar.classList.add('shipping-bar--qualified');
    } else {
      const remaining = FlyFlow.formatMoney(threshold - totalCents);
      message.textContent = (
        bar.dataset.spendMessage || 'Spend AMOUNT_PLACEHOLDER more for free shipping!'
      ).replace('AMOUNT_PLACEHOLDER', remaining);
      bar.classList.remove('shipping-bar--qualified');
    }
  }

  /** Open cart drawer */
  function open() {
    if (!cartDrawer) {
      window.location.href = '/cart';
      return;
    }
    cartDrawer.classList.add('cart-drawer--open');
    if (overlay) {
      overlay.classList.add('overlay--visible');
    }
    document.body.classList.add('drawer-open');
    if (removeFocusTrap) {
      removeFocusTrap();
    }
    removeFocusTrap = FlyFlow.trapFocus(cartDrawer);
  }

  /** Close cart drawer */
  function close() {
    if (!cartDrawer) {
      return;
    }
    cartDrawer.classList.remove('cart-drawer--open');
    if (overlay) {
      overlay.classList.remove('overlay--visible');
    }
    document.body.classList.remove('drawer-open');
    if (removeFocusTrap) {
      removeFocusTrap();
      removeFocusTrap = null;
    }
  }

  /** Toggle cart drawer */
  function toggle() {
    if (!cartDrawer) {
      window.location.href = '/cart';
      return;
    }
    if (cartDrawer.classList.contains('cart-drawer--open')) {
      close();
    } else {
      open();
    }
  }

  /**
   * Resolve line key from any element inside a cart item
   * @param {HTMLElement} element - Element inside cart item
   * @returns {string | null} Line key
   */
  function getLineKeyFromElement(element) {
    const lineContainer = element.closest('[data-line-key], [data-cart-item]');
    if (!lineContainer) {
      return null;
    }
    return lineContainer.dataset.lineKey || lineContainer.dataset.cartItem || null;
  }

  /**
   * Lock a line item during async cart update
   * @param {string} key - Line item key
   * @param {boolean} isBusy - Busy state
   */
  function setLineItemBusy(key, isBusy) {
    const selectors = [
      `[data-line-key="${key}"]`,
      `[data-cart-item="${key}"]`,
      `[data-cart-remove="${key}"]`,
      `[data-line-key="${key}"] [data-cart-qty-input]`,
    ];

    document.querySelectorAll(selectors.join(', ')).forEach(function (el) {
      if (el.tagName === 'INPUT' || el.tagName === 'BUTTON') {
        el.disabled = isBusy;
      }
    });
  }

  return { init, open, close, refreshCart };
})();

/* ==========================================================================
   Navigation Module
   ========================================================================== */

FlyFlow.Navigation = (function () {
  let header;
  let mobileMenu;
  let bottomNav;
  let lastScrollY = 0;
  let bottomNavTimer = null;
  let ticking = false;

  /**
   * Initialize navigation module
   */
  function init() {
    header = document.querySelector('[data-header]');
    mobileMenu = document.querySelector('[data-mobile-menu]');
    bottomNav = document.querySelector('[data-bottom-nav]');

    // Mobile menu toggle
    document.addEventListener('click', function (e) {
      const toggle = e.target.closest('[data-mobile-menu-toggle]');
      if (toggle) {
        e.preventDefault();
        toggleMobileMenu();
      }

      const closeBtn = e.target.closest('[data-mobile-menu-close]');
      if (closeBtn) {
        e.preventDefault();
        closeMobileMenu();
      }

      // Accordion submenu
      const accordionTrigger = e.target.closest('[data-submenu-toggle]');
      if (accordionTrigger) {
        e.preventDefault();
        toggleSubmenu(accordionTrigger);
      }
    });

    // Header hide/show on scroll
    if (header) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  /**
   * Handle scroll for header and bottom nav visibility
   */
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const currentScrollY = window.scrollY;
        const deltaY = currentScrollY - lastScrollY;
        const scrollingDown = deltaY > 2 && currentScrollY > 100;
        const scrollingUp = deltaY < -2;

        if (header) {
          header.classList.toggle('header--hidden', scrollingDown);
          header.classList.toggle('header--scrolled', currentScrollY > 10);
        }
        if (bottomNav) {
          if (scrollingDown) {
            bottomNav.classList.add('bottom-nav--hidden');
          } else if (scrollingUp || currentScrollY <= 100) {
            bottomNav.classList.remove('bottom-nav--hidden');
          }

          if (bottomNavTimer) {
            window.clearTimeout(bottomNavTimer);
          }
          bottomNavTimer = window.setTimeout(function () {
            if (bottomNav) {
              bottomNav.classList.remove('bottom-nav--hidden');
            }
          }, 180);
        }

        lastScrollY = Math.max(currentScrollY, 0);
        ticking = false;
      });
      ticking = true;
    }
  }

  /** Open mobile menu */
  function openMobileMenu() {
    if (!mobileMenu) {
      return;
    }
    mobileMenu.classList.add('mobile-menu--open');
    const overlay = document.querySelector('[data-overlay]');
    if (overlay) {
      overlay.classList.add('overlay--visible');
    }
    document.body.classList.add('drawer-open');
    FlyFlow.trapFocus(mobileMenu);
  }

  /** Close mobile menu */
  function closeMobileMenu() {
    if (!mobileMenu) {
      return;
    }
    mobileMenu.classList.remove('mobile-menu--open');
    const overlay = document.querySelector('[data-overlay]');
    if (overlay) {
      overlay.classList.remove('overlay--visible');
    }
    document.body.classList.remove('drawer-open');
  }

  /** Toggle mobile menu */
  function toggleMobileMenu() {
    if (mobileMenu && mobileMenu.classList.contains('mobile-menu--open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  /**
   * Toggle accordion submenu
   * @param {HTMLElement} trigger - The accordion trigger button
   */
  function toggleSubmenu(trigger) {
    const submenu = trigger.nextElementSibling;
    if (!submenu) {
      return;
    }

    const isOpen = submenu.classList.contains('mobile-menu__submenu--open');
    submenu.classList.toggle('mobile-menu__submenu--open');
    trigger.setAttribute('aria-expanded', !isOpen);
  }

  return { init, openMobileMenu, closeMobileMenu };
})();

/* ==========================================================================
   Predictive Search Module
   ========================================================================== */

FlyFlow.Search = (function () {
  let searchInput;
  let resultsContainer;
  let trendingContainer;
  const cache = {};
  let activeQuery = '';

  /**
   * Initialize predictive search
   */
  function init() {
    searchInput = document.querySelector('[data-predictive-search-input]');
    resultsContainer = document.querySelector('[data-predictive-search-results]');
    trendingContainer = document.querySelector('[data-search-trending]');

    if (!searchInput || !resultsContainer) {
      return;
    }

    searchInput.addEventListener('input', FlyFlow.debounce(handleInput, 300));

    searchInput.addEventListener('focus', function () {
      if (searchInput.value.length >= 3) {
        resultsContainer.classList.add('predictive-search__results--open');
      }
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('[data-predictive-search]')) {
        resultsContainer.classList.remove('predictive-search__results--open');
      }
    });

    // Keyboard navigation
    searchInput.addEventListener('keydown', handleKeydown);
  }

  /**
   * Handle search input changes
   * @param {Event} e - Input event
   */
  async function handleInput(e) {
    const query = e.target.value.trim();
    const normalizedQuery = query.toLowerCase();
    activeQuery = query;
    toggleTrending(query.length === 0);

    if (query.length < 3) {
      resultsContainer.classList.remove('predictive-search__results--open');
      return;
    }

    if (cache[normalizedQuery]) {
      renderResults(cache[normalizedQuery]);
      return;
    }

    try {
      const url = `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product,collection,page&resources[limit]=6`;
      const data = await FlyFlow.fetchAPI(url);
      if (query !== activeQuery) {
        return;
      }
      cache[normalizedQuery] = data;
      renderResults(data);
    } catch {
      resultsContainer.classList.remove('predictive-search__results--open');
    }
  }

  /**
   * Render search results to dropdown
   * @param {Object} data - Search results from Shopify API
   */
  function renderResults(data) {
    const resources = data.resources;
    if (!resources || !resources.results) {
      return;
    }

    let html = '';
    const products = resources.results.products || [];
    const collections = resources.results.collections || [];
    const pages = resources.results.pages || [];

    if (products.length > 0) {
      html += '<div class="predictive-search__group-title">Products</div>';
      products.forEach(function (product) {
        const title = escapeHtml(product.title || '');
        const image = product.image
          ? `<div class="predictive-search__item-image"><img src="${product.image}" alt="${title}" loading="lazy" width="40" height="50"></div>`
          : '';
        html += `
          <a href="${product.url}" class="predictive-search__item">
            ${image}
            <div>
              <div class="predictive-search__item-title">${title}</div>
              <div class="predictive-search__item-price">${FlyFlow.formatMoney(product.price)}</div>
            </div>
          </a>`;
      });
    }

    if (collections.length > 0) {
      html += '<div class="predictive-search__group-title">Collections</div>';
      collections.forEach(function (collection) {
        const title = escapeHtml(collection.title || '');
        html += `
          <a href="${collection.url}" class="predictive-search__item">
            <div class="predictive-search__item-title">${title}</div>
          </a>`;
      });
    }

    if (pages.length > 0) {
      html += '<div class="predictive-search__group-title">Pages</div>';
      pages.forEach(function (page) {
        const title = escapeHtml(page.title || '');
        html += `
          <a href="${page.url}" class="predictive-search__item">
            <div class="predictive-search__item-title">${title}</div>
          </a>`;
      });
    }

    if (html) {
      resultsContainer.innerHTML = html;
      resultsContainer.classList.add('predictive-search__results--open');
    } else {
      const noResultsText = resultsContainer.dataset.noResultsText || 'No results found';
      resultsContainer.innerHTML = `<div class="predictive-search__item">${escapeHtml(noResultsText)}</div>`;
      resultsContainer.classList.add('predictive-search__results--open');
    }
  }

  /**
   * Handle keyboard navigation in search results
   * @param {KeyboardEvent} e - Keyboard event
   */
  function handleKeydown(e) {
    if (e.key === 'Escape') {
      resultsContainer.classList.remove('predictive-search__results--open');
      searchInput.blur();
      toggleTrending(true);
    }
  }

  function toggleTrending(show) {
    if (!trendingContainer) {
      return;
    }
    trendingContainer.style.display = show ? '' : 'none';
  }

  function escapeHtml(text) {
    return String(text)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  return { init };
})();

/* ==========================================================================
   Product Gallery Module
   ========================================================================== */

FlyFlow.ProductGallery = (function () {
  let mainImage;
  let thumbnails;
  let dots;
  let images = [];
  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  /**
   * Initialize product gallery
   */
  function init() {
    const gallery = document.querySelector('[data-product-gallery]');
    if (!gallery) {
      return;
    }

    mainImage = gallery.querySelector('[data-gallery-main-image]');
    thumbnails = gallery.querySelectorAll('[data-gallery-thumbnail]');
    dots = gallery.querySelectorAll('[data-gallery-dot]');
    images = [];
    currentIndex = 0;

    thumbnails.forEach(function (thumb, index) {
      images.push({
        src: thumb.dataset.fullSrc,
        srcset: thumb.dataset.srcset || '',
        alt: thumb.querySelector('img')?.alt || '',
      });

      thumb.addEventListener('click', function () {
        goToSlide(index);
      });
    });

    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        goToSlide(index);
      });
    });

    // Touch swipe for mobile
    const mainContainer = gallery.querySelector('[data-gallery-main]');
    if (mainContainer) {
      mainContainer.addEventListener('touchstart', onTouchStart, { passive: true });
      mainContainer.addEventListener('touchend', onTouchEnd, { passive: true });
    }

    // Image zoom
    if (mainImage) {
      mainImage.addEventListener('click', handleZoomClick);
    }

    // Fullscreen
    const fullscreenBtn = gallery.querySelector('[data-gallery-fullscreen]');
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', openFullscreen);
    }
  }

  /**
   * Navigate to a specific slide
   * @param {number} index - Slide index
   */
  function goToSlide(index) {
    if (index < 0 || index >= images.length) {
      return;
    }
    currentIndex = index;

    if (mainImage) {
      mainImage.src = images[index].src;
      if (images[index].srcset) {
        mainImage.srcset = images[index].srcset;
      }
      mainImage.alt = images[index].alt;
    }

    // Update thumbnail active state
    thumbnails.forEach(function (thumb, i) {
      thumb.classList.toggle('product-gallery__thumbnail--active', i === index);
    });

    // Update pagination dots
    dots.forEach(function (dot, i) {
      dot.classList.toggle('product-gallery__dot--active', i === index);
    });
  }

  /**
   * Record touch start position
   * @param {TouchEvent} e - Touch event
   */
  function onTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }

  /**
   * Handle swipe on touch end
   * @param {TouchEvent} e - Touch event
   */
  function onTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentIndex < images.length - 1) {
        goToSlide(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        goToSlide(currentIndex - 1);
      }
    }
  }

  /**
   * Handle zoom click on main image
   * @param {Event} e - Click event
   */
  function handleZoomClick(e) {
    // Simple zoom: toggle a zoomed class
    const container = e.target.closest('[data-gallery-main]');
    if (container) {
      container.classList.toggle('product-gallery__main--zoomed');
      if (container.classList.contains('product-gallery__main--zoomed')) {
        container.style.cursor = 'zoom-out';
      } else {
        container.style.cursor = 'zoom-in';
      }
    }
  }

  /** Open fullscreen gallery */
  function openFullscreen() {
    const fullscreen = document.querySelector('[data-gallery-fullscreen-view]');
    if (fullscreen) {
      fullscreen.classList.add('product-gallery__fullscreen--open');
      document.body.classList.add('drawer-open');
      FlyFlow.trapFocus(fullscreen);
    }
  }

  return { init, goToSlide };
})();

/* ==========================================================================
   Variant Selector Module
   ========================================================================== */

FlyFlow.VariantSelector = (function () {
  let productData;
  let sectionRoot;
  const selectedOptions = {};

  /**
   * Initialize variant selector for product page
   */
  function init() {
    const productJson = document.querySelector('[data-product-json]');
    if (!productJson) {
      return;
    }
    sectionRoot = productJson.closest('[data-section-id]') || document;

    try {
      productData = JSON.parse(productJson.textContent);
    } catch {
      return;
    }

    document.addEventListener('click', function (e) {
      const swatch = e.target.closest('[data-option-value]');
      if (!swatch || !sectionRoot.contains(swatch)) {
        return;
      }
      if (swatch) {
        e.preventDefault();
        selectOption(swatch);
      }
    });
  }

  /**
   * Handle option selection (color/size swatch click)
   * @param {HTMLElement} swatch - The clicked swatch element
   */
  function selectOption(swatch) {
    if (swatch.getAttribute('aria-disabled') === 'true') {
      return;
    }

    const optionName = swatch.dataset.optionName;
    const optionValue = swatch.dataset.optionValue;

    selectedOptions[optionName] = optionValue;

    // Update active state in UI
    const group = swatch.closest('[data-option-group]');
    if (group) {
      group.querySelectorAll('[data-option-value]').forEach(function (s) {
        s.classList.toggle(
          s.classList.contains('swatch') ? 'swatch--active' : 'size-btn--active',
          s.dataset.optionValue === optionValue
        );
      });

      // Update selected label
      const label = group.querySelector('[data-option-selected]');
      if (label) {
        label.textContent = optionValue;
      }
    }

    // Find matching variant
    const variant = findVariant();
    if (variant) {
      updateProductInfo(variant);
      updateURL(variant);
      updateGallery(variant);
    } else {
      setUnavailableState();
    }
  }

  /**
   * Find variant matching all selected options
   * @returns {Object|null} Matching variant or null
   */
  function findVariant() {
    if (!productData || !productData.variants) {
      return null;
    }

    return productData.variants.find(function (variant) {
      return variant.options.every(function (option, index) {
        const optionName = productData.options[index];
        return !selectedOptions[optionName] || selectedOptions[optionName] === option;
      });
    });
  }

  /**
   * Update product info (price, availability, form ID)
   * @param {Object} variant - The selected variant
   */
  function updateProductInfo(variant) {
    // Update price
    sectionRoot.querySelectorAll('[data-product-price]').forEach(function (priceEl) {
      priceEl.textContent = FlyFlow.formatMoney(variant.price);
    });

    sectionRoot.querySelectorAll('[data-product-compare-price]').forEach(function (comparePriceEl) {
      if (variant.compare_at_price && variant.compare_at_price > variant.price) {
        comparePriceEl.textContent = FlyFlow.formatMoney(variant.compare_at_price);
        comparePriceEl.style.display = '';
      } else {
        comparePriceEl.style.display = 'none';
      }
    });

    // Update hidden variant ID input
    const variantInput = sectionRoot.querySelector('[data-product-form] [name="id"]');
    if (variantInput) {
      variantInput.value = variant.id;
    }

    // Update add to cart button
    sectionRoot.querySelectorAll('[data-add-to-cart]').forEach(function (addBtn) {
      if (variant.available) {
        addBtn.disabled = false;
        addBtn.textContent = addBtn.dataset.addText || 'Add to Cart';
      } else {
        addBtn.disabled = true;
        addBtn.textContent = addBtn.dataset.soldOutText || 'Sold Out';
      }
      addBtn.dataset.variantId = variant.id;
    });

    // Update stock indicator
    updateStockIndicator(variant);
  }

  /**
   * Update stock indicator display
   * @param {Object} variant - The selected variant
   */
  function updateStockIndicator(variant) {
    const indicator = sectionRoot.querySelector('[data-stock-indicator]');
    if (!indicator) {
      return;
    }

    const threshold = parseInt(indicator.dataset.threshold, 10) || 5;
    const qty = parseInt(variant.inventory_quantity || 0, 10);

    if (!variant.available) {
      indicator.className = 'stock-indicator stock-indicator--out-of-stock';
      indicator.innerHTML = '<span class="stock-indicator__dot"></span> Out of stock';
    } else if (variant.inventory_management && qty > 0 && qty <= threshold) {
      indicator.className = 'stock-indicator stock-indicator--low-stock';
      indicator.innerHTML = `<span class="stock-indicator__dot"></span> Only ${qty} left`;
    } else {
      indicator.className = 'stock-indicator stock-indicator--in-stock';
      indicator.innerHTML = '<span class="stock-indicator__dot"></span> In stock';
    }
  }

  /**
   * Update URL with selected variant ID
   * @param {Object} variant - The selected variant
   */
  function updateURL(variant) {
    const url = new URL(window.location);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url);
  }

  /**
   * Update gallery when variant with images is selected
   * @param {Object} variant - The selected variant
   */
  function updateGallery(variant) {
    if (variant.featured_image) {
      const thumbnails = document.querySelectorAll('[data-gallery-thumbnail]');
      thumbnails.forEach(function (thumb, index) {
        if (thumb.dataset.mediaId === String(variant.featured_image.id)) {
          FlyFlow.ProductGallery.goToSlide(index);
        }
      });
    }
  }

  /**
   * Set product state to unavailable when no variant matches selected options
   */
  function setUnavailableState() {
    document.querySelectorAll('[data-add-to-cart]').forEach(function (addBtn) {
      addBtn.disabled = true;
      addBtn.textContent = addBtn.dataset.soldOutText || 'Unavailable';
      addBtn.dataset.variantId = '';
    });
  }

  return { init };
})();

/* ==========================================================================
   Quantity Buttons Module (Product Page)
   ========================================================================== */

FlyFlow.QuantityButtons = (function () {
  function init() {
    document.addEventListener('click', function (e) {
      const minusBtn = e.target.closest('[data-qty-minus]');
      const plusBtn = e.target.closest('[data-qty-plus]');

      if (minusBtn) {
        e.preventDefault();
        const input = minusBtn.parentElement.querySelector('.quantity-selector__input');
        if (input) {
          const val = parseInt(input.value, 10) || 1;
          input.value = Math.max(1, val - 1);
        }
      }

      if (plusBtn) {
        e.preventDefault();
        const input = plusBtn.parentElement.querySelector('.quantity-selector__input');
        if (input) {
          const val = parseInt(input.value, 10) || 1;
          input.value = val + 1;
        }
      }
    });
  }

  return { init };
})();

/* ==========================================================================
   Filters Module
   ========================================================================== */

FlyFlow.Filters = (function () {
  let filterDrawer;

  /**
   * Initialize collection filters
   */
  function init() {
    filterDrawer = document.querySelector('[data-filter-drawer]');

    // Filter drawer toggle
    document.addEventListener('click', function (e) {
      const openBtn = e.target.closest('[data-filter-open]');
      if (openBtn) {
        e.preventDefault();
        openFilterDrawer();
        return;
      }

      const closeBtn = e.target.closest('[data-filter-close]');
      if (closeBtn) {
        e.preventDefault();
        closeFilterDrawer();
        return;
      }

      // Filter group accordion toggle
      const filterToggle = e.target.closest('[data-filter-toggle]');
      if (filterToggle) {
        e.preventDefault();
        const content = filterToggle.nextElementSibling;
        if (content) {
          content.classList.toggle('accordion__content--open');
          filterToggle.setAttribute(
            'aria-expanded',
            content.classList.contains('accordion__content--open')
          );
        }
      }
    });
  }

  /** Open filter drawer on mobile */
  function openFilterDrawer() {
    if (!filterDrawer) {
      return;
    }
    filterDrawer.classList.add('filter-drawer--open');
    const overlay = document.querySelector('[data-overlay]');
    if (overlay) {
      overlay.classList.add('overlay--visible');
    }
    document.body.classList.add('drawer-open');
    FlyFlow.trapFocus(filterDrawer);
  }

  /** Close filter drawer */
  function closeFilterDrawer() {
    if (!filterDrawer) {
      return;
    }
    filterDrawer.classList.remove('filter-drawer--open');
    const overlay = document.querySelector('[data-overlay]');
    if (overlay) {
      overlay.classList.remove('overlay--visible');
    }
    document.body.classList.remove('drawer-open');
  }

  return { init, openFilterDrawer, closeFilterDrawer };
})();

/* ==========================================================================
   Collection View Module
   ========================================================================== */

FlyFlow.CollectionView = (function () {
  const STORAGE_KEY = 'flyflow_collection_view';
  let productGrid;
  let toggleButtons;

  function init() {
    productGrid = document.getElementById('product-grid');
    toggleButtons = document.querySelectorAll('.view-toggle [data-view]');

    if (!productGrid || !toggleButtons.length) {
      return;
    }

    const defaultView = productGrid.dataset.defaultView || 'grid';
    const storedView = window.localStorage.getItem(STORAGE_KEY);
    const initialView = ['grid', 'list', 'masonry'].includes(storedView) ? storedView : defaultView;
    setView(initialView);

    document.addEventListener('click', function (e) {
      const toggle = e.target.closest('.view-toggle [data-view]');
      if (!toggle) {
        return;
      }

      e.preventDefault();
      setView(toggle.dataset.view);
    });
  }

  function setView(view) {
    if (!['grid', 'list', 'masonry'].includes(view) || !productGrid) {
      return;
    }

    productGrid.classList.remove('product-grid--list', 'product-grid--masonry');

    if (view === 'list') {
      productGrid.classList.add('product-grid--list');
    } else if (view === 'masonry') {
      productGrid.classList.add('product-grid--masonry');
    }

    toggleButtons.forEach(function (btn) {
      btn.classList.toggle('view-toggle__btn--active', btn.dataset.view === view);
    });

    window.localStorage.setItem(STORAGE_KEY, view);
  }

  return { init };
})();

/* ==========================================================================
   Lazy Load Module
   ========================================================================== */

FlyFlow.LazyLoad = (function () {
  /**
   * Initialize lazy loading with Intersection Observer
   */
  function init() {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;

            if (el.tagName === 'IMG' && el.dataset.src) {
              el.src = el.dataset.src;
              if (el.dataset.srcset) {
                el.srcset = el.dataset.srcset;
              }
              el.removeAttribute('data-src');
              el.removeAttribute('data-srcset');
            }

            // Initialize lazy sections/components
            if (el.dataset.lazyInit) {
              const fn = FlyFlow[el.dataset.lazyInit];
              if (typeof fn === 'function') {
                fn();
              } else if (fn && typeof fn.init === 'function') {
                fn.init();
              }
            }

            observer.unobserve(el);
          }
        });
      },
      { rootMargin: '200px 0px' }
    );

    document.querySelectorAll('[data-src], [data-lazy-init]').forEach(function (el) {
      observer.observe(el);
    });
  }

  return { init };
})();

/* ==========================================================================
   Modal Module
   ========================================================================== */

FlyFlow.Modal = (function () {
  let activeModal = null;
  let removeTrap = null;

  /**
   * Initialize modal system
   */
  function init() {
    document.addEventListener('click', function (e) {
      const openBtn = e.target.closest('[data-modal-open]');
      if (openBtn) {
        e.preventDefault();
        open(openBtn.dataset.modalOpen);
        return;
      }

      const closeBtn = e.target.closest('[data-modal-close]');
      if (closeBtn) {
        e.preventDefault();
        close();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && activeModal) {
        close();
      }
    });
  }

  /**
   * Open a modal by ID
   * @param {string} id - Modal element ID
   */
  function open(id) {
    const modal = document.getElementById(id);
    if (!modal) {
      return;
    }

    activeModal = modal;
    modal.classList.add('modal--open');
    const overlay = document.querySelector('[data-overlay]');
    if (overlay) {
      overlay.classList.add('overlay--visible');
    }
    document.body.classList.add('drawer-open');
    removeTrap = FlyFlow.trapFocus(modal);
  }

  /** Close active modal */
  function close() {
    if (!activeModal) {
      return;
    }
    activeModal.classList.remove('modal--open');
    const overlay = document.querySelector('[data-overlay]');
    if (overlay) {
      overlay.classList.remove('overlay--visible');
    }
    document.body.classList.remove('drawer-open');
    if (removeTrap) {
      removeTrap();
    }
    activeModal = null;
  }

  return { init, open, close };
})();

/* ==========================================================================
   Accordion Module
   ========================================================================== */

FlyFlow.Accordion = (function () {
  /**
   * Initialize accordions
   */
  function init() {
    document.addEventListener('click', function (e) {
      const trigger = e.target.closest('[data-accordion-trigger]');
      if (!trigger) {
        return;
      }

      e.preventDefault();
      const content = trigger.nextElementSibling;
      if (!content) {
        return;
      }

      const isOpen = content.classList.contains('accordion__content--open');
      content.classList.toggle('accordion__content--open');
      trigger.setAttribute('aria-expanded', !isOpen);
    });
  }

  return { init };
})();

/* ==========================================================================
   Sticky Add to Cart Module
   ========================================================================== */

FlyFlow.StickyATC = (function () {
  /**
   * Initialize sticky add to cart bar
   */
  function init() {
    const stickyBar = document.querySelector('[data-sticky-atc]');
    const addToCartSection = document.querySelector('[data-add-to-cart-section]');

    if (!stickyBar || !addToCartSection) {
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          stickyBar.classList.toggle('sticky-atc--visible', !entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    observer.observe(addToCartSection);
  }

  return { init };
})();

/* ==========================================================================
   Hero Media Module
   ========================================================================== */

FlyFlow.HeroMedia = (function () {
  function init() {
    initCarousels();
    initParallax();
  }

  function initCarousels() {
    document.querySelectorAll('[data-hero-carousel]').forEach(function (carousel) {
      const slides = carousel.querySelectorAll('[data-hero-slide]');
      const dots = carousel.querySelectorAll('[data-hero-carousel-dot]');
      const prevBtn = carousel.querySelector('[data-hero-carousel-prev]');
      const nextBtn = carousel.querySelector('[data-hero-carousel-next]');
      const autoplay = carousel.dataset.carouselAutoplay === 'true';
      const interval = parseInt(carousel.dataset.carouselInterval || '5000', 10);
      let currentIndex = 0;
      let timer = null;

      if (slides.length <= 1) {
        if (prevBtn) {
          prevBtn.style.display = 'none';
        }
        if (nextBtn) {
          nextBtn.style.display = 'none';
        }
        return;
      }

      function goTo(index) {
        currentIndex = (index + slides.length) % slides.length;
        slides.forEach(function (slide, slideIndex) {
          slide.classList.toggle('is-active', slideIndex === currentIndex);
        });
        dots.forEach(function (dot, dotIndex) {
          dot.classList.toggle('is-active', dotIndex === currentIndex);
        });
      }

      function startAutoplay() {
        if (!autoplay) {
          return;
        }
        stopAutoplay();
        timer = window.setInterval(function () {
          goTo(currentIndex + 1);
        }, interval);
      }

      function stopAutoplay() {
        if (timer) {
          window.clearInterval(timer);
          timer = null;
        }
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          goTo(currentIndex - 1);
          startAutoplay();
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          goTo(currentIndex + 1);
          startAutoplay();
        });
      }

      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          goTo(parseInt(dot.dataset.heroCarouselDot || '0', 10));
          startAutoplay();
        });
      });

      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
      carousel.addEventListener('focusin', stopAutoplay);
      carousel.addEventListener('focusout', startAutoplay);

      startAutoplay();
    });
  }

  function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const containers = document.querySelectorAll('[data-hero-parallax]');
    if (!containers.length) {
      return;
    }

    let ticking = false;

    function updateParallax() {
      containers.forEach(function (container) {
        const rect = container.getBoundingClientRect();
        const speed = 0.12;
        const offset = -rect.top * speed;
        container.querySelectorAll('[data-hero-parallax-target]').forEach(function (target) {
          target.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
      });
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  return { init };
})();

/* ==========================================================================
   Swatch Colors Module
   ========================================================================== */

FlyFlow.SwatchColors = (function () {
  const defaultMap = {
    onyx: '#0a0a0a',
    black: '#0a0a0a',
    cloud: '#f5f4f2',
    white: '#f5f4f2',
    bone: '#e7dfd1',
    butter: '#eadf9d',
    slate: '#73767b',
    grey: '#73767b',
    gray: '#73767b',
    olive: '#677056',
    gold: '#c4a46a',
    silver: '#bfc3c7',
  };

  function parseCustomMap() {
    const node = document.getElementById('swatch-color-map-data');
    if (!node) {
      return {};
    }

    let raw = '';
    try {
      raw = JSON.parse(node.textContent || '""');
    } catch {
      raw = '';
    }

    const parsed = {};
    String(raw || '')
      .split(/\r?\n/)
      .forEach(function (line) {
        const cleaned = line.trim();
        if (!cleaned || !cleaned.includes(':')) {
          return;
        }
        const splitIndex = cleaned.indexOf(':');
        const name = cleaned.slice(0, splitIndex).trim().toLowerCase();
        const color = cleaned.slice(splitIndex + 1).trim();
        if (name && color) {
          parsed[name] = color;
        }
      });

    return parsed;
  }

  function apply(context = document) {
    const customMap = parseCustomMap();
    const map = Object.assign({}, defaultMap, customMap);

    context.querySelectorAll('[data-swatch-name]').forEach(function (swatch) {
      const key = String(swatch.dataset.swatchName || '')
        .trim()
        .toLowerCase();
      const color = map[key] || '#d4d1cc';
      swatch.style.setProperty('--swatch-color', color);
      swatch.style.setProperty('background-color', color, 'important');
    });
  }

  function init() {
    apply(document);
  }

  return { init, apply };
})();

/* ==========================================================================
   Back to Top Module
   ========================================================================== */

FlyFlow.BackToTop = (function () {
  function init() {
    const button = document.querySelector('[data-back-to-top]');
    if (!button) {
      return;
    }

    function onScroll() {
      button.classList.toggle('back-to-top--visible', window.scrollY > 500);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  return { init };
})();

/* ==========================================================================
   Newsletter Popup Module
   ========================================================================== */

FlyFlow.NewsletterPopup = (function () {
  const storageKey = 'flyflow-newsletter-popup-dismissed-at';

  function init() {
    const popup = document.querySelector('[data-newsletter-popup]');
    if (!popup) {
      return;
    }

    const closeBtn = popup.querySelector('[data-newsletter-popup-close]');
    const delaySeconds =
      parseInt(document.documentElement.dataset.newsletterPopupDelay || '6', 10) || 6;
    const frequencyDays =
      parseInt(document.documentElement.dataset.newsletterPopupFrequency || '7', 10) || 7;

    if (isSuppressed(frequencyDays)) {
      return;
    }

    window.setTimeout(function () {
      popup.classList.add('newsletter-popup--visible');
      popup.setAttribute('aria-hidden', 'false');
    }, delaySeconds * 1000);

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        dismiss(popup);
      });
    }
  }

  function isSuppressed(frequencyDays) {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return false;
    }
    const dismissedAt = parseInt(raw, 10);
    if (!dismissedAt) {
      return false;
    }
    const nextEligible = dismissedAt + frequencyDays * 24 * 60 * 60 * 1000;
    return Date.now() < nextEligible;
  }

  function dismiss(popup) {
    popup.classList.remove('newsletter-popup--visible');
    popup.setAttribute('aria-hidden', 'true');
    localStorage.setItem(storageKey, String(Date.now()));
  }

  return { init };
})();

/* ==========================================================================
   Analytics Module
   ========================================================================== */

FlyFlow.Analytics = (function () {
  /**
   * Initialize analytics event tracking
   */
  function init() {
    // Track add to cart
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-add-to-cart]')) {
        trackEvent('add_to_cart');
      }
    });

    // Track search
    const searchInput = document.querySelector('[data-predictive-search-input]');
    if (searchInput) {
      searchInput.addEventListener(
        'input',
        FlyFlow.debounce(function (e) {
          if (e.target.value.length >= 3) {
            trackEvent('search', { search_term: e.target.value });
          }
        }, 1000)
      );
    }
  }

  /**
   * Send analytics event
   * @param {string} eventName - GA4 event name
   * @param {Object} [params] - Event parameters
   */
  function trackEvent(eventName, params) {
    // Google Analytics 4
    if (typeof gtag === 'function') {
      gtag('event', eventName, params || {});
    }

    // Facebook Pixel
    if (typeof fbq === 'function') {
      const fbEvents = {
        add_to_cart: 'AddToCart',
        search: 'Search',
        view_item: 'ViewContent',
        begin_checkout: 'InitiateCheckout',
      };
      if (fbEvents[eventName]) {
        fbq('track', fbEvents[eventName], params || {});
      }
    }
  }

  return { init, trackEvent };
})();

/* ==========================================================================
   Initialize All Modules on DOM Ready
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  FlyFlow.Cart.init();
  FlyFlow.Navigation.init();
  FlyFlow.Search.init();
  FlyFlow.ProductGallery.init();
  FlyFlow.VariantSelector.init();
  FlyFlow.Filters.init();
  FlyFlow.LazyLoad.init();
  FlyFlow.Modal.init();
  FlyFlow.Accordion.init();
  FlyFlow.QuantityButtons.init();
  FlyFlow.StickyATC.init();
  FlyFlow.HeroMedia.init();
  FlyFlow.SwatchColors.init();
  FlyFlow.CollectionView.init();
  FlyFlow.BackToTop.init();
  FlyFlow.NewsletterPopup.init();
  FlyFlow.Analytics.init();
});
