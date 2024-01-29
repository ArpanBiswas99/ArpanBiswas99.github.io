document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    const navbarItems = document.querySelectorAll('.navbar li a');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    let currentSectionIndex = 0;
    let activeImageIndices = Array.from(sections).map(() => 0); // Track active image index for each section

    const updateActiveImage = (sectionIndex, newIndex) => {
        const images = sections[sectionIndex].querySelectorAll('.image-wrapper');
        images.forEach((img, idx) => {
            img.classList.remove('active', 'fade-in', 'fade-out');
            if (idx === newIndex) {
                img.classList.add('active', 'fade-in');
            }
        });
        activeImageIndices[sectionIndex] = newIndex; // Update active image index for the current section
    };

    const activateSection = (index) => {
        // Deactivate all sections
        sections.forEach((sec, idx) => {
            if (idx !== index) {
                sec.querySelectorAll('.image-wrapper').forEach(img => img.classList.remove('active', 'fade-in'));
            }
        });

        // Activate the first image of the new section if not already set
        if (activeImageIndices[index] === 0) {
            updateActiveImage(index, 0);
        } else {
            // If returning to a section, show the last viewed image
            updateActiveImage(index, activeImageIndices[index]);
        }

        // Update navbar active state
        navbarItems.forEach((item, navIdx) => {
            item.classList.toggle('active', navIdx === index);
        });

        currentSectionIndex = index; // Update the current section index
        updateButtonVisibility(); // Update button visibility based on the current section
    };

    const navigate = (direction) => {
        const currentSection = sections[currentSectionIndex];
        const images = currentSection.querySelectorAll('.image-wrapper');
        let newIndex = activeImageIndices[currentSectionIndex] + direction;

        if (newIndex >= 0 && newIndex < images.length) {
            // Navigate within the current section
            updateActiveImage(currentSectionIndex, newIndex);
        } else {
            // Move to the next or previous section if at the end or beginning of the current section
            if (newIndex < 0 && currentSectionIndex > 0) {
                activateSection(currentSectionIndex - 1); // Go to the last image of the previous section
                updateActiveImage(currentSectionIndex, sections[currentSectionIndex].querySelectorAll('.image-wrapper').length - 1);
            } else if (newIndex >= images.length && currentSectionIndex < sections.length - 1) {
                activateSection(currentSectionIndex + 1); // Go to the first image of the next section
                updateActiveImage(currentSectionIndex, 0);
            }
        }
    };

    const updateButtonVisibility = () => {
        backButton.style.display = (currentSectionIndex === 0 && activeImageIndices[0] === 0) ? 'none' : 'block';
        nextButton.style.display = (currentSectionIndex === sections.length - 1 && activeImageIndices[currentSectionIndex] === sections[currentSectionIndex].querySelectorAll('.image-wrapper').length - 1) ? 'none' : 'block';
    };

    // Event listeners for navigation buttons
    nextButton.addEventListener('click', () => navigate(1));
    backButton.addEventListener('click', () => navigate(-1));

    // Navbar click events
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            activateSection(index);
        });
    });

    // Initial activation of the first section
    activateSection(0);
});
