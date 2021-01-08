import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  setSongs,
  setCurrentSong,
  songs,
  audioRef,
  currentSong,
  setPlaying,
  isPlaying,
}) => {
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentge: 0,
  });

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(newSongs);
  };

  const songEndHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (currentIndex < songs.length - 1) {
      await setCurrentSong(songs[currentIndex + 1]);
      audioRef.current.play();
    } else {
      await setCurrentSong(songs[0]);
      audioRef.current.play();
    }
  };

  const skipTrackHandler = (direction) => {

    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    setPlaying(true);

    const promisePlay = audioRef.current.play();
    if (promisePlay !== undefined) {
      promisePlay.then((audio) => {
        audioRef.current.play();
      });
    }
    if(direction === "shuffle"){
      const random = Math.floor(Math.random()*6);
    setCurrentSong(songs[random]);
    activeLibraryHandler(songs[random])
    
    }

    if (direction === "skip-forward") {
      if (currentIndex === songs.length - 1) {
        currentIndex = 0;
        setCurrentSong(songs[currentIndex]);
        activeLibraryHandler(songs[currentIndex]);
      } else {
        setCurrentSong(songs[currentIndex + 1]);
        activeLibraryHandler(songs[currentIndex + 1]);
      }
    } 
    if(direction==="skip-back") {
      if (currentIndex === 0) {
        currentIndex = songs.length;
        setCurrentSong(songs[currentIndex - 1]);
        activeLibraryHandler(songs[currentIndex - 1]);
      }
      activeLibraryHandler(songs[currentIndex - 1]);
      setCurrentSong(songs[currentIndex - 1]);
    }
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //Calculae percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);

    const animationPercentage = Math.round(
      (roundedCurrent / roundedDuration) * 100
    );

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentge: animationPercentage,
    });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  //Add the Styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentge}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : `0:00`}</p>
      </div>
      <div className="play-control">
        <div>
           <FontAwesomeIcon onClick={(e)=>{
             e.stopPropagation();
             skipTrackHandler("shuffle")}} size="2x" icon={faRandom} className="shuffle" />
        </div>
        <div className="player-btn">
          <FontAwesomeIcon
            onClick={() => skipTrackHandler("skip-back")}
            size="2x"
            icon={faAngleLeft}
            className="skip-back"
          />
          <FontAwesomeIcon
            onClick={() => {
              playSongHandler();
            }}
            size="2x"
            icon={!isPlaying ? faPlay : faPause}
            className="playing"
          />

          <FontAwesomeIcon
            onClick={() => skipTrackHandler("skip-forward")}
            size="2x"
            icon={faAngleRight}
            className="skip-forward"
          />
        </div>
      </div>
      <audio
        onEnded={songEndHandler}
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
