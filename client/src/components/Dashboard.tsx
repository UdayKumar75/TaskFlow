import React from "react";
import { StatsCard } from "./StatsCard";
import { ProgressRing } from "./ProgressRing";
import type { Task } from "@shared/schema";

interface DashboardProps {
  tasks: Task[];
}

export const Dashboard: React.FC<DashboardProps> = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    inProgress: tasks.filter(t => !t.completed).length,
    highPriority: tasks.filter(t => t.priority === "high" && !t.completed).length,
  };

  const todayTasks = tasks.filter(t => {
    if (!t.dueDate) return false;
    return new Date(t.dueDate).toDateString() === new Date().toDateString();
  });

  const completedToday = todayTasks.filter(t => t.completed).length;
  const totalToday = todayTasks.length;
  const todayPercentage = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  const productivityScore = tasks.length > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 hidden md:block">Good morning, Alex! 👋</h1>
        <p className="text-muted-foreground">
          You have <span className="text-foreground font-medium">{stats.inProgress} pending tasks</span> for today
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          icon="fas fa-tasks"
          trend={{
            value: "+12%",
            direction: "up",
            label: "from last week"
          }}
          colorClass="bg-primary/10"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon="fas fa-check-circle"
          trend={{
            value: "+8%",
            direction: "up",
            label: "completion rate"
          }}
          colorClass="bg-chart-3/10"
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgress}
          icon="fas fa-clock"
          trend={{
            value: "-3%",
            direction: "down",
            label: "from yesterday"
          }}
          colorClass="bg-chart-4/10"
        />
        <StatsCard
          title="Productivity"
          value={`${productivityScore}%`}
          icon="fas fa-chart-line"
          trend={{
            value: "+5%",
            direction: "up",
            label: "this month"
          }}
          colorClass="bg-secondary/10"
        />
      </div>

      {/* Charts and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Productivity Chart Placeholder */}
        <div className="lg:col-span-2 bg-card rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Productivity Overview</h3>
            <select className="bg-background border border-border rounded-lg px-3 py-2 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <i className="fas fa-chart-area text-4xl text-muted-foreground mb-4"></i>
              <p className="text-muted-foreground">Productivity chart showing task completion trends</p>
            </div>
          </div>
        </div>

        {/* Progress Ring */}
        <ProgressRing
          percentage={todayPercentage}
          completedTasks={completedToday}
          totalTasks={totalToday}
          timeSpent="6h 24m"
          avgPerTask="1h 17m"
        />
      </div>
    </div>
  );
};
