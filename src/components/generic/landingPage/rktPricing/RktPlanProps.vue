<template>
    <div 
       class="mc-controls"
    >
        <mc-text-area
            label="Name" 
            v-model="selectedControl.metadata.props.name" 
        />
        <mc-text
            label="CTA url" 
            v-model="selectedControl.metadata.props.cta.url" 
        />
    </div>
 </template>
 
 <script setup>
    import { 
       inject,
       onBeforeMount
    } from 'vue'

    const selectedControl = inject('selectedControl')
    
    onBeforeMount(() => {
        selectedControl.value.metadata.props = Object.assign(
            {
                name: 'Plan name ..',
                shortDescription: 'Short description ..',
                cta: {
                    label: 'Label ..',
                    url: ''
                },
                pricing: {
                    monthly: 0
                },
                featuresGroups: []
            },
            selectedControl.value.metadata.props
        )
    })
 </script>