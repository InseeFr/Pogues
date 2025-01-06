/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INSEE: string;
  readonly VITE_ACTIVE_NAMESPACES: string;
  readonly VITE_API_URL: string;
  readonly VITE_AUTH_TYPE: string;
  readonly VITE_DEFAULT_USER_ID: string;
  readonly VITE_DEFAULT_USER_NAME: string;
  readonly VITE_DEFAULT_USER_STAMP: string;
  readonly VITE_LOG_LEVEL: string;
  readonly VITE_OIDC_AUTHORITY: string;
  readonly VITE_OIDC_CLIENT_ID: string;
  readonly VITE_PUBLIC_ENEMY_URL: string;
  readonly VITE_TROMBI_URL: string;
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
