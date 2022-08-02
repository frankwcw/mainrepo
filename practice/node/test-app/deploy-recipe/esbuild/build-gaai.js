/// sharp 打包參閱 https://github.com/evanw/esbuild/issues/1051
const esbuild = require('esbuild')
const path = require('path')
const fs = require('fs')

const testappPath = process.cwd()
const resolvePath = (_path) => path.resolve(testappPath, _path)

try {
  fs.readdirSync(resolvePath('./node_modules'))

  try {
    fs.readdirSync(resolvePath('./node_modules/sharp/build/Release'))

    esbuild.build({
      entryPoints: [resolvePath('./tools/gaai.js')],
      bundle: true,
      minify: true,
      platform: 'node',
      target: 'node14',
      outfile: resolvePath('./dist/gaai/script/bundle.js'),
    })
      .then(() => {
        fs.rmSync(resolvePath('./dist/gaai/build'), { recursive: true, force: true })
        fs.mkdirSync(resolvePath('./dist/gaai/build'))
        fs.mkdirSync(resolvePath('./dist/gaai/build/Release'))

        const dirList = fs.readdirSync(resolvePath('./node_modules/sharp/build/Release'))
        for (let i = 0; i < dirList.length; i++) {
          const fileName = dirList[i]
          fs.copyFileSync(
            resolvePath(`./node_modules/sharp/build/Release/${fileName}`),
            resolvePath(`./dist/gaai/build/Release/${fileName}`)
          )
        }
      })
      .catch(() => process.exit(1))

  } catch (err) {
    console.log('找不到 sharp，請先使用 pnpm install 安裝依賴')
    process.exit(1)
  }

} catch (err) {
  console.log('找不到 node_modules，請先使用 pnpm install 安裝依賴')
  process.exit(1)
}




