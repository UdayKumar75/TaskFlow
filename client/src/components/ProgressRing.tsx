import React from "react";

interface ProgressRingProps {
  percentage: number;
  completedTasks: number;
  totalTasks: number;
  timeSpent: string;
  avgPerTask: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  completedTasks,
  totalTasks,
  timeSpent,
  avgPerTask,
}) => {
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-lg font-semibold mb-6">Today's Progress</h3>
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="progress-ring transition-all duration-300 ease-in-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold" data-testid="progress-percentage">
                {percentage}%
              </div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Completed Tasks</span>
          <span className="text-sm font-medium" data-testid="completed-tasks">
            {completedTasks}/{totalTasks}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Time Spent</span>
          <span className="text-sm font-medium">{timeSpent}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Avg. per Task</span>
          <span className="text-sm font-medium">{avgPerTask}</span>
        </div>
      </div>
    </div>
  );
};
