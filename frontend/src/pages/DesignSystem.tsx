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
  EmptyState
} from '../components/design-system/Examples';
import { useState } from 'react';

export default function DesignSystemShowcase() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="space-y-8 p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">ShopIntelli Design System</h1>
        <p className="text-lg text-muted">
          A comprehensive, modern design system for building professional e-commerce analytics interfaces
        </p>
      </div>

      {/* Colors Section */}
      <section>
        <SectionHeader
          title="Color Palette"
          description="Primary, semantic, and neutral colors with consistent shades"
        />
        <div className="grid grid-cols-5 gap-4">
          {/* Primary Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Primary</h4>
            <div className="space-y-2">
              <div className="h-12 rounded bg-primary flex items-center justify-center text-white text-xs">
                500
              </div>
              <div className="h-8 rounded" style={{ backgroundColor: 'var(--color-primary-600)' }} />
              <div className="h-8 rounded" style={{ backgroundColor: 'var(--color-primary-700)' }} />
            </div>
          </div>

          {/* Success Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Success</h4>
            <div className="space-y-2">
              <div className="h-12 rounded bg-success flex items-center justify-center text-white text-xs">
                500
              </div>
              <div className="h-8 rounded" style={{ backgroundColor: 'var(--color-success-600)' }} />
              <div className="h-8 rounded" style={{ backgroundColor: 'var(--color-success-700)' }} />
            </div>
          </div>

          {/* Warning Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Warning</h4>
            <div className="space-y-2">
              <div className="h-12 rounded bg-warning flex items-center justify-center text-white text-xs">
                500
              </div>
              <div className="h-8 rounded" style={{ backgroundColor: 'var(--color-warning-600)' }} />
              <div className="h-8 rounded" style={{ backgroundColor: 'var(--color-warning-700)' }} />
            </div>
          </div>

          {/* Error Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Error</h4>
            <div className="space-y-2">
              <div className="h-12 rounded bg-error flex items-center justify-center text-white text-xs">
                500
              </div>
              <div className="h-8 rounded" style={{ backgroundColor: 'var(--color-error-600)' }} />
              <div className="h-8 rounded" style={{ backgroundColor: 'var(--color-error-700)' }} />
            </div>
          </div>

          {/* Gray Colors */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Neutral</h4>
            <div className="space-y-2">
              <div className="h-8 rounded" style={{ backgroundColor: 'var(--color-gray-100)' }} />
              <div className="h-8 rounded" style={{ backgroundColor: 'var(--color-gray-300)' }} />
              <div className="h-8 rounded" style={{ backgroundColor: 'var(--color-gray-500)' }} />
              <div className="h-8 rounded" style={{ backgroundColor: 'var(--color-gray-700)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section>
        <SectionHeader
          title="Typography"
          description="Consistent font sizes, weights, and line heights"
        />
        <div className="space-y-4">
          <div><h1 className="text-4xl font-bold">Heading 1 - text-4xl font-bold</h1></div>
          <div><h2 className="text-3xl font-bold">Heading 2 - text-3xl font-bold</h2></div>
          <div><h3 className="text-2xl font-semibold">Heading 3 - text-2xl font-semibold</h3></div>
          <div><h4 className="text-xl font-semibold">Heading 4 - text-xl font-semibold</h4></div>
          <div><p className="text-base">Body text - text-base</p></div>
          <div><p className="text-sm text-muted">Small text - text-sm text-muted</p></div>
          <div><p className="text-xs uppercase text-gray">Caption - text-xs uppercase</p></div>
        </div>
      </section>

      {/* Buttons Section */}
      <section>
        <SectionHeader
          title="Buttons"
          description="Various button styles and sizes for different actions"
        />
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-3">Variants</h4>
            <ButtonGroup>
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-success">Success</button>
              <button className="btn btn-danger">Danger</button>
              <button className="btn btn-primary" disabled>Disabled</button>
            </ButtonGroup>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Sizes</h4>
            <ButtonGroup className="items-center">
              <button className="btn btn-primary btn-sm">Small</button>
              <button className="btn btn-primary">Medium</button>
              <button className="btn btn-primary btn-lg">Large</button>
            </ButtonGroup>
          </div>
        </div>
      </section>

      {/* Metric Cards Section */}
      <section>
        <SectionHeader
          title="Metric Cards"
          description="Display key metrics with trends and icons"
        />
        <div className="metrics-grid">
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
      <section>
        <SectionHeader
          title="Alerts"
          description="Informative messages with different severity levels"
        />
        <div className="space-y-4">
          <Alert type="info" title="Information">
            This is an informational alert with helpful context for the user.
          </Alert>
          <Alert type="success" title="Success">
            Your changes have been saved successfully!
          </Alert>
          <Alert type="warning" title="Warning">
            Please review your settings before proceeding.
          </Alert>
          <Alert type="error" title="Error">
            An error occurred while processing your request.
          </Alert>
        </div>
      </section>

      {/* Status Badges Section */}
      <section>
        <SectionHeader
          title="Status Badges"
          description="Visual indicators for status and categories"
        />
        <div className="flex gap-3 flex-wrap">
          <StatusBadge status="success">Active</StatusBadge>
          <StatusBadge status="warning">Pending</StatusBadge>
          <StatusBadge status="error">Failed</StatusBadge>
          <StatusBadge status="info">Draft</StatusBadge>
        </div>
      </section>

      {/* Form Elements Section */}
      <section>
        <SectionHeader
          title="Form Elements"
          description="Inputs, selects, and form controls"
        />
        <div className="max-w-md space-y-4">
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
            placeholder="Enter password"
            value=""
            onChange={() => {}}
            error="Password must be at least 8 characters"
          />
          <div className="form-group">
            <label className="form-label">Select an option</label>
            <select className="form-select">
              <option>Choose...</option>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section>
        <SectionHeader
          title="Cards"
          description="Container components for grouping content"
        />
        <div className="responsive-grid grid-cols-3">
          <Card title="Simple Card">
            This is a basic card with just a title and content.
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
            This card has action buttons in the header.
          </Card>

          <Card
            title="Interactive Card"
            interactive
            footer={<p className="text-xs text-muted">Click anywhere to interact</p>}
          >
            This card has a hover effect and footer.
          </Card>
        </div>
      </section>

      {/* Empty State Section */}
      <section>
        <SectionHeader
          title="Empty States"
          description="Placeholder content when no data is available"
        />
        <Card>
          <EmptyState
            icon="📊"
            title="No data available"
            description="Get started by syncing your data from Magento"
            action={
              <button className="btn btn-primary">
                Sync Data
              </button>
            }
          />
        </Card>
      </section>

      {/* Utility Classes Section */}
      <section>
        <SectionHeader
          title="Utility Classes"
          description="Quick reference for commonly used utility classes"
        />
        <Card>
          <div className="space-y-4 text-sm">
            <div>
              <strong>Spacing:</strong> m-{'{0-12}'}, p-{'{0-12}'}, gap-{'{1-8}'}
            </div>
            <div>
              <strong>Flex:</strong> flex, flex-col, items-center, justify-between, gap-4
            </div>
            <div>
              <strong>Text:</strong> text-{'{xs,sm,base,lg,xl,2xl,3xl,4xl}'}, font-{'{normal,medium,semibold,bold}'}
            </div>
            <div>
              <strong>Colors:</strong> text-{'{primary,success,warning,error,muted}'}, bg-{'{white,gray-50,primary}'}
            </div>
            <div>
              <strong>Layout:</strong> rounded-{'{sm,md,lg,xl,full}'}, shadow-{'{sm,md,lg,xl}'}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
