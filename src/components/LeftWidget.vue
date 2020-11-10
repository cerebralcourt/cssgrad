<template>
    <widget left="Color" right="Type">
        <div class="p-5 w-1/2">
            <color-s-l />
        </div>
        <div class="p-5 w-1/2">
            <p>Hello</p>
        </div>
    </widget>
</template>

<script>
import Widget from "./Widget"
import ColorSL from "./left/ColorSL"

export default {
    name: "LeftWidget",
    components: {
        Widget,
        ColorSL,
    },
}
</script>
