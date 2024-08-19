<template>
   <header class="mc-flex mc-flex-h-space-between">
      <span>
         <strong style="font-size: larger;">Rocket</strong>
      </span>
      <ul>
         <li v-for="siteNode in $mcContext.siteMap">
            <mc-navigation-link 
               :title="siteNode.attrs.title"
               uriPrefix=""
               :mapping="siteNode.attrs.mapping" 
            />
         </li>
      </ul>
      <span class="email">{{ $mcContext.user.email }}</span>
   </header>
   <main>
      <mc-render-node />
   </main>
</template>

<script setup>
import { 
   McRenderNode,
   McNavigationLink
} from '@mechcloud/piston-ui-sdk'
</script>

<style>
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

   & > ul {
      list-style-type: none;
      display: inline-flex;
      gap: 1rem;
      margin: 0;

      & a {
         text-decoration: none;
         color: black;
         font-weight: 500;
         font-size: 0.825rem;
      }
   }

   & > .email {
      color: black;
      font-weight: 500;
   }
}

main {
   padding: 1rem;
}
</style>
