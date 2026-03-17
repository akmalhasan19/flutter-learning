'use client';

import { useEffect } from 'react';
import { AppEvent, trackEvent } from './events';

export function ViewTracker({
  event,
  properties
}: {
  event: AppEvent;
  properties?: Record<string, any>;
}) {
  useEffect(() => {
    trackEvent(event, properties);
  }, [event, properties]);

  return null;
}
