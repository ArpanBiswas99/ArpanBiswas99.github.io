document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    let currentImageIndex = 0; // Track the current image index globally
    const allImages = document.querySelectorAll('.image-wrapper img'); // Select all images
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    const navbarItems = document.querySelectorAll('.navbar li');

    // Function to activate a specific image
    function activateImage(index) {
        allImages.forEach((img, idx) => {
            const wrapper = img.parentElement;
            wrapper.classList.remove('active');
            if (idx === index) {
                wrapper.classList.add('active');
                img.scrollIntoView({ behavior: 'smooth', inline: 'center' }); // Center the active image
                updateSectionIndex(idx); // Update the section index based on the active image
            }
        });
        currentImageIndex = index; // Update the global image index
        updateButtonVisibility(); // Update next/back button visibility
    }

    // Function to update the current section index based on the active image
    function updateSectionIndex(imageIndex) {
        const activeImg = allImages[imageIndex];
        const activeSection = activeImg.closest('.image-section');
        const sectionIndex = Array.from(sections).indexOf(activeSection);
        currentSectionIndex = sectionIndex;
        updateNavbar(sectionIndex); // Update navbar highlighting
    }

    // Function to update navbar highlighting based on the current section
    function updateNavbar(sectionIndex) {
        navbarItems.forEach((item, idx) => {
            item.classList.remove('active');
            if (idx === sectionIndex) {
                item.classList.add('active');
            }
        });
    }

    // Function to update the visibility of the next and back buttons
    function updateButtonVisibility() {
        backButton.style.display = currentImageIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentImageIndex === allImages.length - 1 ? 'none' : 'block';
    }

    // Function to navigate to the next or previous image
    function navigateImage(direction) {
        let newIndex = currentImageIndex + direction;
        if (newIndex >= 0 && newIndex < allImages.length) {
            activateImage(newIndex);
        }
    }

    // Add click event listeners to the next and back buttons
    nextButton.addEventListener('click', () => navigateImage(1));
    backButton.addEventListener('click', () => navigateImage(-1));

    // Add keyboard navigation for left and right arrow keys
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            navigateImage(1);
        } else if (e.key === 'ArrowLeft') {
            navigateImage(-1);
        }
    });

    // Add mouse wheel navigation
    document.addEventListener('wheel', (e) => {
        e.preventDefault(); // Prevent the default scroll behavior
        if (e.deltaY > 0) { // Scrolling down
            navigateImage(1);
        } else { // Scrolling up
            navigateImage(-1);
        }
    });

    // Add click event listeners to navbar items for navigating to sections
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default anchor behavior
            const targetSection = sections[index];
            const firstImage = targetSection.querySelector('.image-wrapper img');
            const firstImageIndex = Array.from(allImages).indexOf(firstImage);
            activateImage(firstImageIndex);
        });
    });

    // Activate the first image on page load
    activateImage(0);
});
