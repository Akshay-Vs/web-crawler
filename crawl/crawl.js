const { JSDOM } = require('jsdom')

const normalizeURL = (urlString) => {
  const url = new URL(urlString)
  const hostPath = url.hostname.concat(url.pathname)

  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1)
  }
  return hostPath
}

const getUrlsFromHTML = (htmlBody, baseUrl) => {
  const urls = []

  const dom = new JSDOM(htmlBody)
  const linkElements = dom.window.document.querySelectorAll('a')

  for (const linkElement of linkElements) {

    if (linkElement.href.slice(0, 1) === '/') {
      urls.push(
        normalizeURL(baseUrl)
          .concat(linkElement.href)
      )
    }

    else urls.push(
      normalizeURL(linkElement.href)
    )
  }

  console.log(urls)
  return urls
}

const crawlPage = async (currentUrl) => {
  console.log("Crawling", currentUrl)

  try {
    const res = await fetch(currentUrl)
    if (res.status > 399) {
      console.log("Error in fetching page", res.status)
      return
    }

    const contentType = res.headers.get("content-type")
    if (!contentType.includes("text/html")) {
      console.log("content type is not supported, skipping ", currentUrl)
      return
    }

    console.log(await res.text())
  }

  catch (err) {
    console.log(err)
  }
}

module.exports = {
  normalizeURL,
  getUrlsFromHTML,
  crawlPage
}