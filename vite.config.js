/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]
// https://vite.dev/config/
export default defineConfig({
  base: repo ? `/${repo}/` : '/',
  plugins: [react()],
})


