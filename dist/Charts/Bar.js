'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bar = function (_Component) {
  _inherits(Bar, _Component);

  function Bar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Bar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bar.__proto__ || Object.getPrototypeOf(Bar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      options: {
        animationEnabled: true,
        data: [{
          click: _this.props.onClick,
          explodeOnClick: false,
          type: _this.props.horizontal ? _this.props.stacked ? 'stackedBar' : 'bar' : _this.props.stacked ? 'stackedColumn' : 'column',
          toolTipContent: _this.props.toolTipContent,
          indexLabelPlacement: _this.props.indexLabelPlacement,
          indexLabel: _this.props.indexLabel,
          dataPoints: []
        }]
      }
    }, _this.parseData = function (data) {
      data = typeof data.toList === 'function' ? data.toList() : data;
      data = typeof data.toJS === 'function' ? data.toJS() : data;
      if (data && !Array.isArray(data)) {
        console.error('The data provided to this chart is malformed. The data should be an array of data objects, but instead found', data); // eslint-disable-line
      } else {
        var _this$props = _this.props,
            dataKey = _this$props.dataKey,
            dataLabel = _this$props.dataLabel,
            stacked = _this$props.stacked,
            dataStackKey = _this$props.dataStackKey;

        if (stacked) {
          var datamap = {};
          var sections = [];
          var knownBars = [];
          data.forEach(function (item) {
            var label = item[dataLabel];
            knownBars.push(label);
            if (typeof label !== 'undefined' && Array.isArray(item.data)) {
              item.data.forEach(function (piece, i) {
                var pieceLable = piece[dataStackKey];
                if (pieceLable) {
                  if (!datamap[pieceLable]) {
                    var section = _extends({}, _this.state.options.data[0]);
                    section.indexLabel = '';
                    section.dataPoints = [];
                    section.dataPoints[knownBars.indexOf(label)] = { label: label, y: +piece[dataKey] || 1 };
                    section.toolTipContent = '<strong>' + piece[dataStackKey] + '</strong> {y}';
                    datamap[pieceLable] = { i: i };
                    sections.push(section);
                  } else {
                    var dataPoints = sections[datamap[pieceLable].i].dataPoints;
                    if (!dataPoints.some(function (sec) {
                      if (sec.label === label) {
                        sec.y = sec.y + (piece[dataKey] || 1);
                        return true;
                      }
                    })) {
                      dataPoints[knownBars.indexOf(label)] = { label: label, y: +piece[dataKey] || 1 };
                    }
                  }
                }
              });
            } else {
              console.error('You have specified a stacked bar chart but either a label or data array was not found for this item.', item); // eslint-disable-line
            }
          });
          knownBars.forEach(function (bar, i) {
            sections.forEach(function (section) {
              if (!section.dataPoints[i]) {
                section.dataPoints[i] = { label: bar, y: 0 };
              }
            });
          });
          _this.setState(function (s) {
            var options = s.options;

            options.data = sections;
            return { options: options };
          });
        } else {
          var _datamap = {};
          var parsed = [];
          var total = 0;
          data.forEach(function (item) {
            var count = dataKey === null ? 1 : +item[dataKey] || 0;
            if (isNaN(count)) count = 0;
            var label = item[dataLabel];
            if (typeof label !== 'undefined') {
              total = total + count;
              if (_datamap[label] >= 0) {
                parsed[_datamap[label]].y = parsed[_datamap[label]].y + count;
              } else {
                _datamap[label] = Object.keys(_datamap).length;
                parsed.push({ label: label, y: count });
              }
            }
          });
          parsed.map(function (item) {
            item.percentage = (item.y / total * 100).toFixed(2);
            return item;
          });
          _this.setState(function (s) {
            var options = s.options;

            options.data[0].dataPoints = parsed;
            return { options: options };
          });
        }
      }
    }, _this.componentDidMount = function () {
      var data = _this.props.data;

      _this.parseData(data);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Bar, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(p) {
      if (!(0, _lodash.isEqual)(p.data, this.props.data)) {
        this.parseData(this.props.data);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var options = this.state.options;
      var style = this.props.style;

      return _react2.default.createElement(_index2.default, { style: style, options: options });
    }
  }]);

  return Bar;
}(_react.Component);

Bar.propTypes = {
  toolTipContent: _propTypes2.default.string,
  indexLabel: _propTypes2.default.string,
  indexLabelPlacement: _propTypes2.default.string,
  data: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]),
  dataKey: _propTypes2.default.string,
  dataLabel: _propTypes2.default.string,
  dataStackKey: _propTypes2.default.string,
  style: _propTypes2.default.object,
  onClick: _propTypes2.default.func,
  horizontal: _propTypes2.default.bool,
  stacked: _propTypes2.default.bool
};
Bar.defaultProps = {
  toolTipContent: '<b>{label}</b>: {y}',
  indexLabel: '{y}',
  indexLabelPlacement: 'outside',
  data: [],
  dataKey: 'count',
  dataStackKey: 'label',
  dataLabel: 'label',
  horizontal: false,
  stacked: false
};
exports.default = Bar;