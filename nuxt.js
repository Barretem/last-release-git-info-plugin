const LastReleaseGitInfoPlugin = require('.')

export default function nuxtLastReleaseGitInfoPlugin(options) {
  this.extendBuild(config => {
    config.plugins.push(new LastReleaseGitInfoPlugin(options))
  })
}
