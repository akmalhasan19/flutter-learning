export type AppEvent =
  | 'signup_started'
  | 'signup_completed'
  | 'lesson_started'
  | 'lesson_completed'
  | 'dartpad_opened'
  | 'badge_awarded';

export const trackEvent = (
  eventName: AppEvent,
  properties?: Record<string, any>
) => {
  if (typeof window !== 'undefined') {
    // Client-side execution
    // You can replace this with your chosen analytics provider (e.g., PostHog, Vercel Analytics)
    console.log(`[Analytics] Tracked Event: ${eventName}`, properties);
    // e.g., window.posthog?.capture(eventName, properties);
  } else {
    // Server-side execution
    console.log(`[Analytics - Server] Tracked Event: ${eventName}`, properties);
  }
};
