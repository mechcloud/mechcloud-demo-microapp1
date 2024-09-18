<template>
   <div 
      class="mc-controls"
   >
      <mc-select
         label="Select a post"
         :options="posts"
         v-model="selectedPost"
         style="max-width: 100%;"
      >
      </mc-select>
   </div>
</template>

<script setup>
   import { 
      inject,
      onBeforeMount,
      shallowRef,
      watch
   } from 'vue'
   import { 
      useClient,
      useQuery 
   } from 'villus'
   import { 
      mcLog,
      mcGenerateUuid
   } from '@mechcloud/shared-js'

   const logPrefix = 'McBlogPostProps ::'
   
   const posts = shallowRef([])
   const selectedPost = shallowRef({})

   useClient({
      url: 'https://gql.hashnode.com'
   })

   const listPosts = `
      query GetPosts {
         publication(host: "blog.mechcloud.io") {
            title
            posts(first: 10) {
               edges {
                  node {
                     slug 	
                     title
                  }
               }
            }
         }
      }
   `

   const { data, execute } = useQuery({
      query: listPosts,
      fetchOnMount: false
   })

   onBeforeMount(async () => {
      mcLog(logPrefix, `Entering onBeforeMount() ..`)
      
      mcLog(logPrefix, 'Loading list of posts ..')
      await execute()

      if(data.value) {
         mcLog(logPrefix, 'Setting posts data ..')

         posts.value = data.value.publication.posts.edges.map(
                        edge => ({ 
                           id: edge.node.slug,
                           label: edge.node.title
                        })
                     )
      }

      mcLog(logPrefix, `Leaving onBeforeMount().`)
   })

   // console.log(error)

   // const getPosts = (data) => {
   //    if(data) {
   //       return data.publication.posts.edges.map(
   //          edge => { 
   //             return { 
   //                id: edge.node.slug,
   //                label: edge.node.title
   //             } 
   //          }
   //       )
   //    }

   //    return []
   // }

   // onMounted(async () => {
   //    mcLog(logPrefix, `Entering onMounted() ..`)

   //    execute()

   //    console.log(data)
   //    // const data = resp.data

   //    posts.value = data.publication.posts.edges.map(
   //                   edge => { 
   //                      return { 
   //                         id: edge.node.slug,
   //                         label: edge.node.title
   //                      } 
   //                   }
   //                )
   // })

   const selectedControl = inject('selectedControl')

   watch(
      selectedPost,
      (newVal, oldVal) => {
         mcLog(logPrefix, `Entering watch() ..`)

         Object.assign(
            selectedControl.value.metadata.props,
            newVal
         )

         selectedControl.value.id = mcGenerateUuid()

         mcLog(logPrefix, `Leaving watch().`)
      }
   )
</script>

<style>
</style>

