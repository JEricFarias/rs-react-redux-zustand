import { PlayCircle, Video } from "lucide-react";

interface LessonProps {
  title: string;
  duration: string;
  isCurrent?: boolean;
  onPlay: () => void;
}

export function Lesson({
  title,
  duration,
  isCurrent = false,
  onPlay,
}: LessonProps) {
  return (
    <button
      data-playing={isCurrent}
      disabled={isCurrent}
      onClick={onPlay}
      className="flex items-center gap-3 text-sm text-zinc-400 
        enabled:hover:text-zinc-300 hover:cursor-pointer data-[playing=true]:text-emerald-500"
    >
      {isCurrent ? (
        <PlayCircle className="w-4 h-4 text-emerald-500" />
      ) : (
        <Video className="w-4 h-4 text-zinc-500" />
      )}
      <span className="">{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  );
}
