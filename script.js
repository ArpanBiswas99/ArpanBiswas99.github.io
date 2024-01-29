document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('.image-section'));
    let currentSectionIndex = 0;
    let currentImageIndex = 0;

    const navbarList = document.querySelector('.navbar ul');
    const navbarItems = navbarList.querySelectorAll('li');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');

    function changeSection(newIndex) {
        sections[currentSectionIndex].classList.remove('active');
        currentImageIndex = 0;
        currentSectionIndex = newIndex;
        sections[currentSectionIndex].classList.add('active');
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

    function showImage(newIndex) {
        const images = Array.from(sections[currentSectionIndex].querySelectorAll('img'));
        images.forEach(img => img.style.display = 'none');
        images[newIndex].style.display = 'block';
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

    changeSection(0);

    sections.forEach((section) => {
        section.addEventListener('scroll', () => {
            const scrollProgress = (section.scrollTop / (section.scrollHeight - section.clientHeight)) * 100;
            if (scrollProgress >= 95) {
                nextImage();
            }
        });
    });

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
