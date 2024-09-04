<template>
   <header
      class="mc-container header tw-sticky tw-z-10 tw-bg-white/90 tw-backdrop-blur-lg tw-inset-x-0 tw-top-0 tw-border-b tw-border-gray-100 tw-py-3 mc-flex mc-flex-v-center mc-fs-0875"
      style="flex-direction: row; gap: 1rem;"
   >
      <a 
         href="https://ui.shadcn.com" 
         target="_blank"
      >
         <strong style="font-size: larger;">Rocket</strong>
      </a>
      
      <nav id="top-navigation" data="mc-static-global" style="display: contents;">
         <rkt-frame-tailwind-top-navigation
            class="mc-flex mc-flex-v-center"
            style="gap: 0.5rem;"
            uriPrefix=""
            :nodes="$mcContext.siteMap"
         />
      </nav>
      
      <div v-if="!isStaticVersion" style="margin-left: auto;">{{ $mcContext.user.email }}</div>
   </header>
</template>

<script> 
export default {
   // inheritAttrs: false,
}
</script>

<script setup>
import { inject } from 'vue';
import RktFrameTailwindTopNavigation from './RktFrameTailwindTopNavigation.vue'

const isStaticVersion = inject('isStaticVersion')
</script>

<style> 
   @container mc-container (max-width: 430px) {
      nav, .nav-btns {
            display: none;
      }
   }
   
   .header {
      padding-inline-start: 1rem;
      padding-inline-end: 1rem;

      & > nav {
         width: calc(100vw - 2rem);
         margin: auto;
      }
   }

   .nav-link {
      color: rgb(3 7 18);
      line-height: 1.25rem;
      font-weight: 600;
      font-size: .875rem;
      padding: 0.375rem 0.75rem;
      border-radius: 0.5rem;

      &:hover {
            color: rgb(21 93 238);
            background-color: rgb(242 244 247);
      }
   }
</style>

