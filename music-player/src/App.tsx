import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";
import { ReactComponent as Next } from "../src/assets/next.svg";
import { ReactComponent as Pause } from "../src/assets/pause.svg";
import { ReactComponent as Play } from "../src/assets/play.svg";
import { ReactComponent as Previous } from "../src/assets/previous.svg";
import { ReactComponent as Shuffle } from "../src/assets/shuffle.svg";
import styles from "./App.module.scss";
import Button from "./components/Button";
import Divider from "./components/Divider";
import PlayListSong from "./components/PlayListSong";
import "./global.css";
import { allSongs } from "./mock";
import "./reset.css";
import { Song } from "./type/types";
import { randomArrayElements } from "./utils/utils";

const cx = classNames.bind(styles);

// 추후에 Audio Component를 따로 만들어서 forWardRef로 만들어예정
function App() {
  const [songArr, setSongArr] = useState<Song[]>(allSongs);
  const [audioSource, setAudioSource] = useState("");

  const [audioObject, setAudioObject] = useState(new Audio());
  const [prevAudioObject, setPrevAudioObject] = useState(audioObject);

  const [isPlaying, setIsPlaying] = useState(false);

  // 클릭한 노랙
  const [clickedSong, setClickedSong] = useState({
    title: "",
    artist: "",
    color: "gray",
  });
  const [previousClickedSong, setPreviousClickedSong] = useState(clickedSong);

  // firstSong
  // playlist에서 곡을 선택 안하구, player에서 선택했을떄?
  const handleFirstSong = () => {
    const firstSong = songArr[0];
    setClickedSong({
      title: firstSong.title,
      artist: firstSong.artist,
      color: "navy",
    });
  };

  //  셔플기능
  // 재생할때는, 음악이 저징되고 음악 리스트의 색상이 없어지고 ,
  // 화면의 제목도 사라진다
  const shuffleButtonFunction = () => {
    const randomArr = randomArrayElements(songArr);
    setSongArr(randomArr);
    audioObject.pause();
    setAudioSource("");
    setAudioObject(new Audio());
    setIsPlaying(false);
    setClickedSong({
      title: "",
      artist: "",
      color: "gray",
    });
    setPreviousClickedSong({
      title: "",
      artist: "",
      color: "gray",
    });
  };

  // play기능
  const playButtonFunction = () => {
    if (clickedSong.title === "" && clickedSong.artist === "") {
      handleFirstSong();
    }
    audioObject.play();
    setIsPlaying(true);
  };

  // pause기능
  const pauseButtonFunction = () => {
    audioObject.pause();
    setIsPlaying(false);
  };

  // next기능
  const currentIndex = songArr.findIndex(
    (song) =>
      song.title === clickedSong.title && song.artist === clickedSong.artist
  );

  const handleNextSong = () => {
    if (currentIndex === songArr.length - 1) return;
    const nextSong = songArr[currentIndex + 1];
    setClickedSong({
      title: nextSong.title,
      artist: nextSong.artist,
      color: "navy",
    });
  };

  const nextButtonFunction = () => {
    if (clickedSong.title === "" && clickedSong.artist === "") {
      handleFirstSong();
    } else {
      audioObject.pause();
      handleNextSong();
    }
    setIsPlaying(true);
  };

  // prev기능
  const handlePrevSong = () => {
    const prevSong = songArr[currentIndex - 1];
    setClickedSong({
      title: prevSong.title,
      artist: prevSong.artist,
      color: "navy",
    });
  };
  const prevButtonFunction = () => {
    if (currentIndex === 0) return;
    audioObject.pause();
    handlePrevSong();
    setIsPlaying(true);
  };

  // 삭제기능
  const handleDeleteButtonFunction = (event: Event, targetIdx: number) => {
    event?.stopPropagation();
    const copySongArr = [...songArr].filter((_, idx) => idx !== targetIdx);
    setSongArr(copySongArr);
    pauseButtonFunction();
  };

  const targetSongSrc = useMemo(
    () =>
      [...songArr].find(
        (song) =>
          song.title === clickedSong.title && song.artist === clickedSong.artist
      ),
    [clickedSong]
  )!;

  const handleResetButtonFunction = () => {
    setSongArr(allSongs);
  };

  useEffect(() => {
    if (clickedSong.title && clickedSong.artist) {
      setAudioSource(targetSongSrc.src);
      setAudioObject((prev) => {
        setPrevAudioObject(prev);
        return new Audio(targetSongSrc.src);
      });
    }
  }, [clickedSong]);

  const resetStructure = () => (
    <div className={cx("reset")} onClick={handleResetButtonFunction}>
      Reset Playlist
    </div>
  );

  return (
    <div className={cx("container")}>
      <div className={cx("player")}>
        <div className={cx("player-title")}>
          <Divider />
          <h1 className={cx("title")}>freeCodeCamp</h1>
          <Divider />
        </div>
        <div className={cx("player-content")}>
          <img
            src="https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/quincy-larson-album-art.jpg"
            alt="person"
          />
          <div className={cx("player-display")}>
            <div className={cx("artist-display")}>
              <p className={cx("song-title")}>{clickedSong.title}</p>
              <p className={cx("artist-name")}>{clickedSong.artist}</p>
            </div>
            <div className={cx("button-wrapper")}>
              <Button
                id="previous-button"
                aria-label="Previous"
                onClick={prevButtonFunction}
                disabled={currentIndex === 0 || currentIndex === -1}
                icons={Previous}
              />

              <Button
                className={cx(isPlaying && "yellow")}
                id="play-button"
                aria-label="Play"
                onClick={playButtonFunction}
                icons={Play}
              />

              <Button
                id="pause-button"
                aria-label="Pause"
                onClick={pauseButtonFunction}
                icons={Pause}
              />

              <Button
                id="next-button"
                aria-label="Next"
                onClick={nextButtonFunction}
                disabled={currentIndex === songArr.length - 1}
                icons={Next}
              />

              <Button
                id="shuffle-button"
                aria-label="Shuffle"
                onClick={shuffleButtonFunction}
                icons={Shuffle}
              />
            </div>
          </div>
        </div>
      </div>
      {/* playlist */}
      <div className={cx("playlist")}>
        <div className={cx("playlist-title")}>
          <Divider />
          <h1 className={cx("title")}>Playlist</h1>
          <Divider />
        </div>
        {songArr.length > 0 ? (
          <ul className={cx("playlist-songs")}>
            {songArr.map((song, idx) => (
              <PlayListSong
                key={song.id}
                title={song.title}
                artist={song.artist}
                duration={song.duration}
                clickedSong={clickedSong}
                previousClickedSong={previousClickedSong}
                isPlaying={isPlaying}
                audioSource={audioSource}
                audioObject={audioObject}
                prevAudioObject={prevAudioObject}
                onClick={() => {
                  setClickedSong((prev) => {
                    setPreviousClickedSong(prev);
                    return {
                      title: song.title,
                      artist: song.artist,
                      color: "navy",
                    };
                  });
                  setIsPlaying(true);
                }}
                handleDeleteButtonFunction={(e: Event) => {
                  handleDeleteButtonFunction(e, idx);
                }}
              ></PlayListSong>
            ))}
          </ul>
        ) : (
          resetStructure()
        )}
      </div>
    </div>
  );
}

export default App;
