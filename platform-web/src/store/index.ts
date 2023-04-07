import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

let modules = import.meta.glob("../views/Pages/*.vue")

// pinia状态管理器
export const useStore = defineStore('myStore', {
    state: () => {
        return {
            menuList: []
        }
    },
    getters: {},
    actions: {
        setMenuList(state: any, res: any) {
            state.meauList = res
            localStorage.setItem('meauList', JSON.stringify(res))

        }
    }
})