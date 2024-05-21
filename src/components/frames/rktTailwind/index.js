import { defineAsyncComponent } from "vue";

const RktTailwind = defineAsyncComponent(() =>
   import("./RktTailwind.vue")
)

const RktTailwindProps = defineAsyncComponent(() =>
   import("./RktTailwindProps.vue")
)

export {
   RktTailwind,
   RktTailwindProps
}
