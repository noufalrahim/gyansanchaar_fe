/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy, Suspense } from 'react';

interface IconRendererProps {
  iconName: string;
  className?: string;
}

export default function IconRenderer({ iconName, className }: IconRendererProps) {
  const Icon = lazy(async () => {
    try {
      const icons = await import('lucide-react');
      const IconComponent = icons[iconName as keyof typeof icons];
      return { default: (IconComponent as React.ComponentType<any>) ?? (() => null) };
    } catch {
      return { default: () => null };
    }
  });

  return (
    <Suspense fallback={<div className={className}></div>}>
      <Icon className={className} />
    </Suspense>
  );
}
