<template>
    <div 
       class="mc-controls"
    >
        <mc-select
            label="Background Color"
            :options="bgColors"
            v-model="selectedControl.metadata.props.bgColor"
        >
        </mc-select>
        <mc-text-area
            label="Heading" 
            v-model="selectedControl.metadata.props.heading" 
        />
        <mc-text-area
            label="Description" 
            v-model="selectedControl.metadata.props.description" 
        />
        <mc-object-list-editor
			label="Links"
			:itemTemplate="{label: '', url: ''}"
			v-model="selectedControl.metadata.props.links"
		>
		</mc-object-list-editor>
    </div>
 </template>
 
 <script setup>
    import { 
       inject
    } from 'vue'

    const bgColors = [
        {
            id: 'tw-bg-slate-100',
            label: 'slate-200',
        },
        {
            id: 'tw-bg-slate-300',
            label: 'slate-300',
        }
    ]
    
    const selectedControl = inject('selectedControl')
 </script>