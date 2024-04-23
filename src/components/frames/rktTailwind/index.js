import { defineAsyncComponent } from "vue";

const RktTailwind = defineAsyncComponent(() =>
   import("./RktTailwind.vue")
)

export {
   RktTailwind
}
