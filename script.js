document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('.image-section'));
    let currentSectionIndex = 0;
    let currentImageIndex = 0;

    const navbarList = document.querySelector('.navbar ul');
    const navbarItems = navbarList.querySelectorAll('li');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');

    // Function to change the currently visible section
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

    // Function to show a specific image within the current section
    function showImage(newIndex) {
        const images = Array.from(sections[currentSectionIndex].querySelectorAll('img'));
        images.forEach(img => img.classList.remove('visible'));
        images[newIndex].classList.add('visible');
    }

    // Function to show the next image in the current section
    function nextImage() {
        const images = sections[currentSectionIndex].querySelectorAll('img');
        if (currentImageIndex < images.length - 1) {
            showImage(++currentImageIndex);
        }
    }

    // Function to show the previous image in the current section
    function previousImage() {
        if (currentImageIndex > 0) {
            showImage(--currentImageIndex);
        }
    }

    // Function to navigate to the next section
    function nextSection() {
        if (currentSectionIndex < sections.length - 1) {
            changeSection(currentSectionIndex + 1);
        }
    }

    // Function to navigate to the previous section
    function previousSection() {
        if (currentSectionIndex > 0) {
            changeSection(currentSectionIndex - 1);
        }
    }

    // Function to update the scrollbar position based on the current section
    function updateScrollbar() {
        const scrollPercentage = (currentSectionIndex / (sections.length - 1)) * 100;
        document.documentElement.style.scrollBehavior = 'auto';
        document.documentElement.scrollLeft = scrollPercentage;
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    // Event listeners for next and back buttons
    nextButton.addEventListener('click', nextSection);
    backButton.addEventListener('click', previousSection);

    // Event listeners for navbar links
    navbarItems.forEach((item, index) => {
        const link = item.querySelector('a');
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default anchor link behavior
            changeSection(index); // Change to the section that corresponds to the clicked navbar item
            updateScrollbar(); // Update the scrollbar position
        });
    });

    // Initialize the first section as active
    changeSection(0);

    // Optional: If you want to navigate images within a section using keyboard arrows
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Event listener for smooth horizontal scrolling
    document.documentElement.addEventListener('scroll', () => {
        const scrollPercentage = (document.documentElement.scrollLeft / (document.documentElement.scrollWidth - window.innerWidth)) * 100;
        const sectionIndex = Math.round((sections.length - 1) * (scrollPercentage / 100));
        if (sectionIndex !== currentSectionIndex) {
            changeSection(sectionIndex);
        }
    });
});
