import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Remove deprecated optimizeDeps.disabled to allow proper pre-bundling
  // If you ever need to tune deps optimization, prefer optimizeDeps.noDiscovery or include/exclude.
})
