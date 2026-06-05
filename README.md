# My Task Board - Learning Project

## 1. Concept: The Relational Bridge

We have transitioned from loose, document-based data (NoSQL) to a **Relational Database** (PostgreSQL).

- **Normalization:** Data is organized into structured tables (`User`, `Project`, `Task`).
- **Referential Integrity:** Using "Foreign Keys" (like `userId` and `projectId`) acts as glue, ensuring no data becomes orphaned or disconnected.

## 2. Technical Infrastructure

- **Prisma 7 Architecture:** Utilized `prisma.config.ts` for database connection management, keeping `schema.prisma` strictly for model definitions.
- **Workflow:**
  1. **Define:** Blueprint created in `schema.prisma`.
  2. **Migrate:** Applied changes via `npx prisma migrate dev`.
  3. **Generate:** Updated the TypeScript bridge with `npx prisma generate`.

## 3. Database Schema

Our database enforces these rules:

- **User (1) <-> (N) Project:** One user can own multiple projects.
- **Project (1) <-> (N) Task:** One project can contain multiple tasks.
- **Constraints:** Every `Project` must belong to a `User`, and every `Task` must belong to a `Project`.

## 4. The Server-Side Bridge

- **File:** `app/lib/prisma.ts`
- **Pattern:** Singleton Pattern.
- **Why:** This ensures our Next.js application maintains one single, stable connection to the database, preventing connection pool exhaustion during development hot-reloads.
- **Role:** Exports the `prisma` client used for all database interactions.

## 5. Server Actions (Data Creation Logic)

- **File:** `app/actions/project-actions.ts`
- **Concept:** Server Actions run securely on the server, serving as the communication layer between the UI and the database.
- **Workflow:**
  - `prisma.project.create`: Executes the SQL 'INSERT' command.
  - `revalidatePath`: Clears the Next.js cache to ensure the UI updates instantly after a database change.
  - `try/catch`: Wraps operations to handle potential database connection or constraint errors gracefully.

## 6. The Frontend (UI Layer)

- **File:** `app/components/ProjectForm.tsx`
- **Concept:** Uses `'use client'` to handle browser-side interactions like form submissions.
- **Data Flow:** 1. User inputs project title. 2. Form triggers `handleSubmit`. 3. `handleSubmit` calls the server-side `createProject` function. 4. Database updates; `revalidatePath` forces the page to reflect the new data.

## 7. The Lifecycle of a Data Request

- **Request:** The browser sends form data to the Server Action.
- **Processing:** The Server Action uses the `PrismaClient` (The Bridge) to validate the data against the `schema.prisma` rules.
- **Persistence:** PostgreSQL stores the record.
- **Syncing:** The UI is re-rendered to show the new state.

## 8. Data Retrieval (Querying)

- **Concept:** Fetching data on the server before rendering the UI to ensure fast page loads and SEO.
- **Function:** `prisma.project.findMany()`
- **Key Features:**
  - `include`: Performs a SQL JOIN to pull related tasks alongside the project (Eager Loading).
  - `orderBy`: Handles sorting at the database level for maximum efficiency.
  - **Async/Await:** Necessary to handle the latency of network requests to the database.

## 9. Data Retrieval Logic (Server Actions)

- **Placement:** Defined in `actions/project-actions.ts`.
- **Async Pattern:** Handles the delay of network requests by awaiting database responses.
- **Relational Querying:** Using `include` allows us to fetch related child records (`Tasks`) in a single round-trip, minimizing database load.
- **Security:** Queries are isolated in 'use server' files, preventing database exposure in the browser.
