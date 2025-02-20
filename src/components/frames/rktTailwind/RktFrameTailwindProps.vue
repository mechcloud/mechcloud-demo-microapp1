<template>
   <div 
      class="mc-controls"
   >
      <mc-text
         label="Title"
         v-model="settings.title"
      />

      <mc-button
         label="Save"
         style="width: max-content"
         @click="pageDesignerEvent = { eventName: 'update-frame-props', eventData: settings }"
      />
   </div>
</template>

<script setup>
   import { mcClone } from '@mechcloud/shared-js'
   import { mcUseGlobalCmpntUtils } from '@mechcloud/piston-ui-sdk'
   import { 
      reactive,
      inject,
      onMounted,
      watch
   } from 'vue'

   const { mcContext } = mcUseGlobalCmpntUtils()

   defineEmits(['update-frame-props'])

   // const selectedControl = inject('selectedControl')

   const frameVars = inject('frameVars')
   const pageDesignerEvent = inject('pageDesignerEvent')

   const settings = reactive(
                     mcClone(frameVars.value)
                  )

   // onMounted(() => {

   // })

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

