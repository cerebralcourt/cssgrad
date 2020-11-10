export const colorToCSS = ({ rgba, percent }) => {
    const { red, green, blue, alpha } = rgba
    return `rgba(${red}, ${green}, ${blue}, ${alpha}) ${percent}%`
}

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

    const r = Math.round(red)
    const g = Math.round(green)
    const b = Math.round(blue)

    return toHex(r) + toHex(g) + toHex(b)
}

export const rgbToHsl = ({ red, green, blue, alpha }) => {
    const r = red / 255
    const g = green / 255
    const b = blue / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max == min) {
        h = s = 0
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
        }

        h /= 6
    }

    return { h, s, l, alpha }
}

export const hslToRgb = ({ h, s, l, alpha }) => {
    if (s == 0) {
        const c = l * 255
        return { red: c, green: c, blue: c, alpha } 
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1/6) return p + (q - p) * 6 * t
            if (t < 1/2) return q
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
            return p
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q

        const red = hue2rgb(p, q, h + 1/3) * 255
        const green = hue2rgb(p, q, h) * 255
        const blue = hue2rgb(p, q, h - 1/3) * 255

        return { red, green, blue, alpha }
    }
}
