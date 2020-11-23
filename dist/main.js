'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _regeneratorRuntime = require('@babel/runtime/regenerator');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _inherits = require('@babel/runtime/helpers/inherits');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _wrapNativeSuper = require('@babel/runtime/helpers/wrapNativeSuper');
var dateFns = require('date-fns');
var Joi = require('joi');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _wrapNativeSuper__default = /*#__PURE__*/_interopDefaultLegacy(_wrapNativeSuper);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf__default['default'](Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf__default['default'](this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn__default['default'](this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ValidationError = /*#__PURE__*/function (_Error) {
  _inherits__default['default'](ValidationError, _Error);

  var _super = _createSuper(ValidationError);

  function ValidationError() {
    _classCallCheck__default['default'](this, ValidationError);

    return _super.apply(this, arguments);
  }

  return ValidationError;
}( /*#__PURE__*/_wrapNativeSuper__default['default'](Error));

var getParsedDate = function getParsedDate(date) {
  return dateFns.parse(date, 'yyyy-MM-dd kk:mm:ss', new Date(date));
};

var payloadSchema = Joi.object({
  'ID': Joi.number().required(),
  'Descrição': Joi.string().required(),
  'Data Máxima de conclusão': Joi.string().pattern(new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/)).required(),
  'Tempo estimado': Joi.string().pattern(new RegExp(/[0-9]{1} horas/)).required()
});

var payloadToJobDto = function payloadToJobDto(payload) {
  var _payloadSchema$valida = payloadSchema.validate(payload),
      error = _payloadSchema$valida.error;

  if (error) {
    throw new ValidationError();
  }

  return {
    description: payload['Descrição'],
    estimatedHoursToFinish: parseInt(payload['Tempo estimado'].split(' ')[0]),
    id: payload['ID'],
    maxDateToFinish: getParsedDate(payload['Data Máxima de conclusão'])
  };
};

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var chunkItemsIdByMaxTimeOfDay = function chunkItemsIdByMaxTimeOfDay(maxTime, jobs) {
  var chunked = [];
  var indexChunk = 0;
  var hoursAccumulatorOfDay = 0;

  var _iterator = _createForOfIteratorHelper(jobs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;

      if (hoursAccumulatorOfDay + item.estimatedHoursToFinish > maxTime) {
        indexChunk += 1;
        hoursAccumulatorOfDay = 0;
      }

      hoursAccumulatorOfDay += item.estimatedHoursToFinish;
      chunked[indexChunk] = chunked[indexChunk] ? [].concat(_toConsumableArray__default['default'](chunked[indexChunk]), [item.id]) : [item.id];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return chunked;
};

var orderByPriority = function orderByPriority(start, jobs) {
  return jobs.sort(function (aJob, bJob) {
    var maxHoursToFinishJobA = dateFns.differenceInHours(aJob.maxDateToFinish, start);
    var maxHoursToFinishJobB = dateFns.differenceInHours(bJob.maxDateToFinish, start);
    return maxHoursToFinishJobA < maxHoursToFinishJobB ? -1 : 1;
  });
};

var MAX_TIME = 8;
var getArrayOfJobs = function getArrayOfJobs(payloads, executionWindow) {
  var jobDtos = payloads.map(function (payloadItem) {
    return payloadToJobDto(payloadItem);
  });
  var startAsDate = getParsedDate(executionWindow.start);
  var orderedJobs = orderByPriority(startAsDate, jobDtos);
  return chunkItemsIdByMaxTimeOfDay(MAX_TIME, orderedJobs);
};
(function () {
  var _run = _asyncToGenerator__default['default']( /*#__PURE__*/_regeneratorRuntime__default['default'].mark(function _callee() {
    var payload, executionWindow, result;
    return _regeneratorRuntime__default['default'].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            payload = [{
              'ID': 1,
              'Descrição': 'Importação de arquivos de fundos',
              'Data Máxima de conclusão': '2019-11-10 12:00:00',
              'Tempo estimado': '2 horas'
            }, {
              'ID': 2,
              'Descrição': 'Importação de dados da Base Legada',
              'Data Máxima de conclusão': '2019-11-11 12:00:00',
              'Tempo estimado': '4 horas'
            }, {
              'ID': 3,
              'Descrição': 'Importação de dados de integração',
              'Data Máxima de conclusão': '2019-11-11 08:00:00',
              'Tempo estimado': '6 horas'
            }];
            executionWindow = {
              start: '2019-11-10 09:00:00',
              end: '2019-11-11 12:00:00'
            };
            result = getArrayOfJobs(payload, executionWindow);
            console.log(result);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function run() {
    return _run.apply(this, arguments);
  }

  return run;
})()();

exports.getArrayOfJobs = getArrayOfJobs;
//# sourceMappingURL=main.js.map
