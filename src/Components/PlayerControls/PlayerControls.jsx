import FullScreenButton from "../FullScreenButton/FullScreenButton";
import PlayPauseButton from "../../Common/PlayPauseButton/PlayPauseButton";
import ProgressBar from "../../Common/ProgressBar/ProgressBar";
import SeekButtons from "../../Common/SeekButtons/SeekButtons";
import TimeDisplay from "../../Common/TimeDisplay/TimeDisplay";
import VolumeControl from "../VolumeControl/VolumeControl.JSX";

const PlayerControls = ({
    isShow,
    isPlaying,
    onPlayPause,
    played,
    onSeek,
    duration,
    formatTime,
    onBackward,
    onForward,
    isMuted,
    volume,
    onMute,
    onVolumeChange,
    showVolumeSlider,
    toggleVolumeSlider,
    fullScreen,
    onFullScreen,
    volumeContainerRef,
    onVolumeTouchStart,
    onVolumeTouchMove,
    onVolumeTouchEnd,
}) => {
    return (
        <div
            // In PlayerControls.jsx - update the className
            className={`absolute bottom-0 left-0 right-0 bg-black/50 p-4  text-white z-10 ${
                isShow ? "" : "opacity-0 transition "
            }`}
            onClick={(e) => e.stopPropagation()} // Stop click propagation
            onTouchStart={(e) => e.stopPropagation()} // Stop touch propagation
            onTouchEnd={(e) => e.stopPropagation()} // Stop touch propagation
            onDoubleClick={(e) => e.stopPropagation()} // Stop double click propagation
        >
            <div className="flex flex-row items-center">
                <div className="flex items-center gap-3">
                    <PlayPauseButton isPlaying={isPlaying} onClick={onPlayPause} />
                </div>
                <div className="flex-1 mx-4">
                    <ProgressBar played={played} onChange={onSeek} />
                </div>
                <div className="flex items-center gap-3">
                    <TimeDisplay played={played} duration={duration} formatTime={formatTime} />
                    <SeekButtons onBackward={onBackward} onForward={onForward} />
                    <VolumeControl
                        isMuted={isMuted}
                        volume={volume}
                        onMute={onMute}
                        onVolumeChange={onVolumeChange}
                        showVolumeSlider={showVolumeSlider}
                        toggleVolumeSlider={toggleVolumeSlider}
                        containerRef={volumeContainerRef}
                        onTouchStart={onVolumeTouchStart}
                        onTouchMove={onVolumeTouchMove}
                        onTouchEnd={onVolumeTouchEnd}
                    />
                    <FullScreenButton fullScreen={fullScreen} onClick={onFullScreen} />
                </div>
            </div>
        </div>
    );
};

export default PlayerControls;
