var React = require('react');
var oldCreateElement = React.createElement;

var UNIQUE_CLASS_NAME = '__elemental__';

function makeClassName(className) {
  if(className.indexOf(UNIQUE_CLASS_NAME) > -1) {
    return className;
  }
  return className + ' ' + UNIQUE_CLASS_NAME;
}

function createElement() {
  var type = arguments[0];
  var props = arguments[1];
  if (!props || !props.className) {
    return oldCreateElement.apply(React, arguments);
  }
  arguments[1] = { ...props, className: makeClassName(props.className)};
  return oldCreateElement.apply(React, arguments);
}

module.exports = {
  ...React,
  createElement
};
