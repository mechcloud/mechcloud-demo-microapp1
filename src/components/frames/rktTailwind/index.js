import { defineAsyncComponent } from "vue";

const RktTailwind = defineAsyncComponent(() =>
   import("./RktTailwind.vue")
)

const RktTailwindProps = defineAsyncComponent(() =>
   import("./RktTailwindProps.vue")
)

const RktMenuWrapper = defineAsyncComponent(() =>
   import("./fragments/RktMenuWrapper.vue")
)

export {
   RktTailwind,
   RktTailwindProps,
   RktMenuWrapper
}
