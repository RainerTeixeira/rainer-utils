'use strict';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react.production.js
var require_react_production = __commonJS({
  "node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react.production.js"(exports$1) {
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
    var REACT_MEMO_TYPE = Symbol.for("react.memo");
    var REACT_LAZY_TYPE = Symbol.for("react.lazy");
    var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    };
    var assign = Object.assign;
    var emptyObject = {};
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    function ComponentDummy() {
    }
    ComponentDummy.prototype = Component.prototype;
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    var isArrayImpl = Array.isArray;
    function noop() {
    }
    var ReactSharedInternals = { H: null, A: null, T: null, S: null };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function ReactElement(type, key, props) {
      var refProp = props.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== refProp ? refProp : null,
        props
      };
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(oldElement.type, newKey, oldElement.props);
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    var userProvidedKeyEscapeRegex = /\/+/g;
    function getElementKey(element, index) {
      return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
            function(fulfilledValue) {
              "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            },
            function(error) {
              "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          )), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if ("undefined" === type || "boolean" === type) children = null;
      var invokeCallback = false;
      if (null === children) invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(
                  invokeCallback(children._payload),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback
                );
            }
        }
      if (invokeCallback)
        return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
          callback,
          escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
            userProvidedKeyEscapeRegex,
            "$&/"
          ) + "/") + invokeCallback
        )), array.push(callback)), 1;
      invokeCallback = 0;
      var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if (i = getIteratorFn(children), "function" === typeof i)
        for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if ("object" === type) {
        if ("function" === typeof children.then)
          return mapIntoArray(
            resolveThenable(children),
            array,
            escapedPrefix,
            nameSoFar,
            callback
          );
        array = String(children);
        throw Error(
          "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (null == children) return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ctor = payload._result;
        ctor = ctor();
        ctor.then(
          function(moduleObject) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 1, payload._result = moduleObject;
          },
          function(error) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 2, payload._result = error;
          }
        );
        -1 === payload._status && (payload._status = 0, payload._result = ctor);
      }
      if (1 === payload._status) return payload._result.default;
      throw payload._result;
    }
    var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    };
    var Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function() {
            forEachFunc.apply(this, arguments);
          },
          forEachContext
        );
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return children;
      }
    };
    exports$1.Activity = REACT_ACTIVITY_TYPE;
    exports$1.Children = Children;
    exports$1.Component = Component;
    exports$1.Fragment = REACT_FRAGMENT_TYPE;
    exports$1.Profiler = REACT_PROFILER_TYPE;
    exports$1.PureComponent = PureComponent;
    exports$1.StrictMode = REACT_STRICT_MODE_TYPE;
    exports$1.Suspense = REACT_SUSPENSE_TYPE;
    exports$1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports$1.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(size) {
        return ReactSharedInternals.H.useMemoCache(size);
      }
    };
    exports$1.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports$1.cacheSignal = function() {
      return null;
    };
    exports$1.cloneElement = function(element, config, children) {
      if (null === element || void 0 === element)
        throw Error(
          "The argument must be a React element, but you passed " + element + "."
        );
      var props = assign({}, element.props), key = element.key;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
      var propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        for (var childArray = Array(propName), i = 0; i < propName; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      return ReactElement(element.type, key, props);
    };
    exports$1.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      return defaultValue;
    };
    exports$1.createElement = function(type, config, children) {
      var propName, props = {}, key = null;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (1 === childrenLength) props.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          void 0 === props[propName] && (props[propName] = childrenLength[propName]);
      return ReactElement(type, key, props);
    };
    exports$1.createRef = function() {
      return { current: null };
    };
    exports$1.forwardRef = function(render) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render };
    };
    exports$1.isValidElement = isValidElement;
    exports$1.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    exports$1.memo = function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: void 0 === compare ? null : compare
      };
    };
    exports$1.startTransition = function(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    };
    exports$1.unstable_useCacheRefresh = function() {
      return ReactSharedInternals.H.useCacheRefresh();
    };
    exports$1.use = function(usable) {
      return ReactSharedInternals.H.use(usable);
    };
    exports$1.useActionState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useActionState(action, initialState, permalink);
    };
    exports$1.useCallback = function(callback, deps) {
      return ReactSharedInternals.H.useCallback(callback, deps);
    };
    exports$1.useContext = function(Context) {
      return ReactSharedInternals.H.useContext(Context);
    };
    exports$1.useDebugValue = function() {
    };
    exports$1.useDeferredValue = function(value, initialValue) {
      return ReactSharedInternals.H.useDeferredValue(value, initialValue);
    };
    exports$1.useEffect = function(create, deps) {
      return ReactSharedInternals.H.useEffect(create, deps);
    };
    exports$1.useEffectEvent = function(callback) {
      return ReactSharedInternals.H.useEffectEvent(callback);
    };
    exports$1.useId = function() {
      return ReactSharedInternals.H.useId();
    };
    exports$1.useImperativeHandle = function(ref, create, deps) {
      return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
    };
    exports$1.useInsertionEffect = function(create, deps) {
      return ReactSharedInternals.H.useInsertionEffect(create, deps);
    };
    exports$1.useLayoutEffect = function(create, deps) {
      return ReactSharedInternals.H.useLayoutEffect(create, deps);
    };
    exports$1.useMemo = function(create, deps) {
      return ReactSharedInternals.H.useMemo(create, deps);
    };
    exports$1.useOptimistic = function(passthrough, reducer) {
      return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
    };
    exports$1.useReducer = function(reducer, initialArg, init) {
      return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
    };
    exports$1.useRef = function(initialValue) {
      return ReactSharedInternals.H.useRef(initialValue);
    };
    exports$1.useState = function(initialState) {
      return ReactSharedInternals.H.useState(initialState);
    };
    exports$1.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return ReactSharedInternals.H.useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
      );
    };
    exports$1.useTransition = function() {
      return ReactSharedInternals.H.useTransition();
    };
    exports$1.version = "19.2.3";
  }
});

