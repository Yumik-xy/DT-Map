const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

var notify = require("../data/data_notify.js");
var notify_next = require("../data/data_notify_next.js");

function getData(url){
  return new Promise(function(reslove, reject){
    wx.request({
      url: 'url',
      data: {},
      header: {
      'Content-Type': 'application/json'
      },
      success: function(res){
        console.log("success");
        reslove(res);
      },
      fail: function(res){
        console.log("fail");
        reject(res);
      }
    })
  })
}

function getnotify(){
  return notify.notify
}

function getNextnotify(){
  return notify_next.nextnotify
}

module.exports.getData = getData;
module.exports.getnotify = getnotify;
module.exports.getNextnotify = getNextnotify;