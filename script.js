document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.pdf-section');
    const navbarItems = document.querySelectorAll('.navbar li a');
    let currentSectionIndex = 0;

    // Function to update the visibility of sections
    function updateSectionVisibility() {
        sections.forEach((section, index) => {
            if (index === currentSectionIndex) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    // Function to update the navbar highlighting
    function highlightNavbarItem() {
        navbarItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentSectionIndex);
        });
    }

    // Function to change the current section
    function changeSection(newIndex) {
        currentSectionIndex = newIndex;
        const xOffset = newIndex * window.innerWidth;
        window.scrollTo({
            top: 0,
            left: xOffset,
            behavior: 'smooth'
        });
        updateSectionVisibility();
        highlightNavbarItem();
    }

    // Event listeners for the navbar items
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', () => changeSection(index));
    });

    // Event listener for scroll events to update the current section and navbar highlighting
    window.addEventListener('scroll', () => {
        const scrollX = window.pageXOffset;
        const sectionIndex = Math.round(scrollX / window.innerWidth);
        if (sectionIndex !== currentSectionIndex) {
            currentSectionIndex = sectionIndex;
            highlightNavbarItem();
        }
    });

    // Initial setup
    changeSection(0); // Start at the first section
});