// node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "node_modules/.pnpm/react@19.2.3/node_modules/react/cjs/react.development.js"(exports$1, module) {
    "production" !== process.env.NODE_ENV && (function() {
      function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              info[0],
              info[1]
            );
          }
        });
      }
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable)
          return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      function warnNoop(publicInstance, callerName) {
        publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
        var warningKey = publicInstance + "." + callerName;
        didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          callerName,
          publicInstance
        ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
      }
      function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function ComponentDummy() {
      }
      function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
      }
      function noop() {
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        try {
          testStringCoercion(value);
          var JSCompiler_inline_result = false;
        } catch (e) {
          JSCompiler_inline_result = true;
        }
        if (JSCompiler_inline_result) {
          JSCompiler_inline_result = console;
          var JSCompiler_temp_const = JSCompiler_inline_result.error;
          var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          JSCompiler_temp_const.call(
            JSCompiler_inline_result,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            JSCompiler_inline_result$jscomp$0
          );
          return testStringCoercion(value);
        }
      }
      function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
          return "<...>";
        try {
          var name = getComponentNameFromType(type);
          return name ? "<" + name + ">" : "<...>";
        } catch (x) {
          return "<...>";
        }
      }
      function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
      }
      function UnknownOwner() {
        return Error("react-stack-top-frame");
      }
      function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
          var getter = Object.getOwnPropertyDescriptor(config, "key").get;
          if (getter && getter.isReactWarning) return false;
        }
        return void 0 !== config.key;
      }
      function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
          specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            displayName
          ));
        }
        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, "key", {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
      function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        ));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
      }
      function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
          $$typeof: REACT_ELEMENT_TYPE,
          type,
          key,
          props,
          _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
          enumerable: false,
          get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: null
        });
        Object.defineProperty(type, "_debugStack", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
          configurable: false,
          enumerable: false,
          writable: true,
          value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
      }
      function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(
          oldElement.type,
          newKey,
          oldElement.props,
          oldElement._owner,
          oldElement._debugStack,
          oldElement._debugTask
        );
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
      }
      function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
      }
      function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function escape(key) {
        var escaperLookup = { "=": "=0", ":": "=2" };
        return "$" + key.replace(/[=:]/g, function(match) {
          return escaperLookup[match];
        });
      }
      function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
      }
      function resolveThenable(thenable) {
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenable.reason;
          default:
            switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
              function(fulfilledValue) {
                "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
              },
              function(error) {
                "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            )), thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenable.reason;
            }
        }
        throw thenable;
      }
      function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = false;
        if (null === children) invokeCallback = true;
        else
          switch (type) {
            case "bigint":
            case "string":
            case "number":
              invokeCallback = true;
              break;
            case "object":
              switch (children.$$typeof) {
                case REACT_ELEMENT_TYPE:
                case REACT_PORTAL_TYPE:
                  invokeCallback = true;
                  break;
                case REACT_LAZY_TYPE:
                  return invokeCallback = children._init, mapIntoArray(
                    invokeCallback(children._payload),
                    array,
                    escapedPrefix,
                    nameSoFar,
                    callback
                  );
              }
          }
        if (invokeCallback) {
          invokeCallback = children;
          callback = callback(invokeCallback);
          var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
          isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
            return c;
          })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
            callback,
            escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
              userProvidedKeyEscapeRegex,
              "$&/"
            ) + "/") + childKey
          ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
          return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children))
          for (var i = 0; i < children.length; i++)
            nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if (i = getIteratorFn(children), "function" === typeof i)
          for (i === children.entries && (didWarnAboutMaps || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
            nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
              nameSoFar,
              array,
              escapedPrefix,
              type,
              callback
            );
        else if ("object" === type) {
          if ("function" === typeof children.then)
            return mapIntoArray(
              resolveThenable(children),
              array,
              escapedPrefix,
              nameSoFar,
              callback
            );
          array = String(children);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return invokeCallback;
      }
      function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
          return func.call(context, child, count++);
        });
        return result;
      }
      function lazyInitializer(payload) {
        if (-1 === payload._status) {
          var ioInfo = payload._ioInfo;
          null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
          ioInfo = payload._result;
          var thenable = ioInfo();
          thenable.then(
            function(moduleObject) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 1;
                payload._result = moduleObject;
                var _ioInfo = payload._ioInfo;
                null != _ioInfo && (_ioInfo.end = performance.now());
                void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
              }
            },
            function(error) {
              if (0 === payload._status || -1 === payload._status) {
                payload._status = 2;
                payload._result = error;
                var _ioInfo2 = payload._ioInfo;
                null != _ioInfo2 && (_ioInfo2.end = performance.now());
                void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
              }
            }
          );
          ioInfo = payload._ioInfo;
          if (null != ioInfo) {
            ioInfo.value = thenable;
            var displayName = thenable.displayName;
            "string" === typeof displayName && (ioInfo.name = displayName);
          }
          -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status)
          return ioInfo = payload._result, void 0 === ioInfo && console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
            ioInfo
          ), "default" in ioInfo || console.error(
            "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
            ioInfo
          ), ioInfo.default;
        throw payload._result;
      }
      function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
        return dispatcher;
      }
      function releaseAsyncTransition() {
        ReactSharedInternals.asyncTransitions--;
      }
      function enqueueTask(task) {
        if (null === enqueueTaskImpl)
          try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            enqueueTaskImpl = (module && module[requireString]).call(
              module,
              "timers"
            ).setImmediate;
          } catch (_err) {
            enqueueTaskImpl = function(callback) {
              false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var channel = new MessageChannel();
              channel.port1.onmessage = callback;
              channel.port2.postMessage(void 0);
            };
          }
        return enqueueTaskImpl(task);
      }
      function aggregateErrors(errors) {
        return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
      }
      function popActScope(prevActQueue, prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        );
        actScopeDepth = prevActScopeDepth;
      }
      function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        var queue = ReactSharedInternals.actQueue;
        if (null !== queue)
          if (0 !== queue.length)
            try {
              flushActQueue(queue);
              enqueueTask(function() {
                return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
              });
              return;
            } catch (error) {
              ReactSharedInternals.thrownErrors.push(error);
            }
          else ReactSharedInternals.actQueue = null;
        0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
      }
      function flushActQueue(queue) {
        if (!isFlushing) {
          isFlushing = true;
          var i = 0;
          try {
            for (; i < queue.length; i++) {
              var callback = queue[i];
              do {
                ReactSharedInternals.didUsePromise = false;
                var continuation = callback(false);
                if (null !== continuation) {
                  if (ReactSharedInternals.didUsePromise) {
                    queue[i] = callback;
                    queue.splice(0, i);
                    return;
                  }
                  callback = continuation;
                } else break;
              } while (1);
            }
            queue.length = 0;
          } catch (error) {
            queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
          } finally {
            isFlushing = false;
          }
        }
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
        isMounted: function() {
          return false;
        },
        enqueueForceUpdate: function(publicInstance) {
          warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance) {
          warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance) {
          warnNoop(publicInstance, "setState");
        }
      }, assign = Object.assign, emptyObject = {};
      Object.freeze(emptyObject);
      Component.prototype.isReactComponent = {};
      Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, partialState, callback, "setState");
      };
      Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
      };
      var deprecatedAPIs = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      };
      for (fnName in deprecatedAPIs)
        deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      ComponentDummy.prototype = Component.prototype;
      deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
      deprecatedAPIs.constructor = PureComponent;
      assign(deprecatedAPIs, Component.prototype);
      deprecatedAPIs.isPureReactComponent = true;
      var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: false,
        didScheduleLegacyUpdate: false,
        didUsePromise: false,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
        return null;
      };
      deprecatedAPIs = {
        react_stack_bottom_frame: function(callStackForError) {
          return callStackForError();
        }
      };
      var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
      var didWarnAboutElementRef = {};
      var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
        deprecatedAPIs,
        UnknownOwner
      )();
      var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
      var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
        queueMicrotask(function() {
          return queueMicrotask(callback);
        });
      } : enqueueTask;
      deprecatedAPIs = Object.freeze({
        __proto__: null,
        c: function(size) {
          return resolveDispatcher().useMemoCache(size);
        }
      });
      var fnName = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
          mapChildren(
            children,
            function() {
              forEachFunc.apply(this, arguments);
            },
            forEachContext
          );
        },
        count: function(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        },
        toArray: function(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        },
        only: function(children) {
          if (!isValidElement(children))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return children;
        }
      };
      exports$1.Activity = REACT_ACTIVITY_TYPE;
      exports$1.Children = fnName;
      exports$1.Component = Component;
      exports$1.Fragment = REACT_FRAGMENT_TYPE;
      exports$1.Profiler = REACT_PROFILER_TYPE;
      exports$1.PureComponent = PureComponent;
      exports$1.StrictMode = REACT_STRICT_MODE_TYPE;
      exports$1.Suspense = REACT_SUSPENSE_TYPE;
      exports$1.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
      exports$1.__COMPILER_RUNTIME = deprecatedAPIs;
      exports$1.act = function(callback) {
        var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
        actScopeDepth++;
        var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
        try {
          var result = callback();
        } catch (error) {
          ReactSharedInternals.thrownErrors.push(error);
        }
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        if (null !== result && "object" === typeof result && "function" === typeof result.then) {
          var thenable = result;
          queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          });
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              thenable.then(
                function(returnValue) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  if (0 === prevActScopeDepth) {
                    try {
                      flushActQueue(queue), enqueueTask(function() {
                        return recursivelyFlushAsyncActWork(
                          returnValue,
                          resolve,
                          reject
                        );
                      });
                    } catch (error$0) {
                      ReactSharedInternals.thrownErrors.push(error$0);
                    }
                    if (0 < ReactSharedInternals.thrownErrors.length) {
                      var _thrownError = aggregateErrors(
                        ReactSharedInternals.thrownErrors
                      );
                      ReactSharedInternals.thrownErrors.length = 0;
                      reject(_thrownError);
                    }
                  } else resolve(returnValue);
                },
                function(error) {
                  popActScope(prevActQueue, prevActScopeDepth);
                  0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                    ReactSharedInternals.thrownErrors
                  ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                }
              );
            }
          };
        }
        var returnValue$jscomp$0 = result;
        popActScope(prevActQueue, prevActScopeDepth);
        0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), ReactSharedInternals.actQueue = null);
        if (0 < ReactSharedInternals.thrownErrors.length)
          throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        return {
          then: function(resolve, reject) {
            didAwaitActCall = true;
            0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
              return recursivelyFlushAsyncActWork(
                returnValue$jscomp$0,
                resolve,
                reject
              );
            })) : resolve(returnValue$jscomp$0);
          }
        };
      };
      exports$1.cache = function(fn) {
        return function() {
          return fn.apply(null, arguments);
        };
      };
      exports$1.cacheSignal = function() {
        return null;
      };
      exports$1.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
      };
      exports$1.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element)
          throw Error(
            "The argument must be a React element, but you passed " + element + "."
          );
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
          var JSCompiler_inline_result;
          a: {
            if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
              config,
              "ref"
            ).get) && JSCompiler_inline_result.isReactWarning) {
              JSCompiler_inline_result = false;
              break a;
            }
            JSCompiler_inline_result = void 0 !== config.ref;
          }
          JSCompiler_inline_result && (owner = getOwner());
          hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
          for (propName in config)
            !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
          JSCompiler_inline_result = Array(propName);
          for (var i = 0; i < propName; i++)
            JSCompiler_inline_result[i] = arguments[i + 2];
          props.children = JSCompiler_inline_result;
        }
        props = ReactElement(
          element.type,
          key,
          props,
          owner,
          element._debugStack,
          element._debugTask
        );
        for (key = 2; key < arguments.length; key++)
          validateChildKeys(arguments[key]);
        return props;
      };
      exports$1.createContext = function(defaultValue) {
        defaultValue = {
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: defaultValue,
          _currentValue2: defaultValue,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
          $$typeof: REACT_CONSUMER_TYPE,
          _context: defaultValue
        };
        defaultValue._currentRenderer = null;
        defaultValue._currentRenderer2 = null;
        return defaultValue;
      };
      exports$1.createElement = function(type, config, children) {
        for (var i = 2; i < arguments.length; i++)
          validateChildKeys(arguments[i]);
        i = {};
        var key = null;
        if (null != config)
          for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
            hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
          for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
            childArray[_i] = arguments[_i + 2];
          Object.freeze && Object.freeze(childArray);
          i.children = childArray;
        }
        if (type && type.defaultProps)
          for (propName in childrenLength = type.defaultProps, childrenLength)
            void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        key && defineKeyPropWarningGetter(
          i,
          "function" === typeof type ? type.displayName || type.name || "Unknown" : type
        );
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(
          type,
          key,
          i,
          getOwner(),
          propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
          propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
        );
      };
      exports$1.createRef = function() {
        var refObject = { current: null };
        Object.seal(refObject);
        return refObject;
      };
      exports$1.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : "function" !== typeof render ? console.error(
          "forwardRef requires a render function but was given %s.",
          null === render ? "null" : typeof render
        ) : 0 !== render.length && 2 !== render.length && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        );
        null != render && null != render.defaultProps && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
        Object.defineProperty(elementType, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
          }
        });
        return elementType;
      };
      exports$1.isValidElement = isValidElement;
      exports$1.lazy = function(ctor) {
        ctor = { _status: -1, _result: ctor };
        var lazyType = {
          $$typeof: REACT_LAZY_TYPE,
          _payload: ctor,
          _init: lazyInitializer
        }, ioInfo = {
          name: "lazy",
          start: -1,
          end: -1,
          value: null,
          owner: null,
          debugStack: Error("react-stack-top-frame"),
          debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        ctor._ioInfo = ioInfo;
        lazyType._debugInfo = [{ awaited: ioInfo }];
        return lazyType;
      };
      exports$1.memo = function(type, compare) {
        null == type && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          null === type ? "null" : typeof type
        );
        compare = {
          $$typeof: REACT_MEMO_TYPE,
          type,
          compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
          enumerable: false,
          configurable: true,
          get: function() {
            return ownName;
          },
          set: function(name) {
            ownName = name;
            type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
          }
        });
        return compare;
      };
      exports$1.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition._updatedFibers = /* @__PURE__ */ new Set();
        ReactSharedInternals.T = currentTransition;
        try {
          var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
        } catch (error) {
          reportGlobalError(error);
        } finally {
          null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
            "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
          ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
      };
      exports$1.unstable_useCacheRefresh = function() {
        return resolveDispatcher().useCacheRefresh();
      };
      exports$1.use = function(usable) {
        return resolveDispatcher().use(usable);
      };
      exports$1.useActionState = function(action, initialState, permalink) {
        return resolveDispatcher().useActionState(
          action,
          initialState,
          permalink
        );
      };
      exports$1.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
      };
      exports$1.useContext = function(Context) {
        var dispatcher = resolveDispatcher();
        Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        );
        return dispatcher.useContext(Context);
      };
      exports$1.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
      };
      exports$1.useDeferredValue = function(value, initialValue) {
        return resolveDispatcher().useDeferredValue(value, initialValue);
      };
      exports$1.useEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useEffect(create, deps);
      };
      exports$1.useEffectEvent = function(callback) {
        return resolveDispatcher().useEffectEvent(callback);
      };
      exports$1.useId = function() {
        return resolveDispatcher().useId();
      };
      exports$1.useImperativeHandle = function(ref, create, deps) {
        return resolveDispatcher().useImperativeHandle(ref, create, deps);
      };
      exports$1.useInsertionEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useInsertionEffect(create, deps);
      };
      exports$1.useLayoutEffect = function(create, deps) {
        null == create && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        return resolveDispatcher().useLayoutEffect(create, deps);
      };
      exports$1.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
      };
      exports$1.useOptimistic = function(passthrough, reducer) {
        return resolveDispatcher().useOptimistic(passthrough, reducer);
      };
      exports$1.useReducer = function(reducer, initialArg, init) {
        return resolveDispatcher().useReducer(reducer, initialArg, init);
      };
      exports$1.useRef = function(initialValue) {
        return resolveDispatcher().useRef(initialValue);
      };
      exports$1.useState = function(initialState) {
        return resolveDispatcher().useState(initialState);
      };
      exports$1.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return resolveDispatcher().useSyncExternalStore(
          subscribe,
          getSnapshot,
          getServerSnapshot
        );
      };
      exports$1.useTransition = function() {
        return resolveDispatcher().useTransition();
      };
      exports$1.version = "19.2.3";
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/.pnpm/react@19.2.3/node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/.pnpm/react@19.2.3/node_modules/react/index.js"(exports$1, module) {
    if (process.env.NODE_ENV === "production") {
      module.exports = require_react_production();
    } else {
      module.exports = require_react_development();
    }
  }
});

