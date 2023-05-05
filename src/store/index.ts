import { App, InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { RootStateTypes } from './interface/index';

// 引入vuex持久化方法createPersistedState
import createPersistedState from 'vuex-persistedstate';
import { createLogger } from 'vuex'

// The import.meta object exposes context-specific metadata to a JavaScript module.
// It contains information about the module, like the module 's URL.
// https://developer.mozilla.org/zh-cn/docs/web/javascript/reference/statements/import.meta
const modulesGlob = import.meta.globEager('./**/*.ts'),
  modules: any = {};
// Set global vuex getters
let getters: any = '';
// Get all the folders under the modules folder,
// traverse the file object to set Vuex modules and getters
Object.keys(modulesGlob).map((key) => {
  if (key.indexOf('modules') >= 0) {
    modules[key.split('/')[key.split('/').length - 1].replace(/\.ts|.js/, '')] =
      modulesGlob[key].default;
  } else {
    getters = modulesGlob[key].default;
  }
});

//  定义注入类型 InjectionKey 将store安装到Vue应用程序时提供类型,将类型传递InjectionKey给useStore方法
const key: InjectionKey<Store<RootStateTypes>> = Symbol();

// Create vuex store
// set modules getters and strict
// https://next.vuex.vuejs.org/
const store = createStore<RootStateTypes>({
  modules,
  getters,
  strict: false,
  plugins: [
    createLogger(),
    createPersistedState({
      storage: window.localStorage,
      key: 'rabbitstore-client',
      // paths: ["app"],
      // 当state中的值发生变化的时候出发reduce函数
    //   reducer(val:any)  {
    //     console.log(val)  // value值为当前state中的所有值对象
    //     // return什么，localstorage中的key值为vuex的value值就是什么，而且是实时与state中的值保持同步
    //     store.state.app.count = val.app;
    //     return {
    //         count: val.count || 0,
    //         // computedCount: val.computedCount,
    //         app:val.app,
    //         aa: 1
    //     }
    // }
    }),
  ],
});

// 将类型注入useStore
export function useStore(): Store<RootStateTypes> {
  return baseUseStore(key);
}

export function setupStore(app: App<Element>): any {
  app.use(store, key);
}

// Throw current store
export default store;
