<template>
    <div>
        <button
            class="bg-blue-600 hover:bg-blue-500 transition-colors duration-300 w-full text-center py-2
                waves-effect waves-light text-white"
            @click="copy"
        >
            <div class="flex justify-center items-center gap-2">
                <transition name="fade" mode="out-in">
                    <check-icon class="w-4" v-if="copied" />
                    <copy-icon class="w-4" v-else />
                </transition>
                <span>Copy to Clipboard</span>
            </div>
        </button>
        <div
            class="code bg-indigo-700 text-sm overflow-x-auto overflow-y-hidden whitespace-no-wrap mb-4 text-white"
            ref="code"
        >
            <code
                v-for="(line, i) in lines"
                :key="line"
                class="flex"
            >
                <span class="line-number px-4 py-2 bg-indigo-600">{{ i + 1 }}</span>
                <span class="px-4 py-2">{{ line }}</span>
            </code>
        </div>
        <label class="block flex justify-center items-center">
            <input type="checkbox" class="mr-2" value="compatibility" @click="setCompatibility" />
            Max Compatibility
        </label>
    </div>
</template>

<script>
import CopyIcon from "@/icons/CopyIcon"
import CheckIcon from "@/icons/CheckIcon"
import { rgbToHex } from "@/util"

export default {
    name: "CSSOutput",
    components: {
        CopyIcon,
        CheckIcon,
    },
    computed: {
        lines() {
            let lines = this.$store.getters.css.split("\n").map(l => l.trim())

            if (this.compatibility) {
                const colors = this.$store.state.colors
                const before = lines[1].slice(0, 12)
                const after = lines[1].slice(12)

                lines.push(before + "-moz-" + after)
                lines.push(before + "-webkit-" + after)
                lines.push(`filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#${
                    rgbToHex(colors[0].rgba)
                }",endColorstr="#${
                    rgbToHex(colors[colors.length - 1].rgba)
                }",GradientType=1);`)
            }

            return lines
        },
    },
    methods: {
        copy() {
            navigator.clipboard.writeText(this.lines.join("\n"))
            this.copied = true
            window.setTimeout(() => (this.copied = false), 2000)
        },
        setCompatibility() {
            if (this.compatibility) {
                window.setTimeout(() => (this.compatibility = false), 250)
                this.$refs.code.classList.remove("active")
            } else {
                this.compatibility = true
                this.$refs.code.classList.add("active")
            }
        },
    },
    data() {
        return {
            copied: false,
            compatibility: false,
        }
    },
}
</script>

<style lang="postcss" scoped>
.line-number {
    user-select: none;
}

.code {
    height: 86px;
    transition: height 250ms ease-out;
}

.code.active {
    height: 197px;
    transition: height 250ms ease-in;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 250ms;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
