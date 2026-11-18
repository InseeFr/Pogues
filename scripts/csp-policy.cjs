"use strict";

function getOrigin(value) {
  if (!value || value.startsWith("/")) {
    return;
  }

  return new URL(value).origin;
}

function getScriptElementSources() {
  // For vite-envs usage, see https://github.com/garronej/vite-envs/issues/31,
  // 'unsafe-inline' is required because vite-envs injects a <script> AT RUNTIME
  // (via vite-envs.sh), whose content (base64-encoded environment) varies
  // between deployments and so cannot be hashed at build time.
  return ["'self'", "'unsafe-inline'"];
}

function getScriptSources() {
  // Check if it is really needed depending on libraries used
  // `unsafe-inline` is required to load inline styles from third party libraries
  return ["'self'", "'unsafe-inline'", "'unsafe-eval'"];
}

function createCspPolicy(env, hmrPort) {
  // Env var injection
  const connectSources = [
    "'self'",
    // Only needed in local dev mode
    `ws://localhost:${hmrPort}`,
    getOrigin(env.VITE_API_URL),
    getOrigin(env.VITE_OIDC_ISSUER),
    getOrigin(env.VITE_PERSONALIZATION_URL),
  ].filter((source) => source !== undefined);
  // OIDC-spa renews token via a iframe from the issuer
  const frameSources = ["'self'", getOrigin(env.VITE_OIDC_ISSUER)].filter(
    (source) => source !== undefined,
  );

  return {
    "default-src": ["'self'"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
    "script-src": getScriptSources(),
    "script-src-elem": getScriptElementSources(),
    "style-src": ["'self'"],
    "style-src-elem": ["'self'", "'unsafe-inline'"],
    // For Monaco editor library uses dynamic css import
    "style-src-attr": ["'unsafe-inline'"],
    "img-src": ["'self'"],
    "font-src": ["'self'"],
    "worker-src": ["'self'", "blob:"],
    "connect-src": [...new Set(connectSources)],
    "frame-src": [...new Set(frameSources)],
  };
}

exports.createCspPolicy = createCspPolicy;
