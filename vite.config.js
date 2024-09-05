import { resolve } from "path";
import { defineConfig } from "vite";
import fs from "fs";

import vue from "@vitejs/plugin-vue";
import replace from "@rollup/plugin-replace";
import virtual from "@rollup/plugin-virtual";
import terser from "@rollup/plugin-terser";

export default defineConfig({
   build: {
      target: ["es2021"],
      lib: {
         entry: resolve(__dirname, "src/index.js"),
         name: "DemoMicroApp1",
         fileName: "vue-components",
         formats: ["es"]
      },
      minify: false,
      rollupOptions: {
         // external: [
         //    '@mechcloud/piston-ui-sdk'
         // ],

         plugins: [
            // terser({
            //    mangle: {
            //       toplevel: true
            //       // properties: {
            //       //    reserved: []
            //       // }
            //    }
            // }),
            replace({
               "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
               preventAssignment: true
            })
         ]
      }
   },
   plugins: [
      vue(),
      {
         ...virtual({
            'vue': `
               export const shallowRef = Vue.shallowRef
               export const inject = Vue.inject
               export const openBlock = Vue.openBlock
               export const createElementBlock = Vue.createElementBlock
               export const withModifiers = Vue.withModifiers
               export const toDisplayString = Vue.toDisplayString
               export const ref = Vue.ref
               export const computed = Vue.computed
               export const onBeforeMount = Vue.onBeforeMount
               export const onMounted = Vue.onMounted
               export const provide = Vue.provide
               export const createBlock = Vue.createBlock
               export const resolveDynamicComponent = Vue.resolveDynamicComponent
               export const unref = Vue.unref
               export const renderList = Vue.renderList
               export const Fragment = Vue.Fragment
               export const createVNode = Vue.createVNode
               export const createElementVNode = Vue.createElementVNode
               export const pushScopeId = Vue.pushScopeId
               export const popScopeId = Vue.popScopeId
               export const createCommentVNode = Vue.createCommentVNode
               export const getCurrentInstance = Vue.getCurrentInstance
               export const resolveComponent = Vue.resolveComponent
               export const normalizeClass = Vue.normalizeClass
               export const defineAsyncComponent = Vue.defineAsyncComponent
               export const renderSlot = Vue.renderSlot
               export const createStaticVNode = Vue.createStaticVNode
               export const useCssVars = Vue.useCssVars
               export const resolveDirective = Vue.resolveDirective
               export const withDirectives = Vue.withDirectives
               export const normalizeProps = Vue.normalizeProps
               export const createTextVNode = Vue.createTextVNode
               export const mergeProps = Vue.mergeProps
               export const withCtx = Vue.withCtx
               export const guardReactiveProps = Vue.guardReactiveProps
               export const isRef = Vue.isRef
               export const toValue = Vue.toValue
               export const isReactive = Vue.isReactive
               export const nextTick = Vue.nextTick
               export const reactive = Vue.reactive
               export const watch = Vue.watch
               export const watchEffect = Vue.watchEffect
               export const onUnmounted = Vue.onUnmounted
               export const onBeforeUnmount = Vue.onBeforeUnmount
               export const onUpdated = Vue.onUpdated
               export const onBeforeUpdate = Vue.onBeforeUpdate
               export const onErrorCaptured = Vue.onErrorCaptured
               export const onActivated = Vue.onActivated
               export const onDeactivated = Vue.onDeactivated
               export const onServerPrefetch = Vue.onServerPrefetch
               export const defineComponent = Vue.defineComponent
               export const defineProps = Vue.defineProps
               export const defineEmits = Vue.defineEmits
               export const defineExpose = Vue.defineExpose
               export const withKeys = Vue.withKeys
               export const withScopeId = Vue.withScopeId
               export const useSlots = Vue.useSlots
               export const useAttrs = Vue.useAttrs
               export const useModel = Vue.useModel
               export const markRaw = Vue.markRaw
               export const toRaw = Vue.toRaw
               export const toRef = Vue.toRef
               export const toRefs = Vue.toRefs
               export const isProxy = Vue.isProxy
               export const isReadonly = Vue.isReadonly
               export const readonly = Vue.readonly
               export const shallowReactive = Vue.shallowReactive
               export const shallowReadonly = Vue.shallowReadonly
               export const effectScope = Vue.effectScope
               export const getCurrentScope = Vue.getCurrentScope
               export const onScopeDispose = Vue.onScopeDispose
               export const customRef = Vue.customRef
               export const triggerRef = Vue.triggerRef
               export const warn = Vue.warn
               export const version = Vue.version
               export const defineCustomElement = Vue.defineCustomElement
               export const defineSSRCustomElement = Vue.defineSSRCustomElement
               export const VueElement = Vue.VueElement
               export const useCssModule = Vue.useCssModule
               export const h = Vue.h
               export const Transition = Vue.Transition
               export const TransitionGroup = Vue.TransitionGroup
               export const KeepAlive = Vue.KeepAlive
               export const Teleport = Vue.Teleport
               export const Suspense = Vue.Suspense
            `,
            'vue-demi': `
               export const getCurrentInstance = Vue.getCurrentInstance
               export const inject = Vue.inject
               export const toRaw = Vue.toRaw
               export const watch = Vue.watch
               export const unref = Vue.unref
               export const markRaw = Vue.markRaw
               export const effectScope = Vue.effectScope
               export const ref = Vue.ref
               export const isVue2 = Vue.isVue2
               export const isRef = Vue.isRef
               export const isReactive = Vue.isReactive
               export const set = Vue.set
               export const getCurrentScope = Vue.getCurrentScope
               export const onScopeDispose = Vue.onScopeDispose
               export const reactive = Vue.reactive
               export const toRef = Vue.toRef
               export const del = Vue.del
               export const nextTick = Vue.nextTick
               export const computed = Vue.computed
               export const toRefs = Vue.toRefs
               export const hasInjectionContext = Vue.hasInjectionContext
            `
         }),
         enforce: "pre"
      }
   ],
   resolve: {
      alias: {
         "@": resolve(__dirname, "./src")
      }
   },
   preview: {
      https: {
         key: fs.readFileSync("certs/server/server.key"),
         cert: fs.readFileSync("certs/server/server.crt")
      }
   }
});