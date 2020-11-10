import Vue from "vue"
import Vuex from "vuex"
import { createCSS, rgbToHsl, hslToRgb } from "@/util"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        colors: [
            {
                id: 0,
                rgba: {
                    red: 0,
                    green: 238,
                    blue: 255,
                    alpha: 1.0,
                },
                percent: 0,
                hue: 184/360,
            },
            {
                id: 1,
                rgba: {
                    red: 0,
                    green: 0,
                    blue: 255,
                    alpha: 1.0,
                },
                percent: 100,
                hue: 240/360,
            },
        ],
        lastId: 1,
        current: 0,
        type: "linear",
        repeating: false,
        linear: {
            deg: 0,
        },
        radial: {
            shape: "circle",
            size: "farthest-corner",
            position: {
                left: 50,
                top: 50,
            },
        },
    },
    getters: {
        css: state => createCSS(state),
        currentColor: ({ colors, current }) => colors[current],
    },
    mutations: {
        setCurrent(state, id) {
            state.current = id
        },
        addColor(state, { rgba, percent }) {
            const id = state.lastId + 1
            const { h } = rgbToHsl(rgba)

            state.colors.push({ id, rgba, percent })
            state.hues.push({ id, h })
            state.colors.sort((a, b) => a.percent - b.percent)
            state.lastId = id
        },
        setColorPercent(state, { id, percent }) {
            const index = state.colors.findIndex(c => c.id === id)
            const color = state.colors[index]
            
            state.colors.splice(index, 1, { ...color, percent })
            state.colors.sort((a, b) => a.percent - b.percent)
        },
        setColorSL(state, { s, l }) {
            const color = state.colors[state.current]
            const h = color.hue
            const { alpha } = color.rgba
            const hsl = { h, s, l, alpha }
            const rgba = hslToRgb(hsl)

            state.colors.splice(state.current, 1, { ...color, rgba })
        },
    },
})

export default store
