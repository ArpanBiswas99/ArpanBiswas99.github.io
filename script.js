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
        // Scroll the active image or section into view at the start of the section
        const activeWrapper = targetSection.querySelector('.image-wrapper.active');
        if (activeWrapper) {
            activeWrapper.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        } else {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
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

    activateSection(0);
});
