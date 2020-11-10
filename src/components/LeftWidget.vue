<template>
    <widget left="Color" right="Type">
        <div class="p-5 w-1/2">
            <color-s-l />
            <color-input />
            <color-hue />
            <color-alpha />
        </div>
        <div class="p-5 w-1/2">
            <type-tab />
            <div class="overflow-x-hidden">
                <div class="container flex" :class="type === 'radial' && 'active'">
                    <div class="w-1/2">
                        <linear-direction />
                    </div>
                    <div class="w-1/2">
                        <radial-shape />
                        <radial-position />
                    </div>
                </div>
            </div>
        </div>
    </widget>
</template>

<script>
import Widget from "./Widget"
import ColorSL from "./left/ColorSL"
import ColorInput from "./left/ColorInput"
import ColorHue from "./left/ColorHue"
import ColorAlpha from "./left/ColorAlpha"
import TypeTab from "./left/TypeTab"
import LinearDirection from "./left/LinearDirection"
import RadialShape from "./left/RadialShape"
import RadialPosition from "./left/RadialPosition"

export default {
    name: "LeftWidget",
    components: {
        Widget,
        ColorSL,
        ColorInput,
        ColorHue,
        ColorAlpha,
        TypeTab,
        LinearDirection,
        RadialShape,
        RadialPosition,
    },
    computed: {
        type() {
            return this.$store.state.type
        },
    },
}
</script>

<style scoped>
.container {
    width: 200%;
    transform: translateX(0);
    transition: transform 350ms ease-in-out;
}

.container.active {
    transform: translateX(-50%);
}
</style>
