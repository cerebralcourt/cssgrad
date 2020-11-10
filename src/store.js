import Vue from "vue"
import Vuex from "vuex"
import { createCSS, rgbToHsl, hslToRgb } from "@/util"

Vue.use(Vuex)

const currentColor = ({ colors, current }) => colors.find(c => c.id === current)

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
        currentColor,
    },
    mutations: {
        setCurrent(state, id) {
            state.current = id
        },
        addColor(state, { rgba, percent }) {
            const id = state.lastId + 1
            const hue = rgbToHsl(rgba).h

            state.colors.push({ id, rgba, percent, hue })
            state.colors.sort((a, b) => a.percent - b.percent)
            state.lastId = id
            state.current = id
        },
        setColorPercent(state, { id, percent }) {
            const index = state.colors.findIndex(c => c.id === id)
            const color = state.colors[index]
            
            state.colors.splice(index, 1, { ...color, percent })
            state.colors.sort((a, b) => a.percent - b.percent)
        },
        setColorRgb(state, { red, green, blue }) {
            const color = currentColor(state)
            const { rgba, rgba: { alpha } } = color
            const { h } = rgbToHsl(rgba)

            const index = state.colors.indexOf(color)
            state.colors.splice(index, 1, { ...color, rgba: { red, green, blue, alpha }, hue: h })
        },
        setColorAlpha(state, alpha) {
            const color = currentColor(state)
            const { rgba } = color

            const index = state.colors.indexOf(color)
            state.colors.splice(index, 1, { ...color, rgba: { ...rgba, alpha } })
        },
        setColorHue(state, hue) {
            const color = currentColor(state)
            const h = hue
            const { s, l, alpha } = rgbToHsl(color.rgba)
            const rgba = hslToRgb({ h, s, l, alpha })

            const index = state.colors.indexOf(color)
            state.colors.splice(index, 1, { ...color, rgba, hue })
        },
        setColorSL(state, { s, l }) {
            const color = currentColor(state)
            const h = color.hue
            const { alpha } = color.rgba
            const hsl = { h, s, l, alpha }
            const rgba = hslToRgb(hsl)

            const index = state.colors.indexOf(color)
            state.colors.splice(index, 1, { ...color, rgba })
        },
        setType(state, type) {
            state.type = type
        },
        setDeg(state, deg) {
            state.linear.deg = deg
        },
    },
})

export default store
