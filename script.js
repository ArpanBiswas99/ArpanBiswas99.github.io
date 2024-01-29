document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    const navbarItems = document.querySelectorAll('.navbar li a');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');

    let currentSectionIndex = 0; // Tracks the current section
    let currentImageIndices = Array.from({ length: sections.length }, () => 0); // Tracks the current image index for each section

    function updateNavigation() {
        // Update the visibility of the navigation buttons
        backButton.style.visibility = (currentSectionIndex === 0 && currentImageIndices[0] === 0) ? 'hidden' : 'visible';
        const lastSectionIndex = sections.length - 1;
        const lastImageIndexInSection = sections[lastSectionIndex].querySelectorAll('.image-wrapper').length - 1;
        nextButton.style.visibility = (currentSectionIndex === lastSectionIndex && currentImageIndices[lastSectionIndex] === lastImageIndexInSection) ? 'hidden' : 'visible';

        // Highlight the current section in the navbar
        navbarItems.forEach((item, index) => {
            if (index === currentSectionIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    function changeImage(direction) {
        // Calculate the new image index
        let newImageIndex = currentImageIndices[currentSectionIndex] + direction;

        // Get the current section and its images
        const currentSection = sections[currentSectionIndex];
        const images = currentSection.querySelectorAll('.image-wrapper');

        if (newImageIndex >= 0 && newImageIndex < images.length) {
            // Change image within the current section
            images[currentImageIndices[currentSectionIndex]].classList.remove('active', 'fade-in');
            images[currentImageIndices[currentSectionIndex]].classList.add('fade-out');
            images[newImageIndex].classList.remove('fade-out');
            images[newImageIndex].classList.add('active', 'fade-in');
            currentImageIndices[currentSectionIndex] = newImageIndex;
        } else if (newImageIndex < 0 && currentSectionIndex > 0) {
            // Move to the previous section
            currentSectionIndex--;
            currentImageIndices[currentSectionIndex] = sections[currentSectionIndex].querySelectorAll('.image-wrapper').length - 1; // Last image of the previous section
            updateSection();
        } else if (newImageIndex >= images.length && currentSectionIndex < sections.length - 1) {
            // Move to the next section
            currentSectionIndex++;
            currentImageIndices[currentSectionIndex] = 0; // First image of the next section
            updateSection();
        }

        updateNavigation();
    }

    function updateSection() {
        // Update images for the new section
        sections.forEach((section, index) => {
            const images = section.querySelectorAll('.image-wrapper');
            images.forEach((img, imgIndex) => {
                img.classList.remove('active', 'fade-in', 'fade-out');
                if (index === currentSectionIndex && imgIndex === currentImageIndices[currentSectionIndex]) {
                    img.classList.add('active', 'fade-in');
                }
            });
        });

        updateNavigation();
    }

    // Attach event listeners to navigation buttons
    nextButton.addEventListener('click', () => changeImage(1));
    backButton.addEventListener('click', () => changeImage(-1));

    // Navigation bar click events
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSectionIndex = index;
            currentImageIndices[currentSectionIndex] = 0; // Reset to the first image of the clicked section
            updateSection();
        });
    });

    // Initialize
    updateSection();
});