// src/types.ts
var DEFAULT_LOCALE = "pt-BR";
var CURRENCY_MAP = {
  "pt-BR": "BRL",
  "en-US": "USD",
  "es-ES": "EUR"
};

// src/error/index.ts
function formatError(error) {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return String(error);
}
function isError(error) {
  return error instanceof Error;
}
function createError(message, context) {
  const error = new Error(message);
  if (context) {
    error.context = context;
  }
  return error;
}
function validateEmailSimple(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// src/color/index.ts
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}
function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function hexToHsl(hex) {
  const rgb = hexToRgb(hex);
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}
function hslToHex(h, s, l) {
  h = h / 360;
  s = s / 100;
  l = l / 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p2, q2, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
      if (t < 1 / 2) return q2;
      if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
      return p2;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}
function adjustBrightness(hex, amount) {
  const hsl = hexToHsl(hex);
  const newL = Math.max(0, Math.min(100, hsl.l + amount));
  return hslToHex(hsl.h, hsl.s, newL);
}
function adjustSaturation(hex, amount) {
  const hsl = hexToHsl(hex);
  const newS = Math.max(0, Math.min(100, hsl.s + amount));
  return hslToHex(hsl.h, newS, hsl.l);
}
function adjustHue(hex, degrees) {
  const hsl = hexToHsl(hex);
  const newH = (hsl.h + degrees) % 360;
  return hslToHex(newH < 0 ? newH + 360 : newH, hsl.s, hsl.l);
}
function lighten(hex, amount) {
  return adjustBrightness(hex, amount);
}
function darken(hex, amount) {
  return adjustBrightness(hex, -amount);
}
function hexToRgba(hex, alpha) {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}
function getComplementary(hex) {
  return adjustHue(hex, 180);
}
function getAnalogousPalette(hex, count = 5) {
  const hsl = hexToHsl(hex);
  const step = 30;
  const palette = [];
  for (let i = 0; i < count; i++) {
    const hue = (hsl.h + (i - Math.floor(count / 2)) * step) % 360;
    palette.push(hslToHex(hue < 0 ? hue + 360 : hue, hsl.s, hsl.l));
  }
  return palette;
}

// src/date/index.ts
var date_exports = {};
__export(date_exports, {
  formatDate: () => formatDate,
  formatDateTime: () => formatDateTime,
  formatRelativeDate: () => formatRelativeDate,
  isValidDate: () => isValidDate,
  toISOString: () => toISOString
});
var RELATIVE_TEXTS = {
  "pt-BR": {
    now: "agora",
    minute: (n) => `h\xE1 ${n} ${n === 1 ? "minuto" : "minutos"}`,
    hour: (n) => `h\xE1 ${n} ${n === 1 ? "hora" : "horas"}`,
    day: (n) => `h\xE1 ${n} ${n === 1 ? "dia" : "dias"}`,
    month: (n) => `h\xE1 ${n} ${n === 1 ? "m\xEAs" : "meses"}`,
    year: (n) => `h\xE1 ${n} ${n === 1 ? "ano" : "anos"}`
  },
  "en-US": {
    now: "now",
    minute: (n) => `${n} ${n === 1 ? "minute" : "minutes"} ago`,
    hour: (n) => `${n} ${n === 1 ? "hour" : "hours"} ago`,
    day: (n) => `${n} ${n === 1 ? "day" : "days"} ago`,
    month: (n) => `${n} ${n === 1 ? "month" : "months"} ago`,
    year: (n) => `${n} ${n === 1 ? "year" : "years"} ago`
  },
  "es-ES": {
    now: "ahora",
    minute: (n) => `hace ${n} ${n === 1 ? "minuto" : "minutos"}`,
    hour: (n) => `hace ${n} ${n === 1 ? "hora" : "horas"}`,
    day: (n) => `hace ${n} ${n === 1 ? "d\xEDa" : "d\xEDas"}`,
    month: (n) => `hace ${n} ${n === 1 ? "mes" : "meses"}`,
    year: (n) => `hace ${n} ${n === 1 ? "a\xF1o" : "a\xF1os"}`
  }
};
function formatDate(date, format = "long", locale = DEFAULT_LOCALE) {
  const d = typeof date === "string" ? new Date(date) : date;
  const options = {
    day: "numeric",
    month: format === "short" ? "2-digit" : "long",
    year: "numeric",
    ...format === "full" && { weekday: "long" }
  };
  if (format === "short") {
    return d.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
  }
  return d.toLocaleDateString(locale, options);
}
function formatDateTime(date, locale = DEFAULT_LOCALE) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function formatRelativeDate(date, locale = DEFAULT_LOCALE) {
  const d = typeof date === "string" ? new Date(date) : date;
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) {
    return "";
  }
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1e3);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30.4375);
  const diffYear = Math.floor(diffDay / 365);
  const texts = RELATIVE_TEXTS[locale];
  if (diffSec < 10) {
    if (locale === "pt-BR") return "agora mesmo";
    if (locale === "en-US") return "just now";
    if (locale === "es-ES") return "ahora mismo";
  }
  if (diffSec < 60) return texts.now;
  if (diffMin < 60) return texts.minute(diffMin);
  if (diffHour < 24) return texts.hour(diffHour);
  if (diffDay === 1) {
    if (locale === "pt-BR") return "ontem";
    if (locale === "en-US") return "yesterday";
    if (locale === "es-ES") return "ayer";
  }
  if (diffDay === 2) {
    if (locale === "pt-BR") return "anteontem";
    if (locale === "en-US") return "the day before yesterday";
    if (locale === "es-ES") return "anteayer";
  }
  if (diffDay < 30) return texts.day(diffDay);
  if (diffMonth < 12) return texts.month(diffMonth);
  return texts.year(diffYear);
}
function toISOString(date) {
  return date.toISOString();
}
function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime());
}

// src/status/index.ts
var status_exports = {};
__export(status_exports, {
  getStatusColor: () => getStatusColor,
  getStatusVariant: () => getStatusVariant,
  translatePostStatus: () => translatePostStatus,
  translateStatus: () => translateStatus
});
var STATUS_TRANSLATIONS = {
  "pt-BR": {
    // Estados de conteúdo
    DRAFT: "Rascunho",
    PUBLISHED: "Publicado",
    ARCHIVED: "Arquivado",
    SCHEDULED: "Agendado",
    DELETED: "Exclu\xEDdo",
    // Estados de processo
    PENDING: "Pendente",
    ACTIVE: "Ativo",
    INACTIVE: "Inativo",
    COMPLETED: "Conclu\xEDdo",
    CANCELLED: "Cancelado",
    // Estados de aprovação
    APPROVED: "Aprovado",
    REJECTED: "Rejeitado",
    // Estados de pedido/pagamento
    PROCESSING: "Processando",
    PAID: "Pago",
    UNPAID: "N\xE3o Pago",
    REFUNDED: "Reembolsado",
    FAILED: "Falhou",
    // Estados de usuário
    VERIFIED: "Verificado",
    UNVERIFIED: "N\xE3o Verificado",
    BANNED: "Banido",
    SUSPENDED: "Suspenso"
  },
  "en-US": {
    DRAFT: "Draft",
    PUBLISHED: "Published",
    ARCHIVED: "Archived",
    SCHEDULED: "Scheduled",
    DELETED: "Deleted",
    PENDING: "Pending",
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
    APPROVED: "Approved",
    REJECTED: "Rejected",
    PROCESSING: "Processing",
    PAID: "Paid",
    UNPAID: "Unpaid",
    REFUNDED: "Refunded",
    FAILED: "Failed",
    VERIFIED: "Verified",
    UNVERIFIED: "Unverified",
    BANNED: "Banned",
    SUSPENDED: "Suspended"
  },
  "es-ES": {
    DRAFT: "Borrador",
    PUBLISHED: "Publicado",
    ARCHIVED: "Archivado",
    SCHEDULED: "Programado",
    DELETED: "Eliminado",
    PENDING: "Pendiente",
    ACTIVE: "Activo",
    INACTIVE: "Inactivo",
    COMPLETED: "Completado",
    CANCELLED: "Cancelado",
    APPROVED: "Aprobado",
    REJECTED: "Rechazado",
    PROCESSING: "Procesando",
    PAID: "Pagado",
    UNPAID: "No Pagado",
    REFUNDED: "Reembolsado",
    FAILED: "Fallido",
    VERIFIED: "Verificado",
    UNVERIFIED: "No Verificado",
    BANNED: "Bloqueado",
    SUSPENDED: "Suspendido"
  }
};
function translateStatus(status, locale = DEFAULT_LOCALE) {
  const normalized = status.toUpperCase();
  return STATUS_TRANSLATIONS[locale][normalized] || status;
}
function getStatusColor(status) {
  const normalized = status.toUpperCase();
  const colorMap = {
    DRAFT: "text-gray-600",
    PENDING: "text-yellow-600",
    PUBLISHED: "text-green-600",
    ACTIVE: "text-green-600",
    INACTIVE: "text-gray-600",
    ARCHIVED: "text-orange-600",
    DELETED: "text-red-600",
    SCHEDULED: "text-blue-600",
    COMPLETED: "text-green-600",
    CANCELLED: "text-red-600",
    APPROVED: "text-green-600",
    REJECTED: "text-red-600",
    FAILED: "text-red-600",
    VERIFIED: "text-green-600",
    BANNED: "text-red-600"
  };
  return colorMap[normalized] || "text-gray-600";
}
function getStatusVariant(status) {
  const normalized = status.toUpperCase();
  if (["PUBLISHED", "ACTIVE", "COMPLETED", "APPROVED", "VERIFIED"].includes(normalized)) {
    return "default";
  }
  if (["DELETED", "CANCELLED", "REJECTED", "FAILED", "BANNED"].includes(normalized)) {
    return "destructive";
  }
  if (["DRAFT", "INACTIVE", "ARCHIVED"].includes(normalized)) {
    return "secondary";
  }
  return "outline";
}
function translatePostStatus(status, locale = DEFAULT_LOCALE) {
  const postStatusMap = {
    "draft": "DRAFT",
    "published": "PUBLISHED",
    "archived": "ARCHIVED",
    "scheduled": "SCHEDULED",
    "pending_review": "PENDING"
  };
  const normalized = postStatusMap[status.toLowerCase()] || status.toUpperCase();
  if (status.toLowerCase() === "pending_review") {
    const translations = {
      "pt-BR": "Aguardando Revis\xE3o",
      "en-US": "Pending Review",
      "es-ES": "Pendiente de Revisi\xF3n"
    };
    return translations[locale] || translations["pt-BR"];
  }
  return translateStatus(normalized, locale);
}

