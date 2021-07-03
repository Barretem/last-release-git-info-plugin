/**
 * webpack plugin
 * 记录当前构建中的信息
 * 并且在console中输出起信息
 */
const _get = require('lodash.get')
const fs = require('fs-extra')
const getGitInfo = require('./utils/generate-git-info')

const {
  resolveWebpackEntry,
  resolveApp,
  readFile,
  resolve,
  replaceStr,
  join,
} = require('./utils')

const NAME = 'last-release-git-info-plugin'

class LastRelease {
  constructor (options) {
    this.options = Object.assign(
      {
        log: false, // 是否在控制台输出
        releaseFileName: 'release_git_info.txt', // 最新构建信息
        showBuildTime: true, // 显示构建时间
        showBuildBranch: true, // 显示构建分支
        showBuildCommitId: true, // 显示构建commitID
        showDeveloperName: false, // 显示开发者名称
        showDeveloperEmail: false, // 显示开发者邮箱
        showBuildCommitDate: true, // 显示commit日期
        showBuildCommitInfo: true, // 显示commit信息
        externalTxt: '', // 扩展的显示的字符串
      },
      options
    )
  }

  apply(compiler) {
    const {
      showBuildTime,
      showBuildBranch,
      showBuildCommitId,
      showDeveloperName,
      showDeveloperEmail,
      showBuildCommitInfo,
      showBuildCommitDate,
      log,
      releaseFileName,
      externalTxt,
    } =  this.options
    // common
    if (process.env.NODE_ENV === 'development') return
    // v4
    if (_get(compiler, 'options.mode') === 'development') return
    // 生成git info信息
    const gitInfoText = getGitInfo({
      showBuildTime,
      showBuildBranch,
      showBuildCommitId,
      showDeveloperName,
      showDeveloperEmail,
      showBuildCommitInfo,
      showBuildCommitDate,
      externalTxt,
    })

     // 修改 webpack 入口文件
    if (log) {
      compiler.options.entry = resolveWebpackEntry(compiler.options.entry, {
        NAME,
        filePath: resolveApp('main.js')
      })
       // 生成写入版本号的文件到 app
      compiler.hooks.beforeRun.tap(NAME, () => {
        // 清空缓存文件夹
        fs.emptyDirSync(resolveApp())

        this.generateFile(
          resolveApp('main.js'),
          readFile(resolve('src', 'main.js')),
          {
            LAST_RELEASE_GIT_INFO: gitInfoText
          }
        )
      })
    }

    // 复制文件到 webpack 输出目录
    compiler.hooks.done.tap(NAME, () => {
      const outputPath = _get(compiler, 'outputPath', '')

      // release git信息
      fs.outputFileSync(
        join(outputPath, releaseFileName),
        gitInfoText
      )
    })
  }

  generateFile(dest = '', content = '', extraReplacement = {}) {
    fs.outputFileSync(
      dest,
      replaceStr(content, extraReplacement)
    )
  }
}

module.exports = LastRelease;
