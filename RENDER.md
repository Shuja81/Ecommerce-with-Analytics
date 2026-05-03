**Render (Node service) deployment guide — no Docker**

1. Create a new Web Service on Render

- Connect your GitHub repo and select this repository.
- For the Service type choose **Web Service** and the Environment choose **Node** (not Docker).

2. Build & Start commands

- Build Command: `npm install --production` (Render runs this by default for Node)
- Start Command: `npm start` (already defined in `server/package.json` as `cross-env NODE_ENV=production node index.js`)

3. Root & Working directory

- Set the Root Directory for the service to `/server` so Render runs node from the server folder.

4. Environment Variables (set these in Render dashboard)

- `MONGO_URI` — your MongoDB Atlas connection string
- `PORT` — leave default or set to `3000`
- `JWT_SECRET` — your JWT secret
- Optional: `USE_PYTHON_ANALYTICS=false` (default). If you want Python analytics, set to `true` and ensure Python is available (see note).

5. Python analytics note

- The Node environment on Render doesn't include system Python/pip by default. To use the Python bridge (`USE_PYTHON_ANALYTICS=true`) you have two options:
  - Use Docker (recommended for full Python support). See `server/Dockerfile` already present.
  - Deploy Python analytics as a separate Render service (Python) and call it over HTTP from the Node server. This avoids Docker and keeps runtimes separate.

6. Health checks & readiness

- Configure a health check URL such as `/api/v1/analytics/health` or `/api/v1/health` so Render can verify the process.

7. Deploy & verify

- Deploy the service. After deployment, set `API_URL` in Vercel to the Render URL.
- Test: `curl 'https://<render-service>/api/v1/analytics/sales'`
