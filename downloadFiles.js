import fs from 'fs'
import https from 'https'

const __dirname = import.meta.dirname

const download = async (url, filename, fs) => {
  try {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    fs.writeFileSync(__dirname + '/pharmaciesLists/' + filename, buffer)
  } catch (error) {
    console.error(`Download error: ${error.message}`);
  }
}

const readUrlListFile = (csvFilename) => {
  let urlList = []
  try {
    const urlListStr = fs.readFileSync(__dirname + '/urlLists/' + csvFilename, 'utf8')
    urlList = urlListStr.split(',')
    urlList = urlList.slice(0, -1)
  } catch (err) {
    console.log(err)
  }

  return urlList
}

const getFilenameFromUrl = (excelUrl) => {
  const urlDirArr = excelUrl.split('/')
  const filenameWithExt = urlDirArr.slice(-1)
  const filename = filenameWithExt[0].slice(0, -5)
  // console.log(filename)
  return filename 
}

const main = () => {
  const prefectureCodes = JSON.parse(fs.readFileSync('./prefectureCodes.json'))
  const urlList = readUrlListFile('1706005442949.txt')
  
  // console.log(urlList)

  urlList.forEach((url, index) => {
    // console.log(index)
    const originalFilename = getFilenameFromUrl(url)
    const exportFilename = originalFilename + '-' + prefectureCodes[index].code + '-' + prefectureCodes[index].name + '.xlsx'
    download(url, exportFilename, fs)
  })
}

main()