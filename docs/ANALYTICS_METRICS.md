# Analytics & Metrics Dashboard

This document outlines the core metrics to be monitored after launch based on MVP event tracking.

## Core Events
- `signup_started`
- `signup_completed`
- `lesson_started`
- `lesson_completed`
- `dartpad_opened`
- `badge_awarded`

## Key Metrics to Monitor
1. **Activation Rate**
   - *Formula:* Total `signup_completed` / Total `signup_started`
   - *Goal:* See how many users drop off during the signup form.

2. **D1 / D7 Retention**
   - *Signal:* Repeated trigger of `lesson_started` on subsequent days after signup.
   - *Goal:* Test if the course content format encourages users to return.

3. **Feature Engagement (DartPad)**
   - *Formula:* Total `dartpad_opened` / Total `lesson_started`
   - *Goal:* Check if the interactive code snippet feature is actually used by learners.

4. **Lesson Completion Rate**
   - *Formula:* Total `lesson_completed` / Total `lesson_started`
   - *Goal:* Identify which lessons are too difficult, slow, or problematic for users.

5. **Gamification Effectiveness**
   - *Signal:* Volume of `badge_awarded` vs volume of drop-offs. Do streaks encourage higher engagement?

*Note: In the MVP, events are logged centrally via `src/lib/analytics/events.ts`. This acts as an initial abstraction that can later be hooked into tools like PostHog, Mixpanel, or Vercel Web Analytics.*
