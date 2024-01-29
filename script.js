document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    let currentSectionIndex = 0;
    const allImages = document.querySelectorAll('.image-wrapper img');
    const navbarItems = document.querySelectorAll('.navbar li a');

    function activateSection(index) {
        allImages.forEach(img => {
            img.parentElement.classList.remove('active');
            img.style.opacity = 0; // Hide all images
        });

        const targetSection = sections[index];
        const images = targetSection.querySelectorAll('.image-wrapper img');
        
        images.forEach(img => {
            img.parentElement.classList.remove('active');
        });

        if (images.length > 0) {
            images[0].parentElement.classList.add('active');
            fadeIn(images[0]); // Fade in the first image
        }

        currentSectionIndex = index;

        // Update the active navigation item
        navbarItems.forEach(item => {
            item.classList.remove('active');
        });
        navbarItems[index].classList.add('active');
    }

    function fadeIn(element) {
        let opacity = 0;
        element.style.opacity = 0;
        const interval = setInterval(() => {
            if (opacity < 1) {
                opacity += 0.1;
                element.style.opacity = opacity;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }

    function showImage(offset) {
        const currentSection = sections[currentSectionIndex];
        const wrappers = currentSection.querySelectorAll('.image-wrapper');
        const activeWrapper = currentSection.querySelector('.image-wrapper.active');
        let newActiveIndex = Array.from(wrappers).indexOf(activeWrapper) + offset;
    
        if (newActiveIndex >= 0 && newActiveIndex < wrappers.length) {
            wrappers.forEach(wrapper => wrapper.classList.remove('active'));
            wrappers[newActiveIndex].classList.add('active');
    
            // Fade in the new active image
            const newActiveImage = wrappers[newActiveIndex].querySelector('img');
            fadeIn(newActiveImage);

            // Scroll horizontally to the new active image
            const mainElement = document.querySelector('main');
            mainElement.scroll({
                left: newActiveImage.offsetLeft,
                behavior: 'smooth',
            });
        } else if (newActiveIndex < 0 && currentSectionIndex > 0) {
            activateSection(currentSectionIndex - 1);
        } else if (newActiveIndex >= wrappers.length && currentSectionIndex < sections.length - 1) {
            activateSection(currentSectionIndex + 1);
        }
    }

    const backButton = document.querySelector('.back-section');
    const nextButton = document.querySelector('.next-section');

    nextButton.addEventListener('click', () => showImage(1));
    backButton.addEventListener('click', () => showImage(-1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            showImage(1);
        } else if (e.key === 'ArrowLeft') {
            showImage(-1);
        }
    });

    // Adjusted the scroll sensitivity
    let scrollTimeout;
    document.addEventListener('wheel', (e) => {
        e.preventDefault();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (e.deltaY > 10) {
                showImage(1);
            } else if (e.deltaY < -10) {
                showImage(-1);
            }
        }, 200);
    });

    // Linked navbar with scrolling and highlighted the sections
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            activateSection(index);
        });
    });

    // Detect section changes during scrolling and activate the corresponding section
    let isScrolling;
    document.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const viewportHeight = window.innerHeight;
            const scrollPosition = window.scrollY;

            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    activateSection(i);
                    break;
                }
            }
        }, 200);
    });

    // Link navbar items to sections
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            activateSection(index);
        });
    });

    // Function to update navbar based on the current section
    function updateNavbarActiveSection() {
        let currentSectionIndex = -1; // Default to an invalid value
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 50; // Add some offset to ensure the change happens a bit before the section reaches the top
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionIndex = index;
            }
        });

        // Update navbar items based on the current section
        navbarItems.forEach((item, index) => {
            if (index === currentSectionIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Debounce function to limit how often we check the scroll position
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Listen for scroll events and update the navbar
    window.addEventListener('scroll', debounce(updateNavbarActiveSection, 10));

    // Initial update in case the page is reloaded with a scroll position other than 0
    updateNavbarActiveSection();

    activateSection(0);
});
