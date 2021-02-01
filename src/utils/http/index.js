import httpCore from './core'
import mapperURL from './mapperURL'

const headers = {
}

export function GET(url, params, options) {
  return httpCore({
    method: 'get',
    url: mapperURL(url, options),
    params,
    headers,
    options
  })
}

export function POST(url, data, options) {
  return httpCore({
    method: 'post',
    url: mapperURL(url, options),
    data,
    headers,
    options
  })
}

export function PUT(url, data, options) {
  return httpCore({
    method: 'put',
    url: mapperURL(url, options),
    data,
    headers,
    options
  })
}

export function DELETE(url, data, options) {
  return httpCore({
    method: 'delete',
    url: mapperURL(url, options),
    data,
    headers,
    options
  })
}
