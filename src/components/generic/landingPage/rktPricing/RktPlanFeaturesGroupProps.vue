<template>
    <div 
       class="mc-controls"
    >
        <mc-text-area
            label="Name" 
            v-model="selectedControl.metadata.props.name" 
        />
        <mc-string-list-editor
			label="Features"
			v-model="selectedControl.metadata.props.features"
		>
		</mc-string-list-editor>
    </div>
 </template>
 
 <script setup>
    import { 
       inject,
       onBeforeMount,
       onMounted
    } from 'vue'

    const selectedControl = inject('selectedControl')
    
    onBeforeMount(() => {
        selectedControl.value.metadata.props = Object.assign(
            {
                name: 'Features Group',
                features: [
                    'Feature 1'
                ]
            },
            selectedControl.value.metadata.props
        )
    })
 </script>