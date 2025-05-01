<template>
   <div 
      class="mc-controls"
   >
      <mc-select
         label="Theme"
         :options="themes"
         v-model="theme"
      >
      </mc-select>
   </div>
</template>

<script setup>
   import { 
      inject,
      onMounted
   } from 'vue'

   const theme = inject('theme')

   const themes = [
      {
         id: 'tw1-theme-black',
         label: 'Black'
      },
      {
         id: 'tw1-theme-blue',
         label: 'Blue'
      }
   ]
</script>

