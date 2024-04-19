import { defineAsyncComponent } from "vue";

const RktFrame1 = defineAsyncComponent(() =>
   import("./RktFrame1.vue")
)

export {
   RktFrame1
}
