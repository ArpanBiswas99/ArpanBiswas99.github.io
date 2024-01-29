document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    const navbarItems = document.querySelectorAll('.navbar li a');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    let currentSectionIndex = 0;
    let isScrolling = false;

    // Function to update the active image in the current section
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
            // Move to next/previous section if at the end/start of the current section
            if (newIndex >= images.length && currentSectionIndex < sections.length - 1) {
                changeSection(currentSectionIndex + 1);
            } else if (newIndex < 0 && currentSectionIndex > 0) {
                changeSection(currentSectionIndex - 1);
            }
        }

        setTimeout(() => {
            isScrolling = false;
        }, 800); // Delay scrolling for smoother transition
    }

    // Function to change the current section and highlight the navbar
    function changeSection(newIndex) {
        currentSectionIndex = newIndex;
        navbarItems.forEach((item, idx) => {
            if (idx === newIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Scroll to the corresponding section when a new section is activated
        sections[newIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        const newSectionImages = sections[newIndex].querySelectorAll('.image-wrapper');
        newSectionImages.forEach((img, imgIndex) => img.classList.toggle('active', imgIndex === 0));
        updateActiveImage(0); // Update the active image in the current section
    }

    // Mousewheel event to handle navigation between sections and section snapping
    document.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            updateActiveImage(1);
        } else if (e.deltaY < 0) {
            updateActiveImage(-1);
        }
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
    nextButton.addEventListener('click', () => {
        updateActiveImage(1);
    });

    backButton.addEventListener('click', () => {
        updateActiveImage(-1);
    });

    // Navigation bar clicks
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            changeSection(index);
            updateActiveImage(0); // Update the active image in the current section
        });
    });

    document.querySelector("a[href='#who-am-i']").addEventListener("click", function() {
        gtag("event", "link_click", {
          "event_category": "navigation",
          "event_label": "Who Am I Link"
        });
    });

    // Initialize the first section as active
    changeSection(0);
});
