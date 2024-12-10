import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/RoxyMoxxieDev.github.io/drum-machine/',
  plugins: [react()],
})
