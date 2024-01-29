document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.pdf-section');
    const navbarItems = document.querySelectorAll('.navbar li a');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    let currentSectionIndex = 0;
    let isScrolling;

    // Function to change the current section and highlight the navbar item
    function changeSection(index) {
        currentSectionIndex = index;
        navbarItems.forEach((item, idx) => item.classList.toggle('active', idx === index));
        sections[index].scrollIntoView({ behavior: 'smooth' });
    }

    // Function to handle next and back navigation
    function navigate(direction) {
        let newIndex = currentSectionIndex + direction;
        if (newIndex >= 0 && newIndex < sections.length) {
            changeSection(newIndex);
        }
    }

    // Scroll event listener for mouse wheel scrolling
    window.addEventListener('wheel', (e) => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            if (e.deltaY > 0) {
                navigate(1); // Scroll down
            } else {
                navigate(-1); // Scroll up
            }
        }, 66); // 66ms timeout for debouncing rapid scrolls
    }, false);

    // Event listeners for "Next" and "Back" buttons
    nextButton.addEventListener('click', () => navigate(1));
    backButton.addEventListener('click', () => navigate(-1));

    // Keyboard navigation with arrow keys
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            navigate(1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            navigate(-1);
        }
    });

    // Navigation bar item click event
    navbarItems.forEach((item, index) => {
        item.addEventListener('click', () => changeSection(index));
    });

    // Initialize the first section as active
    changeSection(0);
});
