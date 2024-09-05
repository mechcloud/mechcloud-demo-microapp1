import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";


export default [
   {
      plugins: {
        //  cflint: pluginCloudflare
      }
   },
   {
      files: ["src/**/*.{js,vue}"]
   },
   {
      languageOptions: {
         globals: {
            API_GATEWAY_BASE_URL: "readable",
            API_GATEWAY_PY_BASE_URL: "readable",
            API_GATEWAY_BASE_URL1: "readable",
            MARKDOWN_IT: "readable"
         }
      }
   },
   js.configs.recommended,
   ...pluginVue.configs["flat/essential"],
   {
      rules: {
         "no-prototype-builtins": "warn",
         "no-empty": "warn",
         "no-unused-vars": "warn",
         "vue/require-v-for-key": "warn",
         "vue/require-valid-default-prop": "warn",
         "vue/valid-v-for": "warn",
         "vue/no-unused-vars": "warn",
         "vue/no-ref-as-operand": "warn",
         "vue/no-mutating-props": "warn",
         "vue/require-component-is": "warn"
      }
   }
];
