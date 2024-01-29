document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('.image-section'));
    let currentSectionIndex = 0;
    let currentImageIndex = 0;

    const navbarList = document.querySelector('.navbar ul');
    const navbarItems = navbarList.querySelectorAll('li');

    function changeSection(newIndex) {
        sections[currentSectionIndex].classList.remove('active');
        currentImageIndex = 0;
        currentSectionIndex = newIndex;
        sections[currentSectionIndex].classList.add('active');
        showImage(currentImageIndex);

        // Highlight the corresponding menu item
        navbarItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentSectionIndex) {
                item.classList.add('active');
            }
        });
    }

    function showImage(newIndex) {
        const images = Array.from(sections[currentSectionIndex].querySelectorAll('img'));
        images.forEach(img => img.style.display = 'none');
        images[newIndex].style.display = 'block';
    }

    function nextImage() {
        const images = sections[currentSectionIndex].querySelectorAll('img');
        if (currentImageIndex < images.length - 1) {
            showImage(++currentImageIndex);
        } else if (currentSectionIndex < sections.length - 1) {
            changeSection(currentSectionIndex + 1);
        }
    }

    function previousImage() {
        if (currentImageIndex > 0) {
            showImage(--currentImageIndex);
        } else if (currentSectionIndex > 0) {
            changeSection(currentSectionIndex - 1);
        }
    }

    // Scroll event listener to handle scrolling within a section
    window.addEventListener('wheel', (e) => {
        if (e.deltaY > 0) {
            nextImage();
        } else {
            previousImage();
        }
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('keydown', (e) => {
        if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
            nextImage();
        } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
            previousImage();
        }
    });

    document.querySelector('.next-section').addEventListener('click', nextImage);

    // Initialize the first section and image
    changeSection(0);
});
