'use client';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, Volume1, VolumeX } from 'lucide-react';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const SliderTrack = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.2);
  border-radius: 9999px;
  cursor: pointer;
`;

const SliderFill = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: white;
  border-radius: 9999px;
`;

const CustomSlider = ({ value, onChange, style }) => (
  <SliderTrack
    style={style}
    onClick={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      onChange(Math.min(Math.max(percentage, 0), 100));
    }}
  >
    <SliderFill
      style={{ width: `${value}%` }}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    />
  </SliderTrack>
);

const Wrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 56rem;
  margin: 0 auto;
  border-radius: 0.75rem;
  overflow: hidden;
  background: rgba(17,17,17,0.6);
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  backdrop-filter: blur(4px);
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const AspectBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
`;

const ControlsBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0.5rem;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem;
  background: rgba(17,17,17,0.6);
  backdrop-filter: blur(12px);
  border-radius: 1rem;
`;

const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TimeText = styled.span`
  color: white;
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const VolumeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const SpeedGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const IconBtn = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  &:hover { background: rgba(17,17,17,0.82); }
`;

const SpeedBtn = styled.button`
  background: ${({ $active }) => $active ? 'rgba(17,17,17,0.82)' : 'transparent'};
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background 0.15s;
  &:hover { background: rgba(17,17,17,0.82); }
`;

const PosterOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  background: ${({ $isLogo }) => $isLogo ? '#0F172A' : 'rgba(0,0,0,0.3)'};
`;

const PosterImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: ${({ $isLogo }) => $isLogo ? 'contain' : 'cover'};
  ${({ $isLogo }) => $isLogo ? 'padding: 3rem; filter: brightness(0) invert(1);' : ''}
`;

const PlayCircle = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
`;

const PlayTriangle = styled.div`
  width: 0;
  height: 0;
  border-top: 12px solid transparent;
  border-bottom: 12px solid transparent;
  border-left: 20px solid #3B82F6;
  margin-left: 3px;
`;

const VideoPlayer = ({ src, poster, isLogo }) => {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(!poster);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const startFromPoster = () => {
    setStarted(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setIsPlaying(true);
        setShowControls(true);
      }
    }, 50);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value) => {
    if (videoRef.current) {
      const newVolume = value / 100;
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const prog = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isFinite(prog) ? prog : 0);
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value) => {
    if (videoRef.current && videoRef.current.duration) {
      const time = (value / 100) * videoRef.current.duration;
      if (isFinite(time)) {
        videoRef.current.currentTime = time;
        setProgress(value);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted) {
        setVolume(0);
      } else {
        setVolume(1);
        videoRef.current.volume = 1;
      }
    }
  };

  const setSpeed = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
    }
  };

  return (
    <Wrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {poster && !started ? (
        <AspectBox>
          <PosterOverlay onClick={startFromPoster} $isLogo={isLogo}>
            <PosterImg src={poster} alt="Video preview" $isLogo={isLogo} />
            <PlayCircle whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <PlayTriangle />
            </PlayCircle>
          </PosterOverlay>
        </AspectBox>
      ) : (
        <Video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          src={src}
          onClick={togglePlay}
        />
      )}

      <AnimatePresence>
        {showControls && (
          <ControlsBar
            initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: 'circInOut', type: 'spring' }}
          >
            <TimeRow>
              <TimeText>{formatTime(currentTime)}</TimeText>
              <CustomSlider value={progress} onChange={handleSeek} style={{ flex: 1 }} />
              <TimeText>{formatTime(duration)}</TimeText>
            </TimeRow>

            <BottomRow>
              <LeftControls>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <IconBtn onClick={togglePlay}>
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </IconBtn>
                </motion.div>
                <VolumeGroup>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <IconBtn onClick={toggleMute}>
                      {isMuted ? <VolumeX size={20} /> : volume > 0.5 ? <Volume2 size={20} /> : <Volume1 size={20} />}
                    </IconBtn>
                  </motion.div>
                  <div style={{ width: 96 }}>
                    <CustomSlider value={volume * 100} onChange={handleVolumeChange} />
                  </div>
                </VolumeGroup>
              </LeftControls>

              <SpeedGroup>
                {[0.5, 1, 1.5, 2].map((speed) => (
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} key={speed}>
                    <SpeedBtn $active={playbackSpeed === speed} onClick={() => setSpeed(speed)}>
                      {speed}x
                    </SpeedBtn>
                  </motion.div>
                ))}
              </SpeedGroup>
            </BottomRow>
          </ControlsBar>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default VideoPlayer;
