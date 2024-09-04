<template>
   <!-- <h2 v-if="isEditMode" v-model-text:msg="msg"></h2>
   <h2 v-else v-text="msg"></h2> -->
   <mc-edit-text
      tag="h2"
      arg="msg"
      :mapping="msg"
   />
</template>

<script setup>
   import {
      McEditText
   } from '@mechcloud/piston-ui-sdk'
   
   defineProps({
      msg: String
   })
</script>