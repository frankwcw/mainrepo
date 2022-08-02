/// sharp 打包參閱 https://github.com/evanw/esbuild/issues/1051
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const getCommandArgs = require('../lib/get-command-args')

const { normal: normalPath, round: roundPath } = getCommandArgs({
  normal: './ic_launcher.png',
  round: './ic_launcher_round.png'
})

const normalFileName = normalPath.match(/[^/]+\.(jpe?g|png)$/i)[0]
const roundFileName = roundPath.match(/[^/]+\.(jpe?g|png)$/i)[0]

const rootPath = process.cwd()

const dirs = [
  { name: 'xxxhdpi', size: 192 },
  { name: 'xxhdpi', size: 144 },
  { name: 'xhdpi', size: 96 },
  { name: 'hdpi', size: 72 },
  { name: 'mdpi', size: 48 },
]

let normalBuffer, roundBuffer

try {
  normalBuffer = fs.readFileSync(normalPath)
} catch (err) {
  console.log(`找不到檔案 ${normalPath}`)
}

try {
  roundBuffer = fs.readFileSync(roundPath)
} catch (err) {
  console.log(`找不到檔案 ${roundPath}`)
}

const generateIcon = async (path, size, buffer) => {
  const resizeBuffer = await sharp(buffer)
    .resize(size)
    .toBuffer()

  fs.writeFileSync(path, resizeBuffer)

  console.log(`${path} 生成完成`)
}

if (normalBuffer || roundBuffer) {
  console.log('開始生成')

  const dirList = fs.readdirSync('.')
  let oupputName, lastOupputNum = Number.MIN_SAFE_INTEGER

  for (let i = 0; i < dirList.length; i++) {
    const stat = fs.lstatSync(path.resolve(rootPath, dirList[i]))
    if (!stat.isDirectory()) continue

    const matched = dirList[i].match(/^output(\((\d+)\))?$/)
    if (matched == null) continue

    const num = matched[2] == null ? null : Number(matched[2])
    if (num == null) lastOupputNum = 0
    else {
      if (num > lastOupputNum) lastOupputNum = num
    }
  }

  if (lastOupputNum === 0) oupputName = 'output(1)'
  else if (lastOupputNum > 0) oupputName = `output(${lastOupputNum + 1})`
  else oupputName = 'output'

  fs.mkdirSync(path.resolve(rootPath, oupputName))

  !(async () => {
    for (let i = 0; i < dirs.length; i++) {
      const { name, size } = dirs[i]

      console.log(path.resolve(rootPath, `${oupputName}/${name}`))
      fs.mkdirSync(path.resolve(rootPath, `${oupputName}/${name}`))

      const normalOutputPath = path.resolve(rootPath, `${oupputName}/${name}/${normalFileName}`)
      const roundOutputPath = path.resolve(rootPath, `${oupputName}/${name}/${roundFileName}`)

      if (normalBuffer != null) await generateIcon(normalOutputPath, size, normalBuffer)
      if (roundBuffer != null) await generateIcon(roundOutputPath, size, roundBuffer)
    }
  })()
}
