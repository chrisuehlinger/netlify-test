  export default function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) { return typeof obj; };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }

    return _typeof(obj);
  }
`,s.jsx=a("7.0.0-beta.0")`
  var REACT_ELEMENT_TYPE;

  export default function _createRawReactElement(type, props, key, children) {
    if (!REACT_ELEMENT_TYPE) {
      REACT_ELEMENT_TYPE = (
        typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element")
      ) || 0xeac7;
    }

    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      // If we're going to assign props.children, we create a new object now
      // to avoid mutating defaultProps.
      props = {
        children: void 0,
      };
    }

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = new Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }
      props.children = childArray;
    }

    if (props && defaultProps) {
      for (var propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null,
    };
  }
`,s.asyncIterator=a("7.0.0-beta.0")`
  export default function _asyncIterator(iterable) {
    var method
    if (typeof Symbol !== "undefined") {
      if (Symbol.asyncIterator) {
        method = iterable[Symbol.asyncIterator]
        if (method != null) return method.call(iterable);
      }
      if (Symbol.iterator) {
        method = iterable[Symbol.iterator]
        if (method != null) return method.call(iterable);
      }
    }
    throw new TypeError("Object is not async iterable");
  }
`,s.AwaitValue=a("7.0.0-beta.0")`
  export default function _AwaitValue(value) {
    this.wrapped = value;
  }
`,s.AsyncGenerator=a("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null,
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg)
        var value = result.value;
        var wrappedAwait = value instanceof AwaitValue;

        Promise.resolve(wrappedAwait ? value.wrapped : value).then(
          function (arg) {
            if (wrappedAwait) {
              resume(key === "return" ? "return" : "next", arg);
              return
            }

            settle(result.done ? "return" : "normal", arg);
          },
          function (err) { resume("throw", err); });
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({ value: value, done: true });
          break;
        case "throw":
          front.reject(value);
          break;
        default:
          front.resolve({ value: value, done: false });
          break;
      }

      front = front.next;
      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    // Hide "return" method if generator return is not supported
    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; };
  }

  AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };
  AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };
  AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };
`,s.wrapAsyncGenerator=a("7.0.0-beta.0")`
  import AsyncGenerator from "AsyncGenerator";

  export default function _wrapAsyncGenerator(fn) {
    return function () {
      return new AsyncGenerator(fn.apply(this, arguments));
    };
  }
`,s.awaitAsyncGenerator=a("7.0.0-beta.0")`
  import AwaitValue from "AwaitValue";

  export default function _awaitAsyncGenerator(value) {
    return new AwaitValue(value);
  }
`,s.asyncGeneratorDelegate=a("7.0.0-beta.0")`
  export default function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {}, waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(function (resolve) { resolve(inner[key](value)); });
      return { done: false, value: awaitWrap(value) };
    };

    if (typeof Symbol === "function" && Symbol.iterator) {
      iter[Symbol.iterator] = function () { return this; };
    }

    iter.next = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }
      return pump("next", value);
    };

    if (typeof inner.throw === "function") {
      iter.throw = function (value) {
        if (waiting) {
          waiting = false;
          throw value;
        }
        return pump("throw", value);
      };
    }

    if (typeof inner.return === "function") {
      iter.return = function (value) {
        if (waiting) {
          waiting = false;
          return value;
        }
        return pump("return", value);
      };
    }

    return iter;
  }
`,s.asyncToGenerator=a("7.0.0-beta.0")`
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  export default function _asyncToGenerator(fn) {
    return function () {
      var self = this, args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }
`,s.classCallCheck=a("7.0.0-beta.0")`
  export default function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
`,s.createClass=a("7.0.0-beta.0")`
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i ++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  export default function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
`,s.defineEnumerableProperties=a("7.0.0-beta.0")`
  export default function _defineEnumerableProperties(obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    // Symbols are not enumerated over by for-in loops. If native
    // Symbols are available, fetch all of the descs object's own
    // symbol properties and define them on our target object too.
    if (Object.getOwnPropertySymbols) {
      var objectSymbols = Object.getOwnPropertySymbols(descs);
      for (var i = 0; i < objectSymbols.length; i++) {
        var sym = objectSymbols[i];
        var desc = descs[sym];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, sym, desc);
      }
    }
    return obj;
  }
`,s.defaults=a("7.0.0-beta.0")`
  export default function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
`,s.defineProperty=a("7.0.0-beta.0")`
  export default function _defineProperty(obj, key, value) {
    // Shortcircuit the slow defineProperty path when possible.
    // We are trying to avoid issues where setters defined on the
    // prototype cause side effects under the fast path of simple
    // assignment. By checking for existence of the property with
    // the in operator, we can optimize most of this overhead away.
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
`,s.extends=a("7.0.0-beta.0")`
  export default function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };

    return _extends.apply(this, arguments);
  }
`,s.objectSpread=a("7.0.0-beta.0")`
  import defineProperty from "defineProperty";

  export default function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? Object(arguments[i]) : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys.forEach(function(key) {
        defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
`,s.objectSpread2=a("7.5.0")`
  import defineProperty from "defineProperty";

  // This function is different to "Reflect.ownKeys". The enumerableOnly
  // filters on symbol properties only. Returned string properties are always
  // enumerable. It is good to use in objectSpread.

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }

  export default function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
      }
    }
    return target;
  }
`,s.inherits=a("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";

  export default function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }
`,s.inheritsLoose=a("7.0.0-beta.0")`
  export default function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
`,s.getPrototypeOf=a("7.0.0-beta.0")`
  export default function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }
`,s.setPrototypeOf=a("7.0.0-beta.0")`
  export default function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
`,s.isNativeReflectConstruct=a("7.9.0")`
  export default function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;

    // core-js@3
    if (Reflect.construct.sham) return false;

    // Proxy can't be polyfilled. Every browser implemented
    // proxies before or at the same time as Reflect.construct,
    // so if they support Proxy they also support Reflect.construct.
    if (typeof Proxy === "function") return true;

    // Since Reflect.construct can't be properly polyfilled, some
    // implementations (e.g. core-js@2) don't set the correct internal slots.
    // Those polyfills don't allow us to subclass built-ins, so we need to
    // use our fallback implementation.
    try {
      // If the internal slots aren't set, this throws an error similar to
      //   TypeError: this is not a Date object.
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
      return true;
    } catch (e) {
      return false;
    }
  }
`,s.construct=a("7.0.0-beta.0")`
  import setPrototypeOf from "setPrototypeOf";
  import isNativeReflectConstruct from "isNativeReflectConstruct";

  export default function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      // NOTE: If Parent !== Class, the correct __proto__ is set *after*
      //       calling the constructor.
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    // Avoid issues with Class being present but undefined when it wasn't
    // present in the original call.
    return _construct.apply(null, arguments);
  }
`,s.isNativeFunction=a("7.0.0-beta.0")`
  export default function _isNativeFunction(fn) {
    // Note: This function returns "true" for core-js functions.
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
`,s.wrapNativeSuper=a("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";
  import setPrototypeOf from "setPrototypeOf";
  import isNativeFunction from "isNativeFunction";
  import construct from "construct";

  export default function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor)
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true,
        }
      });

      return setPrototypeOf(Wrapper, Class);
    }

    return _wrapNativeSuper(Class)
  }
`,s.instanceof=a("7.0.0-beta.0")`
  export default function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }
`,s.interopRequireDefault=a("7.0.0-beta.0")`
  export default function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
`,s.interopRequireWildcard=a("7.0.0-beta.0")`
  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;

    var cache = new WeakMap();
    _getRequireWildcardCache = function () { return cache; };
    return cache;
  }

  export default function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }

    if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
      return { default: obj }
    }

    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }

    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor
          ? Object.getOwnPropertyDescriptor(obj, key)
          : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
`,s.newArrowCheck=a("7.0.0-beta.0")`
  export default function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }
`,s.objectDestructuringEmpty=a("7.0.0-beta.0")`
  export default function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  }
`,s.objectWithoutPropertiesLoose=a("7.0.0-beta.0")`
  export default function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};

    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
`,s.objectWithoutProperties=a("7.0.0-beta.0")`
  import objectWithoutPropertiesLoose from "objectWithoutPropertiesLoose";

  export default function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }
`,s.assertThisInitialized=a("7.0.0-beta.0")`
  export default function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
`,s.possibleConstructorReturn=a("7.0.0-beta.0")`
  import assertThisInitialized from "assertThisInitialized";

  export default function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }
    return assertThisInitialized(self);
  }
`,s.createSuper=a("7.9.0")`
  import getPrototypeOf from "getPrototypeOf";
  import isNativeReflectConstruct from "isNativeReflectConstruct";
  import possibleConstructorReturn from "possibleConstructorReturn";

  export default function _createSuper(Derived) {
    var hasNativeReflectConstruct = isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = getPrototypeOf(Derived), result;
      if (hasNativeReflectConstruct) {
        // NOTE: This doesn't work if this.__proto__.constructor has been modified.
        var NewTarget = getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return possibleConstructorReturn(this, result);
    }
  }
 `,s.superPropBase=a("7.0.0-beta.0")`
  import getPrototypeOf from "getPrototypeOf";

  export default function _superPropBase(object, property) {
    // Yes, this throws if object is null to being with, that's on purpose.
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
`,s.get=a("7.0.0-beta.0")`
  import superPropBase from "superPropBase";

  export default function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);

        if (!base) return;

        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }
    return _get(target, property, receiver || target);
  }
`,s.set=a("7.0.0-beta.0")`
  import superPropBase from "superPropBase";
  import defineProperty from "defineProperty";

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = superPropBase(target, property);
        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            // Both getter and non-writable fall into this.
            return false;
          }
        }

        // Without a super that defines the property, spec boils down to
        // "define on receiver" for some reason.
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
          if (!desc.writable) {
            // Setter, getter, and non-writable fall into this.
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          // Avoid setters that may be defined on Sub's prototype, but not on
          // the instance.
          defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  export default function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }
`,s.taggedTemplateLiteral=a("7.0.0-beta.0")`
  export default function _taggedTemplateLiteral(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    return Object.freeze(Object.defineProperties(strings, {
        raw: { value: Object.freeze(raw) }
    }));
  }
`,s.taggedTemplateLiteralLoose=a("7.0.0-beta.0")`
  export default function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    strings.raw = raw;
    return strings;
  }
`,s.readOnlyError=a("7.0.0-beta.0")`
  export default function _readOnlyError(name) {
    throw new Error("\\"" + name + "\\" is read-only");
  }
`,s.classNameTDZError=a("7.0.0-beta.0")`
  export default function _classNameTDZError(name) {
    throw new Error("Class \\"" + name + "\\" cannot be referenced in computed property keys.");
  }
`,s.temporalUndefined=a("7.0.0-beta.0")`
  // This function isn't mean to be called, but to be used as a reference.
  // We can't use a normal object because it isn't hoisted.
  export default function _temporalUndefined() {}
`,s.tdz=a("7.5.5")`
  export default function _tdzError(name) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  }
`,s.temporalRef=a("7.0.0-beta.0")`
  import undef from "temporalUndefined";
  import err from "tdz";

  export default function _temporalRef(val, name) {
    return val === undef ? err(name) : val;
  }
`,s.slicedToArray=a("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimit from "iterableToArrayLimit";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArray(arr, i) {
    return (
      arrayWithHoles(arr) ||
      iterableToArrayLimit(arr, i) ||
      unsupportedIterableToArray(arr, i) ||
      nonIterableRest()
    );
  }
`,s.slicedToArrayLoose=a("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimitLoose from "iterableToArrayLimitLoose";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArrayLoose(arr, i) {
    return (
      arrayWithHoles(arr) ||
      iterableToArrayLimitLoose(arr, i) ||
      unsupportedIterableToArray(arr, i) ||
      nonIterableRest()
    );
  }
`,s.toArray=a("7.0.0-beta.0")`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArray from "iterableToArray";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _toArray(arr) {
    return (
      arrayWithHoles(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableRest()
    );
  }
`,s.toConsumableArray=a("7.0.0-beta.0")`
  import arrayWithoutHoles from "arrayWithoutHoles";
  import iterableToArray from "iterableToArray";
  import unsupportedIterableToArray from "unsupportedIterableToArray";
  import nonIterableSpread from "nonIterableSpread";

  export default function _toConsumableArray(arr) {
    return (
      arrayWithoutHoles(arr) ||
      iterableToArray(arr) ||
      unsupportedIterableToArray(arr) ||
      nonIterableSpread()
    );
  }
`,s.arrayWithoutHoles=a("7.0.0-beta.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return arrayLikeToArray(arr);
  }
`,s.arrayWithHoles=a("7.0.0-beta.0")`
  export default function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
`,s.maybeArrayLike=a("7.9.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _maybeArrayLike(next, arr, i) {
    if (arr && !Array.isArray(arr) && typeof arr.length === "number") {
      var len = arr.length;
      return arrayLikeToArray(arr, i !== void 0 && i < len ? i : len);
    }
    return next(arr, i);
  }
`,s.iterableToArray=a("7.0.0-beta.0")`
  export default function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }
`,s.iterableToArrayLimit=a("7.0.0-beta.0")`
  export default function _iterableToArrayLimit(arr, i) {
    // this is an expanded form of \`for...of\` that properly supports abrupt completions of
    // iterators etc. variable names have been minimised to reduce the size of this massive
    // helper. sometimes spec compliance is annoying :(
    //
    // _n = _iteratorNormalCompletion
    // _d = _didIteratorError
    // _e = _iteratorError
    // _i = _iterator
    // _s = _step

    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
`,s.iterableToArrayLimitLoose=a("7.0.0-beta.0")`
  export default function _iterableToArrayLimitLoose(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;

    var _arr = [];
    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);
      if (i && _arr.length === i) break;
    }
    return _arr;
  }
`,s.unsupportedIterableToArray=a("7.9.0")`
  import arrayLikeToArray from "arrayLikeToArray";

  export default function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return arrayLikeToArray(o, minLen);
  }
`,s.arrayLikeToArray=a("7.9.0")`
  export default function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
`,s.nonIterableSpread=a("7.0.0-beta.0")`
  export default function _nonIterableSpread() {
    throw new TypeError(
      "Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
`,s.nonIterableRest=a("7.0.0-beta.0")`
  export default function _nonIterableRest() {
    throw new TypeError(
      "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
`,s.createForOfIteratorHelper=a("7.9.0")`
  import unsupportedIterableToArray from "unsupportedIterableToArray";

  // s: start (create the iterator)
  // n: next
  // e: error (called whenever something throws)
  // f: finish (always called at the end)

  export default function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      // Fallback for engines without symbol support
      if (
        Array.isArray(o) ||
        (it = unsupportedIterableToArray(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it;
        var i = 0;
        var F = function(){};
        return {
          s: F,
          n: function() {
            if (i >= o.length) return { done: true };
            return { done: false, value: o[i++] };
          },
          e: function(e) { throw e; },
          f: F,
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true, didErr = false, err;

    return {
      s: function() {
        it = o[Symbol.iterator]();
      },
      n: function() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function(e) {
        didErr = true;
        err = e;
      },
      f: function() {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
`,s.createForOfIteratorHelperLoose=a("7.9.0")`
  import unsupportedIterableToArray from "unsupportedIterableToArray";

  export default function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      // Fallback for engines without symbol support
      if (
        Array.isArray(o) ||
        (it = unsupportedIterableToArray(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it;
        var i = 0;
        return function() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        }
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    it = o[Symbol.iterator]();
    return it.next.bind(it);
  }
`,s.skipFirstGeneratorNext=a("7.0.0-beta.0")`
  export default function _skipFirstGeneratorNext(fn) {
    return function () {
      var it = fn.apply(this, arguments);
      it.next();
      return it;
    }
  }
`,s.toPrimitive=a("7.1.5")`
  export default function _toPrimitive(
    input,
    hint /*: "default" | "string" | "number" | void */
  ) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
`,s.toPropertyKey=a("7.1.5")`
  import toPrimitive from "toPrimitive";

  export default function _toPropertyKey(arg) {
    var key = toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
`,s.initializerWarningHelper=a("7.0.0-beta.0")`
    export default function _initializerWarningHelper(descriptor, context){
        throw new Error(
          'Decorating class property failed. Please ensure that ' +
          'proposal-class-properties is enabled and runs after the decorators transform.'
        );
    }
`,s.initializerDefineProperty=a("7.0.0-beta.0")`
    export default function _initializerDefineProperty(target, property, descriptor, context){
        if (!descriptor) return;

        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0,
        });
    }
`,s.applyDecoratedDescriptor=a("7.0.0-beta.0")`
    export default function _applyDecoratedDescriptor(target, property, decorators, descriptor, context){
        var desc = {};
        Object.keys(descriptor).forEach(function(key){
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ('value' in desc || desc.initializer){
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function(desc, decorator){
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0){
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0){
            // This is a hack to avoid this being processed by 'transform-runtime'.
            // See issue #9.
            Object.defineProperty(target, property, desc);
            desc = null;
        }

        return desc;
    }
`,s.classPrivateFieldLooseKey=a("7.0.0-beta.0")`
  var id = 0;
  export default function _classPrivateFieldKey(name) {
    return "__private_" + (id++) + "_" + name;
  }
`,s.classPrivateFieldLooseBase=a("7.0.0-beta.0")`
  export default function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
`,s.classPrivateFieldGet=a("7.0.0-beta.0")`
  export default function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = privateMap.get(receiver);
    if (!descriptor) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
`,s.classPrivateFieldSet=a("7.0.0-beta.0")`
  export default function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = privateMap.get(receiver);
    if (!descriptor) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }

    return value;
  }
`,s.classPrivateFieldDestructureSet=a("7.4.4")`
  export default function _classPrivateFieldDestructureSet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    var descriptor = privateMap.get(receiver);
    if (descriptor.set) {
      if (!("__destrObj" in descriptor)) {
        descriptor.__destrObj = {
          set value(v) {
            descriptor.set.call(receiver, v)
          },
        };
      }
      return descriptor.__destrObj;
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }

      return descriptor;
    }
  }
`,s.classStaticPrivateFieldSpecGet=a("7.0.2")`
  export default function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
`,s.classStaticPrivateFieldSpecSet=a("7.0.2")`
  export default function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        // This should only throw in strict mode, but class bodies are
        // always strict and private fields can only be used inside
        // class bodies.
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }

    return value;
  }
`,s.classStaticPrivateMethodGet=a("7.3.2")`
  export default function _classStaticPrivateMethodGet(receiver, classConstructor, method) {
    if (receiver !== classConstructor) {
      throw new TypeError("Private static access of wrong provenance");
    }
    return method;
  }
`,s.classStaticPrivateMethodSet=a("7.3.2")`
  export default function _classStaticPrivateMethodSet() {
    throw new TypeError("attempted to set read only static private field");
  }
`,s.decorate=a("7.1.5")`
  import toArray from "toArray";
  import toPropertyKey from "toPropertyKey";

  // These comments are stripped by @babel/template
  /*::
  type PropertyDescriptor =
    | {
        value: any,
        writable: boolean,
        configurable: boolean,
        enumerable: boolean,
      }
    | {
        get?: () => any,
        set?: (v: any) => void,
        configurable: boolean,
        enumerable: boolean,
      };

  type FieldDescriptor ={
    writable: boolean,
    configurable: boolean,
    enumerable: boolean,
  };

  type Placement = "static" | "prototype" | "own";
  type Key = string | symbol; // PrivateName is not supported yet.

  type ElementDescriptor =
    | {
        kind: "method",
        key: Key,
        placement: Placement,
        descriptor: PropertyDescriptor
      }
    | {
        kind: "field",
        key: Key,
        placement: Placement,
        descriptor: FieldDescriptor,
        initializer?: () => any,
      };

  // This is exposed to the user code
  type ElementObjectInput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
  };

  // This is exposed to the user code
  type ElementObjectOutput = ElementDescriptor & {
    [@@toStringTag]?: "Descriptor"
    extras?: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  // This is exposed to the user code
  type ClassObject = {
    [@@toStringTag]?: "Descriptor",
    kind: "class",
    elements: ElementDescriptor[],
  };

  type ElementDecorator = (descriptor: ElementObjectInput) => ?ElementObjectOutput;
  type ClassDecorator = (descriptor: ClassObject) => ?ClassObject;
  type ClassFinisher = <A, B>(cl: Class<A>) => Class<B>;

  // Only used by Babel in the transform output, not part of the spec.
  type ElementDefinition =
    | {
        kind: "method",
        value: any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
      }
    | {
        kind: "field",
        value: () => any,
        key: Key,
        static?: boolean,
        decorators?: ElementDecorator[],
    };

  declare function ClassFactory<C>(initialize: (instance: C) => void): {
    F: Class<C>,
    d: ElementDefinition[]
  }

  */

  /*::
  // Various combinations with/without extras and with one or many finishers

  type ElementFinisherExtras = {
    element: ElementDescriptor,
    finisher?: ClassFinisher,
    extras?: ElementDescriptor[],
  };

  type ElementFinishersExtras = {
    element: ElementDescriptor,
    finishers: ClassFinisher[],
    extras: ElementDescriptor[],
  };

  type ElementsFinisher = {
    elements: ElementDescriptor[],
    finisher?: ClassFinisher,
  };

  type ElementsFinishers = {
    elements: ElementDescriptor[],
    finishers: ClassFinisher[],
  };

  */

  /*::

  type Placements = {
    static: Key[],
    prototype: Key[],
    own: Key[],
  };

  */

  // ClassDefinitionEvaluation (Steps 26-*)
  export default function _decorate(
    decorators /*: ClassDecorator[] */,
    factory /*: ClassFactory */,
    superClass /*: ?Class<*> */,
    mixins /*: ?Array<Function> */,
  ) /*: Class<*> */ {
    var api = _getDecoratorsApi();
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        api = mixins[i](api);
      }
    }

    var r = factory(function initialize(O) {
      api.initializeInstanceElements(O, decorated.elements);
    }, superClass);
    var decorated = api.decorateClass(
      _coalesceClassElements(r.d.map(_createElementDescriptor)),
      decorators,
    );

    api.initializeClassElements(r.F, decorated.elements);

    return api.runClassFinishers(r.F, decorated.finishers);
  }

  function _getDecoratorsApi() {
    _getDecoratorsApi = function() {
      return api;
    };

    var api = {
      elementsDefinitionOrder: [["method"], ["field"]],

      // InitializeInstanceElements
      initializeInstanceElements: function(
        /*::<C>*/ O /*: C */,
        elements /*: ElementDescriptor[] */,
      ) {
        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            if (element.kind === kind && element.placement === "own") {
              this.defineClassElement(O, element);
            }
          }, this);
        }, this);
      },

      // InitializeClassElements
      initializeClassElements: function(
        /*::<C>*/ F /*: Class<C> */,
        elements /*: ElementDescriptor[] */,
      ) {
        var proto = F.prototype;

        ["method", "field"].forEach(function(kind) {
          elements.forEach(function(element /*: ElementDescriptor */) {
            var placement = element.placement;
            if (
              element.kind === kind &&
              (placement === "static" || placement === "prototype")
            ) {
              var receiver = placement === "static" ? F : proto;
              this.defineClassElement(receiver, element);
            }
          }, this);
        }, this);
      },

      // DefineClassElement
      defineClassElement: function(
        /*::<C>*/ receiver /*: C | Class<C> */,
        element /*: ElementDescriptor */,
      ) {
        var descriptor /*: PropertyDescriptor */ = element.descriptor;
        if (element.kind === "field") {
          var initializer = element.initializer;
          descriptor = {
            enumerable: descriptor.enumerable,
            writable: descriptor.writable,
            configurable: descriptor.configurable,
            value: initializer === void 0 ? void 0 : initializer.call(receiver),
          };
        }
        Object.defineProperty(receiver, element.key, descriptor);
      },

      // DecorateClass
      decorateClass: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var newElements /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];
        var placements /*: Placements */ = {
          static: [],
          prototype: [],
          own: [],
        };

        elements.forEach(function(element /*: ElementDescriptor */) {
          this.addElementPlacement(element, placements);
        }, this);

        elements.forEach(function(element /*: ElementDescriptor */) {
          if (!_hasDecorators(element)) return newElements.push(element);

          var elementFinishersExtras /*: ElementFinishersExtras */ = this.decorateElement(
            element,
            placements,
          );
          newElements.push(elementFinishersExtras.element);
          newElements.push.apply(newElements, elementFinishersExtras.extras);
          finishers.push.apply(finishers, elementFinishersExtras.finishers);
        }, this);

        if (!decorators) {
          return { elements: newElements, finishers: finishers };
        }

        var result /*: ElementsFinishers */ = this.decorateConstructor(
          newElements,
          decorators,
        );
        finishers.push.apply(finishers, result.finishers);
        result.finishers = finishers;

        return result;
      },

      // AddElementPlacement
      addElementPlacement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
        silent /*: boolean */,
      ) {
        var keys = placements[element.placement];
        if (!silent && keys.indexOf(element.key) !== -1) {
          throw new TypeError("Duplicated element (" + element.key + ")");
        }
        keys.push(element.key);
      },

      // DecorateElement
      decorateElement: function(
        element /*: ElementDescriptor */,
        placements /*: Placements */,
      ) /*: ElementFinishersExtras */ {
        var extras /*: ElementDescriptor[] */ = [];
        var finishers /*: ClassFinisher[] */ = [];

        for (
          var decorators = element.decorators, i = decorators.length - 1;
          i >= 0;
          i--
        ) {
          // (inlined) RemoveElementPlacement
          var keys = placements[element.placement];
          keys.splice(keys.indexOf(element.key), 1);

          var elementObject /*: ElementObjectInput */ = this.fromElementDescriptor(
            element,
          );
          var elementFinisherExtras /*: ElementFinisherExtras */ = this.toElementFinisherExtras(
            (0, decorators[i])(elementObject) /*: ElementObjectOutput */ ||
              elementObject,
          );

          element = elementFinisherExtras.element;
          this.addElementPlacement(element, placements);

          if (elementFinisherExtras.finisher) {
            finishers.push(elementFinisherExtras.finisher);
          }

          var newExtras /*: ElementDescriptor[] | void */ =
            elementFinisherExtras.extras;
          if (newExtras) {
            for (var j = 0; j < newExtras.length; j++) {
              this.addElementPlacement(newExtras[j], placements);
            }
            extras.push.apply(extras, newExtras);
          }
        }

        return { element: element, finishers: finishers, extras: extras };
      },

      // DecorateConstructor
      decorateConstructor: function(
        elements /*: ElementDescriptor[] */,
        decorators /*: ClassDecorator[] */,
      ) /*: ElementsFinishers */ {
        var finishers /*: ClassFinisher[] */ = [];

        for (var i = decorators.length - 1; i >= 0; i--) {
          var obj /*: ClassObject */ = this.fromClassDescriptor(elements);
          var elementsAndFinisher /*: ElementsFinisher */ = this.toClassDescriptor(
            (0, decorators[i])(obj) /*: ClassObject */ || obj,
          );

          if (elementsAndFinisher.finisher !== undefined) {
            finishers.push(elementsAndFinisher.finisher);
          }

          if (elementsAndFinisher.elements !== undefined) {
            elements = elementsAndFinisher.elements;

            for (var j = 0; j < elements.length - 1; j++) {
              for (var k = j + 1; k < elements.length; k++) {
                if (
                  elements[j].key === elements[k].key &&
                  elements[j].placement === elements[k].placement
                ) {
                  throw new TypeError(
                    "Duplicated element (" + elements[j].key + ")",
                  );
                }
              }
            }
          }
        }

        return { elements: elements, finishers: finishers };
      },

      // FromElementDescriptor
      fromElementDescriptor: function(
        element /*: ElementDescriptor */,
      ) /*: ElementObject */ {
        var obj /*: ElementObject */ = {
          kind: element.kind,
          key: element.key,
          placement: element.placement,
          descriptor: element.descriptor,
        };

        var desc = {
          value: "Descriptor",
          configurable: true,
        };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        if (element.kind === "field") obj.initializer = element.initializer;

        return obj;
      },

      // ToElementDescriptors
      toElementDescriptors: function(
        elementObjects /*: ElementObject[] */,
      ) /*: ElementDescriptor[] */ {
        if (elementObjects === undefined) return;
        return toArray(elementObjects).map(function(elementObject) {
          var element = this.toElementDescriptor(elementObject);
          this.disallowProperty(elementObject, "finisher", "An element descriptor");
          this.disallowProperty(elementObject, "extras", "An element descriptor");
          return element;
        }, this);
      },

      // ToElementDescriptor
      toElementDescriptor: function(
        elementObject /*: ElementObject */,
      ) /*: ElementDescriptor */ {
        var kind = String(elementObject.kind);
        if (kind !== "method" && kind !== "field") {
          throw new TypeError(
            'An element descriptor\\'s .kind property must be either "method" or' +
              ' "field", but a decorator created an element descriptor with' +
              ' .kind "' +
              kind +
              '"',
          );
        }

        var key = toPropertyKey(elementObject.key);

        var placement = String(elementObject.placement);
        if (
          placement !== "static" &&
          placement !== "prototype" &&
          placement !== "own"
        ) {
          throw new TypeError(
            'An element descriptor\\'s .placement property must be one of "static",' +
              ' "prototype" or "own", but a decorator created an element descriptor' +
              ' with .placement "' +
              placement +
              '"',
          );
        }

        var descriptor /*: PropertyDescriptor */ = elementObject.descriptor;

        this.disallowProperty(elementObject, "elements", "An element descriptor");

        var element /*: ElementDescriptor */ = {
          kind: kind,
          key: key,
          placement: placement,
          descriptor: Object.assign({}, descriptor),
        };

        if (kind !== "field") {
          this.disallowProperty(elementObject, "initializer", "A method descriptor");
        } else {
          this.disallowProperty(
            descriptor,
            "get",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "set",
            "The property descriptor of a field descriptor",
          );
          this.disallowProperty(
            descriptor,
            "value",
            "The property descriptor of a field descriptor",
          );

          element.initializer = elementObject.initializer;
        }

        return element;
      },

      toElementFinisherExtras: function(
        elementObject /*: ElementObject */,
      ) /*: ElementFinisherExtras */ {
        var element /*: ElementDescriptor */ = this.toElementDescriptor(
          elementObject,
        );
        var finisher /*: ClassFinisher */ = _optionalCallableProperty(
          elementObject,
          "finisher",
        );
        var extras /*: ElementDescriptors[] */ = this.toElementDescriptors(
          elementObject.extras,
        );

        return { element: element, finisher: finisher, extras: extras };
      },

      // FromClassDescriptor
      fromClassDescriptor: function(
        elements /*: ElementDescriptor[] */,
      ) /*: ClassObject */ {
        var obj = {
          kind: "class",
          elements: elements.map(this.fromElementDescriptor, this),
        };

        var desc = { value: "Descriptor", configurable: true };
        Object.defineProperty(obj, Symbol.toStringTag, desc);

        return obj;
      },

      // ToClassDescriptor
      toClassDescriptor: function(
        obj /*: ClassObject */,
      ) /*: ElementsFinisher */ {
        var kind = String(obj.kind);
        if (kind !== "class") {
          throw new TypeError(
            'A class descriptor\\'s .kind property must be "class", but a decorator' +
              ' created a class descriptor with .kind "' +
              kind +
              '"',
          );
        }

        this.disallowProperty(obj, "key", "A class descriptor");
        this.disallowProperty(obj, "placement", "A class descriptor");
        this.disallowProperty(obj, "descriptor", "A class descriptor");
        this.disallowProperty(obj, "initializer", "A class descriptor");
        this.disallowProperty(obj, "extras", "A class descriptor");

        var finisher = _optionalCallableProperty(obj, "finisher");
        var elements = this.toElementDescriptors(obj.elements);

        return { elements: elements, finisher: finisher };
      },

      // RunClassFinishers
      runClassFinishers: function(
        constructor /*: Class<*> */,
        finishers /*: ClassFinisher[] */,
      ) /*: Class<*> */ {
        for (var i = 0; i < finishers.length; i++) {
          var newConstructor /*: ?Class<*> */ = (0, finishers[i])(constructor);
          if (newConstructor !== undefined) {
            // NOTE: This should check if IsConstructor(newConstructor) is false.
            if (typeof newConstructor !== "function") {
              throw new TypeError("Finishers must return a constructor.");
            }
            constructor = newConstructor;
          }
        }
        return constructor;
      },

      disallowProperty: function(obj, name, objectType) {
        if (obj[name] !== undefined) {
          throw new TypeError(objectType + " can't have a ." + name + " property.");
        }
      }
    };

    return api;
  }

  // ClassElementEvaluation
  function _createElementDescriptor(
    def /*: ElementDefinition */,
  ) /*: ElementDescriptor */ {
    var key = toPropertyKey(def.key);

    var descriptor /*: PropertyDescriptor */;
    if (def.kind === "method") {
      descriptor = {
        value: def.value,
        writable: true,
        configurable: true,
        enumerable: false,
      };
    } else if (def.kind === "get") {
      descriptor = { get: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "set") {
      descriptor = { set: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "field") {
      descriptor = { configurable: true, writable: true, enumerable: true };
    }

    var element /*: ElementDescriptor */ = {
      kind: def.kind === "field" ? "field" : "method",
      key: key,
      placement: def.static
        ? "static"
        : def.kind === "field"
        ? "own"
        : "prototype",
      descriptor: descriptor,
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;

    return element;
  }

  // CoalesceGetterSetter
  function _coalesceGetterSetter(
    element /*: ElementDescriptor */,
    other /*: ElementDescriptor */,
  ) {
    if (element.descriptor.get !== undefined) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }

  // CoalesceClassElements
  function _coalesceClassElements(
    elements /*: ElementDescriptor[] */,
  ) /*: ElementDescriptor[] */ {
    var newElements /*: ElementDescriptor[] */ = [];

    var isSameElement = function(
      other /*: ElementDescriptor */,
    ) /*: boolean */ {
      return (
        other.kind === "method" &&
        other.key === element.key &&
        other.placement === element.placement
      );
    };

    for (var i = 0; i < elements.length; i++) {
      var element /*: ElementDescriptor */ = elements[i];
      var other /*: ElementDescriptor */;

      if (
        element.kind === "method" &&
        (other = newElements.find(isSameElement))
      ) {
        if (
          _isDataDescriptor(element.descriptor) ||
          _isDataDescriptor(other.descriptor)
        ) {
          if (_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError(
              "Duplicated methods (" + element.key + ") can't be decorated.",
            );
          }
          other.descriptor = element.descriptor;
        } else {
          if (_hasDecorators(element)) {
            if (_hasDecorators(other)) {
              throw new ReferenceError(
                "Decorators can't be placed on different accessors with for " +
                  "the same property (" +
                  element.key +
                  ").",
              );
            }
            other.decorators = element.decorators;
          }
          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }

    return newElements;
  }

  function _hasDecorators(element /*: ElementDescriptor */) /*: boolean */ {
    return element.decorators && element.decorators.length;
  }

  function _isDataDescriptor(desc /*: PropertyDescriptor */) /*: boolean */ {
    return (
      desc !== undefined &&
      !(desc.value === undefined && desc.writable === undefined)
    );
  }

  function _optionalCallableProperty /*::<T>*/(
    obj /*: T */,
    name /*: $Keys<T> */,
  ) /*: ?Function */ {
    var value = obj[name];
    if (value !== undefined && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }
    return value;
  }

`,s.classPrivateMethodGet=a("7.1.6")`
  export default function _classPrivateMethodGet(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return fn;
  }
`,s.classPrivateMethodSet=a("7.1.6")`
  export default function _classPrivateMethodSet() {
    throw new TypeError("attempted to reassign private method");
  }
`,s.wrapRegExp=a("7.2.6")`
  import wrapNativeSuper from "wrapNativeSuper";
  import getPrototypeOf from "getPrototypeOf";
  import possibleConstructorReturn from "possibleConstructorReturn";
  import inherits from "inherits";

  export default function _wrapRegExp(re, groups) {
    _wrapRegExp = function(re, groups) {
      return new BabelRegExp(re, undefined, groups);
    };

    var _RegExp = wrapNativeSuper(RegExp);
    var _super = RegExp.prototype;
    var _groups = new WeakMap();

    function BabelRegExp(re, flags, groups) {
      var _this = _RegExp.call(this, re, flags);
      // if the regex is recreated with 'g' flag
      _groups.set(_this, groups || _groups.get(re));
      return _this;
    }
    inherits(BabelRegExp, _RegExp);

    BabelRegExp.prototype.exec = function(str) {
      var result = _super.exec.call(this, str);
      if (result) result.groups = buildGroups(result, this);
      return result;
    };
    BabelRegExp.prototype[Symbol.replace] = function(str, substitution) {
      if (typeof substitution === "string") {
        var groups = _groups.get(this);
        return _super[Symbol.replace].call(
          this,
          str,
          substitution.replace(/\\$<([^>]+)>/g, function(_, name) {
            return "$" + groups[name];
          })
        );
      } else if (typeof substitution === "function") {
        var _this = this;
        return _super[Symbol.replace].call(
          this,
          str,
          function() {
            var args = [];
            args.push.apply(args, arguments);
            if (typeof args[args.length - 1] !== "object") {
              // Modern engines already pass result.groups as the last arg.
              args.push(buildGroups(args, _this));
            }
            return substitution.apply(this, args);
          }
        );
      } else {
        return _super[Symbol.replace].call(this, str, substitution);
      }
    }

    function buildGroups(result, re) {
      // NOTE: This function should return undefined if there are no groups,
      // but in that case Babel doesn't add the wrapper anyway.

      var g = _groups.get(re);
      return Object.keys(g).reduce(function(groups, name) {
        groups[name] = result[g[name]];
        return groups;
      }, Object.create(null));
    }

    return _wrapRegExp.apply(this, arguments);
  }
`},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.rewriteModuleStatementsAndPrepareHeader=function(e,{exportName:t,strict:n,allowTopLevelThis:p,strictMode:f,loose:h,noInterop:d,lazy:g,esNamespaceOnly:T}){(0,r.default)((0,a.isModule)(e),"Cannot process module statements in a script"),e.node.sourceType="script";const E=(0,u.default)(e,t,{noInterop:d,loose:h,lazy:g,esNamespaceOnly:T});p||(0,l.default)(e);if((0,c.default)(e,E),!1!==f){e.node.directives.some(e=>"use strict"===e.value.value)||e.unshiftContainer("directives",i.directive(i.directiveLiteral("use strict")))}const b=[];(0,u.hasExports)(E)&&!n&&b.push(function(e,t=!1){return(t?s.default.statement`
        EXPORTS.__esModule = true;
      `:s.default.statement`
        Object.defineProperty(EXPORTS, "__esModule", {
          value: true,
        });
      `)({EXPORTS:e.exportName})}(E,h));const v=function(e,t){const n=Object.create(null);for(const i of t.local.values())for(const e of i.names)n[e]=!0;let r=!1;for(const i of t.source.values()){for(const e of i.reexports.keys())n[e]=!0;for(const e of i.reexportNamespace)n[e]=!0;r=r||i.reexportAll}if(!r||0===Object.keys(n).length)return null;const s=e.scope.generateUidIdentifier("exportNames");return delete n.default,{name:s.name,statement:i.variableDeclaration("var",[i.variableDeclarator(s,i.valueToNode(n))])}}(e,E);v&&(E.exportNameListName=v.name,b.push(v.statement));return b.push(...function(e,t,n=!1){const r=[],s=[];for(const[o,a]of t.local)"import"===a.kind||("hoisted"===a.kind?r.push(y(t,a.names,i.identifier(o))):s.push(...a.names));for(const i of t.source.values()){n||r.push(...m(t,i,n));for(const e of i.reexportNamespace)s.push(e)}return r.push(...(0,o.default)(s,100).map(n=>y(t,n,e.scope.buildUndefinedNode()))),r}(e,E,h)),{meta:E,headers:b}},t.ensureStatementsHoisted=function(e){e.forEach(e=>{e._blockHoist=3})},t.wrapInterop=function(e,t,n){if("none"===n)return null;let r;if("default"===n)r="interopRequireDefault";else{if("namespace"!==n)throw new Error("Unknown interop: "+n);r="interopRequireWildcard"}return i.callExpression(e.hub.addHelper(r),[t])},t.buildNamespaceInitStatements=function(e,t,n=!1){const r=[];let o=i.identifier(t.name);t.lazy&&(o=i.callExpression(o,[]));for(const a of t.importsNamespace)a!==t.name&&r.push(s.default.statement`var NAME = SOURCE;`({NAME:a,SOURCE:i.cloneNode(o)}));n&&r.push(...m(e,t,n));for(const a of t.reexportNamespace)r.push((t.lazy?s.default.statement`
            Object.defineProperty(EXPORTS, "NAME", {
              enumerable: true,
              get: function() {
                return NAMESPACE;
              }
            });
          `:s.default.statement`EXPORTS.NAME = NAMESPACE;`)({EXPORTS:e.exportName,NAME:a,NAMESPACE:i.cloneNode(o)}));if(t.reexportAll){const a=function(e,t,n){return(n?s.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;

          EXPORTS[key] = NAMESPACE[key];
        });
      `:s.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;

          Object.defineProperty(EXPORTS, key, {
            enumerable: true,
            get: function() {
              return NAMESPACE[key];
            },
          });
        });
    `)({NAMESPACE:t,EXPORTS:e.exportName,VERIFY_NAME_LIST:e.exportNameListName?s.default`
            if (Object.prototype.hasOwnProperty.call(EXPORTS_LIST, key)) return;
          `({EXPORTS_LIST:e.exportNameListName}):null})}(e,i.cloneNode(o),n);a.loc=t.reexportAll.loc,r.push(a)}return r},Object.defineProperty(t,"isModule",{enumerable:!0,get:function(){return a.isModule}}),Object.defineProperty(t,"rewriteThis",{enumerable:!0,get:function(){return l.default}}),Object.defineProperty(t,"hasExports",{enumerable:!0,get:function(){return u.hasExports}}),Object.defineProperty(t,"isSideEffectImport",{enumerable:!0,get:function(){return u.isSideEffectImport}}),Object.defineProperty(t,"getModuleName",{enumerable:!0,get:function(){return p.default}});var r=d(n(75)),i=h(n(1)),s=d(n(40)),o=d(n(534)),a=n(539),l=d(n(542)),c=d(n(546)),u=h(n(548)),p=d(n(549));function f(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return f=function(){return e},e}function h(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=f();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=r?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(n,i,s):n[i]=e[i]}return n.default=e,t&&t.set(e,n),n}function d(e){return e&&e.__esModule?e:{default:e}}const m=(e,t,n)=>{const r=t.lazy?i.callExpression(i.identifier(t.name),[]):i.identifier(t.name),o=(e=>e?s.default.statement`EXPORTS.EXPORT_NAME = NAMESPACE.IMPORT_NAME;`:s.default`
      Object.defineProperty(EXPORTS, "EXPORT_NAME", {
        enumerable: true,
        get: function() {
          return NAMESPACE.IMPORT_NAME;
        },
      });
    `)(n);return Array.from(t.reexports,([t,n])=>o({EXPORTS:e.exportName,EXPORT_NAME:t,NAMESPACE:i.cloneNode(r),IMPORT_NAME:n}))};function y(e,t,n){return i.expressionStatement(t.reduce((t,n)=>s.default.expression`EXPORTS.NAME = VALUE`({EXPORTS:e.exportName,NAME:n,VALUE:t}),n))}},function(e,t,n){(function(e){var r=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),n={},r=0;r<t.length;r++)n[t[r]]=Object.getOwnPropertyDescriptor(e,t[r]);return n},i=/%[sdj%]/g;t.format=function(e){if(!g(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(a(arguments[n]));return t.join(" ")}n=1;for(var r=arguments,s=r.length,o=String(e).replace(i,(function(e){if("%%"===e)return"%";if(n>=s)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(t){return"[Circular]"}default:return e}})),l=r[n];n<s;l=r[++n])m(l)||!b(l)?o+=" "+l:o+=" "+a(l);return o},t.deprecate=function(n,r){if(void 0!==e&&!0===e.noDeprecation)return n;if(void 0===e)return function(){return t.deprecate(n,r).apply(this,arguments)};var i=!1;return function(){if(!i){if(e.throwDeprecation)throw new Error(r);e.traceDeprecation?console.trace(r):console.error(r),i=!0}return n.apply(this,arguments)}};var s,o={};function a(e,n){var r={seen:[],stylize:c};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),d(n)?r.showHidden=n:n&&t._extend(r,n),T(r.showHidden)&&(r.showHidden=!1),T(r.depth)&&(r.depth=2),T(r.colors)&&(r.colors=!1),T(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=l),u(r,e,r.depth)}function l(e,t){var n=a.styles[t];return n?"["+a.colors[n][0]+"m"+e+"["+a.colors[n][1]+"m":e}function c(e,t){return e}function u(e,n,r){if(e.customInspect&&n&&A(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var i=n.inspect(r,e);return g(i)||(i=u(e,i,r)),i}var s=function(e,t){if(T(t))return e.stylize("undefined","undefined");if(g(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}if(y(t))return e.stylize(""+t,"number");if(d(t))return e.stylize(""+t,"boolean");if(m(t))return e.stylize("null","null")}(e,n);if(s)return s;var o=Object.keys(n),a=function(e){var t={};return e.forEach((function(e,n){t[e]=!0})),t}(o);if(e.showHidden&&(o=Object.getOwnPropertyNames(n)),S(n)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return p(n);if(0===o.length){if(A(n)){var l=n.name?": "+n.name:"";return e.stylize("[Function"+l+"]","special")}if(E(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(v(n))return e.stylize(Date.prototype.toString.call(n),"date");if(S(n))return p(n)}var c,b="",x=!1,_=["{","}"];(h(n)&&(x=!0,_=["[","]"]),A(n))&&(b=" [Function"+(n.name?": "+n.name:"")+"]");return E(n)&&(b=" "+RegExp.prototype.toString.call(n)),v(n)&&(b=" "+Date.prototype.toUTCString.call(n)),S(n)&&(b=" "+p(n)),0!==o.length||x&&0!=n.length?r<0?E(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special"):(e.seen.push(n),c=x?function(e,t,n,r,i){for(var s=[],o=0,a=t.length;o<a;++o)w(t,String(o))?s.push(f(e,t,n,r,String(o),!0)):s.push("");return i.forEach((function(i){i.match(/^\d+$/)||s.push(f(e,t,n,r,i,!0))})),s}(e,n,r,a,o):o.map((function(t){return f(e,n,r,a,t,x)})),e.seen.pop(),function(e,t,n){if(e.reduce((function(e,t){return t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1}),0)>60)return n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1];return n[0]+t+" "+e.join(", ")+" "+n[1]}(c,b,_)):_[0]+b+_[1]}function p(e){return"["+Error.prototype.toString.call(e)+"]"}function f(e,t,n,r,i,s){var o,a,l;if((l=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]}).get?a=l.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):l.set&&(a=e.stylize("[Setter]","special")),w(r,i)||(o="["+i+"]"),a||(e.seen.indexOf(l.value)<0?(a=m(n)?u(e,l.value,null):u(e,l.value,n-1)).indexOf("\n")>-1&&(a=s?a.split("\n").map((function(e){return"  "+e})).join("\n").substr(2):"\n"+a.split("\n").map((function(e){return"   "+e})).join("\n")):a=e.stylize("[Circular]","special")),T(o)){if(s&&i.match(/^\d+$/))return a;(o=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(o=o.substr(1,o.length-2),o=e.stylize(o,"name")):(o=o.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),o=e.stylize(o,"string"))}return o+": "+a}function h(e){return Array.isArray(e)}function d(e){return"boolean"==typeof e}function m(e){return null===e}function y(e){return"number"==typeof e}function g(e){return"string"==typeof e}function T(e){return void 0===e}function E(e){return b(e)&&"[object RegExp]"===x(e)}function b(e){return"object"==typeof e&&null!==e}function v(e){return b(e)&&"[object Date]"===x(e)}function S(e){return b(e)&&("[object Error]"===x(e)||e instanceof Error)}function A(e){return"function"==typeof e}function x(e){return Object.prototype.toString.call(e)}function _(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(n){if(T(s)&&(s={}.NODE_DEBUG||""),n=n.toUpperCase(),!o[n])if(new RegExp("\\b"+n+"\\b","i").test(s)){var r=e.pid;o[n]=function(){var e=t.format.apply(t,arguments);console.error("%s %d: %s",n,r,e)}}else o[n]=function(){};return o[n]},t.inspect=a,a.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},a.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=h,t.isBoolean=d,t.isNull=m,t.isNullOrUndefined=function(e){return null==e},t.isNumber=y,t.isString=g,t.isSymbol=function(e){return"symbol"==typeof e},t.isUndefined=T,t.isRegExp=E,t.isObject=b,t.isDate=v,t.isError=S,t.isFunction=A,t.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},t.isBuffer=n(532);var P=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function O(){var e=new Date,t=[_(e.getHours()),_(e.getMinutes()),_(e.getSeconds())].join(":");return[e.getDate(),P[e.getMonth()],t].join(" ")}function w(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){console.log("%s - %s",O(),t.format.apply(t,arguments))},t.inherits=n(533),t._extend=function(e,t){if(!t||!b(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e};var C="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function N(e,t){if(!e){var n=new Error("Promise was rejected with a falsy value");n.reason=e,e=n}return t(e)}t.promisify=function(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');if(C&&e[C]){var t;if("function"!=typeof(t=e[C]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,C,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var t,n,r=new Promise((function(e,r){t=e,n=r})),i=[],s=0;s<arguments.length;s++)i.push(arguments[s]);i.push((function(e,r){e?n(e):t(r)}));try{e.apply(this,i)}catch(o){n(o)}return r}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),C&&Object.defineProperty(t,C,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,r(e))},t.promisify.custom=C,t.callbackify=function(t){if("function"!=typeof t)throw new TypeError('The "original" argument must be of type Function');function n(){for(var n=[],r=0;r<arguments.length;r++)n.push(arguments[r]);var i=n.pop();if("function"!=typeof i)throw new TypeError("The last argument must be of type Function");var s=this,o=function(){return i.apply(s,arguments)};t.apply(this,n).then((function(t){e.nextTick(o,null,t)}),(function(t){e.nextTick(N,t,o)}))}return Object.setPrototypeOf(n,Object.getPrototypeOf(t)),Object.defineProperties(n,r(t)),n}}).call(this,n(22))},function(e,t){e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},function(e,t){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},function(e,t,n){var r=n(535),i=n(118),s=n(536),o=Math.ceil,a=Math.max;e.exports=function(e,t,n){t=(n?i(e,t,n):void 0===t)?1:a(s(t),0);var l=null==e?0:e.length;if(!l||t<1)return[];for(var c=0,u=0,p=Array(o(l/t));c<l;)p[u++]=r(e,c,c+=t);return p}},function(e,t){e.exports=function(e,t,n){var r=-1,i=e.length;t<0&&(t=-t>i?0:i+t),(n=n>i?i:n)<0&&(n+=i),i=t>n?0:n-t>>>0,t>>>=0;for(var s=Array(i);++r<i;)s[r]=e[r+t];return s}},function(e,t,n){var r=n(537);e.exports=function(e){var t=r(e),n=t%1;return t==t?n?t-n:t:0}},function(e,t,n){var r=n(538);e.exports=function(e){return e?(e=r(e))===1/0||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},function(e,t,n){var r=n(25),i=n(54),s=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,l=/^0o[0-7]+$/i,c=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(i(e))return NaN;if(r(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=r(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(s,"");var n=a.test(e);return n||l.test(e)?c(e.slice(2),n?2:8):o.test(e)?NaN:+e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.addDefault=function(e,t,n){return new r.default(e).addDefault(t,n)},t.addNamed=function(e,t,n,i){return new r.default(e).addNamed(t,n,i)},t.addNamespace=function(e,t,n){return new r.default(e).addNamespace(t,n)},t.addSideEffect=function(e,t,n){return new r.default(e).addSideEffect(t,n)},Object.defineProperty(t,"ImportInjector",{enumerable:!0,get:function(){return r.default}}),Object.defineProperty(t,"isModule",{enumerable:!0,get:function(){return i.default}});var r=s(n(540)),i=s(n(197));function s(e){return e&&e.__esModule?e:{default:e}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=l(n(75)),i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=r?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(n,i,s):n[i]=e[i]}n.default=e,t&&t.set(e,n);return n}(n(1)),s=l(n(541)),o=l(n(197));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function l(e){return e&&e.__esModule?e:{default:e}}t.default=class{constructor(e,t,n){this._defaultOpts={importedSource:null,importedType:"commonjs",importedInterop:"babel",importingInterop:"babel",ensureLiveReference:!1,ensureNoContext:!1};const r=e.find(e=>e.isProgram());this._programPath=r,this._programScope=r.scope,this._hub=r.hub,this._defaultOpts=this._applyDefaults(t,n,!0)}addDefault(e,t){return this.addNamed("default",e,t)}addNamed(e,t,n){return(0,r.default)("string"==typeof e),this._generateImport(this._applyDefaults(t,n),e)}addNamespace(e,t){return this._generateImport(this._applyDefaults(e,t),null)}addSideEffect(e,t){return this._generateImport(this._applyDefaults(e,t),!1)}_applyDefaults(e,t,n=!1){const i=[];"string"==typeof e?(i.push({importedSource:e}),i.push(t)):((0,r.default)(!t,"Unexpected secondary arguments."),i.push(e));const s=Object.assign({},this._defaultOpts);for(const r of i)r&&(Object.keys(s).forEach(e=>{void 0!==r[e]&&(s[e]=r[e])}),n||(void 0!==r.nameHint&&(s.nameHint=r.nameHint),void 0!==r.blockHoist&&(s.blockHoist=r.blockHoist)));return s}_generateImport(e,t){const n="default"===t,r=!!t&&!n,a=null===t,{importedSource:l,importedType:c,importedInterop:u,importingInterop:p,ensureLiveReference:f,ensureNoContext:h,nameHint:d,blockHoist:m}=e;let y=d||t;const g=(0,o.default)(this._programPath),T=g&&"node"===p,E=g&&"babel"===p,b=new s.default(l,this._programScope,this._hub);if("es6"===c){if(!T&&!E)throw new Error("Cannot import an ES6 module from CommonJS");b.import(),a?b.namespace(d||l):(n||r)&&b.named(y,t)}else{if("commonjs"!==c)throw new Error(`Unexpected interopType "${c}"`);if("babel"===u)if(T){y="default"!==y?y:l;const e=l+"$es6Default";b.import(),a?b.default(e).var(y||l).wildcardInterop():n?f?b.default(e).var(y||l).defaultInterop().read("default"):b.default(e).var(y).defaultInterop().prop(t):r&&b.default(e).read(t)}else E?(b.import(),a?b.namespace(y||l):(n||r)&&b.named(y,t)):(b.require(),a?b.var(y||l).wildcardInterop():(n||r)&&f?n?(y="default"!==y?y:l,b.var(y).read(t),b.defaultInterop()):b.var(l).read(t):n?b.var(y).defaultInterop().prop(t):r&&b.var(y).prop(t));else if("compiled"===u)T?(b.import(),a?b.default(y||l):(n||r)&&b.default(l).read(y)):E?(b.import(),a?b.namespace(y||l):(n||r)&&b.named(y,t)):(b.require(),a?b.var(y||l):(n||r)&&(f?b.var(l).read(y):b.prop(t).var(y)));else{if("uncompiled"!==u)throw new Error(`Unknown importedInterop "${u}".`);if(n&&f)throw new Error("No live reference for commonjs default");T?(b.import(),a?b.default(y||l):n?b.default(y):r&&b.default(l).read(y)):E?(b.import(),a?b.default(y||l):n?b.default(y):r&&b.named(y,t)):(b.require(),a?b.var(y||l):n?b.var(y):r&&(f?b.var(l).read(y):b.var(y).prop(t)))}}const{statements:v,resultName:S}=b.done();return this._insertStatements(v,m),(n||r)&&h&&"Identifier"!==S.type?i.sequenceExpression([i.numericLiteral(0),S]):S}_insertStatements(e,t=3){e.forEach(e=>{e._blockHoist=t});const n=this._programPath.get("body").find(e=>{const t=e.node._blockHoist;return Number.isFinite(t)&&t<4});n?n.insertBefore(e):this._programPath.unshiftContainer("body",e)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,i=(r=n(75))&&r.__esModule?r:{default:r},s=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=o();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=r?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(n,i,s):n[i]=e[i]}n.default=e,t&&t.set(e,n);return n}(n(1));function o(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return o=function(){return e},e}t.default=class{constructor(e,t,n){this._statements=[],this._resultName=null,this._scope=null,this._hub=null,this._scope=t,this._hub=n,this._importedSource=e}done(){return{statements:this._statements,resultName:this._resultName}}import(){return this._statements.push(s.importDeclaration([],s.stringLiteral(this._importedSource))),this}require(){return this._statements.push(s.expressionStatement(s.callExpression(s.identifier("require"),[s.stringLiteral(this._importedSource)]))),this}namespace(e="namespace"){e=this._scope.generateUidIdentifier(e);const t=this._statements[this._statements.length-1];return(0,i.default)("ImportDeclaration"===t.type),(0,i.default)(0===t.specifiers.length),t.specifiers=[s.importNamespaceSpecifier(e)],this._resultName=s.cloneNode(e),this}default(e){e=this._scope.generateUidIdentifier(e);const t=this._statements[this._statements.length-1];return(0,i.default)("ImportDeclaration"===t.type),(0,i.default)(0===t.specifiers.length),t.specifiers=[s.importDefaultSpecifier(e)],this._resultName=s.cloneNode(e),this}named(e,t){if("default"===t)return this.default(e);e=this._scope.generateUidIdentifier(e);const n=this._statements[this._statements.length-1];return(0,i.default)("ImportDeclaration"===n.type),(0,i.default)(0===n.specifiers.length),n.specifiers=[s.importSpecifier(e,s.identifier(t))],this._resultName=s.cloneNode(e),this}var(e){e=this._scope.generateUidIdentifier(e);let t=this._statements[this._statements.length-1];return"ExpressionStatement"!==t.type&&((0,i.default)(this._resultName),t=s.expressionStatement(this._resultName),this._statements.push(t)),this._statements[this._statements.length-1]=s.variableDeclaration("var",[s.variableDeclarator(e,t.expression)]),this._resultName=s.cloneNode(e),this}defaultInterop(){return this._interop(this._hub.addHelper("interopRequireDefault"))}wildcardInterop(){return this._interop(this._hub.addHelper("interopRequireWildcard"))}_interop(e){const t=this._statements[this._statements.length-1];return"ExpressionStatement"===t.type?t.expression=s.callExpression(e,[t.expression]):"VariableDeclaration"===t.type?((0,i.default)(1===t.declarations.length),t.declarations[0].init=s.callExpression(e,[t.declarations[0].init])):i.default.fail("Unexpected type."),this}prop(e){const t=this._statements[this._statements.length-1];return"ExpressionStatement"===t.type?t.expression=s.memberExpression(t.expression,s.identifier(e)):"VariableDeclaration"===t.type?((0,i.default)(1===t.declarations.length),t.declarations[0].init=s.memberExpression(t.declarations[0].init,s.identifier(e))):i.default.fail("Unexpected type:"+t.type),this}read(e){this._resultName=s.memberExpression(this._resultName,s.identifier(e))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){e.traverse(i)};var r=n(543);const i={ThisExpression(e){e.replaceWith(e.scope.buildUndefinedNode())},Function(e){e.isMethod()?(0,r.skipAllButComputedKey)(e):e.isArrowFunctionExpression()||e.skip()},ClassProperty(e){(0,r.skipAllButComputedKey)(e)},ClassPrivateProperty(e){e.skip()}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.skipAllButComputedKey=u,t.default=t.environmentVisitor=void 0;var r=l(n(12)),i=l(n(544)),s=l(n(545)),o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=r?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(n,i,s):n[i]=e[i]}n.default=e,t&&t.set(e,n);return n}(n(1));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function l(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,r){e=o.cloneNode(e);const i=t||r?e:o.memberExpression(e,o.identifier("prototype"));return o.callExpression(n.addHelper("getPrototypeOf"),[i])}function u(e){if(!e.node.computed)return void e.skip();const t=o.VISITOR_KEYS[e.type];for(const n of t)"key"!==n&&e.skipKey(n)}const p={TypeAnnotation(e){e.skip()},Function(e){e.isMethod()||e.isArrowFunctionExpression()||e.skip()},"Method|ClassProperty|ClassPrivateProperty"(e){u(e)}};t.environmentVisitor=p;const f=r.default.visitors.merge([p,{Super(e,t){const{node:n,parentPath:r}=e;r.isMemberExpression({object:n})&&t.handle(r)}}]),h={memoise(e,t){const{scope:n,node:r}=e,{computed:i,property:s}=r;if(!i)return;const o=n.maybeGenerateMemoised(s);o&&this.memoiser.set(s,o,t)},prop(e){const{computed:t,property:n}=e.node;return this.memoiser.has(n)?o.cloneNode(this.memoiser.get(n)):t?o.cloneNode(n):o.stringLiteral(n.name)},get(e){return this._get(e,this._getThisRefs())},_get(e,t){const n=c(this.getObjectRef(),this.isStatic,this.file,this.isPrivateMethod);return o.callExpression(this.file.addHelper("get"),[t.memo?o.sequenceExpression([t.memo,n]):n,this.prop(e),t.this])},_getThisRefs(){if(!this.isDerivedConstructor)return{this:o.thisExpression()};const e=this.scope.generateDeclaredUidIdentifier("thisSuper");return{memo:o.assignmentExpression("=",e,o.thisExpression()),this:o.cloneNode(e)}},set(e,t){const n=this._getThisRefs(),r=c(this.getObjectRef(),this.isStatic,this.file,this.isPrivateMethod);return o.callExpression(this.file.addHelper("set"),[n.memo?o.sequenceExpression([n.memo,r]):r,this.prop(e),t,n.this,o.booleanLiteral(e.isInStrictMode())])},destructureSet(e){throw e.buildCodeFrameError("Destructuring to a super field is not supported yet.")},call(e,t){const n=this._getThisRefs();return(0,s.default)(this._get(e,n),o.cloneNode(n.this),t,!1)}},d=Object.assign({},h,{prop(e){const{property:t}=e.node;return this.memoiser.has(t)?o.cloneNode(this.memoiser.get(t)):o.cloneNode(t)},get(e){const{isStatic:t,superRef:n}=this,{computed:r}=e.node,i=this.prop(e);let s;return s=t?n?o.cloneNode(n):o.memberExpression(o.identifier("Function"),o.identifier("prototype")):n?o.memberExpression(o.cloneNode(n),o.identifier("prototype")):o.memberExpression(o.identifier("Object"),o.identifier("prototype")),o.memberExpression(s,i,r)},set(e,t){const{computed:n}=e.node,r=this.prop(e);return o.assignmentExpression("=",o.memberExpression(o.thisExpression(),r,n),t)},destructureSet(e){const{computed:t}=e.node,n=this.prop(e);return o.memberExpression(o.thisExpression(),n,t)},call(e,t){return(0,s.default)(this.get(e),o.thisExpression(),t,!1)}});t.default=class{constructor(e){const t=e.methodPath;this.methodPath=t,this.isDerivedConstructor=t.isClassMethod({kind:"constructor"})&&!!e.superRef,this.isStatic=t.isObjectMethod()||t.node.static,this.isPrivateMethod=t.isPrivate()&&t.isMethod(),this.file=e.file,this.superRef=e.superRef,this.isLoose=e.isLoose,this.opts=e}getObjectRef(){return o.cloneNode(this.opts.objectRef||this.opts.getObjectRef())}replace(){const e=this.isLoose?d:h;(0,i.default)(this.methodPath,f,Object.assign({file:this.file,scope:this.methodPath.scope,isDerivedConstructor:this.isDerivedConstructor,isStatic:this.isStatic,isPrivateMethod:this.isPrivateMethod,getObjectRef:this.getObjectRef.bind(this),superRef:this.superRef},e))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){e.traverse(t,Object.assign({},a,n,{memoiser:new s}))};var r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var o=r?Object.getOwnPropertyDescriptor(e,s):null;o&&(o.get||o.set)?Object.defineProperty(n,s,o):n[s]=e[s]}n.default=e,t&&t.set(e,n);return n}(n(1));function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}class s{constructor(){this._map=new WeakMap}has(e){return this._map.has(e)}get(e){if(!this.has(e))return;const t=this._map.get(e),{value:n}=t;return t.count--,0===t.count?r.assignmentExpression("=",n,e):n}set(e,t,n){return this._map.set(e,{count:n,value:t})}}function o(e,t){const{node:n}=e;if(e.isOptionalMemberExpression())return r.memberExpression(t,n.property,n.computed);if(e.isOptionalCallExpression()){const i=e.get("callee");if(e.node.optional&&i.isOptionalMemberExpression()){const{object:s}=i.node,o=e.scope.maybeGenerateMemoised(s)||s;return i.get("object").replaceWith(r.assignmentExpression("=",o,s)),r.callExpression(r.memberExpression(t,r.identifier("call")),[o,...n.arguments])}return r.callExpression(t,n.arguments)}return e.node}const a={memoise(){},handle(e){const{node:t,parent:n,parentPath:i}=e;if(e.isOptionalMemberExpression()){if(function(e){for(;e&&!e.isProgram();){const{parentPath:t,container:n,listKey:r}=e,i=t.node;if(r){if(n!==i[r])return!0}else if(n!==i)return!0;e=t}return!1}(e))return;const s=e.find(({node:t,parent:n,parentPath:r})=>r.isOptionalMemberExpression()?n.optional||n.object!==t:!r.isOptionalCallExpression()||(t!==e.node&&n.optional||n.callee!==t)),a=s.parentPath;if(a.isUpdateExpression({argument:t})||a.isAssignmentExpression({left:t}))throw e.buildCodeFrameError("can't handle assignment");const l=a.isUnaryExpression({operator:"delete"});if(l&&s.isOptionalMemberExpression()&&s.get("property").isPrivateName())throw e.buildCodeFrameError("can't delete a private class element");let c=e;for(;;)if(c.isOptionalMemberExpression()){if(c.node.optional)break;c=c.get("object")}else{if(!c.isOptionalCallExpression())throw new Error("Internal error: unexpected "+c.node.type);if(c.node.optional)break;c=c.get("callee")}const{scope:u}=e,p=c.isOptionalMemberExpression()?"object":"callee",f=c.node[p],h=u.maybeGenerateMemoised(f),d=null!=h?h:f,m=i.isOptionalCallExpression({callee:t}),y=i.isCallExpression({callee:t});c.replaceWith(o(c,d)),m?n.optional?i.replaceWith(this.optionalCall(e,n.arguments)):i.replaceWith(this.call(e,n.arguments)):y?e.replaceWith(this.boundGet(e)):e.replaceWith(this.get(e));let g,T=e.node;for(let t=e;t!==s;){const{parentPath:e}=t;if(e===s&&m&&n.optional){T=e.node;break}T=o(e,T),t=e}const E=s.parentPath;if(r.isMemberExpression(T)&&E.isOptionalCallExpression({callee:s.node,optional:!0})){const{object:t}=T;g=e.scope.maybeGenerateMemoised(t),g&&(T.object=r.assignmentExpression("=",g,t))}let b=s;if(l&&(b=E,T=E.node),b.replaceWith(r.conditionalExpression(r.logicalExpression("||",r.binaryExpression("===",h?r.assignmentExpression("=",r.cloneNode(d),r.cloneNode(f)):r.cloneNode(d),r.nullLiteral()),r.binaryExpression("===",r.cloneNode(d),u.buildUndefinedNode())),l?r.booleanLiteral(!0):u.buildUndefinedNode(),T)),g){const e=E.node;E.replaceWith(r.optionalCallExpression(r.optionalMemberExpression(e.callee,r.identifier("call"),!1,!0),[r.cloneNode(g),...e.arguments],!1))}}else if(i.isUpdateExpression({argument:t})){if(this.simpleSet)return void e.replaceWith(this.simpleSet(e));const{operator:s,prefix:o}=n;this.memoise(e,2);const a=r.binaryExpression(s[0],r.unaryExpression("+",this.get(e)),r.numericLiteral(1));if(o)i.replaceWith(this.set(e,a));else{const{scope:n}=e,s=n.generateUidIdentifierBasedOnNode(t);n.push({id:s}),a.left=r.assignmentExpression("=",r.cloneNode(s),a.left),i.replaceWith(r.sequenceExpression([this.set(e,a),r.cloneNode(s)]))}}else if(i.isAssignmentExpression({left:t})){if(this.simpleSet)return void e.replaceWith(this.simpleSet(e));const{operator:t,right:s}=n;if("="===t)i.replaceWith(this.set(e,s));else{const n=t.slice(0,-1);r.LOGICAL_OPERATORS.includes(n)?(this.memoise(e,1),i.replaceWith(r.logicalExpression(n,this.get(e),this.set(e,s)))):(this.memoise(e,2),i.replaceWith(this.set(e,r.binaryExpression(n,this.get(e),s))))}}else i.isCallExpression({callee:t})?i.replaceWith(this.call(e,n.arguments)):i.isOptionalCallExpression({callee:t})?i.replaceWith(this.optionalCall(e,n.arguments)):i.isForXStatement({left:t})||i.isObjectProperty({value:t})&&i.parentPath.isObjectPattern()||i.isAssignmentPattern({left:t})&&i.parentPath.isObjectProperty({value:n})&&i.parentPath.parentPath.isObjectPattern()||i.isArrayPattern()||i.isAssignmentPattern({left:t})&&i.parentPath.isArrayPattern()||i.isRestElement()?e.replaceWith(this.destructureSet(e)):e.replaceWith(this.get(e))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n,i){return 1===n.length&&r.isSpreadElement(n[0])&&r.isIdentifier(n[0].argument,{name:"arguments"})?r.callExpression(r.memberExpression(e,r.identifier("apply")),[t,n[0].argument]):i?r.optionalCallExpression(r.optionalMemberExpression(e,r.identifier("call"),!1,!0),[t,...n],!1):r.callExpression(r.memberExpression(e,r.identifier("call")),[t,...n])};var r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var o=r?Object.getOwnPropertyDescriptor(e,s):null;o&&(o.get||o.set)?Object.defineProperty(n,s,o):n[s]=e[s]}n.default=e,t&&t.set(e,n);return n}(n(1));function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const n=new Map,r=new Map,s=t=>{e.requeue(t)};for(const[i,o]of t.source){for(const[e,t]of o.imports)n.set(e,[i,t,null]);for(const e of o.importsNamespace)n.set(e,[i,null,e])}for(const[i,o]of t.local){let e=r.get(i);e||(e=[],r.set(i,e)),e.push(...o.names)}e.traverse(c,{metadata:t,requeueInParent:s,scope:e.scope,exported:r}),(0,o.default)(e,new Set([...Array.from(n.keys()),...Array.from(r.keys())])),e.traverse(f,{seen:new WeakSet,metadata:t,requeueInParent:s,scope:e.scope,imported:n,exported:r,buildImportReference:([e,n,r],s)=>{const o=t.source.get(e);if(r)return o.lazy&&(s=i.callExpression(s,[])),s;let a=i.identifier(o.name);return o.lazy&&(a=i.callExpression(a,[])),i.memberExpression(a,i.identifier(n))}})};var r=l(n(75)),i=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=r?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(n,i,s):n[i]=e[i]}n.default=e,t&&t.set(e,n);return n}(n(1)),s=l(n(40)),o=l(n(547));function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function l(e){return e&&e.__esModule?e:{default:e}}const c={Scope(e){e.skip()},ClassDeclaration(e){const{requeueInParent:t,exported:n,metadata:r}=this,{id:s}=e.node;if(!s)throw new Error("Expected class to have a name");const o=s.name,a=n.get(o)||[];if(a.length>0){const n=i.expressionStatement(u(r,a,i.identifier(o)));n._blockHoist=e.node._blockHoist,t(e.insertAfter(n)[0])}},VariableDeclaration(e){const{requeueInParent:t,exported:n,metadata:r}=this;Object.keys(e.getOuterBindingIdentifiers()).forEach(s=>{const o=n.get(s)||[];if(o.length>0){const n=i.expressionStatement(u(r,o,i.identifier(s)));n._blockHoist=e.node._blockHoist,t(e.insertAfter(n)[0])}})}},u=(e,t,n)=>(t||[]).reduce((t,n)=>i.assignmentExpression("=",i.memberExpression(i.identifier(e.exportName),i.identifier(n)),t),n),p=e=>s.default.expression.ast`
    (function() {
      throw new Error('"' + '${e}' + '" is read-only.');
    })()
  `,f={ReferencedIdentifier(e){const{seen:t,buildImportReference:n,scope:r,imported:s,requeueInParent:o}=this;if(t.has(e.node))return;t.add(e.node);const a=e.node.name,l=e.scope.getBinding(a);if(r.getBinding(a)!==l)return;const c=s.get(a);if(c){const t=n(c,e.node);if(t.loc=e.node.loc,(e.parentPath.isCallExpression({callee:e.node})||e.parentPath.isOptionalCallExpression({callee:e.node})||e.parentPath.isTaggedTemplateExpression({tag:e.node}))&&i.isMemberExpression(t))e.replaceWith(i.sequenceExpression([i.numericLiteral(0),t]));else if(e.isJSXIdentifier()&&i.isMemberExpression(t)){const{object:n,property:r}=t;e.replaceWith(i.JSXMemberExpression(i.JSXIdentifier(n.name),i.JSXIdentifier(r.name)))}else e.replaceWith(t);o(e),e.skip()}},AssignmentExpression:{exit(e){const{scope:t,seen:n,imported:s,exported:o,requeueInParent:a,buildImportReference:l}=this;if(n.has(e.node))return;n.add(e.node);const c=e.get("left");if(!c.isMemberExpression())if(c.isIdentifier()){const n=c.node.name;if(t.getBinding(n)!==e.scope.getBinding(n))return;const f=o.get(n),h=s.get(n);if((null==f?void 0:f.length)>0||h){(0,r.default)("="===e.node.operator,"Path was not simplified");const t=e.node;h&&(t.left=l(h,t.left),t.right=i.sequenceExpression([t.right,p(n)])),e.replaceWith(u(this.metadata,f,t)),a(e)}}else{const n=c.getOuterBindingIdentifiers(),r=Object.keys(n).filter(n=>t.getBinding(n)===e.scope.getBinding(n)),l=r.find(e=>s.has(e));l&&(e.node.right=i.sequenceExpression([e.node.right,p(l)]));const f=[];if(r.forEach(e=>{const t=o.get(e)||[];t.length>0&&f.push(u(this.metadata,t,i.identifier(e)))}),f.length>0){let t=i.sequenceExpression(f);e.parentPath.isExpressionStatement()&&(t=i.expressionStatement(t),t._blockHoist=e.parentPath.node._blockHoist);a(e.insertAfter(t)[0])}}}},"ForOfStatement|ForInStatement"(e){const{scope:t,node:n}=e,{left:r}=n,{exported:s,scope:o}=this;if(!i.isVariableDeclaration(r)){let n=!1;const a=e.get("body"),l=a.scope;for(const e of Object.keys(i.getOuterBindingIdentifiers(r)))s.get(e)&&o.getBinding(e)===t.getBinding(e)&&(n=!0,l.hasOwnBinding(e)&&l.rename(e));if(!n)return;const c=t.generateUidIdentifierBasedOnNode(r);a.unshiftContainer("body",i.expressionStatement(i.assignmentExpression("=",r,c))),e.get("left").replaceWith(i.variableDeclaration("let",[i.variableDeclarator(i.cloneNode(c))])),t.registerDeclaration(e.get("left"))}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){e.traverse(s,{scope:e.scope,bindingNames:t,seen:new WeakSet})};var r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=i();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(Object.prototype.hasOwnProperty.call(e,s)){var o=r?Object.getOwnPropertyDescriptor(e,s):null;o&&(o.get||o.set)?Object.defineProperty(n,s,o):n[s]=e[s]}n.default=e,t&&t.set(e,n);return n}(n(1));function i(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return i=function(){return e},e}const s={UpdateExpression:{exit(e){const{scope:t,bindingNames:n}=this,i=e.get("argument");if(!i.isIdentifier())return;const s=i.node.name;if(n.has(s)&&t.getBinding(s)===e.scope.getBinding(s))if(e.parentPath.isExpressionStatement()&&!e.isCompletionRecord()){const t="++"==e.node.operator?"+=":"-=";e.replaceWith(r.assignmentExpression(t,i.node,r.numericLiteral(1)))}else if(e.node.prefix)e.replaceWith(r.assignmentExpression("=",r.identifier(s),r.binaryExpression(e.node.operator[0],r.unaryExpression("+",i.node),r.numericLiteral(1))));else{const t=e.scope.generateUidIdentifierBasedOnNode(i.node,"old"),n=t.name;e.scope.push({id:t});const s=r.binaryExpression(e.node.operator[0],r.identifier(n),r.numericLiteral(1));e.replaceWith(r.sequenceExpression([r.assignmentExpression("=",r.identifier(n),r.unaryExpression("+",i.node)),r.assignmentExpression("=",r.cloneNode(i.node),s),r.identifier(n)]))}}},AssignmentExpression:{exit(e){const{scope:t,seen:n,bindingNames:i}=this;if("="===e.node.operator)return;if(n.has(e.node))return;n.add(e.node);const s=e.get("left");if(!s.isIdentifier())return;const o=s.node.name;i.has(o)&&t.getBinding(o)===e.scope.getBinding(o)&&(e.node.right=r.binaryExpression(e.node.operator.slice(0,-1),r.cloneNode(e.node.left),e.node.right),e.node.operator="=")}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.hasExports=function(e){return e.hasExports},t.isSideEffectImport=o,t.default=function(e,t,{noInterop:n=!1,loose:r=!1,lazy:a=!1,esNamespaceOnly:l=!1}={}){t||(t=e.scope.generateUidIdentifier("exports").name);!function(e){e.get("body").forEach(e=>{e.isExportDefaultDeclaration()&&(0,s.default)(e)})}(e);const{local:c,source:u,hasExports:p}=function(e,{loose:t,lazy:n}){const r=function(e,t){const n=new Map;e.get("body").forEach(e=>{let r;if(e.isImportDeclaration())r="import";else{if(e.isExportDefaultDeclaration()&&(e=e.get("declaration")),e.isExportNamedDeclaration())if(e.node.declaration)e=e.get("declaration");else if(t&&e.node.source&&e.get("source").isStringLiteral())return void e.node.specifiers.forEach(e=>{n.set(e.local.name,"block")});if(e.isFunctionDeclaration())r="hoisted";else if(e.isClassDeclaration())r="block";else if(e.isVariableDeclaration({kind:"var"}))r="var";else{if(!e.isVariableDeclaration())return;r="block"}}Object.keys(e.getOuterBindingIdentifiers()).forEach(e=>{n.set(e,r)})});const r=new Map,i=e=>{const t=e.node.name;let i=r.get(t);if(!i){const s=n.get(t);if(void 0===s)throw e.buildCodeFrameError(`Exporting local "${t}", which is not declared.`);i={names:[],kind:s},r.set(t,i)}return i};return e.get("body").forEach(e=>{if(!e.isExportNamedDeclaration()||!t&&e.node.source){if(e.isExportDefaultDeclaration()){const t=e.get("declaration");if(!t.isFunctionDeclaration()&&!t.isClassDeclaration())throw t.buildCodeFrameError("Unexpected default expression export.");i(t.get("id")).names.push("default")}}else if(e.node.declaration){const t=e.get("declaration"),n=t.getOuterBindingIdentifierPaths();Object.keys(n).forEach(e=>{if("__esModule"===e)throw t.buildCodeFrameError('Illegal export "__esModule".');i(n[e]).names.push(e)})}else e.get("specifiers").forEach(e=>{const t=e.get("local"),n=e.get("exported");if("__esModule"===n.node.name)throw n.buildCodeFrameError('Illegal export "__esModule".');i(t).names.push(n.node.name)})}),r}(e,t),s=new Map,a=t=>{const n=t.value;let r=s.get(n);return r||(r={name:e.scope.generateUidIdentifier((0,i.basename)(n,(0,i.extname)(n))).name,interop:"none",loc:null,imports:new Map,importsNamespace:new Set,reexports:new Map,reexportNamespace:new Set,reexportAll:null,lazy:!1},s.set(n,r)),r};let l=!1;e.get("body").forEach(e=>{if(e.isImportDeclaration()){const t=a(e.node.source);t.loc||(t.loc=e.node.loc),e.get("specifiers").forEach(e=>{if(e.isImportDefaultSpecifier()){const n=e.get("local").node.name;t.imports.set(n,"default");const i=r.get(n);i&&(r.delete(n),i.names.forEach(e=>{t.reexports.set(e,"default")}))}else if(e.isImportNamespaceSpecifier()){const n=e.get("local").node.name;t.importsNamespace.add(n);const i=r.get(n);i&&(r.delete(n),i.names.forEach(e=>{t.reexportNamespace.add(e)}))}else if(e.isImportSpecifier()){const n=e.get("imported").node.name,i=e.get("local").node.name;t.imports.set(i,n);const s=r.get(i);s&&(r.delete(i),s.names.forEach(e=>{t.reexports.set(e,n)}))}})}else if(e.isExportAllDeclaration()){l=!0;const t=a(e.node.source);t.loc||(t.loc=e.node.loc),t.reexportAll={loc:e.node.loc}}else if(e.isExportNamedDeclaration()&&e.node.source){l=!0;const t=a(e.node.source);t.loc||(t.loc=e.node.loc),e.get("specifiers").forEach(e=>{if(!e.isExportSpecifier())throw e.buildCodeFrameError("Unexpected export specifier type");const n=e.get("local").node.name,r=e.get("exported").node.name;if(t.reexports.set(r,n),"__esModule"===r)throw r.buildCodeFrameError('Illegal export "__esModule".')})}else(e.isExportNamedDeclaration()||e.isExportDefaultDeclaration())&&(l=!0)});for(const i of s.values()){let e=!1,t=!1;i.importsNamespace.size>0&&(e=!0,t=!0),i.reexportAll&&(t=!0);for(const n of i.imports.values())"default"===n?e=!0:t=!0;for(const n of i.reexports.values())"default"===n?e=!0:t=!0;e&&t?i.interop="namespace":e&&(i.interop="default")}for(const[i,c]of s)if(!1!==n&&!o(c)&&!c.reexportAll)if(!0===n)c.lazy=!/\./.test(i);else if(Array.isArray(n))c.lazy=-1!==n.indexOf(i);else{if("function"!=typeof n)throw new Error(".lazy must be a boolean, string array, or function");c.lazy=n(i)}return{hasExports:l,local:r,source:s}}(e,{loose:r,lazy:a});!function(e){e.get("body").forEach(e=>{if(e.isImportDeclaration())e.remove();else if(e.isExportNamedDeclaration())e.node.declaration?(e.node.declaration._blockHoist=e.node._blockHoist,e.replaceWith(e.node.declaration)):e.remove();else if(e.isExportDefaultDeclaration()){const t=e.get("declaration");if(!t.isFunctionDeclaration()&&!t.isClassDeclaration())throw t.buildCodeFrameError("Unexpected default expression export.");t._blockHoist=e.node._blockHoist,e.replaceWith(t)}else e.isExportAllDeclaration()&&e.remove()})}(e);for(const[,i]of u)i.importsNamespace.size>0&&(i.name=i.importsNamespace.values().next().value),n?i.interop="none":l&&"namespace"===i.interop&&(i.interop="default");return{exportName:t,exportNameListName:null,hasExports:p,local:c,source:u}};var r,i=n(11),s=(r=n(185))&&r.__esModule?r:{default:r};function o(e){return 0===e.imports.size&&0===e.importsNamespace.size&&0===e.reexports.size&&0===e.reexportNamespace.size&&!e.reexportAll}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var n,r,i;const{filename:s,filenameRelative:o=s,sourceRoot:a=(null!=(n=t.moduleRoot)?n:e.moduleRoot)}=e,{moduleId:l=e.moduleId,moduleIds:c=(null!=(r=e.moduleIds)?r:!!l),getModuleId:u=e.getModuleId,moduleRoot:p=(null!=(i=e.moduleRoot)?i:a)}=t;if(!c)return null;if(null!=l&&!u)return l;let f=null!=p?p+"/":"";if(o){const e=null!=a?new RegExp("^"+a+"/?"):"";f+=o.replace(e,"").replace(/\.(\w*?)$/,"")}return f=f.replace(/\\/g,"/"),u&&u(f)||f}},function(e,t,n){"use strict";function r(){const e=u(n(149));return r=function(){return e},e}function i(){const e=l(n(119));return i=function(){return e},e}function s(){const e=l(n(40));return s=function(){return e},e}function o(){const e=u(n(1));return o=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t="global"){let n;const r={global:p,module:f,umd:h,var:d}[t];if(!r)throw new Error("Unsupported output type "+t);n=r(e);return(0,i().default)(n).code};var a=l(n(97));function l(e){return e&&e.__esModule?e:{default:e}}function c(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return c=function(){return e},e}function u(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=c();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=r?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(n,i,s):n[i]=e[i]}return n.default=e,t&&t.set(e,n),n}function p(e){const t=o().identifier("babelHelpers"),n=[],r=o().functionExpression(null,[o().identifier("global")],o().blockStatement(n)),i=o().program([o().expressionStatement(o().callExpression(r,[o().conditionalExpression(o().binaryExpression("===",o().unaryExpression("typeof",o().identifier("global")),o().stringLiteral("undefined")),o().identifier("self"),o().identifier("global"))]))]);return n.push(o().variableDeclaration("var",[o().variableDeclarator(t,o().assignmentExpression("=",o().memberExpression(o().identifier("global"),t),o().objectExpression([])))])),m(n,t,e),i}function f(e){const t=[],n=m(t,null,e);return t.unshift(o().exportNamedDeclaration(null,Object.keys(n).map(e=>o().exportSpecifier(o().cloneNode(n[e]),o().identifier(e))))),o().program(t,[],"module")}function h(e){const t=o().identifier("babelHelpers"),n=[];return n.push(o().variableDeclaration("var",[o().variableDeclarator(t,o().identifier("global"))])),m(n,t,e),o().program([(r={FACTORY_PARAMETERS:o().identifier("global"),BROWSER_ARGUMENTS:o().assignmentExpression("=",o().memberExpression(o().identifier("root"),t),o().objectExpression([])),COMMON_ARGUMENTS:o().identifier("exports"),AMD_ARGUMENTS:o().arrayExpression([o().stringLiteral("exports")]),FACTORY_BODY:n,UMD_ROOT:o().identifier("this")},s().default`
    (function (root, factory) {
      if (typeof define === "function" && define.amd) {
        define(AMD_ARGUMENTS, factory);
      } else if (typeof exports === "object") {
        factory(COMMON_ARGUMENTS);
      } else {
        factory(BROWSER_ARGUMENTS);
      }
    })(UMD_ROOT, function (FACTORY_PARAMETERS) {
      FACTORY_BODY
    });
  `(r))]);var r}function d(e){const t=o().identifier("babelHelpers"),n=[];n.push(o().variableDeclaration("var",[o().variableDeclarator(t,o().objectExpression([]))]));const r=o().program(n);return m(n,t,e),n.push(o().expressionStatement(t)),r}function m(e,t,n){const i=e=>t?o().memberExpression(t,o().identifier(e)):o().identifier("_"+e),s={};return r().list.forEach((function(t){if(n&&n.indexOf(t)<0)return;const o=s[t]=i(t);r().ensure(t,a.default);const{nodes:l}=r().get(t,i,o);e.push(...l)})),s}},function(e){e.exports=JSON.parse('{"_args":[["@babel/core@7.10.5","/home/runner/work/netlify-test/netlify-test"]],"_from":"@babel/core@7.10.5","_id":"@babel/core@7.10.5","_inBundle":false,"_integrity":"sha512-O34LQooYVDXPl7QWCdW9p4NR+QlzOr7xShPPJz8GsuCU3/8ua/wqTr7gmnxXv+WBESiGU/G5s16i6tUvHkNb+w==","_location":"/@babel/core","_phantomChildren":{},"_requested":{"type":"version","registry":true,"raw":"@babel/core@7.10.5","name":"@babel/core","escapedName":"@babel%2fcore","scope":"@babel","rawSpec":"7.10.5","saveSpec":null,"fetchSpec":"7.10.5"},"_requiredBy":["/@mdx-js/mdx","/gatsby","/gatsby-plugin-mdx","/gatsby-plugin-typescript","/gatsby-recipes","/gatsby-recipes/@mdx-js/mdx","/remark-mdx","/remark-mdxjs"],"_resolved":"https://registry.npmjs.org/@babel/core/-/core-7.10.5.tgz","_spec":"7.10.5","_where":"/home/runner/work/netlify-test/netlify-test","author":{"name":"Sebastian McKenzie","email":"sebmck@gmail.com"},"browser":{"./lib/config/files/index.js":"./lib/config/files/index-browser.js","./lib/transform-file.js":"./lib/transform-file-browser.js","./src/config/files/index.js":"./src/config/files/index-browser.js","./src/transform-file.js":"./src/transform-file-browser.js"},"bugs":{"url":"https://github.com/babel/babel/issues"},"dependencies":{"@babel/code-frame":"^7.10.4","@babel/generator":"^7.10.5","@babel/helper-module-transforms":"^7.10.5","@babel/helpers":"^7.10.4","@babel/parser":"^7.10.5","@babel/template":"^7.10.4","@babel/traverse":"^7.10.5","@babel/types":"^7.10.5","convert-source-map":"^1.7.0","debug":"^4.1.0","gensync":"^1.0.0-beta.1","json5":"^2.1.2","lodash":"^4.17.19","resolve":"^1.3.2","semver":"^5.4.1","source-map":"^0.5.0"},"description":"Babel compiler core.","devDependencies":{"@babel/helper-transform-fixture-test-runner":"^7.10.5"},"engines":{"node":">=6.9.0"},"funding":{"type":"opencollective","url":"https://opencollective.com/babel"},"gitHead":"f7964a9ac51356f7df6404a25b27ba1cffba1ba7","homepage":"https://babeljs.io/","keywords":["6to5","babel","classes","const","es6","harmony","let","modules","transpile","transpiler","var","babel-core","compiler"],"license":"MIT","main":"lib/index.js","name":"@babel/core","publishConfig":{"access":"public"},"repository":{"type":"git","url":"git+https://github.com/babel/babel.git","directory":"packages/babel-core"},"version":"7.10.5"}')},function(e,t,n){"use strict";function r(){const e=g(n(27));return r=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(201),s=n(121),o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=y();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=r?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(n,i,s):n[i]=e[i]}n.default=e,t&&t.set(e,n);return n}(n(23)),a=g(n(122)),l=n(77),c=n(202);function u(){const e=g(n(12));return u=function(){return e},e}var p=n(78),f=n(123),h=n(557),d=g(n(558)),m=g(n(206));function y(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return y=function(){return e},e}function g(e){return e&&e.__esModule?e:{default:e}}var T=(0,r().default)((function*(e){const t=yield*(0,m.default)(e);if(!t)return null;const{options:n,context:r}=t,i={},o=[[]];try{const{plugins:e,presets:t}=n;if(!e||!t)throw new Error("Assertion failure - plugins and presets exist");if(yield*function*e(t,n){const a=[];for(let i=0;i<t.plugins.length;i++){const e=t.plugins[i];if(!1!==e.options)try{a.push(yield*b(e,r))}catch(c){throw i>0&&"BABEL_UNKNOWN_PLUGIN_PROPERTY"===c.code&&(0,f.checkNoUnwrappedItemOptionPairs)(t.plugins[i-1],e,"plugin",i,c),c}}const l=[];for(let i=0;i<t.presets.length;i++){const e=t.presets[i];if(!1!==e.options)try{l.push({preset:yield*A(e,r),pass:e.ownPass?[]:n})}catch(c){throw i>0&&"BABEL_UNKNOWN_OPTION"===c.code&&(0,f.checkNoUnwrappedItemOptionPairs)(t.presets[i-1],e,"preset",i,c),c}}if(l.length>0){o.splice(1,0,...l.map(e=>e.pass).filter(e=>e!==n));for(const{preset:t,pass:n}of l){if(!t)return!0;if(yield*e({plugins:t.plugins,presets:t.presets},n))return!0;t.options.forEach(e=>{(0,s.mergeOptions)(i,e)})}}a.length>0&&n.unshift(...a)}({plugins:e.map(e=>{const t=(0,l.getItemDescriptor)(e);if(!t)throw new Error("Assertion failure - must be config item");return t}),presets:t.map(e=>{const t=(0,l.getItemDescriptor)(e);if(!t)throw new Error("Assertion failure - must be config item");return t})},o[0]))return null}catch(c){throw/^\[BABEL\]/.test(c.message)||(c.message=`[BABEL] ${r.filename||"unknown"}: ${c.message}`),c}const a=i;return(0,s.mergeOptions)(a,n),a.plugins=o[0],a.presets=o.slice(1).filter(e=>e.length>0).map(e=>({plugins:e})),a.passPerPreset=a.presets.length>0,{options:a,passes:o}}));t.default=T;const E=(0,p.makeWeakCache)((function*({value:e,options:t,dirname:n,alias:r},i){if(!1===t)throw new Error("Assertion failure");t=t||{};let s=e;if("function"==typeof e){const l=Object.assign({},o,(0,d.default)(i));try{s=e(l,t,n)}catch(a){throw r&&(a.message+=` (While processing: ${JSON.stringify(r)})`),a}}if(!s||"object"!=typeof s)throw new Error("Plugin/Preset did not return an object.");if("function"==typeof s.then)throw yield*[],new Error("You appear to be using an async plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.");return{value:s,options:t,dirname:n,alias:r}}));function*b(e,t){if(e.value instanceof a.default){if(e.options)throw new Error("Passed options to an existing Plugin instance will not work.");return e.value}return yield*v(yield*E(e,t),t)}const v=(0,p.makeWeakCache)((function*({value:e,options:t,dirname:n,alias:r},s){const o=(0,h.validatePluginObject)(e),l=Object.assign({},o);if(l.visitor&&(l.visitor=u().default.explode(Object.assign({},l.visitor))),l.inherits){const e={name:void 0,alias:r+"$inherits",value:l.inherits,options:t,dirname:n},o=yield*(0,i.forwardAsync)(b,t=>s.invalidate(n=>t(e,n)));l.pre=_(o.pre,l.pre),l.post=_(o.post,l.post),l.manipulateOptions=_(o.manipulateOptions,l.manipulateOptions),l.visitor=u().default.visitors.merge([o.visitor||{},l.visitor||{}])}return new a.default(l,t,r)})),S=(e,t)=>{if(e.test||e.include||e.exclude){const e=t.name?`"${t.name}"`:"/* your preset */";throw new Error([`Preset ${e} requires a filename to be set when babel is called directly,`,"```",`babel.transform(code, { filename: 'file.ts', presets: [${e}] });`,"```","See https://babeljs.io/docs/en/options#filename for more information."].join("\n"))}};function*A(e,t){const n=x(yield*E(e,t));return((e,t,n)=>{if(!t.filename){const{options:t}=e;S(t,n),t.overrides&&t.overrides.forEach(e=>S(e,n))}})(n,t,e),yield*(0,c.buildPresetChain)(n,t)}const x=(0,p.makeWeakCacheSync)(({value:e,dirname:t,alias:n})=>({options:(0,f.validate)("preset",e),alias:n,dirname:t}));function _(e,t){const n=[e,t].filter(Boolean);return n.length<=1?n[0]:function(...e){for(const t of n)t.apply(this,e)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default={auxiliaryComment:{message:"Use `auxiliaryCommentBefore` or `auxiliaryCommentAfter`"},blacklist:{message:"Put the specific transforms you want in the `plugins` option"},breakConfig:{message:"This is not a necessary option in Babel 6"},experimental:{message:"Put the specific transforms you want in the `plugins` option"},externalHelpers:{message:"Use the `external-helpers` plugin instead. Check out http://babeljs.io/docs/plugins/external-helpers/"},extra:{message:""},jsxPragma:{message:"use the `pragma` option in the `react-jsx` plugin. Check out http://babeljs.io/docs/plugins/transform-react-jsx/"},loose:{message:"Specify the `loose` option for the relevant plugin you are using or use a preset that sets the option."},metadataUsedHelpers:{message:"Not required anymore as this is enabled by default"},modules:{message:"Use the corresponding module transform plugin in the `plugins` option. Check out http://babeljs.io/docs/plugins/#modules"},nonStandard:{message:"Use the `react-jsx` and `flow-strip-types` plugins to support JSX and Flow. Also check out the react preset http://babeljs.io/docs/plugins/preset-react/"},optional:{message:"Put the specific transforms you want in the `plugins` option"},sourceMapName:{message:"The `sourceMapName` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."},stage:{message:"Check out the corresponding stage-x presets http://babeljs.io/docs/plugins/#presets"},whitelist:{message:"Put the specific transforms you want in the `plugins` option"},resolveModuleSource:{version:6,message:"Use `babel-plugin-module-resolver@3`'s 'resolvePath' options"},metadata:{version:6,message:"Generated plugin metadata is always included in the output result"},sourceMapTarget:{version:6,message:"The `sourceMapTarget` option has been removed because it makes more sense for the tooling that calls Babel to assign `map.file` themselves."}}},function(e,t,n){"use strict";function r(){const e=s(n(11));return r=function(){return e},e}function i(){const e=s(n(555));return i=function(){return e},e}function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const n=r().default.resolve(t,e).split(r().default.sep);return new RegExp(["^",...n.map((e,t)=>{const r=t===n.length-1;return"**"===e?r?f:p:"*"===e?r?u:c:0===e.indexOf("*.")?l+(0,i().default)(e.slice(1))+(r?a:o):(0,i().default)(e)+(r?a:o)})].join(""))};const o="\\"+r().default.sep,a=`(?:${o}|$)`,l=`[^${o}]+`,c=`(?:${l}${o})`,u=`(?:${l}${a})`,p=c+"*?",f=`${c}*?${u}?`},function(e,t,n){var r=n(204),i=/[\\^$.*+?()[\]{}|]/g,s=RegExp(i.source);e.exports=function(e){return(e=r(e))&&s.test(e)?e.replace(i,"\\$&"):e}},function(e,t,n){var r=n(39),i=n(205),s=n(14),o=n(54),a=r?r.prototype:void 0,l=a?a.toString:void 0;e.exports=function e(t){if("string"==typeof t)return t;if(s(t))return i(t,e)+"";if(o(t))return l?l.call(t):"";var n=t+"";return"0"==n&&1/t==-1/0?"-0":n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.validatePluginObject=function(e){const t={type:"root",source:"plugin"};return Object.keys(e).forEach(n=>{const r=i[n];if(!r){const e=new Error(`.${n} is not a valid Plugin property`);throw e.code="BABEL_UNKNOWN_PLUGIN_PROPERTY",e}r({type:"option",name:n,parent:t},e[n])}),e};var r=n(203);const i={name:r.assertString,manipulateOptions:r.assertFunction,pre:r.assertFunction,post:r.assertFunction,inherits:r.assertFunction,visitor:function(e,t){const n=(0,r.assertObject)(e,t);if(n&&(Object.keys(n).forEach(e=>function(e,t){if(t&&"object"==typeof t)Object.keys(t).forEach(t=>{if("enter"!==t&&"exit"!==t)throw new Error(`.visitor["${e}"] may only have .enter and/or .exit handlers.`)});else if("function"!=typeof t)throw new Error(`.visitor["${e}"] must be a function`);return t}(e,n[e])),n.enter||n.exit))throw new Error((0,r.msg)(e)+' cannot contain catch-all "enter" or "exit" handlers. Please target individual nodes.');return n},parserOverride:r.assertFunction,generatorOverride:r.assertFunction}},function(e,t,n){"use strict";function r(){const e=(t=n(198))&&t.__esModule?t:{default:t};var t;return r=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return{version:i.version,cache:e.simple(),env:t=>e.using(e=>void 0===t?e.envName:"function"==typeof t?(0,s.assertSimpleType)(t(e.envName)):(Array.isArray(t)||(t=[t]),t.some(t=>{if("string"!=typeof t)throw new Error("Unexpected non-string value");return t===e.envName}))),async:()=>!1,caller:t=>e.using(e=>(0,s.assertSimpleType)(t(e.caller))),assertVersion:o}};var i=n(23),s=n(78);function o(e){if("number"==typeof e){if(!Number.isInteger(e))throw new Error("Expected string or integer value.");e=`^${e}.0.0-0`}if("string"!=typeof e)throw new Error("Expected string or integer value.");if(r().default.satisfies(i.version,e))return;const t=Error.stackTraceLimit;"number"==typeof t&&t<25&&(Error.stackTraceLimit=25);const n=new Error(`Requires Babel "${e}", but was loaded with "${i.version}". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn't mention "@babel/core" or "babel-core" to see what is calling Babel.`);throw"number"==typeof t&&(Error.stackTraceLimit=t),Object.assign(n,{code:"BABEL_VERSION_UNSUPPORTED",version:i.version,range:e})}},function(e,t,n){"use strict";function r(){const e=o(n(27));return r=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.transformAsync=t.transformSync=t.transform=void 0;var i=o(n(55)),s=n(207);function o(e){return e&&e.__esModule?e:{default:e}}const a=(0,r().default)((function*(e,t){const n=yield*(0,i.default)(t);return null===n?null:yield*(0,s.run)(n,e)}));t.transform=function(e,t,n){if("function"==typeof t&&(n=t,t=void 0),void 0===n)return a.sync(e,t);a.errback(e,t,n)};const l=a.sync;t.transformSync=l;const c=a.async;t.transformAsync=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=class{constructor(e,t,n){this._map=new Map,this.key=t,this.file=e,this.opts=n||{},this.cwd=e.opts.cwd,this.filename=e.opts.filename}set(e,t){this._map.set(e,t)}get(e){return this._map.get(e)}availableHelper(e,t){return this.file.availableHelper(e,t)}addHelper(e){return this.file.addHelper(e)}addImport(){return this.file.addImport()}getModuleName(){return this.file.getModuleName()}buildCodeFrameError(e,t,n){return this.file.buildCodeFrameError(e,t,n)}}},function(e,t,n){"use strict";function r(){const e=s(n(562));return r=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){if(!o){const e=i.default.sync({babelrc:!1,configFile:!1,plugins:[a]});if(o=e?e.passes[0][0]:void 0,!o)throw new Error("Assertion failure")}return o};var i=s(n(55));function s(e){return e&&e.__esModule?e:{default:e}}let o;const a={name:"internal.blockHoist",visitor:{Block:{exit({node:e}){let t=!1;for(let n=0;n<e.body.length;n++){const r=e.body[n];if(null!=(null==r?void 0:r._blockHoist)){t=!0;break}}t&&(e.body=(0,r().default)(e.body,(function(e){let t=null==e?void 0:e._blockHoist;return null==t&&(t=1),!0===t&&(t=2),-1*t})))}}}}},function(e,t,n){var r=n(563),i=n(565),s=n(186),o=n(118),a=s((function(e,t){if(null==e)return[];var n=t.length;return n>1&&o(e,t[0],t[1])?t=[]:n>2&&o(t[0],t[1],t[2])&&(t=[t[0]]),i(e,r(t,1),[])}));e.exports=a},function(e,t,n){var r=n(109),i=n(564);e.exports=function e(t,n,s,o,a){var l=-1,c=t.length;for(s||(s=i),a||(a=[]);++l<c;){var u=t[l];n>0&&s(u)?n>1?e(u,n-1,s,o,a):r(a,u):o||(a[a.length]=u)}return a}},function(e,t,n){var r=n(39),i=n(102),s=n(14),o=r?r.isConcatSpreadable:void 0;e.exports=function(e){return s(e)||i(e)||!!(o&&e&&e[o])}},function(e,t,n){var r=n(205),i=n(566),s=n(591),o=n(597),a=n(50),l=n(598),c=n(71);e.exports=function(e,t,n){var u=-1;t=r(t.length?t:[c],a(i));var p=s(e,(function(e,n,i){return{criteria:r(t,(function(t){return t(e)})),index:++u,value:e}}));return o(p,(function(e,t){return l(e,t,n)}))}},function(e,t,n){var r=n(567),i=n(580),s=n(71),o=n(14),a=n(588);e.exports=function(e){return"function"==typeof e?e:null==e?s:"object"==typeof e?o(e)?i(e[0],e[1]):r(e):a(e)}},function(e,t,n){var r=n(568),i=n(579),s=n(211);e.exports=function(e){var t=i(e);return 1==t.length&&t[0][2]?s(t[0][0],t[0][1]):function(n){return n===e||r(n,e,t)}}},function(e,t,n){var r=n(99),i=n(208);e.exports=function(e,t,n,s){var o=n.length,a=o,l=!s;if(null==e)return!a;for(e=Object(e);o--;){var c=n[o];if(l&&c[2]?c[1]!==e[c[0]]:!(c[0]in e))return!1}for(;++o<a;){var u=(c=n[o])[0],p=e[u],f=c[1];if(l&&c[2]){if(void 0===p&&!(u in e))return!1}else{var h=new r;if(s)var d=s(p,f,u,e,t,h);if(!(void 0===d?i(f,p,3,s,h):d))return!1}}return!0}},function(e,t,n){var r=n(99),i=n(209),s=n(575),o=n(578),a=n(68),l=n(14),c=n(103),u=n(161),p="[object Object]",f=Object.prototype.hasOwnProperty;e.exports=function(e,t,n,h,d,m){var y=l(e),g=l(t),T=y?"[object Array]":a(e),E=g?"[object Array]":a(t),b=(T="[object Arguments]"==T?p:T)==p,v=(E="[object Arguments]"==E?p:E)==p,S=T==E;if(S&&c(e)){if(!c(t))return!1;y=!0,b=!1}if(S&&!b)return m||(m=new r),y||u(e)?i(e,t,n,h,d,m):s(e,t,T,n,h,d,m);if(!(1&n)){var A=b&&f.call(e,"__wrapped__"),x=v&&f.call(t,"__wrapped__");if(A||x){var _=A?e.value():e,P=x?t.value():t;return m||(m=new r),d(_,P,n,h,m)}}return!!S&&(m||(m=new r),o(e,t,n,h,d,m))}},function(e,t,n){var r=n(101),i=n(571),s=n(572);function o(e){var t=-1,n=null==e?0:e.length;for(this.__data__=new r;++t<n;)this.add(e[t])}o.prototype.add=o.prototype.push=i,o.prototype.has=s,e.exports=o},function(e,t){e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},function(e,t){e.exports=function(e){return this.__data__.has(e)}},function(e,t){e.exports=function(e,t){for(var n=-1,r=null==e?0:e.length;++n<r;)if(t(e[n],n,e))return!0;return!1}},function(e,t){e.exports=function(e,t){return e.has(t)}},function(e,t,n){var r=n(39),i=n(167),s=n(48),o=n(209),a=n(576),l=n(577),c=r?r.prototype:void 0,u=c?c.valueOf:void 0;e.exports=function(e,t,n,r,c,p,f){switch(n){case"[object DataView]":if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case"[object ArrayBuffer]":return!(e.byteLength!=t.byteLength||!p(new i(e),new i(t)));case"[object Boolean]":case"[object Date]":case"[object Number]":return s(+e,+t);case"[object Error]":return e.name==t.name&&e.message==t.message;case"[object RegExp]":case"[object String]":return e==t+"";case"[object Map]":var h=a;case"[object Set]":var d=1&r;if(h||(h=l),e.size!=t.size&&!d)return!1;var m=f.get(e);if(m)return m==t;r|=2,f.set(e,t);var y=o(h(e),h(t),r,c,p,f);return f.delete(e),y;case"[object Symbol]":if(u)return u.call(e)==u.call(t)}return!1}},function(e,t){e.exports=function(e){var t=-1,n=Array(e.size);return e.forEach((function(e,r){n[++t]=[r,e]})),n}},function(e,t){e.exports=function(e){var t=-1,n=Array(e.size);return e.forEach((function(e){n[++t]=e})),n}},function(e,t,n){var r=n(165),i=Object.prototype.hasOwnProperty;e.exports=function(e,t,n,s,o,a){var l=1&n,c=r(e),u=c.length;if(u!=r(t).length&&!l)return!1;for(var p=u;p--;){var f=c[p];if(!(l?f in t:i.call(t,f)))return!1}var h=a.get(e);if(h&&a.get(t))return h==t;var d=!0;a.set(e,t),a.set(t,e);for(var m=l;++p<u;){var y=e[f=c[p]],g=t[f];if(s)var T=l?s(g,y,f,t,e,a):s(y,g,f,e,t,a);if(!(void 0===T?y===g||o(y,g,n,s,a):T)){d=!1;break}m||(m="constructor"==f)}if(d&&!m){var E=e.constructor,b=t.constructor;E==b||!("constructor"in e)||!("constructor"in t)||"function"==typeof E&&E instanceof E&&"function"==typeof b&&b instanceof b||(d=!1)}return a.delete(e),a.delete(t),d}},function(e,t,n){var r=n(210),i=n(49);e.exports=function(e){for(var t=i(e),n=t.length;n--;){var s=t[n],o=e[s];t[n]=[s,o,r(o)]}return t}},function(e,t,n){var r=n(208),i=n(581),s=n(585),o=n(124),a=n(210),l=n(211),c=n(79);e.exports=function(e,t){return o(e)&&a(t)?l(c(e),t):function(n){var o=i(n,e);return void 0===o&&o===t?s(n,e):r(t,o,3)}}},function(e,t,n){var r=n(212);e.exports=function(e,t,n){var i=null==e?void 0:r(e,t);return void 0===i?n:i}},function(e,t,n){var r=n(583),i=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,s=/\\(\\)?/g,o=r((function(e){var t=[];return 46===e.charCodeAt(0)&&t.push(""),e.replace(i,(function(e,n,r,i){t.push(r?i.replace(s,"$1"):n||e)})),t}));e.exports=o},function(e,t,n){var r=n(584);e.exports=function(e){var t=r(e,(function(e){return 500===n.size&&n.clear(),e})),n=t.cache;return t}},function(e,t,n){var r=n(101);function i(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError("Expected a function");var n=function(){var r=arguments,i=t?t.apply(this,r):r[0],s=n.cache;if(s.has(i))return s.get(i);var o=e.apply(this,r);return n.cache=s.set(i,o)||s,o};return n.cache=new(i.Cache||r),n}i.Cache=r,e.exports=i},function(e,t,n){var r=n(586),i=n(587);e.exports=function(e,t){return null!=e&&i(e,t,r)}},function(e,t){e.exports=function(e,t){return null!=e&&t in Object(e)}},function(e,t,n){var r=n(213),i=n(102),s=n(14),o=n(104),a=n(105),l=n(79);e.exports=function(e,t,n){for(var c=-1,u=(t=r(t,e)).length,p=!1;++c<u;){var f=l(t[c]);if(!(p=null!=e&&n(e,f)))break;e=e[f]}return p||++c!=u?p:!!(u=null==e?0:e.length)&&a(u)&&o(f,u)&&(s(e)||i(e))}},function(e,t,n){var r=n(589),i=n(590),s=n(124),o=n(79);e.exports=function(e){return s(e)?r(o(e)):i(e)}},function(e,t){e.exports=function(e){return function(t){return null==t?void 0:t[e]}}},function(e,t,n){var r=n(212);e.exports=function(e){return function(t){return r(t,e)}}},function(e,t,n){var r=n(592),i=n(51);e.exports=function(e,t){var n=-1,s=i(e)?Array(e.length):[];return r(e,(function(e,r,i){s[++n]=t(e,r,i)})),s}},function(e,t,n){var r=n(593),i=n(596)(r);e.exports=i},function(e,t,n){var r=n(594),i=n(49);e.exports=function(e,t){return e&&r(e,t,i)}},function(e,t,n){var r=n(595)();e.exports=r},function(e,t){e.exports=function(e){return function(t,n,r){for(var i=-1,s=Object(t),o=r(t),a=o.length;a--;){var l=o[e?a:++i];if(!1===n(s[l],l,s))break}return t}}},function(e,t,n){var r=n(51);e.exports=function(e,t){return function(n,i){if(null==n)return n;if(!r(n))return e(n,i);for(var s=n.length,o=t?s:-1,a=Object(n);(t?o--:++o<s)&&!1!==i(a[o],o,a););return n}}},function(e,t){e.exports=function(e,t){var n=e.length;for(e.sort(t);n--;)e[n]=e[n].value;return e}},function(e,t,n){var r=n(599);e.exports=function(e,t,n){for(var i=-1,s=e.criteria,o=t.criteria,a=s.length,l=n.length;++i<a;){var c=r(s[i],o[i]);if(c)return i>=l?c:c*("desc"==n[i]?-1:1)}return e.index-t.index}},function(e,t,n){var r=n(54);e.exports=function(e,t){if(e!==t){var n=void 0!==e,i=null===e,s=e==e,o=r(e),a=void 0!==t,l=null===t,c=t==t,u=r(t);if(!l&&!u&&!o&&e>t||o&&a&&c&&!l&&!u||i&&a&&c||!n&&c||!s)return 1;if(!i&&!o&&!u&&e<t||u&&n&&s&&!i&&!o||l&&n&&s||!a&&s||!c)return-1}return 0}},function(e,t,n){"use strict";function r(){const e=f(n(601));return r=function(){return e},e}function i(){const e=f(n(11));return i=function(){return e},e}function s(){const e=f(n(117));return s=function(){return e},e}function o(){const e=f(n(602));return o=function(){return e},e}function a(){const e=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=p();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=r?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(n,i,s):n[i]=e[i]}n.default=e,t&&t.set(e,n);return n}(n(1));return a=function(){return e},e}function l(){const e=f(n(215));return l=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function*(e,t,n,s){if(n=""+(n||""),s){if("Program"===s.type)s=a().file(s,[],[]);else if("File"!==s.type)throw new Error("AST root must be a Program or File node");s=(0,o().default)(s)}else s=yield*(0,u.default)(e,t,n);let p=null;if(!1!==t.inputSourceMap){if("object"==typeof t.inputSourceMap&&(p=l().default.fromObject(t.inputSourceMap)),!p){const e=g(d,s);if(e)try{p=l().default.fromComment(e)}catch(f){h("discarding unknown inline input sourcemap",f)}}if(!p){const e=g(m,s);if("string"==typeof t.filename&&e)try{const n=m.exec(e),s=r().default.readFileSync(i().default.resolve(i().default.dirname(t.filename),n[1]));s.length>1e6?h("skip merging input map > 1 MB"):p=l().default.fromJSON(s)}catch(f){h("discarding unknown file input sourcemap",f)}else e&&h("discarding un-loadable file input sourcemap")}}return new c.default(t,{code:n,ast:s,inputMap:p})};var c=f(n(97)),u=f(n(216));function p(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return p=function(){return e},e}function f(e){return e&&e.__esModule?e:{default:e}}const h=(0,s().default)("babel:transform:file");const d=/^[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+?;)?base64,(?:.*)$/,m=/^[@#][ \t]+sourceMappingURL=([^\s'"`]+)[ \t]*$/;function y(e,t,n){return t&&(t=t.filter(({value:t})=>!e.test(t)||(n=t,!1))),[t,n]}function g(e,t){let n=null;return a().traverseFast(t,t=>{[t.leadingComments,n]=y(e,t.leadingComments,n),[t.innerComments,n]=y(e,t.innerComments,n),[t.trailingComments,n]=y(e,t.trailingComments,n)}),n}},function(e,t){},function(e,t,n){var r=n(153);e.exports=function(e){return r(e,5)}},function(e,t){},function(e,t,n){var r=n(94),i=r.Buffer;function s(e,t){for(var n in e)t[n]=e[n]}function o(e,t,n){return i(e,t,n)}i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?e.exports=r:(s(r,t),t.Buffer=o),s(i,o),o.from=function(e,t,n){if("number"==typeof e)throw new TypeError("Argument must not be a number");return i(e,t,n)},o.alloc=function(e,t,n){if("number"!=typeof e)throw new TypeError("Argument must be a number");var r=i(e);return void 0!==t?"string"==typeof n?r.fill(t,n):r.fill(t):r.fill(0),r},o.allocUnsafe=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return i(e)},o.allocUnsafeSlow=function(e){if("number"!=typeof e)throw new TypeError("Argument must be a number");return r.SlowBuffer(e)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){let s=`Support for the experimental syntax '${e}' isn't currently enabled (${t.line}:${t.column+1}):\n\n`+n;const o=r[e];if(o){const{syntax:e,transform:t}=o;if(e){const n=i(e);if(t){const e=i(t),r=t.name.startsWith("@babel/plugin")?"plugins":"presets";s+=`\n\nAdd ${e} to the '${r}' section of your Babel config to enable transformation.\nIf you want to leave it as-is, add ${n} to the 'plugins' section to enable parsing.`}else s+=`\n\nAdd ${n} to the 'plugins' section of your Babel config to enable parsing.`}}return s};const r={classProperties:{syntax:{name:"@babel/plugin-syntax-class-properties",url:"https://git.io/vb4yQ"},transform:{name:"@babel/plugin-proposal-class-properties",url:"https://git.io/vb4SL"}},classPrivateProperties:{syntax:{name:"@babel/plugin-syntax-class-properties",url:"https://git.io/vb4yQ"},transform:{name:"@babel/plugin-proposal-class-properties",url:"https://git.io/vb4SL"}},classPrivateMethods:{syntax:{name:"@babel/plugin-syntax-class-properties",url:"https://git.io/vb4yQ"},transform:{name:"@babel/plugin-proposal-private-methods",url:"https://git.io/JvpRG"}},decorators:{syntax:{name:"@babel/plugin-syntax-decorators",url:"https://git.io/vb4y9"},transform:{name:"@babel/plugin-proposal-decorators",url:"https://git.io/vb4ST"}},doExpressions:{syntax:{name:"@babel/plugin-syntax-do-expressions",url:"https://git.io/vb4yh"},transform:{name:"@babel/plugin-proposal-do-expressions",url:"https://git.io/vb4S3"}},dynamicImport:{syntax:{name:"@babel/plugin-syntax-dynamic-import",url:"https://git.io/vb4Sv"}},exportDefaultFrom:{syntax:{name:"@babel/plugin-syntax-export-default-from",url:"https://git.io/vb4SO"},transform:{name:"@babel/plugin-proposal-export-default-from",url:"https://git.io/vb4yH"}},exportNamespaceFrom:{syntax:{name:"@babel/plugin-syntax-export-namespace-from",url:"https://git.io/vb4Sf"},transform:{name:"@babel/plugin-proposal-export-namespace-from",url:"https://git.io/vb4SG"}},flow:{syntax:{name:"@babel/plugin-syntax-flow",url:"https://git.io/vb4yb"},transform:{name:"@babel/preset-flow",url:"https://git.io/JfeDn"}},functionBind:{syntax:{name:"@babel/plugin-syntax-function-bind",url:"https://git.io/vb4y7"},transform:{name:"@babel/plugin-proposal-function-bind",url:"https://git.io/vb4St"}},functionSent:{syntax:{name:"@babel/plugin-syntax-function-sent",url:"https://git.io/vb4yN"},transform:{name:"@babel/plugin-proposal-function-sent",url:"https://git.io/vb4SZ"}},importMeta:{syntax:{name:"@babel/plugin-syntax-import-meta",url:"https://git.io/vbKK6"}},jsx:{syntax:{name:"@babel/plugin-syntax-jsx",url:"https://git.io/vb4yA"},transform:{name:"@babel/preset-react",url:"https://git.io/JfeDR"}},logicalAssignment:{syntax:{name:"@babel/plugin-syntax-logical-assignment-operators",url:"https://git.io/vAlBp"},transform:{name:"@babel/plugin-proposal-logical-assignment-operators",url:"https://git.io/vAlRe"}},moduleAttributes:{syntax:{name:"@babel/plugin-syntax-module-attributes",url:"https://git.io/JfK3k"}},numericSeparator:{syntax:{name:"@babel/plugin-syntax-numeric-separator",url:"https://git.io/vb4Sq"},transform:{name:"@babel/plugin-proposal-numeric-separator",url:"https://git.io/vb4yS"}},optionalChaining:{syntax:{name:"@babel/plugin-syntax-optional-chaining",url:"https://git.io/vb4Sc"},transform:{name:"@babel/plugin-proposal-optional-chaining",url:"https://git.io/vb4Sk"}},pipelineOperator:{syntax:{name:"@babel/plugin-syntax-pipeline-operator",url:"https://git.io/vb4yj"},transform:{name:"@babel/plugin-proposal-pipeline-operator",url:"https://git.io/vb4SU"}},privateIn:{syntax:{name:"@babel/plugin-syntax-private-property-in-object",url:"https://git.io/JfK3q"},transform:{name:"@babel/plugin-proposal-private-property-in-object",url:"https://git.io/JfK3O"}},recordAndTuple:{syntax:{name:"@babel/plugin-syntax-record-and-tuple",url:"https://git.io/JvKp3"}},throwExpressions:{syntax:{name:"@babel/plugin-syntax-throw-expressions",url:"https://git.io/vb4SJ"},transform:{name:"@babel/plugin-proposal-throw-expressions",url:"https://git.io/vb4yF"}},typescript:{syntax:{name:"@babel/plugin-syntax-typescript",url:"https://git.io/vb4SC"},transform:{name:"@babel/preset-typescript",url:"https://git.io/JfeDz"}},asyncGenerators:{syntax:{name:"@babel/plugin-syntax-async-generators",url:"https://git.io/vb4SY"},transform:{name:"@babel/plugin-proposal-async-generator-functions",url:"https://git.io/vb4yp"}},nullishCoalescingOperator:{syntax:{name:"@babel/plugin-syntax-nullish-coalescing-operator",url:"https://git.io/vb4yx"},transform:{name:"@babel/plugin-proposal-nullish-coalescing-operator",url:"https://git.io/vb4Se"}},objectRestSpread:{syntax:{name:"@babel/plugin-syntax-object-rest-spread",url:"https://git.io/vb4y5"},transform:{name:"@babel/plugin-proposal-object-rest-spread",url:"https://git.io/vb4Ss"}},optionalCatchBinding:{syntax:{name:"@babel/plugin-syntax-optional-catch-binding",url:"https://git.io/vb4Sn"},transform:{name:"@babel/plugin-proposal-optional-catch-binding",url:"https://git.io/vb4SI"}}};r.privateIn.syntax=r.privateIn.transform;const i=({name:e,url:t})=>`${e} (${t})`},function(e,t,n){"use strict";function r(){const e=o(n(215));return r=function(){return e},e}function i(){const e=o(n(119));return i=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const{opts:n,ast:o,code:a,inputMap:l}=t,c=[];for(const r of e)for(const e of r){const{generatorOverride:t}=e;if(t){const e=t(o,n.generatorOpts,a,i().default);void 0!==e&&c.push(e)}}let u;if(0===c.length)u=(0,i().default)(o,n.generatorOpts,a);else{if(1!==c.length)throw new Error("More than one plugin attempted to override codegen.");if(u=c[0],"function"==typeof u.then)throw new Error("You appear to be using an async codegen plugin, which your current version of Babel does not support. If you're using a published plugin, you may need to upgrade your @babel/core version.")}let{code:p,map:f}=u;f&&l&&(f=(0,s.default)(l.toObject(),f));"inline"!==n.sourceMaps&&"both"!==n.sourceMaps||(p+="\n"+r().default.fromObject(f).toComment());"inline"===n.sourceMaps&&(f=null);return{outputCode:p,outputMap:f}};var s=o(n(607));function o(e){return e&&e.__esModule?e:{default:e}}},function(e,t,n){"use strict";function r(){const e=(t=n(187))&&t.__esModule?t:{default:t};var t;return r=function(){return e},e}function i(e){return`${e.line}/${e.columnStart}`}function s(e){const t=new(r().default.SourceMapConsumer)(Object.assign({},e,{sourceRoot:null})),n=new Map,i=new Map;let s=null;return t.computeColumnSpans(),t.eachMapping(e=>{if(null===e.originalLine)return;let r=n.get(e.source);r||(r={path:e.source,content:t.sourceContentFor(e.source,!0)},n.set(e.source,r));let o=i.get(r);o||(o={source:r,mappings:[]},i.set(r,o));const a={line:e.originalLine,columnStart:e.originalColumn,columnEnd:1/0,name:e.name};s&&s.source===r&&s.mapping.line===e.originalLine&&(s.mapping.columnEnd=e.originalColumn),s={source:r,mapping:a},o.mappings.push({original:a,generated:t.allGeneratedPositionsFor({source:e.source,line:e.originalLine,column:e.originalColumn}).map(e=>({line:e.line,columnStart:e.column,columnEnd:e.lastColumn+1}))})},null,r().default.SourceMapConsumer.ORIGINAL_ORDER),{file:e.file,sourceRoot:e.sourceRoot,sources:Array.from(i.values())}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const n=s(e),o=s(t),a=new(r().default.SourceMapGenerator);for(const{source:r}of n.sources)"string"==typeof r.content&&a.setSourceContent(r.path,r.content);if(1===o.sources.length){const e=o.sources[0],t=new Map;!function(e,t){for(const{source:n,mappings:r}of e.sources)for(const{original:e,generated:i}of r)for(const r of i)t(r,e,n)}(n,(n,r,s)=>{!function(e,t,n){const r=function({mappings:e},{line:t,columnStart:n,columnEnd:r}){return function(e,t){const n=function(e,t){let n=0,r=e.length;for(;n<r;){const i=Math.floor((n+r)/2),s=e[i],o=t(s);if(0===o){n=i;break}o>=0?r=i:n=i+1}let i=n;if(i<e.length){for(;i>=0&&t(e[i])>=0;)i--;return i+1}return i}(e,t),r=[];for(let i=n;i<e.length&&0===t(e[i]);i++)r.push(e[i]);return r}(e,({original:e})=>t>e.line?-1:t<e.line?1:n>=e.columnEnd?-1:r<=e.columnStart?1:0)}(e,t);for(const{generated:i}of r)for(const e of i)n(e)}(e,n,e=>{const n=i(e);t.has(n)||(t.set(n,e),a.addMapping({source:s.path,original:{line:r.line,column:r.columnStart},generated:{line:e.line,column:e.columnStart},name:r.name}))})});for(const n of t.values()){if(n.columnEnd===1/0)continue;const e={line:n.line,columnStart:n.columnEnd},r=i(e);t.has(r)||a.addMapping({generated:{line:e.line,column:e.columnStart}})}}const l=a.toJSON();"string"==typeof n.sourceRoot&&(l.sourceRoot=n.sourceRoot);return l}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.transformFileSync=function(){throw new Error("Transforming files is not supported in browsers")},t.transformFileAsync=function(){return Promise.reject(new Error("Transforming files is not supported in browsers"))},t.transformFile=void 0;t.transformFile=function(e,t,n){"function"==typeof t&&(n=t),n(new Error("Transforming files is not supported in browsers"),null)}},function(e,t,n){"use strict";function r(){const e=o(n(27));return r=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.transformFromAstAsync=t.transformFromAstSync=t.transformFromAst=void 0;var i=o(n(55)),s=n(207);function o(e){return e&&e.__esModule?e:{default:e}}const a=(0,r().default)((function*(e,t,n){const r=yield*(0,i.default)(n);if(null===r)return null;if(!e)throw new Error("No AST given");return yield*(0,s.run)(r,t,e)}));t.transformFromAst=function(e,t,n,r){if("function"==typeof n&&(r=n,n=void 0),void 0===r)return a.sync(e,t,n);a.errback(e,t,n,r)};const l=a.sync;t.transformFromAstSync=l;const c=a.async;t.transformFromAstAsync=c},function(e,t,n){"use strict";function r(){const e=a(n(27));return r=function(){return e},e}Object.defineProperty(t,"__esModule",{value:!0}),t.parseAsync=t.parseSync=t.parse=void 0;var i=a(n(55)),s=a(n(216)),o=a(n(214));function a(e){return e&&e.__esModule?e:{default:e}}const l=(0,r().default)((function*(e,t){const n=yield*(0,i.default)(t);return null===n?null:yield*(0,s.default)(n.passes,(0,o.default)(n),e)}));t.parse=function(e,t,n){if("function"==typeof t&&(n=t,t=void 0),void 0===n)return l.sync(e,t);l.errback(e,t,n)};const c=l.sync;t.parseSync=c;const u=l.async;t.parseAsync=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r,i=n(33),s=(r=n(81))&&r.__esModule?r:{default:r},o=n(23),a=n(612);const l=(()=>{const e=o.types.identifier("a"),t=o.types.objectProperty(o.types.identifier("key"),e),n=o.types.objectPattern([t]);return o.types.isReferenced(e,t,n)?1:0})();var c=(0,i.declare)((e,t)=>{e.assertVersion(7);const{useBuiltIns:n=!1,loose:r=!1}=t;if("boolean"!=typeof r)throw new Error(".loose must be a boolean, or undefined");function i(e){return n?o.types.memberExpression(o.types.identifier("Object"),o.types.identifier("assign")):e.addHelper("extends")}function c(e){let t=!1;return p(e,e=>{t=!0,e.stop()}),t}function u(e){let t=!1;return p(e,e=>{e.parentPath.isObjectPattern()&&(t=!0,e.stop())}),t}function p(e,t){e.traverse({Expression(e){const t=e.parent.type;("AssignmentPattern"===t&&"right"===e.key||"ObjectProperty"===t&&e.parent.computed&&"key"===e.key)&&e.skip()},RestElement:t})}function f(e,t){const n=[];for(const r of e){const e=r.get("key");if(r.node.computed&&!e.isPure()){const r=t.generateUidBasedOnNode(e.node),i=o.types.variableDeclarator(o.types.identifier(r),e.node);n.push(i),e.replaceWith(o.types.identifier(r))}}return n}function h(e,t,n){const s=e.get("properties"),a=s[s.length-1];o.types.assertRestElement(a.node);const l=o.types.cloneNode(a.node);a.remove();const c=f(e.get("properties"),e.scope),{keys:u,allLiteral:p}=function(e){const t=e.node.properties,n=[];let r=!0;for(const i of t)o.types.isIdentifier(i.key)&&!i.computed?n.push(o.types.stringLiteral(i.key.name)):o.types.isTemplateLiteral(i.key)?n.push(o.types.cloneNode(i.key)):o.types.isLiteral(i.key)?n.push(o.types.stringLiteral(String(i.key.value))):(n.push(o.types.cloneNode(i.key)),r=!1);return{keys:n,allLiteral:r}}(e);if(0===u.length)return[c,l.argument,o.types.callExpression(i(t),[o.types.objectExpression([]),o.types.cloneNode(n)])];let h;return h=p?o.types.arrayExpression(u):o.types.callExpression(o.types.memberExpression(o.types.arrayExpression(u),o.types.identifier("map")),[t.addHelper("toPropertyKey")]),[c,l.argument,o.types.callExpression(t.addHelper("objectWithoutProperties"+(r?"Loose":"")),[o.types.cloneNode(n),h])]}function d(e,t,n){if(t.isAssignmentPattern())d(e,t.get("left"),n);else{if(t.isArrayPattern()&&c(t)){const r=t.get("elements");for(let t=0;t<r.length;t++)d(e,r[t],n)}if(t.isObjectPattern()&&c(t)){const r=e.scope.generateUidIdentifier("ref"),i=o.types.variableDeclaration("let",[o.types.variableDeclarator(t.node,r)]);n?n.push(i):(e.ensureBlock(),e.get("body").unshiftContainer("body",i)),t.replaceWith(o.types.cloneNode(r))}}}return{name:"proposal-object-rest-spread",inherits:s.default,visitor:{Function(e){const t=e.get("params"),n=new Set,i=new Set;for(let r=0;r<t.length;++r){const e=t[r];if(c(e)){n.add(r);for(const t of Object.keys(e.getBindingIdentifiers()))i.add(t)}}let s=!1;const o=function(e,t){const n=e.node.name;e.scope.getBinding(n)===t.getBinding(n)&&i.has(n)&&(s=!0,e.stop())};let l;for(l=0;l<t.length&&!s;++l){const r=t[l];n.has(l)||(r.isReferencedIdentifier()||r.isBindingIdentifier()?o(e,e.scope):r.traverse({"Scope|TypeAnnotation|TSTypeAnnotation":e=>e.skip(),"ReferencedIdentifier|BindingIdentifier":o},e.scope))}if(s){const t=e=>e>=l-1||n.has(e);(0,a.convertFunctionParams)(e,r,t,d)}else for(let r=0;r<t.length;++r){const e=t[r];n.has(r)&&d(e.parentPath,e)}},VariableDeclarator(e,t){if(!e.get("id").isObjectPattern())return;let n=e;const i=e;p(e.get("id"),e=>{if(!e.parentPath.isObjectPattern())return;if(i.node.id.properties.length>1&&!o.types.isIdentifier(i.node.init)){const t=e.scope.generateUidIdentifierBasedOnNode(i.node.init,"ref");return i.insertBefore(o.types.variableDeclarator(t,i.node.init)),void i.replaceWith(o.types.variableDeclarator(i.node.id,o.types.cloneNode(t)))}let s=i.node.init;const a=[];let c;e.findParent(e=>{if(e.isObjectProperty())a.unshift(e);else if(e.isVariableDeclarator())return c=e.parentPath.node.kind,!0});const u=f(a,e.scope);a.forEach(e=>{const{node:t}=e;s=o.types.memberExpression(s,o.types.cloneNode(t.key),t.computed||o.types.isLiteral(t.key))});const p=e.findParent(e=>e.isObjectPattern()),[d,m,y]=h(p,t,s);r&&function(e){const t=e.getOuterBindingIdentifierPaths();Object.keys(t).forEach(n=>{const r=t[n].parentPath;e.scope.getBinding(n).references>l||!r.isObjectProperty()||r.remove()})}(p),o.types.assertIdentifier(m),n.insertBefore(d),n.insertBefore(u),n.insertAfter(o.types.variableDeclarator(m,y)),n=n.getSibling(n.key+1),e.scope.registerBinding(c,n),0===p.node.properties.length&&p.findParent(e=>e.isObjectProperty()||e.isVariableDeclarator()).remove()})},ExportNamedDeclaration(e){const t=e.get("declaration");if(!t.isVariableDeclaration())return;if(!t.get("declarations").some(e=>u(e.get("id"))))return;const n=[];for(const r of Object.keys(e.getOuterBindingIdentifiers(e)))n.push(o.types.exportSpecifier(o.types.identifier(r),o.types.identifier(r)));e.replaceWith(t.node),e.insertAfter(o.types.exportNamedDeclaration(null,n))},CatchClause(e){const t=e.get("param");d(t.parentPath,t)},AssignmentExpression(e,t){const n=e.get("left");if(n.isObjectPattern()&&c(n)){const r=[],i=e.scope.generateUidBasedOnNode(e.node.right,"ref");r.push(o.types.variableDeclaration("var",[o.types.variableDeclarator(o.types.identifier(i),e.node.right)]));const[s,a,l]=h(n,t,o.types.identifier(i));s.length>0&&r.push(o.types.variableDeclaration("var",s));const c=o.types.cloneNode(e.node);c.right=o.types.identifier(i),r.push(o.types.expressionStatement(c)),r.push(o.types.toStatement(o.types.assignmentExpression("=",a,l))),r.push(o.types.expressionStatement(o.types.identifier(i))),e.replaceWithMultiple(r)}},ForXStatement(e){const{node:t,scope:n}=e,r=e.get("left"),i=t.left;if(u(r))if(o.types.isVariableDeclaration(i)){const r=i.declarations[0].id,s=n.generateUidIdentifier("ref");t.left=o.types.variableDeclaration(i.kind,[o.types.variableDeclarator(s,null)]),e.ensureBlock(),t.body.body.unshift(o.types.variableDeclaration(t.left.kind,[o.types.variableDeclarator(r,o.types.cloneNode(s))]))}else{const r=n.generateUidIdentifier("ref");t.left=o.types.variableDeclaration("var",[o.types.variableDeclarator(r)]),e.ensureBlock(),0===t.body.body.length&&e.isCompletionRecord()&&t.body.body.unshift(o.types.expressionStatement(n.buildUndefinedNode())),t.body.body.unshift(o.types.expressionStatement(o.types.assignmentExpression("=",i,o.types.cloneNode(r))))}},ArrayPattern(e){const t=[];if(p(e,e=>{if(!e.parentPath.isObjectPattern())return;const n=e.parentPath,r=e.scope.generateUidIdentifier("ref");t.push(o.types.variableDeclarator(n.node,r)),n.replaceWith(o.types.cloneNode(r)),e.skip()}),t.length>0){const n=e.getStatementParent();n.insertAfter(o.types.variableDeclaration(n.node.kind||"var",t))}},ObjectExpression(e,t){if(!function(e){for(const t of e.properties)if(o.types.isSpreadElement(t))return!0;return!1}(e.node))return;let n;if(r)n=i(t);else try{n=t.addHelper("objectSpread2")}catch(c){this.file.declarations.objectSpread2=null,n=t.addHelper("objectSpread")}let s=null,a=[];function l(){const e=a.length>0,t=o.types.objectExpression(a);a=[],s?r?e&&s.arguments.push(t):s=o.types.callExpression(o.types.cloneNode(n),[s,...e?[o.types.objectExpression([]),t]:[]]):s=o.types.callExpression(n,[t])}for(const r of e.node.properties)o.types.isSpreadElement(r)?(l(),s.arguments.push(r.argument)):a.push(r);a.length&&l(),e.replaceWith(s)}}}});t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"convertFunctionParams",{enumerable:!0,get:function(){return i.default}}),t.default=void 0;var r=n(33),i=o(n(613)),s=o(n(614));function o(e){return e&&e.__esModule?e:{default:e}}var a=(0,r.declare)((e,t)=>{e.assertVersion(7);const{loose:n}=t;return{name:"transform-parameters",visitor:{Function(e){e.isArrowFunctionExpression()&&e.get("params").some(e=>e.isRestElement()||e.isAssignmentPattern())&&e.arrowFunctionToExpression();const t=(0,s.default)(e),r=(0,i.default)(e,n);(t||r)&&e.scope.crawl()}}}});t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n,c){const u=e.get("params");if(u.every(e=>e.isIdentifier()))return!1;const{node:p,scope:f}=e,h={stop:!1,needsOuterBinding:!1,scope:f},d=[],m=new Set;for(const r of u)for(const e of Object.keys(r.getBindingIdentifiers())){var y;const t=null==(y=f.bindings[e])?void 0:y.constantViolations;if(t)for(const n of t){const t=n.node;switch(t.type){case"VariableDeclarator":if(null===t.init){const e=n.parentPath;if(!e.parentPath.isFor()||e.parentPath.get("body")===e){n.remove();break}}m.add(e);break;case"FunctionDeclaration":m.add(e)}}}if(0===m.size)for(const r of u)if(r.isIdentifier()||r.traverse(l,h),h.needsOuterBinding)break;let g=null;for(let l=0;l<u.length;l++){const h=u[l];if(n&&!n(l))continue;const m=[];c&&c(h.parentPath,h,m);const y=h.isAssignmentPattern();if(y&&(t||"set"===p.kind)){const e=h.get("left"),t=h.get("right"),n=f.buildUndefinedNode();if(e.isIdentifier())d.push(s({ASSIGNMENT_IDENTIFIER:r.types.cloneNode(e.node),DEFAULT_VALUE:t.node,UNDEFINED:n})),h.replaceWith(e.node);else if(e.isObjectPattern()||e.isArrayPattern()){const i=f.generateUidIdentifier();d.push(o({ASSIGNMENT_IDENTIFIER:e.node,DEFAULT_VALUE:t.node,PARAMETER_NAME:r.types.cloneNode(i),UNDEFINED:n})),h.replaceWith(i)}}else if(y){null===g&&(g=l);const e=h.get("left"),t=h.get("right"),n=i({VARIABLE_NAME:e.node,DEFAULT_VALUE:t.node,ARGUMENT_KEY:r.types.numericLiteral(l)});d.push(n)}else if(null!==g){const e=a([h.node,r.types.numericLiteral(l)]);d.push(e)}else if(h.isObjectPattern()||h.isArrayPattern()){const t=e.scope.generateUidIdentifier("ref"),n=r.types.variableDeclaration("let",[r.types.variableDeclarator(h.node,t)]);d.push(n),h.replaceWith(r.types.cloneNode(t))}if(m)for(const e of m)d.push(e)}null!==g&&(p.params=p.params.slice(0,g));if(e.ensureBlock(),h.needsOuterBinding||m.size>0){d.push(function(e,t){const n=[],i=[];for(const s of e)n.push(r.types.identifier(s)),i.push(r.types.identifier(s));return r.types.returnStatement(r.types.callExpression(r.types.arrowFunctionExpression(i,t),n))}(m,e.get("body").node)),e.set("body",r.types.blockStatement(d));const t=e.get("body.body"),n=t[t.length-1].get("argument.callee");n.arrowFunctionToExpression(),n.node.generator=e.node.generator,n.node.async=e.node.async,e.node.generator=!1}else e.get("body").unshiftContainer("body",d);return!0};var r=n(23);const i=(0,r.template)("\n  let VARIABLE_NAME =\n    arguments.length > ARGUMENT_KEY && arguments[ARGUMENT_KEY] !== undefined ?\n      arguments[ARGUMENT_KEY]\n    :\n      DEFAULT_VALUE;\n"),s=(0,r.template)("\n  if (ASSIGNMENT_IDENTIFIER === UNDEFINED) {\n    ASSIGNMENT_IDENTIFIER = DEFAULT_VALUE;\n  }\n"),o=(0,r.template)("\n  let ASSIGNMENT_IDENTIFIER = PARAMETER_NAME === UNDEFINED ? DEFAULT_VALUE : PARAMETER_NAME ;\n"),a=(0,r.template)("\n  let $0 = arguments.length > $1 ? arguments[$1] : undefined;\n"),l={"ReferencedIdentifier|BindingIdentifier"(e,t){const{scope:n,node:r}=e,{name:i}=r;("eval"===i||n.getBinding(i)===t.scope.parent.getBinding(i)&&t.scope.hasOwnBinding(i))&&(t.needsOuterBinding=!0,e.stop())},"TypeAnnotation|TSTypeAnnotation|TypeParameterDeclaration|TSTypeParameterDeclaration":e=>e.skip()}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){const{node:t,scope:n}=e;if(!function(e){const t=e.params.length;return t>0&&r.types.isRestElement(e.params[t-1])}(t))return!1;let s=t.params.pop().argument;const o=r.types.identifier("arguments");if(r.types.isPattern(s)){const e=s;s=n.generateUidIdentifier("ref");const i=r.types.variableDeclaration("let",[r.types.variableDeclarator(e,s)]);t.body.body.unshift(i)}const a=function(e){let t=e.params.length;t>0&&r.types.isIdentifier(e.params[0],{name:"this"})&&(t-=1);return t}(t),l={references:[],offset:a,argumentsNode:o,outerBinding:n.getBindingIdentifier(s.name),candidates:[],name:s.name,deopted:!1};if(e.traverse(c,l),!l.deopted&&!l.references.length){for(const{path:e,cause:t}of l.candidates){const n=r.types.cloneNode(o);switch(t){case"indexGetter":u(e,n,l.offset);break;case"lengthGetter":p(e,n,l.offset);break;default:e.replaceWith(n)}}return!0}l.references=l.references.concat(l.candidates.map(({path:e})=>e));const f=r.types.numericLiteral(a),h=n.generateUidIdentifier("key"),d=n.generateUidIdentifier("len");let m,y;a?(m=r.types.binaryExpression("-",r.types.cloneNode(h),r.types.cloneNode(f)),y=r.types.conditionalExpression(r.types.binaryExpression(">",r.types.cloneNode(d),r.types.cloneNode(f)),r.types.binaryExpression("-",r.types.cloneNode(d),r.types.cloneNode(f)),r.types.numericLiteral(0))):(m=r.types.identifier(h.name),y=r.types.identifier(d.name));const g=i({ARGUMENTS:o,ARRAY_KEY:m,ARRAY_LEN:y,START:f,ARRAY:s,KEY:h,LEN:d});if(l.deopted)t.body.body.unshift(g);else{let t=e.getEarliestCommonAncestorFrom(l.references).getStatementParent();t.findParent(e=>{if(!e.isLoop())return e.isFunction();t=e}),t.insertBefore(g)}return!0};var r=n(23);const i=(0,r.template)("\n  for (var LEN = ARGUMENTS.length,\n           ARRAY = new Array(ARRAY_LEN),\n           KEY = START;\n       KEY < LEN;\n       KEY++) {\n    ARRAY[ARRAY_KEY] = ARGUMENTS[KEY];\n  }\n"),s=(0,r.template)("\n  (INDEX < OFFSET || ARGUMENTS.length <= INDEX) ? undefined : ARGUMENTS[INDEX]\n"),o=(0,r.template)("\n  REF = INDEX, (REF < OFFSET || ARGUMENTS.length <= REF) ? undefined : ARGUMENTS[REF]\n"),a=(0,r.template)("\n  ARGUMENTS.length <= OFFSET ? 0 : ARGUMENTS.length - OFFSET\n");function l(e,t){return e.node.name===t.name&&e.scope.bindingIdentifierEquals(t.name,t.outerBinding)}const c={Scope(e,t){e.scope.bindingIdentifierEquals(t.name,t.outerBinding)||e.skip()},Flow(e){e.isTypeCastExpression()||e.skip()},Function(e,t){const n=t.noOptimise;t.noOptimise=!0,e.traverse(c,t),t.noOptimise=n,e.skip()},ReferencedIdentifier(e,t){const{node:n}=e;if("arguments"===n.name&&(t.deopted=!0),l(e,t))if(t.noOptimise)t.deopted=!0;else{const{parentPath:r}=e;if("params"===r.listKey&&r.key<t.offset)return;if(r.isMemberExpression({object:n})){const n=r.parentPath;if(!t.deopted&&!(n.isAssignmentExpression()&&r.node===n.node.left||n.isLVal()||n.isForXStatement()||n.isUpdateExpression()||n.isUnaryExpression({operator:"delete"})||(n.isCallExpression()||n.isNewExpression())&&r.node===n.node.callee))if(r.node.computed){if(r.get("property").isBaseType("number"))return void t.candidates.push({cause:"indexGetter",path:e})}else if("length"===r.node.property.name)return void t.candidates.push({cause:"lengthGetter",path:e})}if(0===t.offset&&r.isSpreadElement()){const n=r.parentPath;if(n.isCallExpression()&&1===n.node.arguments.length)return void t.candidates.push({cause:"argSpread",path:e})}t.references.push(e)}},BindingIdentifier(e,t){l(e,t)&&(t.deopted=!0)}};function u(e,t,n){const i=r.types.numericLiteral(n);let a;a=r.types.isNumericLiteral(e.parent.property)?r.types.numericLiteral(e.parent.property.value+n):0===n?e.parent.property:r.types.binaryExpression("+",e.parent.property,r.types.cloneNode(i));const{scope:l}=e;if(l.isPure(a)){const n=e.parentPath;n.replaceWith(s({ARGUMENTS:t,OFFSET:i,INDEX:a}));const r=n.get("test").get("left").evaluate();r.confident&&(!0===r.value?n.replaceWith(n.scope.buildUndefinedNode()):n.get("test").replaceWith(n.get("test").get("right")))}else{const n=l.generateUidIdentifierBasedOnNode(a);l.push({id:n,kind:"var"}),e.parentPath.replaceWith(o({ARGUMENTS:t,OFFSET:i,INDEX:a,REF:r.types.cloneNode(n)}))}}function p(e,t,n){n?e.parentPath.replaceWith(a({ARGUMENTS:t,OFFSET:r.types.numericLiteral(n)})):e.replaceWith(t)}},function(e,t,n){const{openCloseTag:r}=n(217);e.exports=function(e,t,n){const r=new RegExp("^</?([a-z\\.]*(\\.){0,1}[a-z][a-z0-9\\.]*)(?=(\\s|/?>|$))","i"),g=t.length;let T,E,b,v,S,A,x,_=0;const P=[[i,s,!0],[o,a,!0],[l,c,!0],[u,p,!0],[f,h,!0],[r,d,!0],[y,d,!0],[m,d,!1]];for(;_<g&&(v=t.charAt(_),"\t"===v||" "===v);)_++;if("<"!==t.charAt(_))return;T=t.indexOf("\n",_+1),T=-1===T?g:T,E=t.slice(_,T),b=-1,S=P.length;for(;++b<S;)if(P[b][0].test(E)){A=P[b];break}if(!A)return;if(n)return A[2];if(_=T,!A[1].test(E))for(;_<g;){if(T=t.indexOf("\n",_+1),T=-1===T?g:T,E=t.slice(_+1,T),A[1].test(E)){E&&(_=T);break}_=T}return x=t.slice(0,_),e(x)({type:"html",value:x})};const i=/^<(script|pre|style)(?=(\s|>|$))/i,s=/<\/(script|pre|style)>/i,o=/^<!--/,a=/-->/,l=/^<\?/,c=/\?>/,u=/^<![A-Za-z]/,p=/>/,f=/^<!\[CDATA\[/,h=/\]\]>/,d=/^$/,m=new RegExp(r.source+"\\s*$"),y=/^<>/},function(e,t,n){"use strict";e.exports=function(e){var t=this.Parser,n=this.Compiler;(function(e){return Boolean(e&&e.prototype&&e.prototype.blockTokenizers)})(t)&&function(e,t){var n,s=t||{},o=e.prototype,a=o.blockTokenizers,l=o.inlineTokenizers,c=o.blockMethods,u=o.inlineMethods,p=a.definition,f=l.reference,h=[],d=-1,m=c.length;for(;++d<m;)"newline"!==(n=c[d])&&"indentedCode"!==n&&"paragraph"!==n&&"footnoteDefinition"!==n&&h.push([n]);h.push(["footnoteDefinition"]),s.inlineNotes&&(r(u,"reference","inlineNote"),l.inlineNote=g);function y(e,t,n){var r,i,s,o,a=t.length+1,l=0;if(91===t.charCodeAt(l++)&&94===t.charCodeAt(l++)){for(i=l;l<a;){if((o=t.charCodeAt(l))!=o||10===o||9===o||32===o)return;if(93===o){s=l,l++;break}l++}if(void 0!==s&&i!==s)return!!n||(r=t.slice(i,s),e(t.slice(0,l))({type:"footnoteReference",identifier:r.toLowerCase(),label:r}))}}function g(e,t,n){var r,i,s,o,a,l,c,u=t.length+1,p=0,f=0;if(94===t.charCodeAt(p++)&&91===t.charCodeAt(p++)){for(s=p;p<u;){if((i=t.charCodeAt(p))!=i)return;if(void 0===l)if(92===i)p+=2;else if(91===i)f++,p++;else if(93===i){if(0===f){o=p,p++;break}f--,p++}else if(96===i){for(a=p,l=1;96===t.charCodeAt(a+l);)l++;p+=l}else p++;else if(96===i){for(a=p,c=1;96===t.charCodeAt(a+c);)c++;p+=c,l===c&&(l=void 0),c=void 0}else p++}if(void 0!==o)return!!n||((r=e.now()).column+=2,r.offset+=2,e(t.slice(0,p))({type:"footnote",children:this.tokenizeInline(t.slice(s,o),r)}))}}function T(e,t,n){var r=0;if(33===t.charCodeAt(r)&&r++,91===t.charCodeAt(r)&&94!==t.charCodeAt(r+1))return f.call(this,e,t,n)}r(c,"definition","footnoteDefinition"),r(u,"reference","footnoteCall"),a.definition=function(e,t,n){for(var r=0,i=t.charCodeAt(r);32===i||9===i;)i=t.charCodeAt(++r);if(91===i&&94!==t.charCodeAt(r+1))return p.call(this,e,t,n)},a.footnoteDefinition=function(e,t,n){for(var r,s,o,l,c,u,p,f,h,d,m,y,g,T=this.interruptFootnoteDefinition,E=this.offset,b=t.length+1,v=0,S=[];v<b&&(9===(l=t.charCodeAt(v))||32===l);)v++;if(91===t.charCodeAt(v++)&&94===t.charCodeAt(v++)){for(s=v;v<b;){if((l=t.charCodeAt(v))!=l||10===l||9===l||32===l)return;if(93===l){o=v,v++;break}v++}if(void 0!==o&&s!==o&&58===t.charCodeAt(v++)){if(n)return!0;for(r=t.slice(s,o),c=e.now(),h=0,d=0,m=v,y=[];v<b;){if((l=t.charCodeAt(v))!=l||10===l)g={start:h,contentStart:m||v,contentEnd:v,end:v},y.push(g),10===l&&(h=v+1,d=0,m=void 0,g.end=h);else if(void 0!==d)if(32===l||9===l)(d+=32===l?1:4-d%4)>4&&(d=void 0,m=v);else{if(d<4&&g&&(g.contentStart===g.contentEnd||i(T,a,this,[e,t.slice(v,1024),!0])))break;d=void 0,m=v}v++}for(v=-1,b=y.length;b>0&&(g=y[b-1]).contentStart===g.contentEnd;)b--;for(u=e(t.slice(0,g.contentEnd));++v<b;)g=y[v],E[c.line+v]=(E[c.line+v]||0)+(g.contentStart-g.start),S.push(t.slice(g.contentStart,g.end));return p=this.enterBlock(),f=this.tokenizeBlock(S.join(""),c),p(),u({type:"footnoteDefinition",identifier:r.toLowerCase(),label:r,children:f})}}},l.footnoteCall=y,l.reference=T,o.interruptFootnoteDefinition=h,T.locator=f.locator,y.locator=function(e,t){return e.indexOf("[",t)},g.locator=function(e,t){return e.indexOf("^[",t)}}(t,e);(function(e){return Boolean(e&&e.prototype&&e.prototype.visitors)})(n)&&function(e){var t=e.prototype.visitors;t.footnote=function(e){return"^["+this.all(e).join("")+"]"},t.footnoteReference=function(e){return"[^"+(e.label||e.identifier)+"]"},t.footnoteDefinition=function(e){for(var t,n=this.all(e).join("\n\n").split("\n"),r=0,i=n.length;++r<i;)""!==(t=n[r])&&(n[r]="    "+t);return"[^"+(e.label||e.identifier)+"]: "+n.join("\n")}}(n)};function r(e,t,n){e.splice(e.indexOf(t),0,n)}function i(e,t,n,r){for(var i=e.length,s=-1;++s<i;)if(t[e[s][0]].apply(n,r))return!0;return!1}},function(e,t,n){"use strict";var r=n(618);e.exports=function(){return r}},function(e,t,n){"use strict";var r=n(619);e.exports=function(e){return r(e,{cascade:!1},s)};var i=/^\s*$/;function s(e){return"paragraph"===e.type&&e.children.every(o)}function o(e){return"text"===e.type&&i.test(e.value)}},function(e,t,n){"use strict";var r=n(95);e.exports=function(e,t,n){var i,s;n||(n=t,t={});return s=null==(s=t.cascade)||s,i=r(n),function e(t,n,r){var o,a,l,c,u;if(i(t,n,r))return null;if(!(o=t.children)||0===o.length)return t;c=0,a=o.length,l=-1;for(;++l<a;)(u=e(o[l],l,t))&&(o[c++]=u);if(s&&0===c)return null;return o.length=c,t}(e,null,null)}},function(e,t,n){"use strict";var r=n(621),i=n(128),s=n(635),o=n(643),a=n(647),l=n(87),c=n(234),u=n(16);e.exports=function(e,t){var n,m,y,g,T,E=new r(p),b=c("type");if(b.handlers.root=function(e){v(e.children)},b.handlers.element=function(e){var t=-1!==a.indexOf(e.tagName);E._processToken(function(e){var t=d(e);return t.startTag=u(t),{type:"START_TAG_TOKEN",tagName:e.tagName,selfClosing:!1,attrs:f(e),location:t}}(e),l.html),v(e.children),t||(E._processToken(function(e){var t=d(e);return t.endTag=u(t),{type:"END_TAG_TOKEN",tagName:e.tagName,attrs:[],location:t}}(e)),n.state="DATA_STATE")},b.handlers.text=function(e){E._processToken({type:"CHARACTER_TOKEN",chars:e.value,location:d(e)})},b.handlers.comment=function(e){E._processToken({type:"COMMENT_TOKEN",data:e.value,location:d(e)})},b.handlers.doctype=function(e){var t=o(e);E._processToken({type:"DOCTYPE_TOKEN",name:t.name,forceQuirks:!1,publicId:t.publicId,systemId:t.systemId,location:d(e)})},b.handlers.raw=function(e){var t,r=i.start(e);m.html=null,m.endOfChunkHit=!1,m.lastChunkWritten=!1,m.lastCharPos=-1,m.pos=-1,y.droppedBufferSize=0,y.line=r.line,y.col=1,y.offset=0,y.lineStartPos=1-r.column,y.droppedBufferSize=r.offset,g.currentAttrLocation=null,g.ctLoc=d(e),n.write(e.value),E._runParsingLoop(null),(t=n.currentCharacterToken)&&(t.location.endLine=y.line,t.location.endCol=y.col+1,t.location.endOffset=y.offset+1,E._processToken(t));n.currentToken=null,n.currentCharacterToken=null,n.currentAttr=null},b.unknown=h,T=s(function(e){var t="root"===e.type?e.children[0]:e;return t&&("doctype"===t.type||"html"===t.tagName)}(e)?function(){var t=E.treeAdapter.createDocument();return E._bootstrap(t,null),n=E.tokenizer,m=n.preprocessor,g=n.__mixins[0],y=g.posTracker,b(e),t}():function(){var t,r,i;return t={nodeName:"template",tagName:"template",attrs:[],namespaceURI:l.html,childNodes:[]},r={nodeName:"documentmock",tagName:"documentmock",attrs:[],namespaceURI:l.html,childNodes:[]},i={nodeName:"#document-fragment",childNodes:[]},E._bootstrap(r,t),E._pushTmplInsertionMode("IN_TEMPLATE_MODE"),E._initTokenizerForFragmentParsing(),E._insertFakeRootElement(),E._resetInsertionMode(),E._findFormInFragmentContext(),n=E.tokenizer,m=n.preprocessor,g=n.__mixins[0],y=g.posTracker,b(e),E._adoptNodes(r.childNodes[0],i),i}(),t),"root"!==e.type&&1===T.children.length)return T.children[0];return T;function v(e){var t=0,n=-1;for(e&&(t=e.length);++n<t;)b(e[n])}};var p={sourceCodeLocationInfo:!0,scriptingEnabled:!1};function f(e){return o({tagName:e.tagName,type:"element",properties:e.properties}).attrs}function h(e){throw new Error("Cannot compile `"+e.type+"` node")}function d(e){var t=i.start(e),n=i.end(e);return{startLine:t.line,startCol:t.column,startOffset:t.offset,endLine:n.line,endCol:n.column,endOffset:n.offset}}},function(e,t,n){"use strict";const r=n(82),i=n(624),s=n(625),o=n(626),a=n(628),l=n(19),c=n(631),u=n(632),p=n(633),f=n(634),h=n(126),d=n(125),m=n(41),y=m.TAG_NAMES,g=m.NAMESPACES,T=m.ATTRS,E={scriptingEnabled:!0,sourceCodeLocationInfo:!1,onParseError:null,treeAdapter:c},b="IN_TABLE_MODE",v={[y.TR]:"IN_ROW_MODE",[y.TBODY]:"IN_TABLE_BODY_MODE",[y.THEAD]:"IN_TABLE_BODY_MODE",[y.TFOOT]:"IN_TABLE_BODY_MODE",[y.CAPTION]:"IN_CAPTION_MODE",[y.COLGROUP]:"IN_COLUMN_GROUP_MODE",[y.TABLE]:b,[y.BODY]:"IN_BODY_MODE",[y.FRAMESET]:"IN_FRAMESET_MODE"},S={[y.CAPTION]:b,[y.COLGROUP]:b,[y.TBODY]:b,[y.TFOOT]:b,[y.THEAD]:b,[y.COL]:"IN_COLUMN_GROUP_MODE",[y.TR]:"IN_TABLE_BODY_MODE",[y.TD]:"IN_ROW_MODE",[y.TH]:"IN_ROW_MODE"},A={INITIAL_MODE:{[r.CHARACTER_TOKEN]:j,[r.NULL_CHARACTER_TOKEN]:j,[r.WHITESPACE_CHARACTER_TOKEN]:k,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:function(e,t){e._setDocumentType(t);const n=t.forceQuirks?m.DOCUMENT_MODE.QUIRKS:p.getDocumentMode(t);p.isConforming(t)||e._err(h.nonConformingDoctype);e.treeAdapter.setDocumentMode(e.document,n),e.insertionMode="BEFORE_HTML_MODE"},[r.START_TAG_TOKEN]:j,[r.END_TAG_TOKEN]:j,[r.EOF_TOKEN]:j},BEFORE_HTML_MODE:{[r.CHARACTER_TOKEN]:F,[r.NULL_CHARACTER_TOKEN]:F,[r.WHITESPACE_CHARACTER_TOKEN]:k,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){t.tagName===y.HTML?(e._insertElement(t,g.HTML),e.insertionMode="BEFORE_HEAD_MODE"):F(e,t)},[r.END_TAG_TOKEN]:function(e,t){const n=t.tagName;n!==y.HTML&&n!==y.HEAD&&n!==y.BODY&&n!==y.BR||F(e,t)},[r.EOF_TOKEN]:F},BEFORE_HEAD_MODE:{[r.CHARACTER_TOKEN]:B,[r.NULL_CHARACTER_TOKEN]:B,[r.WHITESPACE_CHARACTER_TOKEN]:k,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:I,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.HTML?re(e,t):n===y.HEAD?(e._insertElement(t,g.HTML),e.headElement=e.openElements.current,e.insertionMode="IN_HEAD_MODE"):B(e,t)},[r.END_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.HEAD||n===y.BODY||n===y.HTML||n===y.BR?B(e,t):e._err(h.endTagWithoutMatchingOpenElement)},[r.EOF_TOKEN]:B},IN_HEAD_MODE:{[r.CHARACTER_TOKEN]:G,[r.NULL_CHARACTER_TOKEN]:G,[r.WHITESPACE_CHARACTER_TOKEN]:L,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:I,[r.START_TAG_TOKEN]:U,[r.END_TAG_TOKEN]:H,[r.EOF_TOKEN]:G},IN_HEAD_NO_SCRIPT_MODE:{[r.CHARACTER_TOKEN]:V,[r.NULL_CHARACTER_TOKEN]:V,[r.WHITESPACE_CHARACTER_TOKEN]:L,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:I,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.HTML?re(e,t):n===y.BASEFONT||n===y.BGSOUND||n===y.HEAD||n===y.LINK||n===y.META||n===y.NOFRAMES||n===y.STYLE?U(e,t):n===y.NOSCRIPT?e._err(h.nestedNoscriptInHead):V(e,t)},[r.END_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.NOSCRIPT?(e.openElements.pop(),e.insertionMode="IN_HEAD_MODE"):n===y.BR?V(e,t):e._err(h.endTagWithoutMatchingOpenElement)},[r.EOF_TOKEN]:V},AFTER_HEAD_MODE:{[r.CHARACTER_TOKEN]:K,[r.NULL_CHARACTER_TOKEN]:K,[r.WHITESPACE_CHARACTER_TOKEN]:L,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:I,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.HTML?re(e,t):n===y.BODY?(e._insertElement(t,g.HTML),e.framesetOk=!1,e.insertionMode="IN_BODY_MODE"):n===y.FRAMESET?(e._insertElement(t,g.HTML),e.insertionMode="IN_FRAMESET_MODE"):n===y.BASE||n===y.BASEFONT||n===y.BGSOUND||n===y.LINK||n===y.META||n===y.NOFRAMES||n===y.SCRIPT||n===y.STYLE||n===y.TEMPLATE||n===y.TITLE?(e._err(h.abandonedHeadElementChild),e.openElements.push(e.headElement),U(e,t),e.openElements.remove(e.headElement)):n===y.HEAD?e._err(h.misplacedStartTagForHeadElement):K(e,t)},[r.END_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.BODY||n===y.HTML||n===y.BR?K(e,t):n===y.TEMPLATE?H(e,t):e._err(h.endTagWithoutMatchingOpenElement)},[r.EOF_TOKEN]:K},IN_BODY_MODE:{[r.CHARACTER_TOKEN]:Y,[r.NULL_CHARACTER_TOKEN]:k,[r.WHITESPACE_CHARACTER_TOKEN]:W,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:re,[r.END_TAG_TOKEN]:ae,[r.EOF_TOKEN]:le},TEXT_MODE:{[r.CHARACTER_TOKEN]:L,[r.NULL_CHARACTER_TOKEN]:L,[r.WHITESPACE_CHARACTER_TOKEN]:L,[r.COMMENT_TOKEN]:k,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:k,[r.END_TAG_TOKEN]:function(e,t){t.tagName===y.SCRIPT&&(e.pendingScript=e.openElements.current);e.openElements.pop(),e.insertionMode=e.originalInsertionMode},[r.EOF_TOKEN]:function(e,t){e._err(h.eofInElementThatCanContainOnlyText),e.openElements.pop(),e.insertionMode=e.originalInsertionMode,e._processToken(t)}},[b]:{[r.CHARACTER_TOKEN]:ce,[r.NULL_CHARACTER_TOKEN]:ce,[r.WHITESPACE_CHARACTER_TOKEN]:ce,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:ue,[r.END_TAG_TOKEN]:pe,[r.EOF_TOKEN]:le},IN_TABLE_TEXT_MODE:{[r.CHARACTER_TOKEN]:function(e,t){e.pendingCharacterTokens.push(t),e.hasNonWhitespacePendingCharacterToken=!0},[r.NULL_CHARACTER_TOKEN]:k,[r.WHITESPACE_CHARACTER_TOKEN]:function(e,t){e.pendingCharacterTokens.push(t)},[r.COMMENT_TOKEN]:he,[r.DOCTYPE_TOKEN]:he,[r.START_TAG_TOKEN]:he,[r.END_TAG_TOKEN]:he,[r.EOF_TOKEN]:he},IN_CAPTION_MODE:{[r.CHARACTER_TOKEN]:Y,[r.NULL_CHARACTER_TOKEN]:k,[r.WHITESPACE_CHARACTER_TOKEN]:W,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.CAPTION||n===y.COL||n===y.COLGROUP||n===y.TBODY||n===y.TD||n===y.TFOOT||n===y.TH||n===y.THEAD||n===y.TR?e.openElements.hasInTableScope(y.CAPTION)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(y.CAPTION),e.activeFormattingElements.clearToLastMarker(),e.insertionMode=b,e._processToken(t)):re(e,t)},[r.END_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.CAPTION||n===y.TABLE?e.openElements.hasInTableScope(y.CAPTION)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(y.CAPTION),e.activeFormattingElements.clearToLastMarker(),e.insertionMode=b,n===y.TABLE&&e._processToken(t)):n!==y.BODY&&n!==y.COL&&n!==y.COLGROUP&&n!==y.HTML&&n!==y.TBODY&&n!==y.TD&&n!==y.TFOOT&&n!==y.TH&&n!==y.THEAD&&n!==y.TR&&ae(e,t)},[r.EOF_TOKEN]:le},IN_COLUMN_GROUP_MODE:{[r.CHARACTER_TOKEN]:de,[r.NULL_CHARACTER_TOKEN]:de,[r.WHITESPACE_CHARACTER_TOKEN]:L,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.HTML?re(e,t):n===y.COL?(e._appendElement(t,g.HTML),t.ackSelfClosing=!0):n===y.TEMPLATE?U(e,t):de(e,t)},[r.END_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.COLGROUP?e.openElements.currentTagName===y.COLGROUP&&(e.openElements.pop(),e.insertionMode=b):n===y.TEMPLATE?H(e,t):n!==y.COL&&de(e,t)},[r.EOF_TOKEN]:le},IN_TABLE_BODY_MODE:{[r.CHARACTER_TOKEN]:ce,[r.NULL_CHARACTER_TOKEN]:ce,[r.WHITESPACE_CHARACTER_TOKEN]:ce,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.TR?(e.openElements.clearBackToTableBodyContext(),e._insertElement(t,g.HTML),e.insertionMode="IN_ROW_MODE"):n===y.TH||n===y.TD?(e.openElements.clearBackToTableBodyContext(),e._insertFakeElement(y.TR),e.insertionMode="IN_ROW_MODE",e._processToken(t)):n===y.CAPTION||n===y.COL||n===y.COLGROUP||n===y.TBODY||n===y.TFOOT||n===y.THEAD?e.openElements.hasTableBodyContextInTableScope()&&(e.openElements.clearBackToTableBodyContext(),e.openElements.pop(),e.insertionMode=b,e._processToken(t)):ue(e,t)},[r.END_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.TBODY||n===y.TFOOT||n===y.THEAD?e.openElements.hasInTableScope(n)&&(e.openElements.clearBackToTableBodyContext(),e.openElements.pop(),e.insertionMode=b):n===y.TABLE?e.openElements.hasTableBodyContextInTableScope()&&(e.openElements.clearBackToTableBodyContext(),e.openElements.pop(),e.insertionMode=b,e._processToken(t)):(n!==y.BODY&&n!==y.CAPTION&&n!==y.COL&&n!==y.COLGROUP||n!==y.HTML&&n!==y.TD&&n!==y.TH&&n!==y.TR)&&pe(e,t)},[r.EOF_TOKEN]:le},IN_ROW_MODE:{[r.CHARACTER_TOKEN]:ce,[r.NULL_CHARACTER_TOKEN]:ce,[r.WHITESPACE_CHARACTER_TOKEN]:ce,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.TH||n===y.TD?(e.openElements.clearBackToTableRowContext(),e._insertElement(t,g.HTML),e.insertionMode="IN_CELL_MODE",e.activeFormattingElements.insertMarker()):n===y.CAPTION||n===y.COL||n===y.COLGROUP||n===y.TBODY||n===y.TFOOT||n===y.THEAD||n===y.TR?e.openElements.hasInTableScope(y.TR)&&(e.openElements.clearBackToTableRowContext(),e.openElements.pop(),e.insertionMode="IN_TABLE_BODY_MODE",e._processToken(t)):ue(e,t)},[r.END_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.TR?e.openElements.hasInTableScope(y.TR)&&(e.openElements.clearBackToTableRowContext(),e.openElements.pop(),e.insertionMode="IN_TABLE_BODY_MODE"):n===y.TABLE?e.openElements.hasInTableScope(y.TR)&&(e.openElements.clearBackToTableRowContext(),e.openElements.pop(),e.insertionMode="IN_TABLE_BODY_MODE",e._processToken(t)):n===y.TBODY||n===y.TFOOT||n===y.THEAD?(e.openElements.hasInTableScope(n)||e.openElements.hasInTableScope(y.TR))&&(e.openElements.clearBackToTableRowContext(),e.openElements.pop(),e.insertionMode="IN_TABLE_BODY_MODE",e._processToken(t)):(n!==y.BODY&&n!==y.CAPTION&&n!==y.COL&&n!==y.COLGROUP||n!==y.HTML&&n!==y.TD&&n!==y.TH)&&pe(e,t)},[r.EOF_TOKEN]:le},IN_CELL_MODE:{[r.CHARACTER_TOKEN]:Y,[r.NULL_CHARACTER_TOKEN]:k,[r.WHITESPACE_CHARACTER_TOKEN]:W,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.CAPTION||n===y.COL||n===y.COLGROUP||n===y.TBODY||n===y.TD||n===y.TFOOT||n===y.TH||n===y.THEAD||n===y.TR?(e.openElements.hasInTableScope(y.TD)||e.openElements.hasInTableScope(y.TH))&&(e._closeTableCell(),e._processToken(t)):re(e,t)},[r.END_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.TD||n===y.TH?e.openElements.hasInTableScope(n)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(n),e.activeFormattingElements.clearToLastMarker(),e.insertionMode="IN_ROW_MODE"):n===y.TABLE||n===y.TBODY||n===y.TFOOT||n===y.THEAD||n===y.TR?e.openElements.hasInTableScope(n)&&(e._closeTableCell(),e._processToken(t)):n!==y.BODY&&n!==y.CAPTION&&n!==y.COL&&n!==y.COLGROUP&&n!==y.HTML&&ae(e,t)},[r.EOF_TOKEN]:le},IN_SELECT_MODE:{[r.CHARACTER_TOKEN]:L,[r.NULL_CHARACTER_TOKEN]:k,[r.WHITESPACE_CHARACTER_TOKEN]:L,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:me,[r.END_TAG_TOKEN]:ye,[r.EOF_TOKEN]:le},IN_SELECT_IN_TABLE_MODE:{[r.CHARACTER_TOKEN]:L,[r.NULL_CHARACTER_TOKEN]:k,[r.WHITESPACE_CHARACTER_TOKEN]:L,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.CAPTION||n===y.TABLE||n===y.TBODY||n===y.TFOOT||n===y.THEAD||n===y.TR||n===y.TD||n===y.TH?(e.openElements.popUntilTagNamePopped(y.SELECT),e._resetInsertionMode(),e._processToken(t)):me(e,t)},[r.END_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.CAPTION||n===y.TABLE||n===y.TBODY||n===y.TFOOT||n===y.THEAD||n===y.TR||n===y.TD||n===y.TH?e.openElements.hasInTableScope(n)&&(e.openElements.popUntilTagNamePopped(y.SELECT),e._resetInsertionMode(),e._processToken(t)):ye(e,t)},[r.EOF_TOKEN]:le},IN_TEMPLATE_MODE:{[r.CHARACTER_TOKEN]:Y,[r.NULL_CHARACTER_TOKEN]:k,[r.WHITESPACE_CHARACTER_TOKEN]:W,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;if(n===y.BASE||n===y.BASEFONT||n===y.BGSOUND||n===y.LINK||n===y.META||n===y.NOFRAMES||n===y.SCRIPT||n===y.STYLE||n===y.TEMPLATE||n===y.TITLE)U(e,t);else{const r=S[n]||"IN_BODY_MODE";e._popTmplInsertionMode(),e._pushTmplInsertionMode(r),e.insertionMode=r,e._processToken(t)}},[r.END_TAG_TOKEN]:function(e,t){t.tagName===y.TEMPLATE&&H(e,t)},[r.EOF_TOKEN]:ge},AFTER_BODY_MODE:{[r.CHARACTER_TOKEN]:Te,[r.NULL_CHARACTER_TOKEN]:Te,[r.WHITESPACE_CHARACTER_TOKEN]:W,[r.COMMENT_TOKEN]:function(e,t){e._appendCommentNode(t,e.openElements.items[0])},[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){t.tagName===y.HTML?re(e,t):Te(e,t)},[r.END_TAG_TOKEN]:function(e,t){t.tagName===y.HTML?e.fragmentContext||(e.insertionMode="AFTER_AFTER_BODY_MODE"):Te(e,t)},[r.EOF_TOKEN]:R},IN_FRAMESET_MODE:{[r.CHARACTER_TOKEN]:k,[r.NULL_CHARACTER_TOKEN]:k,[r.WHITESPACE_CHARACTER_TOKEN]:L,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.HTML?re(e,t):n===y.FRAMESET?e._insertElement(t,g.HTML):n===y.FRAME?(e._appendElement(t,g.HTML),t.ackSelfClosing=!0):n===y.NOFRAMES&&U(e,t)},[r.END_TAG_TOKEN]:function(e,t){t.tagName!==y.FRAMESET||e.openElements.isRootHtmlElementCurrent()||(e.openElements.pop(),e.fragmentContext||e.openElements.currentTagName===y.FRAMESET||(e.insertionMode="AFTER_FRAMESET_MODE"))},[r.EOF_TOKEN]:R},AFTER_FRAMESET_MODE:{[r.CHARACTER_TOKEN]:k,[r.NULL_CHARACTER_TOKEN]:k,[r.WHITESPACE_CHARACTER_TOKEN]:L,[r.COMMENT_TOKEN]:M,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.HTML?re(e,t):n===y.NOFRAMES&&U(e,t)},[r.END_TAG_TOKEN]:function(e,t){t.tagName===y.HTML&&(e.insertionMode="AFTER_AFTER_FRAMESET_MODE")},[r.EOF_TOKEN]:R},AFTER_AFTER_BODY_MODE:{[r.CHARACTER_TOKEN]:Ee,[r.NULL_CHARACTER_TOKEN]:Ee,[r.WHITESPACE_CHARACTER_TOKEN]:W,[r.COMMENT_TOKEN]:D,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){t.tagName===y.HTML?re(e,t):Ee(e,t)},[r.END_TAG_TOKEN]:Ee,[r.EOF_TOKEN]:R},AFTER_AFTER_FRAMESET_MODE:{[r.CHARACTER_TOKEN]:k,[r.NULL_CHARACTER_TOKEN]:k,[r.WHITESPACE_CHARACTER_TOKEN]:W,[r.COMMENT_TOKEN]:D,[r.DOCTYPE_TOKEN]:k,[r.START_TAG_TOKEN]:function(e,t){const n=t.tagName;n===y.HTML?re(e,t):n===y.NOFRAMES&&U(e,t)},[r.END_TAG_TOKEN]:k,[r.EOF_TOKEN]:R}};function x(e,t){let n=e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);return n?e.openElements.contains(n.element)?e.openElements.hasInScope(t.tagName)||(n=null):(e.activeFormattingElements.removeEntry(n),n=null):oe(e,t),n}function _(e,t){let n=null;for(let r=e.openElements.stackTop;r>=0;r--){const i=e.openElements.items[r];if(i===t.element)break;e._isSpecialElement(i)&&(n=i)}return n||(e.openElements.popUntilElementPopped(t.element),e.activeFormattingElements.removeEntry(t)),n}function P(e,t,n){let r=t,i=e.openElements.getCommonAncestor(t);for(let s=0,o=i;o!==n;s++,o=i){i=e.openElements.getCommonAncestor(o);const n=e.activeFormattingElements.getElementEntry(o),a=n&&s>=3;!n||a?(a&&e.activeFormattingElements.removeEntry(n),e.openElements.remove(o)):(o=O(e,n),r===t&&(e.activeFormattingElements.bookmark=n),e.treeAdapter.detachNode(r),e.treeAdapter.appendChild(o,r),r=o)}return r}function O(e,t){const n=e.treeAdapter.getNamespaceURI(t.element),r=e.treeAdapter.createElement(t.token.tagName,n,t.token.attrs);return e.openElements.replace(t.element,r),t.element=r,r}function w(e,t,n){if(e._isElementCausesFosterParenting(t))e._fosterParentElement(n);else{const r=e.treeAdapter.getTagName(t),i=e.treeAdapter.getNamespaceURI(t);r===y.TEMPLATE&&i===g.HTML&&(t=e.treeAdapter.getTemplateContent(t)),e.treeAdapter.appendChild(t,n)}}function C(e,t,n){const r=e.treeAdapter.getNamespaceURI(n.element),i=n.token,s=e.treeAdapter.createElement(i.tagName,r,i.attrs);e._adoptNodes(t,s),e.treeAdapter.appendChild(t,s),e.activeFormattingElements.insertElementAfterBookmark(s,n.token),e.activeFormattingElements.removeEntry(n),e.openElements.remove(n.element),e.openElements.insertAfter(t,s)}function N(e,t){let n;for(let r=0;r<8&&(n=x(e,t),n);r++){const t=_(e,n);if(!t)break;e.activeFormattingElements.bookmark=n;const r=P(e,t,n.element),i=e.openElements.getCommonAncestor(n.element);e.treeAdapter.detachNode(r),w(e,i,r),C(e,t,n)}}function k(){}function I(e){e._err(h.misplacedDoctype)}function M(e,t){e._appendCommentNode(t,e.openElements.currentTmplContent||e.openElements.current)}function D(e,t){e._appendCommentNode(t,e.document)}function L(e,t){e._insertCharacters(t)}function R(e){e.stopped=!0}function j(e,t){e._err(h.missingDoctype,{beforeToken:!0}),e.treeAdapter.setDocumentMode(e.document,m.DOCUMENT_MODE.QUIRKS),e.insertionMode="BEFORE_HTML_MODE",e._processToken(t)}function F(e,t){e._insertFakeRootElement(),e.insertionMode="BEFORE_HEAD_MODE",e._processToken(t)}function B(e,t){e._insertFakeElement(y.HEAD),e.headElement=e.openElements.current,e.insertionMode="IN_HEAD_MODE",e._processToken(t)}function U(e,t){const n=t.tagName;n===y.HTML?re(e,t):n===y.BASE||n===y.BASEFONT||n===y.BGSOUND||n===y.LINK||n===y.META?(e._appendElement(t,g.HTML),t.ackSelfClosing=!0):n===y.TITLE?e._switchToTextParsing(t,r.MODE.RCDATA):n===y.NOSCRIPT?e.options.scriptingEnabled?e._switchToTextParsing(t,r.MODE.RAWTEXT):(e._insertElement(t,g.HTML),e.insertionMode="IN_HEAD_NO_SCRIPT_MODE"):n===y.NOFRAMES||n===y.STYLE?e._switchToTextParsing(t,r.MODE.RAWTEXT):n===y.SCRIPT?e._switchToTextParsing(t,r.MODE.SCRIPT_DATA):n===y.TEMPLATE?(e._insertTemplate(t,g.HTML),e.activeFormattingElements.insertMarker(),e.framesetOk=!1,e.insertionMode="IN_TEMPLATE_MODE",e._pushTmplInsertionMode("IN_TEMPLATE_MODE")):n===y.HEAD?e._err(h.misplacedStartTagForHeadElement):G(e,t)}function H(e,t){const n=t.tagName;n===y.HEAD?(e.openElements.pop(),e.insertionMode="AFTER_HEAD_MODE"):n===y.BODY||n===y.BR||n===y.HTML?G(e,t):n===y.TEMPLATE&&e.openElements.tmplCount>0?(e.openElements.generateImpliedEndTagsThoroughly(),e.openElements.currentTagName!==y.TEMPLATE&&e._err(h.closingOfElementWithOpenChildElements),e.openElements.popUntilTagNamePopped(y.TEMPLATE),e.activeFormattingElements.clearToLastMarker(),e._popTmplInsertionMode(),e._resetInsertionMode()):e._err(h.endTagWithoutMatchingOpenElement)}function G(e,t){e.openElements.pop(),e.insertionMode="AFTER_HEAD_MODE",e._processToken(t)}function V(e,t){const n=t.type===r.EOF_TOKEN?h.openElementsLeftAfterEof:h.disallowedContentInNoscriptInHead;e._err(n),e.openElements.pop(),e.insertionMode="IN_HEAD_MODE",e._processToken(t)}function K(e,t){e._insertFakeElement(y.BODY),e.insertionMode="IN_BODY_MODE",e._processToken(t)}function W(e,t){e._reconstructActiveFormattingElements(),e._insertCharacters(t)}function Y(e,t){e._reconstructActiveFormattingElements(),e._insertCharacters(t),e.framesetOk=!1}function q(e,t){e.openElements.hasInButtonScope(y.P)&&e._closePElement(),e._insertElement(t,g.HTML)}function X(e,t){e.openElements.hasInButtonScope(y.P)&&e._closePElement(),e._insertElement(t,g.HTML),e.skipNextNewLine=!0,e.framesetOk=!1}function z(e,t){e._reconstructActiveFormattingElements(),e._insertElement(t,g.HTML),e.activeFormattingElements.pushElement(e.openElements.current,t)}function J(e,t){e._reconstructActiveFormattingElements(),e._insertElement(t,g.HTML),e.activeFormattingElements.insertMarker(),e.framesetOk=!1}function $(e,t){e._reconstructActiveFormattingElements(),e._appendElement(t,g.HTML),e.framesetOk=!1,t.ackSelfClosing=!0}function Q(e,t){e._appendElement(t,g.HTML),t.ackSelfClosing=!0}function Z(e,t){e._switchToTextParsing(t,r.MODE.RAWTEXT)}function ee(e,t){e.openElements.currentTagName===y.OPTION&&e.openElements.pop(),e._reconstructActiveFormattingElements(),e._insertElement(t,g.HTML)}function te(e,t){e.openElements.hasInScope(y.RUBY)&&e.openElements.generateImpliedEndTags(),e._insertElement(t,g.HTML)}function ne(e,t){e._reconstructActiveFormattingElements(),e._insertElement(t,g.HTML)}function re(e,t){const n=t.tagName;switch(n.length){case 1:n===y.I||n===y.S||n===y.B||n===y.U?z(e,t):n===y.P?q(e,t):n===y.A?function(e,t){const n=e.activeFormattingElements.getElementEntryInScopeWithTagName(y.A);n&&(N(e,t),e.openElements.remove(n.element),e.activeFormattingElements.removeEntry(n)),e._reconstructActiveFormattingElements(),e._insertElement(t,g.HTML),e.activeFormattingElements.pushElement(e.openElements.current,t)}(e,t):ne(e,t);break;case 2:n===y.DL||n===y.OL||n===y.UL?q(e,t):n===y.H1||n===y.H2||n===y.H3||n===y.H4||n===y.H5||n===y.H6?function(e,t){e.openElements.hasInButtonScope(y.P)&&e._closePElement();const n=e.openElements.currentTagName;n!==y.H1&&n!==y.H2&&n!==y.H3&&n!==y.H4&&n!==y.H5&&n!==y.H6||e.openElements.pop(),e._insertElement(t,g.HTML)}(e,t):n===y.LI||n===y.DD||n===y.DT?function(e,t){e.framesetOk=!1;const n=t.tagName;for(let r=e.openElements.stackTop;r>=0;r--){const t=e.openElements.items[r],i=e.treeAdapter.getTagName(t);let s=null;if(n===y.LI&&i===y.LI?s=y.LI:n!==y.DD&&n!==y.DT||i!==y.DD&&i!==y.DT||(s=i),s){e.openElements.generateImpliedEndTagsWithExclusion(s),e.openElements.popUntilTagNamePopped(s);break}if(i!==y.ADDRESS&&i!==y.DIV&&i!==y.P&&e._isSpecialElement(t))break}e.openElements.hasInButtonScope(y.P)&&e._closePElement(),e._insertElement(t,g.HTML)}(e,t):n===y.EM||n===y.TT?z(e,t):n===y.BR?$(e,t):n===y.HR?function(e,t){e.openElements.hasInButtonScope(y.P)&&e._closePElement(),e._appendElement(t,g.HTML),e.framesetOk=!1,t.ackSelfClosing=!0}(e,t):n===y.RB?te(e,t):n===y.RT||n===y.RP?function(e,t){e.openElements.hasInScope(y.RUBY)&&e.openElements.generateImpliedEndTagsWithExclusion(y.RTC),e._insertElement(t,g.HTML)}(e,t):n!==y.TH&&n!==y.TD&&n!==y.TR&&ne(e,t);break;case 3:n===y.DIV||n===y.DIR||n===y.NAV?q(e,t):n===y.PRE?X(e,t):n===y.BIG?z(e,t):n===y.IMG||n===y.WBR?$(e,t):n===y.XMP?function(e,t){e.openElements.hasInButtonScope(y.P)&&e._closePElement(),e._reconstructActiveFormattingElements(),e.framesetOk=!1,e._switchToTextParsing(t,r.MODE.RAWTEXT)}(e,t):n===y.SVG?function(e,t){e._reconstructActiveFormattingElements(),f.adjustTokenSVGAttrs(t),f.adjustTokenXMLAttrs(t),t.selfClosing?e._appendElement(t,g.SVG):e._insertElement(t,g.SVG),t.ackSelfClosing=!0}(e,t):n===y.RTC?te(e,t):n!==y.COL&&ne(e,t);break;case 4:n===y.HTML?function(e,t){0===e.openElements.tmplCount&&e.treeAdapter.adoptAttributes(e.openElements.items[0],t.attrs)}(e,t):n===y.BASE||n===y.LINK||n===y.META?U(e,t):n===y.BODY?function(e,t){const n=e.openElements.tryPeekProperlyNestedBodyElement();n&&0===e.openElements.tmplCount&&(e.framesetOk=!1,e.treeAdapter.adoptAttributes(n,t.attrs))}(e,t):n===y.MAIN||n===y.MENU?q(e,t):n===y.FORM?function(e,t){const n=e.openElements.tmplCount>0;e.formElement&&!n||(e.openElements.hasInButtonScope(y.P)&&e._closePElement(),e._insertElement(t,g.HTML),n||(e.formElement=e.openElements.current))}(e,t):n===y.CODE||n===y.FONT?z(e,t):n===y.NOBR?function(e,t){e._reconstructActiveFormattingElements(),e.openElements.hasInScope(y.NOBR)&&(N(e,t),e._reconstructActiveFormattingElements()),e._insertElement(t,g.HTML),e.activeFormattingElements.pushElement(e.openElements.current,t)}(e,t):n===y.AREA?$(e,t):n===y.MATH?function(e,t){e._reconstructActiveFormattingElements(),f.adjustTokenMathMLAttrs(t),f.adjustTokenXMLAttrs(t),t.selfClosing?e._appendElement(t,g.MATHML):e._insertElement(t,g.MATHML),t.ackSelfClosing=!0}(e,t):n===y.MENU?function(e,t){e.openElements.hasInButtonScope(y.P)&&e._closePElement(),e._insertElement(t,g.HTML)}(e,t):n!==y.HEAD&&ne(e,t);break;case 5:n===y.STYLE||n===y.TITLE?U(e,t):n===y.ASIDE?q(e,t):n===y.SMALL?z(e,t):n===y.TABLE?function(e,t){e.treeAdapter.getDocumentMode(e.document)!==m.DOCUMENT_MODE.QUIRKS&&e.openElements.hasInButtonScope(y.P)&&e._closePElement(),e._insertElement(t,g.HTML),e.framesetOk=!1,e.insertionMode=b}(e,t):n===y.EMBED?$(e,t):n===y.INPUT?function(e,t){e._reconstructActiveFormattingElements(),e._appendElement(t,g.HTML);const n=r.getTokenAttr(t,T.TYPE);n&&"hidden"===n.toLowerCase()||(e.framesetOk=!1),t.ackSelfClosing=!0}(e,t):n===y.PARAM||n===y.TRACK?Q(e,t):n===y.IMAGE?function(e,t){t.tagName=y.IMG,$(e,t)}(e,t):n!==y.FRAME&&n!==y.TBODY&&n!==y.TFOOT&&n!==y.THEAD&&ne(e,t);break;case 6:n===y.SCRIPT?U(e,t):n===y.CENTER||n===y.FIGURE||n===y.FOOTER||n===y.HEADER||n===y.HGROUP||n===y.DIALOG?q(e,t):n===y.BUTTON?function(e,t){e.openElements.hasInScope(y.BUTTON)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(y.BUTTON)),e._reconstructActiveFormattingElements(),e._insertElement(t,g.HTML),e.framesetOk=!1}(e,t):n===y.STRIKE||n===y.STRONG?z(e,t):n===y.APPLET||n===y.OBJECT?J(e,t):n===y.KEYGEN?$(e,t):n===y.SOURCE?Q(e,t):n===y.IFRAME?function(e,t){e.framesetOk=!1,e._switchToTextParsing(t,r.MODE.RAWTEXT)}(e,t):n===y.SELECT?function(e,t){e._reconstructActiveFormattingElements(),e._insertElement(t,g.HTML),e.framesetOk=!1,e.insertionMode===b||"IN_CAPTION_MODE"===e.insertionMode||"IN_TABLE_BODY_MODE"===e.insertionMode||"IN_ROW_MODE"===e.insertionMode||"IN_CELL_MODE"===e.insertionMode?e.insertionMode="IN_SELECT_IN_TABLE_MODE":e.insertionMode="IN_SELECT_MODE"}(e,t):n===y.OPTION?ee(e,t):ne(e,t);break;case 7:n===y.BGSOUND?U(e,t):n===y.DETAILS||n===y.ADDRESS||n===y.ARTICLE||n===y.SECTION||n===y.SUMMARY?q(e,t):n===y.LISTING?X(e,t):n===y.MARQUEE?J(e,t):n===y.NOEMBED?Z(e,t):n!==y.CAPTION&&ne(e,t);break;case 8:n===y.BASEFONT?U(e,t):n===y.FRAMESET?function(e,t){const n=e.openElements.tryPeekProperlyNestedBodyElement();e.framesetOk&&n&&(e.treeAdapter.detachNode(n),e.openElements.popAllUpToHtmlElement(),e._insertElement(t,g.HTML),e.insertionMode="IN_FRAMESET_MODE")}(e,t):n===y.FIELDSET?q(e,t):n===y.TEXTAREA?function(e,t){e._insertElement(t,g.HTML),e.skipNextNewLine=!0,e.tokenizer.state=r.MODE.RCDATA,e.originalInsertionMode=e.insertionMode,e.framesetOk=!1,e.insertionMode="TEXT_MODE"}(e,t):n===y.TEMPLATE?U(e,t):n===y.NOSCRIPT?e.options.scriptingEnabled?Z(e,t):ne(e,t):n===y.OPTGROUP?ee(e,t):n!==y.COLGROUP&&ne(e,t);break;case 9:n===y.PLAINTEXT?function(e,t){e.openElements.hasInButtonScope(y.P)&&e._closePElement(),e._insertElement(t,g.HTML),e.tokenizer.state=r.MODE.PLAINTEXT}(e,t):ne(e,t);break;case 10:n===y.BLOCKQUOTE||n===y.FIGCAPTION?q(e,t):ne(e,t);break;default:ne(e,t)}}function ie(e,t){const n=t.tagName;e.openElements.hasInScope(n)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(n))}function se(e,t){const n=t.tagName;e.openElements.hasInScope(n)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(n),e.activeFormattingElements.clearToLastMarker())}function oe(e,t){const n=t.tagName;for(let r=e.openElements.stackTop;r>0;r--){const t=e.openElements.items[r];if(e.treeAdapter.getTagName(t)===n){e.openElements.generateImpliedEndTagsWithExclusion(n),e.openElements.popUntilElementPopped(t);break}if(e._isSpecialElement(t))break}}function ae(e,t){const n=t.tagName;switch(n.length){case 1:n===y.A||n===y.B||n===y.I||n===y.S||n===y.U?N(e,t):n===y.P?function(e){e.openElements.hasInButtonScope(y.P)||e._insertFakeElement(y.P),e._closePElement()}(e):oe(e,t);break;case 2:n===y.DL||n===y.UL||n===y.OL?ie(e,t):n===y.LI?function(e){e.openElements.hasInListItemScope(y.LI)&&(e.openElements.generateImpliedEndTagsWithExclusion(y.LI),e.openElements.popUntilTagNamePopped(y.LI))}(e):n===y.DD||n===y.DT?function(e,t){const n=t.tagName;e.openElements.hasInScope(n)&&(e.openElements.generateImpliedEndTagsWithExclusion(n),e.openElements.popUntilTagNamePopped(n))}(e,t):n===y.H1||n===y.H2||n===y.H3||n===y.H4||n===y.H5||n===y.H6?function(e){e.openElements.hasNumberedHeaderInScope()&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilNumberedHeaderPopped())}(e):n===y.BR?function(e){e._reconstructActiveFormattingElements(),e._insertFakeElement(y.BR),e.openElements.pop(),e.framesetOk=!1}(e):n===y.EM||n===y.TT?N(e,t):oe(e,t);break;case 3:n===y.BIG?N(e,t):n===y.DIR||n===y.DIV||n===y.NAV||n===y.PRE?ie(e,t):oe(e,t);break;case 4:n===y.BODY?function(e){e.openElements.hasInScope(y.BODY)&&(e.insertionMode="AFTER_BODY_MODE")}(e):n===y.HTML?function(e,t){e.openElements.hasInScope(y.BODY)&&(e.insertionMode="AFTER_BODY_MODE",e._processToken(t))}(e,t):n===y.FORM?function(e){const t=e.openElements.tmplCount>0,n=e.formElement;t||(e.formElement=null),(n||t)&&e.openElements.hasInScope(y.FORM)&&(e.openElements.generateImpliedEndTags(),t?e.openElements.popUntilTagNamePopped(y.FORM):e.openElements.remove(n))}(e):n===y.CODE||n===y.FONT||n===y.NOBR?N(e,t):n===y.MAIN||n===y.MENU?ie(e,t):oe(e,t);break;case 5:n===y.ASIDE?ie(e,t):n===y.SMALL?N(e,t):oe(e,t);break;case 6:n===y.CENTER||n===y.FIGURE||n===y.FOOTER||n===y.HEADER||n===y.HGROUP||n===y.DIALOG?ie(e,t):n===y.APPLET||n===y.OBJECT?se(e,t):n===y.STRIKE||n===y.STRONG?N(e,t):oe(e,t);break;case 7:n===y.ADDRESS||n===y.ARTICLE||n===y.DETAILS||n===y.SECTION||n===y.SUMMARY||n===y.LISTING?ie(e,t):n===y.MARQUEE?se(e,t):oe(e,t);break;case 8:n===y.FIELDSET?ie(e,t):n===y.TEMPLATE?H(e,t):oe(e,t);break;case 10:n===y.BLOCKQUOTE||n===y.FIGCAPTION?ie(e,t):oe(e,t);break;default:oe(e,t)}}function le(e,t){e.tmplInsertionModeStackTop>-1?ge(e,t):e.stopped=!0}function ce(e,t){const n=e.openElements.currentTagName;n===y.TABLE||n===y.TBODY||n===y.TFOOT||n===y.THEAD||n===y.TR?(e.pendingCharacterTokens=[],e.hasNonWhitespacePendingCharacterToken=!1,e.originalInsertionMode=e.insertionMode,e.insertionMode="IN_TABLE_TEXT_MODE",e._processToken(t)):fe(e,t)}function ue(e,t){const n=t.tagName;switch(n.length){case 2:n===y.TD||n===y.TH||n===y.TR?function(e,t){e.openElements.clearBackToTableContext(),e._insertFakeElement(y.TBODY),e.insertionMode="IN_TABLE_BODY_MODE",e._processToken(t)}(e,t):fe(e,t);break;case 3:n===y.COL?function(e,t){e.openElements.clearBackToTableContext(),e._insertFakeElement(y.COLGROUP),e.insertionMode="IN_COLUMN_GROUP_MODE",e._processToken(t)}(e,t):fe(e,t);break;case 4:n===y.FORM?function(e,t){e.formElement||0!==e.openElements.tmplCount||(e._insertElement(t,g.HTML),e.formElement=e.openElements.current,e.openElements.pop())}(e,t):fe(e,t);break;case 5:n===y.TABLE?function(e,t){e.openElements.hasInTableScope(y.TABLE)&&(e.openElements.popUntilTagNamePopped(y.TABLE),e._resetInsertionMode(),e._processToken(t))}(e,t):n===y.STYLE?U(e,t):n===y.TBODY||n===y.TFOOT||n===y.THEAD?function(e,t){e.openElements.clearBackToTableContext(),e._insertElement(t,g.HTML),e.insertionMode="IN_TABLE_BODY_MODE"}(e,t):n===y.INPUT?function(e,t){const n=r.getTokenAttr(t,T.TYPE);n&&"hidden"===n.toLowerCase()?e._appendElement(t,g.HTML):fe(e,t),t.ackSelfClosing=!0}(e,t):fe(e,t);break;case 6:n===y.SCRIPT?U(e,t):fe(e,t);break;case 7:n===y.CAPTION?function(e,t){e.openElements.clearBackToTableContext(),e.activeFormattingElements.insertMarker(),e._insertElement(t,g.HTML),e.insertionMode="IN_CAPTION_MODE"}(e,t):fe(e,t);break;case 8:n===y.COLGROUP?function(e,t){e.openElements.clearBackToTableContext(),e._insertElement(t,g.HTML),e.insertionMode="IN_COLUMN_GROUP_MODE"}(e,t):n===y.TEMPLATE?U(e,t):fe(e,t);break;default:fe(e,t)}}function pe(e,t){const n=t.tagName;n===y.TABLE?e.openElements.hasInTableScope(y.TABLE)&&(e.openElements.popUntilTagNamePopped(y.TABLE),e._resetInsertionMode()):n===y.TEMPLATE?H(e,t):n!==y.BODY&&n!==y.CAPTION&&n!==y.COL&&n!==y.COLGROUP&&n!==y.HTML&&n!==y.TBODY&&n!==y.TD&&n!==y.TFOOT&&n!==y.TH&&n!==y.THEAD&&n!==y.TR&&fe(e,t)}function fe(e,t){const n=e.fosterParentingEnabled;e.fosterParentingEnabled=!0,e._processTokenInBodyMode(t),e.fosterParentingEnabled=n}function he(e,t){let n=0;if(e.hasNonWhitespacePendingCharacterToken)for(;n<e.pendingCharacterTokens.length;n++)fe(e,e.pendingCharacterTokens[n]);else for(;n<e.pendingCharacterTokens.length;n++)e._insertCharacters(e.pendingCharacterTokens[n]);e.insertionMode=e.originalInsertionMode,e._processToken(t)}function de(e,t){e.openElements.currentTagName===y.COLGROUP&&(e.openElements.pop(),e.insertionMode=b,e._processToken(t))}function me(e,t){const n=t.tagName;n===y.HTML?re(e,t):n===y.OPTION?(e.openElements.currentTagName===y.OPTION&&e.openElements.pop(),e._insertElement(t,g.HTML)):n===y.OPTGROUP?(e.openElements.currentTagName===y.OPTION&&e.openElements.pop(),e.openElements.currentTagName===y.OPTGROUP&&e.openElements.pop(),e._insertElement(t,g.HTML)):n===y.INPUT||n===y.KEYGEN||n===y.TEXTAREA||n===y.SELECT?e.openElements.hasInSelectScope(y.SELECT)&&(e.openElements.popUntilTagNamePopped(y.SELECT),e._resetInsertionMode(),n!==y.SELECT&&e._processToken(t)):n!==y.SCRIPT&&n!==y.TEMPLATE||U(e,t)}function ye(e,t){const n=t.tagName;if(n===y.OPTGROUP){const t=e.openElements.items[e.openElements.stackTop-1],n=t&&e.treeAdapter.getTagName(t);e.openElements.currentTagName===y.OPTION&&n===y.OPTGROUP&&e.openElements.pop(),e.openElements.currentTagName===y.OPTGROUP&&e.openElements.pop()}else n===y.OPTION?e.openElements.currentTagName===y.OPTION&&e.openElements.pop():n===y.SELECT&&e.openElements.hasInSelectScope(y.SELECT)?(e.openElements.popUntilTagNamePopped(y.SELECT),e._resetInsertionMode()):n===y.TEMPLATE&&H(e,t)}function ge(e,t){e.openElements.tmplCount>0?(e.openElements.popUntilTagNamePopped(y.TEMPLATE),e.activeFormattingElements.clearToLastMarker(),e._popTmplInsertionMode(),e._resetInsertionMode(),e._processToken(t)):e.stopped=!0}function Te(e,t){e.insertionMode="IN_BODY_MODE",e._processToken(t)}function Ee(e,t){e.insertionMode="IN_BODY_MODE",e._processToken(t)}e.exports=class{constructor(e){this.options=u(E,e),this.treeAdapter=this.options.treeAdapter,this.pendingScript=null,this.options.sourceCodeLocationInfo&&l.install(this,o),this.options.onParseError&&l.install(this,a,{onParseError:this.options.onParseError})}parse(e){const t=this.treeAdapter.createDocument();return this._bootstrap(t,null),this.tokenizer.write(e,!0),this._runParsingLoop(null),t}parseFragment(e,t){t||(t=this.treeAdapter.createElement(y.TEMPLATE,g.HTML,[]));const n=this.treeAdapter.createElement("documentmock",g.HTML,[]);this._bootstrap(n,t),this.treeAdapter.getTagName(t)===y.TEMPLATE&&this._pushTmplInsertionMode("IN_TEMPLATE_MODE"),this._initTokenizerForFragmentParsing(),this._insertFakeRootElement(),this._resetInsertionMode(),this._findFormInFragmentContext(),this.tokenizer.write(e,!0),this._runParsingLoop(null);const r=this.treeAdapter.getFirstChild(n),i=this.treeAdapter.createDocumentFragment();return this._adoptNodes(r,i),i}_bootstrap(e,t){this.tokenizer=new r(this.options),this.stopped=!1,this.insertionMode="INITIAL_MODE",this.originalInsertionMode="",this.document=e,this.fragmentContext=t,this.headElement=null,this.formElement=null,this.openElements=new i(this.document,this.treeAdapter),this.activeFormattingElements=new s(this.treeAdapter),this.tmplInsertionModeStack=[],this.tmplInsertionModeStackTop=-1,this.currentTmplInsertionMode=null,this.pendingCharacterTokens=[],this.hasNonWhitespacePendingCharacterToken=!1,this.framesetOk=!0,this.skipNextNewLine=!1,this.fosterParentingEnabled=!1}_err(){}_runParsingLoop(e){for(;!this.stopped;){this._setupTokenizerCDATAMode();const t=this.tokenizer.getNextToken();if(t.type===r.HIBERNATION_TOKEN)break;if(this.skipNextNewLine&&(this.skipNextNewLine=!1,t.type===r.WHITESPACE_CHARACTER_TOKEN&&"\n"===t.chars[0])){if(1===t.chars.length)continue;t.chars=t.chars.substr(1)}if(this._processInputToken(t),e&&this.pendingScript)break}}runParsingLoopForCurrentChunk(e,t){if(this._runParsingLoop(t),t&&this.pendingScript){const e=this.pendingScript;return this.pendingScript=null,void t(e)}e&&e()}_setupTokenizerCDATAMode(){const e=this._getAdjustedCurrentElement();this.tokenizer.allowCDATA=e&&e!==this.document&&this.treeAdapter.getNamespaceURI(e)!==g.HTML&&!this._isIntegrationPoint(e)}_switchToTextParsing(e,t){this._insertElement(e,g.HTML),this.tokenizer.state=t,this.originalInsertionMode=this.insertionMode,this.insertionMode="TEXT_MODE"}switchToPlaintextParsing(){this.insertionMode="TEXT_MODE",this.originalInsertionMode="IN_BODY_MODE",this.tokenizer.state=r.MODE.PLAINTEXT}_getAdjustedCurrentElement(){return 0===this.openElements.stackTop&&this.fragmentContext?this.fragmentContext:this.openElements.current}_findFormInFragmentContext(){let e=this.fragmentContext;do{if(this.treeAdapter.getTagName(e)===y.FORM){this.formElement=e;break}e=this.treeAdapter.getParentNode(e)}while(e)}_initTokenizerForFragmentParsing(){if(this.treeAdapter.getNamespaceURI(this.fragmentContext)===g.HTML){const e=this.treeAdapter.getTagName(this.fragmentContext);e===y.TITLE||e===y.TEXTAREA?this.tokenizer.state=r.MODE.RCDATA:e===y.STYLE||e===y.XMP||e===y.IFRAME||e===y.NOEMBED||e===y.NOFRAMES||e===y.NOSCRIPT?this.tokenizer.state=r.MODE.RAWTEXT:e===y.SCRIPT?this.tokenizer.state=r.MODE.SCRIPT_DATA:e===y.PLAINTEXT&&(this.tokenizer.state=r.MODE.PLAINTEXT)}}_setDocumentType(e){const t=e.name||"",n=e.publicId||"",r=e.systemId||"";this.treeAdapter.setDocumentType(this.document,t,n,r)}_attachElementToTree(e){if(this._shouldFosterParentOnInsertion())this._fosterParentElement(e);else{const t=this.openElements.currentTmplContent||this.openElements.current;this.treeAdapter.appendChild(t,e)}}_appendElement(e,t){const n=this.treeAdapter.createElement(e.tagName,t,e.attrs);this._attachElementToTree(n)}_insertElement(e,t){const n=this.treeAdapter.createElement(e.tagName,t,e.attrs);this._attachElementToTree(n),this.openElements.push(n)}_insertFakeElement(e){const t=this.treeAdapter.createElement(e,g.HTML,[]);this._attachElementToTree(t),this.openElements.push(t)}_insertTemplate(e){const t=this.treeAdapter.createElement(e.tagName,g.HTML,e.attrs),n=this.treeAdapter.createDocumentFragment();this.treeAdapter.setTemplateContent(t,n),this._attachElementToTree(t),this.openElements.push(t)}_insertFakeRootElement(){const e=this.treeAdapter.createElement(y.HTML,g.HTML,[]);this.treeAdapter.appendChild(this.openElements.current,e),this.openElements.push(e)}_appendCommentNode(e,t){const n=this.treeAdapter.createCommentNode(e.data);this.treeAdapter.appendChild(t,n)}_insertCharacters(e){if(this._shouldFosterParentOnInsertion())this._fosterParentText(e.chars);else{const t=this.openElements.currentTmplContent||this.openElements.current;this.treeAdapter.insertText(t,e.chars)}}_adoptNodes(e,t){for(let n=this.treeAdapter.getFirstChild(e);n;n=this.treeAdapter.getFirstChild(e))this.treeAdapter.detachNode(n),this.treeAdapter.appendChild(t,n)}_shouldProcessTokenInForeignContent(e){const t=this._getAdjustedCurrentElement();if(!t||t===this.document)return!1;const n=this.treeAdapter.getNamespaceURI(t);if(n===g.HTML)return!1;if(this.treeAdapter.getTagName(t)===y.ANNOTATION_XML&&n===g.MATHML&&e.type===r.START_TAG_TOKEN&&e.tagName===y.SVG)return!1;const i=e.type===r.CHARACTER_TOKEN||e.type===r.NULL_CHARACTER_TOKEN||e.type===r.WHITESPACE_CHARACTER_TOKEN;return(!(e.type===r.START_TAG_TOKEN&&e.tagName!==y.MGLYPH&&e.tagName!==y.MALIGNMARK)&&!i||!this._isIntegrationPoint(t,g.MATHML))&&((e.type!==r.START_TAG_TOKEN&&!i||!this._isIntegrationPoint(t,g.HTML))&&e.type!==r.EOF_TOKEN)}_processToken(e){A[this.insertionMode][e.type](this,e)}_processTokenInBodyMode(e){A.IN_BODY_MODE[e.type](this,e)}_processTokenInForeignContent(e){e.type===r.CHARACTER_TOKEN?function(e,t){e._insertCharacters(t),e.framesetOk=!1}(this,e):e.type===r.NULL_CHARACTER_TOKEN?function(e,t){t.chars=d.REPLACEMENT_CHARACTER,e._insertCharacters(t)}(this,e):e.type===r.WHITESPACE_CHARACTER_TOKEN?L(this,e):e.type===r.COMMENT_TOKEN?M(this,e):e.type===r.START_TAG_TOKEN?function(e,t){if(f.causesExit(t)&&!e.fragmentContext){for(;e.treeAdapter.getNamespaceURI(e.openElements.current)!==g.HTML&&!e._isIntegrationPoint(e.openElements.current);)e.openElements.pop();e._processToken(t)}else{const n=e._getAdjustedCurrentElement(),r=e.treeAdapter.getNamespaceURI(n);r===g.MATHML?f.adjustTokenMathMLAttrs(t):r===g.SVG&&(f.adjustTokenSVGTagName(t),f.adjustTokenSVGAttrs(t)),f.adjustTokenXMLAttrs(t),t.selfClosing?e._appendElement(t,r):e._insertElement(t,r),t.ackSelfClosing=!0}}(this,e):e.type===r.END_TAG_TOKEN&&function(e,t){for(let n=e.openElements.stackTop;n>0;n--){const r=e.openElements.items[n];if(e.treeAdapter.getNamespaceURI(r)===g.HTML){e._processToken(t);break}if(e.treeAdapter.getTagName(r).toLowerCase()===t.tagName){e.openElements.popUntilElementPopped(r);break}}}(this,e)}_processInputToken(e){this._shouldProcessTokenInForeignContent(e)?this._processTokenInForeignContent(e):this._processToken(e),e.type===r.START_TAG_TOKEN&&e.selfClosing&&!e.ackSelfClosing&&this._err(h.nonVoidHtmlElementStartTagWithTrailingSolidus)}_isIntegrationPoint(e,t){const n=this.treeAdapter.getTagName(e),r=this.treeAdapter.getNamespaceURI(e),i=this.treeAdapter.getAttrList(e);return f.isIntegrationPoint(n,r,i,t)}_reconstructActiveFormattingElements(){const e=this.activeFormattingElements.length;if(e){let t=e,n=null;do{if(t--,n=this.activeFormattingElements.entries[t],n.type===s.MARKER_ENTRY||this.openElements.contains(n.element)){t++;break}}while(t>0);for(let r=t;r<e;r++)n=this.activeFormattingElements.entries[r],this._insertElement(n.token,this.treeAdapter.getNamespaceURI(n.element)),n.element=this.openElements.current}}_closeTableCell(){this.openElements.generateImpliedEndTags(),this.openElements.popUntilTableCellPopped(),this.activeFormattingElements.clearToLastMarker(),this.insertionMode="IN_ROW_MODE"}_closePElement(){this.openElements.generateImpliedEndTagsWithExclusion(y.P),this.openElements.popUntilTagNamePopped(y.P)}_resetInsertionMode(){for(let e=this.openElements.stackTop,t=!1;e>=0;e--){let n=this.openElements.items[e];0===e&&(t=!0,this.fragmentContext&&(n=this.fragmentContext));const r=this.treeAdapter.getTagName(n),i=v[r];if(i){this.insertionMode=i;break}if(!(t||r!==y.TD&&r!==y.TH)){this.insertionMode="IN_CELL_MODE";break}if(!t&&r===y.HEAD){this.insertionMode="IN_HEAD_MODE";break}if(r===y.SELECT){this._resetInsertionModeForSelect(e);break}if(r===y.TEMPLATE){this.insertionMode=this.currentTmplInsertionMode;break}if(r===y.HTML){this.insertionMode=this.headElement?"AFTER_HEAD_MODE":"BEFORE_HEAD_MODE";break}if(t){this.insertionMode="IN_BODY_MODE";break}}}_resetInsertionModeForSelect(e){if(e>0)for(let t=e-1;t>0;t--){const e=this.openElements.items[t],n=this.treeAdapter.getTagName(e);if(n===y.TEMPLATE)break;if(n===y.TABLE)return void(this.insertionMode="IN_SELECT_IN_TABLE_MODE")}this.insertionMode="IN_SELECT_MODE"}_pushTmplInsertionMode(e){this.tmplInsertionModeStack.push(e),this.tmplInsertionModeStackTop++,this.currentTmplInsertionMode=e}_popTmplInsertionMode(){this.tmplInsertionModeStack.pop(),this.tmplInsertionModeStackTop--,this.currentTmplInsertionMode=this.tmplInsertionModeStack[this.tmplInsertionModeStackTop]}_isElementCausesFosterParenting(e){const t=this.treeAdapter.getTagName(e);return t===y.TABLE||t===y.TBODY||t===y.TFOOT||t===y.THEAD||t===y.TR}_shouldFosterParentOnInsertion(){return this.fosterParentingEnabled&&this._isElementCausesFosterParenting(this.openElements.current)}_findFosterParentingLocation(){const e={parent:null,beforeElement:null};for(let t=this.openElements.stackTop;t>=0;t--){const n=this.openElements.items[t],r=this.treeAdapter.getTagName(n),i=this.treeAdapter.getNamespaceURI(n);if(r===y.TEMPLATE&&i===g.HTML){e.parent=this.treeAdapter.getTemplateContent(n);break}if(r===y.TABLE){e.parent=this.treeAdapter.getParentNode(n),e.parent?e.beforeElement=n:e.parent=this.openElements.items[t-1];break}}return e.parent||(e.parent=this.openElements.items[0]),e}_fosterParentElement(e){const t=this._findFosterParentingLocation();t.beforeElement?this.treeAdapter.insertBefore(t.parent,e,t.beforeElement):this.treeAdapter.appendChild(t.parent,e)}_fosterParentText(e){const t=this._findFosterParentingLocation();t.beforeElement?this.treeAdapter.insertTextBefore(t.parent,e,t.beforeElement):this.treeAdapter.insertText(t.parent,e)}_isSpecialElement(e){const t=this.treeAdapter.getTagName(e),n=this.treeAdapter.getNamespaceURI(e);return m.SPECIAL_ELEMENTS[n][t]}}},function(e,t,n){"use strict";const r=n(125),i=n(126),s=r.CODE_POINTS;e.exports=class{constructor(){this.html=null,this.pos=-1,this.lastGapPos=-1,this.lastCharPos=-1,this.gapStack=[],this.skipNextNewLine=!1,this.lastChunkWritten=!1,this.endOfChunkHit=!1,this.bufferWaterline=65536}_err(){}_addGap(){this.gapStack.push(this.lastGapPos),this.lastGapPos=this.pos}_processSurrogate(e){if(this.pos!==this.lastCharPos){const t=this.html.charCodeAt(this.pos+1);if(r.isSurrogatePair(t))return this.pos++,this._addGap(),r.getSurrogatePairCodePoint(e,t)}else if(!this.lastChunkWritten)return this.endOfChunkHit=!0,s.EOF;return this._err(i.surrogateInInputStream),e}dropParsedChunk(){this.pos>this.bufferWaterline&&(this.lastCharPos-=this.pos,this.html=this.html.substring(this.pos),this.pos=0,this.lastGapPos=-1,this.gapStack=[])}write(e,t){this.html?this.html+=e:this.html=e,this.lastCharPos=this.html.length-1,this.endOfChunkHit=!1,this.lastChunkWritten=t}insertHtmlAtCurrentPos(e){this.html=this.html.substring(0,this.pos+1)+e+this.html.substring(this.pos+1,this.html.length),this.lastCharPos=this.html.length-1,this.endOfChunkHit=!1}advance(){if(this.pos++,this.pos>this.lastCharPos)return this.endOfChunkHit=!this.lastChunkWritten,s.EOF;let e=this.html.charCodeAt(this.pos);if(this.skipNextNewLine&&e===s.LINE_FEED)return this.skipNextNewLine=!1,this._addGap(),this.advance();if(e===s.CARRIAGE_RETURN)return this.skipNextNewLine=!0,s.LINE_FEED;this.skipNextNewLine=!1,r.isSurrogate(e)&&(e=this._processSurrogate(e));return e>31&&e<127||e===s.LINE_FEED||e===s.CARRIAGE_RETURN||e>159&&e<64976||this._checkForProblematicCharacters(e),e}_checkForProblematicCharacters(e){r.isControlCodePoint(e)?this._err(i.controlCharacterInInputStream):r.isUndefinedCodePoint(e)&&this._err(i.noncharacterInInputStream)}retreat(){this.pos===this.lastGapPos&&(this.lastGapPos=this.gapStack.pop(),this.pos--),this.pos--}}},function(e,t,n){"use strict";e.exports=new Uint16Array([4,52,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,106,303,412,810,1432,1701,1796,1987,2114,2360,2420,2484,3170,3251,4140,4393,4575,4610,5106,5512,5728,6117,6274,6315,6345,6427,6516,7002,7910,8733,9323,9870,10170,10631,10893,11318,11386,11467,12773,13092,14474,14922,15448,15542,16419,17666,18166,18611,19004,19095,19298,19397,4,16,69,77,97,98,99,102,103,108,109,110,111,112,114,115,116,117,140,150,158,169,176,194,199,210,216,222,226,242,256,266,283,294,108,105,103,5,198,1,59,148,1,198,80,5,38,1,59,156,1,38,99,117,116,101,5,193,1,59,167,1,193,114,101,118,101,59,1,258,4,2,105,121,182,191,114,99,5,194,1,59,189,1,194,59,1,1040,114,59,3,55349,56580,114,97,118,101,5,192,1,59,208,1,192,112,104,97,59,1,913,97,99,114,59,1,256,100,59,1,10835,4,2,103,112,232,237,111,110,59,1,260,102,59,3,55349,56632,112,108,121,70,117,110,99,116,105,111,110,59,1,8289,105,110,103,5,197,1,59,264,1,197,4,2,99,115,272,277,114,59,3,55349,56476,105,103,110,59,1,8788,105,108,100,101,5,195,1,59,292,1,195,109,108,5,196,1,59,301,1,196,4,8,97,99,101,102,111,114,115,117,321,350,354,383,388,394,400,405,4,2,99,114,327,336,107,115,108,97,115,104,59,1,8726,4,2,118,119,342,345,59,1,10983,101,100,59,1,8966,121,59,1,1041,4,3,99,114,116,362,369,379,97,117,115,101,59,1,8757,110,111,117,108,108,105,115,59,1,8492,97,59,1,914,114,59,3,55349,56581,112,102,59,3,55349,56633,101,118,101,59,1,728,99,114,59,1,8492,109,112,101,113,59,1,8782,4,14,72,79,97,99,100,101,102,104,105,108,111,114,115,117,442,447,456,504,542,547,569,573,577,616,678,784,790,796,99,121,59,1,1063,80,89,5,169,1,59,454,1,169,4,3,99,112,121,464,470,497,117,116,101,59,1,262,4,2,59,105,476,478,1,8914,116,97,108,68,105,102,102,101,114,101,110,116,105,97,108,68,59,1,8517,108,101,121,115,59,1,8493,4,4,97,101,105,111,514,520,530,535,114,111,110,59,1,268,100,105,108,5,199,1,59,528,1,199,114,99,59,1,264,110,105,110,116,59,1,8752,111,116,59,1,266,4,2,100,110,553,560,105,108,108,97,59,1,184,116,101,114,68,111,116,59,1,183,114,59,1,8493,105,59,1,935,114,99,108,101,4,4,68,77,80,84,591,596,603,609,111,116,59,1,8857,105,110,117,115,59,1,8854,108,117,115,59,1,8853,105,109,101,115,59,1,8855,111,4,2,99,115,623,646,107,119,105,115,101,67,111,110,116,111,117,114,73,110,116,101,103,114,97,108,59,1,8754,101,67,117,114,108,121,4,2,68,81,658,671,111,117,98,108,101,81,117,111,116,101,59,1,8221,117,111,116,101,59,1,8217,4,4,108,110,112,117,688,701,736,753,111,110,4,2,59,101,696,698,1,8759,59,1,10868,4,3,103,105,116,709,717,722,114,117,101,110,116,59,1,8801,110,116,59,1,8751,111,117,114,73,110,116,101,103,114,97,108,59,1,8750,4,2,102,114,742,745,59,1,8450,111,100,117,99,116,59,1,8720,110,116,101,114,67,108,111,99,107,119,105,115,101,67,111,110,116,111,117,114,73,110,116,101,103,114,97,108,59,1,8755,111,115,115,59,1,10799,99,114,59,3,55349,56478,112,4,2,59,67,803,805,1,8915,97,112,59,1,8781,4,11,68,74,83,90,97,99,101,102,105,111,115,834,850,855,860,865,888,903,916,921,1011,1415,4,2,59,111,840,842,1,8517,116,114,97,104,100,59,1,10513,99,121,59,1,1026,99,121,59,1,1029,99,121,59,1,1039,4,3,103,114,115,873,879,883,103,101,114,59,1,8225,114,59,1,8609,104,118,59,1,10980,4,2,97,121,894,900,114,111,110,59,1,270,59,1,1044,108,4,2,59,116,910,912,1,8711,97,59,1,916,114,59,3,55349,56583,4,2,97,102,927,998,4,2,99,109,933,992,114,105,116,105,99,97,108,4,4,65,68,71,84,950,957,978,985,99,117,116,101,59,1,180,111,4,2,116,117,964,967,59,1,729,98,108,101,65,99,117,116,101,59,1,733,114,97,118,101,59,1,96,105,108,100,101,59,1,732,111,110,100,59,1,8900,102,101,114,101,110,116,105,97,108,68,59,1,8518,4,4,112,116,117,119,1021,1026,1048,1249,102,59,3,55349,56635,4,3,59,68,69,1034,1036,1041,1,168,111,116,59,1,8412,113,117,97,108,59,1,8784,98,108,101,4,6,67,68,76,82,85,86,1065,1082,1101,1189,1211,1236,111,110,116,111,117,114,73,110,116,101,103,114,97,108,59,1,8751,111,4,2,116,119,1089,1092,59,1,168,110,65,114,114,111,119,59,1,8659,4,2,101,111,1107,1141,102,116,4,3,65,82,84,1117,1124,1136,114,114,111,119,59,1,8656,105,103,104,116,65,114,114,111,119,59,1,8660,101,101,59,1,10980,110,103,4,2,76,82,1149,1177,101,102,116,4,2,65,82,1158,1165,114,114,111,119,59,1,10232,105,103,104,116,65,114,114,111,119,59,1,10234,105,103,104,116,65,114,114,111,119,59,1,10233,105,103,104,116,4,2,65,84,1199,1206,114,114,111,119,59,1,8658,101,101,59,1,8872,112,4,2,65,68,1218,1225,114,114,111,119,59,1,8657,111,119,110,65,114,114,111,119,59,1,8661,101,114,116,105,99,97,108,66,97,114,59,1,8741,110,4,6,65,66,76,82,84,97,1264,1292,1299,1352,1391,1408,114,114,111,119,4,3,59,66,85,1276,1278,1283,1,8595,97,114,59,1,10515,112,65,114,114,111,119,59,1,8693,114,101,118,101,59,1,785,101,102,116,4,3,82,84,86,1310,1323,1334,105,103,104,116,86,101,99,116,111,114,59,1,10576,101,101,86,101,99,116,111,114,59,1,10590,101,99,116,111,114,4,2,59,66,1345,1347,1,8637,97,114,59,1,10582,105,103,104,116,4,2,84,86,1362,1373,101,101,86,101,99,116,111,114,59,1,10591,101,99,116,111,114,4,2,59,66,1384,1386,1,8641,97,114,59,1,10583,101,101,4,2,59,65,1399,1401,1,8868,114,114,111,119,59,1,8615,114,114,111,119,59,1,8659,4,2,99,116,1421,1426,114,59,3,55349,56479,114,111,107,59,1,272,4,16,78,84,97,99,100,102,103,108,109,111,112,113,115,116,117,120,1466,1470,1478,1489,1515,1520,1525,1536,1544,1593,1609,1617,1650,1664,1668,1677,71,59,1,330,72,5,208,1,59,1476,1,208,99,117,116,101,5,201,1,59,1487,1,201,4,3,97,105,121,1497,1503,1512,114,111,110,59,1,282,114,99,5,202,1,59,1510,1,202,59,1,1069,111,116,59,1,278,114,59,3,55349,56584,114,97,118,101,5,200,1,59,1534,1,200,101,109,101,110,116,59,1,8712,4,2,97,112,1550,1555,99,114,59,1,274,116,121,4,2,83,86,1563,1576,109,97,108,108,83,113,117,97,114,101,59,1,9723,101,114,121,83,109,97,108,108,83,113,117,97,114,101,59,1,9643,4,2,103,112,1599,1604,111,110,59,1,280,102,59,3,55349,56636,115,105,108,111,110,59,1,917,117,4,2,97,105,1624,1640,108,4,2,59,84,1631,1633,1,10869,105,108,100,101,59,1,8770,108,105,98,114,105,117,109,59,1,8652,4,2,99,105,1656,1660,114,59,1,8496,109,59,1,10867,97,59,1,919,109,108,5,203,1,59,1675,1,203,4,2,105,112,1683,1689,115,116,115,59,1,8707,111,110,101,110,116,105,97,108,69,59,1,8519,4,5,99,102,105,111,115,1713,1717,1722,1762,1791,121,59,1,1060,114,59,3,55349,56585,108,108,101,100,4,2,83,86,1732,1745,109,97,108,108,83,113,117,97,114,101,59,1,9724,101,114,121,83,109,97,108,108,83,113,117,97,114,101,59,1,9642,4,3,112,114,117,1770,1775,1781,102,59,3,55349,56637,65,108,108,59,1,8704,114,105,101,114,116,114,102,59,1,8497,99,114,59,1,8497,4,12,74,84,97,98,99,100,102,103,111,114,115,116,1822,1827,1834,1848,1855,1877,1882,1887,1890,1896,1978,1984,99,121,59,1,1027,5,62,1,59,1832,1,62,109,109,97,4,2,59,100,1843,1845,1,915,59,1,988,114,101,118,101,59,1,286,4,3,101,105,121,1863,1869,1874,100,105,108,59,1,290,114,99,59,1,284,59,1,1043,111,116,59,1,288,114,59,3,55349,56586,59,1,8921,112,102,59,3,55349,56638,101,97,116,101,114,4,6,69,70,71,76,83,84,1915,1933,1944,1953,1959,1971,113,117,97,108,4,2,59,76,1925,1927,1,8805,101,115,115,59,1,8923,117,108,108,69,113,117,97,108,59,1,8807,114,101,97,116,101,114,59,1,10914,101,115,115,59,1,8823,108,97,110,116,69,113,117,97,108,59,1,10878,105,108,100,101,59,1,8819,99,114,59,3,55349,56482,59,1,8811,4,8,65,97,99,102,105,111,115,117,2005,2012,2026,2032,2036,2049,2073,2089,82,68,99,121,59,1,1066,4,2,99,116,2018,2023,101,107,59,1,711,59,1,94,105,114,99,59,1,292,114,59,1,8460,108,98,101,114,116,83,112,97,99,101,59,1,8459,4,2,112,114,2055,2059,102,59,1,8461,105,122,111,110,116,97,108,76,105,110,101,59,1,9472,4,2,99,116,2079,2083,114,59,1,8459,114,111,107,59,1,294,109,112,4,2,68,69,2097,2107,111,119,110,72,117,109,112,59,1,8782,113,117,97,108,59,1,8783,4,14,69,74,79,97,99,100,102,103,109,110,111,115,116,117,2144,2149,2155,2160,2171,2189,2194,2198,2209,2245,2307,2329,2334,2341,99,121,59,1,1045,108,105,103,59,1,306,99,121,59,1,1025,99,117,116,101,5,205,1,59,2169,1,205,4,2,105,121,2177,2186,114,99,5,206,1,59,2184,1,206,59,1,1048,111,116,59,1,304,114,59,1,8465,114,97,118,101,5,204,1,59,2207,1,204,4,3,59,97,112,2217,2219,2238,1,8465,4,2,99,103,2225,2229,114,59,1,298,105,110,97,114,121,73,59,1,8520,108,105,101,115,59,1,8658,4,2,116,118,2251,2281,4,2,59,101,2257,2259,1,8748,4,2,103,114,2265,2271,114,97,108,59,1,8747,115,101,99,116,105,111,110,59,1,8898,105,115,105,98,108,101,4,2,67,84,2293,2300,111,109,109,97,59,1,8291,105,109,101,115,59,1,8290,4,3,103,112,116,2315,2320,2325,111,110,59,1,302,102,59,3,55349,56640,97,59,1,921,99,114,59,1,8464,105,108,100,101,59,1,296,4,2,107,109,2347,2352,99,121,59,1,1030,108,5,207,1,59,2358,1,207,4,5,99,102,111,115,117,2372,2386,2391,2397,2414,4,2,105,121,2378,2383,114,99,59,1,308,59,1,1049,114,59,3,55349,56589,112,102,59,3,55349,56641,4,2,99,101,2403,2408,114,59,3,55349,56485,114,99,121,59,1,1032,107,99,121,59,1,1028,4,7,72,74,97,99,102,111,115,2436,2441,2446,2452,2467,2472,2478,99,121,59,1,1061,99,121,59,1,1036,112,112,97,59,1,922,4,2,101,121,2458,2464,100,105,108,59,1,310,59,1,1050,114,59,3,55349,56590,112,102,59,3,55349,56642,99,114,59,3,55349,56486,4,11,74,84,97,99,101,102,108,109,111,115,116,2508,2513,2520,2562,2585,2981,2986,3004,3011,3146,3167,99,121,59,1,1033,5,60,1,59,2518,1,60,4,5,99,109,110,112,114,2532,2538,2544,2548,2558,117,116,101,59,1,313,98,100,97,59,1,923,103,59,1,10218,108,97,99,101,116,114,102,59,1,8466,114,59,1,8606,4,3,97,101,121,2570,2576,2582,114,111,110,59,1,317,100,105,108,59,1,315,59,1,1051,4,2,102,115,2591,2907,116,4,10,65,67,68,70,82,84,85,86,97,114,2614,2663,2672,2728,2735,2760,2820,2870,2888,2895,4,2,110,114,2620,2633,103,108,101,66,114,97,99,107,101,116,59,1,10216,114,111,119,4,3,59,66,82,2644,2646,2651,1,8592,97,114,59,1,8676,105,103,104,116,65,114,114,111,119,59,1,8646,101,105,108,105,110,103,59,1,8968,111,4,2,117,119,2679,2692,98,108,101,66,114,97,99,107,101,116,59,1,10214,110,4,2,84,86,2699,2710,101,101,86,101,99,116,111,114,59,1,10593,101,99,116,111,114,4,2,59,66,2721,2723,1,8643,97,114,59,1,10585,108,111,111,114,59,1,8970,105,103,104,116,4,2,65,86,2745,2752,114,114,111,119,59,1,8596,101,99,116,111,114,59,1,10574,4,2,101,114,2766,2792,101,4,3,59,65,86,2775,2777,2784,1,8867,114,114,111,119,59,1,8612,101,99,116,111,114,59,1,10586,105,97,110,103,108,101,4,3,59,66,69,2806,2808,2813,1,8882,97,114,59,1,10703,113,117,97,108,59,1,8884,112,4,3,68,84,86,2829,2841,2852,111,119,110,86,101,99,116,111,114,59,1,10577,101,101,86,101,99,116,111,114,59,1,10592,101,99,116,111,114,4,2,59,66,2863,2865,1,8639,97,114,59,1,10584,101,99,116,111,114,4,2,59,66,2881,2883,1,8636,97,114,59,1,10578,114,114,111,119,59,1,8656,105,103,104,116,97,114,114,111,119,59,1,8660,115,4,6,69,70,71,76,83,84,2922,2936,2947,2956,2962,2974,113,117,97,108,71,114,101,97,116,101,114,59,1,8922,117,108,108,69,113,117,97,108,59,1,8806,114,101,97,116,101,114,59,1,8822,101,115,115,59,1,10913,108,97,110,116,69,113,117,97,108,59,1,10877,105,108,100,101,59,1,8818,114,59,3,55349,56591,4,2,59,101,2992,2994,1,8920,102,116,97,114,114,111,119,59,1,8666,105,100,111,116,59,1,319,4,3,110,112,119,3019,3110,3115,103,4,4,76,82,108,114,3030,3058,3070,3098,101,102,116,4,2,65,82,3039,3046,114,114,111,119,59,1,10229,105,103,104,116,65,114,114,111,119,59,1,10231,105,103,104,116,65,114,114,111,119,59,1,10230,101,102,116,4,2,97,114,3079,3086,114,114,111,119,59,1,10232,105,103,104,116,97,114,114,111,119,59,1,10234,105,103,104,116,97,114,114,111,119,59,1,10233,102,59,3,55349,56643,101,114,4,2,76,82,3123,3134,101,102,116,65,114,114,111,119,59,1,8601,105,103,104,116,65,114,114,111,119,59,1,8600,4,3,99,104,116,3154,3158,3161,114,59,1,8466,59,1,8624,114,111,107,59,1,321,59,1,8810,4,8,97,99,101,102,105,111,115,117,3188,3192,3196,3222,3227,3237,3243,3248,112,59,1,10501,121,59,1,1052,4,2,100,108,3202,3213,105,117,109,83,112,97,99,101,59,1,8287,108,105,110,116,114,102,59,1,8499,114,59,3,55349,56592,110,117,115,80,108,117,115,59,1,8723,112,102,59,3,55349,56644,99,114,59,1,8499,59,1,924,4,9,74,97,99,101,102,111,115,116,117,3271,3276,3283,3306,3422,3427,4120,4126,4137,99,121,59,1,1034,99,117,116,101,59,1,323,4,3,97,101,121,3291,3297,3303,114,111,110,59,1,327,100,105,108,59,1,325,59,1,1053,4,3,103,115,119,3314,3380,3415,97,116,105,118,101,4,3,77,84,86,3327,3340,3365,101,100,105,117,109,83,112,97,99,101,59,1,8203,104,105,4,2,99,110,3348,3357,107,83,112,97,99,101,59,1,8203,83,112,97,99,101,59,1,8203,101,114,121,84,104,105,110,83,112,97,99,101,59,1,8203,116,101,100,4,2,71,76,3389,3405,114,101,97,116,101,114,71,114,101,97,116,101,114,59,1,8811,101,115,115,76,101,115,115,59,1,8810,76,105,110,101,59,1,10,114,59,3,55349,56593,4,4,66,110,112,116,3437,3444,3460,3464,114,101,97,107,59,1,8288,66,114,101,97,107,105,110,103,83,112,97,99,101,59,1,160,102,59,1,8469,4,13,59,67,68,69,71,72,76,78,80,82,83,84,86,3492,3494,3517,3536,3578,3657,3685,3784,3823,3860,3915,4066,4107,1,10988,4,2,111,117,3500,3510,110,103,114,117,101,110,116,59,1,8802,112,67,97,112,59,1,8813,111,117,98,108,101,86,101,114,116,105,99,97,108,66,97,114,59,1,8742,4,3,108,113,120,3544,3552,3571,101,109,101,110,116,59,1,8713,117,97,108,4,2,59,84,3561,3563,1,8800,105,108,100,101,59,3,8770,824,105,115,116,115,59,1,8708,114,101,97,116,101,114,4,7,59,69,70,71,76,83,84,3600,3602,3609,3621,3631,3637,3650,1,8815,113,117,97,108,59,1,8817,117,108,108,69,113,117,97,108,59,3,8807,824,114,101,97,116,101,114,59,3,8811,824,101,115,115,59,1,8825,108,97,110,116,69,113,117,97,108,59,3,10878,824,105,108,100,101,59,1,8821,117,109,112,4,2,68,69,3666,3677,111,119,110,72,117,109,112,59,3,8782,824,113,117,97,108,59,3,8783,824,101,4,2,102,115,3692,3724,116,84,114,105,97,110,103,108,101,4,3,59,66,69,3709,3711,3717,1,8938,97,114,59,3,10703,824,113,117,97,108,59,1,8940,115,4,6,59,69,71,76,83,84,3739,3741,3748,3757,3764,3777,1,8814,113,117,97,108,59,1,8816,114,101,97,116,101,114,59,1,8824,101,115,115,59,3,8810,824,108,97,110,116,69,113,117,97,108,59,3,10877,824,105,108,100,101,59,1,8820,101,115,116,101,100,4,2,71,76,3795,3812,114,101,97,116,101,114,71,114,101,97,116,101,114,59,3,10914,824,101,115,115,76,101,115,115,59,3,10913,824,114,101,99,101,100,101,115,4,3,59,69,83,3838,3840,3848,1,8832,113,117,97,108,59,3,10927,824,108,97,110,116,69,113,117,97,108,59,1,8928,4,2,101,105,3866,3881,118,101,114,115,101,69,108,101,109,101,110,116,59,1,8716,103,104,116,84,114,105,97,110,103,108,101,4,3,59,66,69,3900,3902,3908,1,8939,97,114,59,3,10704,824,113,117,97,108,59,1,8941,4,2,113,117,3921,3973,117,97,114,101,83,117,4,2,98,112,3933,3952,115,101,116,4,2,59,69,3942,3945,3,8847,824,113,117,97,108,59,1,8930,101,114,115,101,116,4,2,59,69,3963,3966,3,8848,824,113,117,97,108,59,1,8931,4,3,98,99,112,3981,4e3,4045,115,101,116,4,2,59,69,3990,3993,3,8834,8402,113,117,97,108,59,1,8840,99,101,101,100,115,4,4,59,69,83,84,4015,4017,4025,4037,1,8833,113,117,97,108,59,3,10928,824,108,97,110,116,69,113,117,97,108,59,1,8929,105,108,100,101,59,3,8831,824,101,114,115,101,116,4,2,59,69,4056,4059,3,8835,8402,113,117,97,108,59,1,8841,105,108,100,101,4,4,59,69,70,84,4080,4082,4089,4100,1,8769,113,117,97,108,59,1,8772,117,108,108,69,113,117,97,108,59,1,8775,105,108,100,101,59,1,8777,101,114,116,105,99,97,108,66,97,114,59,1,8740,99,114,59,3,55349,56489,105,108,100,101,5,209,1,59,4135,1,209,59,1,925,4,14,69,97,99,100,102,103,109,111,112,114,115,116,117,118,4170,4176,4187,4205,4212,4217,4228,4253,4259,4292,4295,4316,4337,4346,108,105,103,59,1,338,99,117,116,101,5,211,1,59,4185,1,211,4,2,105,121,4193,4202,114,99,5,212,1,59,4200,1,212,59,1,1054,98,108,97,99,59,1,336,114,59,3,55349,56594,114,97,118,101,5,210,1,59,4226,1,210,4,3,97,101,105,4236,4241,4246,99,114,59,1,332,103,97,59,1,937,99,114,111,110,59,1,927,112,102,59,3,55349,56646,101,110,67,117,114,108,121,4,2,68,81,4272,4285,111,117,98,108,101,81,117,111,116,101,59,1,8220,117,111,116,101,59,1,8216,59,1,10836,4,2,99,108,4301,4306,114,59,3,55349,56490,97,115,104,5,216,1,59,4314,1,216,105,4,2,108,109,4323,4332,100,101,5,213,1,59,4330,1,213,101,115,59,1,10807,109,108,5,214,1,59,4344,1,214,101,114,4,2,66,80,4354,4380,4,2,97,114,4360,4364,114,59,1,8254,97,99,4,2,101,107,4372,4375,59,1,9182,101,116,59,1,9140,97,114,101,110,116,104,101,115,105,115,59,1,9180,4,9,97,99,102,104,105,108,111,114,115,4413,4422,4426,4431,4435,4438,4448,4471,4561,114,116,105,97,108,68,59,1,8706,121,59,1,1055,114,59,3,55349,56595,105,59,1,934,59,1,928,117,115,77,105,110,117,115,59,1,177,4,2,105,112,4454,4467,110,99,97,114,101,112,108,97,110,101,59,1,8460,102,59,1,8473,4,4,59,101,105,111,4481,4483,4526,4531,1,10939,99,101,100,101,115,4,4,59,69,83,84,4498,4500,4507,4519,1,8826,113,117,97,108,59,1,10927,108,97,110,116,69,113,117,97,108,59,1,8828,105,108,100,101,59,1,8830,109,101,59,1,8243,4,2,100,112,4537,4543,117,99,116,59,1,8719,111,114,116,105,111,110,4,2,59,97,4555,4557,1,8759,108,59,1,8733,4,2,99,105,4567,4572,114,59,3,55349,56491,59,1,936,4,4,85,102,111,115,4585,4594,4599,4604,79,84,5,34,1,59,4592,1,34,114,59,3,55349,56596,112,102,59,1,8474,99,114,59,3,55349,56492,4,12,66,69,97,99,101,102,104,105,111,114,115,117,4636,4642,4650,4681,4704,4763,4767,4771,5047,5069,5081,5094,97,114,114,59,1,10512,71,5,174,1,59,4648,1,174,4,3,99,110,114,4658,4664,4668,117,116,101,59,1,340,103,59,1,10219,114,4,2,59,116,4675,4677,1,8608,108,59,1,10518,4,3,97,101,121,4689,4695,4701,114,111,110,59,1,344,100,105,108,59,1,342,59,1,1056,4,2,59,118,4710,4712,1,8476,101,114,115,101,4,2,69,85,4722,4748,4,2,108,113,4728,4736,101,109,101,110,116,59,1,8715,117,105,108,105,98,114,105,117,109,59,1,8651,112,69,113,117,105,108,105,98,114,105,117,109,59,1,10607,114,59,1,8476,111,59,1,929,103,104,116,4,8,65,67,68,70,84,85,86,97,4792,4840,4849,4905,4912,4972,5022,5040,4,2,110,114,4798,4811,103,108,101,66,114,97,99,107,101,116,59,1,10217,114,111,119,4,3,59,66,76,4822,4824,4829,1,8594,97,114,59,1,8677,101,102,116,65,114,114,111,119,59,1,8644,101,105,108,105,110,103,59,1,8969,111,4,2,117,119,4856,4869,98,108,101,66,114,97,99,107,101,116,59,1,10215,110,4,2,84,86,4876,4887,101,101,86,101,99,116,111,114,59,1,10589,101,99,116,111,114,4,2,59,66,4898,4900,1,8642,97,114,59,1,10581,108,111,111,114,59,1,8971,4,2,101,114,4918,4944,101,4,3,59,65,86,4927,4929,4936,1,8866,114,114,111,119,59,1,8614,101,99,116,111,114,59,1,10587,105,97,110,103,108,101,4,3,59,66,69,4958,4960,4965,1,8883,97,114,59,1,10704,113,117,97,108,59,1,8885,112,4,3,68,84,86,4981,4993,5004,111,119,110,86,101,99,116,111,114,59,1,10575,101,101,86,101,99,116,111,114,59,1,10588,101,99,116,111,114,4,2,59,66,5015,5017,1,8638,97,114,59,1,10580,101,99,116,111,114,4,2,59,66,5033,5035,1,8640,97,114,59,1,10579,114,114,111,119,59,1,8658,4,2,112,117,5053,5057,102,59,1,8477,110,100,73,109,112,108,105,101,115,59,1,10608,105,103,104,116,97,114,114,111,119,59,1,8667,4,2,99,104,5087,5091,114,59,1,8475,59,1,8625,108,101,68,101,108,97,121,101,100,59,1,10740,4,13,72,79,97,99,102,104,105,109,111,113,115,116,117,5134,5150,5157,5164,5198,5203,5259,5265,5277,5283,5374,5380,5385,4,2,67,99,5140,5146,72,99,121,59,1,1065,121,59,1,1064,70,84,99,121,59,1,1068,99,117,116,101,59,1,346,4,5,59,97,101,105,121,5176,5178,5184,5190,5195,1,10940,114,111,110,59,1,352,100,105,108,59,1,350,114,99,59,1,348,59,1,1057,114,59,3,55349,56598,111,114,116,4,4,68,76,82,85,5216,5227,5238,5250,111,119,110,65,114,114,111,119,59,1,8595,101,102,116,65,114,114,111,119,59,1,8592,105,103,104,116,65,114,114,111,119,59,1,8594,112,65,114,114,111,119,59,1,8593,103,109,97,59,1,931,97,108,108,67,105,114,99,108,101,59,1,8728,112,102,59,3,55349,56650,4,2,114,117,5289,5293,116,59,1,8730,97,114,101,4,4,59,73,83,85,5306,5308,5322,5367,1,9633,110,116,101,114,115,101,99,116,105,111,110,59,1,8851,117,4,2,98,112,5329,5347,115,101,116,4,2,59,69,5338,5340,1,8847,113,117,97,108,59,1,8849,101,114,115,101,116,4,2,59,69,5358,5360,1,8848,113,117,97,108,59,1,8850,110,105,111,110,59,1,8852,99,114,59,3,55349,56494,97,114,59,1,8902,4,4,98,99,109,112,5395,5420,5475,5478,4,2,59,115,5401,5403,1,8912,101,116,4,2,59,69,5411,5413,1,8912,113,117,97,108,59,1,8838,4,2,99,104,5426,5468,101,101,100,115,4,4,59,69,83,84,5440,5442,5449,5461,1,8827,113,117,97,108,59,1,10928,108,97,110,116,69,113,117,97,108,59,1,8829,105,108,100,101,59,1,8831,84,104,97,116,59,1,8715,59,1,8721,4,3,59,101,115,5486,5488,5507,1,8913,114,115,101,116,4,2,59,69,5498,5500,1,8835,113,117,97,108,59,1,8839,101,116,59,1,8913,4,11,72,82,83,97,99,102,104,105,111,114,115,5536,5546,5552,5567,5579,5602,5607,5655,5695,5701,5711,79,82,78,5,222,1,59,5544,1,222,65,68,69,59,1,8482,4,2,72,99,5558,5563,99,121,59,1,1035,121,59,1,1062,4,2,98,117,5573,5576,59,1,9,59,1,932,4,3,97,101,121,5587,5593,5599,114,111,110,59,1,356,100,105,108,59,1,354,59,1,1058,114,59,3,55349,56599,4,2,101,105,5613,5631,4,2,114,116,5619,5627,101,102,111,114,101,59,1,8756,97,59,1,920,4,2,99,110,5637,5647,107,83,112,97,99,101,59,3,8287,8202,83,112,97,99,101,59,1,8201,108,100,101,4,4,59,69,70,84,5668,5670,5677,5688,1,8764,113,117,97,108,59,1,8771,117,108,108,69,113,117,97,108,59,1,8773,105,108,100,101,59,1,8776,112,102,59,3,55349,56651,105,112,108,101,68,111,116,59,1,8411,4,2,99,116,5717,5722,114,59,3,55349,56495,114,111,107,59,1,358,4,14,97,98,99,100,102,103,109,110,111,112,114,115,116,117,5758,5789,5805,5823,5830,5835,5846,5852,5921,5937,6089,6095,6101,6108,4,2,99,114,5764,5774,117,116,101,5,218,1,59,5772,1,218,114,4,2,59,111,5781,5783,1,8607,99,105,114,59,1,10569,114,4,2,99,101,5796,5800,121,59,1,1038,118,101,59,1,364,4,2,105,121,5811,5820,114,99,5,219,1,59,5818,1,219,59,1,1059,98,108,97,99,59,1,368,114,59,3,55349,56600,114,97,118,101,5,217,1,59,5844,1,217,97,99,114,59,1,362,4,2,100,105,5858,5905,101,114,4,2,66,80,5866,5892,4,2,97,114,5872,5876,114,59,1,95,97,99,4,2,101,107,5884,5887,59,1,9183,101,116,59,1,9141,97,114,101,110,116,104,101,115,105,115,59,1,9181,111,110,4,2,59,80,5913,5915,1,8899,108,117,115,59,1,8846,4,2,103,112,5927,5932,111,110,59,1,370,102,59,3,55349,56652,4,8,65,68,69,84,97,100,112,115,5955,5985,5996,6009,6026,6033,6044,6075,114,114,111,119,4,3,59,66,68,5967,5969,5974,1,8593,97,114,59,1,10514,111,119,110,65,114,114,111,119,59,1,8645,111,119,110,65,114,114,111,119,59,1,8597,113,117,105,108,105,98,114,105,117,109,59,1,10606,101,101,4,2,59,65,6017,6019,1,8869,114,114,111,119,59,1,8613,114,114,111,119,59,1,8657,111,119,110,97,114,114,111,119,59,1,8661,101,114,4,2,76,82,6052,6063,101,102,116,65,114,114,111,119,59,1,8598,105,103,104,116,65,114,114,111,119,59,1,8599,105,4,2,59,108,6082,6084,1,978,111,110,59,1,933,105,110,103,59,1,366,99,114,59,3,55349,56496,105,108,100,101,59,1,360,109,108,5,220,1,59,6115,1,220,4,9,68,98,99,100,101,102,111,115,118,6137,6143,6148,6152,6166,6250,6255,6261,6267,97,115,104,59,1,8875,97,114,59,1,10987,121,59,1,1042,97,115,104,4,2,59,108,6161,6163,1,8873,59,1,10982,4,2,101,114,6172,6175,59,1,8897,4,3,98,116,121,6183,6188,6238,97,114,59,1,8214,4,2,59,105,6194,6196,1,8214,99,97,108,4,4,66,76,83,84,6209,6214,6220,6231,97,114,59,1,8739,105,110,101,59,1,124,101,112,97,114,97,116,111,114,59,1,10072,105,108,100,101,59,1,8768,84,104,105,110,83,112,97,99,101,59,1,8202,114,59,3,55349,56601,112,102,59,3,55349,56653,99,114,59,3,55349,56497,100,97,115,104,59,1,8874,4,5,99,101,102,111,115,6286,6292,6298,6303,6309,105,114,99,59,1,372,100,103,101,59,1,8896,114,59,3,55349,56602,112,102,59,3,55349,56654,99,114,59,3,55349,56498,4,4,102,105,111,115,6325,6330,6333,6339,114,59,3,55349,56603,59,1,926,112,102,59,3,55349,56655,99,114,59,3,55349,56499,4,9,65,73,85,97,99,102,111,115,117,6365,6370,6375,6380,6391,6405,6410,6416,6422,99,121,59,1,1071,99,121,59,1,1031,99,121,59,1,1070,99,117,116,101,5,221,1,59,6389,1,221,4,2,105,121,6397,6402,114,99,59,1,374,59,1,1067,114,59,3,55349,56604,112,102,59,3,55349,56656,99,114,59,3,55349,56500,109,108,59,1,376,4,8,72,97,99,100,101,102,111,115,6445,6450,6457,6472,6477,6501,6505,6510,99,121,59,1,1046,99,117,116,101,59,1,377,4,2,97,121,6463,6469,114,111,110,59,1,381,59,1,1047,111,116,59,1,379,4,2,114,116,6483,6497,111,87,105,100,116,104,83,112,97,99,101,59,1,8203,97,59,1,918,114,59,1,8488,112,102,59,1,8484,99,114,59,3,55349,56501,4,16,97,98,99,101,102,103,108,109,110,111,112,114,115,116,117,119,6550,6561,6568,6612,6622,6634,6645,6672,6699,6854,6870,6923,6933,6963,6974,6983,99,117,116,101,5,225,1,59,6559,1,225,114,101,118,101,59,1,259,4,6,59,69,100,105,117,121,6582,6584,6588,6591,6600,6609,1,8766,59,3,8766,819,59,1,8767,114,99,5,226,1,59,6598,1,226,116,101,5,180,1,59,6607,1,180,59,1,1072,108,105,103,5,230,1,59,6620,1,230,4,2,59,114,6628,6630,1,8289,59,3,55349,56606,114,97,118,101,5,224,1,59,6643,1,224,4,2,101,112,6651,6667,4,2,102,112,6657,6663,115,121,109,59,1,8501,104,59,1,8501,104,97,59,1,945,4,2,97,112,6678,6692,4,2,99,108,6684,6688,114,59,1,257,103,59,1,10815,5,38,1,59,6697,1,38,4,2,100,103,6705,6737,4,5,59,97,100,115,118,6717,6719,6724,6727,6734,1,8743,110,100,59,1,10837,59,1,10844,108,111,112,101,59,1,10840,59,1,10842,4,7,59,101,108,109,114,115,122,6753,6755,6758,6762,6814,6835,6848,1,8736,59,1,10660,101,59,1,8736,115,100,4,2,59,97,6770,6772,1,8737,4,8,97,98,99,100,101,102,103,104,6790,6793,6796,6799,6802,6805,6808,6811,59,1,10664,59,1,10665,59,1,10666,59,1,10667,59,1,10668,59,1,10669,59,1,10670,59,1,10671,116,4,2,59,118,6821,6823,1,8735,98,4,2,59,100,6830,6832,1,8894,59,1,10653,4,2,112,116,6841,6845,104,59,1,8738,59,1,197,97,114,114,59,1,9084,4,2,103,112,6860,6865,111,110,59,1,261,102,59,3,55349,56658,4,7,59,69,97,101,105,111,112,6886,6888,6891,6897,6900,6904,6908,1,8776,59,1,10864,99,105,114,59,1,10863,59,1,8778,100,59,1,8779,115,59,1,39,114,111,120,4,2,59,101,6917,6919,1,8776,113,59,1,8778,105,110,103,5,229,1,59,6931,1,229,4,3,99,116,121,6941,6946,6949,114,59,3,55349,56502,59,1,42,109,112,4,2,59,101,6957,6959,1,8776,113,59,1,8781,105,108,100,101,5,227,1,59,6972,1,227,109,108,5,228,1,59,6981,1,228,4,2,99,105,6989,6997,111,110,105,110,116,59,1,8755,110,116,59,1,10769,4,16,78,97,98,99,100,101,102,105,107,108,110,111,112,114,115,117,7036,7041,7119,7135,7149,7155,7219,7224,7347,7354,7463,7489,7786,7793,7814,7866,111,116,59,1,10989,4,2,99,114,7047,7094,107,4,4,99,101,112,115,7058,7064,7073,7080,111,110,103,59,1,8780,112,115,105,108,111,110,59,1,1014,114,105,109,101,59,1,8245,105,109,4,2,59,101,7088,7090,1,8765,113,59,1,8909,4,2,118,119,7100,7105,101,101,59,1,8893,101,100,4,2,59,103,7113,7115,1,8965,101,59,1,8965,114,107,4,2,59,116,7127,7129,1,9141,98,114,107,59,1,9142,4,2,111,121,7141,7146,110,103,59,1,8780,59,1,1073,113,117,111,59,1,8222,4,5,99,109,112,114,116,7167,7181,7188,7193,7199,97,117,115,4,2,59,101,7176,7178,1,8757,59,1,8757,112,116,121,118,59,1,10672,115,105,59,1,1014,110,111,117,59,1,8492,4,3,97,104,119,7207,7210,7213,59,1,946,59,1,8502,101,101,110,59,1,8812,114,59,3,55349,56607,103,4,7,99,111,115,116,117,118,119,7241,7262,7288,7305,7328,7335,7340,4,3,97,105,117,7249,7253,7258,112,59,1,8898,114,99,59,1,9711,112,59,1,8899,4,3,100,112,116,7270,7275,7281,111,116,59,1,10752,108,117,115,59,1,10753,105,109,101,115,59,1,10754,4,2,113,116,7294,7300,99,117,112,59,1,10758,97,114,59,1,9733,114,105,97,110,103,108,101,4,2,100,117,7318,7324,111,119,110,59,1,9661,112,59,1,9651,112,108,117,115,59,1,10756,101,101,59,1,8897,101,100,103,101,59,1,8896,97,114,111,119,59,1,10509,4,3,97,107,111,7362,7436,7458,4,2,99,110,7368,7432,107,4,3,108,115,116,7377,7386,7394,111,122,101,110,103,101,59,1,10731,113,117,97,114,101,59,1,9642,114,105,97,110,103,108,101,4,4,59,100,108,114,7411,7413,7419,7425,1,9652,111,119,110,59,1,9662,101,102,116,59,1,9666,105,103,104,116,59,1,9656,107,59,1,9251,4,2,49,51,7442,7454,4,2,50,52,7448,7451,59,1,9618,59,1,9617,52,59,1,9619,99,107,59,1,9608,4,2,101,111,7469,7485,4,2,59,113,7475,7478,3,61,8421,117,105,118,59,3,8801,8421,116,59,1,8976,4,4,112,116,119,120,7499,7504,7517,7523,102,59,3,55349,56659,4,2,59,116,7510,7512,1,8869,111,109,59,1,8869,116,105,101,59,1,8904,4,12,68,72,85,86,98,100,104,109,112,116,117,118,7549,7571,7597,7619,7655,7660,7682,7708,7715,7721,7728,7750,4,4,76,82,108,114,7559,7562,7565,7568,59,1,9559,59,1,9556,59,1,9558,59,1,9555,4,5,59,68,85,100,117,7583,7585,7588,7591,7594,1,9552,59,1,9574,59,1,9577,59,1,9572,59,1,9575,4,4,76,82,108,114,7607,7610,7613,7616,59,1,9565,59,1,9562,59,1,9564,59,1,9561,4,7,59,72,76,82,104,108,114,7635,7637,7640,7643,7646,7649,7652,1,9553,59,1,9580,59,1,9571,59,1,9568,59,1,9579,59,1,9570,59,1,9567,111,120,59,1,10697,4,4,76,82,108,114,7670,7673,7676,7679,59,1,9557,59,1,9554,59,1,9488,59,1,9484,4,5,59,68,85,100,117,7694,7696,7699,7702,7705,1,9472,59,1,9573,59,1,9576,59,1,9516,59,1,9524,105,110,117,115,59,1,8863,108,117,115,59,1,8862,105,109,101,115,59,1,8864,4,4,76,82,108,114,7738,7741,7744,7747,59,1,9563,59,1,9560,59,1,9496,59,1,9492,4,7,59,72,76,82,104,108,114,7766,7768,7771,7774,7777,7780,7783,1,9474,59,1,9578,59,1,9569,59,1,9566,59,1,9532,59,1,9508,59,1,9500,114,105,109,101,59,1,8245,4,2,101,118,7799,7804,118,101,59,1,728,98,97,114,5,166,1,59,7812,1,166,4,4,99,101,105,111,7824,7829,7834,7846,114,59,3,55349,56503,109,105,59,1,8271,109,4,2,59,101,7841,7843,1,8765,59,1,8909,108,4,3,59,98,104,7855,7857,7860,1,92,59,1,10693,115,117,98,59,1,10184,4,2,108,109,7872,7885,108,4,2,59,101,7879,7881,1,8226,116,59,1,8226,112,4,3,59,69,101,7894,7896,7899,1,8782,59,1,10926,4,2,59,113,7905,7907,1,8783,59,1,8783,4,15,97,99,100,101,102,104,105,108,111,114,115,116,117,119,121,7942,8021,8075,8080,8121,8126,8157,8279,8295,8430,8446,8485,8491,8707,8726,4,3,99,112,114,7950,7956,8007,117,116,101,59,1,263,4,6,59,97,98,99,100,115,7970,7972,7977,7984,7998,8003,1,8745,110,100,59,1,10820,114,99,117,112,59,1,10825,4,2,97,117,7990,7994,112,59,1,10827,112,59,1,10823,111,116,59,1,10816,59,3,8745,65024,4,2,101,111,8013,8017,116,59,1,8257,110,59,1,711,4,4,97,101,105,117,8031,8046,8056,8061,4,2,112,114,8037,8041,115,59,1,10829,111,110,59,1,269,100,105,108,5,231,1,59,8054,1,231,114,99,59,1,265,112,115,4,2,59,115,8069,8071,1,10828,109,59,1,10832,111,116,59,1,267,4,3,100,109,110,8088,8097,8104,105,108,5,184,1,59,8095,1,184,112,116,121,118,59,1,10674,116,5,162,2,59,101,8112,8114,1,162,114,100,111,116,59,1,183,114,59,3,55349,56608,4,3,99,101,105,8134,8138,8154,121,59,1,1095,99,107,4,2,59,109,8146,8148,1,10003,97,114,107,59,1,10003,59,1,967,114,4,7,59,69,99,101,102,109,115,8174,8176,8179,8258,8261,8268,8273,1,9675,59,1,10691,4,3,59,101,108,8187,8189,8193,1,710,113,59,1,8791,101,4,2,97,100,8200,8223,114,114,111,119,4,2,108,114,8210,8216,101,102,116,59,1,8634,105,103,104,116,59,1,8635,4,5,82,83,97,99,100,8235,8238,8241,8246,8252,59,1,174,59,1,9416,115,116,59,1,8859,105,114,99,59,1,8858,97,115,104,59,1,8861,59,1,8791,110,105,110,116,59,1,10768,105,100,59,1,10991,99,105,114,59,1,10690,117,98,115,4,2,59,117,8288,8290,1,9827,105,116,59,1,9827,4,4,108,109,110,112,8305,8326,8376,8400,111,110,4,2,59,101,8313,8315,1,58,4,2,59,113,8321,8323,1,8788,59,1,8788,4,2,109,112,8332,8344,97,4,2,59,116,8339,8341,1,44,59,1,64,4,3,59,102,108,8352,8354,8358,1,8705,110,59,1,8728,101,4,2,109,120,8365,8371,101,110,116,59,1,8705,101,115,59,1,8450,4,2,103,105,8382,8395,4,2,59,100,8388,8390,1,8773,111,116,59,1,10861,110,116,59,1,8750,4,3,102,114,121,8408,8412,8417,59,3,55349,56660,111,100,59,1,8720,5,169,2,59,115,8424,8426,1,169,114,59,1,8471,4,2,97,111,8436,8441,114,114,59,1,8629,115,115,59,1,10007,4,2,99,117,8452,8457,114,59,3,55349,56504,4,2,98,112,8463,8474,4,2,59,101,8469,8471,1,10959,59,1,10961,4,2,59,101,8480,8482,1,10960,59,1,10962,100,111,116,59,1,8943,4,7,100,101,108,112,114,118,119,8507,8522,8536,8550,8600,8697,8702,97,114,114,4,2,108,114,8516,8519,59,1,10552,59,1,10549,4,2,112,115,8528,8532,114,59,1,8926,99,59,1,8927,97,114,114,4,2,59,112,8545,8547,1,8630,59,1,10557,4,6,59,98,99,100,111,115,8564,8566,8573,8587,8592,8596,1,8746,114,99,97,112,59,1,10824,4,2,97,117,8579,8583,112,59,1,10822,112,59,1,10826,111,116,59,1,8845,114,59,1,10821,59,3,8746,65024,4,4,97,108,114,118,8610,8623,8663,8672,114,114,4,2,59,109,8618,8620,1,8631,59,1,10556,121,4,3,101,118,119,8632,8651,8656,113,4,2,112,115,8639,8645,114,101,99,59,1,8926,117,99,99,59,1,8927,101,101,59,1,8910,101,100,103,101,59,1,8911,101,110,5,164,1,59,8670,1,164,101,97,114,114,111,119,4,2,108,114,8684,8690,101,102,116,59,1,8630,105,103,104,116,59,1,8631,101,101,59,1,8910,101,100,59,1,8911,4,2,99,105,8713,8721,111,110,105,110,116,59,1,8754,110,116,59,1,8753,108,99,116,121,59,1,9005,4,19,65,72,97,98,99,100,101,102,104,105,106,108,111,114,115,116,117,119,122,8773,8778,8783,8821,8839,8854,8887,8914,8930,8944,9036,9041,9058,9197,9227,9258,9281,9297,9305,114,114,59,1,8659,97,114,59,1,10597,4,4,103,108,114,115,8793,8799,8805,8809,103,101,114,59,1,8224,101,116,104,59,1,8504,114,59,1,8595,104,4,2,59,118,8816,8818,1,8208,59,1,8867,4,2,107,108,8827,8834,97,114,111,119,59,1,10511,97,99,59,1,733,4,2,97,121,8845,8851,114,111,110,59,1,271,59,1,1076,4,3,59,97,111,8862,8864,8880,1,8518,4,2,103,114,8870,8876,103,101,114,59,1,8225,114,59,1,8650,116,115,101,113,59,1,10871,4,3,103,108,109,8895,8902,8907,5,176,1,59,8900,1,176,116,97,59,1,948,112,116,121,118,59,1,10673,4,2,105,114,8920,8926,115,104,116,59,1,10623,59,3,55349,56609,97,114,4,2,108,114,8938,8941,59,1,8643,59,1,8642,4,5,97,101,103,115,118,8956,8986,8989,8996,9001,109,4,3,59,111,115,8965,8967,8983,1,8900,110,100,4,2,59,115,8975,8977,1,8900,117,105,116,59,1,9830,59,1,9830,59,1,168,97,109,109,97,59,1,989,105,110,59,1,8946,4,3,59,105,111,9009,9011,9031,1,247,100,101,5,247,2,59,111,9020,9022,1,247,110,116,105,109,101,115,59,1,8903,110,120,59,1,8903,99,121,59,1,1106,99,4,2,111,114,9048,9053,114,110,59,1,8990,111,112,59,1,8973,4,5,108,112,116,117,119,9070,9076,9081,9130,9144,108,97,114,59,1,36,102,59,3,55349,56661,4,5,59,101,109,112,115,9093,9095,9109,9116,9122,1,729,113,4,2,59,100,9102,9104,1,8784,111,116,59,1,8785,105,110,117,115,59,1,8760,108,117,115,59,1,8724,113,117,97,114,101,59,1,8865,98,108,101,98,97,114,119,101,100,103,101,59,1,8966,110,4,3,97,100,104,9153,9160,9172,114,114,111,119,59,1,8595,111,119,110,97,114,114,111,119,115,59,1,8650,97,114,112,111,111,110,4,2,108,114,9184,9190,101,102,116,59,1,8643,105,103,104,116,59,1,8642,4,2,98,99,9203,9211,107,97,114,111,119,59,1,10512,4,2,111,114,9217,9222,114,110,59,1,8991,111,112,59,1,8972,4,3,99,111,116,9235,9248,9252,4,2,114,121,9241,9245,59,3,55349,56505,59,1,1109,108,59,1,10742,114,111,107,59,1,273,4,2,100,114,9264,9269,111,116,59,1,8945,105,4,2,59,102,9276,9278,1,9663,59,1,9662,4,2,97,104,9287,9292,114,114,59,1,8693,97,114,59,1,10607,97,110,103,108,101,59,1,10662,4,2,99,105,9311,9315,121,59,1,1119,103,114,97,114,114,59,1,10239,4,18,68,97,99,100,101,102,103,108,109,110,111,112,113,114,115,116,117,120,9361,9376,9398,9439,9444,9447,9462,9495,9531,9585,9598,9614,9659,9755,9771,9792,9808,9826,4,2,68,111,9367,9372,111,116,59,1,10871,116,59,1,8785,4,2,99,115,9382,9392,117,116,101,5,233,1,59,9390,1,233,116,101,114,59,1,10862,4,4,97,105,111,121,9408,9414,9430,9436,114,111,110,59,1,283,114,4,2,59,99,9421,9423,1,8790,5,234,1,59,9428,1,234,108,111,110,59,1,8789,59,1,1101,111,116,59,1,279,59,1,8519,4,2,68,114,9453,9458,111,116,59,1,8786,59,3,55349,56610,4,3,59,114,115,9470,9472,9482,1,10906,97,118,101,5,232,1,59,9480,1,232,4,2,59,100,9488,9490,1,10902,111,116,59,1,10904,4,4,59,105,108,115,9505,9507,9515,9518,1,10905,110,116,101,114,115,59,1,9191,59,1,8467,4,2,59,100,9524,9526,1,10901,111,116,59,1,10903,4,3,97,112,115,9539,9544,9564,99,114,59,1,275,116,121,4,3,59,115,118,9554,9556,9561,1,8709,101,116,59,1,8709,59,1,8709,112,4,2,49,59,9571,9583,4,2,51,52,9577,9580,59,1,8196,59,1,8197,1,8195,4,2,103,115,9591,9594,59,1,331,112,59,1,8194,4,2,103,112,9604,9609,111,110,59,1,281,102,59,3,55349,56662,4,3,97,108,115,9622,9635,9640,114,4,2,59,115,9629,9631,1,8917,108,59,1,10723,117,115,59,1,10865,105,4,3,59,108,118,9649,9651,9656,1,949,111,110,59,1,949,59,1,1013,4,4,99,115,117,118,9669,9686,9716,9747,4,2,105,111,9675,9680,114,99,59,1,8790,108,111,110,59,1,8789,4,2,105,108,9692,9696,109,59,1,8770,97,110,116,4,2,103,108,9705,9710,116,114,59,1,10902,101,115,115,59,1,10901,4,3,97,101,105,9724,9729,9734,108,115,59,1,61,115,116,59,1,8799,118,4,2,59,68,9741,9743,1,8801,68,59,1,10872,112,97,114,115,108,59,1,10725,4,2,68,97,9761,9766,111,116,59,1,8787,114,114,59,1,10609,4,3,99,100,105,9779,9783,9788,114,59,1,8495,111,116,59,1,8784,109,59,1,8770,4,2,97,104,9798,9801,59,1,951,5,240,1,59,9806,1,240,4,2,109,114,9814,9822,108,5,235,1,59,9820,1,235,111,59,1,8364,4,3,99,105,112,9834,9838,9843,108,59,1,33,115,116,59,1,8707,4,2,101,111,9849,9859,99,116,97,116,105,111,110,59,1,8496,110,101,110,116,105,97,108,101,59,1,8519,4,12,97,99,101,102,105,106,108,110,111,112,114,115,9896,9910,9914,9921,9954,9960,9967,9989,9994,10027,10036,10164,108,108,105,110,103,100,111,116,115,101,113,59,1,8786,121,59,1,1092,109,97,108,101,59,1,9792,4,3,105,108,114,9929,9935,9950,108,105,103,59,1,64259,4,2,105,108,9941,9945,103,59,1,64256,105,103,59,1,64260,59,3,55349,56611,108,105,103,59,1,64257,108,105,103,59,3,102,106,4,3,97,108,116,9975,9979,9984,116,59,1,9837,105,103,59,1,64258,110,115,59,1,9649,111,102,59,1,402,4,2,112,114,1e4,10005,102,59,3,55349,56663,4,2,97,107,10011,10016,108,108,59,1,8704,4,2,59,118,10022,10024,1,8916,59,1,10969,97,114,116,105,110,116,59,1,10765,4,2,97,111,10042,10159,4,2,99,115,10048,10155,4,6,49,50,51,52,53,55,10062,10102,10114,10135,10139,10151,4,6,50,51,52,53,54,56,10076,10083,10086,10093,10096,10099,5,189,1,59,10081,1,189,59,1,8531,5,188,1,59,10091,1,188,59,1,8533,59,1,8537,59,1,8539,4,2,51,53,10108,10111,59,1,8532,59,1,8534,4,3,52,53,56,10122,10129,10132,5,190,1,59,10127,1,190,59,1,8535,59,1,8540,53,59,1,8536,4,2,54,56,10145,10148,59,1,8538,59,1,8541,56,59,1,8542,108,59,1,8260,119,110,59,1,8994,99,114,59,3,55349,56507,4,17,69,97,98,99,100,101,102,103,105,106,108,110,111,114,115,116,118,10206,10217,10247,10254,10268,10273,10358,10363,10374,10380,10385,10406,10458,10464,10470,10497,10610,4,2,59,108,10212,10214,1,8807,59,1,10892,4,3,99,109,112,10225,10231,10244,117,116,101,59,1,501,109,97,4,2,59,100,10239,10241,1,947,59,1,989,59,1,10886,114,101,118,101,59,1,287,4,2,105,121,10260,10265,114,99,59,1,285,59,1,1075,111,116,59,1,289,4,4,59,108,113,115,10283,10285,10288,10308,1,8805,59,1,8923,4,3,59,113,115,10296,10298,10301,1,8805,59,1,8807,108,97,110,116,59,1,10878,4,4,59,99,100,108,10318,10320,10324,10345,1,10878,99,59,1,10921,111,116,4,2,59,111,10332,10334,1,10880,4,2,59,108,10340,10342,1,10882,59,1,10884,4,2,59,101,10351,10354,3,8923,65024,115,59,1,10900,114,59,3,55349,56612,4,2,59,103,10369,10371,1,8811,59,1,8921,109,101,108,59,1,8503,99,121,59,1,1107,4,4,59,69,97,106,10395,10397,10400,10403,1,8823,59,1,10898,59,1,10917,59,1,10916,4,4,69,97,101,115,10416,10419,10434,10453,59,1,8809,112,4,2,59,112,10426,10428,1,10890,114,111,120,59,1,10890,4,2,59,113,10440,10442,1,10888,4,2,59,113,10448,10450,1,10888,59,1,8809,105,109,59,1,8935,112,102,59,3,55349,56664,97,118,101,59,1,96,4,2,99,105,10476,10480,114,59,1,8458,109,4,3,59,101,108,10489,10491,10494,1,8819,59,1,10894,59,1,10896,5,62,6,59,99,100,108,113,114,10512,10514,10527,10532,10538,10545,1,62,4,2,99,105,10520,10523,59,1,10919,114,59,1,10874,111,116,59,1,8919,80,97,114,59,1,10645,117,101,115,116,59,1,10876,4,5,97,100,101,108,115,10557,10574,10579,10599,10605,4,2,112,114,10563,10570,112,114,111,120,59,1,10886,114,59,1,10616,111,116,59,1,8919,113,4,2,108,113,10586,10592,101,115,115,59,1,8923,108,101,115,115,59,1,10892,101,115,115,59,1,8823,105,109,59,1,8819,4,2,101,110,10616,10626,114,116,110,101,113,113,59,3,8809,65024,69,59,3,8809,65024,4,10,65,97,98,99,101,102,107,111,115,121,10653,10658,10713,10718,10724,10760,10765,10786,10850,10875,114,114,59,1,8660,4,4,105,108,109,114,10668,10674,10678,10684,114,115,112,59,1,8202,102,59,1,189,105,108,116,59,1,8459,4,2,100,114,10690,10695,99,121,59,1,1098,4,3,59,99,119,10703,10705,10710,1,8596,105,114,59,1,10568,59,1,8621,97,114,59,1,8463,105,114,99,59,1,293,4,3,97,108,114,10732,10748,10754,114,116,115,4,2,59,117,10741,10743,1,9829,105,116,59,1,9829,108,105,112,59,1,8230,99,111,110,59,1,8889,114,59,3,55349,56613,115,4,2,101,119,10772,10779,97,114,111,119,59,1,10533,97,114,111,119,59,1,10534,4,5,97,109,111,112,114,10798,10803,10809,10839,10844,114,114,59,1,8703,116,104,116,59,1,8763,107,4,2,108,114,10816,10827,101,102,116,97,114,114,111,119,59,1,8617,105,103,104,116,97,114,114,111,119,59,1,8618,102,59,3,55349,56665,98,97,114,59,1,8213,4,3,99,108,116,10858,10863,10869,114,59,3,55349,56509,97,115,104,59,1,8463,114,111,107,59,1,295,4,2,98,112,10881,10887,117,108,108,59,1,8259,104,101,110,59,1,8208,4,15,97,99,101,102,103,105,106,109,110,111,112,113,115,116,117,10925,10936,10958,10977,10990,11001,11039,11045,11101,11192,11220,11226,11237,11285,11299,99,117,116,101,5,237,1,59,10934,1,237,4,3,59,105,121,10944,10946,10955,1,8291,114,99,5,238,1,59,10953,1,238,59,1,1080,4,2,99,120,10964,10968,121,59,1,1077,99,108,5,161,1,59,10975,1,161,4,2,102,114,10983,10986,59,1,8660,59,3,55349,56614,114,97,118,101,5,236,1,59,10999,1,236,4,4,59,105,110,111,11011,11013,11028,11034,1,8520,4,2,105,110,11019,11024,110,116,59,1,10764,116,59,1,8749,102,105,110,59,1,10716,116,97,59,1,8489,108,105,103,59,1,307,4,3,97,111,112,11053,11092,11096,4,3,99,103,116,11061,11065,11088,114,59,1,299,4,3,101,108,112,11073,11076,11082,59,1,8465,105,110,101,59,1,8464,97,114,116,59,1,8465,104,59,1,305,102,59,1,8887,101,100,59,1,437,4,5,59,99,102,111,116,11113,11115,11121,11136,11142,1,8712,97,114,101,59,1,8453,105,110,4,2,59,116,11129,11131,1,8734,105,101,59,1,10717,100,111,116,59,1,305,4,5,59,99,101,108,112,11154,11156,11161,11179,11186,1,8747,97,108,59,1,8890,4,2,103,114,11167,11173,101,114,115,59,1,8484,99,97,108,59,1,8890,97,114,104,107,59,1,10775,114,111,100,59,1,10812,4,4,99,103,112,116,11202,11206,11211,11216,121,59,1,1105,111,110,59,1,303,102,59,3,55349,56666,97,59,1,953,114,111,100,59,1,10812,117,101,115,116,5,191,1,59,11235,1,191,4,2,99,105,11243,11248,114,59,3,55349,56510,110,4,5,59,69,100,115,118,11261,11263,11266,11271,11282,1,8712,59,1,8953,111,116,59,1,8949,4,2,59,118,11277,11279,1,8948,59,1,8947,59,1,8712,4,2,59,105,11291,11293,1,8290,108,100,101,59,1,297,4,2,107,109,11305,11310,99,121,59,1,1110,108,5,239,1,59,11316,1,239,4,6,99,102,109,111,115,117,11332,11346,11351,11357,11363,11380,4,2,105,121,11338,11343,114,99,59,1,309,59,1,1081,114,59,3,55349,56615,97,116,104,59,1,567,112,102,59,3,55349,56667,4,2,99,101,11369,11374,114,59,3,55349,56511,114,99,121,59,1,1112,107,99,121,59,1,1108,4,8,97,99,102,103,104,106,111,115,11404,11418,11433,11438,11445,11450,11455,11461,112,112,97,4,2,59,118,11413,11415,1,954,59,1,1008,4,2,101,121,11424,11430,100,105,108,59,1,311,59,1,1082,114,59,3,55349,56616,114,101,101,110,59,1,312,99,121,59,1,1093,99,121,59,1,1116,112,102,59,3,55349,56668,99,114,59,3,55349,56512,4,23,65,66,69,72,97,98,99,100,101,102,103,104,106,108,109,110,111,112,114,115,116,117,118,11515,11538,11544,11555,11560,11721,11780,11818,11868,12136,12160,12171,12203,12208,12246,12275,12327,12509,12523,12569,12641,12732,12752,4,3,97,114,116,11523,11528,11532,114,114,59,1,8666,114,59,1,8656,97,105,108,59,1,10523,97,114,114,59,1,10510,4,2,59,103,11550,11552,1,8806,59,1,10891,97,114,59,1,10594,4,9,99,101,103,109,110,112,113,114,116,11580,11586,11594,11600,11606,11624,11627,11636,11694,117,116,101,59,1,314,109,112,116,121,118,59,1,10676,114,97,110,59,1,8466,98,100,97,59,1,955,103,4,3,59,100,108,11615,11617,11620,1,10216,59,1,10641,101,59,1,10216,59,1,10885,117,111,5,171,1,59,11634,1,171,114,4,8,59,98,102,104,108,112,115,116,11655,11657,11669,11673,11677,11681,11685,11690,1,8592,4,2,59,102,11663,11665,1,8676,115,59,1,10527,115,59,1,10525,107,59,1,8617,112,59,1,8619,108,59,1,10553,105,109,59,1,10611,108,59,1,8610,4,3,59,97,101,11702,11704,11709,1,10923,105,108,59,1,10521,4,2,59,115,11715,11717,1,10925,59,3,10925,65024,4,3,97,98,114,11729,11734,11739,114,114,59,1,10508,114,107,59,1,10098,4,2,97,107,11745,11758,99,4,2,101,107,11752,11755,59,1,123,59,1,91,4,2,101,115,11764,11767,59,1,10635,108,4,2,100,117,11774,11777,59,1,10639,59,1,10637,4,4,97,101,117,121,11790,11796,11811,11815,114,111,110,59,1,318,4,2,100,105,11802,11807,105,108,59,1,316,108,59,1,8968,98,59,1,123,59,1,1083,4,4,99,113,114,115,11828,11832,11845,11864,97,59,1,10550,117,111,4,2,59,114,11840,11842,1,8220,59,1,8222,4,2,100,117,11851,11857,104,97,114,59,1,10599,115,104,97,114,59,1,10571,104,59,1,8626,4,5,59,102,103,113,115,11880,11882,12008,12011,12031,1,8804,116,4,5,97,104,108,114,116,11895,11913,11935,11947,11996,114,114,111,119,4,2,59,116,11905,11907,1,8592,97,105,108,59,1,8610,97,114,112,111,111,110,4,2,100,117,11925,11931,111,119,110,59,1,8637,112,59,1,8636,101,102,116,97,114,114,111,119,115,59,1,8647,105,103,104,116,4,3,97,104,115,11959,11974,11984,114,114,111,119,4,2,59,115,11969,11971,1,8596,59,1,8646,97,114,112,111,111,110,115,59,1,8651,113,117,105,103,97,114,114,111,119,59,1,8621,104,114,101,101,116,105,109,101,115,59,1,8907,59,1,8922,4,3,59,113,115,12019,12021,12024,1,8804,59,1,8806,108,97,110,116,59,1,10877,4,5,59,99,100,103,115,12043,12045,12049,12070,12083,1,10877,99,59,1,10920,111,116,4,2,59,111,12057,12059,1,10879,4,2,59,114,12065,12067,1,10881,59,1,10883,4,2,59,101,12076,12079,3,8922,65024,115,59,1,10899,4,5,97,100,101,103,115,12095,12103,12108,12126,12131,112,112,114,111,120,59,1,10885,111,116,59,1,8918,113,4,2,103,113,12115,12120,116,114,59,1,8922,103,116,114,59,1,10891,116,114,59,1,8822,105,109,59,1,8818,4,3,105,108,114,12144,12150,12156,115,104,116,59,1,10620,111,111,114,59,1,8970,59,3,55349,56617,4,2,59,69,12166,12168,1,8822,59,1,10897,4,2,97,98,12177,12198,114,4,2,100,117,12184,12187,59,1,8637,4,2,59,108,12193,12195,1,8636,59,1,10602,108,107,59,1,9604,99,121,59,1,1113,4,5,59,97,99,104,116,12220,12222,12227,12235,12241,1,8810,114,114,59,1,8647,111,114,110,101,114,59,1,8990,97,114,100,59,1,10603,114,105,59,1,9722,4,2,105,111,12252,12258,100,111,116,59,1,320,117,115,116,4,2,59,97,12267,12269,1,9136,99,104,101,59,1,9136,4,4,69,97,101,115,12285,12288,12303,12322,59,1,8808,112,4,2,59,112,12295,12297,1,10889,114,111,120,59,1,10889,4,2,59,113,12309,12311,1,10887,4,2,59,113,12317,12319,1,10887,59,1,8808,105,109,59,1,8934,4,8,97,98,110,111,112,116,119,122,12345,12359,12364,12421,12446,12467,12474,12490,4,2,110,114,12351,12355,103,59,1,10220,114,59,1,8701,114,107,59,1,10214,103,4,3,108,109,114,12373,12401,12409,101,102,116,4,2,97,114,12382,12389,114,114,111,119,59,1,10229,105,103,104,116,97,114,114,111,119,59,1,10231,97,112,115,116,111,59,1,10236,105,103,104,116,97,114,114,111,119,59,1,10230,112,97,114,114,111,119,4,2,108,114,12433,12439,101,102,116,59,1,8619,105,103,104,116,59,1,8620,4,3,97,102,108,12454,12458,12462,114,59,1,10629,59,3,55349,56669,117,115,59,1,10797,105,109,101,115,59,1,10804,4,2,97,98,12480,12485,115,116,59,1,8727,97,114,59,1,95,4,3,59,101,102,12498,12500,12506,1,9674,110,103,101,59,1,9674,59,1,10731,97,114,4,2,59,108,12517,12519,1,40,116,59,1,10643,4,5,97,99,104,109,116,12535,12540,12548,12561,12564,114,114,59,1,8646,111,114,110,101,114,59,1,8991,97,114,4,2,59,100,12556,12558,1,8651,59,1,10605,59,1,8206,114,105,59,1,8895,4,6,97,99,104,105,113,116,12583,12589,12594,12597,12614,12635,113,117,111,59,1,8249,114,59,3,55349,56513,59,1,8624,109,4,3,59,101,103,12606,12608,12611,1,8818,59,1,10893,59,1,10895,4,2,98,117,12620,12623,59,1,91,111,4,2,59,114,12630,12632,1,8216,59,1,8218,114,111,107,59,1,322,5,60,8,59,99,100,104,105,108,113,114,12660,12662,12675,12680,12686,12692,12698,12705,1,60,4,2,99,105,12668,12671,59,1,10918,114,59,1,10873,111,116,59,1,8918,114,101,101,59,1,8907,109,101,115,59,1,8905,97,114,114,59,1,10614,117,101,115,116,59,1,10875,4,2,80,105,12711,12716,97,114,59,1,10646,4,3,59,101,102,12724,12726,12729,1,9667,59,1,8884,59,1,9666,114,4,2,100,117,12739,12746,115,104,97,114,59,1,10570,104,97,114,59,1,10598,4,2,101,110,12758,12768,114,116,110,101,113,113,59,3,8808,65024,69,59,3,8808,65024,4,14,68,97,99,100,101,102,104,105,108,110,111,112,115,117,12803,12809,12893,12908,12914,12928,12933,12937,13011,13025,13032,13049,13052,13069,68,111,116,59,1,8762,4,4,99,108,112,114,12819,12827,12849,12887,114,5,175,1,59,12825,1,175,4,2,101,116,12833,12836,59,1,9794,4,2,59,101,12842,12844,1,10016,115,101,59,1,10016,4,2,59,115,12855,12857,1,8614,116,111,4,4,59,100,108,117,12869,12871,12877,12883,1,8614,111,119,110,59,1,8615,101,102,116,59,1,8612,112,59,1,8613,107,101,114,59,1,9646,4,2,111,121,12899,12905,109,109,97,59,1,10793,59,1,1084,97,115,104,59,1,8212,97,115,117,114,101,100,97,110,103,108,101,59,1,8737,114,59,3,55349,56618,111,59,1,8487,4,3,99,100,110,12945,12954,12985,114,111,5,181,1,59,12952,1,181,4,4,59,97,99,100,12964,12966,12971,12976,1,8739,115,116,59,1,42,105,114,59,1,10992,111,116,5,183,1,59,12983,1,183,117,115,4,3,59,98,100,12995,12997,13e3,1,8722,59,1,8863,4,2,59,117,13006,13008,1,8760,59,1,10794,4,2,99,100,13017,13021,112,59,1,10971,114,59,1,8230,112,108,117,115,59,1,8723,4,2,100,112,13038,13044,101,108,115,59,1,8871,102,59,3,55349,56670,59,1,8723,4,2,99,116,13058,13063,114,59,3,55349,56514,112,111,115,59,1,8766,4,3,59,108,109,13077,13079,13087,1,956,116,105,109,97,112,59,1,8888,97,112,59,1,8888,4,24,71,76,82,86,97,98,99,100,101,102,103,104,105,106,108,109,111,112,114,115,116,117,118,119,13142,13165,13217,13229,13247,13330,13359,13414,13420,13508,13513,13579,13602,13626,13631,13762,13767,13855,13936,13995,14214,14285,14312,14432,4,2,103,116,13148,13152,59,3,8921,824,4,2,59,118,13158,13161,3,8811,8402,59,3,8811,824,4,3,101,108,116,13173,13200,13204,102,116,4,2,97,114,13181,13188,114,114,111,119,59,1,8653,105,103,104,116,97,114,114,111,119,59,1,8654,59,3,8920,824,4,2,59,118,13210,13213,3,8810,8402,59,3,8810,824,105,103,104,116,97,114,114,111,119,59,1,8655,4,2,68,100,13235,13241,97,115,104,59,1,8879,97,115,104,59,1,8878,4,5,98,99,110,112,116,13259,13264,13270,13275,13308,108,97,59,1,8711,117,116,101,59,1,324,103,59,3,8736,8402,4,5,59,69,105,111,112,13287,13289,13293,13298,13302,1,8777,59,3,10864,824,100,59,3,8779,824,115,59,1,329,114,111,120,59,1,8777,117,114,4,2,59,97,13316,13318,1,9838,108,4,2,59,115,13325,13327,1,9838,59,1,8469,4,2,115,117,13336,13344,112,5,160,1,59,13342,1,160,109,112,4,2,59,101,13352,13355,3,8782,824,59,3,8783,824,4,5,97,101,111,117,121,13371,13385,13391,13407,13411,4,2,112,114,13377,13380,59,1,10819,111,110,59,1,328,100,105,108,59,1,326,110,103,4,2,59,100,13399,13401,1,8775,111,116,59,3,10861,824,112,59,1,10818,59,1,1085,97,115,104,59,1,8211,4,7,59,65,97,100,113,115,120,13436,13438,13443,13466,13472,13478,13494,1,8800,114,114,59,1,8663,114,4,2,104,114,13450,13454,107,59,1,10532,4,2,59,111,13460,13462,1,8599,119,59,1,8599,111,116,59,3,8784,824,117,105,118,59,1,8802,4,2,101,105,13484,13489,97,114,59,1,10536,109,59,3,8770,824,105,115,116,4,2,59,115,13503,13505,1,8708,59,1,8708,114,59,3,55349,56619,4,4,69,101,115,116,13523,13527,13563,13568,59,3,8807,824,4,3,59,113,115,13535,13537,13559,1,8817,4,3,59,113,115,13545,13547,13551,1,8817,59,3,8807,824,108,97,110,116,59,3,10878,824,59,3,10878,824,105,109,59,1,8821,4,2,59,114,13574,13576,1,8815,59,1,8815,4,3,65,97,112,13587,13592,13597,114,114,59,1,8654,114,114,59,1,8622,97,114,59,1,10994,4,3,59,115,118,13610,13612,13623,1,8715,4,2,59,100,13618,13620,1,8956,59,1,8954,59,1,8715,99,121,59,1,1114,4,7,65,69,97,100,101,115,116,13647,13652,13656,13661,13665,13737,13742,114,114,59,1,8653,59,3,8806,824,114,114,59,1,8602,114,59,1,8229,4,4,59,102,113,115,13675,13677,13703,13725,1,8816,116,4,2,97,114,13684,13691,114,114,111,119,59,1,8602,105,103,104,116,97,114,114,111,119,59,1,8622,4,3,59,113,115,13711,13713,13717,1,8816,59,3,8806,824,108,97,110,116,59,3,10877,824,4,2,59,115,13731,13734,3,10877,824,59,1,8814,105,109,59,1,8820,4,2,59,114,13748,13750,1,8814,105,4,2,59,101,13757,13759,1,8938,59,1,8940,105,100,59,1,8740,4,2,112,116,13773,13778,102,59,3,55349,56671,5,172,3,59,105,110,13787,13789,13829,1,172,110,4,4,59,69,100,118,13800,13802,13806,13812,1,8713,59,3,8953,824,111,116,59,3,8949,824,4,3,97,98,99,13820,13823,13826,59,1,8713,59,1,8951,59,1,8950,105,4,2,59,118,13836,13838,1,8716,4,3,97,98,99,13846,13849,13852,59,1,8716,59,1,8958,59,1,8957,4,3,97,111,114,13863,13892,13899,114,4,4,59,97,115,116,13874,13876,13883,13888,1,8742,108,108,101,108,59,1,8742,108,59,3,11005,8421,59,3,8706,824,108,105,110,116,59,1,10772,4,3,59,99,101,13907,13909,13914,1,8832,117,101,59,1,8928,4,2,59,99,13920,13923,3,10927,824,4,2,59,101,13929,13931,1,8832,113,59,3,10927,824,4,4,65,97,105,116,13946,13951,13971,13982,114,114,59,1,8655,114,114,4,3,59,99,119,13961,13963,13967,1,8603,59,3,10547,824,59,3,8605,824,103,104,116,97,114,114,111,119,59,1,8603,114,105,4,2,59,101,13990,13992,1,8939,59,1,8941,4,7,99,104,105,109,112,113,117,14011,14036,14060,14080,14085,14090,14106,4,4,59,99,101,114,14021,14023,14028,14032,1,8833,117,101,59,1,8929,59,3,10928,824,59,3,55349,56515,111,114,116,4,2,109,112,14045,14050,105,100,59,1,8740,97,114,97,108,108,101,108,59,1,8742,109,4,2,59,101,14067,14069,1,8769,4,2,59,113,14075,14077,1,8772,59,1,8772,105,100,59,1,8740,97,114,59,1,8742,115,117,4,2,98,112,14098,14102,101,59,1,8930,101,59,1,8931,4,3,98,99,112,14114,14157,14171,4,4,59,69,101,115,14124,14126,14130,14133,1,8836,59,3,10949,824,59,1,8840,101,116,4,2,59,101,14141,14144,3,8834,8402,113,4,2,59,113,14151,14153,1,8840,59,3,10949,824,99,4,2,59,101,14164,14166,1,8833,113,59,3,10928,824,4,4,59,69,101,115,14181,14183,14187,14190,1,8837,59,3,10950,824,59,1,8841,101,116,4,2,59,101,14198,14201,3,8835,8402,113,4,2,59,113,14208,14210,1,8841,59,3,10950,824,4,4,103,105,108,114,14224,14228,14238,14242,108,59,1,8825,108,100,101,5,241,1,59,14236,1,241,103,59,1,8824,105,97,110,103,108,101,4,2,108,114,14254,14269,101,102,116,4,2,59,101,14263,14265,1,8938,113,59,1,8940,105,103,104,116,4,2,59,101,14279,14281,1,8939,113,59,1,8941,4,2,59,109,14291,14293,1,957,4,3,59,101,115,14301,14303,14308,1,35,114,111,59,1,8470,112,59,1,8199,4,9,68,72,97,100,103,105,108,114,115,14332,14338,14344,14349,14355,14369,14376,14408,14426,97,115,104,59,1,8877,97,114,114,59,1,10500,112,59,3,8781,8402,97,115,104,59,1,8876,4,2,101,116,14361,14365,59,3,8805,8402,59,3,62,8402,110,102,105,110,59,1,10718,4,3,65,101,116,14384,14389,14393,114,114,59,1,10498,59,3,8804,8402,4,2,59,114,14399,14402,3,60,8402,105,101,59,3,8884,8402,4,2,65,116,14414,14419,114,114,59,1,10499,114,105,101,59,3,8885,8402,105,109,59,3,8764,8402,4,3,65,97,110,14440,14445,14468,114,114,59,1,8662,114,4,2,104,114,14452,14456,107,59,1,10531,4,2,59,111,14462,14464,1,8598,119,59,1,8598,101,97,114,59,1,10535,4,18,83,97,99,100,101,102,103,104,105,108,109,111,112,114,115,116,117,118,14512,14515,14535,14560,14597,14603,14618,14643,14657,14662,14701,14741,14747,14769,14851,14877,14907,14916,59,1,9416,4,2,99,115,14521,14531,117,116,101,5,243,1,59,14529,1,243,116,59,1,8859,4,2,105,121,14541,14557,114,4,2,59,99,14548,14550,1,8858,5,244,1,59,14555,1,244,59,1,1086,4,5,97,98,105,111,115,14572,14577,14583,14587,14591,115,104,59,1,8861,108,97,99,59,1,337,118,59,1,10808,116,59,1,8857,111,108,100,59,1,10684,108,105,103,59,1,339,4,2,99,114,14609,14614,105,114,59,1,10687,59,3,55349,56620,4,3,111,114,116,14626,14630,14640,110,59,1,731,97,118,101,5,242,1,59,14638,1,242,59,1,10689,4,2,98,109,14649,14654,97,114,59,1,10677,59,1,937,110,116,59,1,8750,4,4,97,99,105,116,14672,14677,14693,14698,114,114,59,1,8634,4,2,105,114,14683,14687,114,59,1,10686,111,115,115,59,1,10683,110,101,59,1,8254,59,1,10688,4,3,97,101,105,14709,14714,14719,99,114,59,1,333,103,97,59,1,969,4,3,99,100,110,14727,14733,14736,114,111,110,59,1,959,59,1,10678,117,115,59,1,8854,112,102,59,3,55349,56672,4,3,97,101,108,14755,14759,14764,114,59,1,10679,114,112,59,1,10681,117,115,59,1,8853,4,7,59,97,100,105,111,115,118,14785,14787,14792,14831,14837,14841,14848,1,8744,114,114,59,1,8635,4,4,59,101,102,109,14802,14804,14817,14824,1,10845,114,4,2,59,111,14811,14813,1,8500,102,59,1,8500,5,170,1,59,14822,1,170,5,186,1,59,14829,1,186,103,111,102,59,1,8886,114,59,1,10838,108,111,112,101,59,1,10839,59,1,10843,4,3,99,108,111,14859,14863,14873,114,59,1,8500,97,115,104,5,248,1,59,14871,1,248,108,59,1,8856,105,4,2,108,109,14884,14893,100,101,5,245,1,59,14891,1,245,101,115,4,2,59,97,14901,14903,1,8855,115,59,1,10806,109,108,5,246,1,59,14914,1,246,98,97,114,59,1,9021,4,12,97,99,101,102,104,105,108,109,111,114,115,117,14948,14992,14996,15033,15038,15068,15090,15189,15192,15222,15427,15441,114,4,4,59,97,115,116,14959,14961,14976,14989,1,8741,5,182,2,59,108,14968,14970,1,182,108,101,108,59,1,8741,4,2,105,108,14982,14986,109,59,1,10995,59,1,11005,59,1,8706,121,59,1,1087,114,4,5,99,105,109,112,116,15009,15014,15019,15024,15027,110,116,59,1,37,111,100,59,1,46,105,108,59,1,8240,59,1,8869,101,110,107,59,1,8241,114,59,3,55349,56621,4,3,105,109,111,15046,15057,15063,4,2,59,118,15052,15054,1,966,59,1,981,109,97,116,59,1,8499,110,101,59,1,9742,4,3,59,116,118,15076,15078,15087,1,960,99,104,102,111,114,107,59,1,8916,59,1,982,4,2,97,117,15096,15119,110,4,2,99,107,15103,15115,107,4,2,59,104,15110,15112,1,8463,59,1,8462,118,59,1,8463,115,4,9,59,97,98,99,100,101,109,115,116,15140,15142,15148,15151,15156,15168,15171,15179,15184,1,43,99,105,114,59,1,10787,59,1,8862,105,114,59,1,10786,4,2,111,117,15162,15165,59,1,8724,59,1,10789,59,1,10866,110,5,177,1,59,15177,1,177,105,109,59,1,10790,119,111,59,1,10791,59,1,177,4,3,105,112,117,15200,15208,15213,110,116,105,110,116,59,1,10773,102,59,3,55349,56673,110,100,5,163,1,59,15220,1,163,4,10,59,69,97,99,101,105,110,111,115,117,15244,15246,15249,15253,15258,15334,15347,15367,15416,15421,1,8826,59,1,10931,112,59,1,10935,117,101,59,1,8828,4,2,59,99,15264,15266,1,10927,4,6,59,97,99,101,110,115,15280,15282,15290,15299,15303,15329,1,8826,112,112,114,111,120,59,1,10935,117,114,108,121,101,113,59,1,8828,113,59,1,10927,4,3,97,101,115,15311,15319,15324,112,112,114,111,120,59,1,10937,113,113,59,1,10933,105,109,59,1,8936,105,109,59,1,8830,109,101,4,2,59,115,15342,15344,1,8242,59,1,8473,4,3,69,97,115,15355,15358,15362,59,1,10933,112,59,1,10937,105,109,59,1,8936,4,3,100,102,112,15375,15378,15404,59,1,8719,4,3,97,108,115,15386,15392,15398,108,97,114,59,1,9006,105,110,101,59,1,8978,117,114,102,59,1,8979,4,2,59,116,15410,15412,1,8733,111,59,1,8733,105,109,59,1,8830,114,101,108,59,1,8880,4,2,99,105,15433,15438,114,59,3,55349,56517,59,1,968,110,99,115,112,59,1,8200,4,6,102,105,111,112,115,117,15462,15467,15472,15478,15485,15491,114,59,3,55349,56622,110,116,59,1,10764,112,102,59,3,55349,56674,114,105,109,101,59,1,8279,99,114,59,3,55349,56518,4,3,97,101,111,15499,15520,15534,116,4,2,101,105,15506,15515,114,110,105,111,110,115,59,1,8461,110,116,59,1,10774,115,116,4,2,59,101,15528,15530,1,63,113,59,1,8799,116,5,34,1,59,15540,1,34,4,21,65,66,72,97,98,99,100,101,102,104,105,108,109,110,111,112,114,115,116,117,120,15586,15609,15615,15620,15796,15855,15893,15931,15977,16001,16039,16183,16204,16222,16228,16285,16312,16318,16363,16408,16416,4,3,97,114,116,15594,15599,15603,114,114,59,1,8667,114,59,1,8658,97,105,108,59,1,10524,97,114,114,59,1,10511,97,114,59,1,10596,4,7,99,100,101,110,113,114,116,15636,15651,15656,15664,15687,15696,15770,4,2,101,117,15642,15646,59,3,8765,817,116,101,59,1,341,105,99,59,1,8730,109,112,116,121,118,59,1,10675,103,4,4,59,100,101,108,15675,15677,15680,15683,1,10217,59,1,10642,59,1,10661,101,59,1,10217,117,111,5,187,1,59,15694,1,187,114,4,11,59,97,98,99,102,104,108,112,115,116,119,15721,15723,15727,15739,15742,15746,15750,15754,15758,15763,15767,1,8594,112,59,1,10613,4,2,59,102,15733,15735,1,8677,115,59,1,10528,59,1,10547,115,59,1,10526,107,59,1,8618,112,59,1,8620,108,59,1,10565,105,109,59,1,10612,108,59,1,8611,59,1,8605,4,2,97,105,15776,15781,105,108,59,1,10522,111,4,2,59,110,15788,15790,1,8758,97,108,115,59,1,8474,4,3,97,98,114,15804,15809,15814,114,114,59,1,10509,114,107,59,1,10099,4,2,97,107,15820,15833,99,4,2,101,107,15827,15830,59,1,125,59,1,93,4,2,101,115,15839,15842,59,1,10636,108,4,2,100,117,15849,15852,59,1,10638,59,1,10640,4,4,97,101,117,121,15865,15871,15886,15890,114,111,110,59,1,345,4,2,100,105,15877,15882,105,108,59,1,343,108,59,1,8969,98,59,1,125,59,1,1088,4,4,99,108,113,115,15903,15907,15914,15927,97,59,1,10551,100,104,97,114,59,1,10601,117,111,4,2,59,114,15922,15924,1,8221,59,1,8221,104,59,1,8627,4,3,97,99,103,15939,15966,15970,108,4,4,59,105,112,115,15950,15952,15957,15963,1,8476,110,101,59,1,8475,97,114,116,59,1,8476,59,1,8477,116,59,1,9645,5,174,1,59,15975,1,174,4,3,105,108,114,15985,15991,15997,115,104,116,59,1,10621,111,111,114,59,1,8971,59,3,55349,56623,4,2,97,111,16007,16028,114,4,2,100,117,16014,16017,59,1,8641,4,2,59,108,16023,16025,1,8640,59,1,10604,4,2,59,118,16034,16036,1,961,59,1,1009,4,3,103,110,115,16047,16167,16171,104,116,4,6,97,104,108,114,115,116,16063,16081,16103,16130,16143,16155,114,114,111,119,4,2,59,116,16073,16075,1,8594,97,105,108,59,1,8611,97,114,112,111,111,110,4,2,100,117,16093,16099,111,119,110,59,1,8641,112,59,1,8640,101,102,116,4,2,97,104,16112,16120,114,114,111,119,115,59,1,8644,97,114,112,111,111,110,115,59,1,8652,105,103,104,116,97,114,114,111,119,115,59,1,8649,113,117,105,103,97,114,114,111,119,59,1,8605,104,114,101,101,116,105,109,101,115,59,1,8908,103,59,1,730,105,110,103,100,111,116,115,101,113,59,1,8787,4,3,97,104,109,16191,16196,16201,114,114,59,1,8644,97,114,59,1,8652,59,1,8207,111,117,115,116,4,2,59,97,16214,16216,1,9137,99,104,101,59,1,9137,109,105,100,59,1,10990,4,4,97,98,112,116,16238,16252,16257,16278,4,2,110,114,16244,16248,103,59,1,10221,114,59,1,8702,114,107,59,1,10215,4,3,97,102,108,16265,16269,16273,114,59,1,10630,59,3,55349,56675,117,115,59,1,10798,105,109,101,115,59,1,10805,4,2,97,112,16291,16304,114,4,2,59,103,16298,16300,1,41,116,59,1,10644,111,108,105,110,116,59,1,10770,97,114,114,59,1,8649,4,4,97,99,104,113,16328,16334,16339,16342,113,117,111,59,1,8250,114,59,3,55349,56519,59,1,8625,4,2,98,117,16348,16351,59,1,93,111,4,2,59,114,16358,16360,1,8217,59,1,8217,4,3,104,105,114,16371,16377,16383,114,101,101,59,1,8908,109,101,115,59,1,8906,105,4,4,59,101,102,108,16394,16396,16399,16402,1,9657,59,1,8885,59,1,9656,116,114,105,59,1,10702,108,117,104,97,114,59,1,10600,59,1,8478,4,19,97,98,99,100,101,102,104,105,108,109,111,112,113,114,115,116,117,119,122,16459,16466,16472,16572,16590,16672,16687,16746,16844,16850,16924,16963,16988,17115,17121,17154,17206,17614,17656,99,117,116,101,59,1,347,113,117,111,59,1,8218,4,10,59,69,97,99,101,105,110,112,115,121,16494,16496,16499,16513,16518,16531,16536,16556,16564,16569,1,8827,59,1,10932,4,2,112,114,16505,16508,59,1,10936,111,110,59,1,353,117,101,59,1,8829,4,2,59,100,16524,16526,1,10928,105,108,59,1,351,114,99,59,1,349,4,3,69,97,115,16544,16547,16551,59,1,10934,112,59,1,10938,105,109,59,1,8937,111,108,105,110,116,59,1,10771,105,109,59,1,8831,59,1,1089,111,116,4,3,59,98,101,16582,16584,16587,1,8901,59,1,8865,59,1,10854,4,7,65,97,99,109,115,116,120,16606,16611,16634,16642,16646,16652,16668,114,114,59,1,8664,114,4,2,104,114,16618,16622,107,59,1,10533,4,2,59,111,16628,16630,1,8600,119,59,1,8600,116,5,167,1,59,16640,1,167,105,59,1,59,119,97,114,59,1,10537,109,4,2,105,110,16659,16665,110,117,115,59,1,8726,59,1,8726,116,59,1,10038,114,4,2,59,111,16679,16682,3,55349,56624,119,110,59,1,8994,4,4,97,99,111,121,16697,16702,16716,16739,114,112,59,1,9839,4,2,104,121,16708,16713,99,121,59,1,1097,59,1,1096,114,116,4,2,109,112,16724,16729,105,100,59,1,8739,97,114,97,108,108,101,108,59,1,8741,5,173,1,59,16744,1,173,4,2,103,109,16752,16770,109,97,4,3,59,102,118,16762,16764,16767,1,963,59,1,962,59,1,962,4,8,59,100,101,103,108,110,112,114,16788,16790,16795,16806,16817,16828,16832,16838,1,8764,111,116,59,1,10858,4,2,59,113,16801,16803,1,8771,59,1,8771,4,2,59,69,16812,16814,1,10910,59,1,10912,4,2,59,69,16823,16825,1,10909,59,1,10911,101,59,1,8774,108,117,115,59,1,10788,97,114,114,59,1,10610,97,114,114,59,1,8592,4,4,97,101,105,116,16860,16883,16891,16904,4,2,108,115,16866,16878,108,115,101,116,109,105,110,117,115,59,1,8726,104,112,59,1,10803,112,97,114,115,108,59,1,10724,4,2,100,108,16897,16900,59,1,8739,101,59,1,8995,4,2,59,101,16910,16912,1,10922,4,2,59,115,16918,16920,1,10924,59,3,10924,65024,4,3,102,108,112,16932,16938,16958,116,99,121,59,1,1100,4,2,59,98,16944,16946,1,47,4,2,59,97,16952,16954,1,10692,114,59,1,9023,102,59,3,55349,56676,97,4,2,100,114,16970,16985,101,115,4,2,59,117,16978,16980,1,9824,105,116,59,1,9824,59,1,8741,4,3,99,115,117,16996,17028,17089,4,2,97,117,17002,17015,112,4,2,59,115,17009,17011,1,8851,59,3,8851,65024,112,4,2,59,115,17022,17024,1,8852,59,3,8852,65024,117,4,2,98,112,17035,17062,4,3,59,101,115,17043,17045,17048,1,8847,59,1,8849,101,116,4,2,59,101,17056,17058,1,8847,113,59,1,8849,4,3,59,101,115,17070,17072,17075,1,8848,59,1,8850,101,116,4,2,59,101,17083,17085,1,8848,113,59,1,8850,4,3,59,97,102,17097,17099,17112,1,9633,114,4,2,101,102,17106,17109,59,1,9633,59,1,9642,59,1,9642,97,114,114,59,1,8594,4,4,99,101,109,116,17131,17136,17142,17148,114,59,3,55349,56520,116,109,110,59,1,8726,105,108,101,59,1,8995,97,114,102,59,1,8902,4,2,97,114,17160,17172,114,4,2,59,102,17167,17169,1,9734,59,1,9733,4,2,97,110,17178,17202,105,103,104,116,4,2,101,112,17188,17197,112,115,105,108,111,110,59,1,1013,104,105,59,1,981,115,59,1,175,4,5,98,99,109,110,112,17218,17351,17420,17423,17427,4,9,59,69,100,101,109,110,112,114,115,17238,17240,17243,17248,17261,17267,17279,17285,17291,1,8834,59,1,10949,111,116,59,1,10941,4,2,59,100,17254,17256,1,8838,111,116,59,1,10947,117,108,116,59,1,10945,4,2,69,101,17273,17276,59,1,10955,59,1,8842,108,117,115,59,1,10943,97,114,114,59,1,10617,4,3,101,105,117,17299,17335,17339,116,4,3,59,101,110,17308,17310,17322,1,8834,113,4,2,59,113,17317,17319,1,8838,59,1,10949,101,113,4,2,59,113,17330,17332,1,8842,59,1,10955,109,59,1,10951,4,2,98,112,17345,17348,59,1,10965,59,1,10963,99,4,6,59,97,99,101,110,115,17366,17368,17376,17385,17389,17415,1,8827,112,112,114,111,120,59,1,10936,117,114,108,121,101,113,59,1,8829,113,59,1,10928,4,3,97,101,115,17397,17405,17410,112,112,114,111,120,59,1,10938,113,113,59,1,10934,105,109,59,1,8937,105,109,59,1,8831,59,1,8721,103,59,1,9834,4,13,49,50,51,59,69,100,101,104,108,109,110,112,115,17455,17462,17469,17476,17478,17481,17496,17509,17524,17530,17536,17548,17554,5,185,1,59,17460,1,185,5,178,1,59,17467,1,178,5,179,1,59,17474,1,179,1,8835,59,1,10950,4,2,111,115,17487,17491,116,59,1,10942,117,98,59,1,10968,4,2,59,100,17502,17504,1,8839,111,116,59,1,10948,115,4,2,111,117,17516,17520,108,59,1,10185,98,59,1,10967,97,114,114,59,1,10619,117,108,116,59,1,10946,4,2,69,101,17542,17545,59,1,10956,59,1,8843,108,117,115,59,1,10944,4,3,101,105,117,17562,17598,17602,116,4,3,59,101,110,17571,17573,17585,1,8835,113,4,2,59,113,17580,17582,1,8839,59,1,10950,101,113,4,2,59,113,17593,17595,1,8843,59,1,10956,109,59,1,10952,4,2,98,112,17608,17611,59,1,10964,59,1,10966,4,3,65,97,110,17622,17627,17650,114,114,59,1,8665,114,4,2,104,114,17634,17638,107,59,1,10534,4,2,59,111,17644,17646,1,8601,119,59,1,8601,119,97,114,59,1,10538,108,105,103,5,223,1,59,17664,1,223,4,13,97,98,99,100,101,102,104,105,111,112,114,115,119,17694,17709,17714,17737,17742,17749,17754,17860,17905,17957,17964,18090,18122,4,2,114,117,17700,17706,103,101,116,59,1,8982,59,1,964,114,107,59,1,9140,4,3,97,101,121,17722,17728,17734,114,111,110,59,1,357,100,105,108,59,1,355,59,1,1090,111,116,59,1,8411,108,114,101,99,59,1,8981,114,59,3,55349,56625,4,4,101,105,107,111,17764,17805,17836,17851,4,2,114,116,17770,17786,101,4,2,52,102,17777,17780,59,1,8756,111,114,101,59,1,8756,97,4,3,59,115,118,17795,17797,17802,1,952,121,109,59,1,977,59,1,977,4,2,99,110,17811,17831,107,4,2,97,115,17818,17826,112,112,114,111,120,59,1,8776,105,109,59,1,8764,115,112,59,1,8201,4,2,97,115,17842,17846,112,59,1,8776,105,109,59,1,8764,114,110,5,254,1,59,17858,1,254,4,3,108,109,110,17868,17873,17901,100,101,59,1,732,101,115,5,215,3,59,98,100,17884,17886,17898,1,215,4,2,59,97,17892,17894,1,8864,114,59,1,10801,59,1,10800,116,59,1,8749,4,3,101,112,115,17913,17917,17953,97,59,1,10536,4,4,59,98,99,102,17927,17929,17934,17939,1,8868,111,116,59,1,9014,105,114,59,1,10993,4,2,59,111,17945,17948,3,55349,56677,114,107,59,1,10970,97,59,1,10537,114,105,109,101,59,1,8244,4,3,97,105,112,17972,17977,18082,100,101,59,1,8482,4,7,97,100,101,109,112,115,116,17993,18051,18056,18059,18066,18072,18076,110,103,108,101,4,5,59,100,108,113,114,18009,18011,18017,18032,18035,1,9653,111,119,110,59,1,9663,101,102,116,4,2,59,101,18026,18028,1,9667,113,59,1,8884,59,1,8796,105,103,104,116,4,2,59,101,18045,18047,1,9657,113,59,1,8885,111,116,59,1,9708,59,1,8796,105,110,117,115,59,1,10810,108,117,115,59,1,10809,98,59,1,10701,105,109,101,59,1,10811,101,122,105,117,109,59,1,9186,4,3,99,104,116,18098,18111,18116,4,2,114,121,18104,18108,59,3,55349,56521,59,1,1094,99,121,59,1,1115,114,111,107,59,1,359,4,2,105,111,18128,18133,120,116,59,1,8812,104,101,97,100,4,2,108,114,18143,18154,101,102,116,97,114,114,111,119,59,1,8606,105,103,104,116,97,114,114,111,119,59,1,8608,4,18,65,72,97,98,99,100,102,103,104,108,109,111,112,114,115,116,117,119,18204,18209,18214,18234,18250,18268,18292,18308,18319,18343,18379,18397,18413,18504,18547,18553,18584,18603,114,114,59,1,8657,97,114,59,1,10595,4,2,99,114,18220,18230,117,116,101,5,250,1,59,18228,1,250,114,59,1,8593,114,4,2,99,101,18241,18245,121,59,1,1118,118,101,59,1,365,4,2,105,121,18256,18265,114,99,5,251,1,59,18263,1,251,59,1,1091,4,3,97,98,104,18276,18281,18287,114,114,59,1,8645,108,97,99,59,1,369,97,114,59,1,10606,4,2,105,114,18298,18304,115,104,116,59,1,10622,59,3,55349,56626,114,97,118,101,5,249,1,59,18317,1,249,4,2,97,98,18325,18338,114,4,2,108,114,18332,18335,59,1,8639,59,1,8638,108,107,59,1,9600,4,2,99,116,18349,18374,4,2,111,114,18355,18369,114,110,4,2,59,101,18363,18365,1,8988,114,59,1,8988,111,112,59,1,8975,114,105,59,1,9720,4,2,97,108,18385,18390,99,114,59,1,363,5,168,1,59,18395,1,168,4,2,103,112,18403,18408,111,110,59,1,371,102,59,3,55349,56678,4,6,97,100,104,108,115,117,18427,18434,18445,18470,18475,18494,114,114,111,119,59,1,8593,111,119,110,97,114,114,111,119,59,1,8597,97,114,112,111,111,110,4,2,108,114,18457,18463,101,102,116,59,1,8639,105,103,104,116,59,1,8638,117,115,59,1,8846,105,4,3,59,104,108,18484,18486,18489,1,965,59,1,978,111,110,59,1,965,112,97,114,114,111,119,115,59,1,8648,4,3,99,105,116,18512,18537,18542,4,2,111,114,18518,18532,114,110,4,2,59,101,18526,18528,1,8989,114,59,1,8989,111,112,59,1,8974,110,103,59,1,367,114,105,59,1,9721,99,114,59,3,55349,56522,4,3,100,105,114,18561,18566,18572,111,116,59,1,8944,108,100,101,59,1,361,105,4,2,59,102,18579,18581,1,9653,59,1,9652,4,2,97,109,18590,18595,114,114,59,1,8648,108,5,252,1,59,18601,1,252,97,110,103,108,101,59,1,10663,4,15,65,66,68,97,99,100,101,102,108,110,111,112,114,115,122,18643,18648,18661,18667,18847,18851,18857,18904,18909,18915,18931,18937,18943,18949,18996,114,114,59,1,8661,97,114,4,2,59,118,18656,18658,1,10984,59,1,10985,97,115,104,59,1,8872,4,2,110,114,18673,18679,103,114,116,59,1,10652,4,7,101,107,110,112,114,115,116,18695,18704,18711,18720,18742,18754,18810,112,115,105,108,111,110,59,1,1013,97,112,112,97,59,1,1008,111,116,104,105,110,103,59,1,8709,4,3,104,105,114,18728,18732,18735,105,59,1,981,59,1,982,111,112,116,111,59,1,8733,4,2,59,104,18748,18750,1,8597,111,59,1,1009,4,2,105,117,18760,18766,103,109,97,59,1,962,4,2,98,112,18772,18791,115,101,116,110,101,113,4,2,59,113,18784,18787,3,8842,65024,59,3,10955,65024,115,101,116,110,101,113,4,2,59,113,18803,18806,3,8843,65024,59,3,10956,65024,4,2,104,114,18816,18822,101,116,97,59,1,977,105,97,110,103,108,101,4,2,108,114,18834,18840,101,102,116,59,1,8882,105,103,104,116,59,1,8883,121,59,1,1074,97,115,104,59,1,8866,4,3,101,108,114,18865,18884,18890,4,3,59,98,101,18873,18875,18880,1,8744,97,114,59,1,8891,113,59,1,8794,108,105,112,59,1,8942,4,2,98,116,18896,18901,97,114,59,1,124,59,1,124,114,59,3,55349,56627,116,114,105,59,1,8882,115,117,4,2,98,112,18923,18927,59,3,8834,8402,59,3,8835,8402,112,102,59,3,55349,56679,114,111,112,59,1,8733,116,114,105,59,1,8883,4,2,99,117,18955,18960,114,59,3,55349,56523,4,2,98,112,18966,18981,110,4,2,69,101,18973,18977,59,3,10955,65024,59,3,8842,65024,110,4,2,69,101,18988,18992,59,3,10956,65024,59,3,8843,65024,105,103,122,97,103,59,1,10650,4,7,99,101,102,111,112,114,115,19020,19026,19061,19066,19072,19075,19089,105,114,99,59,1,373,4,2,100,105,19032,19055,4,2,98,103,19038,19043,97,114,59,1,10847,101,4,2,59,113,19050,19052,1,8743,59,1,8793,101,114,112,59,1,8472,114,59,3,55349,56628,112,102,59,3,55349,56680,59,1,8472,4,2,59,101,19081,19083,1,8768,97,116,104,59,1,8768,99,114,59,3,55349,56524,4,14,99,100,102,104,105,108,109,110,111,114,115,117,118,119,19125,19146,19152,19157,19173,19176,19192,19197,19202,19236,19252,19269,19286,19291,4,3,97,105,117,19133,19137,19142,112,59,1,8898,114,99,59,1,9711,112,59,1,8899,116,114,105,59,1,9661,114,59,3,55349,56629,4,2,65,97,19163,19168,114,114,59,1,10234,114,114,59,1,10231,59,1,958,4,2,65,97,19182,19187,114,114,59,1,10232,114,114,59,1,10229,97,112,59,1,10236,105,115,59,1,8955,4,3,100,112,116,19210,19215,19230,111,116,59,1,10752,4,2,102,108,19221,19225,59,3,55349,56681,117,115,59,1,10753,105,109,101,59,1,10754,4,2,65,97,19242,19247,114,114,59,1,10233,114,114,59,1,10230,4,2,99,113,19258,19263,114,59,3,55349,56525,99,117,112,59,1,10758,4,2,112,116,19275,19281,108,117,115,59,1,10756,114,105,59,1,9651,101,101,59,1,8897,101,100,103,101,59,1,8896,4,8,97,99,101,102,105,111,115,117,19316,19335,19349,19357,19362,19367,19373,19379,99,4,2,117,121,19323,19332,116,101,5,253,1,59,19330,1,253,59,1,1103,4,2,105,121,19341,19346,114,99,59,1,375,59,1,1099,110,5,165,1,59,19355,1,165,114,59,3,55349,56630,99,121,59,1,1111,112,102,59,3,55349,56682,99,114,59,3,55349,56526,4,2,99,109,19385,19389,121,59,1,1102,108,5,255,1,59,19395,1,255,4,10,97,99,100,101,102,104,105,111,115,119,19419,19426,19441,19446,19462,19467,19472,19480,19486,19492,99,117,116,101,59,1,378,4,2,97,121,19432,19438,114,111,110,59,1,382,59,1,1079,111,116,59,1,380,4,2,101,116,19452,19458,116,114,102,59,1,8488,97,59,1,950,114,59,3,55349,56631,99,121,59,1,1078,103,114,97,114,114,59,1,8669,112,102,59,3,55349,56683,99,114,59,3,55349,56527,4,2,106,110,19498,19501,59,1,8205,106,59,1,8204])},function(e,t,n){"use strict";const r=n(41),i=r.TAG_NAMES,s=r.NAMESPACES;function o(e){switch(e.length){case 1:return e===i.P;case 2:return e===i.RB||e===i.RP||e===i.RT||e===i.DD||e===i.DT||e===i.LI;case 3:return e===i.RTC;case 6:return e===i.OPTION;case 8:return e===i.OPTGROUP}return!1}function a(e){switch(e.length){case 1:return e===i.P;case 2:return e===i.RB||e===i.RP||e===i.RT||e===i.DD||e===i.DT||e===i.LI||e===i.TD||e===i.TH||e===i.TR;case 3:return e===i.RTC;case 5:return e===i.TBODY||e===i.TFOOT||e===i.THEAD;case 6:return e===i.OPTION;case 7:return e===i.CAPTION;case 8:return e===i.OPTGROUP||e===i.COLGROUP}return!1}function l(e,t){switch(e.length){case 2:if(e===i.TD||e===i.TH)return t===s.HTML;if(e===i.MI||e===i.MO||e===i.MN||e===i.MS)return t===s.MATHML;break;case 4:if(e===i.HTML)return t===s.HTML;if(e===i.DESC)return t===s.SVG;break;case 5:if(e===i.TABLE)return t===s.HTML;if(e===i.MTEXT)return t===s.MATHML;if(e===i.TITLE)return t===s.SVG;break;case 6:return(e===i.APPLET||e===i.OBJECT)&&t===s.HTML;case 7:return(e===i.CAPTION||e===i.MARQUEE)&&t===s.HTML;case 8:return e===i.TEMPLATE&&t===s.HTML;case 13:return e===i.FOREIGN_OBJECT&&t===s.SVG;case 14:return e===i.ANNOTATION_XML&&t===s.MATHML}return!1}e.exports=class{constructor(e,t){this.stackTop=-1,this.items=[],this.current=e,this.currentTagName=null,this.currentTmplContent=null,this.tmplCount=0,this.treeAdapter=t}_indexOf(e){let t=-1;for(let n=this.stackTop;n>=0;n--)if(this.items[n]===e){t=n;break}return t}_isInTemplate(){return this.currentTagName===i.TEMPLATE&&this.treeAdapter.getNamespaceURI(this.current)===s.HTML}_updateCurrentElement(){this.current=this.items[this.stackTop],this.currentTagName=this.current&&this.treeAdapter.getTagName(this.current),this.currentTmplContent=this._isInTemplate()?this.treeAdapter.getTemplateContent(this.current):null}push(e){this.items[++this.stackTop]=e,this._updateCurrentElement(),this._isInTemplate()&&this.tmplCount++}pop(){this.stackTop--,this.tmplCount>0&&this._isInTemplate()&&this.tmplCount--,this._updateCurrentElement()}replace(e,t){const n=this._indexOf(e);this.items[n]=t,n===this.stackTop&&this._updateCurrentElement()}insertAfter(e,t){const n=this._indexOf(e)+1;this.items.splice(n,0,t),n===++this.stackTop&&this._updateCurrentElement()}popUntilTagNamePopped(e){for(;this.stackTop>-1;){const t=this.currentTagName,n=this.treeAdapter.getNamespaceURI(this.current);if(this.pop(),t===e&&n===s.HTML)break}}popUntilElementPopped(e){for(;this.stackTop>-1;){const t=this.current;if(this.pop(),t===e)break}}popUntilNumberedHeaderPopped(){for(;this.stackTop>-1;){const e=this.currentTagName,t=this.treeAdapter.getNamespaceURI(this.current);if(this.pop(),e===i.H1||e===i.H2||e===i.H3||e===i.H4||e===i.H5||e===i.H6&&t===s.HTML)break}}popUntilTableCellPopped(){for(;this.stackTop>-1;){const e=this.currentTagName,t=this.treeAdapter.getNamespaceURI(this.current);if(this.pop(),e===i.TD||e===i.TH&&t===s.HTML)break}}popAllUpToHtmlElement(){this.stackTop=0,this._updateCurrentElement()}clearBackToTableContext(){for(;this.currentTagName!==i.TABLE&&this.currentTagName!==i.TEMPLATE&&this.currentTagName!==i.HTML||this.treeAdapter.getNamespaceURI(this.current)!==s.HTML;)this.pop()}clearBackToTableBodyContext(){for(;this.currentTagName!==i.TBODY&&this.currentTagName!==i.TFOOT&&this.currentTagName!==i.THEAD&&this.currentTagName!==i.TEMPLATE&&this.currentTagName!==i.HTML||this.treeAdapter.getNamespaceURI(this.current)!==s.HTML;)this.pop()}clearBackToTableRowContext(){for(;this.currentTagName!==i.TR&&this.currentTagName!==i.TEMPLATE&&this.currentTagName!==i.HTML||this.treeAdapter.getNamespaceURI(this.current)!==s.HTML;)this.pop()}remove(e){for(let t=this.stackTop;t>=0;t--)if(this.items[t]===e){this.items.splice(t,1),this.stackTop--,this._updateCurrentElement();break}}tryPeekProperlyNestedBodyElement(){const e=this.items[1];return e&&this.treeAdapter.getTagName(e)===i.BODY?e:null}contains(e){return this._indexOf(e)>-1}getCommonAncestor(e){let t=this._indexOf(e);return--t>=0?this.items[t]:null}isRootHtmlElementCurrent(){return 0===this.stackTop&&this.currentTagName===i.HTML}hasInScope(e){for(let t=this.stackTop;t>=0;t--){const n=this.treeAdapter.getTagName(this.items[t]),r=this.treeAdapter.getNamespaceURI(this.items[t]);if(n===e&&r===s.HTML)return!0;if(l(n,r))return!1}return!0}hasNumberedHeaderInScope(){for(let e=this.stackTop;e>=0;e--){const t=this.treeAdapter.getTagName(this.items[e]),n=this.treeAdapter.getNamespaceURI(this.items[e]);if((t===i.H1||t===i.H2||t===i.H3||t===i.H4||t===i.H5||t===i.H6)&&n===s.HTML)return!0;if(l(t,n))return!1}return!0}hasInListItemScope(e){for(let t=this.stackTop;t>=0;t--){const n=this.treeAdapter.getTagName(this.items[t]),r=this.treeAdapter.getNamespaceURI(this.items[t]);if(n===e&&r===s.HTML)return!0;if((n===i.UL||n===i.OL)&&r===s.HTML||l(n,r))return!1}return!0}hasInButtonScope(e){for(let t=this.stackTop;t>=0;t--){const n=this.treeAdapter.getTagName(this.items[t]),r=this.treeAdapter.getNamespaceURI(this.items[t]);if(n===e&&r===s.HTML)return!0;if(n===i.BUTTON&&r===s.HTML||l(n,r))return!1}return!0}hasInTableScope(e){for(let t=this.stackTop;t>=0;t--){const n=this.treeAdapter.getTagName(this.items[t]);if(this.treeAdapter.getNamespaceURI(this.items[t])===s.HTML){if(n===e)return!0;if(n===i.TABLE||n===i.TEMPLATE||n===i.HTML)return!1}}return!0}hasTableBodyContextInTableScope(){for(let e=this.stackTop;e>=0;e--){const t=this.treeAdapter.getTagName(this.items[e]);if(this.treeAdapter.getNamespaceURI(this.items[e])===s.HTML){if(t===i.TBODY||t===i.THEAD||t===i.TFOOT)return!0;if(t===i.TABLE||t===i.HTML)return!1}}return!0}hasInSelectScope(e){for(let t=this.stackTop;t>=0;t--){const n=this.treeAdapter.getTagName(this.items[t]);if(this.treeAdapter.getNamespaceURI(this.items[t])===s.HTML){if(n===e)return!0;if(n!==i.OPTION&&n!==i.OPTGROUP)return!1}}return!0}generateImpliedEndTags(){for(;o(this.currentTagName);)this.pop()}generateImpliedEndTagsThoroughly(){for(;a(this.currentTagName);)this.pop()}generateImpliedEndTagsWithExclusion(e){for(;o(this.currentTagName)&&this.currentTagName!==e;)this.pop()}}},function(e,t,n){"use strict";class r{constructor(e){this.length=0,this.entries=[],this.treeAdapter=e,this.bookmark=null}_getNoahArkConditionCandidates(e){const t=[];if(this.length>=3){const n=this.treeAdapter.getAttrList(e).length,i=this.treeAdapter.getTagName(e),s=this.treeAdapter.getNamespaceURI(e);for(let e=this.length-1;e>=0;e--){const o=this.entries[e];if(o.type===r.MARKER_ENTRY)break;const a=o.element,l=this.treeAdapter.getAttrList(a);this.treeAdapter.getTagName(a)===i&&this.treeAdapter.getNamespaceURI(a)===s&&l.length===n&&t.push({idx:e,attrs:l})}}return t.length<3?[]:t}_ensureNoahArkCondition(e){const t=this._getNoahArkConditionCandidates(e);let n=t.length;if(n){const r=this.treeAdapter.getAttrList(e),i=r.length,s=Object.create(null);for(let e=0;e<i;e++){const t=r[e];s[t.name]=t.value}for(let e=0;e<i;e++)for(let r=0;r<n;r++){const i=t[r].attrs[e];if(s[i.name]!==i.value&&(t.splice(r,1),n--),t.length<3)return}for(let e=n-1;e>=2;e--)this.entries.splice(t[e].idx,1),this.length--}}insertMarker(){this.entries.push({type:r.MARKER_ENTRY}),this.length++}pushElement(e,t){this._ensureNoahArkCondition(e),this.entries.push({type:r.ELEMENT_ENTRY,element:e,token:t}),this.length++}insertElementAfterBookmark(e,t){let n=this.length-1;for(;n>=0&&this.entries[n]!==this.bookmark;n--);this.entries.splice(n+1,0,{type:r.ELEMENT_ENTRY,element:e,token:t}),this.length++}removeEntry(e){for(let t=this.length-1;t>=0;t--)if(this.entries[t]===e){this.entries.splice(t,1),this.length--;break}}clearToLastMarker(){for(;this.length;){const e=this.entries.pop();if(this.length--,e.type===r.MARKER_ENTRY)break}}getElementEntryInScopeWithTagName(e){for(let t=this.length-1;t>=0;t--){const n=this.entries[t];if(n.type===r.MARKER_ENTRY)return null;if(this.treeAdapter.getTagName(n.element)===e)return n}return null}getElementEntry(e){for(let t=this.length-1;t>=0;t--){const n=this.entries[t];if(n.type===r.ELEMENT_ENTRY&&n.element===e)return n}return null}}r.MARKER_ENTRY="MARKER_ENTRY",r.ELEMENT_ENTRY="ELEMENT_ENTRY",e.exports=r},function(e,t,n){"use strict";const r=n(19),i=n(82),s=n(218),o=n(627),a=n(41).TAG_NAMES;e.exports=class extends r{constructor(e){super(e),this.parser=e,this.treeAdapter=this.parser.treeAdapter,this.posTracker=null,this.lastStartTagToken=null,this.lastFosterParentingLocation=null,this.currentToken=null}_setStartLocation(e){let t=null;this.lastStartTagToken&&(t=Object.assign({},this.lastStartTagToken.location),t.startTag=this.lastStartTagToken.location),this.treeAdapter.setNodeSourceCodeLocation(e,t)}_setEndLocation(e,t){if(this.treeAdapter.getNodeSourceCodeLocation(e)&&t.location){const n=t.location,r=this.treeAdapter.getTagName(e),s={};t.type===i.END_TAG_TOKEN&&r===t.tagName?(s.endTag=Object.assign({},n),s.endLine=n.endLine,s.endCol=n.endCol,s.endOffset=n.endOffset):(s.endLine=n.startLine,s.endCol=n.startCol,s.endOffset=n.startOffset),this.treeAdapter.updateNodeSourceCodeLocation(e,s)}}_getOverriddenMethods(e,t){return{_bootstrap(n,i){t._bootstrap.call(this,n,i),e.lastStartTagToken=null,e.lastFosterParentingLocation=null,e.currentToken=null;const a=r.install(this.tokenizer,s);e.posTracker=a.posTracker,r.install(this.openElements,o,{onItemPop:function(t){e._setEndLocation(t,e.currentToken)}})},_runParsingLoop(n){t._runParsingLoop.call(this,n);for(let t=this.openElements.stackTop;t>=0;t--)e._setEndLocation(this.openElements.items[t],e.currentToken)},_processTokenInForeignContent(n){e.currentToken=n,t._processTokenInForeignContent.call(this,n)},_processToken(n){e.currentToken=n,t._processToken.call(this,n);if(n.type===i.END_TAG_TOKEN&&(n.tagName===a.HTML||n.tagName===a.BODY&&this.openElements.hasInScope(a.BODY)))for(let t=this.openElements.stackTop;t>=0;t--){const r=this.openElements.items[t];if(this.treeAdapter.getTagName(r)===n.tagName){e._setEndLocation(r,n);break}}},_setDocumentType(e){t._setDocumentType.call(this,e);const n=this.treeAdapter.getChildNodes(this.document),r=n.length;for(let t=0;t<r;t++){const r=n[t];if(this.treeAdapter.isDocumentTypeNode(r)){this.treeAdapter.setNodeSourceCodeLocation(r,e.location);break}}},_attachElementToTree(n){e._setStartLocation(n),e.lastStartTagToken=null,t._attachElementToTree.call(this,n)},_appendElement(n,r){e.lastStartTagToken=n,t._appendElement.call(this,n,r)},_insertElement(n,r){e.lastStartTagToken=n,t._insertElement.call(this,n,r)},_insertTemplate(n){e.lastStartTagToken=n,t._insertTemplate.call(this,n);const r=this.treeAdapter.getTemplateContent(this.openElements.current);this.treeAdapter.setNodeSourceCodeLocation(r,null)},_insertFakeRootElement(){t._insertFakeRootElement.call(this),this.treeAdapter.setNodeSourceCodeLocation(this.openElements.current,null)},_appendCommentNode(e,n){t._appendCommentNode.call(this,e,n);const r=this.treeAdapter.getChildNodes(n),i=r[r.length-1];this.treeAdapter.setNodeSourceCodeLocation(i,e.location)},_findFosterParentingLocation(){return e.lastFosterParentingLocation=t._findFosterParentingLocation.call(this),e.lastFosterParentingLocation},_insertCharacters(n){t._insertCharacters.call(this,n);const r=this._shouldFosterParentOnInsertion(),i=r&&e.lastFosterParentingLocation.parent||this.openElements.currentTmplContent||this.openElements.current,s=this.treeAdapter.getChildNodes(i),o=r&&e.lastFosterParentingLocation.beforeElement?s.indexOf(e.lastFosterParentingLocation.beforeElement)-1:s.length-1,a=s[o];if(this.treeAdapter.getNodeSourceCodeLocation(a)){const{endLine:e,endCol:t,endOffset:r}=n.location;this.treeAdapter.updateNodeSourceCodeLocation(a,{endLine:e,endCol:t,endOffset:r})}else this.treeAdapter.setNodeSourceCodeLocation(a,n.location)}}}}},function(e,t,n){"use strict";const r=n(19);e.exports=class extends r{constructor(e,t){super(e),this.onItemPop=t.onItemPop}_getOverriddenMethods(e,t){return{pop(){e.onItemPop(this.current),t.pop.call(this)},popAllUpToHtmlElement(){for(let t=this.stackTop;t>0;t--)e.onItemPop(this.items[t]);t.popAllUpToHtmlElement.call(this)},remove(n){e.onItemPop(this.current),t.remove.call(this,n)}}}}},function(e,t,n){"use strict";const r=n(127),i=n(629),s=n(218),o=n(19);e.exports=class extends r{constructor(e,t){super(e,t),this.opts=t,this.ctLoc=null,this.locBeforeToken=!1}_setErrorLocation(e){this.ctLoc&&(e.startLine=this.ctLoc.startLine,e.startCol=this.ctLoc.startCol,e.startOffset=this.ctLoc.startOffset,e.endLine=this.locBeforeToken?this.ctLoc.startLine:this.ctLoc.endLine,e.endCol=this.locBeforeToken?this.ctLoc.startCol:this.ctLoc.endCol,e.endOffset=this.locBeforeToken?this.ctLoc.startOffset:this.ctLoc.endOffset)}_getOverriddenMethods(e,t){return{_bootstrap(n,r){t._bootstrap.call(this,n,r),o.install(this.tokenizer,i,e.opts),o.install(this.tokenizer,s)},_processInputToken(n){e.ctLoc=n.location,t._processInputToken.call(this,n)},_err(t,n){e.locBeforeToken=n&&n.beforeToken,e._reportError(t)}}}}},function(e,t,n){"use strict";const r=n(127),i=n(630),s=n(19);e.exports=class extends r{constructor(e,t){super(e,t);const n=s.install(e.preprocessor,i,t);this.posTracker=n.posTracker}}},function(e,t,n){"use strict";const r=n(127),i=n(219),s=n(19);e.exports=class extends r{constructor(e,t){super(e,t),this.posTracker=s.install(e,i),this.lastErrOffset=-1}_reportError(e){this.lastErrOffset!==this.posTracker.offset&&(this.lastErrOffset=this.posTracker.offset,super._reportError(e))}}},function(e,t,n){"use strict";const{DOCUMENT_MODE:r}=n(41);t.createDocument=function(){return{nodeName:"#document",mode:r.NO_QUIRKS,childNodes:[]}},t.createDocumentFragment=function(){return{nodeName:"#document-fragment",childNodes:[]}},t.createElement=function(e,t,n){return{nodeName:e,tagName:e,attrs:n,namespaceURI:t,childNodes:[],parentNode:null}},t.createCommentNode=function(e){return{nodeName:"#comment",data:e,parentNode:null}};const i=function(e){return{nodeName:"#text",value:e,parentNode:null}},s=t.appendChild=function(e,t){e.childNodes.push(t),t.parentNode=e},o=t.insertBefore=function(e,t,n){const r=e.childNodes.indexOf(n);e.childNodes.splice(r,0,t),t.parentNode=e};t.setTemplateContent=function(e,t){e.content=t},t.getTemplateContent=function(e){return e.content},t.setDocumentType=function(e,t,n,r){let i=null;for(let s=0;s<e.childNodes.length;s++)if("#documentType"===e.childNodes[s].nodeName){i=e.childNodes[s];break}i?(i.name=t,i.publicId=n,i.systemId=r):s(e,{nodeName:"#documentType",name:t,publicId:n,systemId:r})},t.setDocumentMode=function(e,t){e.mode=t},t.getDocumentMode=function(e){return e.mode},t.detachNode=function(e){if(e.parentNode){const t=e.parentNode.childNodes.indexOf(e);e.parentNode.childNodes.splice(t,1),e.parentNode=null}},t.insertText=function(e,t){if(e.childNodes.length){const n=e.childNodes[e.childNodes.length-1];if("#text"===n.nodeName)return void(n.value+=t)}s(e,i(t))},t.insertTextBefore=function(e,t,n){const r=e.childNodes[e.childNodes.indexOf(n)-1];r&&"#text"===r.nodeName?r.value+=t:o(e,i(t),n)},t.adoptAttributes=function(e,t){const n=[];for(let r=0;r<e.attrs.length;r++)n.push(e.attrs[r].name);for(let r=0;r<t.length;r++)-1===n.indexOf(t[r].name)&&e.attrs.push(t[r])},t.getFirstChild=function(e){return e.childNodes[0]},t.getChildNodes=function(e){return e.childNodes},t.getParentNode=function(e){return e.parentNode},t.getAttrList=function(e){return e.attrs},t.getTagName=function(e){return e.tagName},t.getNamespaceURI=function(e){return e.namespaceURI},t.getTextNodeContent=function(e){return e.value},t.getCommentNodeContent=function(e){return e.data},t.getDocumentTypeNodeName=function(e){return e.name},t.getDocumentTypeNodePublicId=function(e){return e.publicId},t.getDocumentTypeNodeSystemId=function(e){return e.systemId},t.isTextNode=function(e){return"#text"===e.nodeName},t.isCommentNode=function(e){return"#comment"===e.nodeName},t.isDocumentTypeNode=function(e){return"#documentType"===e.nodeName},t.isElementNode=function(e){return!!e.tagName},t.setNodeSourceCodeLocation=function(e,t){e.sourceCodeLocation=t},t.getNodeSourceCodeLocation=function(e){return e.sourceCodeLocation},t.updateNodeSourceCodeLocation=function(e,t){e.sourceCodeLocation=Object.assign(e.sourceCodeLocation,t)}},function(e,t,n){"use strict";e.exports=function(e,t){return[e,t=t||Object.create(null)].reduce((e,t)=>(Object.keys(t).forEach(n=>{e[n]=t[n]}),e),Object.create(null))}},function(e,t,n){"use strict";const{DOCUMENT_MODE:r}=n(41),i=["+//silmaril//dtd html pro v0r11 19970101//","-//as//dtd html 3.0 aswedit + extensions//","-//advasoft ltd//dtd html 3.0 aswedit + extensions//","-//ietf//dtd html 2.0 level 1//","-//ietf//dtd html 2.0 level 2//","-//ietf//dtd html 2.0 strict level 1//","-//ietf//dtd html 2.0 strict level 2//","-//ietf//dtd html 2.0 strict//","-//ietf//dtd html 2.0//","-//ietf//dtd html 2.1e//","-//ietf//dtd html 3.0//","-//ietf//dtd html 3.2 final//","-//ietf//dtd html 3.2//","-//ietf//dtd html 3//","-//ietf//dtd html level 0//","-//ietf//dtd html level 1//","-//ietf//dtd html level 2//","-//ietf//dtd html level 3//","-//ietf//dtd html strict level 0//","-//ietf//dtd html strict level 1//","-//ietf//dtd html strict level 2//","-//ietf//dtd html strict level 3//","-//ietf//dtd html strict//","-//ietf//dtd html//","-//metrius//dtd metrius presentational//","-//microsoft//dtd internet explorer 2.0 html strict//","-//microsoft//dtd internet explorer 2.0 html//","-//microsoft//dtd internet explorer 2.0 tables//","-//microsoft//dtd internet explorer 3.0 html strict//","-//microsoft//dtd internet explorer 3.0 html//","-//microsoft//dtd internet explorer 3.0 tables//","-//netscape comm. corp.//dtd html//","-//netscape comm. corp.//dtd strict html//","-//o'reilly and associates//dtd html 2.0//","-//o'reilly and associates//dtd html extended 1.0//","-//o'reilly and associates//dtd html extended relaxed 1.0//","-//sq//dtd html 2.0 hotmetal + extensions//","-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//","-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//","-//spyglass//dtd html 2.0 extended//","-//sun microsystems corp.//dtd hotjava html//","-//sun microsystems corp.//dtd hotjava strict html//","-//w3c//dtd html 3 1995-03-24//","-//w3c//dtd html 3.2 draft//","-//w3c//dtd html 3.2 final//","-//w3c//dtd html 3.2//","-//w3c//dtd html 3.2s draft//","-//w3c//dtd html 4.0 frameset//","-//w3c//dtd html 4.0 transitional//","-//w3c//dtd html experimental 19960712//","-//w3c//dtd html experimental 970421//","-//w3c//dtd w3 html//","-//w3o//dtd w3 html 3.0//","-//webtechs//dtd mozilla html 2.0//","-//webtechs//dtd mozilla html//"],s=i.concat(["-//w3c//dtd html 4.01 frameset//","-//w3c//dtd html 4.01 transitional//"]),o=["-//w3o//dtd w3 html strict 3.0//en//","-/w3c/dtd html 4.0 transitional/en","html"],a=["-//w3c//dtd xhtml 1.0 frameset//","-//w3c//dtd xhtml 1.0 transitional//"],l=a.concat(["-//w3c//dtd html 4.01 frameset//","-//w3c//dtd html 4.01 transitional//"]);function c(e){const t=-1!==e.indexOf('"')?"'":'"';return t+e+t}function u(e,t){for(let n=0;n<t.length;n++)if(0===e.indexOf(t[n]))return!0;return!1}t.isConforming=function(e){return"html"===e.name&&null===e.publicId&&(null===e.systemId||"about:legacy-compat"===e.systemId)},t.getDocumentMode=function(e){if("html"!==e.name)return r.QUIRKS;const t=e.systemId;if(t&&"http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd"===t.toLowerCase())return r.QUIRKS;let n=e.publicId;if(null!==n){if(n=n.toLowerCase(),o.indexOf(n)>-1)return r.QUIRKS;let e=null===t?s:i;if(u(n,e))return r.QUIRKS;if(e=null===t?a:l,u(n,e))return r.LIMITED_QUIRKS}return r.NO_QUIRKS},t.serializeContent=function(e,t,n){let r="!DOCTYPE ";return e&&(r+=e),t?r+=" PUBLIC "+c(t):n&&(r+=" SYSTEM"),null!==n&&(r+=" "+c(n)),r}},function(e,t,n){"use strict";const r=n(82),i=n(41),s=i.TAG_NAMES,o=i.NAMESPACES,a=i.ATTRS,l="text/html",c="application/xhtml+xml",u={attributename:"attributeName",attributetype:"attributeType",basefrequency:"baseFrequency",baseprofile:"baseProfile",calcmode:"calcMode",clippathunits:"clipPathUnits",diffuseconstant:"diffuseConstant",edgemode:"edgeMode",filterunits:"filterUnits",glyphref:"glyphRef",gradienttransform:"gradientTransform",gradientunits:"gradientUnits",kernelmatrix:"kernelMatrix",kernelunitlength:"kernelUnitLength",keypoints:"keyPoints",keysplines:"keySplines",keytimes:"keyTimes",lengthadjust:"lengthAdjust",limitingconeangle:"limitingConeAngle",markerheight:"markerHeight",markerunits:"markerUnits",markerwidth:"markerWidth",maskcontentunits:"maskContentUnits",maskunits:"maskUnits",numoctaves:"numOctaves",pathlength:"pathLength",patterncontentunits:"patternContentUnits",patterntransform:"patternTransform",patternunits:"patternUnits",pointsatx:"pointsAtX",pointsaty:"pointsAtY",pointsatz:"pointsAtZ",preservealpha:"preserveAlpha",preserveaspectratio:"preserveAspectRatio",primitiveunits:"primitiveUnits",refx:"refX",refy:"refY",repeatcount:"repeatCount",repeatdur:"repeatDur",requiredextensions:"requiredExtensions",requiredfeatures:"requiredFeatures",specularconstant:"specularConstant",specularexponent:"specularExponent",spreadmethod:"spreadMethod",startoffset:"startOffset",stddeviation:"stdDeviation",stitchtiles:"stitchTiles",surfacescale:"surfaceScale",systemlanguage:"systemLanguage",tablevalues:"tableValues",targetx:"targetX",targety:"targetY",textlength:"textLength",viewbox:"viewBox",viewtarget:"viewTarget",xchannelselector:"xChannelSelector",ychannelselector:"yChannelSelector",zoomandpan:"zoomAndPan"},p={"xlink:actuate":{prefix:"xlink",name:"actuate",namespace:o.XLINK},"xlink:arcrole":{prefix:"xlink",name:"arcrole",namespace:o.XLINK},"xlink:href":{prefix:"xlink",name:"href",namespace:o.XLINK},"xlink:role":{prefix:"xlink",name:"role",namespace:o.XLINK},"xlink:show":{prefix:"xlink",name:"show",namespace:o.XLINK},"xlink:title":{prefix:"xlink",name:"title",namespace:o.XLINK},"xlink:type":{prefix:"xlink",name:"type",namespace:o.XLINK},"xml:base":{prefix:"xml",name:"base",namespace:o.XML},"xml:lang":{prefix:"xml",name:"lang",namespace:o.XML},"xml:space":{prefix:"xml",name:"space",namespace:o.XML},xmlns:{prefix:"",name:"xmlns",namespace:o.XMLNS},"xmlns:xlink":{prefix:"xmlns",name:"xlink",namespace:o.XMLNS}},f=t.SVG_TAG_NAMES_ADJUSTMENT_MAP={altglyph:"altGlyph",altglyphdef:"altGlyphDef",altglyphitem:"altGlyphItem",animatecolor:"animateColor",animatemotion:"animateMotion",animatetransform:"animateTransform",clippath:"clipPath",feblend:"feBlend",fecolormatrix:"feColorMatrix",fecomponenttransfer:"feComponentTransfer",fecomposite:"feComposite",feconvolvematrix:"feConvolveMatrix",fediffuselighting:"feDiffuseLighting",fedisplacementmap:"feDisplacementMap",fedistantlight:"feDistantLight",feflood:"feFlood",fefunca:"feFuncA",fefuncb:"feFuncB",fefuncg:"feFuncG",fefuncr:"feFuncR",fegaussianblur:"feGaussianBlur",feimage:"feImage",femerge:"feMerge",femergenode:"feMergeNode",femorphology:"feMorphology",feoffset:"feOffset",fepointlight:"fePointLight",fespecularlighting:"feSpecularLighting",fespotlight:"feSpotLight",fetile:"feTile",feturbulence:"feTurbulence",foreignobject:"foreignObject",glyphref:"glyphRef",lineargradient:"linearGradient",radialgradient:"radialGradient",textpath:"textPath"},h={[s.B]:!0,[s.BIG]:!0,[s.BLOCKQUOTE]:!0,[s.BODY]:!0,[s.BR]:!0,[s.CENTER]:!0,[s.CODE]:!0,[s.DD]:!0,[s.DIV]:!0,[s.DL]:!0,[s.DT]:!0,[s.EM]:!0,[s.EMBED]:!0,[s.H1]:!0,[s.H2]:!0,[s.H3]:!0,[s.H4]:!0,[s.H5]:!0,[s.H6]:!0,[s.HEAD]:!0,[s.HR]:!0,[s.I]:!0,[s.IMG]:!0,[s.LI]:!0,[s.LISTING]:!0,[s.MENU]:!0,[s.META]:!0,[s.NOBR]:!0,[s.OL]:!0,[s.P]:!0,[s.PRE]:!0,[s.RUBY]:!0,[s.S]:!0,[s.SMALL]:!0,[s.SPAN]:!0,[s.STRONG]:!0,[s.STRIKE]:!0,[s.SUB]:!0,[s.SUP]:!0,[s.TABLE]:!0,[s.TT]:!0,[s.U]:!0,[s.UL]:!0,[s.VAR]:!0};t.causesExit=function(e){const t=e.tagName;return!!(t===s.FONT&&(null!==r.getTokenAttr(e,a.COLOR)||null!==r.getTokenAttr(e,a.SIZE)||null!==r.getTokenAttr(e,a.FACE)))||h[t]},t.adjustTokenMathMLAttrs=function(e){for(let t=0;t<e.attrs.length;t++)if("definitionurl"===e.attrs[t].name){e.attrs[t].name="definitionURL";break}},t.adjustTokenSVGAttrs=function(e){for(let t=0;t<e.attrs.length;t++){const n=u[e.attrs[t].name];n&&(e.attrs[t].name=n)}},t.adjustTokenXMLAttrs=function(e){for(let t=0;t<e.attrs.length;t++){const n=p[e.attrs[t].name];n&&(e.attrs[t].prefix=n.prefix,e.attrs[t].name=n.name,e.attrs[t].namespace=n.namespace)}},t.adjustTokenSVGTagName=function(e){const t=f[e.tagName];t&&(e.tagName=t)},t.isIntegrationPoint=function(e,t,n,r){return!(r&&r!==o.HTML||!function(e,t,n){if(t===o.MATHML&&e===s.ANNOTATION_XML)for(let r=0;r<n.length;r++)if(n[r].name===a.ENCODING){const e=n[r].value.toLowerCase();return e===l||e===c}return t===o.SVG&&(e===s.FOREIGN_OBJECT||e===s.DESC||e===s.TITLE)}(e,t,n))||!(r&&r!==o.MATHML||!function(e,t){return t===o.MATHML&&(e===s.MI||e===s.MO||e===s.MN||e===s.MS||e===s.MTEXT)}(e,t))}},function(e,t,n){"use strict";var r=n(83),i=n(85),s=n(86),o=n(87),a=n(638),l=n(641),c=n(147);e.exports=function(e,t){var n,s=t||{};s.messages?(n=s,s={}):n=s.file;return f(e,{schema:"svg"===s.space?i:r,file:n,verbose:s.verbose,location:!1})};var u={}.hasOwnProperty,p={"#document":h,"#document-fragment":h,"#text":function(e){return{type:"text",value:e.value}},"#comment":function(e){return{type:"comment",value:e.data}},"#documentType":function(e){return{type:"doctype",name:e.name||"",public:e.publicId||null,system:e.systemId||null}}};function f(e,t){var n,a,l,c=t.schema,h=u.call(p,e.nodeName)?p[e.nodeName]:d;return h===d&&(t.schema=e.namespaceURI===o.svg?i:r),e.childNodes&&(n=function(e,t){var n=e.length,r=-1,i=[];for(;++r<n;)i[r]=f(e[r],t);return i}(e.childNodes,t)),a=h(e,n,t),e.sourceCodeLocation&&t.file&&(l=function(e,t,n){var r,i,o,a,l,c=n.schema,u=n.verbose,p=m(t);if("element"===e.type&&(r=e.children[e.children.length-1],!t.endTag&&r&&r.position&&r.position.end&&(p.end=Object.assign({},r.position.end)),u)){for(o in i=t.attrs,a={},i)l=s(c,o).property,a[l]=m(i[o]);e.data={position:{opening:m(t.startTag),closing:t.endTag?m(t.endTag):null,properties:a}}}return p}(a,e.sourceCodeLocation,t))&&(t.location=!0,a.position=l),t.schema=c,a}function h(e,t,n){var r,i={type:"root",children:t,data:{}};return i.data.quirksMode="quirks"===e.mode||"limited-quirks"===e.mode,n.file&&n.location&&(r=String(n.file),i.position={start:{line:1,column:1,offset:0},end:{line:c(r,"\n")+1,column:r.length-r.lastIndexOf("\n"),offset:r.length}}),i}function d(e,t,n){for(var r,i,s,o,c,u="svg"===n.schema.space?a:l,p=e.tagName,h=e.attrs,d=h.length,y={},g=-1;++g<d;)y[((r=h[g]).prefix?r.prefix+":":"")+r.name]=r.value;return i=u(p,y,t),"template"===p&&"content"in e&&(o=(s=e.sourceCodeLocation)&&s.startTag&&m(s.startTag).end,c=s&&s.endTag&&m(s.endTag).start,i.content=f(e.content,n),(o||c)&&n.file&&(i.content.position={start:o,end:c})),i}function m(e){var t=y({line:e.startLine,column:e.startCol,offset:e.startOffset}),n=y({line:e.endLine,column:e.endCol,offset:e.endOffset});return t||n?{start:t,end:n}:null}function y(e){return e.line&&e.column?e:null}},function(e,t,n){"use strict";var r=n(84),i=n(42),s=n(227),o=r.boolean,a=r.overloadedBoolean,l=r.booleanish,c=r.number,u=r.spaceSeparated,p=r.commaSeparated;e.exports=i({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:s,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:p,acceptCharset:u,accessKey:u,action:null,allow:null,allowFullScreen:o,allowPaymentRequest:o,allowUserMedia:o,alt:null,as:null,async:o,autoCapitalize:null,autoComplete:u,autoFocus:o,autoPlay:o,capture:o,charSet:null,checked:o,cite:null,className:u,cols:c,colSpan:null,content:null,contentEditable:l,controls:o,controlsList:u,coords:c|p,crossOrigin:null,data:null,dateTime:null,decoding:null,default:o,defer:o,dir:null,dirName:null,disabled:o,download:a,draggable:l,encType:null,enterKeyHint:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:o,formTarget:null,headers:u,height:c,hidden:o,high:c,href:null,hrefLang:null,htmlFor:u,httpEquiv:u,id:null,imageSizes:null,imageSrcSet:p,inputMode:null,integrity:null,is:null,isMap:o,itemId:null,itemProp:u,itemRef:u,itemScope:o,itemType:u,kind:null,label:null,lang:null,language:null,list:null,loop:o,low:c,manifest:null,max:null,maxLength:c,media:null,method:null,min:null,minLength:c,multiple:o,muted:o,name:null,nonce:null,noModule:o,noValidate:o,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforePrint:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextMenu:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:o,optimum:c,pattern:null,ping:u,placeholder:null,playsInline:o,poster:null,preload:null,readOnly:o,referrerPolicy:null,rel:u,required:o,reversed:o,rows:c,rowSpan:c,sandbox:u,scope:null,scoped:o,seamless:o,selected:o,shape:null,size:c,sizes:null,slot:null,span:c,spellCheck:l,src:null,srcDoc:null,srcLang:null,srcSet:p,start:c,step:null,style:null,tabIndex:c,target:null,title:null,translate:null,type:null,typeMustMatch:o,useMap:null,value:l,width:c,wrap:null,align:null,aLink:null,archive:u,axis:null,background:null,bgColor:null,border:c,borderColor:null,bottomMargin:c,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:o,declare:o,event:null,face:null,frame:null,frameBorder:null,hSpace:c,leftMargin:c,link:null,longDesc:null,lowSrc:null,marginHeight:c,marginWidth:c,noResize:o,noHref:o,noShade:o,noWrap:o,object:null,profile:null,prompt:null,rev:null,rightMargin:c,rules:null,scheme:null,scrolling:l,standby:null,summary:null,text:null,topMargin:c,valueType:null,version:null,vAlign:null,vLink:null,vSpace:c,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:o,disableRemotePlayback:o,prefix:null,property:null,results:c,security:null,unselectable:null}})},function(e,t,n){"use strict";var r=n(84),i=n(42),s=n(228),o=r.boolean,a=r.number,l=r.spaceSeparated,c=r.commaSeparated,u=r.commaOrSpaceSeparated;e.exports=i({space:"svg",attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},transform:s,properties:{about:u,accentHeight:a,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:a,amplitude:a,arabicForm:null,ascent:a,attributeName:null,attributeType:null,azimuth:a,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:a,by:null,calcMode:null,capHeight:a,className:l,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:a,diffuseConstant:a,direction:null,display:null,dur:null,divisor:a,dominantBaseline:null,download:o,dx:null,dy:null,edgeMode:null,editable:null,elevation:a,enableBackground:null,end:null,event:null,exponent:a,externalResourcesRequired:null,fill:null,fillOpacity:a,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:c,g2:c,glyphName:c,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:a,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:a,horizOriginX:a,horizOriginY:a,id:null,ideographic:a,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:a,k:a,k1:a,k2:a,k3:a,k4:a,kernelMatrix:u,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:a,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:a,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:a,overlineThickness:a,paintOrder:null,panose1:null,path:null,pathLength:a,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:l,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:a,pointsAtY:a,pointsAtZ:a,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:u,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:u,rev:u,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:u,requiredFeatures:u,requiredFonts:u,requiredFormats:u,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:a,specularExponent:a,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:a,strikethroughThickness:a,string:null,stroke:null,strokeDashArray:u,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:a,strokeOpacity:a,strokeWidth:null,style:null,surfaceScale:a,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:u,tabIndex:a,tableValues:null,target:null,targetX:a,targetY:a,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:u,to:null,transform:null,u1:null,u2:null,underlinePosition:a,underlineThickness:a,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:a,values:null,vAlphabetic:a,vMathematical:a,vectorEffect:null,vHanging:a,vIdeographic:a,version:null,vertAdvY:a,vertOriginX:a,vertOriginY:a,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:a,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null}})},function(e,t,n){"use strict";var r=n(85),i=n(639),s=n(230)(r,"g",i);s.displayName="svg",e.exports=s},function(e){e.exports=JSON.parse('["altGlyph","altGlyphDef","altGlyphItem","animateColor","animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","glyphRef","linearGradient","radialGradient","solidColor","textArea","textPath"]')},function(e,t,n){"use strict";e.exports=function(e,t){var n,r,i,s,o,a=e||"",l=t||"div",c={},u=-1,p=a.length;for(;++u<=p;)(i=a.charCodeAt(u))&&46!==i&&35!==i||((s=a.slice(o,u))&&(46===r?n?n.push(s):(n=[s],c.className=n):35===r?c.id=s:l=s),o=u+1,r=i);return{type:"element",tagName:l,properties:c,children:[]}}},function(e,t,n){"use strict";e.exports=n(642)},function(e,t,n){"use strict";var r=n(83),i=n(230)(r,"div");i.displayName="html",e.exports=i},function(e,t,n){"use strict";var r=n(16),i=n(83),s=n(85),o=n(86),a=n(644),l=n(87),c=n(234);e.exports=function(e,t){return p(e,"svg"===t?s:i)};var u=["svg","html"],p=c("type");function f(e,t,n){var r,i=n,o=e.position,a=e.children,c=[],u=a?a.length:0,f=-1;for("element"===e.type&&("html"===i.space&&"svg"===e.tagName&&(i=s),t.namespaceURI=l[i.space]);++f<u;)(r=p(a[f],i)).parentNode=t,c[f]=r;return"element"!==e.type&&"root"!==e.type||(t.childNodes=c),o&&o.start&&o.end&&(t.sourceCodeLocation={startLine:o.start.line,startCol:o.start.column,startOffset:o.start.offset,endLine:o.end.line,endCol:o.end.column,endOffset:o.end.offset}),t}p.handlers.root=function(e,t){var n=(e.data||{}).quirksMode?"quirks":"no-quirks";return f(e,{nodeName:"#document",mode:n},t)},p.handlers.element=function(e,t){var n=t.space,i=r(e,{children:[]});return a((function(n,r){var s,a,c,p,h,d,m=[];for(p in r)h=o(t,p),!1===(a=r[p])||h.boolean&&!a||(c={name:p,value:!0===a?"":String(a)},h.space&&-1===u.indexOf(h.space)&&(-1===(d=p.indexOf(":"))?c.prefix="":(c.name=p.slice(d+1),c.prefix=p.slice(0,d)),c.namespace=l[h.space]),m.push(c));s=f(e,{nodeName:n,tagName:n,attrs:m},t),"template"===n&&(s.content=function(e,t){return f(e,{nodeName:"#document-fragment"},t)}(i.content,t));return s}),i,{space:n})},p.handlers.text=function(e,t){return f(e,{nodeName:"#text",value:e.value},t)},p.handlers.comment=function(e,t){return f(e,{nodeName:"#comment",data:e.value},t)},p.handlers.doctype=function(e,t){return f(e,{nodeName:"#documentType",name:e.name,publicId:e.public||"",systemId:e.system||""},t)}},function(e,t,n){"use strict";var r=n(83),i=n(85),s=n(86),o=n(645),a=n(231),l=n(232),c=n(233),u=n(87),p=n(95),f=p("root"),h=p("element"),d=p("text"),m=/-([a-z])/g;function y(e,t,n,r){var i,c=r.hyperscript||r.vdom||r.vue,u=r.schema,p=s(u,t);null==n||n!=n||c&&!1===n||c&&p.boolean&&!n||(null!==n&&"object"==typeof n&&"length"in n&&(n=(p.commaSeparated?l:a).stringify(n)),p.boolean&&!0===r.hyperscript&&(n=""),r.vue?"style"!==t&&(i="attrs"):p.mustUseProperty||(!0===r.vdom?i="attributes":!0===r.hyperscript&&(i="attrs")),i?(void 0===e[i]&&(e[i]={}),e[i][p.attribute]=n):r.react&&p.space?e[o[p.property]||p.property]=n:e[p.attribute]=n)}function g(e){return Boolean(e&&e.context&&e.cleanup)}function T(e,t){return t.toUpperCase()}e.exports=function(e,t,n){var s,o,a,l,p=n||{};if("function"!=typeof e)throw new Error("h is not a function");"string"==typeof p||"boolean"==typeof p?(s=p,p={}):s=p.prefix;o=function(e){var t=e&&e("div");return Boolean(t&&("_owner"in t||"_store"in t)&&null===t.key)}(e),a=function(e){var t=e&&e("div");return Boolean(t&&t.context&&t.context._isVue)}(e),l=function(e){return e&&"VirtualNode"===e("div").type}(e),null==s&&(s=(!0===o||!0===a||!0===l)&&"h-");if(f(t))t=1===t.children.length&&h(t.children[0])?t.children[0]:{type:"element",tagName:"div",properties:{},children:t.children};else if(!h(t))throw new Error("Expected root or element, not `"+(t&&t.type||t)+"`");return function e(t,n,r){var s,o,a,l,p,f,g,E,b,v=r.schema,S=v,A=n.tagName;"html"===v.space&&"svg"===A.toLowerCase()&&(S=i,r.schema=S);!0===r.vdom&&"html"===S.space&&(A=A.toUpperCase());for(l in s=n.properties,o={},s)y(o,l,s[l],r);"string"!=typeof o.style||!0!==r.vdom&&!0!==r.vue&&!0!==r.react||(o.style=function(e,t){var n={};try{c(e,(function(e,t){n[function(e){"-ms-"===e.slice(0,4)&&(e="ms-"+e.slice(4));return e.replace(m,T)}(e)]=t}))}catch(r){throw r.message=t+"[style]"+r.message.slice("undefined".length),r}return n}(o.style,A));r.prefix&&(r.key++,o.key=r.prefix+r.key);r.vdom&&"html"!==S.space&&(o.namespace=u[S.space]);p=[],a=n.children,f=a?a.length:0,g=-1;for(;++g<f;)E=a[g],h(E)?p.push(e(t,E,r)):d(E)&&p.push(E.value);return b=0===p.length?t.call(n,A,o):t.call(n,A,o,p),r.schema=v,b}(e,t,{schema:"svg"===p.space?i:r,prefix:s,key:0,react:o,vue:a,vdom:l,hyperscript:g(e)})}},function(e){e.exports=JSON.parse('{"classId":"classID","dataType":"datatype","itemId":"itemID","strokeDashArray":"strokeDasharray","strokeDashOffset":"strokeDashoffset","strokeLineCap":"strokeLinecap","strokeLineJoin":"strokeLinejoin","strokeMiterLimit":"strokeMiterlimit","typeOf":"typeof","xLinkActuate":"xlinkActuate","xLinkArcRole":"xlinkArcrole","xLinkHref":"xlinkHref","xLinkRole":"xlinkRole","xLinkShow":"xlinkShow","xLinkTitle":"xlinkTitle","xLinkType":"xlinkType","xmlnsXLink":"xmlnsXlink"}')},function(e,t){var n=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,i=/^\s*/,s=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,o=/^:\s*/,a=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,l=/^[;\s]*/,c=/^\s+|\s+$/g;function u(e){return e?e.replace(c,""):""}e.exports=function(e,t){if("string"!=typeof e)throw new TypeError("First argument must be a string");if(!e)return[];t=t||{};var c=1,p=1;function f(e){var t=e.match(r);t&&(c+=t.length);var n=e.lastIndexOf("\n");p=~n?e.length-n:p+e.length}function h(){var e={line:c,column:p};return function(t){return t.position=new d(e),T(),t}}function d(e){this.start=e,this.end={line:c,column:p},this.source=t.source}d.prototype.content=e;var m=[];function y(n){var r=new Error(t.source+":"+c+":"+p+": "+n);if(r.reason=n,r.filename=t.source,r.line=c,r.column=p,r.source=e,!t.silent)throw r;m.push(r)}function g(t){var n=t.exec(e);if(n){var r=n[0];return f(r),e=e.slice(r.length),n}}function T(){g(i)}function E(e){var t;for(e=e||[];t=b();)!1!==t&&e.push(t);return e}function b(){var t=h();if("/"==e.charAt(0)&&"*"==e.charAt(1)){for(var n=2;""!=e.charAt(n)&&("*"!=e.charAt(n)||"/"!=e.charAt(n+1));)++n;if(n+=2,""===e.charAt(n-1))return y("End of comment missing");var r=e.slice(2,n-2);return p+=2,f(r),e=e.slice(n),p+=2,t({type:"comment",comment:r})}}function v(){var e=h(),t=g(s);if(t){if(b(),!g(o))return y("property missing ':'");var r=g(a),i=e({type:"declaration",property:u(t[0].replace(n,"")),value:r?u(r[0].replace(n,"")):""});return g(l),i}}return T(),function(){var e,t=[];for(E(t);e=v();)!1!==e&&(t.push(e),E(t));return t}()}},function(e){e.exports=JSON.parse('["area","base","basefont","bgsound","br","col","command","embed","frame","hr","image","img","input","isindex","keygen","link","menuitem","meta","nextid","param","source","track","wbr"]')},function(e,t,n){const r=n(47),{isComment:i,getCommentContents:s}=n(60);e.exports=e=>e=>(r(e,"jsx",e=>{i(e.value)&&(e.type="comment",e.value=s(e.value))}),e)},function(e,t,n){const r=n(650),i=n(238),s=n(5);e.exports=function(){return(e,t)=>r(e,{handlers:{inlineCode:(e,t)=>Object.assign({},t,{type:"element",tagName:"inlineCode",properties:{},children:[{type:"text",value:t.value}]}),code(e,t){const n=t.value?i(t.value+"\n"):"",r=t.lang,o={};r&&(o.className=["language-"+r]),o.metastring=t.meta||void 0;const a=t.meta&&t.meta.split(" ").reduce((e,t)=>{if(t.split("=").length>1){const n=t.split("=");return e[n[0]]=n[1],e}return e[t]=!0,e},{});return a&&Object.keys(a).forEach(e=>{const t="class"===e||"className"===e;o.className&&t?o.className.push(a[e]):o[e]=a[e]}),e(t.position,"pre",[e(t,"code",o,[s("text",n)])])},import:(e,t)=>Object.assign({},t,{type:"import"}),export:(e,t)=>Object.assign({},t,{type:"export"}),comment:(e,t)=>Object.assign({},t,{type:"comment"}),jsx:(e,t)=>Object.assign({},t,{type:"jsx"})},allowDangerousHtml:!0})}},function(e,t,n){"use strict";e.exports=n(651)},function(e,t,n){"use strict";e.exports=function(e,t){var n=function(e,t){var n=t||{};void 0===n.allowDangerousHTML||f||(f=!0,console.warn("mdast-util-to-hast: deprecation: `allowDangerousHTML` is nonstandard, use `allowDangerousHtml` instead"));var r=n.allowDangerousHtml||n.allowDangerousHTML,l={};return h.dangerous=r,h.definition=a(e,n),h.footnoteById=l,h.footnoteOrder=[],h.augment=c,h.handlers=Object.assign({},u,n.handlers),h.unknownHandler=n.unknownHandler,i(e,"footnoteDefinition",(function(e){var t=String(e.identifier).toUpperCase();p.call(l,t)||(l[t]=e)})),h;function c(e,t){var n,r;return e&&"data"in e&&(n=e.data,"element"===t.type&&n.hName&&(t.tagName=n.hName),"element"===t.type&&n.hProperties&&(t.properties=Object.assign({},t.properties,n.hProperties)),t.children&&n.hChildren&&(t.children=n.hChildren)),r=e&&e.position?e:{position:e},o(r)||(t.position={start:s.start(r),end:s.end(r)}),t}function h(e,t,n,r){return null==r&&"object"==typeof n&&"length"in n&&(r=n,n={}),c(e,{type:"element",tagName:t,properties:n||{},children:r||[]})}}(e,t),h=l(n,e),d=c(n);d&&(h.children=h.children.concat(r("text","\n"),d));return h};var r=n(5),i=n(47),s=n(128),o=n(652),a=n(653),l=n(235),c=n(654),u=n(655),p={}.hasOwnProperty,f=!1},function(e,t,n){"use strict";function r(e){return e&&"object"==typeof e?e:{}}e.exports=function(e){var t=r(r(e).position),n=r(t.start),i=r(t.end);return!(n.line&&n.column&&i.line&&i.column)}},function(e,t,n){"use strict";var r=n(47);e.exports=function(e,t){return function(e){return function(t){var n=t&&s(t);return n&&i.call(e,n)?e[n]:null}}(function(e,t){var n={};if(!e||!e.type)throw new Error("mdast-util-definitions expected node");return r(e,"definition",t&&t.commonmark?function(e){var t=s(e.identifier);i.call(n,t)||(n[t]=e)}:function(e){n[s(e.identifier)]=e}),n}(e,t))};var i={}.hasOwnProperty;function s(e){return e.toUpperCase()}},function(e,t,n){"use strict";e.exports=function(e){var t,n,o,a,l=e.footnoteById,c=e.footnoteOrder,u=c.length,p=-1,f=[];for(;++p<u;)(t=l[c[p].toUpperCase()])&&(o=t.children.concat(),a=o[o.length-1],n={type:"link",url:"#fnref-"+t.identifier,data:{hProperties:{className:["footnote-backref"]}},children:[{type:"text",value:"↩"}]},a&&"paragraph"===a.type||(a={type:"paragraph",children:[]},o.push(a)),a.children.push(n),f.push({type:"listItem",data:{hProperties:{id:"fn-"+t.identifier}},children:o,position:t.position}));if(0===f.length)return null;return e(null,"div",{className:["footnotes"]},s([r(e),i(e,{type:"list",ordered:!0,children:f})],!0))};var r=n(236),i=n(237),s=n(43)},function(e,t,n){"use strict";function r(){return null}e.exports={blockquote:n(656),break:n(657),code:n(658),delete:n(659),emphasis:n(660),footnoteReference:n(239),footnote:n(661),heading:n(662),html:n(663),imageReference:n(664),image:n(665),inlineCode:n(666),linkReference:n(667),link:n(668),listItem:n(669),list:n(237),paragraph:n(670),root:n(671),strong:n(672),table:n(673),text:n(674),thematicBreak:n(236),toml:r,yaml:r,definition:r,footnoteDefinition:r}},function(e,t,n){"use strict";e.exports=function(e,t){return e(t,"blockquote",r(i(e,t),!0))};var r=n(43),i=n(4)},function(e,t,n){"use strict";e.exports=function(e,t){return[e(t,"br"),r("text","\n")]};var r=n(5)},function(e,t,n){"use strict";e.exports=function(e,t){var n=t.value?r(t.value+"\n"):"",s=t.lang&&t.lang.match(/^[^ \t]+(?=[ \t]|$)/),o={};s&&(o.className=["language-"+s]);return e(t.position,"pre",[e(t,"code",o,[i("text",n)])])};var r=n(238),i=n(5)},function(e,t,n){"use strict";e.exports=function(e,t){return e(t,"del",r(e,t))};var r=n(4)},function(e,t,n){"use strict";e.exports=function(e,t){return e(t,"em",r(e,t))};var r=n(4)},function(e,t,n){"use strict";e.exports=function(e,t){var n=e.footnoteById,i=e.footnoteOrder,s=1;for(;s in n;)s++;return s=String(s),i.push(s),n[s]={type:"footnoteDefinition",identifier:s,children:[{type:"paragraph",children:t.children}],position:t.position},r(e,{type:"footnoteReference",identifier:s,position:t.position})};var r=n(239)},function(e,t,n){"use strict";e.exports=function(e,t){return e(t,"h"+t.depth,r(e,t))};var r=n(4)},function(e,t,n){"use strict";e.exports=function(e,t){return e.dangerous?e.augment(t,r("raw",t.value)):null};var r=n(5)},function(e,t,n){"use strict";e.exports=function(e,t){var n,s=e.definition(t.identifier);if(!s)return i(e,t);n={src:r(s.url||""),alt:t.alt},null!==s.title&&void 0!==s.title&&(n.title=s.title);return e(t,"img",n)};var r=n(88),i=n(240)},function(e,t,n){"use strict";var r=n(88);e.exports=function(e,t){var n={src:r(t.url),alt:t.alt};null!==t.title&&void 0!==t.title&&(n.title=t.title);return e(t,"img",n)}},function(e,t,n){"use strict";e.exports=function(e,t){return e(t,"code",[i("text",r(t.value))])};var r=n(145),i=n(5)},function(e,t,n){"use strict";e.exports=function(e,t){var n,o=e.definition(t.identifier);if(!o)return i(e,t);n={href:r(o.url||"")},null!==o.title&&void 0!==o.title&&(n.title=o.title);return e(t,"a",n,s(e,t))};var r=n(88),i=n(240),s=n(4)},function(e,t,n){"use strict";var r=n(88),i=n(4);e.exports=function(e,t){var n={href:r(t.url)};null!==t.title&&void 0!==t.title&&(n.title=t.title);return e(t,"a",n,i(e,t))}},function(e,t,n){"use strict";e.exports=function(e,t,n){var a,l,c,u,p,f=t.children[0],h=s(e,t),d=n?function(e){var t=e.spread,n=e.children,r=n.length,i=-1;for(;!t&&++i<r;)t=o(n[i]);return t}(n):o(t),m={};if(d)a=h;else for(a=[],u=h.length,c=-1;++c<u;)"p"===(p=h[c]).tagName?a=a.concat(p.children):a.push(p);"boolean"==typeof t.checked&&(!d||f&&"paragraph"===f.type||a.unshift(e(null,"p",[])),0!==(l=d?a[0].children:a).length&&l.unshift(r("text"," ")),l.unshift(e(null,"input",{type:"checkbox",checked:t.checked,disabled:!0})),m.className=["task-list-item"]);d&&0!==a.length&&(a=i(a,!0));return e(t,"li",m,a)};var r=n(5),i=n(43),s=n(4);function o(e){var t=e.spread;return null==t?e.children.length>1:t}},function(e,t,n){"use strict";e.exports=function(e,t){return e(t,"p",r(e,t))};var r=n(4)},function(e,t,n){"use strict";e.exports=function(e,t){return e.augment(t,r("root",i(s(e,t))))};var r=n(5),i=n(43),s=n(4)},function(e,t,n){"use strict";e.exports=function(e,t){return e(t,"strong",r(e,t))};var r=n(4)},function(e,t,n){"use strict";e.exports=function(e,t){var n,o,a,l,c,u=t.children,p=u.length,f=t.align,h=f.length,d=[];for(;p--;){for(o=u[p].children,l=0===p?"th":"td",n=h,a=[];n--;)c=o[n],a[n]=e(c,l,{align:f[n]},c?s(e,c):[]);d[p]=e(u[p],"tr",i(a,!0))}return e(t,"table",i([e(d[0].position,"thead",i([d[0]],!0)),e({start:r.start(d[1]),end:r.end(d[d.length-1])},"tbody",i(d.slice(1),!0))],!0))};var r=n(128),i=n(43),s=n(4)},function(e,t,n){"use strict";e.exports=function(e,t){return e.augment(t,r("text",i(t.value)))};var r=n(5),i=n(675)},function(e,t,n){"use strict";e.exports=function(e){return String(e).replace(r,"\n")};var r=/[ \t]*\n+[ \t]*/g},function(e,t,n){const{transformSync:r}=n(23),i=n(233),s=n(677),o=n(678),{paramCase:a,toTemplateLiteral:l}=n(60),c=n(679),u=n(680),p=["acceptCharset","accessKey","autoComplete","className","controlsList","headers","htmlFor","httpEquiv","itemProp","itemRef","itemType","ping","rel","sandbox"];function f(e,t={},h={}){const{skipExport:d=!1,preserveNewlines:m=!1,wrapExport:y}=h;let g="";if(null!=e.properties){if("string"==typeof e.properties.style){let t={};i(e.properties.style,(function(e,n){t[s(e)]=n})),e.properties.style=t}e.properties.class&&(e.properties.className=e.properties.class,delete e.properties.class);const t=/^(aria[A-Z])|(data[A-Z])/;e.properties=Object.entries(e.properties).reduce((e,[n,r])=>Object.assign({},e,{[t.test(n)?a(n):n]:r}),{})}if("root"===e.type){const t=[],i=[],s=[];let a;for(const n of e.children)if("import"!==n.type)if("export"!==n.type)s.push(n);else{if(n.default){a=n.value.replace(/^export\s+default\s+/,"").replace(/;\s*$/,"");continue}i.push(n)}else t.push(n);const l=i.map(e=>e.value.match(/^export\s*(var|const|let|class|function)?\s*(\w+)/)).map(e=>Array.isArray(e)?e[2]:null).filter(Boolean),p=t.map(t=>f(t,e)).join("\n"),m=i.map(t=>f(t,e)).join("\n"),g=`const layoutProps = {\n  ${l.join(",\n")}\n};`,T="const MDXLayout = "+(a||'"wrapper"'),E=`function MDXContent({ components, ...props }) {\n  return (\n    <MDXLayout\n      {...layoutProps}\n      {...props}\n      components={components}>\n${s.map(t=>f(t,e)).join("")}\n    </MDXLayout>\n  )\n};\nMDXContent.isMDXComponent = true`,b=new u,v=h.file&&h.file.path;r(p,{filename:v,configFile:!1,babelrc:!1,plugins:[n(80),n(81),b.plugin]});const S=b.state.names,A=new c,x=new c,_=r(E,{filename:v,configFile:!1,babelrc:!1,plugins:[n(80),n(81),A.plugin]}).code,P=r(m,{filename:v,configFile:!1,babelrc:!1,plugins:[n(80),n(81),x.plugin]}).code,O=[...A.state.names,...x.state.names].filter(e=>"MDXLayout"!==e),w=S.concat(l),C='const makeShortcode = name => function MDXDefaultShortcode(props) {\n      console.warn("Component " + name + " was not imported, exported, or provided by MDXProvider as global scope")\n      return <div {...props}/>\n    };\n',N=o(O).filter(e=>!w.includes(e)).map(e=>`const ${e} = makeShortcode("${e}");`).join("\n"),k=`${p}\n${P}\n${N&&[C,N].join("")||""}\n${g}\n${T}`;return d?`${k}\n${_}`:y?`${k}\n${_}\nexport default ${y}(MDXContent)`:`${k}\nexport default ${_}`}if(e.children&&(g=e.children.map(t=>{const n=Object.assign({},h,{preserveNewlines:m||"pre"===e.tagName});return f(t,e,n)}).join("")),"element"===e.type){let n="";return e.properties&&(p.forEach(t=>{Array.isArray(e.properties[t])&&(e.properties[t]=e.properties[t].join(" "))}),Object.keys(e.properties).length>0&&(n=JSON.stringify(e.properties))),`<${e.tagName}${t.tagName?` parentName="${t.tagName}"`:""}${n?` {...${n}}`:""}>${g}</${e.tagName}>`}if("text"===e.type){const n=m||"p"===t.tagName;return"\n"!==e.value||n?l(e.value):e.value}return"comment"===e.type?`{/*${e.value}*/}`:"import"===e.type||"export"===e.type||"jsx"===e.type?e.value:void 0}function h(e={}){this.Compiler=function(t,n){return f(t,{},{file:n||{},...e})}}e.exports=h,(t=h).toJSX=f,t.default=h},function(e,t,n){"use strict";var r=/-(\w|$)/g,i=function(e,t){return t.toUpperCase()};e.exports=function(e){return"float"===(e=e.toLowerCase())?"cssFloat":45===e.charCodeAt(0)&&109===e.charCodeAt(1)&&115===e.charCodeAt(2)&&45===e.charCodeAt(3)?e.substr(1).replace(r,i):e.replace(r,i)}},function(e,t,n){(function(t){var n=/^\[object .+?Constructor\]$/,r="object"==typeof t&&t&&t.Object===Object&&t,i="object"==typeof self&&self&&self.Object===Object&&self,s=r||i||Function("return this")();function o(e,t){return!!(e?e.length:0)&&function(e,t,n){if(t!=t)return function(e,t,n,r){var i=e.length,s=n+(r?1:-1);for(;r?s--:++s<i;)if(t(e[s],s,e))return s;return-1}(e,l,n);var r=n-1,i=e.length;for(;++r<i;)if(e[r]===t)return r;return-1}(e,t,0)>-1}function a(e,t,n){for(var r=-1,i=e?e.length:0;++r<i;)if(n(t,e[r]))return!0;return!1}function l(e){return e!=e}function c(e,t){return e.has(t)}function u(e){var t=-1,n=Array(e.size);return e.forEach((function(e){n[++t]=e})),n}var p,f=Array.prototype,h=Function.prototype,d=Object.prototype,m=s["__core-js_shared__"],y=(p=/[^.]+$/.exec(m&&m.keys&&m.keys.IE_PROTO||""))?"Symbol(src)_1."+p:"",g=h.toString,T=d.hasOwnProperty,E=d.toString,b=RegExp("^"+g.call(T).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),v=f.splice,S=M(s,"Map"),A=M(s,"Set"),x=M(Object,"create");function _(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function P(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function O(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function w(e){var t=-1,n=e?e.length:0;for(this.__data__=new O;++t<n;)this.add(e[t])}function C(e,t){for(var n,r,i=e.length;i--;)if((n=e[i][0])===(r=t)||n!=n&&r!=r)return i;return-1}function N(e){return!(!D(e)||(t=e,y&&y in t))&&(function(e){var t=D(e)?E.call(e):"";return"[object Function]"==t||"[object GeneratorFunction]"==t}(e)||function(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(n){}return t}(e)?b:n).test(function(e){if(null!=e){try{return g.call(e)}catch(t){}try{return e+""}catch(t){}}return""}(e));var t}_.prototype.clear=function(){this.__data__=x?x(null):{}},_.prototype.delete=function(e){return this.has(e)&&delete this.__data__[e]},_.prototype.get=function(e){var t=this.__data__;if(x){var n=t[e];return"__lodash_hash_undefined__"===n?void 0:n}return T.call(t,e)?t[e]:void 0},_.prototype.has=function(e){var t=this.__data__;return x?void 0!==t[e]:T.call(t,e)},_.prototype.set=function(e,t){return this.__data__[e]=x&&void 0===t?"__lodash_hash_undefined__":t,this},P.prototype.clear=function(){this.__data__=[]},P.prototype.delete=function(e){var t=this.__data__,n=C(t,e);return!(n<0)&&(n==t.length-1?t.pop():v.call(t,n,1),!0)},P.prototype.get=function(e){var t=this.__data__,n=C(t,e);return n<0?void 0:t[n][1]},P.prototype.has=function(e){return C(this.__data__,e)>-1},P.prototype.set=function(e,t){var n=this.__data__,r=C(n,e);return r<0?n.push([e,t]):n[r][1]=t,this},O.prototype.clear=function(){this.__data__={hash:new _,map:new(S||P),string:new _}},O.prototype.delete=function(e){return I(this,e).delete(e)},O.prototype.get=function(e){return I(this,e).get(e)},O.prototype.has=function(e){return I(this,e).has(e)},O.prototype.set=function(e,t){return I(this,e).set(e,t),this},w.prototype.add=w.prototype.push=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this},w.prototype.has=function(e){return this.__data__.has(e)};var k=A&&1/u(new A([,-0]))[1]==1/0?function(e){return new A(e)}:function(){};function I(e,t){var n,r,i=e.__data__;return("string"==(r=typeof(n=t))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?i["string"==typeof t?"string":"hash"]:i.map}function M(e,t){var n=function(e,t){return null==e?void 0:e[t]}(e,t);return N(n)?n:void 0}function D(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}e.exports=function(e){return e&&e.length?function(e,t,n){var r=-1,i=o,s=e.length,l=!0,p=[],f=p;if(n)l=!1,i=a;else if(s>=200){var h=t?null:k(e);if(h)return u(h);l=!1,i=c,f=new w}else f=t?[]:p;e:for(;++r<s;){var d=e[r],m=t?t(d):d;if(d=n||0!==d?d:0,l&&m==m){for(var y=f.length;y--;)if(f[y]===m)continue e;t&&f.push(m),p.push(d)}else i(f,m,n)||(f!==p&&f.push(m),p.push(d))}return p}(e):[]}}).call(this,n(21))},function(e,t,n){const{types:r}=n(23),{declare:i}=n(33),{startsWithCapitalLetter:s}=n(60);e.exports=class{constructor(){const e=[];this.state={names:e},this.plugin=i(t=>(t.assertVersion(7),{visitor:{JSXOpeningElement(t){const n=t.node.name.name;s(n)&&(e.push(n),t.node.attributes.push(r.jSXAttribute(r.jSXIdentifier("mdxType"),r.stringLiteral(n))))}}}))}}},function(e,t,n){const{declare:r}=n(33);e.exports=class{constructor(){const e=[];this.state={names:e},this.plugin=r(t=>(t.assertVersion(7),{visitor:{ImportDeclaration(t){t.traverse({Identifier(t){"local"===t.key&&e.push(t.node.name)}})}}}))}}},function(e,t,n){"use strict";n.r(t);var r=n(45),i=n.n(r),s=n(0),o=n.n(s);function a(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}var l=n(9),c=function(e){var t=e.children,n=e.to,r=e.activeClassName,i=a(e,["children","to","activeClassName"]);return/^\/(?!\/|#)/.test(n)?o.a.createElement(l.Link,Object.assign({to:n,activeClassName:r},i),t):o.a.createElement("a",Object.assign({href:n},i),t)},u=function(e){var t=e.url,n=e.children,r=e.align,i=e.bgColor,s=a(e,["url","children","align","bgColor"]),l={borderRadius:"5px",textDecoration:"none",display:"inline-block",padding:"1.5em 2.5em",backgroundColor:i||"rebeccaPurple",color:"white"},u=o.a.createElement(c,Object.assign({to:t,style:l},s),n);return"center"===r?o.a.createElement("span",{style:{display:"flex",justifyContent:"center"}},u):u},p=function(e){var t=e.tag,n=e.children,r="h"+t;return o.a.createElement(r,{style:{color:"rebeccapurple"}},n)},f=function(){var e=Object(s.useState)(0),t=e[0],n=e[1];return o.a.createElement("div",null,o.a.createElement("div",null,"Count: "+t),o.a.createElement("button",{onClick:function(){return n(t+2)}},"Increment"))},h=n(244),d=n.n(h);function m(e){var t=e.description,n=e.lang,r=e.meta,i=e.keywords,s=e.title;return o.a.createElement(l.StaticQuery,{query:y,render:function(e){var a=t||e.site.siteMetadata.description;return o.a.createElement(d.a,{htmlAttributes:{lang:n},title:s,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:a},{property:"og:title",content:s},{property:"og:description",content:a},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:a}].concat(i.length>0?{name:"keywords",content:i.join(", ")}:[]).concat(r)})}})}m.defaultProps={lang:"en",meta:[],keywords:[]};var y="3128451518",g=(n(245),function(e,t){return e||t}),T={CallToAction:function(e){return o.a.createElement(u,e)},Widget:function(e){return o.a.createElement(f,e)}},E={h1:function(e){return o.a.createElement(p,Object.assign({tag:1},e))},h2:function(e){return o.a.createElement(p,Object.assign({tag:2},e))},h3:function(e){return o.a.createElement(p,Object.assign({tag:3},e))},h4:function(e){return o.a.createElement(p,Object.assign({tag:4},e))},h5:function(e){return o.a.createElement(p,Object.assign({tag:5},e))},h6:function(e){return o.a.createElement(p,Object.assign({tag:6},e))},a:function(e){return o.a.createElement(c,e)}},b=n(8),v=n(246),S=n(56),A=n(248),x=n.n(A),_=n(249),P=n.n(_);function O(e){var t={};return Object.keys(e).forEach((function(n){"parent"!==n&&"program"!==n&&"keys"!==n&&"__wrapped"!==n&&(Array.isArray(e[n])?t[n]=e[n].map(O):e[n]&&e[n].toJSON?t[n]=e[n].toJSON():t[n]=e[n])})),t}var w=function(){};w.prototype.ancestor=function(e){for(var t=this;e--;)if(!(t=t.parent))return null;return t},w.prototype.contains=function(e){for(;e;){if(e===this)return!0;e=e.parent}return!1},w.prototype.findLexicalBoundary=function(){return this.parent.findLexicalBoundary()},w.prototype.findNearest=function(e){return"string"==typeof e&&(e=new RegExp("^"+e+"$")),e.test(this.type)?this:this.parent.findNearest(e)},w.prototype.unparenthesizedParent=function(){for(var e=this.parent;e&&"ParenthesizedExpression"===e.type;)e=e.parent;return e},w.prototype.unparenthesize=function(){for(var e=this;"ParenthesizedExpression"===e.type;)e=e.expression;return e},w.prototype.findScope=function(e){return this.parent.findScope(e)},w.prototype.getIndentation=function(){return this.parent.getIndentation()},w.prototype.initialise=function(e){for(var t=0,n=this.keys;t<n.length;t+=1){var r=this[n[t]];Array.isArray(r)?r.forEach((function(t){return t&&t.initialise(e)})):r&&"object"==typeof r&&r.initialise(e)}},w.prototype.toJSON=function(){return O(this)},w.prototype.toString=function(){return this.program.magicString.original.slice(this.start,this.end)},w.prototype.transpile=function(e,t){for(var n=0,r=this.keys;n<r.length;n+=1){var i=this[r[n]];Array.isArray(i)?i.forEach((function(n){return n&&n.transpile(e,t)})):i&&"object"==typeof i&&i.transpile(e,t)}};var C={Identifier:function(e,t){e.push(t)},ObjectPattern:function(e,t){for(var n=0,r=t.properties;n<r.length;n+=1){var i=r[n];C[i.type](e,i)}},Property:function(e,t){C[t.value.type](e,t.value)},ArrayPattern:function(e,t){for(var n=0,r=t.elements;n<r.length;n+=1){var i=r[n];i&&C[i.type](e,i)}},RestElement:function(e,t){C[t.argument.type](e,t.argument)},AssignmentPattern:function(e,t){C[t.left.type](e,t.left)}},N=Object.create(null);function k(e){e=e||{},this.parent=e.parent,this.isBlockScope=!!e.block,this.createDeclarationCallback=e.declare;for(var t=this;t.isBlockScope;)t=t.parent;this.functionScope=t,this.identifiers=[],this.declarations=Object.create(null),this.references=Object.create(null),this.blockScopedDeclarations=this.isBlockScope?null:Object.create(null),this.aliases=Object.create(null)}function I(e,t){var n,r=e.split("\n"),i=r.length,s=0;for(n=0;n<i;n+=1){var o=s+r[n].length+1;if(o>t)return{line:n+1,column:t-s,char:n};s=o}throw new Error("Could not determine location of character")}function M(e,t){for(var n="";t--;)n+=e;return n}function D(e,t,n){void 0===n&&(n=1);var r=Math.max(t.line-5,0),i=t.line,s=String(i).length,o=e.split("\n").slice(r,i),a=o[o.length-1].slice(0,t.column).replace(/\t/g,"  ").length,l=o.map((function(e,t){return n=s,(i=String(t+r+1))+M(" ",n-i.length)+" : "+e.replace(/\t/g,"  ");var n,i})).join("\n");return l+="\n"+M(" ",s+3+a)+M("^",n)}"do if in for let new try var case else enum eval null this true void with await break catch class const false super throw while yield delete export import public return static switch typeof default extends finally package private continue debugger function arguments interface protected implements instanceof".split(" ").forEach((function(e){return N[e]=!0})),k.prototype={addDeclaration:function(e,t){for(var n=0,r=function(e){var t=[];return C[e.type](t,e),t}(e);n<r.length;n+=1){var i=r[n],s=i.name,o={name:s,node:i,kind:t,instances:[]};this.declarations[s]=o,this.isBlockScope&&(this.functionScope.blockScopedDeclarations[s]||(this.functionScope.blockScopedDeclarations[s]=[]),this.functionScope.blockScopedDeclarations[s].push(o))}},addReference:function(e){this.consolidated?this.consolidateReference(e):this.identifiers.push(e)},consolidate:function(){for(var e=0;e<this.identifiers.length;e+=1){var t=this.identifiers[e];this.consolidateReference(t)}this.consolidated=!0},consolidateReference:function(e){var t=this.declarations[e.name];t?t.instances.push(e):(this.references[e.name]=!0,this.parent&&this.parent.addReference(e))},contains:function(e){return this.declarations[e]||!!this.parent&&this.parent.contains(e)},createIdentifier:function(e){"number"==typeof e&&(e=e.toString());for(var t=e=e.replace(/\s/g,"").replace(/\[([^\]]+)\]/g,"_$1").replace(/[^a-zA-Z0-9_$]/g,"_").replace(/_{2,}/,"_"),n=1;this.declarations[t]||this.references[t]||this.aliases[t]||t in N;)t=e+"$"+n++;return this.aliases[t]=!0,t},createDeclaration:function(e){var t=this.createIdentifier(e);return this.createDeclarationCallback(t),t},findDeclaration:function(e){return this.declarations[e]||this.parent&&this.parent.findDeclaration(e)},resolveName:function(e){var t=this.findDeclaration(e);return t?t.name:e}};var L=function(e){function t(t,n){if(e.call(this,t),this.name="CompileError",n){var r=n.program.magicString.original,i=I(r,n.start);this.message=t+" ("+i.line+":"+i.column+")",this.stack=(new e).stack.replace(new RegExp(".+new "+this.name+".+\\n","m"),""),this.loc=i,this.snippet=D(r,i,n.end-n.start)}}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.toString=function(){return this.name+": "+this.message+"\n"+this.snippet},t.missingTransform=function(e,n,r,i){throw void 0===i&&(i=null),new t("Transforming "+e+" is not "+(i?"fully supported":"implemented")+". Use `transforms: { "+n+": false }` to skip transformation and disable this error"+(i?", or `transforms: { "+i+": true }` if you know what you're doing":"")+".",r)},t}(Error);var R={Identifier:F,AssignmentPattern:function(e,t,n,r,i,s,o){var a="Identifier"===r.left.type,l=a?r.left.name:i;s||o.push((function(t,n,i){e.prependRight(r.left.end,n+"if ( "+l+" === void 0 ) "+l),e.move(r.left.end,r.right.end,t),e.appendLeft(r.right.end,i)}));a||j(e,t,n,r.left,i,s,o)},ArrayPattern:function(e,t,n,r,i,s,o){var a=r.start;r.elements.forEach((function(r,l){r&&("RestElement"===r.type?U(e,t,n,a,r.argument,i+".slice("+l+")",s,o):U(e,t,n,a,r,i+"["+l+"]",s,o),a=r.end)})),e.remove(a,r.end)},ObjectPattern:B};function j(e,t,n,r,i,s,o){R[r.type](e,t,n,r,i,s,o)}function F(e,t,n,r,i,s,o){o.push((function(t,o,a){e.overwrite(r.start,r.end,(s?o:o+"var ")+n(r)+" = "+i+a),e.move(r.start,r.end,t)}))}function B(e,t,n,r,i,s,o){var a=this,l=r.start,c=[];r.properties.forEach((function(r){var u,p;if("Property"===r.type)if(p=r.value,r.computed||"Identifier"!==r.key.type)if(r.computed||"Literal"!==r.key.type){var f=e.slice(r.key.start,r.key.end);u=i+"["+f+"]",c.push("String("+f+")")}else u=i+"["+r.key.raw+"]",c.push(JSON.stringify(String(r.key.value)));else u=i+"."+r.key.name,c.push('"'+r.key.name+'"');else{if("RestElement"!==r.type)throw new L(a,"Unexpected node of type "+r.type+" in object pattern");p=r.argument,u=t("rest"),o.push((function(t,n,o){var a=r.program.getObjectWithoutPropertiesHelper(e);e.overwrite(r.start,l=r.argument.start,(s?n:n+"var ")+u+" = "+a+"( "+i+", ["+c.join(", ")+"] )"+o),e.move(r.start,l,t)}))}U(e,t,n,l,p,u,s,o),l=r.end})),e.remove(l,r.end)}function U(e,t,n,r,i,s,o,a){switch(i.type){case"Identifier":e.remove(r,i.start),F(e,0,n,i,s,o,a);break;case"MemberExpression":e.remove(r,i.start),function(e,t,n,r,i,s,o){o.push((function(t,n,o){e.prependRight(r.start,s?n:n+"var "),e.appendLeft(r.end," = "+i+o),e.move(r.start,r.end,t)}))}(e,0,0,i,s,!0,a);break;case"AssignmentPattern":var l,c="Identifier"===i.left.type;l=c?n(i.left):t(s),a.push((function(t,n,r){o?(e.prependRight(i.right.start,l+" = "+s+", "+l+" = "+l+" === void 0 ? "),e.appendLeft(i.right.end," : "+l+r)):(e.prependRight(i.right.start,n+"var "+l+" = "+s+"; if ( "+l+" === void 0 ) "+l+" = "),e.appendLeft(i.right.end,r)),e.move(i.right.start,i.right.end,t)})),c?e.remove(r,i.right.start):(e.remove(r,i.left.start),e.remove(i.left.end,i.right.start),U(e,t,n,r,i.left,l,o,a));break;case"ObjectPattern":e.remove(r,r=i.start);var u=s;i.properties.length>1&&(u=t(s),a.push((function(t,n,a){e.prependRight(i.start,(o?"":n+"var ")+u+" = "),e.overwrite(i.start,r=i.start+1,s),e.appendLeft(r,a),e.overwrite(i.start,r=i.start+1,(o?"":n+"var ")+u+" = "+s+a),e.move(i.start,r,t)}))),B(e,t,n,i,u,o,a);break;case"ArrayPattern":if(e.remove(r,r=i.start),i.elements.filter(Boolean).length>1){var p=t(s);a.push((function(t,n,a){e.prependRight(i.start,(o?"":n+"var ")+p+" = "),e.overwrite(i.start,r=i.start+1,s,{contentOnly:!0}),e.appendLeft(r,a),e.move(i.start,r,t)})),i.elements.forEach((function(i,s){i&&("RestElement"===i.type?U(e,t,n,r,i.argument,p+".slice("+s+")",o,a):U(e,t,n,r,i,p+"["+s+"]",o,a),r=i.end)}))}else{var f=function(e,t){for(var n=0;n<e.length;n+=1)if(t(e[n],n))return n;return-1}(i.elements,Boolean),h=i.elements[f];"RestElement"===h.type?U(e,t,n,r,h.argument,s+".slice("+f+")",o,a):U(e,t,n,r,h,s+"["+f+"]",o,a),r=h.end}e.remove(r,i.end);break;default:throw new Error("Unexpected node type in destructuring ("+i.type+")")}}var H=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.createScope=function(){var e=this;this.parentIsFunction=/Function/.test(this.parent.type),this.isFunctionBlock=this.parentIsFunction||"Root"===this.parent.type,this.scope=new k({block:!this.isFunctionBlock,parent:this.parent.findScope(!1),declare:function(t){return e.createdDeclarations.push(t)}}),this.parentIsFunction&&this.parent.params.forEach((function(t){e.scope.addDeclaration(t,"param")}))},t.prototype.initialise=function(e){this.thisAlias=null,this.argumentsAlias=null,this.defaultParameters=[],this.createdDeclarations=[],this.scope||this.createScope(),this.body.forEach((function(t){return t.initialise(e)})),this.scope.consolidate()},t.prototype.findLexicalBoundary=function(){return"Program"===this.type||/^Function/.test(this.parent.type)?this:this.parent.findLexicalBoundary()},t.prototype.findScope=function(e){return e&&!this.isFunctionBlock?this.parent.findScope(e):this.scope},t.prototype.getArgumentsAlias=function(){return this.argumentsAlias||(this.argumentsAlias=this.scope.createIdentifier("arguments")),this.argumentsAlias},t.prototype.getArgumentsArrayAlias=function(){return this.argumentsArrayAlias||(this.argumentsArrayAlias=this.scope.createIdentifier("argsArray")),this.argumentsArrayAlias},t.prototype.getThisAlias=function(){return this.thisAlias||(this.thisAlias=this.scope.createIdentifier("this")),this.thisAlias},t.prototype.getIndentation=function(){if(void 0===this.indentation){for(var e=this.program.magicString.original,t=this.synthetic||!this.body.length,n=t?this.start:this.body[0].start;n&&"\n"!==e[n];)n-=1;for(this.indentation="";;){var r=e[n+=1];if(" "!==r&&"\t"!==r)break;this.indentation+=r}for(var i=this.program.magicString.getIndentString(),s=this.parent;s;)"constructor"!==s.kind||s.parent.parent.superClass||(this.indentation=this.indentation.replace(i,"")),s=s.parent;t&&(this.indentation+=i)}return this.indentation},t.prototype.transpile=function(t,n){var r,i,s=this,o=this.getIndentation(),a=[];if(this.argumentsAlias&&a.push((function(e,n,r){var i=n+"var "+s.argumentsAlias+" = arguments"+r;t.appendLeft(e,i)})),this.thisAlias&&a.push((function(e,n,r){var i=n+"var "+s.thisAlias+" = this"+r;t.appendLeft(e,i)})),this.argumentsArrayAlias&&a.push((function(e,n,r){var i=s.scope.createIdentifier("i"),a=n+"var "+i+" = arguments.length, "+s.argumentsArrayAlias+" = Array("+i+");\n"+o+"while ( "+i+"-- ) "+s.argumentsArrayAlias+"["+i+"] = arguments["+i+"]"+r;t.appendLeft(e,a)})),/Function/.test(this.parent.type)?this.transpileParameters(this.parent.params,t,n,o,a):"CatchClause"===this.parent.type&&this.transpileParameters([this.parent.param],t,n,o,a),n.letConst&&this.isFunctionBlock&&this.transpileBlockScopedIdentifiers(t),e.prototype.transpile.call(this,t,n),this.createdDeclarations.length&&a.push((function(e,n,r){var i=n+"var "+s.createdDeclarations.join(", ")+r;t.appendLeft(e,i)})),this.synthetic)if("ArrowFunctionExpression"===this.parent.type){var l=this.body[0];a.length?(t.appendLeft(this.start,"{").prependRight(this.end,this.parent.getIndentation()+"}"),t.prependRight(l.start,"\n"+o+"return "),t.appendLeft(l.end,";\n")):n.arrow&&(t.prependRight(l.start,"{ return "),t.appendLeft(l.end,"; }"))}else a.length&&t.prependRight(this.start,"{").appendLeft(this.end,"}");i=this.body[0],r=i&&"ExpressionStatement"===i.type&&"Literal"===i.expression.type&&"use strict"===i.expression.value?this.body[0].end:this.synthetic||"Root"===this.parent.type?this.start:this.start+1;var c="\n"+o,u=";";a.forEach((function(e,t){t===a.length-1&&(u=";\n"),e(r,c,u)}))},t.prototype.transpileParameters=function(e,t,n,r,i){var s=this;e.forEach((function(o){if("AssignmentPattern"===o.type&&"Identifier"===o.left.type)n.defaultParameter&&i.push((function(e,n,r){var i=n+"if ( "+o.left.name+" === void 0 ) "+o.left.name;t.prependRight(o.left.end,i).move(o.left.end,o.right.end,e).appendLeft(o.right.end,r)}));else if("RestElement"===o.type)n.spreadRest&&i.push((function(n,i,a){var l=e[e.length-2];if(l)t.remove(l?l.end:o.start,o.end);else{for(var c=o.start,u=o.end;/\s/.test(t.original[c-1]);)c-=1;for(;/\s/.test(t.original[u]);)u+=1;t.remove(c,u)}var p=o.argument.name,f=s.scope.createIdentifier("len"),h=e.length-1;h?t.prependRight(n,i+"var "+p+" = [], "+f+" = arguments.length - "+h+";\n"+r+"while ( "+f+"-- > 0 ) "+p+"[ "+f+" ] = arguments[ "+f+" + "+h+" ]"+a):t.prependRight(n,i+"var "+p+" = [], "+f+" = arguments.length;\n"+r+"while ( "+f+"-- ) "+p+"[ "+f+" ] = arguments[ "+f+" ]"+a)}));else if("Identifier"!==o.type&&n.parameterDestructuring){var a=s.scope.createIdentifier("ref");j(t,(function(e){return s.scope.createIdentifier(e)}),(function(e){var t=e.name;return s.scope.resolveName(t)}),o,a,!1,i),t.prependRight(o.start,a)}}))},t.prototype.transpileBlockScopedIdentifiers=function(e){var t=this;Object.keys(this.scope.blockScopedDeclarations).forEach((function(n){for(var r=0,i=t.scope.blockScopedDeclarations[n];r<i.length;r+=1){var s=i[r],o=!1;if("for.let"===s.kind){var a=s.node.findNearest("ForStatement");if(a.shouldRewriteAsFunction){var l=t.scope.createIdentifier(n),c=a.reassigned[n]?t.scope.createIdentifier(n):n;s.name=l,e.overwrite(s.node.start,s.node.end,l,{storeName:!0}),a.aliases[n]={outer:l,inner:c};for(var u=0,p=s.instances;u<p.length;u+=1){var f=p[u],h=a.body.contains(f)?c:l;n!==h&&e.overwrite(f.start,f.end,h,{storeName:!0})}o=!0}}if(!o){var d=t.scope.createIdentifier(n);if(n!==d){s.name=d,e.overwrite(s.node.start,s.node.end,d,{storeName:!0});for(var m=0,y=s.instances;m<y.length;m+=1){var g=y[m];g.rewritten=!0,e.overwrite(g.start,g.end,d,{storeName:!0})}}}}}))},t}(w),G=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.transpile=function(t,n){var r,i=this.name,s=i.start,o=i.name,a=this.value?this.value.start:this.name.end;t.overwrite(s,a,(/-/.test(r=o)?"'"+r+"'":r)+": "+(this.value?"":"true")),e.prototype.transpile.call(this,t,n)},t}(w);var V=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.transpile=function(e){var t,n=!0,r=this.parent.children[this.parent.children.length-1];(r&&("JSXText"===(t=r).type&&!/\S/.test(t.value)&&/\n/.test(t.value))||this.parent.openingElement.attributes.length)&&(n=!1),e.overwrite(this.start,this.end,n?" )":")")},t}(w);var K=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.transpile=function(e){var t,n=!0,r=this.parent.children[this.parent.children.length-1];r&&("JSXText"===(t=r).type&&!/\S/.test(t.value)&&/\n/.test(t.value))&&(n=!1),e.overwrite(this.start,this.end,n?" )":")")},t}(w);function W(e,t){return e=e.replace(/\u00a0/g,"&nbsp;"),t&&/\n/.test(e)&&(e=e.replace(/\s+$/,"")),e=e.replace(/^\n\r?\s+/,"").replace(/\s*\n\r?\s*/gm," "),JSON.stringify(e)}var Y=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.transpile=function(t,n){e.prototype.transpile.call(this,t,n);var r=this.children.filter((function(e){return"JSXText"!==e.type||(/\S/.test(e.raw)||!/\n/.test(e.raw))}));if(r.length){var i,s=(this.openingElement||this.openingFragment).end;for(i=0;i<r.length;i+=1){var o=r[i];if("JSXExpressionContainer"===o.type&&"JSXEmptyExpression"===o.expression.type);else{var a="\n"===t.original[s]&&"JSXText"!==o.type?"":" ";t.appendLeft(s,","+a)}if("JSXText"===o.type){var l=W(o.value,i===r.length-1);t.overwrite(o.start,o.end,l)}s=o.end}}},t}(w),q={JSXAttribute:G,JSXClosingElement:V,JSXClosingFragment:K,JSXElement:Y,JSXExpressionContainer:function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.transpile=function(t,n){t.remove(this.start,this.expression.start),t.remove(this.expression.end,this.end),e.prototype.transpile.call(this,t,n)},t}(w),JSXFragment:function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(Y),JSXOpeningElement:function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.transpile=function(t,n){e.prototype.transpile.call(this,t,n),t.overwrite(this.start,this.name.start,this.program.jsx+"( ");var r="JSXIdentifier"===this.name.type&&this.name.name[0]===this.name.name[0].toLowerCase();r&&t.prependRight(this.name.start,"'");var i=this.attributes.length,s=this.name.end;if(i){var o,a,l,c=!1;for(o=0;o<i;o+=1)if("JSXSpreadAttribute"===this.attributes[o].type){c=!0;break}for(s=this.attributes[0].end,o=0;o<i;o+=1){var u=this.attributes[o];if(o>0&&(u.start===s?t.prependRight(s,", "):t.overwrite(s,u.start,", ")),c&&"JSXSpreadAttribute"!==u.type){var p=this.attributes[o-1],f=this.attributes[o+1];p&&"JSXSpreadAttribute"!==p.type||t.prependRight(u.start,"{ "),f&&"JSXSpreadAttribute"!==f.type||t.appendLeft(u.end," }")}s=u.end}if(c)if(1===i)l=r?"',":",";else{if(!this.program.options.objectAssign)throw new L("Mixed JSX attributes ending in spread requires specified objectAssign option with 'Object.assign' or polyfill helper.",this);l=r?"', "+this.program.options.objectAssign+"({},":", "+this.program.options.objectAssign+"({},",a=")"}else l=r?"', {":", {",a=" }";t.prependRight(this.name.end,l),a&&t.appendLeft(this.attributes[i-1].end,a)}else t.appendLeft(this.name.end,r?"', null":", null"),s=this.name.end;this.selfClosing?t.overwrite(s,this.end,this.attributes.length?")":" )"):t.remove(s,this.end)},t}(w),JSXOpeningFragment:function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.transpile=function(e){e.overwrite(this.start,this.end,this.program.jsx+"( "+this.program.jsxFragment+", null")},t}(w),JSXSpreadAttribute:function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.transpile=function(t,n){t.remove(this.start,this.argument.start),t.remove(this.argument.end,this.end),e.prototype.transpile.call(this,t,n)},t}(w)},X={Program:["body"],Literal:[]},z={IfStatement:"consequent",ForStatement:"body",ForInStatement:"body",ForOfStatement:"body",WhileStatement:"body",DoWhileStatement:"body",ArrowFunctionExpression:"body"};function J(e,t,n,r){this.type="Root",this.jsx=r.jsx||"React.createElement",this.jsxFragment=r.jsxFragment||"React.Fragment",this.options=r,this.source=e,this.magicString=new v.a(e),this.ast=t,this.depth=0,function e(t,n){if(t)if("length"in t)for(var r=t.length;r--;)e(t[r],n);else if(!t.__wrapped){t.__wrapped=!0,X[t.type]||(X[t.type]=Object.keys(t).filter((function(e){return"object"==typeof t[e]})));var i=z[t.type];if(i&&"BlockStatement"!==t[i].type){var s=t[i];t[i]={start:s.start,end:s.end,type:"BlockStatement",body:[s],synthetic:!0}}t.parent=n,t.program=n.program||n,t.depth=n.depth+1,t.keys=X[t.type],t.indentation=void 0;for(var o=0,a=X[t.type];o<a.length;o+=1){var l=a[o];e(t[l],t)}t.program.magicString.addSourcemapLocation(t.start),t.program.magicString.addSourcemapLocation(t.end);var c=("BlockStatement"===t.type?H:q[t.type])||w;t.__proto__=c.prototype}}(this.body=t,this),this.body.__proto__=H.prototype,this.templateLiteralQuasis=Object.create(null);for(var i=0;i<this.body.body.length;++i)if(!this.body.body[i].directive){this.prependAt=this.body.body[i].start;break}this.objectWithoutPropertiesHelper=null,this.indentExclusionElements=[],this.body.initialise(n),this.indentExclusions=Object.create(null);for(var s=0,o=this.indentExclusionElements;s<o.length;s+=1)for(var a=o[s],l=a.start;l<a.end;l+=1)this.indentExclusions[l]=!0;this.body.transpile(this.magicString,n)}J.prototype={export:function(e){return void 0===e&&(e={}),{code:this.magicString.toString(),map:this.magicString.generateMap({file:e.file,source:e.source,includeContent:!1!==e.includeContent})}},findNearest:function(){return null},findScope:function(){return null},getObjectWithoutPropertiesHelper:function(e){return this.objectWithoutPropertiesHelper||(this.objectWithoutPropertiesHelper=this.body.scope.createIdentifier("objectWithoutProperties"),e.prependLeft(this.prependAt,"function "+this.objectWithoutPropertiesHelper+" (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }\n")),this.objectWithoutPropertiesHelper}};var $={chrome:{48:610719,49:652287,50:783359,51:783359,52:1045503,53:1045503,54:1045503,55:3142655,56:3142655,57:3142655,58:4191231,59:4191231,60:8385535,61:8385535,62:8385535,63:8385535,64:8385535,65:8385535,66:8385535,67:8385535,68:8385535,69:8385535,70:8385535,71:8385535},firefox:{43:643515,44:643515,45:643519,46:774591,47:774655,48:774655,49:774655,50:774655,51:775167,52:4191231,53:4191231,54:4191231,55:8385535,56:8385535,57:8385535,58:8385535,59:8385535,60:8385535,61:8385535,62:8385535,63:8385535,64:8385535},safari:{8:524297,9:594141,10:1831935,10.1:4191231,11:4191231,11.1:8385535,12:8385535},ie:{8:0,9:524289,10:524289,11:524289},edge:{12:610459,13:774559,14:2085887,15:4183039,16:4183039,17:4183039,18:4183039,19:4183039},node:{"0.10":524289,.12:524417,4:594335,5:594335,6:783359,8:4191231,8.3:8385535,8.7:8385535,"8.10":8385535}},Q=["getterSetter","arrow","classes","computedProperty","conciseMethodProperty","defaultParameter","destructuring","forOf","generator","letConst","moduleExport","moduleImport","numericLiteral","parameterDestructuring","spreadRest","stickyRegExp","templateString","unicodeRegExp","exponentiation","reservedProperties","trailingFunctionCommas","asyncAwait","objectRestSpread"],Z=S.Parser.extend(P.a,x()()),ee=["dangerousTaggedTemplateString","dangerousForOf"];function te(e,t){var n;void 0===t&&(t={});var r=null;try{n=Z.parse(e,{ecmaVersion:10,preserveParens:!0,sourceType:"module",allowAwaitOutsideFunction:!0,allowReturnOutsideFunction:!0,allowHashBang:!0,onComment:function(e,t){if(!r){var n=/@jsx\s+([^\s]+)/.exec(t);n&&(r=n[1])}}}),t.jsx=r||t.jsx}catch(s){throw s.snippet=D(e,s.loc),s.toString=function(){return s.name+": "+s.message+"\n"+s.snippet},s}var i=function(e){var t=Object.keys(e).length?8388607:524289;Object.keys(e).forEach((function(n){var r=$[n];if(!r)throw new Error("Unknown environment '"+n+"'. Please raise an issue at https://github.com/bublejs/buble/issues");var i=e[n];if(!(i in r))throw new Error("Support data exists for the following versions of "+n+": "+Object.keys(r).join(", ")+". Please raise an issue at https://github.com/bublejs/buble/issues");var s=r[i];t&=s}));var n=Object.create(null);return Q.forEach((function(e,r){n[e]=!(t&1<<r)})),ee.forEach((function(e){n[e]=!1})),n}(t.target||{});return Object.keys(t.transforms||{}).forEach((function(e){if("modules"===e)return"moduleImport"in t.transforms||(i.moduleImport=t.transforms.modules),void("moduleExport"in t.transforms||(i.moduleExport=t.transforms.modules));if(!(e in i))throw new Error("Unknown transform '"+e+"'");i[e]=t.transforms[e]})),!0===t.objectAssign&&(t.objectAssign="Object.assign"),new J(e,n,i,t).export(t)}var ne=n(250),re=n.n(ne),ie=n(28);function se(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function oe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ae(e,t){return(ae=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function le(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function ce(e,t,n){return(ce=le()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var i=new(Function.bind.apply(e,r));return n&&ae(i,n.prototype),i}).apply(null,arguments)}function ue(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}function pe(e){return function(e){if(Array.isArray(e))return fe(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return fe(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return fe(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function fe(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var he=function(e){var t,n=e.scope,r=void 0===n?{}:n,i=e.components,s=void 0===i?{}:i,a=e.remarkPlugins,l=void 0===a?[]:a,c=e.rehypePlugins,u=void 0===c?[]:c,p=e.children,f=ue(e,["scope","components","remarkPlugins","rehypePlugins","children"]),h=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?oe(Object(n),!0).forEach((function(t){se(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):oe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({mdx:ie.b,MDXProvider:ie.a,components:s,props:f},r),d=re.a.sync(p,{remarkPlugins:l,rehypePlugins:u,skipExport:!0}).trim();try{t=te(d,{objectAssign:"Object.assign"}).code}catch(g){throw console.error(g),g}var m=Object.keys(h),y=Object.values(h);return ce(Function,["_fn","React"].concat(pe(m),["".concat(t,"\n\n    return React.createElement(MDXProvider, { components },\n      React.createElement(MDXContent, props)\n    );")])).apply(void 0,[{},o.a].concat(pe(y)))},de=n(44),me=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={hasError:!1},n}Object(de.a)(t,e);var n=t.prototype;return n.componentDidCatch=function(e,t){this.setState({hasError:!0}),console.warn(e,t)},n.render=function(){return this.state.hasError?o.a.createElement("h2",null,"Oops! Something went wrong. If you have edited this page recently, check your content and try again."):this.props.children},t}(o.a.Component);function ye(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ge(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ye(Object(n),!0).forEach((function(t){Object(b.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ye(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Te=function(e){var t=e.md;return o.a.createElement(me,null,o.a.createElement(he,{components:ge(ge({},E),T)},t))};Te.defaultProps={md:""};var Ee=function(e){var t=e.title,n=e.sections;return o.a.createElement("article",null,o.a.createElement(m,{title:t}),o.a.createElement(p,{tag:1},t),g(n,[]).map((function(e,t){return o.a.createElement("section",{key:t},o.a.createElement("h2",null,e.title),o.a.createElement(Te,{md:e.body}),o.a.createElement("hr",null))})))};function be(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ve(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?be(Object(n),!0).forEach((function(t){Object(b.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):be(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Se=function(e){var t=e.title,n=e.body,r=e.children;return o.a.createElement("article",null,o.a.createElement(m,{title:g(t,"")}),o.a.createElement(p,{tag:1},t),o.a.createElement(Te,{md:n}),o.a.createElement(ie.a,{components:ve(ve({},E),T)},r))},Ae=function(e){return'<CallToAction url="'+(e.url||"")+'" align="center" bgColor="'+e.bgColor+'">'+(e.text||"")+"</CallToAction>"},xe={id:"cta",label:"Call to Action",fields:[{label:"Text",name:"text",widget:"string"},{label:"Link",name:"url",widget:"string"},{label:"Background Colour",name:"bgColor",widget:"select",options:["crimson","seagreen","rebeccapurple","midnightblue"],default:"rebeccapurple"}],pattern:/<CallToAction url="(\S+)" align="center" bgColor="(\S+)">(\S+)<\/CallToAction>/g,fromBlock:function(e){return{url:e[1],bgColor:e[2],text:e[3]}},toBlock:function(e){return Ae(e)},toPreview:function(e){return Ae(e)}},_e={id:"widget",label:"Widget",fields:[],pattern:/<Widget \/>/g,fromBlock:function(e){return{}},toBlock:function(e){return"<Widget />"},toPreview:function(e){return"<Widget />"}};n(136);i.a.registerPreviewTemplate("home",(function(e){var t=e.entry;return o.a.createElement(me,null,o.a.createElement(Ee,Object.assign({},t.getIn(["data"]).toJS(),{isPreview:!0})))})),i.a.registerPreviewTemplate("content",(function(e){var t=e.entry;return o.a.createElement(me,null,o.a.createElement(Se,Object.assign({},t.getIn(["data"]).toJS(),{isPreview:!0})))})),i.a.registerEditorComponent(xe),i.a.registerEditorComponent(_e)},function(e,t,n){"use strict";n.r(t),n.d(t,"wrapRootElement",(function(){return y}));var r=n(8),i=n(0),s=n.n(i),o=n(28),a=Object(i.createContext)({}),l=function(e){var t=e.__mdxScope,n=e.children;return s.a.createElement(a.Provider,{value:t},n)},c=n(243),u=Object.assign({});function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var h={};c.plugins.forEach((function(e){var t=e.guards,n=void 0===t?{}:t,r=e.components;Object.entries(r).forEach((function(e){var t=e[0],r=e[1];h[t]?h.push({guard:n[t],Component:r}):h[t]=[{guard:n[t],Component:r}]}))}));var d=Object.entries(h).map((function(e){var t,n=e[0],r=e[1];return(t={})[n]=function(e){return function(t){var n=e.find((function(e){var n=e.guard;return!n||n(t)})).Component;return s.a.createElement(n,t)}}(r.concat({guard:void 0,Component:n})),t})).reduce((function(e,t){return f(f({},e),t)}),{}),m=Object(o.c)((function(e){var t=e.components,n=e.children;return s.a.createElement(l,{__mdxScope:u},s.a.createElement(o.a,{components:f(f({},t),d)},n))})),y=function(e){var t=e.element;return s.a.createElement(m,null,t)}},function(e,t,n){"use strict";n.r(t);var r=n(8),i=n(0),s=n.n(i),o=n(34),a=n(44),l=n(131),c=n(10);function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var f=function(e){function t(){return e.apply(this,arguments)||this}return Object(a.a)(t,e),t.prototype.render=function(){var e=p(p({},this.props),{},{params:p(p({},Object(c.c)(this.props.location.pathname)),this.props.pageResources.json.pageContext.__params),pathContext:this.props.pageContext}),t=Object(l.apiRunner)("replaceComponentRenderer",{props:this.props,loader:o.publicLoader})[0]||Object(i.createElement)(this.props.pageResources.component,p(p({},e),{},{key:this.props.path||this.props.pageResources.page.path}));return Object(l.apiRunner)("wrapPageElement",{element:t,props:e},t,(function(t){return{element:t.result,props:e}})).pop()},t}(s.a.Component);function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}t.default=function(e){var t=e.location,n=o.default.loadPageSync(t.pathname);return n?s.a.createElement(f,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({location:t,pageResources:n},n.json)):null}}]);
//# sourceMappingURL=cms.js.map