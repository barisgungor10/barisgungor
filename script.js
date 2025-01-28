document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader-container');
    const content = document.body;
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');

    // Simple loader removal
    setTimeout(() => {
        loader.style.display = 'none'; // Hide the loader
        content.classList.remove('content-hidden');
    }, 1000);

    // Menu toggle functionality
    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.toggle('active');
        menuToggle.textContent = menuOverlay.classList.contains('active') ? 'Close' : 'Menu';
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            menuOverlay.classList.remove('active');
            menuToggle.textContent = 'Menu';
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for dynamic section visibility
    const sections = document.querySelectorAll('.section, .experience-item, .education-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay before adding the visible class
                setTimeout(() => {
                    entry.target.classList.add('visible'); // Add visible class when in view
                }, 150); // Reduced delay for faster visibility
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -50% 0px' // Trigger when the section is halfway in view
    });

    sections.forEach(section => {
        observer.observe(section); // Observe each section
    });

    const backToTopButton = document.getElementById('backToTop');

    // Show the button when scrolling down
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // Scroll to top when the button is clicked
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to top
        });
    });

    const projectItems = document.querySelectorAll('.project-item');
    let currentIndex = 0;

    // Function to show the current project
    function showProject(index) {
        projectItems.forEach((item, i) => {
            item.style.opacity = i === index ? '1' : '0.5'; // Show current project fully, others slightly transparent
        });
    }

    // Initially show the first project
    showProject(currentIndex);

    // Optional: Automatically cycle through projects every few seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % projectItems.length; // Cycle through projects
        showProject(currentIndex);
    }, 3000); // Change project every 3 seconds

    const projectList = document.querySelector('.project-list');
    let isDown = false;
    let startX;
    let scrollLeft;

    projectList.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - projectList.offsetLeft;
        scrollLeft = projectList.scrollLeft;
    });

    projectList.addEventListener('mouseleave', () => {
        isDown = false;
    });

    projectList.addEventListener('mouseup', () => {
        isDown = false;
    });

    projectList.addEventListener('mousemove', (e) => {
        if (!isDown) return; // Stop the fn from running
        e.preventDefault();
        const x = e.pageX - projectList.offsetLeft;
        const walk = (x - startX) * 1; // Scroll-fast
        projectList.scrollLeft = scrollLeft - walk;
    });

    // Mouse Tracker Functionality
    const mouseTracker = document.getElementById('mouse-tracker');

    document.addEventListener('mousemove', (e) => {
        mouseTracker.style.display = 'block'; // Show the tracker
        mouseTracker.style.left = `${e.pageX + 10}px`; // Position it slightly to the right of the cursor
        mouseTracker.style.top = `${e.pageY + 10}px`; // Position it slightly below the cursor
        mouseTracker.textContent = `X: ${e.pageX}, Y: ${e.pageY}`; // Update the coordinates
    });

    document.addEventListener('mouseleave', () => {
        mouseTracker.style.display = 'none'; // Hide the tracker when mouse leaves the window
    });

    // Mouse Tracker Lines Functionality
    const mouseTrackerLines = document.getElementById('mouse-tracker-lines');

    // Create two lines
    const line1 = document.createElement('div');
    line1.className = 'line';
    mouseTrackerLines.appendChild(line1);

    const line2 = document.createElement('div');
    line2.className = 'line';
    mouseTrackerLines.appendChild(line2);

    document.addEventListener('mousemove', (e) => {
        const x = e.pageX;
        const y = e.pageY;

        // Position the lines
        line1.style.left = `${x}px`;
        line1.style.top = `${y}px`;
        line2.style.left = `${x}px`;
        line2.style.top = `${y}px`;

        // Rotate the lines to point towards the cursor
        const angle = Math.atan2(y - (y - 100), x - x) * (180 / Math.PI);
        line1.style.transform = `rotate(${angle}deg)`;
        line2.style.transform = `rotate(${angle}deg)`;
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    document.getElementById('formFeedback').style.display = 'block'; // Show feedback message
    this.reset(); // Reset the form
});

let currentIndex = 0; // Track the current project index

function moveSlide(direction) {
    const projectList = document.querySelector('.project-list');
    const totalProjects = document.querySelectorAll('.project-item').length;

    // Update the current index based on the direction
    currentIndex += direction;

    // Loop back to the start or end if necessary
    if (currentIndex < 0) {
        currentIndex = totalProjects - 1; // Go to last project
    } else if (currentIndex >= totalProjects) {
        currentIndex = 0; // Go to first project
    }

    // Calculate the new position for the project list
    const offset = -currentIndex * 300; // Adjust based on the width of project items
    projectList.style.transform = `translateX(${offset}px)`; // Move the project list
}