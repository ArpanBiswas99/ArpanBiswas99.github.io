document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    let currentSectionIndex = 0;
    const navbarItems = document.querySelectorAll('.navbar li a');

    function activateSection(index) {
        const targetSection = sections[index];
        const images = targetSection.querySelectorAll('.image-wrapper img');
        const activeImage = targetSection.querySelector('.image-wrapper.active img');

        // Fade out the currently active image
        if (activeImage) {
            activeImage.style.opacity = 0;
            setTimeout(() => {
                activeImage.style.display = 'none';
            }, 500); // Adjust the duration of the fade out as needed
        }

        // Activate the next image and fade it in
        if (images.length > 0) {
            const nextImage = images[0];
            nextImage.style.display = 'block';
            setTimeout(() => {
                nextImage.style.opacity = 1;
            }, 100); // Adjust the duration of the fade in as needed
        }

        currentSectionIndex = index;

        // Update the active navigation item
        navbarItems.forEach(item => {
            item.classList.remove('active');
        });
        navbarItems[index].classList.add('active');
    }

    function showNextImage() {
        const currentSection = sections[currentSectionIndex];
        const images = currentSection.querySelectorAll('.image-wrapper img');
        const activeImage = currentSection.querySelector('.image-wrapper.active img');
        const currentIndex = Array.from(images).indexOf(activeImage);
        let newIndex = (currentIndex + 1) % images.length;

        // Fade out the currently active image
        if (activeImage) {
            activeImage.style.opacity = 0;
            setTimeout(() => {
                activeImage.style.display = 'none';
            }, 500); // Adjust the duration of the fade out as needed
        }

        // Activate the next image and fade it in
        const nextImage = images[newIndex];
        nextImage.style.display = 'block';
        setTimeout(() => {
            nextImage.style.opacity = 1;
        }, 100); // Adjust the duration of the fade in as needed
    }

    const backButton = document.querySelector('.back-section');
    const nextButton = document.querySelector('.next-section');

    nextButton.addEventListener('click', showNextImage);

    // Use Intersection Observer to track section visibility
    const observerOptions = {
        rootMargin: '0px',
        threshold: 0.5, // Adjust this threshold as needed
    };

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(sections).indexOf(entry.target);
                activateSection(index);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
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
