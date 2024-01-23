import { JSDOM } from 'jsdom'
import fs from 'fs'

const __dirname = import.meta.dirname

const download = async (url, filename) => {
  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    fs.writeFileSync(__dirname + '/pharmaciesLists/' + filename, buffer)
  } catch (error) {
    console.error(`Download error: ${error.message}`);
  }
}

const getFilenameFromUrl = (excelUrl) => {
  const urlDirArr = excelUrl.split('/')
  const filenameWithExt = urlDirArr.slice(-1)
  const filename = filenameWithExt[0].slice(0, -5)
  return filename 
}

const main = async () => {
  let prefectures = JSON.parse(fs.readFileSync('./prefectureCodes.json'))
  const mhlwPharmacyUrl = "https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku.html"
  
  const dom = await JSDOM.fromURL(mhlwPharmacyUrl)
  const document = dom.window.document
  const domList = document.body.querySelectorAll(
    'li a[data-icon="excel"]'  
  )  

  domList.forEach((dom, index) => {
    prefectures[index].url = dom.href
  })
  
  prefectures.forEach((prefecture) => {
    const originalFilename = getFilenameFromUrl(prefecture.url)
    const exportFilename = prefecture.code + '-' + prefecture.name + '-' + originalFilename + '.xlsx'
    download(prefecture.url, exportFilename)
  })
}

main()