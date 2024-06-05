import vue from '@vitejs/plugin-vue'
export default {
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'iq-chat-lib',
      fileName: 'chat-lib',
      formats: ['umd']
    }
  },
};