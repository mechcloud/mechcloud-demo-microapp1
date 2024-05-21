<template>
    <div 
        style="text-align: center;"
        :class="{[bgColor.id]: bgColor.id !== ''}"
    >
        <!-- heading -->
        <edit-text
            tag="h2"
            arg="heading"
            :mapping="heading"
            class="mc-fs-2"
            style="padding-top: 0.5rem;"
        />
        
        <!-- description -->
        <edit-text
            tag="p"
            arg="description"
            :mapping="description"
        />

        <!-- plans -->
        <div 
            class="mc-grid-container"
            style="padding: 1rem;"
        >
            <div 
                class="mc-grid plans" 
                style="justify-content: center; gap: 1rem;"
            >   
            <slot />
            </div>
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
    // plans: Array
})
</script>

<style scoped>
.plans {
    text-align: left;
    grid-template-columns: repeat(auto-fit, minmax(250px, 300px));

    & > * {
        flex: 1 1 auto;
        min-width: 15rem;
        max-width: 20rem;
    }
}
</style>