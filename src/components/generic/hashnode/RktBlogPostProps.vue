<template>
   <div 
      class="mc-controls"
   >
      <mc-select
         label="Select a blog"
         :options="blogs"
         v-model="selectedBlog"
      >
      </mc-select>
      <mc-select
         v-if="selectedBlog.id"
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
computed,
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

   const blogs = [
      {
         id: 'blog.mechcloud.io',
         label: 'MechCloud'
      },
      {
         id: 'academy.mechcloud.io',
         label: 'MechCloud Academy'
      }
   ]

   const selectedBlog = shallowRef({})
   
   const posts = shallowRef([])
   const selectedPost = shallowRef({})

   useClient({
      url: 'https://gql.hashnode.com'
   })

   const listPosts = computed(() => {
      return `
         query GetPosts {
            publication(host: "${selectedBlog.value.id ? selectedBlog.value.id : ''}") {
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
   })

   // console.log(listPosts.value)

   const { data, execute } = useQuery({
      query: listPosts,
      fetchOnMount: false
   })

   async function loadPosts() {
      mcLog(logPrefix, `Entering loadPosts() ..`)
      
      mcLog(logPrefix, 'Loading list of posts ..')
      // console.log(listPosts.value)
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

      mcLog(logPrefix, `Leaving loadPosts().`)
   }

   const selectedControl = inject('selectedControl')

   watch(
      selectedBlog,
      async () => {
         mcLog(logPrefix, `Entering watch() for selectedBlog ..`)

         selectedPost.value = {
            id: '',
            label: 'Loading ..'
         }
         await loadPosts()
         selectedPost.value = {
            id: '',
            label: ''
         }

         mcLog(logPrefix, `Leaving watch().`)
      }
   )

   watch(
      selectedPost,
      (newVal) => {
         mcLog(logPrefix, `Entering watch() for selectedPost ..`)

         if(newVal.id != '') {
            Object.assign(
               selectedControl.value.metadata.props,
               {
                  blogId: selectedBlog.value.id,
                  postId: selectedPost.value.id
               }
            )

            selectedControl.value.id = mcGenerateUuid()
         }

         mcLog(logPrefix, `Leaving watch().`)
      }
   )
</script>

<style>
</style>

