/**
 * ShopIntelli AI - Component Examples
 * Demonstrates usage of design system components
 */

import type { ReactNode } from 'react';

// ========================================
// METRIC CARD EXAMPLE
// ========================================

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: string;
  trend?: 'positive' | 'negative' | 'neutral';
}

export function MetricCard({ title, value, change, icon = '📊', trend }: MetricCardProps): ReactNode {
  const trendClass = trend ? `trend-${trend}` : change && change >= 0 ? 'trend-positive' : 'trend-negative';
  const trendIcon = change && change >= 0 ? '↗' : '↘';

  return (
    <div className="metric-card">
      <div className="metric-header">
        <h3 className="metric-title">{title}</h3>
        <div className="metric-icon">{icon}</div>
      </div>
      <div className="metric-value">{value}</div>
      {change !== undefined && (
        <div className={`metric-trend ${trendClass}`}>
          <span>{trendIcon}</span>
          <span>{Math.abs(change)}% from last period</span>
        </div>
      )}
    </div>
  );
}

// ========================================
// BUTTON GROUP EXAMPLE
// ========================================

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

export function ButtonGroup({ children, className = '' }: ButtonGroupProps): ReactNode {
  return (
    <div className={`flex gap-2 ${className}`}>
      {children}
    </div>
  );
}

// ========================================
// SECTION HEADER EXAMPLE
// ========================================

interface SectionHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function SectionHeader({ title, description, actions }: SectionHeaderProps): ReactNode {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

// ========================================
// DATA TABLE EXAMPLE
// ========================================

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends { id: string | number }>({ 
  data, 
  columns, 
  onRowClick 
}: DataTableProps<T>): ReactNode {
  return (
    <table className="data-table">
      <thead className="table-header">
        <tr>
          {columns.map(column => (
            <th key={String(column.key)}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="table-body">
        {data.map(row => (
          <tr 
            key={row.id} 
            onClick={() => onRowClick?.(row)}
            className={onRowClick ? 'cursor-pointer' : ''}
          >
            {columns.map(column => (
              <td key={String(column.key)}>
                {column.render 
                  ? column.render(row[column.key], row) 
                  : String(row[column.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ========================================
// ALERT COMPONENT EXAMPLE
// ========================================

interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: ReactNode;
  icon?: string;
}

export function Alert({ type, title, children, icon }: AlertProps): ReactNode {
  const icons = {
    info: '💡',
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };

  return (
    <div className={`alert alert-${type}`}>
      {title && (
        <div className="alert-header">
          <span className="alert-icon">{icon || icons[type]}</span>
          <h4 className="alert-title">{title}</h4>
        </div>
      )}
      <div className="alert-content">{children}</div>
    </div>
  );
}

// ========================================
// STATUS BADGE EXAMPLE
// ========================================

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps): ReactNode {
  return (
    <span className={`status-badge status-${status}`}>
      {children}
    </span>
  );
}

// ========================================
// FORM FIELD EXAMPLE
// ========================================

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export function FormField({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required
}: FormFieldProps): ReactNode {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`form-input ${error ? 'error' : ''}`}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

// ========================================
// CHART CONTAINER EXAMPLE
// ========================================

interface ChartContainerProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}

export function ChartContainer({ title, children, actions }: ChartContainerProps): ReactNode {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        {actions && <div className="chart-controls">{actions}</div>}
      </div>
      <div className="chart-body">{children}</div>
    </div>
  );
}

// ========================================
// EMPTY STATE EXAMPLE
// ========================================

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps): ReactNode {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-muted text-center mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}

// ========================================
// LOADING SPINNER EXAMPLE
// ========================================

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps): ReactNode {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`${sizes[size]} border-4 border-gray-200 border-t-primary rounded-full animate-spin`} />
      {text && <p className="mt-4 text-sm text-muted">{text}</p>}
    </div>
  );
}

// ========================================
// CARD WITH ACTIONS EXAMPLE
// ========================================

interface CardProps {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  interactive?: boolean;
}

export function Card({ title, children, actions, footer, interactive }: CardProps): ReactNode {
  return (
    <div className={`card ${interactive ? 'card-interactive' : ''}`}>
      {title && (
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h3>{title}</h3>
            {actions && <div className="flex gap-2">{actions}</div>}
          </div>
        </div>
      )}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

export default {
  MetricCard,
  ButtonGroup,
  SectionHeader,
  DataTable,
  Alert,
  StatusBadge,
  FormField,
  ChartContainer,
  EmptyState,
  LoadingSpinner,
  Card
};
