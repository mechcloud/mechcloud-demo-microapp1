<template>
    <div class="plan tw1-border1">
        <!-- name -->
        <edit-text
            tag="h3"
            arg="name"
            :mapping="name"
            class="tw-text-teal-600"
        />

        <!-- short description -->
        <edit-text
            tag="p"
            arg="shortDescription"
            :mapping="shortDescription"
            class="plan-desc mc-lh-15"
        />

        <!-- cta -->
        <p class="plan-cta">
            <edit-text
                tag="a"
                arg="cta.label"
                :mapping="cta.label"
                :href="cta.url"
                target="_blank"
                class="mc-btn-link highlight"
            />
        </p>
        
        <!-- pricing -->
        <p>
            <span class="mc-fs-2 mc-fw-7">$</span>
            <edit-text
                tag="span"
                arg="pricing.monthly"
                :mapping="pricing.monthly"
                class="mc-fs-2 mc-fw-7"
            />
            /mo
        </p>

        <!-- features groups -->
        <div class="plan-features-groups">
            <slot />
        </div>
    </div>
</template>

<script setup>
import {
    EditText
} from '@mechcloud/piston-ui-sdk'

defineProps({
    name: String,
    shortDescription: String,
    cta: Object,
    pricing: Object,
    // cta: String,
    // featuresGroups: Array
})
</script>

<style>
.plan {
    background-color: white; 
    padding: 1rem;

    display: grid;

    grid-template: subgrid / subgrid;
    
    grid-column: span 1;
    grid-row: span 5;

    & > .plan-desc {
        padding-bottom: 1rem;
    }

    & > .plan-cta > a {
        display: inline-block;
        width: 100%;
        text-align: center;
        /* margin: 1rem auto; */
    }

    & > .plan-features-groups > * {
        margin-bottom: 0.5rem;
    }
}
</style>