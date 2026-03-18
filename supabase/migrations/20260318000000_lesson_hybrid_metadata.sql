-- Migration to add Hybrid Learning Metadata to lessons and lesson_translations table

-- Update Lessons Table
ALTER TABLE lessons
  ADD COLUMN runtime_mode TEXT DEFAULT 'none',      -- 'none', 'browser_lab', 'project_lab'
  ADD COLUMN assessment_mode TEXT DEFAULT 'manual', -- 'manual', 'graded'
  ADD COLUMN starter_source TEXT,                   -- Path/identifier to starter template files
  ADD COLUMN grader_target TEXT,                    -- Identifier/path for the hidden test suite
  ADD COLUMN unlock_rule TEXT;                      -- Rule for gating the next lesson

-- Update Lesson Translations Table
ALTER TABLE lesson_translations
  ADD COLUMN expected_outcomes TEXT[];              -- Checklist objective yang bisa dirender di lesson page

-- Provide comments explaining the schema extension
COMMENT ON COLUMN lessons.runtime_mode IS 'Defines if the lesson uses no runtime, DartPad (browser_lab), or external runner (project_lab)';
COMMENT ON COLUMN lessons.assessment_mode IS 'Defines if completion is self-reported (manual) or validated by runner (graded)';
COMMENT ON COLUMN lessons.starter_source IS 'Path or identifier for starter files when runtime_mode is project_lab';
COMMENT ON COLUMN lessons.grader_target IS 'Path or identifier for hidden test suite for grading project_lab submissions';
COMMENT ON COLUMN lessons.unlock_rule IS 'Optional rule or condition to gate progression to the next lesson';
COMMENT ON COLUMN lesson_translations.expected_outcomes IS 'Checklist of objectives or expected outcomes for the user to complete';
