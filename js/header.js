document.addEventListener('DOMContentLoaded', function() {
    const headerWrapper = document.querySelector('.header-wrapper');
    const triggers = document.querySelectorAll('[data-megamenu-trigger]');
    const panels = document.querySelectorAll('[data-megamenu-panel]');
    let activeMenu = null;
    let hideMenuTimer;

    // --- Header Scroll Behavior ---
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            headerWrapper.classList.add('hidden');
        } else {
            headerWrapper.classList.remove('hidden');
        }
        headerWrapper.classList.toggle('scrolled', scrollTop > 10);
        lastScrollTop = scrollTop;
    });

    // --- Mega Menu Logic ---
    function showMenu(menuId) {
        clearTimeout(hideMenuTimer); // Cancel any pending hide actions

        // Deactivate previous menu if any
        if (activeMenu && activeMenu !== menuId) {
            deactivateCurrentMenu();
        }

        activeMenu = menuId;
        
        // Activate new menu
        const trigger = document.querySelector(`[data-megamenu-trigger="${menuId}"]`);
        const panel = document.querySelector(`[data-megamenu-panel="${menuId}"]`);

        if (trigger && panel) {
            headerWrapper.classList.add('menu-active');
            trigger.classList.add('active');
            panel.classList.add('active');
        }
    }

    function hideMenu() {
        // Use a timer to allow moving mouse from trigger to panel
        hideMenuTimer = setTimeout(() => {
            deactivateCurrentMenu();
            activeMenu = null;
        }, 200);
    }
    
    function deactivateCurrentMenu() {
        if (!activeMenu) return;
        
        const currentTrigger = document.querySelector(`[data-megamenu-trigger].active`);
        const currentPanel = document.querySelector(`[data-megamenu-panel].active`);

        headerWrapper.classList.remove('menu-active');
        if (currentTrigger) currentTrigger.classList.remove('active');
        if (currentPanel) currentPanel.classList.remove('active');
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            showMenu(trigger.dataset.megamenuTrigger);
        });
    });
    
    headerWrapper.addEventListener('mouseleave', () => {
        hideMenu();
    });

    // Keep menu open when hovering over it
    panels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
            clearTimeout(hideMenuTimer);
        });
    });

    // --- Mobile Menu Logic (Placeholder) ---
    // The original mobile menu JS would go here if needed.
    // This example focuses on the desktop mega menu.
});