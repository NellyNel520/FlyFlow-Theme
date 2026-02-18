/**
 * FlyFlow Theme - Dark Mode Module
 * Purpose: Theme switching logic with localStorage persistence
 *          and system preference detection.
 * Dependencies: None (standalone module)
 * Last modified: 2026-02-17
 *
 * Behavior:
 * 1. On load: check localStorage for saved preference
 * 2. If no preference: use system prefers-color-scheme
 * 3. User toggle saves preference to localStorage
 * 4. System preference changes apply when no manual override exists
 */

'use strict';

(function () {
  var STORAGE_KEY = 'flyflow-theme-preference';
  var root = document.documentElement;

  /**
   * Get the current theme from the DOM
   * @returns {'light'|'dark'} Current theme
   */
  function getCurrentTheme() {
    return root.getAttribute('data-theme') || 'light';
  }

  /**
   * Apply theme to DOM and update toggle button
   * @param {'light'|'dark'} theme - Theme to apply
   */
  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    updateToggleButton(theme);
    announceThemeChange(theme);
  }

  /**
   * Update toggle button icon and aria-label
   * @param {'light'|'dark'} theme - Current theme
   */
  function updateToggleButton(theme) {
    var toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(function (btn) {
      var sunIcon = btn.querySelector('[data-icon-sun]');
      var moonIcon = btn.querySelector('[data-icon-moon]');

      if (sunIcon && moonIcon) {
        // Show sun icon in dark mode (click to switch to light)
        // Show moon icon in light mode (click to switch to dark)
        sunIcon.style.display = theme === 'dark' ? '' : 'none';
        moonIcon.style.display = theme === 'light' ? '' : 'none';
      }

      btn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    });
  }

  /**
   * Announce theme change to screen readers
   * @param {'light'|'dark'} theme - New theme
   */
  function announceThemeChange(theme) {
    if (window.FlyFlow && FlyFlow.announce) {
      FlyFlow.announce('Switched to ' + theme + ' mode');
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggle() {
    var current = getCurrentTheme();
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  /**
   * Initialize dark mode listeners
   */
  function init() {
    // Set up toggle button click handlers
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-theme-toggle]');
      if (btn) {
        e.preventDefault();
        toggle();
      }
    });

    // Listen for system preference changes (when no manual override)
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }

    // Update toggle button to match current state
    updateToggleButton(getCurrentTheme());
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
