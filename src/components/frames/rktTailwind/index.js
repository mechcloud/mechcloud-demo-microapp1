import { defineAsyncComponent } from "vue";

const RktFrameTailwind = defineAsyncComponent(() =>
   import("./RktFrameTailwind.vue")
)

const RktFrameTailwindProps = defineAsyncComponent(() =>
   import("./RktFrameTailwindProps.vue")
)

const RktFrameTailwindMenuWrapper = defineAsyncComponent(() =>
   import("./fragments/RktFrameTailwindMenuWrapper.vue")
)

export {
   RktFrameTailwind,
   RktFrameTailwindProps,
   RktFrameTailwindMenuWrapper
}