// src/validation/index.ts
function validatePassword(password, options = {}, locale = DEFAULT_LOCALE) {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = false
  } = options;
  const errors = [];
  const errorMessages = {
    "pt-BR": {
      minLength: `Senha deve ter pelo menos ${minLength} caracteres`,
      uppercase: "Senha deve conter pelo menos uma letra mai\xFAscula",
      lowercase: "Senha deve conter pelo menos uma letra min\xFAscula",
      numbers: "Senha deve conter pelo menos um n\xFAmero",
      specialChars: "Senha deve conter pelo menos um caractere especial"
    },
    "en-US": {
      minLength: `Password must be at least ${minLength} characters`,
      uppercase: "Password must contain at least one uppercase letter",
      lowercase: "Password must contain at least one lowercase letter",
      numbers: "Password must contain at least one number",
      specialChars: "Password must contain at least one special character"
    },
    "es-ES": {
      minLength: `La contrase\xF1a debe tener al menos ${minLength} caracteres`,
      uppercase: "La contrase\xF1a debe contener al menos una letra may\xFAscula",
      lowercase: "La contrase\xF1a debe contener al menos una letra min\xFAscula",
      numbers: "La contrase\xF1a debe contener al menos un n\xFAmero",
      specialChars: "La contrase\xF1a debe contener al menos un car\xE1cter especial"
    }
  };
  const messages = errorMessages[locale] || errorMessages["pt-BR"];
  if (password.length < minLength) {
    errors.push(messages.minLength);
  }
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push(messages.uppercase);
  }
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push(messages.lowercase);
  }
  if (requireNumbers && !/\d/.test(password)) {
    errors.push(messages.numbers);
  }
  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push(messages.specialChars);
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}
function validateUrl(url, locale = DEFAULT_LOCALE) {
  try {
    new URL(url);
    return { isValid: true };
  } catch {
    const errors = {
      "pt-BR": ["URL inv\xE1lida"],
      "en-US": ["Invalid URL"],
      "es-ES": ["URL inv\xE1lida"]
    };
    return {
      isValid: false,
      errors: errors[locale] || errors["pt-BR"]
    };
  }
}
function validatePhone(phone, locale = DEFAULT_LOCALE) {
  const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[-]?\d{4}$/;
  const isValid = phoneRegex.test(phone);
  if (!isValid) {
    const errors = {
      "pt-BR": ["Telefone inv\xE1lido"],
      "en-US": ["Invalid phone number"],
      "es-ES": ["Tel\xE9fono inv\xE1lido"]
    };
    return {
      isValid: false,
      errors: errors[locale] || errors["pt-BR"]
    };
  }
  return { isValid: true };
}
function validateUsername(username, options = {}, locale = DEFAULT_LOCALE) {
  const {
    minLength = 3,
    maxLength = 20,
    allowSpecialChars = false
  } = options;
  const errors = [];
  const errorMessages = {
    "pt-BR": {
      minLength: `Username muito curto (m\xEDnimo ${minLength} caracteres)`,
      maxLength: `Username muito longo (m\xE1ximo ${maxLength} caracteres)`,
      invalidChars: "Username cont\xE9m caracteres inv\xE1lidos"
    },
    "en-US": {
      minLength: `Username too short (minimum ${minLength} characters)`,
      maxLength: `Username too long (maximum ${maxLength} characters)`,
      invalidChars: "Username contains invalid characters"
    },
    "es-ES": {
      minLength: `Username muy corto (m\xEDnimo ${minLength} caracteres)`,
      maxLength: `Username muy largo (m\xE1ximo ${maxLength} caracteres)`,
      invalidChars: "Username contiene caracteres inv\xE1lidos"
    }
  };
  const messages = errorMessages[locale] || errorMessages["pt-BR"];
  if (username.length < minLength) {
    errors.push(messages.minLength);
  }
  if (username.length > maxLength) {
    errors.push(messages.maxLength);
  }
  const usernameRegex = allowSpecialChars ? /^[a-zA-Z0-9_]{3,20}$/ : /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    errors.push(messages.invalidChars);
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}
function validateSlug(slug, options = {}, locale = DEFAULT_LOCALE) {
  const {
    minLength = 3,
    maxLength = 100
  } = options;
  const errors = [];
  const errorMessages = {
    "pt-BR": {
      minLength: `Slug muito curto (m\xEDnimo ${minLength} caracteres)`,
      maxLength: `Slug muito longo (m\xE1ximo ${maxLength} caracteres)`,
      invalidFormat: "Slug inv\xE1lido - use apenas letras min\xFAsculas, n\xFAmeros e h\xEDfens"
    },
    "en-US": {
      minLength: `Slug too short (minimum ${minLength} characters)`,
      maxLength: `Slug too long (maximum ${maxLength} characters)`,
      invalidFormat: "Invalid slug - use only lowercase letters, numbers and hyphens"
    },
    "es-ES": {
      minLength: `Slug muy corto (m\xEDnimo ${minLength} caracteres)`,
      maxLength: `Slug muy largo (m\xE1ximo ${maxLength} caracteres)`,
      invalidFormat: "Slug inv\xE1lido - use solo letras min\xFAsculas, n\xFAmeros y guiones"
    }
  };
  const messages = errorMessages[locale] || errorMessages["pt-BR"];
  if (slug.length < minLength) {
    errors.push(messages.minLength);
  }
  if (slug.length > maxLength) {
    errors.push(messages.maxLength);
  }
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(slug)) {
    errors.push(messages.invalidFormat);
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}
function validateText(text, options = {}, locale = DEFAULT_LOCALE) {
  const {
    minLength = 0,
    maxLength = Infinity,
    fieldName = "Texto"
  } = options;
  const errors = [];
  const errorMessages = {
    "pt-BR": {
      minLength: `${fieldName} muito curto (m\xEDnimo ${minLength} caracteres)`,
      maxLength: `${fieldName} muito longo (m\xE1ximo ${maxLength} caracteres)`
    },
    "en-US": {
      minLength: `${fieldName} too short (minimum ${minLength} characters)`,
      maxLength: `${fieldName} too long (maximum ${maxLength} characters)`
    },
    "es-ES": {
      minLength: `${fieldName} muy corto (m\xEDnimo ${minLength} caracteres)`,
      maxLength: `${fieldName} muy largo (m\xE1ximo ${maxLength} caracteres)`
    }
  };
  const messages = errorMessages[locale] || errorMessages["pt-BR"];
  if (text.length < minLength) {
    errors.push(messages.minLength);
  }
  if (text.length > maxLength) {
    errors.push(messages.maxLength);
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}
function validateMessage(message, options = {}, locale = DEFAULT_LOCALE) {
  const {
    minLength = 10,
    maxLength = 1e3
  } = options;
  return validateText(message, {
    minLength,
    maxLength,
    fieldName: locale === "pt-BR" ? "Mensagem" : locale === "en-US" ? "Message" : "Mensaje"
  }, locale);
}

// src/dom/index.ts
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function onReducedMotionChange(callback) {
  if (typeof window === "undefined") {
    return () => {
    };
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handleChange = (e) => {
    callback(e.matches);
  };
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleChange);
  } else {
    mediaQuery.addListener(handleChange);
  }
  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener("change", handleChange);
    } else {
      mediaQuery.removeListener(handleChange);
    }
  };
}
function scrollToPosition(x = 0, y = 0, options = {}) {
  if (typeof window === "undefined") return;
  const { smooth = false, behavior } = options;
  window.scrollTo({
    left: x,
    top: y,
    behavior: behavior || (smooth ? "smooth" : "auto")
  });
}
function scrollToTop(smooth = false) {
  scrollToPosition(0, 0, { smooth });
}
function smoothScrollTo(x, y, duration = 300) {
  if (typeof window === "undefined") return;
  const startX = window.scrollX;
  const startY = window.scrollY;
  const distanceX = x - startX;
  const distanceY = y - startY;
  const startTime = performance.now();
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentX = startX + distanceX * easeProgress;
    const currentY = startY + distanceY * easeProgress;
    window.scrollTo(currentX, currentY);
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
}
function scrollToElement(element, options = {}) {
  if (typeof window === "undefined") return;
  const { smooth = false, offset = 0, behavior } = options;
  let targetElement;
  if (typeof element === "string") {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }
  if (!targetElement) return;
  const rect = targetElement.getBoundingClientRect();
  const absoluteY = rect.top + window.scrollY - offset;
  window.scrollTo({
    left: 0,
    top: absoluteY,
    behavior: behavior || (smooth ? "smooth" : "auto")
  });
}
function isElementVisible(element, threshold = 0) {
  if (typeof window === "undefined") return false;
  let targetElement;
  if (typeof element === "string") {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }
  if (!targetElement) return false;
  const rect = targetElement.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const verticalThreshold = windowHeight * threshold;
  const horizontalThreshold = windowWidth * threshold;
  const isVisibleVertically = rect.bottom >= verticalThreshold && rect.top <= windowHeight - verticalThreshold;
  const isVisibleHorizontally = rect.right >= horizontalThreshold && rect.left <= windowWidth - horizontalThreshold;
  return isVisibleVertically && isVisibleHorizontally;
}
function getElementPosition(element) {
  if (typeof window === "undefined") return null;
  let targetElement;
  if (typeof element === "string") {
    targetElement = document.querySelector(element);
  } else {
    targetElement = element;
  }
  if (!targetElement) return null;
  const rect = targetElement.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY
  };
}
function isMobile() {
  if (typeof window === "undefined") return false;
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const isMobileScreen = window.innerWidth <= 768;
  return isMobileUA || isMobileScreen;
}
function isDarkMode() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function onDarkModeChange(callback) {
  if (typeof window === "undefined") {
    return () => {
    };
  }
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = (e) => {
    callback(e.matches);
  };
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleChange);
  } else {
    mediaQuery.addListener(handleChange);
  }
  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener("change", handleChange);
    } else {
      mediaQuery.removeListener(handleChange);
    }
  };
}
async function copyToClipboard(text) {
  if (typeof window === "undefined") return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const result = document.execCommand("copy");
    document.body.removeChild(textArea);
    return result;
  } catch {
    return false;
  }
}
function downloadFile(blob, filename) {
  if (typeof window === "undefined") return;
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// src/stats/index.ts
function formatCompactNumber(num) {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "k";
  }
  return num.toString();
}
function calculateChange(current, previous) {
  if (previous === 0) return 100;
  return Math.round((current - previous) / previous * 100);
}
function formatPercentage(value, options = {}) {
  const { showSign = true, decimals = 0 } = options;
  const sign = showSign && value > 0 ? "+" : "";
  const formattedValue = value.toFixed(decimals);
  return `${sign}${formattedValue}%`;
}
function generateMockChartData(days, locale = "pt-BR") {
  const data = [];
  const now = /* @__PURE__ */ new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit"
      }),
      views: Math.floor(Math.random() * 1e3) + 500,
      uniqueViews: Math.floor(Math.random() * 700) + 300,
      likes: Math.floor(Math.random() * 100) + 50,
      comments: Math.floor(Math.random() * 50) + 10,
      shares: Math.floor(Math.random() * 30) + 5
    });
  }
  return data;
}
function groupDataByPeriod(data) {
  return data;
}
function calculateMovingAverage(data, window2) {
  const result = [];
  for (let i = window2 - 1; i < data.length; i++) {
    const sum = data.slice(i - window2 + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push(sum / window2);
  }
  return result;
}
function findMinMax(data, field) {
  const values = data.map((item) => Number(item[field]) || 0);
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
}

// src/authentication/index.ts
var authentication_exports = {};
__export(authentication_exports, {
  getRefreshToken: () => getRefreshToken,
  getToken: () => getToken,
  getTokens: () => getTokens,
  hasToken: () => hasToken,
  removeToken: () => removeToken,
  setRefreshToken: () => setRefreshToken,
  setToken: () => setToken,
  setTokens: () => setTokens
});
var TOKEN_KEY = "auth_token";
var REFRESH_TOKEN_KEY = "refresh_token";
var getToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(TOKEN_KEY);
};
var setToken = (token) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(TOKEN_KEY, token);
};
var getRefreshToken = () => {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};
var setRefreshToken = (refreshToken) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};
var removeToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
var hasToken = () => {
  return !!getToken();
};
var getTokens = () => {
  return {
    accessToken: getToken(),
    refreshToken: getRefreshToken()
  };
};
var setTokens = ({
  accessToken,
  refreshToken
}) => {
  setToken(accessToken);
  setRefreshToken(refreshToken);
};

