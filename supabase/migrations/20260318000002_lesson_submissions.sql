-- Create custom types for ENUMs
CREATE TYPE submission_status AS ENUM ('queued', 'running', 'passed', 'failed', 'infra_error');

-- Create Lesson Submissions Table
CREATE TABLE lesson_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  
  -- Submission State
  status submission_status DEFAULT 'queued',
  attempt_number INTEGER NOT NULL DEFAULT 1,
  
  -- Runner and Assessment Data
  runner_job_id TEXT,
  summary TEXT,
  score INTEGER,
  passed_at TIMESTAMPTZ,
  
  -- Storage and Source Code Snapshot
  source_reference JSONB,
  artifact_path TEXT, -- Link to storage bucket path
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_lesson_submissions_user_id ON lesson_submissions(user_id);
CREATE INDEX idx_lesson_submissions_lesson_id ON lesson_submissions(lesson_id);
CREATE INDEX idx_lesson_submissions_status ON lesson_submissions(status);

-- Setup Row Level Security (RLS)
ALTER TABLE lesson_submissions ENABLE ROW LEVEL SECURITY;

-- User can only view their own submissions
CREATE POLICY "Users can view their own submissions"
  ON lesson_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- User can insert their own submissions
CREATE POLICY "Users can insert their own submissions"
  ON lesson_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User can update their own submissions (might need service role bypass for actual grader but fine for MVP baseline)
CREATE POLICY "Users can update their own submissions"
  ON lesson_submissions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);
