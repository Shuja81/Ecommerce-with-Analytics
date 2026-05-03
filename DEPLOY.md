**Deploying this project: Vercel (frontend) + Render (backend) + MongoDB Atlas**

Overview

- Frontend: deploy `client` to Vercel as a static site (build with `npm run build`).
- Backend: deploy `server` to Render using the provided `Dockerfile` (includes Python for analytics).
- Database: use MongoDB Atlas and set `MONGO_URI` in server environment.

1. Prepare MongoDB Atlas

- Create an Atlas cluster and database user.
- Create a database `mern_ecommerce` (or any name) and whitelist your Render IPs (optional).
- Copy the connection string, for example:
  `mongodb+srv://<user>:<pass>@cluster0.mongodb.net/mern_ecommerce?retryWrites=true&w=majority`

2. Server (Render) — recommended: Docker service

- The server Dockerfile installs Python and required analytics packages.
- In Render, create a new "Web Service" and choose "Docker" (or connect GitHub repo and select "Dockerfile").
- Set environment variables in Render:
  - `NODE_ENV=production`
  - `MONGO_URI=<your Atlas connection string>`
  - `PORT=3000` (Render will map ports)
  - Optional: `USE_PYTHON_ANALYTICS=true` to force Python analytics bridge, and `PYTHON_BIN=python3` if needed.
- Build & deploy — Dockerfile will run `npm install`, install Python, pip install `server/analytics/requirements.txt`, and start the server with `npm start`.

3. Frontend (Vercel)

- In the `client` folder the build script is `npm run build` and outputs to `dist` (webpack).
- In Vercel, create a new project from the repo, set the root directory to `/client`.
- Set the Build Command: `npm run build`
- Set the Output Directory: `dist`
- Add Environment Variables in Vercel (Production):
  - `API_URL` = `https://<your-render-server-host>` (point to your Render server base URL, e.g. `https://myapp.onrender.com` or `https://api.myapp.com`)
- Deploy.

4. Local and Docker Compose notes

- The existing `server/Dockerfile` already installs Python and analytics dependencies.
- For local Docker Compose, ensure `MONGO_URI` in `docker-compose.yml` points to Atlas or the `mongo` service.

5. Enabling Python analytics integration

- The server already exposes analytics endpoints implemented in Node (`server/services/analyticsService.js`).
- The Python analytics modules are copied into `server/analytics` and a Node bridge was added at `server/services/pythonAnalyticsService.js`.
- To use the Python implementations instead of the Node ones, either:
  - Add query parameter `?source=python` to analytics requests (e.g. `/api/v1/analytics/sales?source=python`), or
  - Set environment variable `USE_PYTHON_ANALYTICS=true` in your server deployment to route analytics calls to the Python scripts by default.

6. Environment `.env` templates

- `server/.env.example` (create locally):
  MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/mern_ecommerce
  PORT=3000
  JWT_SECRET=your_jwt_secret

- `client/.env` (Vercel): set `API_URL` to your deployed server URL.

7. Verification

- After deployment:
  - Visit Vercel frontend and perform actions that create orders/users.
  - Call analytics endpoints: `GET https://<server>/api/v1/analytics/sales` (append `?source=python` to use Python bridge)

Notes & troubleshooting

- Render may need longer build time because Docker installs Python and pip packages. Increase build timeout if needed.
- If Python packages fail to install on Render, use the provided Dockerfile to pin versions; the `server/analytics/requirements.txt` mirrors the original analytics requirements.

If you want, I can:

- (A) Update `server/Dockerfile` to copy `server/analytics` instead of root `analytics`.
- (B) Add a `server/.env.example` file and a `client/.env.production` template.
- (C) Create a `render.yaml` sample or Vercel project configuration files.
