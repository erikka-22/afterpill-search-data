const download = (uri, filename) => {
  return new Promise((resolve, reject) => 
    https
      .request(uri, (res) => {
        res
          .pipe(createWriteStream(filename))
          .on("close", resolve)
          .on("error", reject)
      })
      .end()
  )
}

const readUrlListFile = (csvFilename) => {
  const fs = require('fs')
  let urlList = []
  try {
    const urlListStr = fs.readFileSync(__dirname + csvFilename, 'utf8')
    urlList = urlListStr.split(',')
  } catch (err) {
    console.log(err)
  }

  return urlList
}

const setExcelFilename = (excelUrl) => {
  
}

const main = () => {
  const urlList = readUrlListFile('1703393799847.txt')
  for (const url of urlList) {

  }
}

main()