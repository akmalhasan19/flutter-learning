# Packaging Convention for Graded Projects

For the MVP, we assume the user is only submitting a single file (usually `main.dart` or a specific widget file).

## Runner Execution Model
1. The on-demand runner initializes a basic Flutter project template based on the `grader_target`.
2. The runner injects the user's submitted source code into the appropriate location (e.g., `lib/main.dart`).
3. The runner injects the hidden `app_test.dart` into the `test/` directory.
4. The runner executes `flutter test`.
5. The runner parses the test output to determine the `score`, `status`, and `summary`.

## Restrictions
- For now, users can only modify a single file. Multi-file support is out of scope for the MVP.
- No third-party dependencies beyond standard Flutter packages and basic utilities are supported in the MVP.

## Artifact Storage
- **Starter Projects**: Stored in `content/projects/<grader_target>/starter/`
- **Hidden Graders**: Stored in `content/projects/<grader_target>/grader/`
- When a user requests to start a lab, the `starter/main.dart` is loaded as the initial editor content.