// src/search/index.ts
function searchContent(query, content, options = {}) {
  if (!query.trim()) return content;
  const {
    fields = ["title", "description", "content", "tags"],
    caseSensitive = false,
    exactMatch = false
  } = options;
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  return content.filter((item) => {
    return fields.some((field) => {
      const value = item[field];
      if (!value) return false;
      if (Array.isArray(value)) {
        return value.some((v) => {
          const strValue2 = caseSensitive ? String(v) : String(v).toLowerCase();
          return exactMatch ? strValue2 === searchQuery : strValue2.includes(searchQuery);
        });
      }
      const strValue = caseSensitive ? String(value) : String(value).toLowerCase();
      return exactMatch ? strValue === searchQuery : strValue.includes(searchQuery);
    });
  });
}
function searchWithScore(query, content, options = {}) {
  if (!query.trim()) return content;
  const {
    fields = ["title", "description", "content", "tags"],
    caseSensitive = false
  } = options;
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  const scored = content.map((item) => {
    let score = 0;
    fields.forEach((field, index) => {
      const value = item[field];
      if (!value) return;
      const weight = fields.length - index;
      if (Array.isArray(value)) {
        const matches = value.filter((v) => {
          const strValue = caseSensitive ? String(v) : String(v).toLowerCase();
          return strValue.includes(searchQuery);
        }).length;
        score += matches * weight;
      } else {
        const strValue = caseSensitive ? String(value) : String(value).toLowerCase();
        if (strValue.includes(searchQuery)) {
          score += weight;
          if (strValue === searchQuery) {
            score += weight * 2;
          }
        }
      }
    });
    return { item, score };
  });
  return scored.filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).map(({ item }) => item);
}
function fuzzySearch(query, content, options = {}) {
  if (!query.trim()) return content;
  const {
    fields = ["title", "description"],
    caseSensitive = false,
    threshold = 0.6
    // Similaridade mínima (0-1)
  } = options;
  const searchQuery = caseSensitive ? query : query.toLowerCase();
  return content.filter((item) => {
    return fields.some((field) => {
      const value = item[field];
      if (!value) return false;
      const strValue = caseSensitive ? String(value) : String(value).toLowerCase();
      const similarity = calculateSimilarity(searchQuery, strValue);
      return similarity >= threshold;
    });
  });
}
function calculateSimilarity(str1, str2) {
  if (str1 === str2) return 1;
  if (str1.length === 0 || str2.length === 0) return 0;
  if (str2.includes(str1)) return 0.8;
  const common = str1.split("").filter((char) => str2.includes(char)).length;
  const similarity = common / Math.max(str1.length, str2.length);
  return similarity;
}

