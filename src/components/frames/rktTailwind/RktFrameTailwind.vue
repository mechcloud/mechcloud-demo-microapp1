<template>
   <template
      v-if="pageMode == 'design' || targetSiteNode.renderFrame">
      <rkt-frame-tailwind-header />
      <main style="max-width: 1440px; margin: auto; padding: 0.2rem;">
         <mc-render-node />
      </main>

      <!-- This is required to remove focus away
      after clicking on navigation context menu -->
      <a 
         hef="#" 
         ref="navHideFocus"
         tabindex="0"
      />
   </template>

   <!-- Rendering without frame -->
   <mc-render-node v-else />
</template>

<script>
export default {
   // inheritAttrs: false
}
</script>

<script setup>
import { 
   McRenderNode,
   mcUseNavigationStore
} from '@mechcloud/piston-ui-sdk'

import RktFrameTailwindHeader from './fragments/RktFrameTailwindHeader.vue'
import { inject, onMounted, provide, shallowRef } from 'vue';

const mcNavigationStore = mcUseNavigationStore(window.pinia)

const targetSiteNode = mcNavigationStore.getSiteNode()
// console.log(targetSiteNode)

const pageMode = inject('pageMode')

const navHideFocus = shallowRef(null)
provide('nav-hide-focus', navHideFocus)

const frameVars = inject('frameVars')

onMounted(() => {
   if(Object.keys(frameVars.value).length == 0) {
      frameVars.value = {
         title: 'Rocket'
      }
   }
})
</script>

<style>
   .tw1-theme-black {
      --background: 0 0% 100%;
      --foreground: 240 10% 3.9%;
      --card: 0 0% 100%;
      --card-foreground: 240 10% 3.9%;
      --popover: 0 0% 100%;
      --popover-foreground: 240 10% 3.9%;
      --primary: 240 5.9% 10%;
      --primary-foreground: 0 0% 98%;
      --secondary: 240 4.8% 95.9%;
      --secondary-foreground: 240 5.9% 10%;
      --muted: 240 4.8% 95.9%;
      --muted-foreground: 240 3.8% 46.1%;
      --accent: 240 4.8% 95.9%;
      --accent-foreground: 240 5.9% 10%;
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 0 0% 98%;
      --border: 240 5.9% 90%;
      --input: 240 5.9% 90%;
      --ring: 240 5.9% 10%;
      --radius: 0.5rem;
   }

   .tw1-theme-blue {
      --background: 0 0% 100%;
      --foreground: 222.2 84% 4.9%;
      --card: 0 0% 100%;
      --card-foreground: 222.2 84% 4.9%;
      --popover: 0 0% 100%;
      --popover-foreground: 222.2 84% 4.9%;
      --primary: 221.2 83.2% 53.3%;
      --primary-foreground: 210 40% 98%;
      --secondary: 210 40% 96.1%;
      --secondary-foreground: 222.2 47.4% 11.2%;
      --muted: 210 40% 96.1%;
      --muted-foreground: 215.4 16.3% 46.9%;
      --accent: 210 40% 96.1%;
      --accent-foreground: 222.2 47.4% 11.2%;
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 210 40% 98%;
      --border: 214.3 31.8% 91.4%;
      --input: 214.3 31.8% 91.4%;
      --ring: 221.2 83.2% 53.3%;
      --radius: 0.5rem;
   }
</style>

<style>
/* main {
   margin-top: 3rem;
   padding: 1rem;
} */
</style>

