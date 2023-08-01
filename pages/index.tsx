import Image from "next/image";
import { Inter } from "next/font/google";
import Task from "@/components/Task/Task";
import TodoForm from "@/components/TodoForm/TodoForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <TodoForm />
      <Task
        title={"Test Title"}
        description={"Test Description"}
        isDone={false}
      />
    </main>
  );
}
