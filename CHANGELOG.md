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

# Changelog (October 2025)

-   **2025-10-02:** Increased monorepo stability; fixed module import issues and improved concurrent dev experience.
-   **2025-10-03:** Implemented role-based access control: superadmins manage admins/clients, admins manage clients only.
-   **2025-10-06:** Added unified global search service across entities with optimized SQL and simplified payloads.
-   **2025-10-07:** Introduced `v1` versioned routing for admin and consumer APIs; reorganized module structure.
-   **2025-10-08:** Implemented `/v1/admin/clients/:clientId` backend endpoints for detailed client lookup.
-   **2025-10-09:** Upgraded OpenAPI spec to `v1` with enhanced schemas and versioned endpoints.
-   **2025-10-10:** Standardized all admin routes under `/admin/admins`.
-   **2025-10-13:** Unified API documentation and Swagger with version switching; improved visibility across all modules.
-   **2025-10-14:** Split monolithic `AdminService` into modular domain-specific services for admins, clients, payments, etc.
-   **2025-10-15:** Improved developer tooling by creating shared ESLint config and fixing Turborepo workspace issues.
-   **2025-10-16:** Refactored API client to use relative path prefixes for better environment portability.
-   **2025-10-17:** Implemented versioned IndexedDB wrapper for offline caching with schema migrations and auto-cleanup.
-   **2025-10-20:** Rebuilt API client with caching, SWR, retries, and concurrency limiting; added dependency-based invalidation.
-   **2025-10-21:** Simplified global search return value by removing unnecessary wrapper objects.
-   **2025-10-22:** Added admin-facing pages for managing clients with search and filtering integrated into new API.
-   **2025-10-23:** Introduced shared `@remoola/env` package for centralized environment configuration using Zod validation.
-   **2025-10-24:** Replaced local `.env` loaders across apps with unified `@remoola/env` import; removed redundant logic.
