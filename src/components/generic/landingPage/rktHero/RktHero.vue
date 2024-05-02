<template>
    <div class="mc-grid-container" :class="{[bgColor.id]: bgColor.id !== ''}">
        <div class="hero mc-grid">
            <div>
                <h1 class="mc-fs-25 mc-fw-7 mc-lh-3" v-html="heading"></h1>
                
                <edit-text
                    tag="p"
                    arg="description"
                    :mapping="description"
                />

                <div 
                    class="mc-flex mc-flex-h-center"
                    style="gap: 0.75rem; margin-top: 2rem; margin-bottom: 1rem;"
                >
                    <edit-text
                        v-for="(link, index) in links"
                        :href="link.url"
                        target="_blank"
                        tag="a"
                        :arg="`links.${index}.label`"
                        :mapping="link.label"
                    />
                </div>
            </div>
            <img src="https://mechcloud.io/hero/mechcloud-hero-section2.webp" alt="Piston" />
        </div>
    </div>
</template>

<script setup>
import {
    EditText
} from '@mechcloud/piston-ui-sdk'

defineProps({
    bgColor: {
        type: Object,
        default: {
            id: '',
            label: ''
        }
    },
    heading: String,
    description: String,
    links: Array
})

</script>

<style scoped>
.hero {
    padding: 1rem;
    gap: 1rem;
    align-items: center;

    & > div {
        padding-top: 1rem;
        padding-bottom: 1rem;

        & > h1 {
            text-align: center;
            /* line-height: 3rem; */
        }

        & > p {
            margin-top: 1rem;
            font-size: 1.25rem;
            line-height: 1.75rem;
            text-align: center;
        }

        & > div > a {
            background-color: #0d6efd;
            color: white;
            text-decoration: none;
            padding: 0.3rem 0.7rem;
            display: inline-block;
            border-radius: 0.3rem;
            font-weight: 600;

                &:hover {
                    background-color: #0b5ed7;
                }

                &:not(:first-child) {
                    background-color: #f8f9fa;
                    color: black;
                    border: 1px solid #d3d4d5;

                    &:hover {
                        background-color: #d3d4d5;
                    }
                }
        }
    }
}

@container mc-grid-container (min-width: 435px) {
    .mc-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .hero {
        padding: 1rem 3rem;
        
        & > div {

            & > h1 {
                text-align: left;
            }

            & > p {
                text-align: left;
            }

            & > div {
                justify-content: start;
            }
        }
    }
}
</style>