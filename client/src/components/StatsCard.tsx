import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: string;
    direction: "up" | "down";
    label: string;
  };
  colorClass: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  colorClass,
}) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold" data-testid={`stat-${title.toLowerCase().replace(' ', '-')}`}>
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center`}>
          <i className={`${icon} text-${colorClass.includes('primary') ? 'primary' : colorClass.includes('chart-3') ? 'chart-3' : colorClass.includes('chart-4') ? 'chart-4' : 'secondary'}`}></i>
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-4 text-sm">
          <i className={`fas fa-arrow-${trend.direction} text-${trend.direction === 'up' ? 'chart-3' : 'destructive'} mr-1`}></i>
          <span className={`text-${trend.direction === 'up' ? 'chart-3' : 'destructive'} font-medium`}>
            {trend.value}
          </span>
          <span className="text-muted-foreground ml-1">{trend.label}</span>
        </div>
      )}
    </div>
  );
};
