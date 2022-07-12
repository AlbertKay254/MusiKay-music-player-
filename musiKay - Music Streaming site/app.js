const music = new Audio('WUSYANAME.mp3');

// song Array 

const songs = [
    {
        id:'1',
        songName:` WUSYANAME <br> 
        <div class="subtitle">Tyler, the creator</div>`,
        poster: "Images/1.jpg"
       
    },
    {
        id:'2',
        songName:` Mary Magdalene <br> 
        <div class="subtitle">FKA Twigs</div>`,
        poster: "Images/2.jpg"
       
    },
    {
        id:'3',
        songName:` Money <br> 
        <div class="subtitle">Pink Floyd</div>`,
        poster: "Images/3.jpg"
       
    },
    {
        id:'4',
        songName:` Legend <br> 
        <div class="subtitle">Twenty One Pilots</div>`,
        poster: "Images/4.jpg"
       
    },
    {
        id:'5',
        songName:` LEMONHEAD <br> 
        <div class="subtitle">Tyler, the creator</div>`,
        poster: "Images/5.jpg"
       
    },
    {
        id:'6',
        songName:` Get Your Wish <br> 
        <div class="subtitle">Porter Robinson</div>`,
        poster: "Images/6.jpg"
       
    },
    {
        id:'7',
        songName:` Out of time <br> 
        <div class="subtitle">The Weeknd</div>`,
        poster: "Images/7.jpg"
       
    },
    {
        id:'8',
        songName:` Power Freaks <br> 
        <div class="subtitle">Jean Dawson</div>`,
        poster: "Images/8.jpg"
       
    },
    {
        id:'9',
        songName:` walking <br> 
        <div class="subtitle">Denzel Curry</div>`,
        poster: "Images/9.jpg"
       
    },
    {
        id:'10',
        songName:` DUCKWORTH <br> 
        <div class="subtitle">Kendrick Lamar</div>`,
        poster: "Images/10.jpg"
       
    },
    {
        id:'11',
        songName:` Shy Away <br> 
        <div class="subtitle">Twenty One Pilots</div>`,
        poster: "Images/11.jpg"
       
    },
    {
        id:'12',
        songName:` Family Ties <br> 
        <div class="subtitle">Baby Keem</div>`,
        poster: "Images/12.jpg"
       
    },
    {
        id:'13',
        songName:` Heard you are married <br> 
        <div class="subtitle">The Weeknd</div>`,
        poster: "Images/13.jpg"
       
    },
    {
        id:'14',
        songName:` Web <br> 
        <div class="subtitle">070 Shake</div>`,
        poster: "Images/14.jpg"
       
    },
    {
        id:'15',
        songName:` Zatoichi <br> 
        <div class="subtitle">Denzel Curry</div>`,
        poster: "Images/15.jpg"
       
    },
]

Array.from(document.getElementsByClassName('song-item')).forEach((Element, i)=>{
        Element.getElementsByTagName('img')[0].src = songs[i].poster;
        Element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

// Searching music

let search_results = document.getElementsByClassName('search_results')[0];

songs.forEach(Element => {
    const { id, songName, poster } = Element;
    let card = document.createElement('a');
    card.classList.add('card');
    card.href = `#` + id;
    card.innerHTML = `
    <img src="${poster}" alt="">
    <div class="content">
        ${songName}
    </div>
    `;
    search_results.appendChild(card);
});

let input = document.getElementsByTagName('input');

input.addEventListener('keyup', ()=> {
    let input_value = input.value();
    let items = search_results.getElementsByTagName('a');

    for (let i = 0; i < items.length; i++) {
        let as = items[i].getElementsByClassName('content')[0];
        let text_value = as.textContent || as.innerText;

        if (text_value().indexOf(input_value) > -1) {
            items[i].style.display = "flex";
        } else {
            items[i].style.display = "none";
        }

        if (input_value == 0) {
            search_results.style.display = "none";
        } else {
            
        }
        
    }
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];


masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0 ) {
        music.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        wave.classList.add('active2');
    } else {
        music.pause(); 
        masterPlay.classList.add('fa-play');
        masterPlay.classList.remove('fa-pause');
        wave.classList.remove('active2');
    }
})



