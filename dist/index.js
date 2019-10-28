'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreFormatted = exports.Pie = exports.Bar = exports.Funnel = exports.CanvasJS = undefined;

var _canvasjsReact = require('./canvasjs-react');

var _canvasjsReact2 = _interopRequireDefault(_canvasjsReact);

var _Funnel = require('./Charts/Funnel');

var _Funnel2 = _interopRequireDefault(_Funnel);

var _Bar = require('./Charts/Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _Pie = require('./Charts/Pie');

var _Pie2 = _interopRequireDefault(_Pie);

var _PreFormatted = require('./Charts/PreFormatted');

var _PreFormatted2 = _interopRequireDefault(_PreFormatted);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _canvasjsReact2.default;
exports.CanvasJS = _canvasjsReact.CanvasJS;
exports.Funnel = _Funnel2.default;
exports.Bar = _Bar2.default;
exports.Pie = _Pie2.default;
exports.PreFormatted = _PreFormatted2.default;