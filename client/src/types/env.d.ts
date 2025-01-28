/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_PORT: string
  // Add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
