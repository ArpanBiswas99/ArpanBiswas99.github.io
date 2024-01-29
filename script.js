document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    let currentSectionIndex = 0;
    const navbarItems = document.querySelectorAll('.navbar li');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');

    function activateSection(index) {
        sections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = sections[index];
        targetSection.classList.add('active');
        currentSectionIndex = index;
        updateButtonVisibility();
        highlightNavbarItem(index);
    }

    function updateButtonVisibility() {
        backButton.style.display = currentSectionIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentSectionIndex === sections.length - 1 ? 'none' : 'block';
    }

    function showImage(offset) {
        const newIndex = currentSectionIndex + offset;
        if (newIndex >= 0 && newIndex < sections.length) {
            activateSection(newIndex);
        }
    }

    function highlightNavbarItem(index) {
        navbarItems.forEach((item, idx) => {
            item.classList.remove('active');
            if (idx === index) {
                item.classList.add('active');
            }
        });
    }

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

    activateSection(0);
});
