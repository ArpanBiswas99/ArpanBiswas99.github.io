document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    const navbarItems = document.querySelectorAll('.navbar li a');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    let currentSectionIndex = 0;
    let isScrolling = false;

    // Function to update the active image or change section
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
        }, 800);
    }

    function changeSection(newIndex) {
        if (newIndex === currentSectionIndex) return;

        currentSectionIndex = newIndex;
        sections.forEach((section, idx) => {
            section.scrollIntoView({ behavior: 'smooth' });
        });

        navbarItems.forEach((item, idx) => {
            if (idx === newIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        const newSectionImages = sections[newIndex].querySelectorAll('.image-wrapper');
        newSectionImages.forEach((img, imgIndex) => img.classList.toggle('active', imgIndex === 0));
    }

    // Debounce the wheel event
    let lastWheelEvent = 0;
    document.addEventListener('wheel', (e) => {
        const now = Date.now();
        if (now - lastWheelEvent < 800) return; // Adjust debounce time as needed
        lastWheelEvent = now;

        if (e.deltaY > 0) {
            updateActiveImage(1);
        } else if (e.deltaY < 0) {
            updateActiveImage(-1);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            updateActiveImage(1);
        } else if (e.key === 'ArrowLeft') {
            updateActiveImage(-1);
        }
    });

    nextButton.addEventListener('click', () => updateActiveImage(1));
    backButton.addEventListener('click', () => updateActiveImage(-1));

    changeSection(0);

    // Function to change the current section and update navbar highlighting
    function changeSection(newIndex) {
        currentSectionIndex = newIndex; // Update the current section index
        sections[newIndex].scrollIntoView({ behavior: 'smooth' }); // Scroll to the new section

        // Update navbar highlighting
        navbarItems.forEach((item, idx) => {
            item.classList.toggle('active', idx === newIndex);
        });
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
    nextButton.addEventListener('click', () => updateActiveImage(1));
    backButton.addEventListener('click', () => updateActiveImage(-1));

    // Detect the end of the current section and snap to the next section
    sections.forEach((section, index) => {
        section.addEventListener('scroll', () => {
            const scrollWidth = section.scrollWidth;
            const scrollLeft = section.scrollLeft;
            const sectionWidth = section.offsetWidth;

            if (scrollLeft === scrollWidth - sectionWidth) {
                // Scrolled to the end of the section
                if (currentSectionIndex < sections.length - 1) {
                    changeSection(currentSectionIndex + 1);
                }
            }
        });
    });

    // Initialize the first section as active
    changeSection(0);
});
