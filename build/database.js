"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect('mongodb+srv://adm_cgm:zkyr9OXnAEBJHmtd@cluster0.lucub.mongodb.net/api-node-jwt?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function (db) {
  return console.log('db is connected');
})["catch"](function (error) {
  return console.error(error);
});