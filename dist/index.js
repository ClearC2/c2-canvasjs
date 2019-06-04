'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Funnel = undefined;

var _canvasjs = require('./canvasjs.react');

var _canvasjs2 = _interopRequireDefault(_canvasjs);

var _Funnel = require('./Charts/Funnel');

var _Funnel2 = _interopRequireDefault(_Funnel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CanvasJSChart = _canvasjs2.default.CanvasJSChart;
exports.default = CanvasJSChart;
exports.Funnel = _Funnel2.default;