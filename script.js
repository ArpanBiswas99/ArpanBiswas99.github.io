document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    const navbarItems = document.querySelectorAll('.navbar li a');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    let currentSectionIndex = 0;

    // Initialize each section with the first image active
    sections.forEach(section => {
        const images = section.querySelectorAll('.image-wrapper');
        images.forEach((img, index) => img.classList.toggle('active', index === 0));
    });

    const updateActiveImage = (section, direction) => {
        const images = section.querySelectorAll('.image-wrapper');
        const activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
        const newIndex = activeIndex + direction;

        if (newIndex >= 0 && newIndex < images.length) {
            images[activeIndex].classList.remove('active', 'fade-in');
            images[activeIndex].classList.add('fade-out');
            images[newIndex].classList.add('active', 'fade-in');
            images[newIndex].classList.remove('fade-out');
        }

        return newIndex;
    };

    const navigate = (direction) => {
        const currentSection = sections[currentSectionIndex];
        const newIndex = updateActiveImage(currentSection, direction);

        // Check boundaries and move to next/previous section if needed
        if (newIndex < 0 && currentSectionIndex > 0) {
            currentSectionIndex--;
            const prevSection = sections[currentSectionIndex];
            const lastIndex = prevSection.querySelectorAll('.image-wrapper').length - 1;
            updateActiveImage(prevSection, lastIndex);
        } else if (newIndex >= currentSection.querySelectorAll('.image-wrapper').length && currentSectionIndex < sections.length - 1) {
            currentSectionIndex++;
            updateActiveImage(sections[currentSectionIndex], 0);
        }

        // Update navbar highlighting
        navbarItems.forEach((item, index) => item.classList.toggle('active', index === currentSectionIndex));
    };

    nextButton.addEventListener('click', () => navigate(1));
    backButton.addEventListener('click', () => navigate(-1));

    // Navbar click event for direct section navigation
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSectionIndex = index;
            sections.forEach((section, idx) => {
                const images = section.querySelectorAll('.image-wrapper');
                images.forEach((img, imgIdx) => img.classList.toggle('active', idx === index && imgIdx === 0));
            });
            navbarItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Update navbar highlight based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navbarItems.forEach(navItem => navItem.classList.remove('active'));
                navbarItems[index].classList.add('active');
                currentSectionIndex = index;
            }
        });
    });

    // Initialize navbar with the first section active
    navbarItems[0].classList.add('active');
});
