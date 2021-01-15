"use strict";

var messageOut = function messageOut(code, status, message) {
  return {
    code: code,
    status: status,
    message: message
  };
};

module.exports = {
  messageOut: messageOut
};