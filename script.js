document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('.image-section'));
    let currentSectionIndex = 0;
    let currentImageIndex = 0;

    const navbarList = document.querySelector('.navbar ul');
    const navbarItems = navbarList.querySelectorAll('li');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');

    function changeSection(newIndex) {
        sections[currentSectionIndex].querySelectorAll('img').forEach(img => img.classList.remove('visible'));
        currentImageIndex = 0;
        currentSectionIndex = newIndex;
        sections[currentSectionIndex].querySelectorAll('img')[currentImageIndex].classList.add('visible');

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
        images.forEach(img => img.classList.remove('visible'));
        images[newIndex].classList.add('visible');
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

    function updateNavbarOnScroll() {
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;

        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.clientHeight;

            if (scrollY >= sectionTop && scrollY <= sectionBottom) {
                changeSection(i);
                break;
            }
        }
    }

    nextButton.addEventListener('click', nextSection);
    backButton.addEventListener('click', previousSection);

    navbarItems.forEach((item, index) => {
        const link = item.querySelector('a');
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default anchor link behavior
            changeSection(index); // Change to the section that corresponds to the clicked navbar item
        });
    });

    changeSection(0); // Initialize the first section as active

    window.addEventListener('scroll', updateNavbarOnScroll);

    // Optional: If you want to navigate images within a section using keyboard arrows
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
