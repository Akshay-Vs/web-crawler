const { crawlPage } = require('./crawl/crawl')

function main() {
  if (process.argv.length < 3) {
    console.log("No website provided")
    process.exit(1)
  }

  if (process.argv.length > 3) {
    console.log("Too many arguments")
    process.exit(1)
  }

  const baseUrl = process.argv[2]

  console.log(`Crawling '${baseUrl}'...`)
  crawlPage(baseUrl)
}

main()