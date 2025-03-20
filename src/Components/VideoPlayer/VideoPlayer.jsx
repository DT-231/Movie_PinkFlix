import React, { useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import Hls from "hls.js";
const VideoPlayer = ({
    url,
    playing,
    volume,
    muted,
    onProgress,
    onDuration,
    playerRef,
    fullScreen,
    onMouseOver,
    onMouseOut,
}) => {
    useEffect(() => {
        const videoElement = playerRef.current;
        if (videoElement && url && Hls.isSupported()) {
            const hsl = new Hls();
            hsl.loadSource(url);
            hsl.attachMedia(videoElement);
            hsl.on(Hls.Events.MANIFEST_PARSED, () => {
                videoElement.play();
            });
        }
    }, []);

    return (
        <ReactPlayer
            // playIsInline
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            config={{
                file: {
                    forceHLS: true,
                    hlsOptions: {
                        debug: true,
                    },
                },
            }}
            ref={playerRef}
            url={url}
            controls={false}
            playing={playing}
            volume={volume}
            muted={muted}
            onProgress={onProgress}
            onDuration={onDuration}
            width="100%"
            height={fullScreen ? "100vh" : "70vw"}
            style={{
                maxHeight: fullScreen ? "100vh" : "80vh",
                backgroundColor: "#000",
            }}
        />
    );
};

export default VideoPlayer;
