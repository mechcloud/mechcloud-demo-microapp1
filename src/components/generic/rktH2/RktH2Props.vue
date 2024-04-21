<template>
   <div 
      class="mc-controls"
   >
      <mc-text 
         label="Message" 
         v-model="selectedControl.metadata.props.msg" 
      />
   </div>
</template>

<script setup>
   import { 
      inject
   } from 'vue'

   const selectedControl = inject('selectedControl')
</script>