// src/image/index.ts
function isAcceptedFormat(mimeType) {
  const acceptedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/avif"
  ];
  return acceptedTypes.includes(mimeType);
}
function isWebP(mimeType) {
  return mimeType === "image/webp";
}
function supportsWebP() {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
}
async function getImageInfo(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: file.size,
        type: file.type
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}
async function resizeImage(file, maxWidth, maxHeight, quality = 0.9, format = "image/jpeg") {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      let { width, height } = img;
      if (width > maxWidth) {
        height = maxWidth / width * height;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = maxHeight / height * width;
        height = maxHeight;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: format,
              lastModified: Date.now()
            });
            resolve(resizedFile);
          } else {
            reject(new Error("Failed to create blob"));
          }
        },
        format,
        quality
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}
async function convertToWebP(file, quality = 0.9) {
  if (isWebP(file.type)) {
    return file;
  }
  return resizeImage(file, file.size, file.size, quality, "image/webp");
}
async function prepareImageForUpload(file, options = {}) {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.9,
    shouldConvertToWebP = true,
    maxSizeBytes = 5 * 1024 * 1024
    // 5MB
  } = options;
  if (!isAcceptedFormat(file.type)) {
    throw new Error("Formato de imagem n\xE3o suportado");
  }
  if (file.size > maxSizeBytes) {
    throw new Error(`Arquivo muito grande. M\xE1ximo: ${maxSizeBytes / 1024 / 1024}MB`);
  }
  const info = await getImageInfo(file);
  let processedFile = file;
  if (info.width > maxWidth || info.height > maxHeight) {
    processedFile = await resizeImage(file, maxWidth, maxHeight, quality);
  }
  if (shouldConvertToWebP && !isWebP(processedFile.type)) {
    try {
      const isWebPSupported = await supportsWebP();
      if (isWebPSupported === true) {
        processedFile = await convertToWebP(processedFile, quality);
      }
    } catch {
    }
  }
  return processedFile;
}
function generatePlaceholder(width, height, text = "") {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.fillStyle = "rgb(229, 231, 235)";
  ctx.fillRect(0, 0, width, height);
  if (text) {
    ctx.fillStyle = "rgb(107, 114, 128)";
    ctx.font = `${Math.min(width, height) / 10}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, width / 2, height / 2);
  }
  return canvas.toDataURL();
}

// src/cookie/index.ts
var COOKIE_CONSENT_KEY = "cookie-consent";
var COOKIE_PREFERENCES_KEY = "cookie-preferences";
var COOKIE_VERSION = "1.0.0";
var _CookieManager = class _CookieManager {
  constructor() {
  }
  static getInstance() {
    if (!_CookieManager.instance) {
      _CookieManager.instance = new _CookieManager();
    }
    return _CookieManager.instance;
  }
  hasConsent() {
    if (typeof window === "undefined") return false;
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) return false;
      const consentData = JSON.parse(consent);
      return consentData.consented === true;
    } catch {
      return false;
    }
  }
  getPreferences() {
    if (typeof window === "undefined") return null;
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) return null;
      const consentData = JSON.parse(consent);
      return consentData.preferences || null;
    } catch {
      return null;
    }
  }
  saveConsent(preferences) {
    if (typeof window === "undefined") return;
    try {
      const consent = {
        version: COOKIE_VERSION,
        consented: true,
        timestamp: Date.now(),
        preferences
      };
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(preferences));
      window.dispatchEvent(
        new CustomEvent("cookie-consent-updated", { detail: preferences })
      );
      this.loadScripts(preferences);
    } catch {
    }
  }
  updatePreferences(preferences) {
    this.saveConsent(preferences);
  }
  revokeConsent() {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      localStorage.removeItem(COOKIE_PREFERENCES_KEY);
      this.clearAnalyticsCookies();
      window.dispatchEvent(
        new CustomEvent("cookie-consent-revoked", { detail: null })
      );
    } catch {
    }
  }
  isAllowed(type) {
    const preferences = this.getPreferences();
    if (!preferences) return false;
    if (type === "essential") {
      return preferences.essential === true;
    }
    return preferences[type] === true;
  }
  loadScripts(preferences) {
    if (preferences.analytics) {
      this.loadGoogleAnalytics();
    } else {
      this.unloadGoogleAnalytics();
    }
  }
  loadGoogleAnalytics() {
  }
  unloadGoogleAnalytics() {
    const scripts = document.querySelectorAll(
      'script[src*="googletagmanager.com"], script[src*="google-analytics.com"]'
    );
    scripts.forEach((script) => script.remove());
    this.clearAnalyticsCookies();
    const win = window;
    if (win.dataLayer) {
      win.dataLayer = [];
    }
    if (win.gtag) {
      delete win.gtag;
    }
  }
  clearAnalyticsCookies() {
    if (typeof document === "undefined") return;
    const analyticsCookies = [
      "_ga",
      "_ga_*",
      "_gid",
      "_gat",
      "_gat_gtag_*",
      "__utma",
      "__utmt",
      "__utmb",
      "__utmc",
      "__utmz",
      "__utmv"
    ];
    analyticsCookies.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      if (cookieName.includes("*")) {
        const baseName = cookieName.replace("*", "");
        const cookies = document.cookie.split(";");
        cookies.forEach((cookie) => {
          const parts = cookie.split("=");
          if (parts.length === 0) return;
          const name = parts[0]?.trim();
          if (!name || !name.startsWith(baseName)) return;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
        });
      }
    });
  }
};
__publicField(_CookieManager, "instance");
var CookieManager = _CookieManager;
function getCookieManager() {
  return CookieManager.getInstance();
}
function hasCookieConsent() {
  return getCookieManager().hasConsent();
}
function getCookiePreferences() {
  return getCookieManager().getPreferences();
}
function saveCookieConsent(preferences) {
  getCookieManager().saveConsent(preferences);
}
function isCookieAllowed(type) {
  return getCookieManager().isAllowed(type);
}

// src/hooks/useAuth.ts
var import_react = __toESM(require_react());
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["ADMIN"] = "admin";
  UserRole2["MODERATOR"] = "moderator";
  UserRole2["USER"] = "user";
  UserRole2["GUEST"] = "guest";
  return UserRole2;
})(UserRole || {});
var DEFAULT_CONFIG = {
  autoRefresh: true,
  refreshInterval: 15 * 60 * 1e3,
  // 15 minutes
  tokenStorageKey: "auth_token",
  userStorageKey: "auth_user",
  apiEndpoint: "/api/auth",
  onAuthChange: () => {
  },
  onError: () => {
  }
};
var AuthStorage = class {
  static setItem(key, value) {
    if (!this.isClient) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }
  static getItem(key) {
    if (!this.isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn("Failed to read from localStorage:", error);
      return null;
    }
  }
  static removeItem(key) {
    if (!this.isClient) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn("Failed to remove from localStorage:", error);
    }
  }
  static setUser(user, key) {
    this.setItem(key, JSON.stringify(user));
  }
  static getUser(key) {
    const data = this.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch {
      this.removeItem(key);
      return null;
    }
  }
  static removeUser(key) {
    this.removeItem(key);
  }
};
__publicField(AuthStorage, "isClient", typeof window !== "undefined");
var TokenManager = class {
  static decodeToken(token) {
    try {
      const payload = token.split(".")[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
  static isTokenExpired(token) {
    const decoded = this.decodeToken(token);
    if (!decoded) return true;
    const now = Date.now() / 1e3;
    return (decoded.exp ?? 0) < now;
  }
};
function useAuth(config = {}) {
  const configRef = (0, import_react.useRef)({ ...DEFAULT_CONFIG, ...config });
  const cfg = configRef.current;
  const [user, setUser] = (0, import_react.useState)(null);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  const [isAuthenticated, setIsAuthenticated] = (0, import_react.useState)(false);
  const refreshTimerRef = (0, import_react.useRef)(null);
  const storeToken = (0, import_react.useCallback)((token, refreshToken2) => {
    AuthStorage.setItem(cfg.tokenStorageKey, token);
    if (refreshToken2) {
      AuthStorage.setItem(`${cfg.tokenStorageKey}_refresh`, refreshToken2);
    }
  }, [cfg.tokenStorageKey]);
  const getStoredToken = (0, import_react.useCallback)(() => {
    return AuthStorage.getItem(cfg.tokenStorageKey);
  }, [cfg.tokenStorageKey]);
  const clearTokens = (0, import_react.useCallback)(() => {
    AuthStorage.removeItem(cfg.tokenStorageKey);
    AuthStorage.removeItem(`${cfg.tokenStorageKey}_refresh`);
  }, [cfg.tokenStorageKey]);
  const apiCall = (0, import_react.useCallback)(async (endpoint, options = {}) => {
    const token = getStoredToken();
    const url = `${cfg.apiEndpoint}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...token && { Authorization: `Bearer ${token}` },
        ...options.headers
      }
    });
    if (!response.ok) {
      const error2 = await response.text();
      throw new Error(error2 || `HTTP ${response.status}`);
    }
    return response.json();
  }, [cfg.apiEndpoint, getStoredToken]);
  const login = (0, import_react.useCallback)(async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall("/login", {
        method: "POST",
        body: JSON.stringify(credentials)
      });
      if (response.success && response.user && response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        storeToken(response.token, response.refreshToken);
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        return { success: true, user: response.user, token: response.token };
      } else {
        const errorMsg = response.error || "Login failed";
        setError(errorMsg);
        if (cfg.onError) cfg.onError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error2) {
      const errorMsg = error2 instanceof Error ? error2.message : "Login failed";
      setError(errorMsg);
      if (cfg.onError) cfg.onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [apiCall, setUser, storeToken, cfg]);
  const logout = (0, import_react.useCallback)(async (options = {}) => {
    try {
      if (options.invalidateAllSessions) {
        await apiCall("/logout", { method: "POST" });
      }
    } catch (error2) {
      console.warn("Logout API call failed:", error2);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      clearTokens();
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      if (cfg.onAuthChange) {
        cfg.onAuthChange(null);
      }
    }
  }, [apiCall, clearTokens, cfg]);
  const register = (0, import_react.useCallback)(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall("/register", {
        method: "POST",
        body: JSON.stringify(userData)
      });
      if (response.success && response.user && response.token) {
        setUser(response.user);
        setIsAuthenticated(true);
        storeToken(response.token, response.refreshToken);
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        return { success: true, user: response.user, token: response.token };
      } else {
        const errorMsg = response.error || "Registration failed";
        setError(errorMsg);
        if (cfg.onError) cfg.onError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error2) {
      const errorMsg = error2 instanceof Error ? error2.message : "Registration failed";
      setError(errorMsg);
      if (cfg.onError) cfg.onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [apiCall, setUser, storeToken, cfg]);
  const updateProfile = (0, import_react.useCallback)(async (data) => {
    if (!user) {
      const error2 = "No user logged in";
      setError(error2);
      if (cfg.onError) cfg.onError(error2);
      return { success: false, error: error2 };
    }
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall("/profile", {
        method: "PUT",
        body: JSON.stringify(data)
      });
      if (response.success && response.user) {
        setUser(response.user);
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        return { success: true, user: response.user };
      } else {
        const errorMsg = response.error || "Profile update failed";
        setError(errorMsg);
        if (cfg.onError) cfg.onError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error2) {
      const errorMsg = error2 instanceof Error ? error2.message : "Profile update failed";
      setError(errorMsg);
      if (cfg.onError) cfg.onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  }, [apiCall, user, setUser, cfg]);
  const refreshToken = (0, import_react.useCallback)(async () => {
    const refreshToken2 = AuthStorage.getItem(`${cfg.tokenStorageKey}_refresh`);
    if (!refreshToken2) {
      return { success: false, error: "No refresh token available" };
    }
    try {
      const response = await apiCall("/refresh", {
        method: "POST",
        body: JSON.stringify({ refreshToken: refreshToken2 })
      });
      if (response.success && response.token && response.user) {
        setUser(response.user);
        storeToken(response.token, response.refreshToken);
        if (cfg.onAuthChange) {
          cfg.onAuthChange(response.user);
        }
        return { success: true, user: response.user, token: response.token };
      } else {
        await logout();
        return { success: false, error: "Session expired" };
      }
    } catch (error2) {
      await logout();
      return { success: false, error: "Session expired" };
    }
  }, [apiCall, setUser, storeToken, logout, cfg]);
  const resetError = (0, import_react.useCallback)(() => {
    setError(null);
  }, []);
  (0, import_react.useEffect)(() => {
    const token = getStoredToken();
    const storedUser = AuthStorage.getUser(cfg.userStorageKey);
    if (token && storedUser && !TokenManager.isTokenExpired(token)) {
      setUser(storedUser);
      setIsAuthenticated(true);
      if (cfg.onAuthChange) {
        cfg.onAuthChange(storedUser);
      }
    } else if (token && TokenManager.isTokenExpired(token)) {
      refreshToken();
    } else {
      setLoading(false);
    }
    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, []);
  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    register,
    updateProfile,
    refreshToken,
    resetError
  };
}
function useIsAuthenticated() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}
function useCurrentUser() {
  const { user } = useAuth();
  return user;
}
function useHasRole(role) {
  const { user } = useAuth();
  return user?.role === role;
}
function useIsAdmin() {
  return useHasRole("admin" /* ADMIN */);
}

// src/hooks/use-password-strength.ts
var import_react2 = __toESM(require_react());
function usePasswordStrength(password, options = {}) {
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
    customPatterns = [],
    labels = {}
  } = options;
  const defaultLabels = {
    veryWeak: "Very Weak",
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
    enterPassword: "Enter a password",
    useMinLength: `Use at least ${minLength} characters`,
    addUppercase: "Add uppercase letters",
    addLowercase: "Add lowercase letters",
    addNumbers: "Add numbers",
    addSpecialChars: "Add special characters (!@#$%)",
    avoidRepeating: "Avoid repeating characters",
    avoidCommon: "Avoid common passwords or obvious patterns"
  };
  const finalLabels = { ...defaultLabels, ...labels };
  const strength = import_react2.default.useMemo(() => {
    if (!password) return 0;
    let score = 0;
    const length = password.length;
    if (length >= minLength) score += 25;
    if (length >= 12) score += 15;
    if (length >= 16) score += 10;
    if (/[a-z]/.test(password) && requireLowercase) score += 15;
    if (/[A-Z]/.test(password) && requireUppercase) score += 15;
    if (/[0-9]/.test(password) && requireNumbers) score += 15;
    if (/[^a-zA-Z0-9]/.test(password) && requireSpecialChars) score += 20;
    customPatterns.forEach((pattern) => {
      if (new RegExp(pattern).test(password)) {
        score += 5;
      }
    });
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/.test(password)) {
      score += 10;
    }
    const commonPatterns = [
      /^123456/,
      /password/i,
      /qwerty/i,
      /admin/i,
      /abc123/i,
      /^(.)\1+$/,
      // Caracteres repetidos
      /^(?:[a-z]+|[A-Z]+|[0-9]+)$/
      // Apenas um tipo de caractere
    ];
    commonPatterns.forEach((pattern) => {
      if (pattern.test(password)) {
        score = Math.max(0, score - 20);
      }
    });
    return Math.min(100, Math.max(0, score));
  }, [password, minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars, customPatterns]);
  const level = import_react2.default.useMemo(() => {
    if (strength < 20) return "very-weak";
    if (strength < 40) return "weak";
    if (strength < 60) return "fair";
    if (strength < 80) return "good";
    return "strong";
  }, [strength]);
  const color = import_react2.default.useMemo(() => {
    switch (level) {
      case "very-weak":
        return "var(--color-red-500)";
      // red-500
      case "weak":
        return "#f97316";
      // orange-500
      case "fair":
        return "#eab308";
      // yellow-500
      case "good":
        return "var(--color-green-500)";
      // green-500
      case "strong":
        return "#059669";
      // emerald-600
      default:
        return "var(--color-gray-500)";
    }
  }, [level]);
  const label = import_react2.default.useMemo(() => {
    switch (level) {
      case "very-weak":
        return finalLabels.veryWeak;
      case "weak":
        return finalLabels.weak;
      case "fair":
        return finalLabels.fair;
      case "good":
        return finalLabels.good;
      case "strong":
        return finalLabels.strong;
      default:
        return finalLabels.enterPassword;
    }
  }, [level, finalLabels]);
  const validations = import_react2.default.useMemo(() => {
    return {
      hasMinLength: password.length >= minLength,
      hasUppercase: !requireUppercase || /[A-Z]/.test(password),
      hasLowercase: !requireLowercase || /[a-z]/.test(password),
      hasNumbers: !requireNumbers || /[0-9]/.test(password),
      hasSpecialChars: !requireSpecialChars || /[^a-zA-Z0-9]/.test(password),
      noRepeatingChars: !/^(.)\1+$/.test(password),
      noCommonPatterns: !/123456|password|qwerty|admin|abc123/i.test(password)
    };
  }, [password, minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars]);
  const isValid = import_react2.default.useMemo(() => {
    return Object.values(validations).every(Boolean);
  }, [validations]);
  const suggestions = import_react2.default.useMemo(() => {
    const suggestions2 = [];
    if (!validations.hasMinLength) {
      suggestions2.push(finalLabels.useMinLength);
    }
    if (!validations.hasUppercase && requireUppercase) {
      suggestions2.push(finalLabels.addUppercase);
    }
    if (!validations.hasLowercase && requireLowercase) {
      suggestions2.push(finalLabels.addLowercase);
    }
    if (!validations.hasNumbers && requireNumbers) {
      suggestions2.push(finalLabels.addNumbers);
    }
    if (!validations.hasSpecialChars && requireSpecialChars) {
      suggestions2.push(finalLabels.addSpecialChars);
    }
    if (!validations.noRepeatingChars) {
      suggestions2.push(finalLabels.avoidRepeating);
    }
    if (!validations.noCommonPatterns) {
      suggestions2.push(finalLabels.avoidCommon);
    }
    return suggestions2;
  }, [validations, finalLabels, minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialChars]);
  const generateStrongPassword = import_react2.default.useCallback((length = 16) => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let chars = lowercase;
    if (requireUppercase) chars += uppercase;
    if (requireNumbers) chars += numbers;
    if (requireSpecialChars) chars += special;
    let password2 = "";
    if (requireLowercase) password2 += lowercase[Math.floor(Math.random() * lowercase.length)];
    if (requireUppercase) password2 += uppercase[Math.floor(Math.random() * uppercase.length)];
    if (requireNumbers) password2 += numbers[Math.floor(Math.random() * numbers.length)];
    if (requireSpecialChars) password2 += special[Math.floor(Math.random() * special.length)];
    for (let i = password2.length; i < length; i++) {
      password2 += chars[Math.floor(Math.random() * chars.length)];
    }
    return password2.split("").sort(() => Math.random() - 0.5).join("");
  }, [requireUppercase, requireLowercase, requireNumbers, requireSpecialChars]);
  return {
    // Métricas principais
    strength,
    level,
    color,
    label,
    isValid,
    // Validações detalhadas
    validations,
    // Feedback ao usuário
    suggestions,
    // Utilitários
    generateStrongPassword,
    // Estados convenientes
    isVeryWeak: level === "very-weak",
    isWeak: level === "weak",
    isFair: level === "fair",
    isGood: level === "good",
    isStrong: level === "strong"
  };
}

