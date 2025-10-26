// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// O nome do seu repositório no GitHub Pages é 'hnet-suporte1'
const REPO_NAME = '/hnet-suporte1/'; 

export default defineConfig({
  plugins: [react()],
  // ESSA É A LINHA CRUCIAL: define o caminho base para a subpasta do GitHub Pages
  base: REPO_NAME, 
});
})
