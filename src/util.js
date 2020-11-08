export const createCSS = ({colors, repeating, type, linear, radial}) => {
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
