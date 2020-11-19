import axios from './axios';

const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const year = month * 12;

/**
 * 获取本地时间与服务器时间的时间戳差值
 */
export function getTimestampDiff() {
  var curTimestamp = new Date().getTime();
  var serverTimestamp = new Date().getTime();
  return axios({
    url: axios.adornUrl('/common/nowTime'),
    method: 'post',
    data: axios.adornData()
  }).then(({data}) => {
    if (data && data.code === 0) {
      return data.data - curTimestamp;
    } else {
      return serverTimestamp - curTimestamp;
    }
  }).catch(() => {});
}

/**
 * 格式时间戳
 * @param {Timestamp} timer 时间戳
 * @param {String} format 格式
 */
export function formatDate(timestamp, format) {
  if (!timestamp || timestamp === '') {
    return '--';
  }
  if ((timestamp).toString().length === 10) {
    timestamp = timestamp * 1000;
  }
  format = format || 'yyyy-MM-dd hh:mm:ss';
  var time = new Date(timestamp);
  var o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // / /季度
    'S': time.getMilliseconds() // 毫秒
  };
  format = format === null
    ? 'yyyy-MM-dd'
    : format;
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1)
          ? (o[k])
          : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
  }
  return format;
}

/**
 * 将时间戳格式化为 ‘今天/昨天/前天/3天前/1个月前/1年前 12:10:00’
 * @param {Number} timestamp 需要格式化的时间戳
 * @param {Number} curTimestamp 服务器当前时间戳
 */
export function timestampFormatToHms(timestamp, curTimestamp) {
  timestamp = new Date(timestamp) && new Date(timestamp).getTime();
  var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
  var r = 0;
  var tmDate = new Date(timestamp); // 参数时间戳转换成的日期对象
  var y = tmDate.getFullYear(),
    M = tmDate.getMonth() + 1,
    d = tmDate.getDate(),
    H = tmDate.getHours(),
    m = tmDate.getMinutes(),
    s = tmDate.getSeconds();
  var daytext = '';
  if (timestampDiff > year) { // 大于1年
    r = Math.floor(timestampDiff / year);
    daytext = r + '年前';
  } else if (timestampDiff > month) { // 大于1个月(按30天算)
    r = Math.floor(timestampDiff / month);
    daytext = r + '个月前';
  } else if (timestampDiff > day) { // 大于1天
    r = Math.floor(timestampDiff / day);
    if (r === 1) {
      daytext = '昨天';
    } else if (r === 2) {
      daytext = '前天';
    } else {
      daytext = r + '天前';
    }
  } else { // 小于一天
    var curdate = new Date(curTimestamp).getDate();
    if (d === curdate) {
      daytext = '今天';
    } else if (d === curdate - 1) {
      daytext = '昨天';
    }
  }
  return daytext + ' ' + zeroize(H) + ':' + zeroize(m) + ':' + zeroize(s);
}

/**
 * 将时间戳格式化为 ‘刚刚/1分钟前/1小时前/1天前/1个月前/1年前’
 * @param {Number} timestamp 需要格式化的时间戳
 * @param {Number} curTimestamp 服务器当前时间戳
 */
export function timestampFormatToAgo(timestamp, curTimestamp) {
  var timestampDiff = curTimestamp - timestamp; // 参数时间戳与当前时间戳相差秒数
  var r = 0;
  if (timestampDiff > year) { // 大于1年
    r = timestampDiff / year;
    return r + '年前';
  } else if (timestampDiff > month) { // 大于1个月(按30天算)
    r = timestampDiff / month;
    return r + '个月前';
  } else if (timestampDiff > day) { // 大于1天
    r = timestampDiff / day;
    return r + '天前';
  } else if (timestampDiff > hour) { // 小于1小时
    r = timestampDiff / hour;
    return r + '小时前';
  } else if (timestampDiff > minute) { // 大于1分钟
    r = timestampDiff / minute;
    return r + '分钟前';
  }
  return '刚刚';
}

export function getTimeLong(timestamp) {
  var timelong = '';
  var theDay = Math.floor(timestamp / day);
  var newDay = timestamp % day;
  var theHour = Math.floor(newDay / hour);
  var newHour = newDay % hour;
  var theMinite = Math.floor(newHour / minute);
  var newMinute = newHour % minute;
  var theSeconds = Math.floor(newMinute / 1000);
  if (theDay > 0) {
    timelong += theDay + '天';
  }
  if (theHour > 0) {
    timelong += theHour + '小时';
  }
  if (theMinite > 0) {
    timelong += theMinite + '分';
  }
  if (theSeconds > 0) {
    timelong += theSeconds + '秒';
  }
  return timelong;
}

/**
 * 补位，将一位数字前面补0
 * @param {Number} num 需要补位的数值
 */
export function zeroize(num) {
  return (String(num).length === 1
    ? '0'
    : '') + num;
}