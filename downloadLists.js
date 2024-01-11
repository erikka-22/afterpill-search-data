
async function main() {
  const jsdom = require('jsdom')
  const { JSDOM } = jsdom
  const fs = require('fs')
  const excelUrlListArr = []

  const url = "https://www.mhlw.go.jp/stf/kinnkyuuhininnyaku.html"
  const dom = await JSDOM.fromURL(url)
  const document = dom.window.document
  const excelUrlList = document.body.querySelectorAll(
    'a[data-icon="excel"]'  
  )

  excelUrlList.forEach((excelUrl) => {
    excelUrlListArr.push(excelUrl.href)
  })
  
  const timestamp = Date.now().toString()
  const filePath = __dirname + '/urlLists/' + timestamp + '.txt'

  try {
    fs.writeFileSync(filePath, excelUrlListArr.join(','))
  } catch (err) {
    console.log(err)
  }
}

main()