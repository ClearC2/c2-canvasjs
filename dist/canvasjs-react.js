'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasJS = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _canvasjs = require('../canvasjs/canvasjs.min');

var _canvasjs2 = _interopRequireDefault(_canvasjs);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.CanvasJS = _canvasjs2.default;

var CanvasJSChart = function (_Component) {
  _inherits(CanvasJSChart, _Component);

  function CanvasJSChart() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CanvasJSChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CanvasJSChart.__proto__ || Object.getPrototypeOf(CanvasJSChart)).call.apply(_ref, [this].concat(args))), _this), _this.chartContainerId = 'canvasjs-react-chart-container-' + CanvasJSChart._cjsContainerId++, _this.state = {
      options: _this.props.options
    }, _this.updateOptions = function () {
      _this.setState(function () {
        return { options: _this.props.options };
      });
    }, _this.updateChart = function () {
      _this.chart.options = _this.state.options;
      _this.chart.render();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CanvasJSChart, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(p, s) {
      if (!(0, _lodash.isEqual)(this.props.options, p.options) || !(0, _lodash.isEqual)(this.props.style, p.style)) {
        this.updateOptions();
      }
      this.updateChart();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.chart = new _canvasjs2.default.Chart(this.chartContainerId, this.state.options);
      this.chart.render();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.chart.destroy();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { id: this.chartContainerId, style: this.props.style });
    }
  }]);

  return CanvasJSChart;
}(_react.Component);

CanvasJSChart._cjsContainerId = 0;
CanvasJSChart.propTypes = {
  options: _propTypes2.default.object,
  style: _propTypes2.default.object
};
CanvasJSChart.defaultProps = {
  options: {},
  style: {
    width: '100%',
    height: '100%',
    position: 'relative'
  }
};
exports.default = CanvasJSChart;