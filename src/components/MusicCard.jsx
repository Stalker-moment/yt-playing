import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const MusicCard = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!data) return;

    // Extract current and total duration from the duration string
    const [current, total] = data.duration.split('/').map(d => d.trim());
    const [totalMin, totalSec] = total.split(':').map(Number);
    const totalDuration = (totalMin * 60) + totalSec;

    setDuration(totalDuration);

    const [currentMin, currentSec] = current.split(':').map(Number);
    const currentTime = (currentMin * 60) + currentSec;

    setCurrentTime(currentTime);
  }, [data]);

  useEffect(() => {
    if (duration > 0) {
      document.documentElement.style.setProperty('--value', `${(currentTime / duration) * 100}%`);
    }
  }, [currentTime, duration]);

  if (!data) {
    return (
      <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="text-gray-700 dark:text-white font-bold text-xl mb-2">No Data Available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <img className="w-full" src={data.thumbnail} alt={data.title} />
      <div className="px-6 py-4">
        <div className="text-gray-700 dark:text-white font-bold text-xl mb-2">{data.title}</div>
        <p className="text-gray-700 dark:text-white text-base">{data.artist}</p>
        <p className="text-gray-700 dark:text-white text-base">{data.channel}</p>
        <p className="text-gray-700 dark:text-white text-base">{data.views}</p>
        <div className="flex items-center">
          <button className="mr-2 mt-2 text-red-700 dark:text-red-500">
            <FontAwesomeIcon icon={data.isPlaying ? faPause : faPlay} size="1.5x" />
          </button>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            className="slider mt-2"
            disabled
          />
          <span className="mt-2 ml-2 text-gray-700 dark:text-white">
            {Math.floor(currentTime / 60)}:{currentTime % 60 < 10 ? `0${currentTime % 60}` : currentTime % 60}
          </span>
          <span className="mt-2 text-gray-700 dark:text-white ml-1"> / {data.durationFresh}</span>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Watch Now
        </a>
        <a
          href={data.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
        >
          Visit Channel
        </a>
      </div>
    </div>
  );
};

export default MusicCard;
