import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_CLIENT_ID': JSON.stringify(env.REACT_APP_CLIENT_ID),
      'process.env.REACT_APP_SECRET': JSON.stringify(env.REACT_APP_SECRET)
    },
    plugins: [react()],
  }
})