'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Funnel = undefined;

var _canvasjsReact = require('./canvasjs-react');

var _canvasjsReact2 = _interopRequireDefault(_canvasjsReact);

var _Funnel = require('./Charts/Funnel');

var _Funnel2 = _interopRequireDefault(_Funnel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CanvasJSChart = _canvasjsReact2.default.CanvasJSChart;
exports.default = CanvasJSChart;
exports.Funnel = _Funnel2.default;