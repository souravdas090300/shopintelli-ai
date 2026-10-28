/**
 * Design System Showcase Page
 * Demonstrates all design system components with live examples
 */

import {
  MetricCard,
  ButtonGroup,
  SectionHeader,
  Alert,
  StatusBadge,
  FormField,
  Card,
  EmptyState,
  LoadingSpinner
} from '../components/design-system/Examples';
import { useState } from 'react';

export default function DesignSystemShowcase() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">ShopIntelli Design System</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            A comprehensive, modern design system for building professional e-commerce analytics interfaces. 
            All components are responsive, accessible, and follow consistent design patterns.
          </p>
        </div>

      {/* Colors Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <SectionHeader
          title="Color Palette"
          description="Primary, semantic, and neutral colors with consistent shades for all UI elements"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-6">
          {/* Primary Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-700">Primary</h4>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-primary flex items-center justify-center text-white text-sm font-medium shadow-md">
                Primary
              </div>
              <div className="h-12 rounded-lg bg-blue-600 shadow-sm" />
              <div className="h-12 rounded-lg bg-blue-700 shadow-sm" />
            </div>
          </div>

          {/* Success Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-700">Success</h4>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-success flex items-center justify-center text-white text-sm font-medium shadow-md">
                Success
              </div>
              <div className="h-12 rounded-lg bg-green-600 shadow-sm" />
              <div className="h-12 rounded-lg bg-green-700 shadow-sm" />
            </div>
          </div>

          {/* Warning Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-700">Warning</h4>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-warning flex items-center justify-center text-white text-sm font-medium shadow-md">
                Warning
              </div>
              <div className="h-12 rounded-lg bg-yellow-600 shadow-sm" />
              <div className="h-12 rounded-lg bg-yellow-700 shadow-sm" />
            </div>
          </div>

          {/* Error Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-700">Error</h4>
            <div className="space-y-2">
              <div className="h-16 rounded-lg bg-error flex items-center justify-center text-white text-sm font-medium shadow-md">
                Error
              </div>
              <div className="h-12 rounded-lg bg-red-600 shadow-sm" />
              <div className="h-12 rounded-lg bg-red-700 shadow-sm" />
            </div>
          </div>

          {/* Gray Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-gray-700">Neutral</h4>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-gray-100 border border-gray-300" />
              <div className="h-12 rounded-lg bg-gray-300" />
              <div className="h-12 rounded-lg bg-gray-500" />
              <div className="h-12 rounded-lg bg-gray-700" />
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <SectionHeader
          title="Typography"
          description="Consistent font sizes, weights, and line heights for optimal readability"
        />
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6">
          <div className="border-b border-gray-200 pb-4">
            <h1 className="text-4xl font-bold text-gray-900">Heading 1</h1>
            <code className="text-xs text-gray-500 mt-1 block">text-4xl font-bold</code>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-bold text-gray-900">Heading 2</h2>
            <code className="text-xs text-gray-500 mt-1 block">text-3xl font-bold</code>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-2xl font-semibold text-gray-900">Heading 3</h3>
            <code className="text-xs text-gray-500 mt-1 block">text-2xl font-semibold</code>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h4 className="text-xl font-semibold text-gray-900">Heading 4</h4>
            <code className="text-xs text-gray-500 mt-1 block">text-xl font-semibold</code>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <p className="text-base text-gray-900">Body text - The quick brown fox jumps over the lazy dog</p>
            <code className="text-xs text-gray-500 mt-1 block">text-base</code>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <p className="text-sm text-gray-600">Small text - Perfect for secondary information and captions</p>
            <code className="text-xs text-gray-500 mt-1 block">text-sm text-gray-600</code>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Caption Text - Uppercase</p>
            <code className="text-xs text-gray-500 mt-1 block">text-xs uppercase tracking-wide</code>
          </div>
        </div>
      </section>

      {/* Buttons Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <SectionHeader
          title="Buttons"
          description="Various button styles and sizes for different actions and contexts"
        />
        <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6">
          <div>
            <h4 className="text-sm font-semibold mb-4 text-gray-700">Variants</h4>
            <ButtonGroup className="flex-wrap">
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-success">Success</button>
              <button className="btn btn-danger">Danger</button>
              <button className="btn btn-primary" disabled>Disabled</button>
            </ButtonGroup>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-sm font-semibold mb-4 text-gray-700">Sizes</h4>
            <ButtonGroup className="items-center">
              <button className="btn btn-primary btn-sm">Small</button>
              <button className="btn btn-primary">Medium (Default)</button>
              <button className="btn btn-primary btn-lg">Large</button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Metric Cards Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <SectionHeader
          title="Metric Cards"
          description="Display key performance indicators with trends and visual icons"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <MetricCard
            title="Total Revenue"
            value="$124,580"
            change={12.5}
            icon="💰"
            trend="positive"
          />
          <MetricCard
            title="Total Orders"
            value="1,248"
            change={8.2}
            icon="📦"
            trend="positive"
          />
          <MetricCard
            title="Active Customers"
            value="5,672"
            change={-3.1}
            icon="👥"
            trend="negative"
          />
          <MetricCard
            title="Conversion Rate"
            value="3.24%"
            change={0.8}
            icon="📈"
            trend="positive"
          />
        </div>
      </section>

      {/* Alerts Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <SectionHeader
          title="Alerts"
          description="Informative messages with different severity levels for user feedback"
        />
        <div className="space-y-4 mt-6">
          <Alert type="info" title="Information">
            This is an informational alert with helpful context for the user. Use this for general notifications.
          </Alert>
          <Alert type="success" title="Success">
            Your changes have been saved successfully! The operation completed without any issues.
          </Alert>
          <Alert type="warning" title="Warning">
            Please review your settings before proceeding. Some values may need your attention.
          </Alert>
          <Alert type="error" title="Error">
            An error occurred while processing your request. Please try again or contact support.
          </Alert>
        </div>
      </section>

      {/* Status Badges Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <SectionHeader
          title="Status Badges"
          description="Visual indicators for status, categories, and tags"
        />
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6">
          <div className="flex gap-3 flex-wrap items-center">
            <StatusBadge status="success">Active</StatusBadge>
            <StatusBadge status="success">Approved</StatusBadge>
            <StatusBadge status="warning">Pending</StatusBadge>
            <StatusBadge status="warning">In Progress</StatusBadge>
            <StatusBadge status="error">Failed</StatusBadge>
            <StatusBadge status="error">Rejected</StatusBadge>
            <StatusBadge status="info">Draft</StatusBadge>
            <StatusBadge status="info">New</StatusBadge>
          </div>
        </div>
      </section>

      {/* Form Elements Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <SectionHeader
          title="Form Elements"
          description="Inputs, selects, and form controls with validation states"
        />
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mt-6">
          <div className="max-w-2xl space-y-6">
            <FormField
              label="Email Address"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={inputValue}
              onChange={setInputValue}
              required
            />
            <FormField
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              value=""
              onChange={() => {}}
              error="Password must be at least 8 characters"
            />
            <div className="form-group">
              <label className="form-label">Select Category</label>
              <select className="form-select">
                <option>Choose a category...</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home & Garden</option>
                <option>Sports & Outdoors</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Product Description</label>
              <textarea 
                className="form-input" 
                rows={4}
                placeholder="Enter product description..."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <SectionHeader
          title="Cards"
          description="Container components for grouping related content with various configurations"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card title="Simple Card">
            <p className="text-gray-600">
              This is a basic card with just a title and content. Perfect for displaying simple information.
            </p>
          </Card>

          <Card
            title="Card with Actions"
            actions={
              <>
                <button className="btn btn-sm btn-ghost">Edit</button>
                <button className="btn btn-sm btn-primary">Save</button>
              </>
            }
          >
            <p className="text-gray-600">
              This card has action buttons in the header for quick access to common operations.
            </p>
          </Card>

          <Card
            title="Interactive Card"
            interactive
            footer={<p className="text-xs text-gray-500">Click anywhere on this card to interact</p>}
          >
            <p className="text-gray-600">
              This card has a hover effect and includes a footer section for additional information.
            </p>
          </Card>
        </div>
      </section>

      {/* Empty State Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <SectionHeader
          title="Empty States"
          description="Placeholder content when no data is available with clear call-to-action"
        />
        <div className="mt-6">
        <Card>
          <EmptyState
            icon="📊"
            title="No data available"
            description="Get started by syncing your product data from Magento or add products manually"
            action={
              <div className="flex gap-3">
                <button className="btn btn-primary">
                  <span>🔄</span>
                  Sync from Magento
                </button>
                <button className="btn btn-secondary">
                  <span>➕</span>
                  Add Product
                </button>
              </div>
            }
          />
        </Card>
        </div>
      </section>

      {/* Loading States Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <SectionHeader
          title="Loading States"
          description="Spinners and loading indicators for asynchronous operations"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card title="Small Spinner">
            <LoadingSpinner size="sm" text="Loading..." />
          </Card>
          <Card title="Medium Spinner">
            <LoadingSpinner size="md" text="Processing..." />
          </Card>
          <Card title="Large Spinner">
            <LoadingSpinner size="lg" text="Please wait..." />
          </Card>
        </div>
      </section>

      {/* Utility Classes Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <SectionHeader
          title="Utility Classes Reference"
          description="Quick reference guide for commonly used Tailwind CSS utility classes"
        />
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <div>
                <strong className="text-gray-900 block mb-1">Spacing:</strong>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">m-{'{0-12}'}</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">p-{'{0-12}'}</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">gap-{'{1-8}'}</code>
              </div>
              <div>
                <strong className="text-gray-900 block mb-1">Flexbox:</strong>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">flex</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">flex-col</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">items-center</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">justify-between</code>
              </div>
              <div>
                <strong className="text-gray-900 block mb-1">Text Sizes:</strong>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">text-xs</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">text-sm</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">text-base</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">text-lg</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">text-xl</code>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <strong className="text-gray-900 block mb-1">Colors:</strong>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">text-primary</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">bg-success</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">border-error</code>
              </div>
              <div>
                <strong className="text-gray-900 block mb-1">Borders:</strong>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">rounded-sm</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">rounded-lg</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">rounded-full</code>
              </div>
              <div>
                <strong className="text-gray-900 block mb-1">Shadows:</strong>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">shadow-sm</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">shadow-md</code>{' '}
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">shadow-lg</code>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer Info */}
      <div className="mt-16 text-center pb-8">
        <p className="text-gray-500 text-sm">
          ShopIntelli Design System v1.0 • Built with React, TypeScript & Tailwind CSS
        </p>
      </div>
      </div>
    </div>
  );
}
