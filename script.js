document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    const navbarItems = document.querySelectorAll('.navbar li a');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    let currentSectionIndex = 0;
    let lastScrollX = window.scrollX; // Use scrollX for horizontal scrolling

    // Initialize the active image in each section
    sections.forEach((section, index) => {
        const images = section.querySelectorAll('.image-wrapper');
        images.forEach((img, imgIndex) => img.classList.toggle('active', imgIndex === 0));
    });

    // Function to update the active image in the current section
    function updateActiveImage(direction) {
        const images = sections[currentSectionIndex].querySelectorAll('.image-wrapper');
        const activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
        let newIndex = activeIndex + direction;

        if (newIndex >= 0 && newIndex < images.length) {
            images[activeIndex].classList.remove('active');
            images[newIndex].classList.add('active');
        } else {
            // Move to next/previous section if at the end/start of the current section
            if (newIndex >= images.length && currentSectionIndex < sections.length - 1) {
                changeSection(currentSectionIndex + 1);
            } else if (newIndex < 0 && currentSectionIndex > 0) {
                changeSection(currentSectionIndex - 1);
            }
        }
    }

    // Function to change the current section and highlight the navbar
    function changeSection(newIndex) {
        currentSectionIndex = newIndex;
        navbarItems.forEach((item, idx) => item.classList.toggle('active', idx === newIndex));
        const newSectionImages = sections[newIndex].querySelectorAll('.image-wrapper');
        newSectionImages.forEach((img, imgIndex) => img.classList.toggle('active', imgIndex === 0));
    }

    // Scroll event to handle navigation between images and sections
    window.addEventListener('scroll', () => {
        const direction = window.scrollX > lastScrollX ? 1 : -1; // Use scrollX for horizontal scrolling
        updateActiveImage(direction);
        lastScrollX = window.scrollX; // Use scrollX for horizontal scrolling
    });

    // Keyboard navigation with arrow keys
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            updateActiveImage(1);
        } else if (e.key === 'ArrowLeft') {
            updateActiveImage(-1);
        }
    });

    // Button navigation
    nextButton.addEventListener('click', () => updateActiveImage(1));
    backButton.addEventListener('click', () => updateActiveImage(-1));

    // Navigation bar clicks
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', () => changeSection(index));
    });

    // Initialize the first section as active
    changeSection(0);
});