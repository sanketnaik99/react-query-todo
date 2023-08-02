import Image from "next/image";
import { Inter } from "next/font/google";
import Task from "@/components/Task/Task";
import TodoForm from "@/components/TodoForm/TodoForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TaskSkeleton from "@/components/TaskSkeleton/TaskSkeleton";
import { Suspense } from "react";

export interface TasksResponse {
  data: Task[];
  page: number;
  count: number;
  perPage: number;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  isdone?: boolean;
  createdAt: number;
  updatedAt: number;
}

export default function Home() {
  // useQuery([key], queryFn, { config }})
  const tasksQuery = useQuery(
    ["ops"],
    () =>
      axios
        .get<TasksResponse>("https://api.tablebackend.com/v1/rows/kZCWhv3BlpXi")
        .then((res) => {
          console.log(res.data);
          return res.data;
        }),
    {
      staleTime: 1000 * 20, // How long the query remains fresh
    }
  );

  return (
    <main className={`flex min-h-screen flex-col items-center p-24`}>
      <TodoForm />
      <div className="mt-8 w-full">
        {tasksQuery.isLoading ? (
          <div className="flex flex-col gap-2">
            {[...Array(3)].map((_, i) => (
              <TaskSkeleton key={i} />
            ))}
          </div>
        ) : (
          tasksQuery.data?.data.map((task) => (
            <Task
              key={task._id}
              _id={task._id}
              title={task.title}
              description={task.description}
              isDone={!!task.isdone}
            />
          ))
        )}
      </div>
    </main>
  );
}
