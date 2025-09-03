import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import type { Task } from "@shared/schema";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  tasks,
  activeView,
  onViewChange,
}) => {
  const { theme, toggleTheme } = useTheme();

  const stats = {
    total: tasks.length,
    today: tasks.filter(t => {
      if (!t.dueDate) return false;
      return new Date(t.dueDate).toDateString() === new Date().toDateString();
    }).length,
    thisWeek: tasks.filter(t => {
      if (!t.dueDate) return false;
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      return new Date(t.dueDate) <= weekFromNow;
    }).length,
    highPriority: tasks.filter(t => t.priority === "high" && !t.completed).length,
  };

  const navItems = [
    { key: "all", icon: "fas fa-list", label: "Tasks", count: stats.total },
    { key: "today", icon: "fas fa-calendar-day", label: "Today", count: stats.today },
    { key: "week", icon: "fas fa-calendar-week", label: "This Week", count: stats.thisWeek },
    { key: "completed", icon: "fas fa-check-circle", label: "Completed", count: null },
    { key: "high", icon: "fas fa-exclamation-triangle", label: "High Priority", count: stats.highPriority },
    { key: "dashboard", icon: "fas fa-home", label: "Dashboard", count: null },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
          data-testid="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        data-testid="sidebar"
      >
        <div className="flex h-full flex-col">
          {/* Logo and Theme Toggle */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <i className="fas fa-tasks text-primary-foreground text-sm"></i>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className="theme-toggle p-2 rounded-lg hover:bg-muted transition-transform hover:scale-110"
              data-testid="theme-toggle"
            >
              <i className={`fas fa-${theme === "dark" ? "sun" : "moon"} text-muted-foreground`}></i>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onViewChange(item.key)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-colors ${
                  activeView === item.key
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-testid={`nav-${item.key}`}
              >
                <i className={`${item.icon} w-5`}></i>
                <span>{item.label}</span>
                {item.count !== null && (
                  <span
                    className={`ml-auto px-2 py-1 rounded-full text-xs ${
                      activeView === item.key
                        ? "bg-primary text-primary-foreground"
                        : item.key === "high"
                        ? "bg-destructive text-destructive-foreground"
                        : item.key === "today"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100"
                alt="User avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Alex Johnson</p>
                <p className="text-xs text-muted-foreground truncate">alex@taskflow.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
