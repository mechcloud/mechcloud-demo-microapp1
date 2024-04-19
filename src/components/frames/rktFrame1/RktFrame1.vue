<template>
   <header>
      <strong style="font-size: larger;">Rocket</strong>
   </header>
   <main>
      <mc-render-node />
   </main>
</template>

<script setup>
import { 
   McRenderNode
} from '@mechcloud/piston-ui-sdk'
</script>

<style scoped>
header {
   padding-inline-start: 1rem;
    padding-inline-end: 1rem;
    padding-top: .75rem;
    padding-bottom: .75rem;
    background-color: #f9fafb;
    border-bottom: 1px solid #f3f4f6;
    z-index: 5;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
}

main {
   padding: 1rem;
}
</style>
