/* FlyFlow Theme - Social UI interactions
   Handles product copy-link action, share modal interactions, and mobile social rail toggle.
*/
(function () {
  function fallbackCopy(text) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = text;
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, text.length);
    let success = false;
    try {
      success = document.execCommand('copy');
    } catch {
      success = false;
    }
    document.body.removeChild(input);
    return success;
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        return fallbackCopy(text);
      }
    }
    return fallbackCopy(text);
  }

  function openShareModal(trigger) {
    const modalId = trigger.getAttribute('aria-controls');
    if (!modalId) {
      return;
    }

    const modal = document.getElementById(modalId);
    if (!modal) {
      return;
    }

    modal.dataset.lastTriggerId = trigger.id || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');

    const firstFocusable = modal.querySelector('button, a[href], [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  function closeShareModal(modal) {
    if (!modal) {
      return;
    }

    const triggerId = modal.dataset.lastTriggerId;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');

    if (triggerId) {
      const trigger = document.getElementById(triggerId);
      if (trigger) {
        trigger.focus();
      }
    }
  }

  document.addEventListener('click', function (event) {
    const copyBtn = event.target.closest('[data-copy-link]');
    if (copyBtn) {
      event.preventDefault();
      const copyUrl = copyBtn.dataset.copyUrl || window.location.href;
      const defaultLabel = copyBtn.dataset.copyDefault || 'Copy link';
      const successLabel = copyBtn.dataset.copySuccess || 'Copied';
      copyText(copyUrl).then(function (ok) {
        const nextLabel = ok ? successLabel : defaultLabel;
        copyBtn.textContent = nextLabel;
        copyBtn.setAttribute('aria-label', nextLabel);
        window.setTimeout(function () {
          copyBtn.textContent = defaultLabel;
          copyBtn.setAttribute('aria-label', 'Copy product link');
        }, 1600);
      });
      return;
    }

    const openBtn = event.target.closest('[data-share-open]');
    if (openBtn) {
      event.preventDefault();
      openShareModal(openBtn);
      return;
    }

    const closeBtn = event.target.closest('[data-share-close]');
    if (closeBtn) {
      event.preventDefault();
      const modal = closeBtn.closest('[data-share-modal]');
      closeShareModal(modal);
      return;
    }

    const toggle = event.target.closest('[data-social-rail-toggle]');
    if (toggle) {
      event.preventDefault();
      const rail = toggle.closest('[data-social-rail]');
      if (!rail) {
        return;
      }
      const isOpen = rail.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      return;
    }

    const clickedInsideRail = event.target.closest('[data-social-rail]');
    if (!clickedInsideRail) {
      document.querySelectorAll('[data-social-rail].is-open').forEach(function (rail) {
        rail.classList.remove('is-open');
        const toggleBtn = rail.querySelector('[data-social-rail-toggle]');
        if (toggleBtn) {
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') {
      return;
    }

    const openModal = document.querySelector('[data-share-modal].is-open');
    if (openModal) {
      closeShareModal(openModal);
    }
  });
})();
