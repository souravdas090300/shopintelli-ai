import type { ReactNode } from 'react';

type SectionProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  id?: string;
};

export function Section({ title, description, actions, children, id }: SectionProps) {
  return (
    <section id={id} className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-gray-900">{title}</h2>
          {description && (
            <p className="text-sm text-gray-500 max-w-prose">{description}</p>
          )}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      <div className="grid gap-4">
        {children}
      </div>
    </section>
  );
}

export default Section;
