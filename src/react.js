var React = require('react');
var shallowCompare = require('react/lib/shallowCompare');

var oldCreateElement = React.createElement;
var oldCreateClass = React.createClass;

var UNIQUE_CLASS_NAME = '__elemental__';

function makeClassName(className) {
  if (!className) {
    return UNIQUE_CLASS_NAME;
  }
  if(className.indexOf(UNIQUE_CLASS_NAME) > -1) {
    return className;
  }
  return className + ' ' + UNIQUE_CLASS_NAME;
}

function createElement() {
  var props = arguments[1];
  if (!props) {
    return oldCreateElement.apply(React, arguments);
  }
  arguments[1] = { ...props, className: makeClassName(props.className)};
  return oldCreateElement.apply(React, arguments);
}

function createClass(specification) {
  return oldCreateClass.call(React, {
    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    },
    ...specification
  });
}

module.exports = {
  ...React,
  createElement,
  createClass
};
