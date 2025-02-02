"use strict";

var _Role = require("../models/Role");

var _User = _interopRequireDefault(require("../models/User"));

var _helper = require("../libs/helper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var checkDuplicateUsernameOrEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var user, email;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _User["default"].findOne({
              username: req.body.username
            });

          case 3:
            user = _context.sent;

            if (!user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(400).json((0, _helper.messageOut)(3, 'Warning', 'Email ya se encuentra registrado')));

          case 6:
            _context.next = 8;
            return _User["default"].findOne({
              email: req.body.email
            });

          case 8:
            email = _context.sent;

            if (!email) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).json((0, _helper.messageOut)(3, 'Warning', 'Nombre de usuario ya se encuentra registrado')));

          case 11:
            next();
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            res.status(500).json((0, _helper.messageOut)(1, 'Error', _context.t0));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 14]]);
  }));

  return function checkDuplicateUsernameOrEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var checkRolesExisted = function checkRolesExisted(req, res, next) {
  if (req.body.roles) {
    for (var i = 0; i < req.body.roles.length; i++) {
      if (!_Role.ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          code: 1,
          message: "Role ".concat(req.body.roles[i], " No existe")
        });
      }
    }
  }

  next();
};

module.exports = {
  checkRolesExisted: checkRolesExisted,
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};