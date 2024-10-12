// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },

//   component: {
//     devServer: {
//       framework: "create-react-app",
//       bundler: "webpack",
//     },
//   },
// });



import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Укажите путь к вашим тестам
  },
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
