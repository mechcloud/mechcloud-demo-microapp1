<template>
   <header
      class="mc-container header tw-sticky tw-z-50 tw-bg-white/90 tw-backdrop-blur-lg tw-inset-x-0 tw-top-0 tw-border-b tw-border-gray-100 tw-py-3 mc-flex mc-flex-h-space-between"
      style="flex-direction: row;"
   >
      <a 
            href="https://tailwindcss.com" 
            target="_blank"
            class="mc-flex mc-flex-v-center"
            style="gap: 0.3rem; flex-direction: row;"
      >
            <strong style="font-size: larger;">Tailwind</strong>
      </a>
   </header>
</template>

<script> 
export default {
   // inheritAttrs: false,
}
</script>

<script setup> 
import { 
   McNavigationLink,
} from '@mechcloud/piston-ui-sdk'
</script>

<style scoped> 
   @container mc-container (max-width: 430px) {
      nav, .nav-btns {
            display: none;
      }
   }
   
   .header {
      padding-inline-start: 1rem;
      padding-inline-end: 1rem;
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

