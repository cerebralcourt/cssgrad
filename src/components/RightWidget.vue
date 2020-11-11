<template>
    <widget left="List" right="CSS">
        <div class="p-5 w-1/2">
            <color-list />
        </div>
        <div class="p-5 w-1/2">
            <css-output />
        </div>
    </widget>
</template>

<script>
import Widget from "./Widget"
import ColorList from "./right/ColorList"
import CssOutput from "./right/CSSOutput"

export default {
    name: "RightWidget",
    components: {
        Widget,
        ColorList,
        CssOutput,
    },
}
</script>
