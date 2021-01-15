"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _productsRoutes = _interopRequireDefault(require("./routes/productsRoutes"));

var _authRoutes = _interopRequireDefault(require("./routes/authRoutes"));

var _userRoutes = _interopRequireDefault(require("./routes/userRoutes"));

var _initialSetup = require("./libs/initialSetup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
app.set('pkg', _package["default"]);
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.get('/', function (req, res) {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    desciption: app.get('pkg').description,
    version: app.get('pkg').version
  });
});
app.use('/api/v1/products', _productsRoutes["default"]);
app.use('/api/v1/auth', _authRoutes["default"]);
app.use('/api/v1/user', _userRoutes["default"]);
var _default = app;
exports["default"] = _default;