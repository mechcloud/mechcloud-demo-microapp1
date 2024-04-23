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
      inject,
      onMounted
   } from 'vue'

   const selectedControl = inject('selectedControl')

   onMounted(() => {
      if(selectedControl.value.metadata.props.msg === undefined) {
         selectedControl.value.metadata.props.msg = 'Heading2'
      }
    })
</script>

