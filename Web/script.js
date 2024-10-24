document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('scroll_video');
    const videoContainer = document.querySelector('.video_opener');
    const websiteContent = document.querySelector('.content');
    const clickMeButton = document.getElementById('scrollToBionote');
    const bionoteSection = document.querySelector('.bionote');

    // Preload the video
    video.preload = 'auto';
    // Disable native video controls
    video.controls = false;

    // Function to skip the video
    function skipVideo() {
        video.currentTime = video.duration;
    }

    // Add click event listener to skip the video
    document.addEventListener('click', skipVideo);

    // Play the video and transition to the website content when it ends
    video.addEventListener('ended', () => {
        videoContainer.classList.add('hidden');
        websiteContent.style.display = 'block';
    });

    // Automatically play the video when the page loads
    video.play();

    // Add scroll event listener for header
    window.addEventListener('scroll', function() {
        var header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    });

    // Add click event listener for the "click me" button
    if (clickMeButton) {
        clickMeButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (bionoteSection) {
                bionoteSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error('Bionote section not found');
            }
        });
    } else {
        console.error('Click me button not found');
    }
});