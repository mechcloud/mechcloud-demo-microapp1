<template>
   <div
      mc-role="layout-blog-post"
   >
      <div class="navigation">
         <h3>All Posts in Series</h3>
         <ul>
            <li 
               v-for="siteNode in parentSiteNode.children.filter(siteNode => !siteNode.hidden)"
               :key="siteNode.id"
               class="tw1-border1"
            >
               <mc-navigation-link
                  :title="siteNode.attrs.title"
                  :uriPrefix="'/' + siteNode.attrs.prefix"
                  :mapping="siteNode.attrs.mapping"
                  :class="{ selected: siteNode.id === targetSiteNode.id }"
               />
            </li>
         </ul>
      </div>
      <div class="content mc-scrollbar">
         <mc-render-node />
      </div>
   </div>
</template>

<script>
export default {
   inheritAttrs: false,
}
</script>

<script setup>
import { 
   inject,
   provide,
   ref,
   onBeforeMount
} from 'vue'
import { 
   mcLog
} from "@mechcloud/shared-js"
import { 
   McRenderNode, 
   McNavigationLink,
   mcUseNavigationStore,
   mcUseGlobalCmpntUtils,
   mcGetUriTokens1,
   mcGetContext
} from '@mechcloud/piston-ui-sdk'

const { mcCmpntName } = mcUseGlobalCmpntUtils()
const logPrefix = `${mcCmpntName} ::`

mcLog(logPrefix, `Entering setup() ..`)

const mcNavigationStore = mcUseNavigationStore(window.pinia)
const targetSiteNode = mcNavigationStore.getSiteNode()

const mcContext = mcGetContext()

// const renderNode = inject('render-node')
// const uriPrefix = inject('uriPrefix')
// mcLog(logPrefix, `Uri prefix : ${uriPrefix}`)

const uriTokens = mcGetUriTokens1()
uriTokens.pop()
const parentUri = uriTokens.join('/')
mcLog(logPrefix, `Parent uri : ${parentUri}`)
const parentSiteNode = mcContext.siteNodesIndex[parentUri]

const expandedItemIds = ref([])
provide('expandedItemIds', expandedItemIds)

onBeforeMount(() => {
   mcLog(logPrefix, `Entering onBeforeMount() ..`)

   mcNavigationStore.navTrail.forEach(node => {
      expandedItemIds.value.push(node.id)
   })

   mcLog(logPrefix, `Leaving onBeforeMount().`)
})

mcLog(logPrefix, `Leaving setup().`)
</script>

<style>
div[mc-role="layout-blog-post"] {
   display: grid;
   grid-template-columns: 15rem 1fr;
   height: calc(100vh - 4.25rem);
   overflow: hidden; /* Prevent scrolling on the layout root */
   /* background-color: rgb(222, 228, 222); */
   box-shadow: 0 2px 5px rgba(0,0,0,0.1);

   & > .navigation {
      padding: 1rem;
      box-shadow: 5px 0 5px -5px gray;
      overflow-y: auto; /* Allow vertical scrolling if needed */

      & > h3 {
         font-size: 1.5rem;
         font-weight: 700;
         margin-bottom: 0.75rem;
         color: hsl(var(--muted-foreground));
      }

      & li {
         font-size: 0.85rem;
         margin-top: 0.5rem;
         padding: 0.25rem;

         &:first-child {
            margin-top: 0 !important;
         }

         & > a {
            display: block;
            color: hsl(var(--muted-foreground));
         }

         & > a.selected {
            font-weight: 500;
            color: hsl(var(--foreground));
         }
      }
   }

   & > .content {
      padding: 1rem;
      min-height: 20rem;
      overflow-y: auto; /* Allow vertical scrolling */
   }
}
</style>

