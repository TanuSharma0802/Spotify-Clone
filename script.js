console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio('./music/Let me Love You.mp3');
let masterPlay = document.getElementById('masterPlay');
let ProgressBar = document.getElementById('ProgressBar');
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName: "Let me love you", filePath: "./music/Let me Love You.mp3", coverPath: "./covers/let me love you.jpg"},
    {songName: "Closer - Chainsmokers", filePath: "./music/Closer- Chainsmokers.mp3", coverPath: "./covers/Closer- Chainsmokers.jpg"},
    {songName: "Deewana kar raha hai", filePath: "./music/Deewana kar raha hai.mp3", coverPath: "./covers/Deewana kar raha hai.jpg"},
    {songName: "Kesariya - Bramhastra", filePath: "./music/Kesariya- Bramhastra.mp3", coverPath: "./covers/Kesariya- Bramhastra.jpg"},
    {songName: "Middle of the Night", filePath: "./music/Middle of the Night.mp3", coverPath: "./covers/Middle of the Night.jpg"},
    {songName: "Night Changes", filePath: "./music/Night Changes.mp3", coverPath: "./covers/Night Changes.jpg"},
    {songName: "Tum Mile - Lofi", filePath: "./music/Tum Mile Lofi.mp3", coverPath: "./covers/Tum Mile Lofi.jpg"},
    {songName: "Zara Zara - Jalraj", filePath: "./music/Zara Zara.mp3", coverPath: "./covers/Zara Zara.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        document.getElementById(`${songIndex}`).classList.remove("fa-circle-play");
        document.getElementById(`${songIndex}`).classList.add("fa-circle-pause");

    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        document.getElementById(`${songIndex}`).classList.remove("fa-circle-pause");
        document.getElementById(`${songIndex}`).classList.add("fa-circle-play");

    }
})

audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*1000);
    ProgressBar.value = progress;
})

ProgressBar.addEventListener('change',()=>{
    let progress = parseInt((ProgressBar.value/1000)*audioElement.duration);
    audioElement.currentTime = progress;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();        

        if(songIndex != parseInt(e.target.id))
        {
            songIndex = parseInt(e.target.id);
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime=0;
            audioElement.play();
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            document.getElementsByClassName("songinfo")[0].innerHTML = songs[songIndex].songName;
        }
        else if(!audioElement.paused)
        {
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            audioElement.pause();
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
        }
        else
        {
            audioElement.play();
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
        }
    })
})

document.getElementById("next").addEventListener('click',()=>{

    document.getElementById(`${songIndex}`).classList.remove("fa-circle-pause");
    document.getElementById(`${songIndex}`).classList.add("fa-circle-play");
    if(songIndex>=7){
        songIndex = 0;
    }
    else{
        songIndex = songIndex + 1;
    }
    document.getElementById(`${songIndex}`).classList.remove("fa-circle-play");
    document.getElementById(`${songIndex}`).classList.add("fa-circle-pause");
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    document.getElementsByClassName("songinfo")[0].innerHTML = songs[songIndex].songName;

    if(!audioElement.paused)
    {
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    }
})

document.getElementById("previous").addEventListener('click',()=>{

    document.getElementById(`${songIndex}`).classList.remove("fa-circle-pause");
    document.getElementById(`${songIndex}`).classList.add("fa-circle-play");
    if(songIndex<=0){
        songIndex = 7;
    }
    else{
        songIndex = songIndex - 1;
    }
    document.getElementById(`${songIndex}`).classList.remove("fa-circle-play");
    document.getElementById(`${songIndex}`).classList.add("fa-circle-pause");
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    document.getElementsByClassName("songinfo")[0].innerHTML = songs[songIndex].songName;

    if(!audioElement.paused)
    {
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    }
})

audioElement.addEventListener('ended',()=>{
    document.getElementById(`${songIndex}`).classList.remove("fa-circle-pause");
    document.getElementById(`${songIndex}`).classList.add("fa-circle-play");
    if(songIndex>=7){
        songIndex = 0;
    }
    else{
        songIndex = songIndex + 1;
    }
    document.getElementById(`${songIndex}`).classList.remove("fa-circle-play");
    document.getElementById(`${songIndex}`).classList.add("fa-circle-pause");
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime=0;
    audioElement.play();
    document.getElementsByClassName("songinfo")[0].innerHTML = songs[songIndex].songName;
})

/*Array.from(document.getElementsByClassName("timestamp")).forEach((element,i)=>{
    
    let SampleAudio = new Audio(songs[i].filePath);
    console.log(SampleAudio);
    let duration = SampleAudio.duration;
    let mins = duration/60;
    let secs = duration%60;
    console.log(mins,secs);
    element.innerHTML = `${mins}:${secs}`;
})*/

audioElement.addEventListener('playing',()=>{
    
    document.getElementById("container").style.backgroundImage = `url("${songs[songIndex].coverPath}")`;
    let bgI = document.getElementById("container").style;
    console.log(bgI);
})