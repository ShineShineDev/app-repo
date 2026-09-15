Separate Workflow Files

   File                                | Trigger                             | What it does
  -------------------------------------|-------------------------------------|-------------------------------------------------------------------------------------
   lint.yaml                           | push / PR                           | Runs oxlint on src/ and test/
   static-analysis.yaml                | push / PR                           | TypeScript type-check (tsc --noEmit), Prettier format check, CodeQL SAST
   security-scan.yaml                  | push / PR / weekly Monday           | npm audit (HIGH+CRITICAL), Trivy filesystem scan → uploads SARIF
   unit-tests.yaml                     | push / PR                           | Runs vitest via npm run test:cov + uploads coverage artifact
   integration-tests.yaml              | push / PR                           | Builds the app, then runs E2E tests via npm run test:e2e + uploads results artifact


  Key decisions:

  • static-analysis.yaml absorbed CodeQL from security.yaml since it's a source-code analysis tool, not a runtime/dependency scanner.
  • unit-tests.yaml uses test:cov so coverage is always captured.
  • integration-tests.yaml runs a build step first, reflecting the real-world E2E requirement of a compiled app.
