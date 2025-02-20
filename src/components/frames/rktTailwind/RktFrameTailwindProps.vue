<template>
   <div 
      class="mc-controls"
   >
      <mc-text
         label="Title"
         v-model="settings.title"
      />
   </div>
</template>

<script setup>
   import { mcClone } from '@mechcloud/shared-js'
   import { 
      reactive,
      inject,
      watch
   } from 'vue'

   defineEmits(['update-frame-props'])

   const frameVars = inject('frameVars')

   const settings = reactive(
                     mcClone(frameVars.value)
                  )

   watch(
      settings,
      (newVal) => {
         frameVars.value = newVal
      },
      {
         deep: true
      }
   )
</script>

