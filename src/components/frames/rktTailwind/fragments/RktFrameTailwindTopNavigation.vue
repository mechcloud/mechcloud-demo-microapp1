<template>
   <div 
      v-if="nodes.length > 0"
      mc-role="frame-tailwind-top-navigation"
      class="mc-flex"
      style="row-gap: 1rem;"
   >
      <span  class="mc-fs-1125 mc-fw-7" style="margin-right: 1rem;">{{frameVars.title}}</span>
      <template v-for="topNode in filterNodes(nodes)">
         <template v-if="topNode.children">
            <mc-menu-wrapper>
               <template #trigger="slotProps">
                  <span 
                     style="padding: 5px;"
                     tabindex="0"
                     @focus="slotProps.updateFlag(true)"
                     @blur="slotProps.updateFlag(false)"
                  >
                     {{ topNode.attrs.title }}
                     <mc-icon 
                        icon="caret-down" 
                     />
                  </span>
               </template>
               <template #menu-content>
                  <!-- <mc-generic-menu 
                     :nodes="topNode.children"
                     icon="caret-right"
                  >
                     <template #slot1="slotProps">
                        <mc-navigation-link
                           :title="slotProps.node.attrs.title"
                           :uriPrefix="'/' + topNode.attrs.mapping"
                           :mapping="slotProps.node.attrs.mapping"
                        />
                     </template>
                     <template #slot2="slotProps">
                        <span 
                           style="padding-right: 0;"
                        >
                           {{ slotProps.node.attrs.title }}
                        </span>
                     </template>
                  </mc-generic-menu> -->
                  <rkt-frame-tailwind-menu-wrapper 
                     uriPrefix=""
                     :parentNode="topNode" 
                     :children="filterNodes(topNode.children)" 
                  />
               </template>
            </mc-menu-wrapper>
         </template>
         <mc-navigation-link
            v-else
            :title="topNode.attrs.title"
            uriPrefix=""
            :mapping="topNode.attrs.mapping"
         />
      </template>
   </div>
</template>

<script>
export default {
   // inheritAttrs: false
}
</script>

<script setup>
import {
   inject,
} from 'vue'
import { 
   McNavigationLink,
} from '@mechcloud/piston-ui-sdk'

// import RktMenuWrapper from './RktMenuWrapper.vue';

// const { mcCmpntName, mcContext } = mcUseGlobalCmpntUtils()
// const logPrefix = `${mcCmpntName} ::`

const props = defineProps({
   nodes: Array
})

const pageMode = inject('pageMode')

const frameVars = inject('frameVars')

function filterNodes(nodes) {
   // console.log(pageMode)
   // console.log(nodes)
   if(pageMode != 'design') {
      return nodes.filter(node => !node.hasOwnProperty('hidden') || !node.hidden)
   }

   return nodes
}
</script>

<style>
@import '@/styles/shadcn.css';

div[mc-role=frame-tailwind-top-navigation] {
   & ul[mc-role=generic-menu] {
      /* display: block; */
      min-width: 10rem;
      max-width: 20rem;
   }

   & a[mc-role=navigation-link] {
      display: block;
      /* width: 100%; */
      padding: 4px 6px;
      color: rgb(17, 24, 39);
      text-decoration: none;
      border-radius: 4px;

      &:hover {
         /* color: rgb(28, 100, 242); */
         outline: none;
         @extend .tw1-bg-accent;
      }
   }

   & div:hover {
      @extend .tw1-bg-accent;
   }
}
</style>

