const execSync = require('child_process').execSync;

/**
 * 获取并且格式化当前时间
 */
const getCurrentTime = (date) => {
  date = date || new Date();
  const YY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();
  let hh = date.getHours();
  let mm = date.getMinutes()
  if (mm < 10) mm = `0${mm}`
  if (hh < 10) hh = `0${hh}`
  return `${YY}-${MM}-${DD} ${hh}:${mm}`
}

/**
 *
 */
const getGitInfo = ({
  showBuildTime,
  showBuildBranch,
  showBuildCommitId,
  showDeveloperName,
  showDeveloperEmail,
  showBuildCommitDate,
  showBuildCommitInfo,
  externalTxt,
}) => {
  let strList = []
  const starStr = new Array(70).join('*')
  strList.push(starStr)
  if (showBuildTime) {
    const buildDay = getCurrentTime(); //构建日期
    strList.push(`构建日期: ${buildDay}`)
  }
  //构建分支
  if (showBuildBranch) {
    try {
      const currentBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      strList.push(`构建分支: ${currentBranch}`)
    } catch(e) {
      console.log(e)
    }
  }
   //构建commit
  if (showBuildCommitId) {
    try {
      const commit = execSync('git show -s --format=%H').toString().trim();
      strList.push(`构建commit:${commit}`)
    } catch(e) {
      console.log(e)
    }
  }
   //姓名
  if (showDeveloperName) {
    try {
      const name = execSync('git show -s --format=%cn').toString().trim();
      strList.push(`作者:${name}`)
    } catch(e) {
      console.log(e)
    }
  }
  //邮箱
  if (showDeveloperEmail) {
    try {
      const email = execSync('git show -s --format=%ce').toString().trim(); //邮箱
      strList.push(`作者邮箱:${email}`)
    } catch(e) {
      console.log(e)
    }
  }
  // 提交时间
  if (showBuildCommitDate) {
    try {
      const commitDate = getCurrentTime(new Date(execSync('git show -s --format=%cd').toString())); //日期
      strList.push(`commit时间:${commitDate}`)
    } catch(e) {
      console.log(e)
    }
  }
  // commit信息
  if (showBuildCommitInfo) {
    try {
      const message = execSync('git show -s --format=%s').toString().trim(); //说明
      strList.push(`说明:${message}`)
    } catch(e) {
      console.log(e)
    }
  }
  // 额外显示的字段
  if (externalTxt) {
    strList.push(`${externalTxt}`)
  }

  strList.push(starStr)

  return strList.join('\n')
}

module.exports = getGitInfo
