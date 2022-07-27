const canvas = document.querySelector('#canvas');
canvas.width = 800;
canvas.height = 496;
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const bgimage = new Image()
bgimage.src = './assets/map1.png'


bgimage.onload = () => {
    ctx.drawImage(bgimage, 0, -300)
}
const mat = new Image();
mat.src = './assets/mat.png'

mat.onload = () => {
    ctx.drawImage(mat, 0, 160)
}