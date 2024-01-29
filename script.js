document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    let currentSectionIndex = 0;
    const allImages = document.querySelectorAll('.image-wrapper img'); // Select all images

    function activateSection(index) {
        // Deactivate all images first
        allImages.forEach(img => {
            img.parentElement.classList.remove('active'); // Remove 'active' from the wrapper
        });

        const targetSection = sections[index];
        const images = targetSection.querySelectorAll('.image-wrapper img');
        if (images.length > 0) {
            // If there are images in the section, make the first one active
            images[0].parentElement.classList.add('active');
        }

        currentSectionIndex = index; // Update the current section index
        // Scroll the active image or section into view
        const activeWrapper = targetSection.querySelector('.image-wrapper.active');
        if (activeWrapper) {
            activeWrapper.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        } else {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Navigate to the next or previous image within the current section
    function navigateImage(direction) {
        const currentSection = sections[currentSectionIndex];
        const images = Array.from(currentSection.querySelectorAll('.image-wrapper img'));
        let currentIndex = images.findIndex(img => img.parentElement.classList.contains('active'));
        let newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < images.length) {
            images[currentIndex].parentElement.classList.remove('active');
            images[newIndex].parentElement.classList.add('active');
        }
    }

    function updateButtonVisibility() {
        backButton.style.display = currentSectionIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentSectionIndex === sections.length - 1 ? 'none' : 'block';
    }

    function showImage(offset) {
        const currentSection = sections[currentSectionIndex];
        const activeWrapper = currentSection.querySelector('.image-wrapper.active');
        if (activeWrapper) {
            navigateImage(offset);
        }
    }

    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');

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

    const navbarItems = document.querySelectorAll('.navbar li');
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            activateSection(index);
        });
    });

    activateSection(0);
});
