import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://marlonrobledo-coder.github.io/hnet-suporte1/
const REPO_NAME = '/hnet-suporte1/';
export default defineConfig({
  plugins: [react()],
  base: REPO_NAME,
})
