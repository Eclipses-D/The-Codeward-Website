document.addEventListener('DOMContentLoaded', () => {
    // Normalize the current path to ensure consistent comparison
    // This removes trailing slashes and ensures '/' is used for the root path
    const currentNormalizedPath = window.location.pathname.replace(/\/+$/, '');
    const currentPath = currentNormalizedPath === '' ? '/' : currentNormalizedPath;

    document.addEventListener('click', e => {
        const clickedElement = e.target;
        const isDropdownButton = clickedElement.matches("[data-dropdown-button]");
        const clickedLink = clickedElement.closest('a'); // Get the closest anchor tag that was clicked

        // --- 1. Handle clicks on dropdown buttons ---
        if (isDropdownButton) {
            e.preventDefault(); // Prevent default navigation (page reload/scroll to top)
            const currentDropdown = clickedElement.closest('[data-dropdown]');

            // Toggle the 'active' class for the clicked dropdown
            currentDropdown.classList.toggle('active');

            // Close other active dropdowns
            document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
                if (dropdown === currentDropdown) return; // Don't close the one we just clicked
                dropdown.classList.remove('active');
            });

            // We've handled this click, so exit the function
            return;
        }

        // --- 2. Handle clicks on any other navigation link (including those inside dropdowns) ---
        if (clickedLink) {
            // Get the normalized href of the clicked link
            // Use window.location.origin to ensure full URL context for new URL()
            const linkNormalizedPath = new URL(clickedLink.href, window.location.origin).pathname.replace(/\/+$/, '');
            const linkPath = linkNormalizedPath === '' ? '/' : linkNormalizedPath;

            // If the clicked link refers to the current page
            if (linkPath === currentPath) {
                e.preventDefault(); // Prevent page reload/scroll to top
                
                // Optionally: Close the dropdown if the clicked link was inside one
                // (This prevents the dropdown from staying open if you click its own page link)
                const parentDropdown = clickedElement.closest('[data-dropdown]');
                if (parentDropdown && parentDropdown.classList.contains('active')) {
                    parentDropdown.classList.remove('active');
                }
                // We've handled this click, so exit the function
                return;
            }
            // If the link does NOT refer to the current page, let its default behavior proceed (navigate)
        }

        // --- 3. Close any open dropdowns if the click was NOT on a dropdown and NOT inside an active dropdown ---
        // (This covers clicks anywhere else on the page that should close the dropdowns)
        if (!clickedElement.closest('[data-dropdown]')) {
             document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});