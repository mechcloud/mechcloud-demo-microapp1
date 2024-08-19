<template>
    <div class="plan-section">
        <edit-text
            tag="p"
            arg="name"
            :mapping="name"
            class="section-title mc-fw-6"
        />

        <ul>
            <li class="section-item" v-for="(feature, index) in features">
                <mc-icon :clickable="false" icon="check" class="tw-text-blue-600" />
                <edit-text
                    tag="span"
                    :arg="'features.'+ index"
                    :mapping="feature"
                />
            </li>
        </ul>
    </div>
</template>

<script setup>
import { 
    inject 
} from 'vue'
import {
    EditText
} from '@mechcloud/piston-ui-sdk'

defineProps({
    name: String,
    features: Array
})
</script>

<style>
.plan-section {
    margin-bottom: 0.5rem;
    
    & > ul > .section-item {
        display: flex;
        padding-left: 0.5rem;
        gap: 0.5rem;
        align-items: center;
        min-height: 2rem;

        & > span {
            line-height: 1.25rem;
            flex: 1 1 auto;
        }
    }
}
</style>