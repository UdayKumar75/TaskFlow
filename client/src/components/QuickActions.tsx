import React, { useState } from "react";
import { useCreateTask } from "@/hooks/useTasks";
import { useToast } from "@/hooks/use-toast";
import type { InsertTask } from "@shared/schema";

export const QuickActions: React.FC = () => {
  const [quickTaskTitle, setQuickTaskTitle] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<"high" | "medium" | "low">("medium");
  const [selectedDate, setSelectedDate] = useState("");
  
  const createTask = useCreateTask();
  const { toast } = useToast();

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTaskTitle.trim()) return;

    const taskData: InsertTask = {
      title: quickTaskTitle,
      priority: selectedPriority,
      completed: false,
      dueDate: selectedDate ? new Date(selectedDate) : null,
    };

    try {
      await createTask.mutateAsync(taskData);
      setQuickTaskTitle("");
      setSelectedDate("");
      toast({
        title: "Task created!",
        description: quickTaskTitle,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Task Card */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">Quick Add Task</h3>
        <form className="space-y-4" onSubmit={handleQuickSubmit}>
          <input
            type="text"
            placeholder="What needs to be done?"
            value={quickTaskTitle}
            onChange={(e) => setQuickTaskTitle(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            data-testid="quick-task-input"
          />
          <div className="grid grid-cols-2 gap-2">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as "high" | "medium" | "low")}
              className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              data-testid="quick-task-priority"
            >
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              data-testid="quick-task-date"
            />
          </div>
          <button
            type="submit"
            disabled={!quickTaskTitle.trim() || createTask.isPending}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
            data-testid="quick-task-submit"
          >
            {createTask.isPending ? "Adding..." : "Add Task"}
          </button>
        </form>
      </div>

      {/* Calendar Widget */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">Calendar</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">December 2024</h4>
            <div className="flex space-x-1">
              <button className="p-1 text-muted-foreground hover:text-foreground">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="p-1 text-muted-foreground hover:text-foreground">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          {/* Mini Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
              <div key={day} className="p-2 text-muted-foreground font-medium">
                {day}
              </div>
            ))}
            
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const isToday = day === 13;
              const hasTask = [15, 16, 20].includes(day);
              
              return (
                <div
                  key={day}
                  className={`p-2 relative ${
                    isToday 
                      ? "bg-primary text-primary-foreground rounded-lg font-medium" 
                      : "text-muted-foreground"
                  }`}
                >
                  {day}
                  {hasTask && !isToday && (
                    <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                      day === 15 ? "bg-destructive" : 
                      day === 16 ? "bg-chart-4" : 
                      "bg-chart-3"
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-primary-foreground">
        <h3 className="text-lg font-semibold mb-4">Weekly Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Tasks Completed:</span>
            <span className="font-bold">23</span>
          </div>
          <div className="flex justify-between">
            <span>Productivity Score:</span>
            <span className="font-bold">87%</span>
          </div>
          <div className="flex justify-between">
            <span>Focus Time:</span>
            <span className="font-bold">42h 15m</span>
          </div>
        </div>
      </div>
    </div>
  );
};
