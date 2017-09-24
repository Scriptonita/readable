function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);

  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + "/" + month + "/" + year + " - " + hour + ":" + min + ":" + sec;
  return time;
}

export default timeConverter;
