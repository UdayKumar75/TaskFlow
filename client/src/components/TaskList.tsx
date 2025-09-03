import React from "react";
import type { Task } from "@shared/schema";
import { useUpdateTask, useDeleteTask } from "@/hooks/useTasks";
import { useToast } from "@/hooks/use-toast";

interface TaskListProps {
  tasks: Task[];
  filter: "all" | "active" | "completed" | "high";
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, filter }) => {
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const { toast } = useToast();

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case "active":
        return !task.completed;
      case "completed":
        return task.completed;
      case "high":
        return task.priority === "high";
      default:
        return true;
    }
  });

  const handleToggleComplete = async (task: Task) => {
    try {
      await updateTask.mutateAsync({
        id: task.id,
        updates: { completed: !task.completed }
      });
      toast({
        title: task.completed ? "Task marked as incomplete" : "Task completed!",
        description: task.title,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "";
    }
  };

  const getPriorityBadge = (priority: string) => {
    const classes = {
      high: "px-2 py-1 bg-destructive/10 text-destructive text-xs rounded-full",
      medium: "px-2 py-1 bg-chart-4/10 text-chart-4 text-xs rounded-full",
      low: "px-2 py-1 bg-chart-3/10 text-chart-3 text-xs rounded-full",
    };
    return classes[priority as keyof typeof classes] || classes.medium;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const now = new Date();
    const taskDate = new Date(date);
    
    if (taskDate.toDateString() === now.toDateString()) {
      return "Today";
    }
    
    return taskDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <i className="fas fa-tasks text-4xl text-muted-foreground mb-4"></i>
          <p className="text-muted-foreground">No tasks found</p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${getPriorityClass(task.priority)} flex items-center space-x-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors ${
              task.completed ? "opacity-60" : ""
            }`}
            data-testid={`task-${task.id}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task)}
              className="w-5 h-5 rounded border-2 border-border checked:bg-primary checked:border-primary"
              data-testid={`task-checkbox-${task.id}`}
            />
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium truncate ${task.completed ? "line-through" : ""}`}>
                {task.title}
              </h4>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-muted-foreground">
                  <i className="fas fa-calendar-alt mr-1"></i>
                  {task.completed ? "Completed" : "Due"}: {formatDate(task.dueDate)}
                </span>
                <span className={getPriorityBadge(task.priority)}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>
              </div>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1 truncate">
                  {task.description}
                </p>
              )}
            </div>
            <button
              onClick={() => deleteTask.mutate(task.id)}
              className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              data-testid={`task-delete-${task.id}`}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))
      )}
    </div>
  );
};
