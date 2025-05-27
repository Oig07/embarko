"use strict";

/**
 * Adds toggle behavior to collapsible sections (sidebar menus, journal entries, etc.)
 *
 * @param {Object} options - Configuration options
 * @param {string} options.buttonClass - Required. Class name of the toggle button.
 * @param {string} [options.contentClass] - Optional. Class name of the collapsible content (used as descendant selector).
 * @param {string} [options.activeButtonClass='active'] - Class to apply to the active toggle button.
 * @param {boolean} [options.animate=false] - Whether to toggle max-height for animated reveal.
 * @param {boolean} [options.delegate=false] - Use event delegation from the document instead of binding each button.
 */
export function initCollapsibles({
  buttonClass = '',
  contentClass = '',
  activeButtonClass = 'active',
  animate = false,
  delegate = false
} = {}) {
  if (!buttonClass) {
    console.warn('initCollapsibles: buttonClass is required');
    return;
  }

  const toggle = (button) => {
    let content;

    if (typeof contentClass === 'string' && contentClass.trim().length > 0) {
      content = button.closest(`.${buttonClass}`)?.querySelector(`.${contentClass}`);
    } else {
      content = button.nextElementSibling;
    }

    if (!content) {
      console.warn(`initCollapsibles: No content found for ${buttonClass}`);
      return;
    }

    if (animate) {
      const isOpen = content.classList.contains('expanded');
      button.classList.toggle(activeButtonClass, !isOpen);

      if (!isOpen) {
        content.classList.add('expanded');
        content.style.maxHeight = 'none'; // let it grow naturally to measure full height
        const fullHeight = content.scrollHeight + 'px';
        content.style.maxHeight = '0px'; // reset to collapse
        requestAnimationFrame(() => {
          content.style.maxHeight = fullHeight;
        });
      } else {
        const fullHeight = content.scrollHeight + 'px';
        content.style.maxHeight = fullHeight;
        requestAnimationFrame(() => {
          content.style.maxHeight = '0px';
          const onTransitionEnd = () => {
            content.classList.remove('expanded');
            content.removeEventListener('transitionend', onTransitionEnd);
          };
          content.addEventListener('transitionend', onTransitionEnd);
        });
      }
    } else {
      // For sidebar / static collapsibles
      button.classList.toggle(activeButtonClass);
      content.classList.toggle('collapsed');
    }
  };

  if (delegate) {
    document.addEventListener('click', (event) => {
      const button = event.target.closest(`.${buttonClass}`);
      if (button) toggle(button);
    });
  } else {
    const buttons = document.querySelectorAll(`.${buttonClass}`);
    buttons.forEach((button) => {
      button.addEventListener('click', () => toggle(button));
    });
  }
}
