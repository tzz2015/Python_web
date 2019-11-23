export default {
  parseURL (url) {
    let parseUrl = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
    let result = parseUrl.exec(url)
    var fields = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash']
    var res = {}
    fields.forEach(function (field, i) {
      res[field] = result[i]
    })
    res.file = res.path.split('/').pop()

    return res
  }
}
