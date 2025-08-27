import { AudioLines, Loader2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({
  url: initialUrl,
  messageId,
  requestAudio,
}: {
  url?: string;
  messageId: string;
  requestAudio: (id: string) => Promise<void>;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleRequest = async () => {
    try {
      setLoading(true);
      await requestAudio(messageId);
    } catch (err) {
      setLoading(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    console.log("Audio src:", audioRef.current.src);
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    if (initialUrl && initialUrl !== url) {
      setUrl(initialUrl);
      setLoading(false);
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 100);
    }
  }, [initialUrl]);

  return (
    <div className="flex items-center gap-2">
      {!url ? (
        loading ? (
          <div className="p-1 bg-[var(--pink)] text-white rounded-full shadow-lg cursor-pointer">
            <Loader2 className="animate-spin" size={18} />
          </div>
        ) : (
          <button
            onClick={handleRequest}
            className="bg-[var(--pink)] p-1 text-white rounded-full shadow-lg cursor-pointer"
          >
            <AudioLines size={18} />
          </button>
        )
      ) : (
        <>
          <button
            onClick={togglePlay}
            className="bg-[var(--pink)] p-1 text-white rounded-full shadow-lg cursor-pointer"
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <audio
            ref={audioRef}
            src={url}
            onEnded={() => setPlaying(false)}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            hidden
          />
        </>
      )}
    </div>
  );
}
