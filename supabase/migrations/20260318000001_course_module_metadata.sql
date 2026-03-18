-- Add title and description to courses and modules

ALTER TABLE courses
  ADD COLUMN title TEXT NOT NULL DEFAULT 'Untitled Course',
  ADD COLUMN description TEXT;

ALTER TABLE modules
  ADD COLUMN title TEXT NOT NULL DEFAULT 'Untitled Module',
  ADD COLUMN description TEXT;
