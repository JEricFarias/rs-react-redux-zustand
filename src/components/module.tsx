import { ChevronDown } from "lucide-react";
import { Lesson } from "./lesson";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useStore } from "../zustand-store";

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const currentModuleIndex = useStore((state) => state.currentModuleIndex);
  const currentLessonIndex = useStore((state) => state.currentLessonIndex);
  const lessons = useStore(
    (state) => state.course?.modules[moduleIndex].lessons
  );
  const play = useStore((state) => state.play);

  return (
    <Collapsible.Root
      className="group"
      defaultOpen={currentModuleIndex === moduleIndex}
    >
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-zinc-800 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-900 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-6 h-6 ml-auto text-zinc-500 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((lesson, lessonIndex) => {
              const isCurrentLesson =
                currentModuleIndex === moduleIndex &&
                currentLessonIndex === lessonIndex;

              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  isCurrent={isCurrentLesson}
                  onPlay={() => play([moduleIndex, lessonIndex])}
                />
              );
            })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
