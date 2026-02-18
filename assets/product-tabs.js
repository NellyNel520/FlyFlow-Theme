/* FlyFlow Theme - Product tabs interactions
   ARIA tabs with keyboard support and URL hash syncing.
*/
(function () {
  function initTabs(root) {
    if (!root || root.dataset.tabsReady === 'true') {
      return;
    }

    const tabs = Array.from(root.querySelectorAll('[data-tab]'));
    const panels = Array.from(root.querySelectorAll('[data-tab-panel]'));
    if (!tabs.length || !panels.length) {
      return;
    }

    function activateTab(tab, focusTab) {
      if (!tab) {
        return;
      }
      const key = tab.dataset.tabKey;

      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle('is-active', isActive);
        item.setAttribute('aria-selected', isActive ? 'true' : 'false');
        item.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.tabKey !== key;
      });

      if (focusTab) {
        tab.focus();
      }

      if (root.dataset.syncHash === 'true') {
        const hash = tab.dataset.tabHash;
        if (hash && window.location.hash !== `#${hash}`) {
          if (history.replaceState) {
            history.replaceState(null, '', `#${hash}`);
          } else {
            window.location.hash = hash;
          }
        }
      }
    }

    function focusByOffset(currentIndex, offset) {
      const next = tabs[(currentIndex + offset + tabs.length) % tabs.length];
      if (next) {
        next.focus();
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activateTab(tab, false));

      tab.addEventListener('keydown', (event) => {
        const index = tabs.indexOf(tab);
        switch (event.key) {
          case 'ArrowRight':
            event.preventDefault();
            focusByOffset(index, 1);
            break;
          case 'ArrowLeft':
            event.preventDefault();
            focusByOffset(index, -1);
            break;
          case 'Home':
            event.preventDefault();
            tabs[0].focus();
            break;
          case 'End':
            event.preventDefault();
            tabs[tabs.length - 1].focus();
            break;
          case 'Enter':
          case ' ':
            event.preventDefault();
            activateTab(tab, false);
            break;
          default:
            break;
        }
      });
    });

    const hash = window.location.hash.replace('#', '');
    const hashTab = tabs.find((tab) => tab.dataset.tabHash === hash);
    const defaultTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
    activateTab(hashTab || defaultTab, false);

    root.dataset.tabsReady = 'true';
  }

  function boot() {
    document.querySelectorAll('[data-product-tabs]').forEach((root) => initTabs(root));
  }

  document.addEventListener('DOMContentLoaded', boot);
  document.addEventListener('shopify:section:load', boot);
})();
