import { defineAsyncComponent } from "vue";

const RktTailwind = defineAsyncComponent(() =>
   import("./RktTailwind.vue")
)

const RktTailwindProps = defineAsyncComponent(() =>
   import("./RktTailwindProps.vue")
)

const RktTailwindMenuWrapper = defineAsyncComponent(() =>
   import("./fragments/RktTailwindMenuWrapper.vue")
)

export {
   RktTailwind,
   RktTailwindProps,
   RktTailwindMenuWrapper
}
