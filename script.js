document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('scroll_video');
    const videoContainer = document.querySelector('.video_opener');
    const websiteContent = document.querySelector('.content');
    const clickMeButton = document.getElementById('scrollToBionote');
    const bionoteSection = document.querySelector('.bionote');
    const scrollToProjectsButton = document.getElementById('scrollToProjects');
    const scrollLine = document.getElementById('scrollLine');
    const projectTitles = document.querySelectorAll('.project-title');
    const hoverBox = document.querySelector('.hover-box');
    const hoverBoxItems = hoverBox.querySelectorAll('li');

    hoverBoxItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.querySelector(`.${targetId}`);
            if (targetSection) {
                const scrollTarget = targetSection.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({
                    top: scrollTarget,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video related code
    if (video) {
        video.preload = 'auto';
        video.controls = false;
    
        function skipVideo() {
            video.currentTime = video.duration;
        }
    
        // Hide scroll line when the page loads (assuming video starts playing immediately)
        hideScrollLine();
    
        // Change this line to only apply to the video container
        videoContainer.addEventListener('click', skipVideo);
    
        video.addEventListener('ended', () => {
            videoContainer.classList.add('hidden');
            websiteContent.style.display = 'block';
            showScrollLine(); // Show scroll line when video ends
        });
    
        video.play();
    } else {
        // If there's no video, show the scroll line immediately
        showScrollLine();
    }

    // Header hide/show on scroll
    window.addEventListener('scroll', function() {
        var header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    });

    // Scroll to bionote section
    if (clickMeButton && bionoteSection) {
        clickMeButton.addEventListener('click', function(e) {
            e.preventDefault();
            bionoteSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Scroll to projects function
     function scrollToProjects(e) {
        e.preventDefault();
        console.log('scrollToProjects function called');

        if (!bionoteSection) {
            console.error('Bionote section not found');
            return;
        }

        console.log('Bionote section:', bionoteSection);

        const scrollTarget = bionoteSection.getBoundingClientRect().top + window.pageYOffset - 100;
        console.log('Scroll target:', scrollTarget);

        window.scrollTo({
            top: scrollTarget,
            behavior: 'smooth'
        });
    }

    if (scrollToProjectsButton) {
        console.log('Adding event listener to scrollToProjectsButton');
        scrollToProjectsButton.addEventListener('click', scrollToProjects);
    } else {
        console.error('Scroll to projects button not found');
    }

    console.log('All buttons:', document.querySelectorAll('button'));
    console.log('scrollToProjectsButton:', scrollToProjectsButton);

    // Project titles hover effect
    projectTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.setProperty('--scale', '1');
        });
        title.addEventListener('mouseleave', function() {
            this.style.setProperty('--scale', '0');
        });
    });

    const projectsSection = document.querySelector('.curriculum_vitae'); // Adjust this selector if needed

    function updateScrollLine() {
        if (scrollLine.style.opacity === '0') return; // Don't update if the line is hidden
    
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const maxScroll = documentHeight - windowHeight;
    
        // Calculate the progress of scrolling (0 to 1)
        const scrollProgress = scrollPosition / maxScroll;
    
        // Calculate the height of the line based on scroll progress
        const lineHeight = scrollProgress * windowHeight;
    
        // Calculate the position of the circle
        const circlePosition = Math.min(lineHeight, windowHeight - 5); // 5px offset to keep circle fully visible
    
        // Apply the height and circle position with a smooth transition
        requestAnimationFrame(() => {
            scrollLine.style.height = `${lineHeight}px`;
            scrollLine.style.setProperty('--circle-position', `${circlePosition}px`);
        });
    }
    
    // Use throttle to limit the number of times updateScrollLine is called
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Use the throttled version of updateScrollLine
    const throttledUpdateScrollLine = throttle(updateScrollLine, 10);
    
    window.addEventListener('scroll', throttledUpdateScrollLine);
    window.addEventListener('resize', throttledUpdateScrollLine);
    
    // Initial call to set the line height correctly on page load
    updateScrollLine();
    
    function hideScrollLine() {
        if (scrollLine) {
            scrollLine.style.opacity = '0';
            scrollLine.style.pointerEvents = 'none';
        }
    }
    
    function showScrollLine() {
        if (scrollLine) {
            scrollLine.style.opacity = '1';
            scrollLine.style.pointerEvents = 'auto';
        }
    }
});