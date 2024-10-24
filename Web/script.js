document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('scroll_video');
    const videoContainer = document.querySelector('.video_opener');
    const websiteContent = document.querySelector('.website_content');

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
        websiteContent.classList.remove('hidden');
    });

    // Automatically play the video when the page loads
    video.play();

    // Add this script to the bottom of your HTML file or include it in a separate JavaScript file
    window.addEventListener('scroll', function() {
        var header = document.querySelector('.header');
        if (window.scrollY > 0) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
    });
});