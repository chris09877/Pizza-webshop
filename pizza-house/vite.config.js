// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom'], // Add any other necessary dependencies here
   }//si t'as encore erreur avec auth context faudra peut etre retirer tout les import react des files ,
  // esbuild: {
  //   jsxFactory: 'React.createElement',
  //   jsxInject: `import React from 'react'`,
  // },
});
