<template>
   <div 
      x-data="getBlogInitData()"
      v-if="postHtmlContent != ''" 
      mc-role="hashnode-blog-post" 
      class="post"
   >
      <!-- <div> -->
      <div class="post-content">
         <h1 class="blog-title">{{ blogTitle }}</h1>
         <div v-html="postHtmlContent"></div>
      </div>
      <div 
         v-if="toc.length > 0" 
         class="post-toc" 
         :key="activeHeading"
      >
         <h3>Table of Contents</h3>
         <ul>
            <li 
               v-for="item in toc" 
               :key="item.id"
            >
               <a 
                  :href="'#' + item.id" 
                  x-bind:class="activeHeading === $el.getAttribute('href').substring(1) ? 'active': ''"
                  x-on:click.prevent="scrollToHeading($event)"
                  v-text="item.text"
               ></a>
               <ul 
                  v-if="item.children"
               >
                  <li 
                     v-for="child in item.children" 
                     :key="child.id"
                  >
                     <a 
                        :href="'#' + child.id" 
                        x-bind:class="activeHeading === $el.getAttribute('href').substring(1) ? 'active': ''"
                        x-on:click.prevent="scrollToHeading($event)"
                        v-text="child.text"
                     ></a>
                  </li>
               </ul>
            </li>
         </ul>
      </div>
      <!-- </div> -->
   </div>
   <p v-else>Please select a post to display.</p>
</template>

<script>
   // export default {
   //    inheritAttrs: false
   // }
</script>

