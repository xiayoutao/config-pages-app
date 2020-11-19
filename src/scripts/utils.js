/* eslint-disable no-prototype-builtins */
/**
 * 生成uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16);
  });
}

/**
 * 过滤对象
 * @param {object} obj
 * @param {array|string} filterKeys 需要设置为'' 的key值
 */
export function filterObjectNull (obj, filterKeys) {
  let _filterKeys = [];
  if (filterKeys instanceof Array) {
    _filterKeys = filterKeys;
  } else if (typeof filterKeys === 'string') {
    _filterKeys = [filterKeys];
  }
  var newObj = {};
  let keys = Object.keys(obj);
  keys.forEach(item => {
    if (obj[item]) {
      newObj[item] = obj[item];
    } else if (_filterKeys.length > 0 && _filterKeys.indexOf(item) >= 0) {
      newObj[item] = '';
    }
  });
  return newObj;
}

/**
 * 截取字符串前面n位字符
 * @param {*} str 需要截取的字符串
 * @param {*} len 截取字符串长度
 */
export function getFrontStr (str, len) {
  if (Number.isInteger(len) && len > 0) {
    if (str.length > len) {
      return str.substring(0, len) + '..';
    }
  }
  return str;
}

/**
 * 判断对象（层级为1）是否相等
 * @param {*} objA
 * @param {*} objB
 */
export function isObjectEqual (objA, objB) {
  var flag = true;
  var aKeys = Object.getOwnPropertyNames(objA);
  var bKeys = Object.getOwnPropertyNames(objB);

  if (aKeys.length !== bKeys.length) {
    flag = false;
  }

  // 遍历第一个对象的key值
  aKeys.forEach(item => {
    if (objA[item] !== objB[item]) { // 如果第一个对象某一个key值对应的值与第二个对象的不一致，则表示这两个对象不相等
      flag = false;
    }
  });

  return flag;
}

/**
 * 判断是否为字符串
 * @param {*} data
 */
export function isString (data) {
  return typeof data === 'string';
}

/**
 * 判断是否为Boolean值
 * @param {*} data
 */
export function isBoolean (data) {
  return typeof data === 'boolean';
}

/**
 * 判断是否为数字
 * @param {*} data
 */
export function isNumber (data) {
  return typeof data === 'number';
}

/**
 * 判断是否为数组
 * @param {*} data
 */
export function isArray (data) {
  if (typeof Array.isArray === 'function') { // 判断是否支持ES5的Array.isArray
    return Array.isArray(data);
  } else {
    return Array.prototype.isPrototypeOf(data);
  }
}

/**
 * 判断是否为对象
 * @param {*} data
 */
export function isObject (data) {
  return Object
    .prototype
    .toString
    .call(data) === '[object Object]';
}

/**
 * 在指定位置插入新字符串
 * @param {*} source 源字符串
 * @param {*} index 插入位置
 * @param {*} newStr 插入的字符串
 */
export function insertStr (source, index, newStr) {
  if (typeof source !== 'string')
    return console.error('只能对字符串进行插入操作');
  return source.slice(0, index) + newStr + source.slice(index);
}
