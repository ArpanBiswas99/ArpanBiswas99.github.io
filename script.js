document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    let currentSectionIndex = 0;
    const navbarItems = document.querySelectorAll('.navbar li');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');

    // Function to activate a section and its first image
    function activateSection(index) {
        sections.forEach(section => {
            section.querySelectorAll('.image-wrapper').forEach(wrapper => {
                wrapper.classList.remove('active');
            });
        });

        const targetSection = sections[index];
        const firstImageWrapper = targetSection.querySelector('.image-wrapper');
        firstImageWrapper.classList.add('active');
        currentSectionIndex = index;

        navbarItems.forEach((item, idx) => {
            item.classList.remove('active');
            if (idx === index) {
                item.classList.add('active');
            }
        });

        targetSection.scrollIntoView({ behavior: 'smooth' });
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
