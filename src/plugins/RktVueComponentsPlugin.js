import * as RktVueComponents from '@/components'

export default {
   install(app) {
      // console.log(RktVueComponents)

      Object.keys(RktVueComponents).forEach(key => {
         const cmpntName = Object.keys({ [key]: key })[0]
         console.log(cmpntName)

         app.component(cmpntName, RktVueComponents[key])
      })

      console.log('Rocket components registered successfully.')
   }
}