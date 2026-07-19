/** @type {import('next').NextConfig} */
// No `output: 'export'` — the pages stay static, but /api/assess needs a
// serverless function on Vercel. No database anywhere; the endpoint is stateless.
const nextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  outputFileTracingRoot: import.meta.dirname,
  // No ESLint config in this app — without this, builds pick up the parent
  // website repo's .eslintrc.json and crash. TypeScript checking still runs.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
