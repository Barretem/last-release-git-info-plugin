# last-release-git-info-plugin

## Table of Contents

- [last-release-git-info-plugin](#last-release-git-info-plugin)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Install](#install)
  - [Usage](#usage)
    - [在webpack项目中使用](#在webpack项目中使用)
    - [在vue-cli中使用](#在vue-cli中使用)
    - [在nuxt.js中使用](#在nuxtjs中使用)
  - [Options](#options)
    - [options.log](#optionslog)
    - [options.releaseFileName](#optionsreleasefilename)
    - [options.showBuildTime](#optionsshowbuildtime)
    - [options.showBuildBranch](#optionsshowbuildbranch)
    - [options.showBuildCommitId](#optionsshowbuildcommitid)
    - [options.showDeveloperName](#optionsshowdevelopername)
    - [options.showDeveloperEmail](#optionsshowdeveloperemail)
    - [options.showBuildCommitDate](#optionsshowbuildcommitdate)
    - [options.showBuildCommitInfo](#optionsshowbuildcommitinfo)
    - [options.externalTxt](#optionsexternaltxt)
  - [Notice](#notice)
  - [Contributing](#contributing)
  - [License](#license)

## Features

在构建的时候附带最新一次的构建信息（包括构建时间、构建分支、构建commitID、最近开发者名称、最近开发者邮箱、最新commit日期、最新commit信息）

[⬆ Back to Top](#table-of-contents)

## Install

```console
yarn add @barretter/last-release-git-info-plugin -D
```

[⬆ Back to Top](#table-of-contents)

## Usage
该插件依赖git项目，需要结合git项目使用

### 在webpack项目中使用
```js
const LastReleaseGitInfoPlugin = require('@barretter/last-release-git-info-plugin')

const config = {
  plugins: [
    new lastReleaseGitInfoPlugin(options)
  ]
}
```


### 在vue-cli中使用

vue.config.js
```js
const LastReleaseGitInfoPlugin = require('@barretter/last-release-git-info-plugin')
const config = {
  chainWebpack: config => {
    config.plugin('last-release-git-info-plugin').use(LastReleaseGitInfoPlugin, [options])
  }
}
```

### 在nuxt.js中使用

nuxt.config.js
```js
const config = {
  modules: ['@barretter/last-release-git-info-plugin/nuxt', options]
}
```

就这么简单！

[⬆ Back to Top](#table-of-contents)

## Options

### options.log

- Type: `boolean`
- Default: `false`

是否在控制台输出最新一次的构建信息。

[⬆ Back to Top](#table-of-contents)

### options.releaseFileName

- Type: `string`
- Default: `release_git_info.txt`

最新构建信息的保存文件名。

### options.showBuildTime

- Type: `boolean`
- Default: `true`

是否显示构建时间

### options.showBuildBranch

- Type: `boolean`
- Default: `true`

是否显示构建分支

### options.showBuildCommitId

- Type: `boolean`
- Default: `true`

是否显示构建commitID

### options.showDeveloperName

- Type: `boolean`
- Default: `false`

是否显示开发者名称

### options.showDeveloperEmail

- Type: `boolean`
- Default: `false`

是否显示开发者邮箱

### options.showBuildCommitDate

- Type: `boolean`
- Default: `true`

是否显示commit日期

### options.showBuildCommitInfo

- Type: `boolean`
- Default: `true`

是否显示commit信息

### options.externalTxt

- Type: `string`
- Default: `''`

额外显示的字段


## Notice

目前该插件暂时不支持webpack5


## Contributing

For those who are interested in contributing to this project, such as:

- report a bug
- request new feature
- fix a bug
- implement a new feature

Please refer to our [contributing guide](https://github.com/FEMessage/.github/blob/master/CONTRIBUTING.md).

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
