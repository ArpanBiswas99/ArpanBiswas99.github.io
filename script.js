document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    let currentSectionIndex = 0;
    const allImages = document.querySelectorAll('.image-wrapper img');
    const navbarItems = document.querySelectorAll('.navbar li a');
    let currentImageIndex = 0;

    const order = [0, 1, 2, 3]; // Order of images within the first section

    function activateSection(index) {
        allImages.forEach(img => {
            img.parentElement.classList.remove('active');
            img.style.opacity = 0;
        });

        const targetSection = sections[index];
        const images = targetSection.querySelectorAll('.image-wrapper img');
        
        images.forEach(img => {
            img.parentElement.classList.remove('active');
        });

        if (images.length > 0) {
            currentImageIndex = 0;
            activateImage(images[currentImageIndex]);
        }

        currentSectionIndex = index;

        navbarItems.forEach(item => {
            item.classList.remove('active');
        });
        navbarItems[index].classList.add('active');
    }

    function activateImage(image) {
        image.parentElement.classList.add('active');
        fadeIn(image);
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

    function showNextImage() {
        const currentSection = sections[currentSectionIndex];
        const images = currentSection.querySelectorAll('.image-wrapper img');

        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            activateImage(images[currentImageIndex]);
        } else {
            if (currentSectionIndex < sections.length - 1) {
                activateSection(currentSectionIndex + 1);
            }
        }
    }

    function showPreviousImage() {
        const currentSection = sections[currentSectionIndex];
        const images = currentSection.querySelectorAll('.image-wrapper img');
        if (currentImageIndex > 0) {
            currentImageIndex--;
            activateImage(images[currentImageIndex]);
        } else {
            if (currentSectionIndex > 0) {
                activateSection(currentSectionIndex - 1);
            }
        }
    }

    const backButton = document.querySelector('.back-section');
    const nextButton = document.querySelector('.next-section');

    nextButton.addEventListener('click', showNextImage);
    backButton.addEventListener('click', showPreviousImage);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPreviousImage();
        }
    });

    let scrollTimeout;
    document.addEventListener('wheel', (e) => {
        e.preventDefault();
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (e.deltaY > 10) {
                showNextImage();
            } else if (e.deltaY < -10) {
                showPreviousImage();
            }
        }, 200);
    });

    navbarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            activateSection(index);
        });
    });

    let isScrolling;
    document.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const viewportHeight = window.innerHeight;
            const scrollPosition = window.scrollY;

            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                const sectionTop = section.offsetTop - 50;
                const sectionBottom = sectionTop + section.clientHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    activateSection(i);
                    break;
                }
            }
        }, 200);
    });

    navbarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            activateSection(index);
        });
    });

    function updateNavbarActiveSection() {
        let currentSectionIndex = -1;
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionIndex = index;
            }
        });

        navbarItems.forEach((item, index) => {
            if (index === currentSectionIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

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

    window.addEventListener('scroll', debounce(updateNavbarActiveSection, 10));

    updateNavbarActiveSection();

    activateSection(0);
});
