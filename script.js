document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.pdf-section');
    const navbarItems = document.querySelectorAll('.navbar li a');
    const nextButton = document.querySelector('.next-section');
    const backButton = document.querySelector('.back-section');
    let currentSectionIndex = 0;
    let currentPDFIndex = 0;

    function updateActiveSection(index) {
        currentSectionIndex = index;
        currentPDFIndex = 0; // Reset PDF index to show the first PDF in the new section
        navbarItems.forEach((item, idx) => item.classList.toggle('active', idx === index));
        scrollToCurrentPDF();
    }

    function updateActivePDFIndex(direction) {
        const currentSection = sections[currentSectionIndex];
        const pdfs = currentSection.querySelectorAll('.pdf-iframe');
        let newIndex = currentPDFIndex + direction;

        if (newIndex >= 0 && newIndex < pdfs.length) {
            currentPDFIndex = newIndex;
        } else if (newIndex < 0 && currentSectionIndex > 0) {
            updateActiveSection(currentSectionIndex - 1);
        } else if (newIndex >= pdfs.length && currentSectionIndex < sections.length - 1) {
            updateActiveSection(currentSectionIndex + 1);
        }

        scrollToCurrentPDF();
    }

    function scrollToCurrentPDF() {
        const currentSection = sections[currentSectionIndex];
        const pdfs = currentSection.querySelectorAll('.pdf-wrapper');
        if (pdfs[currentPDFIndex]) {
            pdfs[currentPDFIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    nextButton.addEventListener('click', () => updateActivePDFIndex(1));
    backButton.addEventListener('click', () => updateActivePDFIndex(-1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            updateActivePDFIndex(1);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            updateActivePDFIndex(-1);
        }
    });

    navbarItems.forEach((item, index) => {
        item.addEventListener('click', () => updateActiveSection(index));
    });

    // Initialize the first section and the first PDF as active
    updateActiveSection(0);
});