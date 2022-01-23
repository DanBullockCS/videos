import React from 'react';
import { useEffect } from 'react';
// import Home from './components/video-item';
import './App.css';
import YouTube from 'react-youtube';
import { videoArr } from './constants/constants';

function App() {
  const [videoID, setVideoID] = React.useState("");
  const opts: any = {
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      loop: 1,
      playlist: videoID
    },
  };

  const reload = () => { 
    setVideoID(videoArr[Math.floor(Math.random() * videoArr.length)]);
  }

  const _onReady = (event: any) => {
    event.target.playVideo();
  }

  const _onStateChange = (event: any) => {
    // If they try to pause it, unpause it. Not on my site buddy.
    // @ts-ignore
    if (event.data === YT.PlayerState.PAUSED) {
        event.target.playVideo();
    }
  }

  useEffect(() => {
    reload();
  }, []);

  return (
    <>
      <h1>[dan's random video]</h1>
      <p>no, you can't pause the video. go ahead try.</p>
      <p>is a video not working? <a href="mailto:danbullockcs@gmail.com" data-content="please let me know:">please let me know:</a></p>

      <button className="refresh-btn" onClick={reload}>click for a new video</button>
      <div className="video-container">
         <YouTube
            videoId={videoID}
            opts={opts}
            onReady={_onReady}
            onStateChange={(event: any) => _onStateChange(event)}
          />
      </div>

      <div className="bottom-stats">
         <p>this site is hosting: <span id="video-count">{videoArr.length}</span> videos</p>
      </div>
    </>
  );
}

export default App;
