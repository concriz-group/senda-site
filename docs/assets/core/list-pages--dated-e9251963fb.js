// Browser script for `list-pages` filtered by a date against today (item-lists.js), published as
// its own hashed file. The build sends the items of the build's day, then hidden the ones a
// later day may show; this shows the list as of the visitor's day. Without it, the build's day.
(function (enhance) {
  if (typeof module === 'object' && module.exports) module.exports = enhance;
  else {
    var now = new Date();
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var today = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
    document.querySelectorAll('[data-dated]').forEach(function (list) { enhance(list, today); });
  }
})(function enhance(list, today) {
  var tests = {
    '=': function (c) { return c === 0; },
    '!=': function (c) { return c !== 0; },
    '>=': function (c) { return c >= 0; },
    '<=': function (c) { return c <= 0; },
    '>': function (c) { return c > 0; },
    '<': function (c) { return c < 0; },
  };
  var test = tests[list.getAttribute('data-dated')];
  if (!test) return;
  var limit = Number(list.getAttribute('data-limit')) || Infinity;
  var shown = 0;
  Array.prototype.slice.call(list.querySelectorAll('[data-when]')).forEach(function (item) {
    var when = item.getAttribute('data-when');
    // a date and time is compared with the start of the day
    var wanted = when.indexOf('T') > 0 ? today + 'T00:00' : today;
    var passes = test(when < wanted ? -1 : when > wanted ? 1 : 0);
    if (passes && shown < limit) {
      item.hidden = false;
      shown += 1;
    } else item.parentNode.removeChild(item);
  });
  list.hidden = shown === 0;
});