// src/hooks/use-intersection-observer.ts
var import_react3 = __toESM(require_react());
function useIntersectionObserver(options = {}) {
  const {
    threshold = 0,
    rootMargin = "0px",
    root = null,
    freezeOnceVisible = false
  } = options;
  const [isIntersecting, setIsIntersecting] = (0, import_react3.useState)(false);
  const [entry, setEntry] = (0, import_react3.useState)();
  const targetRef = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
    const target = targetRef.current;
    if (!target) return;
    const hasSupport = "IntersectionObserver" in window;
    if (!hasSupport) return;
    const observer = new IntersectionObserver(
      ([entry2]) => {
        const isElementIntersecting = entry2.isIntersecting;
        setEntry(entry2);
        setIsIntersecting(isElementIntersecting);
        if (freezeOnceVisible && isElementIntersecting) {
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
        root
      }
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
    };
  }, [
    threshold,
    rootMargin,
    root,
    freezeOnceVisible,
    targetRef.current
  ]);
  return {
    isIntersecting,
    targetRef,
    entry
  };
}

// src/hooks/use-smooth-scroll.ts
var import_react4 = __toESM(require_react());

// src/scroll/index.ts
function prefersReducedMotion2() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function smoothScrollTo2(target, options) {
  const element = typeof target === "string" ? document.querySelector(target) : target;
  if (!element) {
    console.warn(`Elemento n\xE3o encontrado: ${target}`);
    return;
  }
  const shouldAnimate = !prefersReducedMotion2();
  element.scrollIntoView({
    behavior: shouldAnimate ? "smooth" : "auto",
    block: "start",
    inline: "nearest",
    ...options
  });
}
function scrollToTop2() {
  const shouldAnimate = !prefersReducedMotion2();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: shouldAnimate ? "smooth" : "auto"
  });
}
function scrollToPosition2(x, y, smooth = true) {
  const shouldAnimate = smooth && !prefersReducedMotion2();
  window.scrollTo({
    top: y,
    left: x,
    behavior: shouldAnimate ? "smooth" : "auto"
  });
}
function onReducedMotionChange2(callback) {
  if (typeof window === "undefined") {
    return () => {
    };
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handler = (event) => {
    callback(event.matches);
  };
  handler(mediaQuery);
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }
  if (mediaQuery.addListener) {
    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }
  return () => {
  };
}

// src/hooks/use-smooth-scroll.ts
function useSmoothScroll() {
  const [reducedMotion, setReducedMotion] = (0, import_react4.useState)(false);
  (0, import_react4.useEffect)(() => {
    setReducedMotion(prefersReducedMotion2());
    const cleanup = onReducedMotionChange2((matches) => {
      setReducedMotion(matches);
    });
    return cleanup;
  }, []);
  const scrollTo = (0, import_react4.useCallback)(
    (target, options) => {
      smoothScrollTo2(target, options);
    },
    []
  );
  const toTop = (0, import_react4.useCallback)(() => {
    scrollToTop2();
  }, []);
  const toPosition = (0, import_react4.useCallback)((x, y) => {
    scrollToPosition2(x, y);
  }, []);
  return {
    scrollTo,
    scrollToTop: toTop,
    scrollToPosition: toPosition,
    reducedMotion,
    shouldAnimate: !reducedMotion
  };
}

// src/hooks/use-scroll-position.ts
var import_react5 = __toESM(require_react());
function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = (0, import_react5.useState)({ x: 0, y: 0 });
  const [isScrolling, setIsScrolling] = (0, import_react5.useState)(false);
  const [scrollDirection, setScrollDirection] = (0, import_react5.useState)(null);
  (0, import_react5.useEffect)(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      setScrollPosition({ x: currentScrollX, y: currentScrollY });
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);
  return {
    scrollPosition,
    isScrolling,
    scrollDirection,
    isScrolledDown: scrollPosition.y > 0,
    scrollPercentage: Math.round(
      scrollPosition.y / (document.documentElement.scrollHeight - window.innerHeight) * 100
    )
  };
}

// src/hooks/use-mobile.ts
var React2 = __toESM(require_react());
function useIsMobile() {
  const [isMobileState, setIsMobileState] = React2.useState(false);
  React2.useEffect(() => {
    setIsMobileState(isMobile());
  }, []);
  return isMobileState;
}

// src/hooks/use-toggle-state.ts
var import_react6 = __toESM(require_react());
function useToggleState({
  initialValue = false,
  storage = { type: "localStorage" },
  onToggle
} = {}) {
  const [isActive, setIsActive] = (0, import_react6.useState)(initialValue);
  const [isLoading, setIsLoading] = (0, import_react6.useState)(true);
  (0, import_react6.useEffect)(() => {
    if (storage.type === "none") {
      setIsLoading(false);
      return;
    }
    try {
      const storageKey = storage.key || "toggle-state";
      const storageObj = storage.type === "localStorage" ? localStorage : sessionStorage;
      const stored = storageObj.getItem(storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        if (storage.ttl && data.timestamp) {
          const age = (Date.now() - data.timestamp) / (1e3 * 60);
          if (age > storage.ttl) {
            storageObj.removeItem(storageKey);
            setIsLoading(false);
            return;
          }
        }
        setIsActive(data.value);
      }
    } catch (error) {
      console.warn("Error loading toggle state:", error);
    } finally {
      setIsLoading(false);
    }
  }, [storage]);
  const saveState = (newValue) => {
    setIsActive(newValue);
    onToggle?.(newValue);
    if (storage.type === "none") return;
    try {
      const storageKey = storage.key || "toggle-state";
      const storageObj = storage.type === "localStorage" ? localStorage : sessionStorage;
      const data = {
        value: newValue,
        timestamp: storage.ttl ? Date.now() : void 0
      };
      storageObj.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn("Error saving toggle state:", error);
    }
  };
  const toggle = () => saveState(!isActive);
  const setActive = (value) => saveState(value);
  return {
    isActive,
    isLoading,
    toggle,
    setActive,
    setIsActive: saveState
  };
}

// src/hooks/use-counter.ts
var import_react7 = __toESM(require_react());
function useCounter({
  initialValue = 0,
  min = 0,
  max = Infinity,
  step = 1,
  onChange
} = {}) {
  const [count, setCount] = (0, import_react7.useState)(initialValue);
  const increment = (0, import_react7.useCallback)(() => {
    setCount((prev) => {
      const newValue = Math.min(prev + step, max);
      if (newValue !== prev) {
        onChange?.(newValue, step);
      }
      return newValue;
    });
  }, [step, max, onChange]);
  const decrement = (0, import_react7.useCallback)(() => {
    setCount((prev) => {
      const newValue = Math.max(prev - step, min);
      if (newValue !== prev) {
        onChange?.(newValue, -step);
      }
      return newValue;
    });
  }, [step, min, onChange]);
  const set = (0, import_react7.useCallback)((value) => {
    const clampedValue = Math.max(min, Math.min(max, value));
    setCount(clampedValue);
    if (clampedValue !== count) {
      onChange?.(clampedValue, clampedValue - count);
    }
  }, [min, max, count, onChange]);
  const reset = (0, import_react7.useCallback)(() => {
    setCount(initialValue);
    if (initialValue !== count) {
      onChange?.(initialValue, initialValue - count);
    }
  }, [initialValue, count, onChange]);
  return {
    count,
    increment,
    decrement,
    set,
    reset,
    canIncrement: count < max,
    canDecrement: count > min,
    isAtMin: count === min,
    isAtMax: count === max
  };
}

// src/crypto/index.ts
var generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
var generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
};
var hash = async (text) => {
  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return text;
};
var base64Encode = (text) => {
  if (typeof window !== "undefined") {
    return window.btoa(text);
  }
  return Buffer.from(text).toString("base64");
};
var base64Decode = (encoded) => {
  if (typeof window !== "undefined") {
    return window.atob(encoded);
  }
  return Buffer.from(encoded, "base64").toString("utf-8");
};

// src/storage/index.ts
var MemoryStorage = class {
  constructor() {
    __publicField(this, "store", /* @__PURE__ */ new Map());
  }
  async getItem(key) {
    return this.store.get(key) || null;
  }
  async setItem(key, value) {
    this.store.set(key, value);
  }
  async removeItem(key) {
    this.store.delete(key);
  }
  async clear() {
    this.store.clear();
  }
};
var createStorage = (prefix = "rainersoft") => {
  if (typeof window !== "undefined" && window.localStorage) {
    return {
      async getItem(key) {
        return localStorage.getItem(`${prefix}:${key}`);
      },
      async setItem(key, value) {
        localStorage.setItem(`${prefix}:${key}`, value);
      },
      async removeItem(key) {
        localStorage.removeItem(`${prefix}:${key}`);
      },
      async clear() {
        const keys = Object.keys(localStorage).filter((k) => k.startsWith(`${prefix}:`));
        keys.forEach((k) => localStorage.removeItem(k));
      }
    };
  }
  return new MemoryStorage();
};

// src/i18n/index.ts
var currentLocale = DEFAULT_LOCALE;
function setLocale(locale) {
  currentLocale = locale;
}
function getLocale() {
  return currentLocale;
}
function getCurrency(locale) {
  return CURRENCY_MAP[locale || currentLocale];
}
var LOCALE_CONFIG = {
  "pt-BR": {
    locale: "pt-BR",
    currency: "BRL",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm",
    decimalSeparator: ",",
    thousandSeparator: ".",
    firstDayOfWeek: 0
    // Domingo
  },
  "en-US": {
    locale: "en-US",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "hh:mm A",
    decimalSeparator: ".",
    thousandSeparator: ",",
    firstDayOfWeek: 0
    // Domingo
  },
  "es-ES": {
    locale: "es-ES",
    currency: "EUR",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm",
    decimalSeparator: ",",
    thousandSeparator: ".",
    firstDayOfWeek: 1
    // Segunda
  }
};
function getLocaleConfig(locale) {
  return LOCALE_CONFIG[locale || currentLocale];
}
var TRANSLATIONS = {
  "pt-BR": {
    days: ["Domingo", "Segunda", "Ter\xE7a", "Quarta", "Quinta", "Sexta", "S\xE1bado"],
    daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"],
    months: [
      "Janeiro",
      "Fevereiro",
      "Mar\xE7o",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ],
    monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    today: "Hoje",
    yesterday: "Ontem",
    tomorrow: "Amanh\xE3",
    ago: "atr\xE1s",
    in: "em"
  },
  "en-US": {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    yesterday: "Yesterday",
    tomorrow: "Tomorrow",
    ago: "ago",
    in: "in"
  },
  "es-ES": {
    days: ["Domingo", "Lunes", "Martes", "Mi\xE9rcoles", "Jueves", "Viernes", "S\xE1bado"],
    daysShort: ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"],
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ],
    monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    today: "Hoy",
    yesterday: "Ayer",
    tomorrow: "Ma\xF1ana",
    ago: "hace",
    in: "en"
  }
};
function getTranslations(locale) {
  return TRANSLATIONS[locale || currentLocale];
}
function translate(key, locale) {
  const translations = getTranslations(locale);
  return translations[key];
}
function detectBrowserLocale() {
  if (typeof window === "undefined" || !window.navigator) {
    return DEFAULT_LOCALE;
  }
  const browserLang = window.navigator.language;
  if (browserLang.startsWith("pt")) return "pt-BR";
  if (browserLang.startsWith("es")) return "es-ES";
  if (browserLang.startsWith("en")) return "en-US";
  return DEFAULT_LOCALE;
}