<script setup>
   import { shallowRef, watch, onMounted, nextTick, ref } from 'vue'
   import { useClient, useQuery } from 'villus'
   import { mcLog } from '@mechcloud/shared-js'
   // import hljs from 'highlight.js'
   // import 'highlight.js/styles/default.css' // You can choose a different style
   // import { throttle } from 'lodash-es'
   import MarkdownIt from 'markdown-it'

   const logPrefix = 'RktBlogPost ::'

   const props = defineProps({
      id: {
         type: String,
         default: ''
      },
      label: {
         type: String,
         default: ''
      }
   })

   const blogTitle = shallowRef('')
   const postHtmlContent = shallowRef('')
   const toc = shallowRef([])
   const activeHeading = ref('')
   // const observer = shallowRef(null)

   const markdownIt = new MarkdownIt()

   useClient({
      url: 'https://gql.hashnode.com'
   })

   const queryPostContent = `
      query GetPost($slug: String!) {
         publication(host: "blog.mechcloud.io") {
            title
            post(slug: $slug) {
                  title
                  content {
                     markdown
                     html
                  }
            }
         }
      }
   `

   const { data, execute } = useQuery({
      query: queryPostContent,
      fetchOnMount: false
   })

   function getPostContentAsHtml(data) {
      blogTitle.value = data.publication.post.title
      const html1 = markdownIt.render(data.publication.post.content.markdown)

      // Create a temporary DOM element to manipulate the HTML
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = html1

      // Add id attributes to headings
      const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6')
      headings.forEach(heading => {
         if (!heading.id) {
            heading.id = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-')
         }
      })

      // Add target="_blank" and rel="noopener noreferrer" to external links
      const links = tempDiv.querySelectorAll('a')
      links.forEach(link => {
         if (link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank')
            link.setAttribute('rel', 'noopener noreferrer')
         }
      })

      // Get the modified HTML
      let modifiedHtml = tempDiv.innerHTML

      // Replace YouTube links with embedded iframes
      modifiedHtml = modifiedHtml.replace(/%\[(https:\/\/www\.youtube\.com\/watch\?v=[\w-]+)\]/g, (match, p1) => {
         const videoId = p1.split('v=')[1];
         return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      })

      // nextTick(() => {
      //    highlightCode()
      // })

      return modifiedHtml
   }

   function generateTOC(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const headings = doc.querySelectorAll('h2, h3');
      const tocItems = [];
      let currentH2 = null;

      headings.forEach(heading => {
         const id = heading.id || heading.textContent.trim().toLowerCase().replace(/\s+/g, '-');
         heading.id = id;

         if (heading.tagName === 'H2') {
            currentH2 = { id, text: heading.textContent, children: [] };
            tocItems.push(currentH2);
         } else if (heading.tagName === 'H3' && currentH2) {
            currentH2.children.push({ id, text: heading.textContent });
         }
      });

      return tocItems;
   }

   // function highlightCode() {
   //    nextTick(() => {
   //       document.querySelectorAll('pre code').forEach((block) => {
   //          hljs.highlightElement(block)
   //       })
   //    })
   // }

   // function setupIntersectionObserver() {
   //    // mcLog(logPrefix, 'Setting up Intersection Observer ..')

   //    const options = {
   //       root: document.querySelector('div[mc-role="layout-blog-post"] > .content'),
   //       rootMargin: '100px 0px -90% 0px',
   //       threshold: 0
   //    }

   //    observer.value = new IntersectionObserver((entries) => {
   //       entries.forEach(entry => {
   //          if (entry.isIntersecting) {
   //             activeHeading.value = entry.target.id
   //          }
   //       })
   //    }, options)

   //    nextTick(() => {
   //       const headings = document.querySelectorAll('.post-content h2, .post-content h3')
   //       headings.forEach(heading => {
   //          observer.value.observe(heading)
   //       })
   //    })
   // }

   async function loadPostContent(id) {
      mcLog(logPrefix, `Loading post content for id: ${id}`)
      await execute({
         variables: {
            slug: id
         }
      })

      if (data.value) {
         mcLog(logPrefix, 'Setting post html content ..')

         postHtmlContent.value = getPostContentAsHtml(data.value)
         toc.value = generateTOC(postHtmlContent.value)

         nextTick(() => {
            // highlightCode()
            // setupIntersectionObserver()
         })
      }
   }

   onMounted(async () => {
      mcLog(logPrefix, 'Entering onMounted() ..')
      
      if (props.id) {
         await loadPostContent(props.id)
      }

      // window.getBlogInitData = () => ({
      //    toc: [],
      //    activeHeading: '',
      //    init() {
      //       // this.generateTOC()
      //       this.setupIntersectionObserver()
      //       this.highlightCode()
      //    },
      //    scrollToHeading(event) {
      //       const id = event.target.getAttribute('href').substring(1);
      //       console.log('Scrolling to heading: ' + id)
            
      //       this.activeHeading = id
      //       console.log('Target heading : ' + this.activeHeading)
            
      //       const element = document.getElementById(id)
      //       if (element) {
      //          const contentDiv = document.querySelector('div[mc-role="layout-blog-post"] > .content')
      //          if (contentDiv) {
      //             const topOffset = element.offsetTop - contentDiv.offsetTop
      //             contentDiv.scrollTo({
      //                top: topOffset,
      //                behavior: 'smooth'
      //             })

      //             // Update the active heading after a short delay
      //             const this1 = this
      //             setTimeout(() => {
      //                this1.activeHeading = id
      //             }, 100)
      //          }
      //       }
      //    },
      //    setupIntersectionObserver() {
      //       console.log('Setting up intersection observer ..')
      //       const options = {
      //          root: document.querySelector('div[mc-role="layout-blog-post"] > .content'),
      //          rootMargin: '100px 0px -90% 0px',
      //          threshold: 0
      //       }

      //       const this1 = this
      //       const observer = new IntersectionObserver((entries) => {
      //          entries.forEach(entry => {
      //             if (entry.isIntersecting) {
      //                this1.activeHeading = entry.target.id
      //                console.log('Active heading id : ' + this1.activeHeading)
      //             }
      //          })
      //       }, options)

      //       document
      //          .querySelectorAll('.post-content h2, .post-content h3')
      //          .forEach(heading => {
      //             // console.log(heading)
      //             observer.observe(heading)
      //          })
      //    },
      //    highlightCode() {
      //       document.querySelectorAll('pre code').forEach((block) => {
      //          hljs.highlightElement(block)
      //       })
      //    }
      // })

      // document.addEventListener(
      //    'alpine:init', 
      //    () => {
      //       console.log('Initializing alpine data ..')
      //       Alpine.data(
      //          'hashnodeBlogPost', 
      //          () => ({
      //             activeHeading: '',
                  
      //             init() {
      //                this.setupIntersectionObserver()
      //             },

      //             scrollToHeading(id) {
      //                console.log('Scrolling to heading: ' + id)
      //                const element = document.getElementById(id);
      //                if (element) {
      //                   element.scrollIntoView({ behavior: 'smooth' });
      //                }
      //             },

      //             setupIntersectionObserver() {
      //                const options = {
      //                   root: document.querySelector('div[mc-role="layout-blog-post"] > .content'),
      //                   rootMargin: '100px 0px -90% 0px',
      //                   threshold: 0
      //                }

      //                const observer = new IntersectionObserver((entries) => {
      //                   entries.forEach(entry => {
      //                         if (entry.isIntersecting) {
      //                            this.activeHeading = entry.target.id
      //                         }
      //                   })
      //                }, options)

      //                document.querySelectorAll('.post-content h2, .post-content h3').forEach(heading => {
      //                   observer.observe(heading)
      //                })
      //             }
      //          })
      //       )
      //       console.log('Initialized alpine data.')
      //    }
      // )
      
      mcLog(logPrefix, 'Leaving onMounted().')
   })

   watch(
      () => props.id,
      async (newVal, oldVal) => {
         mcLog(logPrefix, 'Entering watch() ..')
         mcLog(logPrefix, 'New post id : ' + newVal)

         if (newVal !== '') {
            await loadPostContent(newVal)
         } else {
            postHtmlContent.value = ''
            toc.value = []
         }

         mcLog(logPrefix, 'Leaving watch().')
      }
   )

   // watch(activeHeading, (newVal, oldVal) => {
   //   mcLog(logPrefix, `Active heading changed from ${oldVal} to ${newVal}`)
   // })

   // onBeforeUnmount(() => {
   //    if (observer.value) {
   //       observer.value.disconnect()
   //    }
   // })

   // function handleTocItemClick(id) {
   //    // Prevent the default anchor behavior
   //    event.preventDefault()

   //    // Scroll to the heading
   //    const element = document.getElementById(id)
   //    if (element) {
   //       const contentDiv = document.querySelector('div[mc-role="layout-blog-post"] > .content')
   //       if (contentDiv) {
   //          const topOffset = element.offsetTop - contentDiv.offsetTop
   //          contentDiv.scrollTo({
   //             top: topOffset,
   //             behavior: 'smooth'
   //          })

   //          // Update the active heading after a short delay
   //          setTimeout(() => {
   //             activeHeading.value = id
   //          }, 100)
   //       }
   //    }
   // }
