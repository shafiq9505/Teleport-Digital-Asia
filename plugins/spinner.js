import {
  Loading
} from '../components/Loading.vue'
let instance

const VueLoading = {
  install(Vue, options) {

      if (!instance) {
          const LoadingPlugin = Vue.extend(Loading);
          instance = new LoadingPlugin({
              el: document.createElement('div')
          });
      }

      let loading = {
          show(params) {
              instance.showing = true;
              if (params && params.label) {
                  instance.label = params.label
              }
              document.querySelector('body').appendChild(instance.$el);
          },
          hide() {
              instance.showing = false;
          }
      };

      if (!Vue.$loading) {
          Vue.$loading = loading;
      }

      Vue.prototype.$loading = Vue.$loading
  }
}

export default VueLoading
