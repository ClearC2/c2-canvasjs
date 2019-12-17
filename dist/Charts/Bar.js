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

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
      dataSubFilter: [],
      options: {
        animationEnabled: true,
        axisX: _extends({
          interval: 1
        }, _this.props.axisX),
        axisY: _extends({}, _this.props.axisY),
        data: [{
          click: _this.props.onClick,
          explodeOnClick: false,
          type: _this.props.horizontal ? _this.props.stacked ? 'stackedBar' : 'bar' : _this.props.stacked ? 'stackedColumn' : 'column',
          toolTipContent: _this.props.toolTipContent,
          indexLabelPlacement: _this.props.indexLabelPlacement,
          indexLabel: _this.props.indexLabel,
          indexLabelWrap: _this.props.indexLabelWrap,
          indexLabelFormatter: _this.props.labelFormatter,
          dataPoints: []
        }]
      }
    }, _this.handleSubFilterRemove = function (i) {
      _this.setState(function (s) {
        var dataSubFilter = [].concat(_toConsumableArray(s.dataSubFilter)).slice(0, i);
        return { dataSubFilter: dataSubFilter };
      });
    }, _this.handleClick = function (e) {
      var _this$props = _this.props,
          _this$props$onClick = _this$props.onClick,
          onClick = _this$props$onClick === undefined ? function () {
        return null;
      } : _this$props$onClick,
          dataLabel = _this$props.dataLabel,
          stacked = _this$props.stacked,
          dataStackKey = _this$props.dataStackKey;

      if (Array.isArray(dataLabel)) {
        var label = e.dataPoint.label;

        var terminal = false;
        _this.setState(function (s) {
          var dataSubFilter = [].concat(_toConsumableArray(s.dataSubFilter));
          terminal = _this.state.dataSubFilter.length === _this.props.dataLabel.length - 1;
          if (dataSubFilter[dataSubFilter.length - 1] !== label && dataSubFilter.length !== dataLabel.length - 1) {
            dataSubFilter.push(label);
          }
          return { dataSubFilter: dataSubFilter };
        }, function () {
          var dataSubFilter = _this.state.dataSubFilter;

          var filters = {};
          var dataLabelMap = _this.props.dataLabelMap;

          var items = [];
          if (Array.isArray(dataLabelMap)) {
            dataSubFilter.forEach(function (val, i) {
              var key = dataLabelMap[i];
              if (key) {
                var data = _this.props.data;

                if (data.toList) data = data.toList();
                if (data.toJS) data = data.toJS();
                if (!Array.isArray(data)) {
                  console.error('You have specified a data label map but the data is not an array of objects, cannot parse values.'); // eslint-disable-line
                } else {
                  items = data;
                  var value = null;
                  data.some(function (item) {
                    if (item[dataLabel[i]] === val) {
                      value = item[key];
                      return true;
                    }
                  });
                  if (typeof value === 'undefined') value = val;
                  filters[key] = value;
                }
              } else {
                filters[dataLabel[i]] = val;
              }
            });
          }
          if (terminal) {
            var lastKey = dataLabel[dataLabel.length - 1];
            var lastKeyMap = dataLabelMap ? dataLabelMap[dataLabelMap.length - 1] : lastKey;
            if (dataLabelMap && dataLabelMap.length === dataLabel.length) {
              var value = null;
              items.some(function (item) {
                if (item[lastKey] === label) {
                  value = item[lastKeyMap];
                  return true;
                }
              });
              filters[lastKeyMap] = value;
            } else {
              filters[lastKey] = label;
            }
          }
          onClick(e, filters, terminal);
        });
      } else {
        var filters = _defineProperty({}, dataLabel, e.dataPoint.label);
        if (stacked) {
          filters[dataStackKey] = e.dataSeries.label;
        }
        onClick(e, filters, true);
      }
    }, _this.parseData = function (data) {
      data = typeof data.toList === 'function' ? data.toList() : data;
      data = typeof data.toJS === 'function' ? data.toJS() : data;
      if (data && !Array.isArray(data)) {
        console.error('The data provided to this chart is malformed. The data should be an array of data objects, but instead found', data); // eslint-disable-line
      } else {
        var _this$props2 = _this.props,
            dataKey = _this$props2.dataKey,
            stacked = _this$props2.stacked,
            dataStackKey = _this$props2.dataStackKey;
        var dataSubFilter = _this.state.dataSubFilter;
        var dataLabel = _this.props.dataLabel;

        if (Array.isArray(dataLabel) && dataSubFilter.length) {
          data = data.filter(function (item) {
            var match = true;
            dataSubFilter.forEach(function (subVal, i) {
              if (item[dataLabel[i]] !== subVal) {
                match = false;
              }
            });
            return match;
          });
        }
        if (Array.isArray(dataLabel)) {
          dataLabel = dataLabel[dataSubFilter.length];
        }
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
                    section.click = _this.handleClick;
                    section.dataPoints[knownBars.indexOf(label)] = { label: label, y: +piece[dataKey] || 1 };
                    section.toolTipContent = '<strong>' + piece[dataStackKey] + '</strong> {y}';
                    section.label = piece[dataStackKey];
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
            options.data[0].click = _this.handleClick;
            return { options: options };
          });
        }
      }
    }, _this.setControlledData = function () {
      _this.setState(function (s) {
        var options = s.options;

        options.data = _this.props.data;
        return { options: options };
      });
    }, _this.componentDidMount = function () {
      if (_this.props.controlled) {
        _this.setControlledData();
      } else {
        var data = _this.props.data;

        _this.parseData(data);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Bar, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(p, s) {
      if (this.props.controlled) {
        this.setControlledData();
      } else {
        if (!(0, _lodash.isEqual)(p.data, this.props.data) || this.state.dataSubFilter.length !== s.dataSubFilter.length) {
          this.parseData(this.props.data);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          options = _state.options,
          dataSubFilter = _state.dataSubFilter;
      var style = this.props.style;

      console.log(this.props, this.state, 'props state in canvasjs bar logggggggg');
      return _react2.default.createElement(
        _index2.default,
        { style: style, options: options },
        dataSubFilter.length > 0 && _react2.default.createElement(
          'div',
          {
            style: {
              width: '100%',
              position: 'absolute',
              left: 90,
              top: -20
            }
          },
          dataSubFilter.map(function (value, i) {
            return _react2.default.createElement(
              _react.Fragment,
              { key: i },
              _react2.default.createElement(_reactTooltip2.default, null),
              _react2.default.createElement(
                'strong',
                {
                  'data-tip': 'Click to remove filter.',
                  style: {
                    cursor: 'pointer',
                    userSelect: 'none'
                  },
                  onClick: function onClick() {
                    return _this2.handleSubFilterRemove(i);
                  }
                },
                i > 0 && ' > ',
                value === '' ? 'Blank' : value
              )
            );
          })
        )
      );
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
  dataLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  dataLabelMap: _propTypes2.default.array,
  dataStackKey: _propTypes2.default.string,
  style: _propTypes2.default.object,
  onClick: _propTypes2.default.func,
  horizontal: _propTypes2.default.bool,
  stacked: _propTypes2.default.bool,
  axisX: _propTypes2.default.object,
  axisY: _propTypes2.default.object,
  indexLabelWrap: _propTypes2.default.bool,
  controlled: _propTypes2.default.bool,
  labelFormatter: _propTypes2.default.func
};
Bar.defaultProps = {
  toolTipContent: '<b>{label}</b>: {y}',
  indexLabel: '{y}',
  indexLabelPlacement: 'outside',
  indexLabelWrap: false,
  data: [],
  dataKey: 'count',
  dataStackKey: 'label',
  dataLabel: 'label',
  horizontal: false,
  stacked: false,
  axisX: {},
  axisY: {}
};
exports.default = Bar;