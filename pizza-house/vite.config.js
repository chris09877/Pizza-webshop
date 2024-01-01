// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ['react', 'react-dom'], // Add any other necessary dependencies here
//    }//si t'as encore erreur avec auth context faudra peut etre retirer tout les import react des files ,
//   // esbuild: {
//   //   jsxFactory: 'React.createElement',
//   //   jsxInject: `import React from 'react'`,
//   // },
// });


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { VitePluginWindicss } from 'vite-plugin-windicss'; // Add WindiCSS plugin for Tailwind CSS

// export default defineConfig({
//   plugins: [
//     react(),
//     VitePluginWindicss(), // Add WindiCSS plugin
//   ],
//   optimizeDeps: {
//     include: ['react', 'react-dom'], // Add any other necessary dependencies here
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [
    react(),
    WindiCSS(),
  ],
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});

