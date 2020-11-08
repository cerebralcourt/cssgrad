export const createCSS = ({ colors, repeating, type, linear, radial }) => {
    const optionsToCSS = (type, linear, radial) => {
        if (type === "linear") {
            const { deg } = linear
            return `${deg}deg`
        } else if (type === "radial") {
            const { shape, size, position } = radial
            return `${shape} ${size} at ${position.left}% ${position.right}%`
        }
    }

    const colorToCSS = (color) => {
        const { rgba, percent } = color
        const { red, green, blue, alpha } = rgba
        return `rgba(${red}, ${green}, ${blue}, ${alpha}) ${percent}%`
    }

    const options = optionsToCSS(type, linear, radial)
    const colorsCSS = options + ", " + colors.map(colorToCSS).join(", ")

    return `
        background: ${colorToCSS(colors[0])};
        background: ${repeating ? "repeating-" : ""}${type}-gradient(${colorsCSS});
    `.trim()
}

export const rgbToHex = ({ red, green, blue }) => {
    const toHex = (c) => {
        const hex = c.toString(16)
        return hex.length == 1 ? "0" + hex : hex
    }

    return toHex(red) + toHex(green) + toHex(blue)
}
