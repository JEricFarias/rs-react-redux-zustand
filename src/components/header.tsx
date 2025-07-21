import { useAppSelector } from "../store";
import { useCurrentLesson } from "../store/slices/player";

export function Header() {
  const { module, lesson } = useCurrentLesson();
  const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  if (isCourseLoading) {
    return (
      <div className="flex flex-col gap-3 animate-pulse w-[300px]">
        <div className="h-3 bg-gray-700 rounded"></div>
        <div className="h-2 bg-gray-700 rounded max-w-[200px]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{lesson?.title}</h1>
      <span className="text-sm text-zinc-400">Módulo: {module?.title}</span>
    </div>
  );
}
