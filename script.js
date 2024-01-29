document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    const navbarItems = document.querySelectorAll('.navbar li a');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    let currentSectionIndex = 0;
    let lastScrollTop = 0; // Track the last scroll position to determine scroll direction

    // Initialize first image in each section as active
    sections.forEach(section => {
        const images = section.querySelectorAll('.image-wrapper');
        images.forEach((img, index) => img.classList.toggle('active', index === 0));
    });

    const setActiveImage = (sectionIndex, imageIndex) => {
        const images = sections[sectionIndex].querySelectorAll('.image-wrapper');
        images.forEach((img, idx) => {
            img.classList.remove('active');
            if (idx === imageIndex) {
                img.classList.add('active');
            }
        });
    };

    const navigateSection = (direction) => {
        const currentImages = sections[currentSectionIndex].querySelectorAll('.image-wrapper');
        const activeImageIndex = Array.from(currentImages).findIndex(img => img.classList.contains('active'));
        let newImageIndex = activeImageIndex + direction;

        if (newImageIndex >= 0 && newImageIndex < currentImages.length) {
            // Move within the same section
            setActiveImage(currentSectionIndex, newImageIndex);
        } else if (newImageIndex < 0 && currentSectionIndex > 0) {
            // Move to the last image of the previous section
            currentSectionIndex--;
            const prevImages = sections[currentSectionIndex].querySelectorAll('.image-wrapper');
            setActiveImage(currentSectionIndex, prevImages.length - 1);
        } else if (newImageIndex >= currentImages.length && currentSectionIndex < sections.length - 1) {
            // Move to the first image of the next section
            currentSectionIndex++;
            setActiveImage(currentSectionIndex, 0);
        }

        // Update navbar highlighting
        navbarItems.forEach((item, index) => item.classList.toggle('active', index === currentSectionIndex));
    };

    // Scroll event to handle image navigation within sections
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            // Downscroll
            navigateSection(1);
        } else {
            // Upscroll
            navigateSection(-1);
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    }, false);

    // Event listeners for Next and Back buttons
    nextButton.addEventListener('click', () => navigateSection(1));
    backButton.addEventListener('click', () => navigateSection(-1));

    // Navbar click event for direct navigation
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSectionIndex = index;
            setActiveImage(index, 0); // Activate the first image in the clicked section
            navbarItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Initial setup
    navbarItems[currentSectionIndex].classList.add('active');
});
