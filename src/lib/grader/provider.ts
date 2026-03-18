export type GraderStatus = 'queued' | 'running' | 'passed' | 'failed' | 'infra_error';

export interface GraderRequestPayload {
  submissionId: string;
  userId: string;
  lessonId: string;
  sourceCode: string;
  graderTarget?: string; // The identifier of the hidden grader logic
  callbackUrl: string;   // Where the runner should send the result back
}

export interface GraderResponsePayload {
  submissionId: string;
  jobId: string;
  status: GraderStatus;
  score?: number;
  summary?: string;
  timestamp: string;
}

export interface RunnerProvider {
  /**
   * Dispatches a job to the external runner.
   * Returns a jobId if successfully queued/started.
   * Throws an error if infrastructure fails.
   */
  dispatchJob(payload: GraderRequestPayload): Promise<string>;
}

/**
 * A generic HTTP-based provider for on-demand runners.
 * E.g., Could be a Serverless Function, AWS Lambda, or a custom Webhook listener.
 */
export class HttpRunnerProvider implements RunnerProvider {
  private endpoint: string;
  private apiKey: string;

  constructor(endpoint: string, apiKey: string) {
    this.endpoint = endpoint;
    this.apiKey = apiKey;
  }

  async dispatchJob(payload: GraderRequestPayload): Promise<string> {
    try {
      // In a real environment, this makes an HTTP POST to the actual runner
      console.log(`[HttpRunnerProvider] Dispatching job to ${this.endpoint} for submission ${payload.submissionId}`);
      
      // MOCK BEHAVIOR FOR MVP:
      // If endpoint is not set, simulate the runner locally by calling the callback directly after a delay
      if (this.endpoint === 'mock' || !this.endpoint) {
        this.simulateRunner(payload);
        return `mock-job-${Date.now()}`;
      }

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Runner provider responded with ${response.status}`);
      }

      const data = await response.json();
      return data.jobId || `job-${Date.now()}`;
    } catch (error) {
      console.error("[HttpRunnerProvider] Infrastructure error:", error);
      throw error;
    }
  }

  /**
   * Helper for MVP to mock an external on-demand runner processing the code
   */
  private simulateRunner(payload: GraderRequestPayload) {
    setTimeout(async () => {
      // Simulate grading logic
      const isPassed = payload.sourceCode.includes('print(') || payload.sourceCode.includes('return true');
      
      const resultPayload: GraderResponsePayload = {
        submissionId: payload.submissionId,
        jobId: `mock-job-${Date.now()}`,
        status: isPassed ? 'passed' : 'failed',
        score: isPassed ? 100 : 0,
        summary: isPassed ? 'All tests passed successfully.' : 'Tests failed. Check your logic.',
        timestamp: new Date().toISOString()
      };

      try {
        console.log(`[HttpRunnerProvider] Mock runner sending result back to ${payload.callbackUrl}`);
        // Send webhook back to our app
        await fetch(payload.callbackUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Pass internal API key if needed for secure webhooks
            'x-webhook-secret': process.env.GRADER_WEBHOOK_SECRET || 'secret',
          },
          body: JSON.stringify(resultPayload),
        });
      } catch (err) {
        console.error('[HttpRunnerProvider] Failed to send webhook callback', err);
      }
    }, 5000); // 5 seconds processing delay
  }
}

// Singleton pattern for the provider
const RUNNER_ENDPOINT = process.env.RUNNER_API_ENDPOINT || 'mock';
const RUNNER_API_KEY = process.env.RUNNER_API_KEY || '';

export const graderProvider: RunnerProvider = new HttpRunnerProvider(RUNNER_ENDPOINT, RUNNER_API_KEY);
