<template>
   <h2 v-if="isEditMode" v-model-text:msg="msg"></h2>
   <h2 v-else v-text="msg"></h2>
</template>

<script setup>
   import { inject } from 'vue';
   
   defineProps({
      msg: String
   })

   const isEditMode = inject('isEditMode')
</script>