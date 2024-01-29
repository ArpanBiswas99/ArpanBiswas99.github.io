document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('.image-section'));
    let currentSectionIndex = 0;
    let currentImageIndex = 0;

    const navbarList = document.querySelector('.navbar ul');
    const navbarItems = navbarList.querySelectorAll('li');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');

    function showImage(newIndex) {
        const images = Array.from(sections[currentSectionIndex].querySelectorAll('img'));
        images.forEach((img, index) => {
            if (index === newIndex) {
                img.classList.add('focus');
            } else {
                img.classList.remove('focus');
            }
        });
    }

    function changeSection(newIndex) {
        sections[currentSectionIndex].querySelectorAll('img').forEach(img => img.classList.remove('visible', 'focus'));
        currentImageIndex = 0;
        currentSectionIndex = newIndex;
        sections[currentSectionIndex].querySelectorAll('img')[currentImageIndex].classList.add('visible');
        showImage(currentImageIndex);

        navbarItems.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentSectionIndex) {
                item.classList.add('active');
            }
        });

        if (currentSectionIndex === 0) {
            backButton.style.display = 'none';
        } else {
            backButton.style.display = 'block';
        }

        if (currentSectionIndex === sections.length - 1) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'block';
        }
    }

    function updateNavbarOnScroll() {
        const viewportWidth = window.innerWidth;
        const scrollX = window.scrollX;

        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionLeft = section.offsetLeft;
            const sectionRight = sectionLeft + section.clientWidth;

            if (scrollX >= sectionLeft && scrollX <= sectionRight) {
                changeSection(i);
                break;
            }
        }
    }

    function nextImage() {
        const images = sections[currentSectionIndex].querySelectorAll('img');
        if (currentImageIndex < images.length - 1) {
            showImage(++currentImageIndex);
        }
    }

    function previousImage() {
        if (currentImageIndex > 0) {
            showImage(--currentImageIndex);
        }
    }

    function nextSection() {
        if (currentSectionIndex < sections.length - 1) {
            changeSection(currentSectionIndex + 1);
        }
    }

    function previousSection() {
        if (currentSectionIndex > 0) {
            changeSection(currentSectionIndex - 1);
        }
    }

    nextButton.addEventListener('click', nextSection);
    backButton.addEventListener('click', previousSection);

    navbarItems.forEach((item, index) => {
        const link = item.querySelector('a');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            changeSection(index);
        });
    });

    changeSection(0);

    window.addEventListener('scroll', updateNavbarOnScroll);

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                previousSection();
                break;
            case 'ArrowRight':
                nextSection();
                break;
            case 'ArrowUp':
                previousImage();
                break;
            case 'ArrowDown':
                nextImage();
                break;
        }
    });
});
