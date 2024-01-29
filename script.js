document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.image-section');
    const allImages = document.querySelectorAll('.image-wrapper img');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    const navbarItems = document.querySelectorAll('.navbar li');

    // Function to scroll the active image into the center of the viewport
    function centerActiveImage(img) {
        const imgRect = img.getBoundingClientRect();
        const scrollX = imgRect.left + window.scrollX - (window.innerWidth / 2) + (imgRect.width / 2);
        window.scrollTo({ left: scrollX, behavior: 'smooth' });
    }

    // Function to activate an image
    function activateImage(imageWrapper) {
        allImages.forEach(img => img.parentElement.classList.remove('active'));
        imageWrapper.classList.add('active');
        centerActiveImage(imageWrapper);
    }

    // Function to find the next image to activate
    function findNextImage(direction) {
        let activeImgIndex = Array.from(allImages).findIndex(img => img.parentElement.classList.contains('active'));
        let newActiveIndex = activeImgIndex + direction;
        if (newActiveIndex >= 0 && newActiveIndex < allImages.length) {
            return allImages[newActiveIndex].parentElement;
        }
        return null;
    }

    // Event listeners for next and previous buttons
    nextButton.addEventListener('click', () => {
        let nextImageWrapper = findNextImage(1);
        if (nextImageWrapper) activateImage(nextImageWrapper);
    });

    backButton.addEventListener('click', () => {
        let prevImageWrapper = findNextImage(-1);
        if (prevImageWrapper) activateImage(prevImageWrapper);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            let nextImageWrapper = findNextImage(1);
            if (nextImageWrapper) activateImage(nextImageWrapper);
        } else if (e.key === 'ArrowLeft') {
            let prevImageWrapper = findNextImage(-1);
            if (prevImageWrapper) activateImage(prevImageWrapper);
        }
    });

    // Initialize the first image as active
    if (allImages.length > 0) activateImage(allImages[0].parentElement);
});
