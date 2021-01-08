import { useState,useRef } from "react";
import Library from "./components/Library";

import Player from "./components/Player";
import Song from "./components/Song";
import data from "./data";

import Header from './components/Header';



import "./styles/app.scss";



function App() {

 const audioRef = useRef(null)

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setPlaying] = useState(false);
  const[open,setOpen] = useState(false);

 

  return (
    <div className={`App ${open ? "library-active": null}`}>
      <Header open={open} setOpen={setOpen}/>
      <Song isPlaying={isPlaying} songs={songs} currentSong={currentSong} />
      <Player
        setPlaying={setPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
     

      <Library open={open} setSongs={setSongs} audioRef={audioRef} setPlaying={setPlaying} setcurrentSong={setCurrentSong} songs={songs} isPlaying={isPlaying} />
    
    </div>
  );
}

export default App;
