import React from 'react'

const LibrarySong = ({setSongs,isPlaying,audioRef,setPlaying,songs,song,currentSong,setcurrentSong,id}) => {
   
    return (
        <div onClick={async()=>{
                
          
         await  setcurrentSong(song);

          //add active state 
          const newSongs = songs.map((song)=>{
              if(song.id===id){
            return {
                ...song,
                active: true,

            }}else{
                return {
                    ...song,
                    active: false
                }

            }

          })

          setSongs(newSongs);

if(!isPlaying){
    setPlaying(true)
      audioRef.current.play()

        // console.log(playPromise);
        // if(playPromise !== undefined){
        //   playPromise.then((audio)=>{
        //       audioRef.current.play();
        //   })            
        // }
        

        }
           

            
        }} className={`library-song ${song.active ? 'selected': ""}`}>
           <img alt={currentSong.name} src={currentSong.cover}/>

        <div className="song-description">
         <h3>{currentSong.name}</h3>
         <h4>{currentSong.artist}</h4>   
        </div>
        </div>
            
        
    )
}

export default LibrarySong