const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playlistPlay')).forEach((Element)=>{
            Element.classList.add('fa-play-circle');
            Element.classList.remove('fa-pause-circle');
        })
} 

const makeAllBackgrounds = () =>{ 
    Array.from(document.getElementsByClassName('song-item')).forEach((Element)=>{
            Element.style.background = "rgb(105, 105, 170, 0)";
        })
} 

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let download_music = document.getElementById('download_music');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playlistPlay')).forEach((Element)=>{
    Element.addEventListener('click',(e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        music.src = ` Audio/${index}.mp3`;
        download_music.href = ` Audio/${index}.mp3`;
        poster_master_play.src = ` Images/${index}.jpg`;
        music.play();
           
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })
        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
            download_music.setAttribute('download', songName);
        })
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        wave.classList.add('active2');
        //music.addEventListener('ended',() =>{
        //    masterPlay.classList.add('fa-play');
        //     masterPlay.classList.remove('fa-pause');
        //    wave.classList.remove('active2');
        //})
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('song-item'))[`${index-1}`].style.background = "rgb(105, 105, 170, 0.1)";
    })
})



let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];


music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`;
    }
    currentEnd.innerHTML = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`;
    }
    currentStart.innerHTML = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
    //masterPlay.classList.add('fa-play');
    masterPlay.classList.add('fa-pause');
    wave.classList.add('active2');
    index ++;
    music.src = ` Audio/${index}.mp3`;
    poster_master_play.src = ` Images/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })
    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('song-item'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    makeAllPlays();
    document.getElementsByClassName('playlistPlay')[index-1].classList.remove('fa-play-circle');
    document.getElementsByClassName('playlistPlay')[index-1].classList.add('fa-pause-circle');
})



let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('fa-volume-down');
        vol_icon.classList.add('fa-volume-off');
        vol_icon.classList.remove('fa-volume-up');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('fa-volume-down');
        vol_icon.classList.remove('fa-volume-off');
        vol_icon.classList.remove('fa-volume-up');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('fa-volume-down');
        vol_icon.classList.remove('fa-volume-off');
        vol_icon.classList.add('fa-volume-up');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})



let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1) {
        index = Array.from(document,getElementsByClassName('song-item')).length;
    }
    music.src = ` Audio/${index}.mp3`;
    poster_master_play.src = ` Images/${index}.jpg`;
    music.play();
       
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })
    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('fa-play');
    document.getElementById(`${index}`).classList.add('fa-pause');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('song-item'))[`${index-1}`].style.background = "rgb(105, 105, 170, 0.1)";
})
next.addEventListener('click', () =>{
    index -= 0;
    index += 1;
    //if (index >  Array.from(document,getElementsByClassName('song-item')).length){
    //     index = 1;
    //}
    music.src = ` Audio/${index}.mp3`;
    poster_master_play.src = ` Images/${index}.jpg`;
    music.play()
       
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })
    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays();

    document.getElementById(`${index}`).classList.remove('fa-play');
    document.getElementById(`${index}`).classList.add('fa-pause');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('song-item'))[`${index-1}`].style.background = "rgb(105, 105, 170, 0.1)";
})

//
let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft = 100;
})
right_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 100;
})

let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let popular_artists = document.getElementsByClassName('popular_artists');

left_scrolls.addEventListener('click', ()=>{
    popular_artists.scrollLeft -= 100;
})
right_scrolls.addEventListener('click', ()=>{
    popular_artists.scrollLeft += 100;
})

let shuffle = document.getElementsByClassName('shuffle')[0];

shuffle.addEventListener('click', ()=>{
    let a = shuffle.innerHTML;
    
    switch (a) {
        case "next":
            shuffle.classList.add('fa-repeat');
            shuffle.classList.remove('fa-music');
            shuffle.classList.remove('fa-random');
            shuffle.innerHTML = "repeat";
            break;
        case "repeat":
            shuffle.classList.remove('fa-repeat');
            shuffle.classList.remove('fa-music');
            shuffle.classList.add('fa-random');
            shuffle.innerHTML = "random";
            break; 
        case "random":
            shuffle.classList.remove('fa-repeat');
            shuffle.classList.add('fa-music');
            shuffle.classList.remove('fa-random');
            shuffle.innerHTML = "next";
            break;       
    }
});

