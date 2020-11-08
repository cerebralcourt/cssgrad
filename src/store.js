import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

function optionsToCSS(type, linear, radial) {
    if (type === "linear") {
        const { deg } = linear
        return `${deg}deg`
    } else if (type === "radial") {
        const { shape, size, position } = radial
        return `${shape} ${size} at ${position.left}% ${position.right}%`
    }
}

function colorToCSS(color) {
    const { rgba, percent } = color
    const { red, green, blue, alpha } = rgba
    return `rgba(${red}, ${green}, ${blue}, ${alpha}) ${percent}%`
}

const store = new Vuex.Store({
    state: {
        colors: [
            {
                hex: "00eeff",
                rgba: {
                    red: 0,
                    green: 238,
                    blue: 255,
                    alpha: 1.0,
                },
                percent: 0,
            },
            {
                hex: "0000ff",
                rgba: {
                    red: 0,
                    green: 0,
                    blue: 255,
                    alpha: 1.0,
                },
                percent: 100,
            },
        ],
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
        css: ({colors, repeating, type, linear, radial}) => {
            const options = optionsToCSS(type, linear, radial)
            const colorsCSS = options + ", " + colors.map(colorToCSS).join(", ")

            return `
                background: ${colorToCSS(colors[0])};
                background: ${repeating ? "repeating-" : ""}${type}-gradient(${colorsCSS});
            `.trim()
        },
    },
    mutations: {},
})

export default store