// src/formatting/index.ts
var formatCEP = (cep) => {
  cep = cep.replace(/\D/g, "");
  return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
};

// src/string/index.ts
var string_exports = {};
__export(string_exports, {
  capitalize: () => capitalize,
  formatCNPJ: () => formatCNPJ,
  formatCPF: () => formatCPF,
  formatPhone: () => formatPhone,
  getInitials: () => getInitials,
  isCNPJ: () => isCNPJ,
  isCPF: () => isCPF,
  isEmpty: () => isEmpty,
  removeAccents: () => removeAccents,
  textToSlug: () => textToSlug,
  truncate: () => truncate,
  wordCount: () => wordCount
});
function textToSlug(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s-]/g, "").trim().replace(/^-+|-+$/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
function capitalize(text) {
  return text.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function truncate(text, maxLength, suffix = "...") {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}
function removeAccents(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function getInitials(name, maxInitials = 2) {
  return name.split(" ").filter((word) => word.length > 0).map((word) => word[0]).join("").toUpperCase().slice(0, maxInitials);
}
function isEmpty(text) {
  return !text || text.trim().length === 0;
}
function wordCount(text) {
  return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
}
function formatPhone(phone, locale = "pt-BR") {
  const digits = phone.replace(/\D/g, "");
  switch (locale) {
    case "pt-BR":
      if (digits.length === 11) {
        return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      }
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    case "en-US":
      if (digits.length === 10) {
        return digits.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      }
      if (digits.length === 11 && digits.startsWith("1")) {
        return digits.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4");
      }
      return digits;
    case "es-ES":
      if (digits.length === 9) {
        return digits.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "+34 $1 $2 $3 $4");
      }
      return digits;
    default:
      return digits;
  }
}
function formatCPF(cpf) {
  const digits = cpf.replace(/\D/g, "");
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
function formatCNPJ(cnpj) {
  const digits = cnpj.replace(/\D/g, "");
  return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}
function isCPF(cpf) {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) {
    return false;
  }
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits.charAt(i)) * (10 - i);
  }
  let remainder = sum * 10 % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits.charAt(9))) {
    return false;
  }
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits.charAt(i)) * (11 - i);
  }
  remainder = sum * 10 % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits.charAt(10))) {
    return false;
  }
  return true;
}
function isCNPJ(cnpj) {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14 || /^(\d)\1{13}$/.test(digits)) {
    return false;
  }
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits.charAt(i)) * weights1[i];
  }
  let remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;
  if (digit1 !== parseInt(digits.charAt(12))) {
    return false;
  }
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(digits.charAt(i)) * weights2[i];
  }
  remainder = sum % 11;
  const digit2 = remainder < 2 ? 0 : 11 - remainder;
  if (digit2 !== parseInt(digits.charAt(13))) {
    return false;
  }
  return true;
}

// src/number/index.ts
function formatCurrency(value, locale = DEFAULT_LOCALE, options) {
  const currency = CURRENCY_MAP[locale];
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...options
  }).format(value);
}
function formatNumber(value, decimals = 0, locale = DEFAULT_LOCALE) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}
function formatCompact(value, decimals = 1, locale = DEFAULT_LOCALE) {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

// src/i18n/pt-br.ts
var pt_br_exports = {};
__export(pt_br_exports, {
  default: () => pt_br_default,
  formatCompact: () => formatCompact2,
  formatCurrency: () => formatCurrency2,
  formatDate: () => formatDate2,
  formatDateTime: () => formatDateTime2,
  formatNumber: () => formatNumber2,
  formatRelativeDate: () => formatRelativeDate2,
  translateStatus: () => translateStatus2
});
function formatDate2(date, format = "long") {
  return formatDate(date, format, "pt-BR");
}
function formatDateTime2(date) {
  return formatDateTime(date, "pt-BR");
}
function formatRelativeDate2(date) {
  return formatRelativeDate(date, "pt-BR");
}
function formatCurrency2(value, options) {
  return formatCurrency(value, "pt-BR", options);
}
function formatNumber2(value, decimals = 0) {
  return formatNumber(value, decimals, "pt-BR");
}
function formatCompact2(value, decimals = 1) {
  return formatCompact(value, decimals, "pt-BR");
}
function translateStatus2(status) {
  return translateStatus(status, "pt-BR");
}
var pt_br_default = {
  formatDate: formatDate2,
  formatDateTime: formatDateTime2,
  formatRelativeDate: formatRelativeDate2,
  formatCurrency: formatCurrency2,
  formatNumber: formatNumber2,
  formatCompact: formatCompact2,
  translateStatus: translateStatus2
};

// src/index.ts
var textProcessing = string_exports;
var datetime = date_exports;
var authentication = authentication_exports;
var stateManagement = status_exports;
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/

exports.COOKIE_CONSENT_KEY = COOKIE_CONSENT_KEY;
exports.COOKIE_PREFERENCES_KEY = COOKIE_PREFERENCES_KEY;
exports.COOKIE_VERSION = COOKIE_VERSION;
exports.CURRENCY_MAP = CURRENCY_MAP;
exports.CookieManager = CookieManager;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
exports.LOCALE_CONFIG = LOCALE_CONFIG;
exports.MemoryStorage = MemoryStorage;
exports.TRANSLATIONS = TRANSLATIONS;
exports.UserRole = UserRole;
exports.adjustBrightness = adjustBrightness;
exports.adjustHue = adjustHue;
exports.adjustSaturation = adjustSaturation;
exports.authentication = authentication;
exports.base64Decode = base64Decode;
exports.base64Encode = base64Encode;
exports.calculateChange = calculateChange;
exports.calculateMovingAverage = calculateMovingAverage;
exports.convertToWebP = convertToWebP;
exports.copyToClipboard = copyToClipboard;
exports.createError = createError;
exports.createStorage = createStorage;
exports.darken = darken;
exports.datetime = datetime;
exports.detectBrowserLocale = detectBrowserLocale;
exports.downloadFile = downloadFile;
exports.findMinMax = findMinMax;
exports.formatCEP = formatCEP;
exports.formatCNPJ = formatCNPJ;
exports.formatCPF = formatCPF;
exports.formatCompactNumber = formatCompactNumber;
exports.formatCurrency = formatCurrency;
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
exports.formatError = formatError;
exports.formatPercentage = formatPercentage;
exports.formatPhone = formatPhone;
exports.formatRelativeDate = formatRelativeDate;
exports.fuzzySearch = fuzzySearch;
exports.generateId = generateId;
exports.generateMockChartData = generateMockChartData;
exports.generatePlaceholder = generatePlaceholder;
exports.generateUUID = generateUUID;
exports.getAnalogousPalette = getAnalogousPalette;
exports.getComplementary = getComplementary;
exports.getCookieManager = getCookieManager;
exports.getCookiePreferences = getCookiePreferences;
exports.getCurrency = getCurrency;
exports.getElementPosition = getElementPosition;
exports.getImageInfo = getImageInfo;
exports.getInitials = getInitials;
exports.getLocale = getLocale;
exports.getLocaleConfig = getLocaleConfig;
exports.getRefreshToken = getRefreshToken;
exports.getStatusColor = getStatusColor;
exports.getStatusVariant = getStatusVariant;
exports.getToken = getToken;
exports.getTokens = getTokens;
exports.getTranslations = getTranslations;
exports.groupDataByPeriod = groupDataByPeriod;
exports.hasCookieConsent = hasCookieConsent;
exports.hasToken = hasToken;
exports.hash = hash;
exports.hexToHsl = hexToHsl;
exports.hexToRgb = hexToRgb;
exports.hexToRgba = hexToRgba;
exports.hslToHex = hslToHex;
exports.isAcceptedFormat = isAcceptedFormat;
exports.isCNPJ = isCNPJ;
exports.isCPF = isCPF;
exports.isCookieAllowed = isCookieAllowed;
exports.isDarkMode = isDarkMode;
exports.isElementVisible = isElementVisible;
exports.isError = isError;
exports.isMobile = isMobile;
exports.isValidDate = isValidDate;
exports.isWebP = isWebP;
exports.lighten = lighten;
exports.onDarkModeChange = onDarkModeChange;
exports.onReducedMotionChange = onReducedMotionChange;
exports.prefersReducedMotion = prefersReducedMotion;
exports.prepareImageForUpload = prepareImageForUpload;
exports.ptBR = pt_br_exports;
exports.removeToken = removeToken;
exports.resizeImage = resizeImage;
exports.rgbToHex = rgbToHex;
exports.saveCookieConsent = saveCookieConsent;
exports.scrollToElement = scrollToElement;
exports.scrollToPosition = scrollToPosition;
exports.scrollToTop = scrollToTop;
exports.searchContent = searchContent;
exports.searchWithScore = searchWithScore;
exports.setLocale = setLocale;
exports.setRefreshToken = setRefreshToken;
exports.setToken = setToken;
exports.setTokens = setTokens;
exports.smoothScrollTo = smoothScrollTo;
exports.stateManagement = stateManagement;
exports.supportsWebP = supportsWebP;
exports.textProcessing = textProcessing;
exports.textToSlug = textToSlug;
exports.toISOString = toISOString;
exports.translate = translate;
exports.translatePostStatus = translatePostStatus;
exports.translateStatus = translateStatus;
exports.truncate = truncate;
exports.useAuth = useAuth;
exports.useCounter = useCounter;
exports.useCurrentUser = useCurrentUser;
exports.useHasRole = useHasRole;
exports.useIntersectionObserver = useIntersectionObserver;
exports.useIsAdmin = useIsAdmin;
exports.useIsAuthenticated = useIsAuthenticated;
exports.useIsMobile = useIsMobile;
exports.usePasswordStrength = usePasswordStrength;
exports.useScrollPosition = useScrollPosition;
exports.useSmoothScroll = useSmoothScroll;
exports.useToggleState = useToggleState;
exports.validateEmail = validateEmailSimple;
exports.validateEmailSimple = validateEmailSimple;
exports.validateMessage = validateMessage;
exports.validatePassword = validatePassword;
exports.validatePhone = validatePhone;
exports.validateSlug = validateSlug;
exports.validateText = validateText;
exports.validateUrl = validateUrl;
exports.validateUsername = validateUsername;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map