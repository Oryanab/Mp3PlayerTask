function turnTime (time){
  if((Math.floor(time/60)).toString().length > 1 && (time%60).toString().length <=2){
      return `${Math.floor(time/60)}:${time%60}`
  }else if ((Math.floor(time/60)).toString().length >= 1 && (time%60).toString().length <2){
      return `0${Math.floor(time/60)}:${time%60}0`
  }
  return `0${Math.floor(time/60)}:${time%60}`
}

function durationToSeconds(duration) {
  let mm = duration[0] + duration[1];
  let ss = duration[3] + duration[4];
  return secondDuration = (+mm * 60 + +ss);
}

const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${turnTime(song.duration)}.`)
  },
}

function playSong(id) {
  for (let i in player.songs){
    if (player.songs[i].id === id){
        player.playSong(player.songs[i]) 
        return  
    }
    else{
       throw 'not ok';
    }
  }
  
}

function removeSong(id) {
  for (let i in player.songs){
      if (player.songs[i].id === id){
          player.songs.splice(player.songs.findIndex(song => song.id === id),1)
          // console.log(player.songs)
          for( let n in player.playlists){
              if (player.playlists[n].songs.includes(id)){
                player.playlists[n].songs.splice(player.playlists[n].songs.findIndex(item=> item===id),1)
                  // console.log(player.playlists)
              }
          }
          return  
      }
  }
  throw 'not ok';
}



function addSong(title, album, artist, duration, id) {

  function checkid(id){
    let idlist = []
    for (let i of player.songs){
        idlist.push(i.id)
    }
    if (id === undefined){
        return Math.max(...idlist)+1
    }else if(idlist.includes(id)){
        throw 'error'
    }else{
        return id
    }
  }
  
let newArr = {
  'id' : checkid(id),
  'title' : title,
  'album': album,
  'artist': artist,
  'duration': durationToSeconds(duration)
}

  player.songs.push(newArr)
  return player

}



function removePlaylist(id) {
  for (let i in player.playlists){
      if (player.playlists[i].id === id){
          player.playlists.splice(player.playlists.findIndex(playlist => playlist.id === id),1)
          console.log(player.playlists)
          return  
      }
  }
  throw 'not ok';
}

function createPlaylist(name, id) {
  
  function checkid(id){
  let idlist = []
  for (let i of player.playlists){
      idlist.push(i.id)
  }
  if (id === undefined){
      return Math.max(...idlist)+1
  }else if(idlist.includes(id)){
      throw 'error'
  }else{
      return id
  }
  
}
  
id = checkid(id)
let songs = []
player.playlists.push({
    id,
    name,
    songs
})
  return id
}

function playPlaylist(id) {
  for (let i of player.playlists){
    if (i.id === id){
        for (let n of i.songs){
            for (let i in player.songs){
                if (player.songs[i].id === n){
                player.playSong(player.songs[i])      
                }
        }
    }
    return  
}
    else{
       throw 'not ok';
    }
  }
}

function editPlaylist(playlistId, songId) {
  // check if the song id in playlist id
  // if yes and list.length>1 removeSong
  // if yes and list.length<1 removeplaylist
  // if not push song id
  for (let i of player.songs){
    if (i.id === songId){
        for(let n of player.playlists){
            if (n.id === playlistId){
                if (n.id === playlistId && n.songs.includes(songId) && n.songs.length>1){
                    n.songs.splice(n.songs.findIndex(song => song === songId),1)
                }else if(n.id === playlistId && n.songs.includes(songId) && n.songs.length<=1){
                    removePlaylist(playlistId)
                }else if(n.id === playlistId && n.songs.indexOf(songId)<0){
                    n.songs.push(songId)  
                }
                console.log(player.playlists)
                return
            }
           
        }
        throw 'not a playlist'
    }
}
throw 'not a song'
}

function playlistDuration(id) {
  // get all the secodeds durations added 
  // get all 
  let count = 0
  for(let n of player.playlists){
      if(n.id === id){
          for (let i of n.songs){
            for (let g of player.songs){
                if (g.id === i){
                    count += g.duration
                }
            }
        }
    }
  }
  return count
}

function searchByQuery(query) {
  songs = []
  playlists =[]
for(let i of player.songs){
    if(i.title.includes(query) || i.album.includes(query) || i.artist.includes(query)){
      songs.push(i);
    }
}
for(let n of player.playlists){
    if(n.name.includes(query)){
      playlists.push(n);
    }
}
return songs.sort(), playlists.sort()
}

function searchByDuration(duration) {
  // your code here
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
