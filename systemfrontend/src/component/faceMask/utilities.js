const labelMap = {
    1: { name: 'Wear Mask', color: 'green' },
    2: { name: 'Not Wear Mask', color: 'red' },
    3: { name: 'Wear Mask Incorrect', color: 'yellow' },
}

export const boxDraw = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx) => {
    for (let i = 0; i <= boxes.length; i++) {
        if (boxes[i] && classes[i] && scores[i] > threshold) {
            const [y, x, height, width] = boxes[i]
            const text = classes[i]
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 12
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name'] + ' - ' + Math.round(scores[i] * 100) / 100, x * imgWidth, y * imgHeight - 10)
            ctx.rect(x * imgWidth, y * imgHeight, width * imgWidth / 2, height * imgHeight / 1.5);
            ctx.stroke()
        }
    }
}