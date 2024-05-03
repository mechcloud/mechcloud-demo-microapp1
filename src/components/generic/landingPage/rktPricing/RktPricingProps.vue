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
    </div>
 </template>
 
 <script setup>
    import { 
       inject,
       onMounted
    } from 'vue'

    const bgColors = [
        {
            id: 'tw-bg-white',
            label: 'white',
        },
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
    
    onMounted(() => {
        selectedControl.value.metadata.props = Object.assign(
            {
                bgColor: {
                    id: '',
                    label: ''
                },
                heading: 'Heading ..',
                description: 'Description ..',
                plans: [] 
            },
            selectedControl.value.metadata.props
        )
    })
 </script>