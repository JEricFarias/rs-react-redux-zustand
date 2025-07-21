import { ChevronDown, MessageCircle } from "lucide-react";
import { Header } from "../components/header";
import { Video } from "../components/video";
import { Module } from "../components/module";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { loadCourse, useCurrentLesson } from "../store/slices/player";

export function Player() {
  const dispatch = useAppDispatch();
  const modules = useAppSelector((state) => state.player.course?.modules);
  const isLoading = useAppSelector((state) => state.player.isLoading);

  const { lesson } = useCurrentLesson();

  useEffect(() => {
    dispatch(loadCourse());
  }, [dispatch]);

  useEffect(() => {
    if (lesson) {
      document.title = lesson.title;
    }
  }, [lesson]);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button
            className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 
            text-sm font-medium text-white hover:bg-violet-600 hover:cursor-pointer"
          >
            <MessageCircle />
            Deixar feedback
          </button>
        </div>

        <main
          data-isLoading={isLoading}
          className="relative flex data-[isLoading=true]:h-[500px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80"
        >
          <div className="flex-1">
            <Video />
          </div>

          <aside
            className="w-80 absolute top-0 bottom-0 right-0 border-l border-zinc-800 
            bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-thumb-zinc-800 
            scrollbar-track-zinc-600 scrollbar-thumb-rounded-full divide-y divide-zinc-900"
          >
            {isLoading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="flex w-full items-center gap-3 bg-zinc-800 p-4 animate-pulse"
                    >
                      <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-900"></div>
                      <div className="flex flex-col flex-1 gap-2 text-left">
                        <strong className="h-3 bg-zinc-900 rounded"></strong>
                        <span className="h-2 bg-zinc-900 rounded w-1/2"></span>
                      </div>
                      <ChevronDown className="w-6 h-6 text-zinc-900" />
                    </div>
                  ))
              : modules?.map((module, index) => (
                  <Module
                    key={module.id}
                    amountOfLessons={module.lessons.length}
                    title={module.title}
                    moduleIndex={index}
                  />
                ))}
          </aside>
        </main>
      </div>
    </div>
  );
}
