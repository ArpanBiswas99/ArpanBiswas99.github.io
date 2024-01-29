document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    let currentSectionIndex = 0;
    const allImages = document.querySelectorAll('.image-wrapper img'); // Select all images
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    const navbarItems = document.querySelectorAll('.navbar li');

    // Function to activate a section and its first image
    function activateSection(index) {
        // Deactivate all images first
        allImages.forEach(img => {
            img.parentElement.classList.remove('active'); // Remove 'active' from the wrapper
        });

        const targetSection = sections[index];
        const images = targetSection.querySelectorAll('.image-wrapper img');
        if (images.length === 1) {
            // If there's only one image in the section, make it active
            images[0].parentElement.classList.add('active');
        } else if (images.length > 1) {
            // If there are multiple images, activate the first one by default or maintain the current active image
            const activeImage = targetSection.querySelector('.image-wrapper.active img') || images[0];
            activeImage.parentElement.classList.add('active');
        }

        currentSectionIndex = index; // Update the current section index
        // Scroll the active image or section into view
        const activeWrapper = targetSection.querySelector('.image-wrapper.active');
        if (activeWrapper) {
            activeWrapper.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        } else {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        updateButtonVisibility();
    }

    // Function to update the visibility of next and back buttons
    function updateButtonVisibility() {
        backButton.style.display = currentSectionIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentSectionIndex === sections.length - 1 ? 'none' : 'block';
    }

    // Function to show the next or previous image within the current section
    function showImage(offset) {
        const currentSection = sections[currentSectionIndex];
        const wrappers = currentSection.querySelectorAll('.image-wrapper');
        const activeWrapper = currentSection.querySelector('.image-wrapper.active');
        let newActiveIndex = Array.from(wrappers).indexOf(activeWrapper) + offset;

        if (newActiveIndex >= 0 && newActiveIndex < wrappers.length) {
            wrappers.forEach(wrapper => wrapper.classList.remove('active'));
            wrappers[newActiveIndex].classList.add('active');
        } else if (newActiveIndex < 0 && currentSectionIndex > 0) {
            activateSection(currentSectionIndex - 1);
        } else if (newActiveIndex >= wrappers.length && currentSectionIndex < sections.length - 1) {
            activateSection(currentSectionIndex + 1);
        }

        updateButtonVisibility();
    }

    // Event listeners for navigation
    nextButton.addEventListener('click', () => showImage(1));
    backButton.addEventListener('click', () => showImage(-1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            showImage(1);
        } else if (e.key === 'ArrowLeft') {
            showImage(-1);
        }
    });

    document.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            showImage(1);
        } else {
            showImage(-1);
        }
    });

    navbarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            activateSection(index);
        });
    });

    // Initialize the first section and image
    activateSection(0);
});
