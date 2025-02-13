<template>
      <mc-generic-menu
         :uriPrefix="uriPrefix" 
         :parentNode="parentNode"
         :children="children"
         icon="caret-right"
      >
         <template #slot1="slotProps">
            <mc-navigation-link
               :title="slotProps.node.attrs.title"
               :uriPrefix="slotProps.uriPrefix"
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
         <template  #slot3="slotProps">
            <rkt-frame-tailwind-menu-wrapper 
               :uriPrefix="slotProps.uriPrefix"
               :parentNode="slotProps.parentNode"
               :children="filterNodes(slotProps.children)" 
            />
         </template>
      </mc-generic-menu>
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

const props = defineProps({
   uriPrefix: String,
   parentNode: Object,
   children: Array
})

const pageMode = inject('pageMode')

function filterNodes(nodes) {
   // console.log(pageMode)
   // console.log(nodes)
   if(pageMode !== 'design') {
      return nodes.filter(node => !node.hasOwnProperty('hidden') || !node.hidden)
   }

   return nodes
}
</script>

