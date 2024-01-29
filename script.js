document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    const navbarItems = document.querySelectorAll('.navbar li a');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    let currentSectionIndex = 0;

    // Function to change the active image within a section
    const changeActiveImage = (section, direction) => {
        const activeWrapper = section.querySelector('.image-wrapper.active');
        const images = section.querySelectorAll('.image-wrapper');
        let newIndex = Array.from(images).indexOf(activeWrapper) + direction;

        if (newIndex >= 0 && newIndex < images.length) {
            activeWrapper.classList.remove('active', 'fade-in');
            activeWrapper.classList.add('fade-out');
            images[newIndex].classList.remove('fade-out');
            images[newIndex].classList.add('active', 'fade-in');
        }

        return newIndex;
    };

    // Function to activate a specific section
    const activateSection = (index) => {
        sections[currentSectionIndex].querySelector('.image-wrapper.active')?.classList.remove('active');
        const newActiveSection = sections[index];
        const firstImage = newActiveSection.querySelector('.image-wrapper');
        firstImage.classList.add('active', 'fade-in');

        navbarItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        currentSectionIndex = index;
        updateButtonVisibility();
    };

    // Update the visibility of next and back buttons
    const updateButtonVisibility = () => {
        backButton.style.display = currentSectionIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentSectionIndex === sections.length - 1 ? 'none' : 'block';
    };

    // Navigate to the next or previous section/image
    const navigate = (direction) => {
        const currentSection = sections[currentSectionIndex];
        const newIndex = changeActiveImage(currentSection, direction);

        if (newIndex < 0 && currentSectionIndex > 0) {
            activateSection(currentSectionIndex - 1);
        } else if (newIndex >= currentSection.querySelectorAll('.image-wrapper').length && currentSectionIndex < sections.length - 1) {
            activateSection(currentSectionIndex + 1);
        }
    };

    // Event listeners for next and back buttons
    nextButton.addEventListener('click', () => navigate(1));
    backButton.addEventListener('click', () => navigate(-1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            navigate(1);
        } else if (e.key === 'ArrowLeft') {
            navigate(-1);
        }
    });

    // Scroll navigation
    let lastScrollPosition = 0;
    window.addEventListener('wheel', (e) => {
        const delta = e.deltaY > 0 ? 1 : -1;

        if (Math.abs(lastScrollPosition - window.scrollY) < window.innerHeight * 0.9) {
            e.preventDefault();
            navigate(delta);
        }

        lastScrollPosition = window.scrollY;
    });

    // Navigation bar links
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            activateSection(index);
        });
    });

    // Initial activation of the first section
    activateSection(0);

    // Update navigation bar based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navbarItems.forEach((navItem, navIndex) => {
                    navItem.classList.toggle('active', index === navIndex);
                });
                currentSectionIndex = index;
                updateButtonVisibility();
            }
        });
    });
});