</script>

<style>
   [mc-role="hashnode-blog-post"] {
      display: grid;
      grid-template-columns: 1fr minmax(15rem, 20rem);
      color: hsl(var(--foreground));
      height: 100%;
      /* font-family: 'Open Sans', sans-serif; */
      line-height: 1.6;
      /* box-shadow: 0 2px 5px rgba(0,0,0,0.1); */
      font-family: "Suisse Intl", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      & > .post-content {
         padding-left: 1rem;
         padding-right: 1rem;

         & > .blog-title {
            /* font-size: 2.5em; */
            margin-top: 0;
            margin-bottom: 0.5em;
            /* color: hsl(var(--primary)); */
            /* font-weight: 700; */
         }

         /* Common blog post styles */
         & h1,
         & h2,
         & h3,
         & h4,
         & h5,
         & h6 {
            /* font-family: 'Georgia', serif; */
            line-height: 1.25;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-weight: 700;
            color: #1a1a2e
         }

         /* Set margin-top to 0 for the first h2 */
         & h2:first-child {
            margin-top: 0;
         }

         & h1 {
            font-size: 3rem;
         }

         & h2 {
            font-size: 2em;
         }

         & h3 {
            font-size: 1.75em;
         }

         & h4 {
            font-size: 1.5em;
         }

         & h5 {
            font-size: 1.25em;
         }

         & h6 {
            font-size: 1.1em;
         }

         & p {
            margin-bottom: 1.5em;
         }

         & a {
            color: hsl(var(--primary));
            text-decoration: none;

            &:hover {
               text-decoration: underline;
            }
         }

         & img {
            max-width: 100%;
            height: auto;
            margin: 1em 0;
         }

         & blockquote {
            border-left: 4px solid hsl(var(--primary));
            padding-left: 1em;
            margin-left: 0;
            font-style: italic;
            color: hsl(var(--muted-foreground));
         }

         & pre {
            padding: 0;
            /* Remove padding from pre */
            overflow-x: auto;
            margin-bottom: 1.5em;
            white-space: pre-wrap;
            font-size: 0.875rem;

            & code {
               background-color: hsl(var(--muted) / 0.3);
               /* padding: 0.2em 0.4em; */
               border-radius: 3px;
               font-family: monospace;
               overflow-x: auto;

               &.language-plaintext {
                  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                  font-weight: 500;
                  background-color: #1a1a2e;
                  color: #00ffff;
               }
            }
         }

         & ul,
         & ol {
            margin-bottom: 1.5em;
            padding-left: 2em;
         }

         & li {
            margin-bottom: 0.5em;
            padding-left: 0.5em;

            & > p {
               margin-bottom: 0;
            }
         }

         /* Improved list styling */
         & ul {
            list-style-type: disc;
         }

         & ol {
            list-style-type: decimal;
         }

         /* Nested list styling */
         & ul ul,
         & ol ul {
            list-style-type: circle;
            margin-top: 0.5em;
         }

         & ul ol,
         & ol ol {
            list-style-type: lower-alpha;
            margin-top: 0.5em;
         }

         /* Ensure list items inside paragraphs are styled */
         & p ul,
         & p ol {
            margin-top: 0.5em;
         }
      }

      & > .post-toc {
         /* flex: 1; */
         padding-left: 20px;
         border-left: 1px solid hsl(var(--border));
         position: sticky;
         top: 0;
         /* align-self: flex-start; */
         max-height: calc(100vh - 3em);
         /* Adjust for blog title */
         overflow-y: auto;

         & > h3 {
            font-size: 1.5rem;
            font-weight: 700;
            color: hsl(var(--muted-foreground));
         }

         & ul {
            font-size: 0.875rem;
            line-height: 2;

            & ul {
               padding-left: 1rem;
            }

            & a {
               color: hsl(var(--muted-foreground));
               text-decoration: none;

               &:hover {
                  color: hsl(var(--foreground));
                  /* text-decoration: underline; */
               }

               &.active {
                  color: black;
                  font-weight: bold;
               }
            }
         }
      }
   }
</style>
