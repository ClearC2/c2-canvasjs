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

var Funnel = function (_Component) {
  _inherits(Funnel, _Component);

  function Funnel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Funnel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Funnel.__proto__ || Object.getPrototypeOf(Funnel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      show: true,
      options: {
        animationEnabled: true,
        data: [{
          type: 'funnel',
          toolTipContent: _this.props.toolTipContent,
          indexLabelPlacement: _this.props.indexLabelPlacement,
          indexLabel: _this.props.indexLabel,
          dataPoints: []
        }]
      }
    }, _this.parseData = function (data) {
      _this.setState(function () {
        return { show: false };
      }, function () {
        var _this$props = _this.props,
            dataKey = _this$props.dataKey,
            dataLabel = _this$props.dataLabel,
            percentType = _this$props.percentType;

        var datamap = {}; // keeping track of order that the data was passed in - JRA 06/04/2019
        var parsed = [];
        var total = 0;
        data.forEach(function (item, i) {
          var count = +item[dataKey] || 0;
          if (isNaN(count)) count = 0;
          var label = item[dataLabel] || null;
          if (label) {
            total = total + count;
            if (datamap[label] >= 0) {
              parsed[datamap[label]].y = parsed[datamap[label]].y + count;
            } else {
              datamap[label] = i;
              parsed.push({ label: label, y: count });
            }
          }
        });
        if (percentType === 'inclusive') {
          var left = total;
          parsed.map(function (item) {
            item.percentage = (left / total * 100).toFixed(2);
            left = left - item.y;
            return item;
          });
        } else {
          parsed.map(function (item) {
            item.percentage = (item.y / total * 100).toFixed(2);
            return item;
          });
        }
        _this.setState(function (s) {
          var options = s.options;

          options.data[0].dataPoints = parsed;
          return { options: options, show: true };
        });
      });
    }, _this.verifyPercentType = function (percentType) {
      if (percentType && percentType !== 'exclusive' && percentType !== 'inclusive') {
        console.warn('The percentType of ' + percentType + ' is not supported. Falling back to \'exclusive\' (percentages calculated independently).'); // eslint-disable-line
      }
    }, _this.componentDidMount = function () {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          percentType = _this$props2.percentType;

      _this.parseData(data);
      _this.verifyPercentType(percentType);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Funnel, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(p) {
      if (!(0, _lodash.isEqual)(p.data, this.props.data)) {
        this.parseData(this.props.data);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          options = _state.options,
          show = _state.show;

      return show ? _react2.default.createElement(_index2.default, _extends({}, this.props, { options: options })) : null; // quick fix to make this rerender when data is updated - JRA 06/04/2019
    }
  }]);

  return Funnel;
}(_react.Component);

Funnel.propTypes = {
  toolTipContent: _propTypes2.default.string,
  indexLabel: _propTypes2.default.string,
  indexLabelPlacement: _propTypes2.default.string,
  data: _propTypes2.default.array,
  dataKey: _propTypes2.default.string,
  dataLabel: _propTypes2.default.string,
  percentType: _propTypes2.default.string
};
Funnel.defaultProps = {
  toolTipContent: '<b>{label}</b>: {y} <b>({percentage}%)</b>',
  indexLabel: '{label} {y} ({percentage}%)',
  indexLabelPlacement: 'outside',
  data: [],
  dataKey: 'count',
  dataLabel: 'label',
  percentType: 'exclusive'
};
exports.default = Funnel;