import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark, faVolumeLow } from "@fortawesome/free-solid-svg-icons";

const VolumeControl = ({
    isMuted,
    volume,
    onMute,
    onVolumeChange,
    showVolumeSlider,
    toggleVolumeSlider,
    containerRef,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
}) => {
    const volumeIcon = isMuted ? faVolumeXmark : volume > 0.4 ? faVolumeHigh : volume > 0 ? faVolumeLow : faVolumeXmark;

    return (
        <div ref={containerRef} className="flex items-center gap-2 relative">
            <FontAwesomeIcon
                icon={volumeIcon}
                onClick={(e) => {
                    e.stopPropagation();
                    onMute();
                    toggleVolumeSlider();
                }}
                className="cursor-pointer text-2xl"
            />
            <div
                className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 h-24 bg-black/70 p-2 rounded ${
                    showVolumeSlider ? "block" : "hidden"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    type="range"
                    min={0}
                    max={1}
                    step="0.01"
                    value={volume}
                    onChange={onVolumeChange}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onClick={(e) => e.stopPropagation()}
                    className="h-full w-[5px] cursor-pointer appearance-none"
                    style={{
                        background: `linear-gradient(to top, #FF69B4 ${volume * 100}%, #333 ${volume * 100}%)`,
                        WebkitAppearance: "slider-vertical",
                        writingMode: "bt-lr",
                        MozAppearance: "slider-vertical",
                    }}
                />
            </div>
        </div>
    );
};

export default VolumeControl;
