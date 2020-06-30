let musicPlay;

export function toggleMute() {
    const audio = document.getElementsByTagName('audio')[0];
    if (musicPlay == true) {
        musicPlay = false;
        audio.pause();
        // audio.muted() //= !audio.muted;
        document.getElementById('background-music').textContent = "Press M to unmute";
    } else {
        musicPlay = true;
        audio.play();
        // !audio.muted();
        document.getElementById('background-music').textContent = "Press M to mute";
    }
    return musicPlay;
}

