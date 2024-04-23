<template>
   <rkt-tailwind-header />
   <main>
      <mc-render-node />
   </main>
</template>

<script>
export default {
   // inheritAttrs: false
}
</script>

<script setup>
import { 
   McRenderNode
} from '@mechcloud/piston-ui-sdk'

import RktTailwindHeader from './fragments/RktTailwindHeader.vue'
</script>

<style>
   /* @import '@/css/form-controls.css' */
</style>

<style scoped>
/* main {
   margin-top: 3rem;
   padding: 1rem;
} */
</style>

