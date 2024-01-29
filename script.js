document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    const navbarItems = document.querySelectorAll('.navbar li a');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    let currentSectionIndex = 0;
    let isScrolling = false;

    // Function to update the active image within a section or change the section
    function updateActiveImage(direction) {
        if (isScrolling) return;
        isScrolling = true;

        const images = sections[currentSectionIndex].querySelectorAll('.image-wrapper');
        const activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
        let newIndex = activeIndex + direction;

        if (newIndex >= 0 && newIndex < images.length) {
            images[activeIndex].classList.remove('active');
            images[newIndex].classList.add('active');
        } else {
            if (newIndex >= images.length && currentSectionIndex < sections.length - 1) {
                changeSection(currentSectionIndex + 1);
            } else if (newIndex < 0 && currentSectionIndex > 0) {
                changeSection(currentSectionIndex - 1);
            }
        }

        setTimeout(() => {
            isScrolling = false;
        }, 800); // Delay to prevent rapid scrolling
    }

    // Function to change the current section and update navbar highlighting
    function changeSection(newIndex) {
        if (newIndex === currentSectionIndex) return;

        currentSectionIndex = newIndex;
        sections[newIndex].scrollIntoView({ behavior: 'smooth' });

        navbarItems.forEach((item, idx) => {
            item.classList.toggle('active', idx === newIndex);
        });

        const newSectionImages = sections[newIndex].querySelectorAll('.image-wrapper');
        newSectionImages.forEach((img, imgIndex) => {
            img.classList.toggle('active', imgIndex === 0); // Activate the first image in the new section
        });
    }

    // Handle wheel navigation between images and sections
    document.addEventListener('wheel', (e) => {
        if (isScrolling) return; // Prevent scrolling while already in transition
        if (e.deltaY > 0) {
            updateActiveImage(1);
        } else if (e.deltaY < 0) {
            updateActiveImage(-1);
        }
    });

    // Handle keyboard navigation with arrow keys
    document.addEventListener('keydown', (e) => {
        if (isScrolling) return; // Prevent scrolling while already in transition
        if (e.key === 'ArrowRight') {
            updateActiveImage(1);
        } else if (e.key === 'ArrowLeft') {
            updateActiveImage(-1);
        }
    });

    // Handle clicks on navigation buttons
    nextButton.addEventListener('click', () => updateActiveImage(1));
    backButton.addEventListener('click', () => updateActiveImage(-1));

    // Initialize the first section and the first image within it as active
    changeSection(0);
});
