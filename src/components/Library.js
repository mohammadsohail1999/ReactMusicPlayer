import React from "react";
import LibrarySong from "./LibrarySong";


const Library = ({ open, setSongs,isPlaying,audioRef,setPlaying,songs,setcurrentSong }) => {
  return (
    <div className={`library ${open ? "active-library":""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((el) => (
          <LibrarySong audioRef={audioRef} setPlaying={setPlaying} songs={songs}   id={el.id} song={el} setcurrentSong={setcurrentSong} key={el.id} currentSong={el} setSongs={setSongs} />
        ))}
      </div>

     
    </div>
  );
};

export default Library;
