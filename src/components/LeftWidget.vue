<template>
    <widget left="Color" right="Type">
        <div class="p-5 w-1/2">
            <color-s-l />
            <color-input />
            <color-hue />
            <color-alpha />
        </div>
        <div class="p-5 w-1/2">
            <p>Hello</p>
        </div>
    </widget>
</template>

<script>
import Widget from "./Widget"
import ColorSL from "./left/ColorSL"
import ColorInput from "./left/ColorInput"
import ColorHue from "./left/ColorHue"
import ColorAlpha from "./left/ColorAlpha"

export default {
    name: "LeftWidget",
    components: {
        Widget,
        ColorSL,
        ColorInput,
        ColorHue,
        ColorAlpha,
    },
}
</script>
