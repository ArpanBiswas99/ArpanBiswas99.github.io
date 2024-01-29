document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    let currentSectionIndex = 0;
    const allImages = document.querySelectorAll('.image-wrapper img'); // Select all images
    const navbarItems = document.querySelectorAll('.navbar li a'); // Select navbar items

    function activateSection(index) {
        // Deactivate all images first
        allImages.forEach(img => {
            img.parentElement.classList.remove('active'); // Remove 'active' from the wrapper
        });

        const targetSection = sections[index];
        const images = targetSection.querySelectorAll('.image-wrapper img');
        const activeImage = images[0]; // Display the first image by default
        activeImage.parentElement.classList.add('active');

        currentSectionIndex = index; // Update the current section index
        // Scroll the active image or section into view
        const activeWrapper = targetSection.querySelector('.image-wrapper.active');
        if (activeWrapper) {
            activeWrapper.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        } else {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        // Highlight the corresponding navbar item
        navbarItems.forEach(item => item.classList.remove('active'));
        navbarItems[index].classList.add('active');
    }

    // Navigate to the next or previous image within the current section
    function navigateImage(direction) {
        const currentSection = sections[currentSectionIndex];
        const images = Array.from(currentSection.querySelectorAll('.image-wrapper img'));
        let currentIndex = images.findIndex(img => img.parentElement.classList.contains('active'));
        let newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < images.length) {
            images[newIndex].parentElement.classList.add('active');
            images[currentIndex].parentElement.classList.remove('active');
            images[newIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
        }
    }

    function updateButtonVisibility() {
        backButton.style.display = currentSectionIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentSectionIndex === sections.length - 1 ? 'none' : 'block';
    }

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

    document.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY > 50) { // Adjust scroll sensitivity here
            showImage(1);
        } else if (e.deltaY < -50) { // Adjust scroll sensitivity here
            showImage(-1);
        }
    });

    // Linking navbar items with sections
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            activateSection(index);
        });
    });

    // Detecting when a section enters the viewport and updating the navbar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const index = sections.indexOf(entry.target);
                activateSection(index);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach((section) => {
        observer.observe(section);
    });

    activateSection(0);
});
