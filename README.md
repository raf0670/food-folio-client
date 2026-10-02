# Food Folio Client

The Next.js frontend for **Food Folio**, a restaurant discovery and management platform developed as a DBMS course project.

> Developed collaboratively by **Rafsan Rahman** and **Azraf Daian Rahik**.

[Backend repository](https://github.com/raf0670/food-folio-server)

## Features

- User signup and login
- Public and authenticated user profiles
- Profile-information and password settings
- Follow/unfollow controls and follower counts
- Restaurant registration and manager dashboard
- Administrator dashboard and restaurant approval workflow
- Restaurant branch creation and management
- Interactive branch maps using Leaflet
- Branch menu creation and editing
- Restaurant cuisine management
- Responsive navigation, loading, error, and not-found interfaces

## Tech stack

- **Framework:** Next.js 16 with the App Router
- **UI:** React 19 and Tailwind CSS 4
- **Forms:** React Hook Form
- **Maps:** Leaflet and React Leaflet
- **Icons:** Lucide React and React Icons
- **Backend communication:** Next.js server actions and the Food Folio REST API

## Requirements

- Node.js 20.9 or newer
- npm
- A running Food Folio backend

## Local setup

### 1. Clone and install

```bash
git clone https://github.com/raf0670/food-folio-client.git
cd food-folio-client
npm install
```

### 2. Create the local environment file

Create `.env.local` in the repository root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Do not add a trailing slash because the API actions append paths such as `/api/auth/login`.

Variables prefixed with `NEXT_PUBLIC_` can be exposed to browser bundles. Never place database credentials or JWT secrets in the client environment file.

### 3. Start both applications

Start the Food Folio backend first on port `5000`. Then run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create and validate a production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |

## Main routes

| Route | Purpose |
|---|---|
| `/` | Application homepage |
| `/login` and `/signup` | Authentication |
| `/profile/[userId]` | User profile |
| `/profile/settings` | Account settings |
| `/restaurant/add` | Register a restaurant |
| `/restaurant/my` | View manager-owned restaurants |
| `/manage/[restaurantId]` | Restaurant manager dashboard |
| `/manage/[restaurantId]/cuisine` | Restaurant cuisine management |
| `/branch/add` | Add a restaurant branch |
| `/branch/manage/[branchId]` | Branch management |
| `/branch/manage/[branchId]/menu` | Menu management |
| `/admin/dashboard` | Administrator dashboard |
| `/admin/unapproved-restaurants` | Restaurant approval queue |

## Project structure

```text
src/
├── api/          Server actions that communicate with the backend
├── app/          App Router pages, layouts, and route groups
└── components/   Shared and feature-specific React components
```

## Production configuration

Set the public API variable to the deployed backend origin before building:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

Next.js embeds public environment variables during the build, so rebuild the application after changing this value.

## Troubleshooting

- **Requests use an undefined URL:** create `.env.local` and restart the development server.
- **The backend is unreachable:** confirm it is running and `NEXT_PUBLIC_API_URL` has the correct origin.
- **Maps do not render:** verify that the branch has valid coordinates and the component is rendered in the browser.
- **Authentication appears stale:** clear the authentication cookie and log in again.

## Contributors

Food Folio was designed and developed collaboratively by:

- **Rafsan Rahman**
- **Azraf Daian Rahik**

Both contributors participated in developing and integrating the project. Individual commit history is available in Git for a detailed contribution record.
