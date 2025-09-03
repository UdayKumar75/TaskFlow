import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Dashboard } from "./Dashboard";
import { TaskList } from "./TaskList";
import { QuickActions } from "./QuickActions";
import { TaskModal } from "./TaskModal";
import { useTasks } from "@/hooks/useTasks";

export const TaskFlow: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("all");
  const [taskFilter, setTaskFilter] = useState<"all" | "active" | "completed" | "high">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tasks = [], isLoading } = useTasks();

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setSidebarOpen(false);
  };

  const getFilteredTasks = () => {
    if (activeView === "today") {
      return tasks.filter(t => {
        if (!t.dueDate) return false;
        return new Date(t.dueDate).toDateString() === new Date().toDateString();
      });
    }
    if (activeView === "week") {
      return tasks.filter(t => {
        if (!t.dueDate) return false;
        const weekFromNow = new Date();
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        return new Date(t.dueDate) <= weekFromNow;
      });
    }
    if (activeView === "completed") {
      return tasks.filter(t => t.completed);
    }
    if (activeView === "high") {
      return tasks.filter(t => t.priority === "high" && !t.completed);
    }
    return tasks;
  };

  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (activeView === "dashboard") {
      return <Dashboard tasks={tasks} />;
    }

    const filteredTasks = getFilteredTasks();

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Task Management Section */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {activeView === "today" ? "Today's Tasks" :
                 activeView === "week" ? "This Week's Tasks" :
                 activeView === "completed" ? "Completed Tasks" :
                 activeView === "high" ? "High Priority Tasks" :
                 "Recent Tasks"}
              </h3>
              <button 
                className="text-primary hover:text-primary/80 text-sm font-medium"
                data-testid="view-all-tasks"
              >
                View All
              </button>
            </div>
            {/* Task Filters */}
            <div className="flex space-x-2">
              {["all", "active", "completed", "high"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTaskFilter(filter as typeof taskFilter)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    taskFilter === filter
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  data-testid={`filter-${filter}`}
                >
                  {filter === "all" ? "All" :
                   filter === "active" ? "Active" :
                   filter === "completed" ? "Completed" :
                   "High Priority"}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            <TaskList tasks={filteredTasks} filter={taskFilter} />
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        tasks={tasks}
        activeView={activeView}
        onViewChange={handleViewChange}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-0">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-muted"
            data-testid="sidebar-toggle"
          >
            <i className="fas fa-bars text-muted-foreground"></i>
          </button>
          <h1 className="text-xl font-bold">
            {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
          </h1>
          <div className="w-8"></div>
        </div>

        {renderMainContent()}
      </main>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="floating-btn fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center z-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        data-testid="floating-add-task"
      >
        <i className="fas fa-plus text-xl"></i>
      </button>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
