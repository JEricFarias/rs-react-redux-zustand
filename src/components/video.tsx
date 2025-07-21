import Player from "react-player";
import { next, useCurrentLesson } from "../store/slices/player";
import { useAppDispatch, useAppSelector } from "../store";
import { Loader } from "lucide-react";

export function Video() {
  const dispatch = useAppDispatch();
  const { lesson } = useCurrentLesson();
  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  if (!lesson) return;

  return (
    <div className="w-full h-full bg-zinc-950 aspect-video">
      {isCourseLoading ? (
        <div className="flex items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <Player
          width="100%"
          height="100%"
          controls
          onEnded={() => dispatch(next())}
          src={`https://www/youtube.com/watch?v=${lesson.id}`}
        />
      )}
    </div>
  );
}
