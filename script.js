let songs;

function createSongListItem(songName) {
    let li = document.createElement('li');

    let img1 = document.createElement('img');
    img1.classList.add('invert');
    img1.src = "./svg's/music.svg";

    let div = document.createElement('div');
    div.textContent = songName.replace('.mp3', '');

    let img2 = document.createElement('img');
    img2.classList.add('invert');
    img2.src = "./svg's/play.svg";

    li.appendChild(img1);
    li.appendChild(div);
    li.appendChild(img2);

    return li;
}



function convertSecondsToMinutes(seconds) {
    if(isNaN(seconds)||(seconds)<0){
        return "00:00"
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Format minutes and seconds to be two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


async function getsongs(url) {
    

    let response = await fetch(url);
    let text = await response.text();

    // Create a temporary div to parse the HTML
    let div = document.createElement("div");
    div.innerHTML = text;

    // Extract all anchor tags
    let anchorTags = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < anchorTags.length; index++) {
        let element = anchorTags[index];
        let href = element.href;

        // Check if the href ends with .mp3
        if (href.endsWith(".mp3")) {
            songs.push(href);
        }
    }
    return songs;
}

//  playing song
const currentSong=new Audio;
const playMusic= (track)=>{
    currentSong.src="/songs/"+track+ ".mp3"
    currentSong.play();
    play.src="./svg's/pause.svg"
    document.querySelector(".songInfo").innerHTML=track
    document.querySelector(".songTime").innerHTML="00:00/00:00"
}



// MAIN FUNCTION  IS HERE -------->
async function main() {
    const url = "http://127.0.0.1:5500/songs";
    songs = await getsongs(url);
    

    // add song to library
    let songUl = document.querySelector(".songlist ul");
    for (const song of songs) {
        let li = createSongListItem(song.split("/songs/")[1]);
        songUl.appendChild(li);
    }
    // song added to library

    // playsong
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            console.log(e.querySelector("div").textContent);
            playMusic(e.querySelector("div").textContent)
        })
        
    })
    // song played

    // change by play - pause button 
    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src="./svg's/pause.svg"
        }
        else{
            currentSong.pause()
            play.src="./svg's/play.svg"

        }
    })

    // add eventlistner to previous button
    previous.addEventListener("click",()=>{
        console.log("previous clicked");
        let index= songs.indexOf(currentSong.src);
        if((index-1)>=0){
            var songSrc = songs[index-1];
            var songsIndex = songSrc.indexOf('/songs/') + '/songs/'.length;
            var mp3Index = songSrc.indexOf('.mp3');
            var track = songSrc.substring(songsIndex, mp3Index);
            playMusic(track);
        } 
    })



    // add eventlistner to previous button
    next.addEventListener("click",()=>{
        console.log("next clicked");
        let index= songs.indexOf(currentSong.src);
        if((index+1)>length){
            var songSrc = songs[index+1];
            var songsIndex = songSrc.indexOf('/songs/') + '/songs/'.length;
            var mp3Index = songSrc.indexOf('.mp3');
            var track = songSrc.substring(songsIndex, mp3Index);
            playMusic(track);
        }        
    })




    
    // a function to set playtime of songs
    currentSong.addEventListener("timeupdate",()=>{
        console.log(currentSong.currentTime, currentSong.duration);
        document.querySelector(".songTime").innerHTML=convertSecondsToMinutes(currentSong.currentTime)+"/"+convertSecondsToMinutes(currentSong.duration);
        document.querySelector(".circle").style.left= (currentSong.currentTime/currentSong.duration)*100+ "%";
    })


    // add eventlistner to seekbar
    document.querySelector(".seekbar").addEventListener("click",e=>{
        var percent =(e.offsetX/e.target.getBoundingClientRect().width)*100
        document.querySelector(".circle").style.left= percent + "%";
        currentSong.currentTime= ((currentSong.duration)*percent)/100;
    })

    // add eventlistner to hamburger and close 
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0";
        document.querySelector(".right").style.opacity="80%";
    })

    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-110%";
    })


    


}
main();


