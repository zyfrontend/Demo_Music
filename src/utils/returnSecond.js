// 将播放时长还原为秒数
export function returnSecond(time) {
  time = time.split(':')
  let m = parseInt(time[0])
  let s = parseInt(time[1])
  return m * 60 + s
}
