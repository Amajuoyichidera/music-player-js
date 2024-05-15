document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const volumeRange = document.getElementById('volumeRange');
    const progressBar = document.getElementById('progressBar');
    const playlist = document.getElementById('playlist');
    let currentSongIndex = 0;

    // Play/pause functionality
    playBtn.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playBtn.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playBtn.textContent = 'Play';
        }
    });

    // Previous song functionality
    prevBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + playlist.children.length) % playlist.children.length;
        playSong(playlist.children[currentSongIndex]);
    });

    // Next song functionality
    nextBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % playlist.children.length;
        playSong(playlist.children[currentSongIndex]);
    });

    // Volume adjustment
    volumeRange.addEventListener('input', function() {
        audioPlayer.volume = parseFloat(volumeRange.value);
    });

    // Update progress bar
    audioPlayer.addEventListener('timeupdate', function() {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = percent;
    });

    // Play song when clicking on playlist item
    playlist.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault(); // Prevent default link behavior
            playSong(event.target.parentNode);
        }
    });

    // Function to play a specific song
    function playSong(songElement) {
    const songUrl = songElement.querySelector('a').getAttribute('href');
    const songName = songElement.textContent.trim(); // Extract the song name
    const currentSongElement = document.getElementById('current-song');
    currentSongElement.textContent = songName; // Set the current song name
    audioPlayer.src = songUrl;
    audioPlayer.play();
    playBtn.textContent = 'Pause';
    }
});
