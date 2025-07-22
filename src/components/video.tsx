import Player from "react-player";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../zustand-store";

export function Video() {
  const lesson = useCurrentLesson();
  const isLoading = useStore((state) => state.isLoading);
  const next = useStore((state) => state.next);

  if (!lesson) return;

  return (
    <div className="w-full h-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <Player
          width="100%"
          height="100%"
          controls
          onEnded={() => next()}
          src={`https://www/youtube.com/watch?v=${lesson.id}`}
        />
      )}
    </div>
  );
}
