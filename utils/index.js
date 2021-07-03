
const path = require('path')
const pupa = require('./pupa')
const fs = require('fs-extra')

exports.join = path.join

function isObject(target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

function isString(target) {
  return Object.prototype.toString.call(target) === '[object String]'
}

exports.resolveWebpackEntry = (webpackEntry, opts = {}) => {
  if (isObject(webpackEntry)) {
    return {
      ...webpackEntry,
      // [opts.NAME]: { import: [ opts.filePath ] },
      [opts.NAME]: opts.filePath,

    }
  }

  if (Array.isArray(webpackEntry)) {
    return [...webpackEntry, opts.filePath]
  }

  if (isString(webpackEntry)) {
    return [webpackEntry, opts.filePath]
  }

  // 其他方式，如 promise, function 则调整为类似于默认的情况，webpack 会自己处理动态入口
  return {
    // 默认 main
    main: webpackEntry,
    [opts.NAME]: opts.filePath,
  }
}

const resolve = (...dir) => path.resolve(__dirname, '..', ...dir)
exports.resolve = resolve

exports.resolveApp = (...dir) => resolve('app', ...dir)

exports.replaceStr = (content, replaceStrMap = {}) => {
  return pupa(content, replaceStrMap)
}

exports.readFile = filePath => fs.readFileSync(filePath, 'utf8')
