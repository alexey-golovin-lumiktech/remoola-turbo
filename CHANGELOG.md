# Changelog (September 2025)

-   **2025-09-01:** Initial analysis of the 3 separate repositories.
-   **2025-09-02:** Created new Turborepo structure with `apps/` and `packages/`. Added base `turbo.json`.
-   **2025-09-03:** Migrated first repository (`backend-nestjs`) into `apps/backend`. Verified build.
-   **2025-09-04:** Migrated second repository (`frontend-nextjs`) into `apps/frontend`. Fixed ESLint/TS issues.
-   **2025-09-05:** Migrated shared library repo into `packages/ui` and `packages/utils`. Linked via workspaces.
-   **2025-09-08:** Integrated NestJS modules from old repos into monorepo.
-   **2025-09-09:** Fixed TypeORM migrations (UUID migration, FK adjustments).
-   **2025-09-10:** Standardized DTOs, validation decorators.
-   **2025-09-11:** Integrated shared utils/UI libs into Next.js frontend.
-   **2025-09-12:** Fixed aliasing issues (`@/utils`, `@/ui`), standardized API client with OpenAPI.
-   **2025-09-15:** Start Implementing **role-based management**
    system, allowing **super admin to assign and manage admin roles**.
    Defined DB schema changes and initial service structure.
-   **2025-09-16:** Continued development of role-based management.
-   **2025-09-17:** Continued development of role-based management.
-   **2025-09-18:** Removed legacy configs from old repos, cleaned unused files.
-   **2025-09-19:** Added Husky + lint-staged for pre-commit checks.
-   **2025-09-22:** Fixed path alias issues and Webpack/Turbo config.
-   **2025-09-23:** Standardized API client usage with OpenAPI-generated types.
-   **2025-09-24:** Fixed mismatched dependencies (React versions, NestJS peer deps).
-   **2025-09-25:** Continued development of role-based management.
-   **2025-09-26:** Continued development of role-based management.
-   **2025-09-29:** Continued development of role-based management.
-   **2025-09-30:** Continued development of role-based management.