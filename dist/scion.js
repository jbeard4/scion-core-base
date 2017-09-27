(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.scion = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* begin ArraySet */

/** @constructor */
function ArraySet(l) {
    l = l || [];
    this.o = new Set(l);
}

ArraySet.prototype = {

    add: function add(x) {
        this.o.add(x);
    },

    remove: function remove(x) {
        return this.o.delete(x);
    },

    union: function union(l) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = l.o[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var v = _step.value;

                this.o.add(v);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return this;
    },

    difference: function difference(l) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = l.o[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var v = _step2.value;

                this.o.delete(v);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return this;
    },

    contains: function contains(x) {
        return this.o.has(x);
    },

    iter: function iter() {
        return Array.from(this.o);
    },

    isEmpty: function isEmpty() {
        return !this.o.size;
    },

    size: function size() {
        return this.o.size;
    },

    equals: function equals(s2) {
        if (this.o.size !== s2.size()) {
            return false;
        }

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = this.o[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var v = _step3.value;

                if (!s2.contains(v)) {
                    return false;
                }
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return true;
    },

    toString: function toString() {
        return this.o.size === 0 ? '<empty>' : Array.from(this.o).join(',\n');
    }
};

module.exports = ArraySet;

},{}],2:[function(require,module,exports){
'use strict';

var STATE_TYPES = {
    BASIC: 0,
    COMPOSITE: 1,
    PARALLEL: 2,
    HISTORY: 3,
    INITIAL: 4,
    FINAL: 5
};

var SCXML_IOPROCESSOR_TYPE = 'http://www.w3.org/TR/scxml/#SCXMLEventProcessor';
var HTTP_IOPROCESSOR_TYPE = 'http://www.w3.org/TR/scxml/#BasicHTTPEventProcessor';
var RX_TRAILING_WILDCARD = /\.\*$/;

module.exports = {
    STATE_TYPES: STATE_TYPES,
    SCXML_IOPROCESSOR_TYPE: SCXML_IOPROCESSOR_TYPE,
    HTTP_IOPROCESSOR_TYPE: HTTP_IOPROCESSOR_TYPE,
    RX_TRAILING_WILDCARD: RX_TRAILING_WILDCARD
};

},{}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var constants = require('./constants'),
    STATE_TYPES = constants.STATE_TYPES,
    RX_TRAILING_WILDCARD = constants.RX_TRAILING_WILDCARD;

var printTrace = false;

module.exports = {
    extend: extend,
    transitionWithTargets: transitionWithTargets,
    transitionComparator: transitionComparator,
    initializeModel: initializeModel,
    isEventPrefixMatch: isEventPrefixMatch,
    isTransitionMatch: isTransitionMatch,
    scxmlPrefixTransitionSelector: scxmlPrefixTransitionSelector,
    eventlessTransitionSelector: eventlessTransitionSelector,
    getTransitionWithHigherSourceChildPriority: getTransitionWithHigherSourceChildPriority,
    sortInEntryOrder: sortInEntryOrder,
    getStateWithHigherSourceChildPriority: getStateWithHigherSourceChildPriority,
    initializeModelGeneratorFn: initializeModelGeneratorFn,
    deserializeSerializedConfiguration: deserializeSerializedConfiguration,
    deserializeHistory: deserializeHistory
};

function extend(to, from) {
    Object.keys(from).forEach(function (k) {
        to[k] = from[k];
    });
    return to;
};

function transitionWithTargets(t) {
    return t.targets;
}

function transitionComparator(t1, t2) {
    return t1.documentOrder - t2.documentOrder;
}

function initializeModel(rootState) {
    var transitions = [],
        idToStateMap = new Map(),
        documentOrder = 0;

    //TODO: need to add fake ids to anyone that doesn't have them
    //FIXME: make this safer - break into multiple passes
    var idCount = {};

    function generateId(type) {
        if (idCount[type] === undefined) idCount[type] = 0;

        do {
            var count = idCount[type]++;
            var id = '$generated-' + type + '-' + count;
        } while (idToStateMap.has(id));

        return id;
    }

    function wrapInFakeRootState(state) {
        return {
            $deserializeDatamodel: state.$deserializeDatamodel || function () {},
            $serializeDatamodel: state.$serializeDatamodel || function () {
                return null;
            },
            $idToStateMap: idToStateMap, //keep this for handy deserialization of serialized configuration
            docUrl: state.docUrl,
            states: [{
                $type: 'initial',
                transitions: [{
                    target: state
                }]
            }, state]
        };
    }

    var statesWithInitialAttributes = [];

    /**
      @this {SCTransition}
    */
    function transitionToString(sourceState) {
        return sourceState + ' -- ' + (this.events ? '(' + this.events.join(',') + ')' : null) + (this.cond ? '[' + this.cond.name + ']' : '') + ' --> ' + (this.targets ? this.targets.join(',') : null);
    }

    /**
      @this {SCState}
    */
    function stateToString() {
        return this.id;
    }

    function populateStateIdMap(state) {
        //populate state id map
        if (state.id) {
            idToStateMap.set(state.id, state);
        }

        if (state.states) {
            for (var j = 0, len = state.states.length; j < len; j++) {
                populateStateIdMap(state.states[j]);
            }
        }
    }

    function traverse(ancestors, state) {

        if (printTrace) state.toString = stateToString;

        //add to global transition and state id caches
        if (state.transitions) transitions.push.apply(transitions, state.transitions);

        //create a default type, just to normalize things
        //this way we can check for unsupported types below
        state.$type = state.$type || 'state';

        //add ancestors and depth properties
        state.ancestors = ancestors;
        state.depth = ancestors.length;
        state.parent = ancestors[0];
        state.documentOrder = documentOrder++;

        //add some information to transitions
        state.transitions = state.transitions || [];
        for (var j = 0, len = state.transitions.length; j < len; j++) {
            var transition = state.transitions[j];
            transition.documentOrder = documentOrder++;
            transition.source = state;
            if (printTrace) transition.toString = transitionToString.bind(transition, state);
        };

        //recursive step
        if (state.states) {
            var ancs = [state].concat(ancestors);
            for (var j = 0, len = state.states.length; j < len; j++) {
                traverse(ancs, state.states[j]);
            }
        }

        //setup fast state type
        switch (state.$type) {
            case 'parallel':
                state.typeEnum = STATE_TYPES.PARALLEL;
                state.isAtomic = false;
                break;
            case 'initial':
                state.typeEnum = STATE_TYPES.INITIAL;
                state.isAtomic = true;
                break;
            case 'history':
                state.typeEnum = STATE_TYPES.HISTORY;
                state.isAtomic = true;
                break;
            case 'final':
                state.typeEnum = STATE_TYPES.FINAL;
                state.isAtomic = true;
                break;
            case 'state':
            case 'scxml':
                if (state.states && state.states.length) {
                    state.typeEnum = STATE_TYPES.COMPOSITE;
                    state.isAtomic = false;
                } else {
                    state.typeEnum = STATE_TYPES.BASIC;
                    state.isAtomic = true;
                }
                break;
            default:
                throw new Error('Unknown state type: ' + state.$type);
        }

        //descendants property on states will now be populated. add descendants to this state
        if (state.states) {
            state.descendants = state.states.concat(state.states.map(function (s) {
                return s.descendants;
            }).reduce(function (a, b) {
                return a.concat(b);
            }, []));
        } else {
            state.descendants = [];
        }

        var initialChildren;
        if (state.typeEnum === STATE_TYPES.COMPOSITE) {
            //set up initial state

            if (Array.isArray(state.initial) || typeof state.initial === 'string') {
                statesWithInitialAttributes.push(state);
            } else {
                //take the first child that has initial type, or first child
                initialChildren = state.states.filter(function (child) {
                    return child.$type === 'initial';
                });

                state.initialRef = [initialChildren.length ? initialChildren[0] : state.states[0]];
                checkInitialRef(state);
            }
        }

        //hook up history
        if (state.typeEnum === STATE_TYPES.COMPOSITE || state.typeEnum === STATE_TYPES.PARALLEL) {

            var historyChildren = state.states.filter(function (s) {
                return s.$type === 'history';
            });

            state.historyRef = historyChildren;
        }

        //now it's safe to fill in fake state ids
        if (!state.id) {
            state.id = generateId(state.$type);
            idToStateMap.set(state.id, state);
        }

        //normalize onEntry/onExit, which can be single fn or array, or array of arrays (blocks)
        ['onEntry', 'onExit'].forEach(function (prop) {
            if (state[prop]) {
                if (!Array.isArray(state[prop])) {
                    state[prop] = [state[prop]];
                }
                if (!state[prop].every(function (handler) {
                    return Array.isArray(handler);
                })) {
                    state[prop] = [state[prop]];
                }
            }
        });

        if (state.invokes && !Array.isArray(state.invokes)) {
            state.invokes = [state.invokes];
            state.invokes.forEach(function (invoke) {
                if (invoke.finalize && !Array.isArray(invoke.finalize)) {
                    invoke.finalize = [invoke.finalize];
                }
            });
        }
    }

    //TODO: convert events to regular expressions in advance

    function checkInitialRef(state) {
        if (!state.initialRef) throw new Error('Unable to locate initial state for composite state: ' + state.id);
    }
    function connectIntialAttributes() {
        for (var j = 0, len = statesWithInitialAttributes.length; j < len; j++) {
            var s = statesWithInitialAttributes[j];

            var initialStates = Array.isArray(s.initial) ? s.initial : [s.initial];
            s.initialRef = initialStates.map(function (initialState) {
                return idToStateMap.get(initialState);
            });
            checkInitialRef(s);
        }
    }

    var RX_WHITESPACE = /\s+/;

    function connectTransitionGraph() {
        //normalize as with onEntry/onExit
        for (var i = 0, len = transitions.length; i < len; i++) {
            var t = transitions[i];
            if (t.onTransition && !Array.isArray(t.onTransition)) {
                t.onTransition = [t.onTransition];
            }

            //normalize "event" attribute into "events" attribute
            if (typeof t.event === 'string') {
                t.events = t.event.trim().split(RX_WHITESPACE);
            }
            delete t.event;

            if (t.targets || typeof t.target === 'undefined') {
                //targets have already been set up
                continue;
            }

            if (typeof t.target === 'string') {
                var target = idToStateMap.get(t.target);
                if (!target) throw new Error('Unable to find target state with id ' + t.target);
                t.target = target;
                t.targets = [t.target];
            } else if (Array.isArray(t.target)) {
                t.targets = t.target.map(function (target) {
                    if (typeof target === 'string') {
                        target = idToStateMap.get(target);
                        if (!target) throw new Error('Unable to find target state with id ' + t.target);
                        return target;
                    } else {
                        return target;
                    }
                });
            } else if (_typeof(t.target) === 'object') {
                t.targets = [t.target];
            } else {
                throw new Error('Transition target has unknown type: ' + t.target);
            }
        }

        //hook up LCA - optimization
        for (var i = 0, len = transitions.length; i < len; i++) {
            var t = transitions[i];
            if (t.targets) t.lcca = getLCCA(t.source, t.targets[0]); //FIXME: we technically do not need to hang onto the lcca. only the scope is used by the algorithm

            t.scope = getScope(t);
        }
    }

    function getScope(transition) {
        //Transition scope is normally the least common compound ancestor (lcca).
        //Internal transitions have a scope equal to the source state.
        var transitionIsReallyInternal = transition.type === 'internal' && transition.source.typeEnum === STATE_TYPES.COMPOSITE && //is transition source a composite state
        transition.source.parent && //root state won't have parent
        transition.targets && //does it target its descendants
        transition.targets.every(function (target) {
            return transition.source.descendants.indexOf(target) > -1;
        });

        if (!transition.targets) {
            return null;
        } else if (transitionIsReallyInternal) {
            return transition.source;
        } else {
            return transition.lcca;
        }
    }

    function getLCCA(s1, s2) {
        var commonAncestors = [];
        for (var j = 0, len = s1.ancestors.length; j < len; j++) {
            var anc = s1.ancestors[j];
            if ((anc.typeEnum === STATE_TYPES.COMPOSITE || anc.typeEnum === STATE_TYPES.PARALLEL) && anc.descendants.indexOf(s2) > -1) {
                commonAncestors.push(anc);
            }
        };
        if (!commonAncestors.length) throw new Error("Could not find LCA for states.");
        return commonAncestors[0];
    }

    //main execution starts here
    //FIXME: only wrap in root state if it's not a compound state
    populateStateIdMap(rootState);
    var fakeRootState = wrapInFakeRootState(rootState); //I wish we had pointer semantics and could make this a C-style "out argument". Instead we return him
    traverse([], fakeRootState);
    connectTransitionGraph();
    connectIntialAttributes();

    return fakeRootState;
}

function isEventPrefixMatch(prefix, fullName) {
    prefix = prefix.replace(RX_TRAILING_WILDCARD, '');

    if (prefix === fullName) {
        return true;
    }

    if (prefix.length > fullName.length) {
        return false;
    }

    if (fullName.charAt(prefix.length) !== '.') {
        return false;
    }

    return fullName.indexOf(prefix) === 0;
}

function isTransitionMatch(t, eventName) {
    return t.events.some(function (tEvent) {
        return tEvent === '*' || isEventPrefixMatch(tEvent, eventName);
    });
}

function scxmlPrefixTransitionSelector(t, event, evaluator, selectEventlessTransitions) {
    return (selectEventlessTransitions ? !t.events : t.events && event && event.name && isTransitionMatch(t, event.name)) && (!t.cond || evaluator(t.cond));
}

function eventlessTransitionSelector(state) {
    return state.transitions.filter(function (transition) {
        return !transition.events || transition.events && transition.events.length === 0;
    });
}

//priority comparison functions
function getTransitionWithHigherSourceChildPriority(_args) {
    var t1 = _args[0],
        t2 = _args[1];
    var r = getStateWithHigherSourceChildPriority(t1.source, t2.source);
    //compare transitions based first on depth, then based on document order
    if (t1.source.depth < t2.source.depth) {
        return t2;
    } else if (t2.source.depth < t1.source.depth) {
        return t1;
    } else {
        if (t1.documentOrder < t2.documentOrder) {
            return t1;
        } else {
            return t2;
        }
    }
}

function sortInEntryOrder(s1, s2) {
    return getStateWithHigherSourceChildPriority(s1, s2) * -1;
}

function getStateWithHigherSourceChildPriority(s1, s2) {
    //compare states based first on depth, then based on document order
    if (s1.depth > s2.depth) {
        return -1;
    } else if (s1.depth < s2.depth) {
        return 1;
    } else {
        //Equality
        if (s1.documentOrder < s2.documentOrder) {
            return 1;
        } else if (s1.documentOrder > s2.documentOrder) {
            return -1;
        } else {
            return 0;
        }
    }
}

function initializeModelGeneratorFn(modelFn, opts, interpreter) {
    return modelFn.call(interpreter, opts._x, opts._x._sessionid, opts._x._ioprocessors, interpreter.isIn.bind(interpreter));
}

function deserializeSerializedConfiguration(serializedConfiguration, idToStateMap) {
    return serializedConfiguration.map(function (id) {
        var state = idToStateMap.get(id);
        if (!state) throw new Error('Error loading serialized configuration. Unable to locate state with id ' + id);
        return state;
    });
}

function deserializeHistory(serializedHistory, idToStateMap) {
    var o = {};
    Object.keys(serializedHistory).forEach(function (sid) {
        o[sid] = serializedHistory[sid].map(function (id) {
            var state = idToStateMap.get(id);
            if (!state) throw new Error('Error loading serialized history. Unable to locate state with id ' + id);
            return state;
        });
    });
    return o;
}

},{"./constants":2}],4:[function(require,module,exports){
"use strict";

//model accessor functions
var query = {
    isDescendant: function isDescendant(s1, s2) {
        //Returns 'true' if state1 is a descendant of state2 (a child, or a child of a child, or a child of a child of a child, etc.) Otherwise returns 'false'.
        return s2.descendants.indexOf(s1) > -1;
    },
    getAncestors: function getAncestors(s, root) {
        var ancestors, index, state;
        index = s.ancestors.indexOf(root);
        if (index > -1) {
            return s.ancestors.slice(0, index);
        } else {
            return s.ancestors;
        }
    },
    getAncestorsOrSelf: function getAncestorsOrSelf(s, root) {
        return [s].concat(query.getAncestors(s, root));
    },
    getDescendantsOrSelf: function getDescendantsOrSelf(s) {
        return [s].concat(s.descendants);
    }
};

module.exports = query;

},{}],5:[function(require,module,exports){
(function (process){
//   Copyright 2012-2012 Jacob Beard, INFICON, and other SCION contributors
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

/**
 * SCION-CORE global object
 * @namespace scion
 */

/**
 * @typedef {function} FnModel
 */

/**
 * An Array of strings representing the ids all of the basic states the
 * interpreter is in after a big-step completes.
 * @typedef {Array<string>} Configuration
 */

/**
 * A set of basic and composite state ids.
 * @typedef {Array<string>} FullConfiguration
 */

/**
 * A set of basic and composite state ids.
 * @typedef {Array<string>} FullConfiguration
 */

"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var EventEmitter = require('tiny-events').EventEmitter,
    util = require('util'),
    ArraySet = require('./ArraySet'),
    constants = require('./constants'),
    helpers = require('./helpers'),
    query = require('./query'),
    extend = helpers.extend,
    transitionWithTargets = helpers.transitionWithTargets,
    transitionComparator = helpers.transitionComparator,
    initializeModel = helpers.initializeModel,
    isEventPrefixMatch = helpers.isEventPrefixMatch,
    isTransitionMatch = helpers.isTransitionMatch,
    scxmlPrefixTransitionSelector = helpers.scxmlPrefixTransitionSelector,
    eventlessTransitionSelector = helpers.eventlessTransitionSelector,
    getTransitionWithHigherSourceChildPriority = helpers.getTransitionWithHigherSourceChildPriority,
    sortInEntryOrder = helpers.sortInEntryOrder,
    getStateWithHigherSourceChildPriority = helpers.getStateWithHigherSourceChildPriority,
    initializeModelGeneratorFn = helpers.initializeModelGeneratorFn,
    deserializeSerializedConfiguration = helpers.deserializeSerializedConfiguration,
    deserializeHistory = helpers.deserializeHistory,
    BASIC = constants.STATE_TYPES.BASIC,
    COMPOSITE = constants.STATE_TYPES.COMPOSITE,
    PARALLEL = constants.STATE_TYPES.PARALLEL,
    HISTORY = constants.STATE_TYPES.HISTORY,
    INITIAL = constants.STATE_TYPES.INITIAL,
    FINAL = constants.STATE_TYPES.FINAL,
    SCXML_IOPROCESSOR_TYPE = constants.SCXML_IOPROCESSOR_TYPE;

var printTrace = typeof process !== 'undefined' && !!process.env.DEBUG;

BaseInterpreter.EVENTS = ['onEntry', 'onExit', 'onTransition', 'onDefaultEntry', 'onError', 'onBigStepBegin', 'onBigStepEnd', 'onBigStepSuspend', 'onBigStepResume', 'onSmallStepBegin', 'onSmallStepEnd', 'onBigStepEnd', 'onExitInterpreter'];

/** 
 * @description The SCXML constructor creates an interpreter instance from a model object.
 * @abstract
 * @class BaseInterpreter
 * @memberof scion
 * @extends EventEmitter
 * @param {FnModel} modelOrFnGenerator
 * @param opts
 * @param {string} [opts.sessionid] Used to populate SCXML _sessionid.
 * @param {function} [opts.generateSessionid] Factory used to generate sessionid if sessionid keyword is not specified
 * @param {Map<string, BaseInterpreter>} [opts.sessionRegistry] Map used to map sessionid strings to Statechart instances.
 * @param [opts.Set] Class to use as an ArraySet. Defaults to ES6 Set.
 * @param {object} [opts.params]  Used to pass params from invoke. Sets the datamodel when interpreter is instantiated.
 * @param {Snapshot} [opts.snapshot] State machine snapshot. Used to restore a serialized state machine.
 * @param {Statechart} [opts.parentSession]  Used to pass parent session during invoke.
 * @param {string }[opts.invokeid]  Support for id of invoke element at runtime.
 * @param [opts.console]
 * @param [opts.transitionSelector]
 * @param [opts.customCancel]
 * @param [opts.customSend]
 * @param [opts.sendAsync]
 * @param [opts.doSend]
 * @param [opts.invokers]
 * @param [opts.xmlParser]
 * @param [opts.interpreterScriptingContext]
 */
function BaseInterpreter(modelOrFnGenerator, opts) {

    EventEmitter.call(this);

    this._scriptingContext = opts.interpreterScriptingContext || (opts.InterpreterScriptingContext ? new opts.InterpreterScriptingContext(this) : {});

    this.opts = opts || {};

    this.opts.generateSessionid = this.opts.generateSessionid || BaseInterpreter.generateSessionid;
    this.opts.sessionid = this.opts.sessionid || this.opts.generateSessionid();
    this.opts.sessionRegistry = this.opts.sessionRegistry || BaseInterpreter.sessionRegistry; //TODO: define a better interface. For now, assume a Map<sessionid, session>


    var _ioprocessors = {};
    _ioprocessors[SCXML_IOPROCESSOR_TYPE] = {
        location: '#_scxml_' + this.opts.sessionid
    };
    _ioprocessors.scxml = _ioprocessors[SCXML_IOPROCESSOR_TYPE]; //alias

    //SCXML system variables:
    opts._x = {
        _sessionid: opts.sessionid,
        _ioprocessors: _ioprocessors
    };

    var model;
    if (typeof modelOrFnGenerator === 'function') {
        model = initializeModelGeneratorFn(modelOrFnGenerator, opts, this);
    } else if ((typeof modelOrFnGenerator === 'undefined' ? 'undefined' : _typeof(modelOrFnGenerator)) === 'object') {
        model = JSON.parse(JSON.stringify(modelOrFnGenerator)); //assume object
    } else {
        throw new Error('Unexpected model type. Expected model factory function, or scjson object.');
    }

    this._model = initializeModel(model);

    this.opts.console = opts.console || (typeof console === 'undefined' ? { log: function log() {} } : console); //rely on global console if this console is undefined
    this.opts.Set = this.opts.Set || ArraySet;
    this.opts.transitionSelector = this.opts.transitionSelector || scxmlPrefixTransitionSelector;

    this.opts.sessionRegistry.set(String(this.opts.sessionid), this);

    this._scriptingContext.log = this._scriptingContext.log || function log() {
        if (this.opts.console.log.apply) {
            this.opts.console.log.apply(this.opts.console, arguments);
        } else {
            //console.log on older IE does not support Function.apply, so just pass him the first argument. Best we can do for now.
            this.opts.console.log(Array.prototype.slice.apply(arguments).join(','));
        }
    }.bind(this); //set up default scripting context log function

    this._externalEventQueue = [];
    this._internalEventQueue = [];

    if (opts.params) {
        this._model.$deserializeDatamodel(opts.params); //load up the datamodel
    }

    //check if we're loading from a previous snapshot
    if (opts.snapshot) {
        this._configuration = new this.opts.Set(deserializeSerializedConfiguration(opts.snapshot[0], this._model.$idToStateMap));
        this._historyValue = deserializeHistory(opts.snapshot[1], this._model.$idToStateMap);
        this._isInFinalState = opts.snapshot[2];
        this._model.$deserializeDatamodel(opts.snapshot[3]); //load up the datamodel
        this._internalEventQueue = opts.snapshot[4];
    } else {
        this._configuration = new this.opts.Set();
        this._historyValue = {};
        this._isInFinalState = false;
    }

    //add debug logging
    BaseInterpreter.EVENTS.forEach(function (event) {
        this.on(event, this._log.bind(this, event));
    }, this);
}

//some global singletons to use to generate in-memory session ids, in case the user does not specify these data structures
BaseInterpreter.sessionIdCounter = 1;
BaseInterpreter.generateSessionid = function () {
    return BaseInterpreter.sessionIdCounter++;
};
BaseInterpreter.sessionRegistry = new Map();

/**
 * @interface EventEmitter
 */

/**
* @event BaseInterpreter#onError
* @property {string} tagname The name of the element that produced the error. 
* @property {number} line The line in the source file in which the error occurred.
* @property {number} column The column in the source file in which the error occurred.
* @property {string} reason An informative error message. The text is platform-specific and subject to change.
*/

/**
 * @function
 * @name EventEmitter.prototype#on
 * @param {string} type
 * @param {callback} listener
 */

/**
 * @function
 * @name EventEmitter.prototype#once
 * @param {string} type
 * @param {callback} listener
 */

/**
 * @function
 * @name EventEmitter.prototype#off
 * @param {string} type
 * @param {callback} listener
 */

/**
 * @function
 * @name EventEmitter.prototype#emit
 * @param {string} type
 * @param {any} args
 */

BaseInterpreter.prototype = extend(beget(EventEmitter.prototype), {

    /** 
    * Cancels the session. This clears all timers; puts the interpreter in a
    * final state; and runs all exit actions on current states.
    * @memberof BaseInterpreter.prototype
    */
    cancel: function cancel() {
        delete this.opts.parentSession;
        if (this._isInFinalState) return;
        this._isInFinalState = true;
        this._log('session cancelled ' + this.opts.invokeid);
        this._exitInterpreter(null);
    },

    _exitInterpreter: function _exitInterpreter(event) {
        var _this = this;

        //TODO: cancel invoked sessions
        //cancel all delayed sends when we enter into a final state.
        this._cancelAllDelayedSends();

        var statesToExit = this._getFullConfiguration().sort(getStateWithHigherSourceChildPriority);

        for (var j = 0, len = statesToExit.length; j < len; j++) {
            var stateExited = statesToExit[j];

            if (stateExited.onExit !== undefined) {
                for (var exitIdx = 0, exitLen = stateExited.onExit.length; exitIdx < exitLen; exitIdx++) {
                    var block = stateExited.onExit[exitIdx];
                    for (var blockIdx = 0, blockLen = block.length; blockIdx < blockLen; blockIdx++) {
                        var actionRef = block[blockIdx];
                        try {
                            actionRef.call(this._scriptingContext, null);
                        } catch (e) {
                            this._handleError(e, actionRef);
                            break;
                        }
                    }
                }
            }

            //cancel invoked session
            if (stateExited.invokes) stateExited.invokes.forEach(function (invoke) {
                _this._scriptingContext.cancelInvoke(invoke.id);
            });

            //if he is a top-level <final> state, then return the done event
            if (stateExited.$type === 'final' && stateExited.parent.$type === 'scxml') {

                if (this.opts.parentSession) {
                    this._scriptingContext.send({
                        target: '#_parent',
                        name: 'done.invoke.' + this.opts.invokeid,
                        data: stateExited.donedata && stateExited.donedata.call(this._scriptingContext, event)
                    });
                }

                this.opts.sessionRegistry.delete(this.opts.sessionid);
                this.emit('onExitInterpreter', event);
            }
        }
    },

    /** 
     * Starts the interpreter. Should only be called once, and should be called
     * before Statechart.prototype#gen is called for the first time.  Returns a
     * Configuration.
     * @return {Configuration}
     * @memberof BaseInterpreter.prototype
     * @emits BaseInterpreter#onEntry
     * @emits BaseInterpreter#onExit
     * @emits BaseInterpreter#onTransition
     * @emits BaseInterpreter#onDefaultEntry
     * @emits BaseInterpreter#onError
     * @emits BaseInterpreter#onBigStepBegin
     * @emits BaseInterpreter#onBigStepEnd
     * @emits BaseInterpreter#onBigStepSuspend
     * @emits BaseInterpreter#onBigStepResume
     * @emits BaseInterpreter#onSmallStepBegin
     * @emits BaseInterpreter#onSmallStepEnd
     * @emits BaseInterpreter#onBigStepEnd
     * @emits BaseInterpreter#onExitInterpreter
     */
    start: function start() {
        this._initStart();
        this._performBigStep();
        return this.getConfiguration();
    },

    /**
     * This callback is displayed as a global member.
     * @callback genCallback
     * @param {Error} err
     * @param {Configuration} configuration
     */

    /**
     * Starts the interpreter asynchronously
     * @param  {genCallback} cb Callback invoked with an error or the interpreter's stable configuration
     * @memberof BaseInterpreter.prototype 
     * @emits BaseInterpreter#onEntry
     * @emits BaseInterpreter#onExit
     * @emits BaseInterpreter#onTransition
     * @emits BaseInterpreter#onDefaultEntry
     * @emits BaseInterpreter#onError
     * @emits BaseInterpreter#onBigStepBegin
     * @emits BaseInterpreter#onBigStepEnd
     * @emits BaseInterpreter#onBigStepSuspend
     * @emits BaseInterpreter#onBigStepResume
     * @emits BaseInterpreter#onSmallStepBegin
     * @emits BaseInterpreter#onSmallStepEnd
     * @emits BaseInterpreter#onBigStepEnd
     * @emits BaseInterpreter#onExitInterpreter
     */
    startAsync: function startAsync(cb) {
        cb = this._initStart(cb);
        this.genAsync(null, cb);
    },

    _initStart: function _initStart(cb) {
        var _this2 = this;

        if (typeof cb !== 'function') {
            cb = nop;
        }

        this._log("performing initial big step");

        //We effectively need to figure out states to enter here to populate initial config. assuming root is compound state makes this simple.
        //but if we want it to be parallel, then this becomes more complex. so when initializing the model, we add a 'fake' root state, which
        //makes the following operation safe.
        this._model.initialRef.forEach(function (s) {
            return _this2._configuration.add(s);
        });

        return cb;
    },

    /** 
    * Returns state machine {@link Configuration}.
    * @return {Configuration}
    * @memberof BaseInterpreter.prototype 
    */
    getConfiguration: function getConfiguration() {
        return this._configuration.iter().map(function (s) {
            return s.id;
        });
    },

    _getFullConfiguration: function _getFullConfiguration() {
        return this._configuration.iter().map(function (s) {
            return [s].concat(query.getAncestors(s));
        }, this).reduce(function (a, b) {
            return a.concat(b);
        }, []). //flatten
        reduce(function (a, b) {
            return a.indexOf(b) > -1 ? a : a.concat(b);
        }, []); //uniq
    },

    /** 
    * @return {FullConfiguration}
    * @memberof BaseInterpreter.prototype 
    */
    getFullConfiguration: function getFullConfiguration() {
        return this._getFullConfiguration().map(function (s) {
            return s.id;
        });
    },

    /** 
    * @return {boolean}
    * @memberof BaseInterpreter.prototype 
    * @param {string} stateName
    */
    isIn: function isIn(stateName) {
        return this.getFullConfiguration().indexOf(stateName) > -1;
    },

    /** 
    * Is the state machine in a final state?
    * @return {boolean}
    * @memberof BaseInterpreter.prototype 
    */
    isFinal: function isFinal() {
        return this._isInFinalState;
    },

    /** @private */
    _performBigStep: function _performBigStep(e) {
        var currentEvent = void 0,
            keepGoing = void 0,
            allStatesExited = void 0,
            allStatesEntered = void 0;

        var _startBigStep = this._startBigStep(e);

        var _startBigStep2 = _slicedToArray(_startBigStep, 4);

        allStatesExited = _startBigStep2[0];
        allStatesEntered = _startBigStep2[1];
        keepGoing = _startBigStep2[2];
        currentEvent = _startBigStep2[3];


        while (keepGoing) {
            var _selectTransitionsAnd = this._selectTransitionsAndPerformSmallStep(currentEvent, allStatesEntered, allStatesExited);

            var _selectTransitionsAnd2 = _slicedToArray(_selectTransitionsAnd, 2);

            currentEvent = _selectTransitionsAnd2[0];
            keepGoing = _selectTransitionsAnd2[1];
        }

        this._finishBigStep(currentEvent, allStatesEntered, allStatesExited);
    },

    _selectTransitionsAndPerformSmallStep: function _selectTransitionsAndPerformSmallStep(currentEvent, allStatesEntered, allStatesExited) {
        //first select with null event
        var selectedTransitions = this._selectTransitions(currentEvent, true);
        if (selectedTransitions.isEmpty()) {
            var ev = this._internalEventQueue.shift();
            if (ev) {
                currentEvent = ev;
                selectedTransitions = this._selectTransitions(currentEvent, false);
            }
        }

        if (!selectedTransitions.isEmpty()) {
            this.emit('onSmallStepBegin', currentEvent);
            var statesExited = void 0,
                statesEntered = void 0;

            var _performSmallStep = this._performSmallStep(currentEvent, selectedTransitions);

            var _performSmallStep2 = _slicedToArray(_performSmallStep, 2);

            statesExited = _performSmallStep2[0];
            statesEntered = _performSmallStep2[1];

            if (statesExited) statesExited.forEach(function (s) {
                return allStatesExited.add(s);
            });
            if (statesEntered) statesEntered.forEach(function (s) {
                return allStatesEntered.add(s);
            });
            this.emit('onSmallStepEnd', currentEvent);
        }
        var keepGoing = !selectedTransitions.isEmpty() || this._internalEventQueue.length;
        return [currentEvent, keepGoing];
    },

    _startBigStep: function _startBigStep(e) {
        var _this3 = this;

        this.emit('onBigStepBegin', e);

        //do applyFinalize and autoforward
        this._configuration.iter().forEach(function (state) {
            if (state.invokes) state.invokes.forEach(function (invoke) {
                if (invoke.autoforward) {
                    //autoforward
                    _this3._scriptingContext.send({
                        target: '#_' + invoke.id,
                        name: e.name,
                        data: e.data
                    });
                }
                if (invoke.id === e.invokeid) {
                    //applyFinalize
                    if (invoke.finalize) invoke.finalize.forEach(function (action) {
                        return _this3._evaluateAction(e, action);
                    });
                }
            });
        });

        if (e) this._internalEventQueue.push(e);

        var allStatesExited = new Set(),
            allStatesEntered = new Set();
        var keepGoing = true;
        var currentEvent = e;
        return [allStatesEntered, allStatesExited, keepGoing, currentEvent];
    },

    _finishBigStep: function _finishBigStep(e, allStatesEntered, allStatesExited, cb) {
        var _this4 = this;

        var statesToInvoke = Array.from(new Set([].concat(_toConsumableArray(allStatesEntered)).filter(function (s) {
            return s.invokes && !allStatesExited.has(s);
        }))).sort(sortInEntryOrder);

        // Here we invoke whatever needs to be invoked. The implementation of 'invoke' is platform-specific
        statesToInvoke.forEach(function (s) {
            s.invokes.forEach(function (f) {
                return _this4._evaluateAction(e, f);
            });
        });

        // cancel invoke for allStatesExited
        allStatesExited.forEach(function (s) {
            if (s.invokes) s.invokes.forEach(function (invoke) {
                _this4._scriptingContext.cancelInvoke(invoke.id);
            });
        });

        // TODO: Invoking may have raised internal error events and we iterate to handle them        
        //if not internalQueue.isEmpty():
        //    continue

        this._isInFinalState = this._configuration.iter().every(function (s) {
            return s.typeEnum === FINAL;
        });
        if (this._isInFinalState) {
            this._exitInterpreter(e);
        }
        this.emit('onBigStepEnd');
        if (cb) cb(undefined, this.getConfiguration());
    },

    _cancelAllDelayedSends: function _cancelAllDelayedSends() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this._scriptingContext._timeouts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var timeoutOptions = _step.value;

                if (!timeoutOptions.sendOptions.delay) continue;
                this._log('cancelling delayed send', timeoutOptions);
                clearTimeout(timeoutOptions.timeoutHandle);
                this._scriptingContext._timeouts.delete(timeoutOptions);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        Object.keys(this._scriptingContext._timeoutMap).forEach(function (key) {
            delete this._scriptingContext._timeoutMap[key];
        }, this);
    },

    _performBigStepAsync: function _performBigStepAsync(e, cb) {
        var currentEvent = void 0,
            keepGoing = void 0,
            allStatesExited = void 0,
            allStatesEntered = void 0;

        var _startBigStep3 = this._startBigStep(e);

        var _startBigStep4 = _slicedToArray(_startBigStep3, 4);

        allStatesExited = _startBigStep4[0];
        allStatesEntered = _startBigStep4[1];
        keepGoing = _startBigStep4[2];
        currentEvent = _startBigStep4[3];


        function nextStep(emit) {
            this.emit(emit);

            var _selectTransitionsAnd3 = this._selectTransitionsAndPerformSmallStep(currentEvent, allStatesEntered, allStatesExited);

            var _selectTransitionsAnd4 = _slicedToArray(_selectTransitionsAnd3, 2);

            currentEvent = _selectTransitionsAnd4[0];
            keepGoing = _selectTransitionsAnd4[1];


            if (keepGoing) {
                this.emit('onBigStepSuspend');
                setImmediate(nextStep.bind(this), 'onBigStepResume');
            } else {
                this._finishBigStep(currentEvent, allStatesEntered, allStatesExited, cb);
            }
        }
        nextStep.call(this, 'onBigStepBegin');
    },

    /** @private */
    _performSmallStep: function _performSmallStep(currentEvent, selectedTransitions) {

        this._log("selecting transitions with currentEvent", currentEvent);

        this._log("selected transitions", selectedTransitions);

        var statesExited = void 0,
            statesEntered = void 0;

        if (!selectedTransitions.isEmpty()) {

            //we only want to enter and exit states from transitions with targets
            //filter out targetless transitions here - we will only use these to execute transition actions
            var selectedTransitionsWithTargets = new this.opts.Set(selectedTransitions.iter().filter(transitionWithTargets));

            statesExited = this._exitStates(currentEvent, selectedTransitionsWithTargets);
            this._executeTransitions(currentEvent, selectedTransitions);
            statesEntered = this._enterStates(currentEvent, selectedTransitionsWithTargets);

            this._log("new configuration ", this._configuration);
        }

        return [statesExited, statesEntered];
    },

    _exitStates: function _exitStates(currentEvent, selectedTransitionsWithTargets) {
        var basicStatesExited = void 0,
            statesExited = void 0;

        var _getStatesExited = this._getStatesExited(selectedTransitionsWithTargets);

        var _getStatesExited2 = _slicedToArray(_getStatesExited, 2);

        basicStatesExited = _getStatesExited2[0];
        statesExited = _getStatesExited2[1];


        this._log('exiting states');
        for (var j = 0, len = statesExited.length; j < len; j++) {
            var stateExited = statesExited[j];

            if (stateExited.isAtomic) this._configuration.remove(stateExited);

            this._log("exiting ", stateExited.id);

            //invoke listeners
            this.emit('onExit', stateExited.id);

            if (stateExited.onExit !== undefined) {
                for (var exitIdx = 0, exitLen = stateExited.onExit.length; exitIdx < exitLen; exitIdx++) {
                    var block = stateExited.onExit[exitIdx];
                    for (var blockIdx = 0, blockLen = block.length; blockIdx < blockLen; blockIdx++) {
                        var actionRef = block[blockIdx];
                        try {
                            actionRef.call(this._scriptingContext, currentEvent);
                        } catch (e) {
                            this._handleError(e, actionRef);
                            break;
                        }
                    }
                }
            }

            var f;
            if (stateExited.historyRef) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = stateExited.historyRef[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var historyRef = _step2.value;

                        if (historyRef.isDeep) {
                            f = function f(s0) {
                                return s0.typeEnum === BASIC && stateExited.descendants.indexOf(s0) > -1;
                            };
                        } else {
                            f = function f(s0) {
                                return s0.parent === stateExited;
                            };
                        }
                        //update history
                        this._historyValue[historyRef.id] = statesExited.filter(f);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }

        return statesExited;
    },

    _executeTransitions: function _executeTransitions(currentEvent, selectedTransitions) {
        var sortedTransitions = selectedTransitions.iter().sort(transitionComparator);

        this._log("executing transitition actions");
        for (var stxIdx = 0, len = sortedTransitions.length; stxIdx < len; stxIdx++) {
            var transition = sortedTransitions[stxIdx];

            var targetIds = transition.targets && transition.targets.map(function (target) {
                return target.id;
            });

            this.emit('onTransition', transition.source.id, targetIds, transition.source.transitions.indexOf(transition));

            if (transition.onTransition !== undefined) {
                for (var txIdx = 0, txLen = transition.onTransition.length; txIdx < txLen; txIdx++) {
                    var actionRef = transition.onTransition[txIdx];
                    try {
                        actionRef.call(this._scriptingContext, currentEvent);
                    } catch (e) {
                        this._handleError(e, actionRef);
                        break;
                    }
                }
            }
        }
    },

    _enterStates: function _enterStates(currentEvent, selectedTransitionsWithTargets) {
        var _this5 = this;

        this._log("entering states");

        var statesEntered = new Set();
        var statesForDefaultEntry = new Set();
        // initialize the temporary table for default content in history states
        var defaultHistoryContent = {};
        this._computeEntrySet(selectedTransitionsWithTargets, statesEntered, statesForDefaultEntry, defaultHistoryContent);
        statesEntered = [].concat(_toConsumableArray(statesEntered)).sort(sortInEntryOrder);

        this._log("statesEntered ", statesEntered);

        for (var enterIdx = 0, enterLen = statesEntered.length; enterIdx < enterLen; enterIdx++) {
            var stateEntered = statesEntered[enterIdx];

            if (stateEntered.isAtomic) this._configuration.add(stateEntered);

            this._log("entering", stateEntered.id);

            this.emit('onEntry', stateEntered.id);

            if (stateEntered.onEntry !== undefined) {
                for (var entryIdx = 0, entryLen = stateEntered.onEntry.length; entryIdx < entryLen; entryIdx++) {
                    var block = stateEntered.onEntry[entryIdx];
                    for (var blockIdx = 0, blockLen = block.length; blockIdx < blockLen; blockIdx++) {
                        var actionRef = block[blockIdx];
                        try {
                            actionRef.call(this._scriptingContext, currentEvent);
                        } catch (e) {
                            this._handleError(e, actionRef);
                            break;
                        }
                    }
                }
            }

            if (statesForDefaultEntry.has(stateEntered)) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = stateEntered.initialRef[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var initialState = _step3.value;

                        this.emit('onDefaultEntry', initialState.id);
                        if (initialState.typeEnum === INITIAL) {
                            var transition = initialState.transitions[0];
                            if (transition.onTransition !== undefined) {
                                this._log('executing initial transition content for initial state of parent state', stateEntered.id);
                                for (var txIdx = 0, txLen = transition.onTransition.length; txIdx < txLen; txIdx++) {
                                    var _actionRef = transition.onTransition[txIdx];
                                    try {
                                        _actionRef.call(this._scriptingContext, currentEvent);
                                    } catch (e) {
                                        this._handleError(e, _actionRef);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }

            if (defaultHistoryContent[stateEntered.id]) {
                var _transition = defaultHistoryContent[stateEntered.id];
                if (_transition.onTransition !== undefined) {
                    this._log('executing history transition content for history state of parent state', stateEntered.id);
                    for (var txIdx = 0, txLen = _transition.onTransition.length; txIdx < txLen; txIdx++) {
                        var _actionRef2 = _transition.onTransition[txIdx];
                        try {
                            _actionRef2.call(this._scriptingContext, currentEvent);
                        } catch (e) {
                            this._handleError(e, _actionRef2);
                            break;
                        }
                    }
                }
            }
        }

        for (var enterIdx = 0, enterLen = statesEntered.length; enterIdx < enterLen; enterIdx++) {
            var stateEntered = statesEntered[enterIdx];
            if (stateEntered.typeEnum === FINAL) {
                var parent = stateEntered.parent;
                var grandparent = parent.parent;
                this._internalEventQueue.push({ name: "done.state." + parent.id, data: stateEntered.donedata && stateEntered.donedata.call(this._scriptingContext, currentEvent) });
                if (grandparent && grandparent.typeEnum === PARALLEL) {
                    if (grandparent.states.every(function (s) {
                        return _this5.isInFinalState(s);
                    })) {
                        this._internalEventQueue.push({ name: "done.state." + grandparent.id });
                    }
                }
            }
        }

        return statesEntered;
    },

    isInFinalState: function isInFinalState(s) {
        var _this6 = this;

        if (s.typeEnum === COMPOSITE) {
            return s.states.some(function (s) {
                return s.typeEnum === FINAL && _this6._configuration.contains(s);
            });
        } else if (s.typeEnum === PARALLEL) {
            return s.states.every(this.isInFinalState.bind(this));
        } else {
            return false;
        }
    },

    /** @private */
    _evaluateAction: function _evaluateAction(currentEvent, actionRef) {
        try {
            return actionRef.call(this._scriptingContext, currentEvent); //SCXML system variables
        } catch (e) {
            this._handleError(e, actionRef);
        }
    },

    _handleError: function _handleError(e, actionRef) {
        var event = e instanceof Error || typeof e.__proto__.name === 'string' && e.__proto__.name.match(/^.*Error$/) ? //we can't just do 'e instanceof Error', because the Error object in the sandbox is from a different context, and instanceof will return false
        {
            name: 'error.execution',
            data: {
                tagname: actionRef.tagname,
                line: actionRef.line,
                column: actionRef.column,
                reason: e.message
            },
            type: 'platform'
        } : e.name ? e : {
            name: 'error.execution',
            data: e,
            type: 'platform'
        };
        this._internalEventQueue.push(event);
        this.emit('onError', event);
    },

    /** @private */
    _getStatesExited: function _getStatesExited(transitions) {
        var statesExited = new this.opts.Set();
        var basicStatesExited = new this.opts.Set();

        //States exited are defined to be active states that are
        //descendants of the scope of each priority-enabled transition.
        //Here, we iterate through the transitions, and collect states
        //that match this condition. 
        var transitionList = transitions.iter();
        for (var txIdx = 0, txLen = transitionList.length; txIdx < txLen; txIdx++) {
            var transition = transitionList[txIdx];
            var scope = transition.scope,
                desc = scope.descendants;

            //For each state in the configuration
            //is that state a descendant of the transition scope?
            //Store ancestors of that state up to but not including the scope.
            var configList = this._configuration.iter();
            for (var cfgIdx = 0, cfgLen = configList.length; cfgIdx < cfgLen; cfgIdx++) {
                var state = configList[cfgIdx];
                if (desc.indexOf(state) > -1) {
                    basicStatesExited.add(state);
                    statesExited.add(state);
                    var ancestors = query.getAncestors(state, scope);
                    for (var ancIdx = 0, ancLen = ancestors.length; ancIdx < ancLen; ancIdx++) {
                        statesExited.add(ancestors[ancIdx]);
                    }
                }
            }
        }

        var sortedStatesExited = statesExited.iter().sort(getStateWithHigherSourceChildPriority);
        return [basicStatesExited, sortedStatesExited];
    },

    _computeEntrySet: function _computeEntrySet(transitions, statesToEnter, statesForDefaultEntry, defaultHistoryContent) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = transitions.iter()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var t = _step4.value;
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = t.targets[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var s = _step5.value;

                        this._addDescendantStatesToEnter(s, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                var ancestor = t.scope;
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = this._getEffectiveTargetStates(t)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var _s = _step6.value;

                        this._addAncestorStatesToEnter(_s, ancestor, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
    },

    _getEffectiveTargetStates: function _getEffectiveTargetStates(transition) {
        var targets = new Set();
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
            for (var _iterator7 = transition.targets[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                var s = _step7.value;

                if (s.typeEnum === HISTORY) {
                    if (s.id in this._historyValue) this._historyValue[s.id].forEach(function (state) {
                        return targets.add(state);
                    });else [].concat(_toConsumableArray(this._getEffectiveTargetStates(s.transitions[0]))).forEach(function (state) {
                        return targets.add(state);
                    });
                } else {
                    targets.add(s);
                }
            }
        } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                    _iterator7.return();
                }
            } finally {
                if (_didIteratorError7) {
                    throw _iteratorError7;
                }
            }
        }

        return targets;
    },

    _addDescendantStatesToEnter: function _addDescendantStatesToEnter(state, statesToEnter, statesForDefaultEntry, defaultHistoryContent) {
        var _this7 = this;

        if (state.typeEnum === HISTORY) {
            if (this._historyValue[state.id]) {
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;

                try {
                    for (var _iterator8 = this._historyValue[state.id][Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var s = _step8.value;

                        this._addDescendantStatesToEnter(s, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                    }
                } catch (err) {
                    _didIteratorError8 = true;
                    _iteratorError8 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion8 && _iterator8.return) {
                            _iterator8.return();
                        }
                    } finally {
                        if (_didIteratorError8) {
                            throw _iteratorError8;
                        }
                    }
                }

                var _iteratorNormalCompletion9 = true;
                var _didIteratorError9 = false;
                var _iteratorError9 = undefined;

                try {
                    for (var _iterator9 = this._historyValue[state.id][Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                        var _s2 = _step9.value;

                        this._addAncestorStatesToEnter(_s2, state.parent, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                    }
                } catch (err) {
                    _didIteratorError9 = true;
                    _iteratorError9 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion9 && _iterator9.return) {
                            _iterator9.return();
                        }
                    } finally {
                        if (_didIteratorError9) {
                            throw _iteratorError9;
                        }
                    }
                }
            } else {
                defaultHistoryContent[state.parent.id] = state.transitions[0];
                var _iteratorNormalCompletion10 = true;
                var _didIteratorError10 = false;
                var _iteratorError10 = undefined;

                try {
                    for (var _iterator10 = state.transitions[0].targets[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                        var _s3 = _step10.value;

                        this._addDescendantStatesToEnter(_s3, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                    }
                } catch (err) {
                    _didIteratorError10 = true;
                    _iteratorError10 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion10 && _iterator10.return) {
                            _iterator10.return();
                        }
                    } finally {
                        if (_didIteratorError10) {
                            throw _iteratorError10;
                        }
                    }
                }

                var _iteratorNormalCompletion11 = true;
                var _didIteratorError11 = false;
                var _iteratorError11 = undefined;

                try {
                    for (var _iterator11 = state.transitions[0].targets[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                        var _s4 = _step11.value;

                        this._addAncestorStatesToEnter(_s4, state.parent, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                    }
                } catch (err) {
                    _didIteratorError11 = true;
                    _iteratorError11 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion11 && _iterator11.return) {
                            _iterator11.return();
                        }
                    } finally {
                        if (_didIteratorError11) {
                            throw _iteratorError11;
                        }
                    }
                }
            }
        } else {
            statesToEnter.add(state);
            if (state.typeEnum === COMPOSITE) {
                statesForDefaultEntry.add(state);
                //for each state in initialRef, if it is an initial state, then add ancestors and descendants.
                var _iteratorNormalCompletion12 = true;
                var _didIteratorError12 = false;
                var _iteratorError12 = undefined;

                try {
                    for (var _iterator12 = state.initialRef[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                        var _s5 = _step12.value;

                        var targets = _s5.typeEnum === INITIAL ? _s5.transitions[0].targets : [_s5];
                        var _iteratorNormalCompletion14 = true;
                        var _didIteratorError14 = false;
                        var _iteratorError14 = undefined;

                        try {
                            for (var _iterator14 = targets[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                                var targetState = _step14.value;

                                this._addDescendantStatesToEnter(targetState, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                            }
                        } catch (err) {
                            _didIteratorError14 = true;
                            _iteratorError14 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                    _iterator14.return();
                                }
                            } finally {
                                if (_didIteratorError14) {
                                    throw _iteratorError14;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError12 = true;
                    _iteratorError12 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion12 && _iterator12.return) {
                            _iterator12.return();
                        }
                    } finally {
                        if (_didIteratorError12) {
                            throw _iteratorError12;
                        }
                    }
                }

                var _iteratorNormalCompletion13 = true;
                var _didIteratorError13 = false;
                var _iteratorError13 = undefined;

                try {
                    for (var _iterator13 = state.initialRef[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                        var _s6 = _step13.value;

                        var _targets = _s6.typeEnum === INITIAL ? _s6.transitions[0].targets : [_s6];
                        var _iteratorNormalCompletion15 = true;
                        var _didIteratorError15 = false;
                        var _iteratorError15 = undefined;

                        try {
                            for (var _iterator15 = _targets[Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                var _targetState = _step15.value;

                                this._addAncestorStatesToEnter(_targetState, state, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                            }
                        } catch (err) {
                            _didIteratorError15 = true;
                            _iteratorError15 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion15 && _iterator15.return) {
                                    _iterator15.return();
                                }
                            } finally {
                                if (_didIteratorError15) {
                                    throw _iteratorError15;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError13 = true;
                    _iteratorError13 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion13 && _iterator13.return) {
                            _iterator13.return();
                        }
                    } finally {
                        if (_didIteratorError13) {
                            throw _iteratorError13;
                        }
                    }
                }
            } else {
                if (state.typeEnum === PARALLEL) {
                    var _iteratorNormalCompletion16 = true;
                    var _didIteratorError16 = false;
                    var _iteratorError16 = undefined;

                    try {
                        var _loop = function _loop() {
                            var child = _step16.value;

                            if (![].concat(_toConsumableArray(statesToEnter)).some(function (s) {
                                return query.isDescendant(s, child);
                            })) {
                                _this7._addDescendantStatesToEnter(child, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                            }
                        };

                        for (var _iterator16 = state.states[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                            _loop();
                        }
                    } catch (err) {
                        _didIteratorError16 = true;
                        _iteratorError16 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion16 && _iterator16.return) {
                                _iterator16.return();
                            }
                        } finally {
                            if (_didIteratorError16) {
                                throw _iteratorError16;
                            }
                        }
                    }
                }
            }
        }
    },

    _addAncestorStatesToEnter: function _addAncestorStatesToEnter(state, ancestor, statesToEnter, statesForDefaultEntry, defaultHistoryContent) {
        var _this8 = this;

        var traverse = function traverse(anc) {
            if (anc.typeEnum === PARALLEL) {
                var _iteratorNormalCompletion17 = true;
                var _didIteratorError17 = false;
                var _iteratorError17 = undefined;

                try {
                    var _loop2 = function _loop2() {
                        var child = _step17.value;

                        if (child.typeEnum !== HISTORY && ![].concat(_toConsumableArray(statesToEnter)).some(function (s) {
                            return query.isDescendant(s, child);
                        })) {
                            _this8._addDescendantStatesToEnter(child, statesToEnter, statesForDefaultEntry, defaultHistoryContent);
                        }
                    };

                    for (var _iterator17 = anc.states[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                        _loop2();
                    }
                } catch (err) {
                    _didIteratorError17 = true;
                    _iteratorError17 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion17 && _iterator17.return) {
                            _iterator17.return();
                        }
                    } finally {
                        if (_didIteratorError17) {
                            throw _iteratorError17;
                        }
                    }
                }
            }
        };
        var _iteratorNormalCompletion18 = true;
        var _didIteratorError18 = false;
        var _iteratorError18 = undefined;

        try {
            for (var _iterator18 = query.getAncestors(state, ancestor)[Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                var anc = _step18.value;

                statesToEnter.add(anc);
                traverse(anc);
            }
        } catch (err) {
            _didIteratorError18 = true;
            _iteratorError18 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion18 && _iterator18.return) {
                    _iterator18.return();
                }
            } finally {
                if (_didIteratorError18) {
                    throw _iteratorError18;
                }
            }
        }

        traverse(ancestor);
    },

    /** @private */
    _selectTransitions: function _selectTransitions(currentEvent, selectEventlessTransitions) {
        var transitionSelector = this.opts.transitionSelector;
        var enabledTransitions = new this.opts.Set();

        var e = this._evaluateAction.bind(this, currentEvent);

        var atomicStates = this._configuration.iter().sort(transitionComparator);
        var _iteratorNormalCompletion19 = true;
        var _didIteratorError19 = false;
        var _iteratorError19 = undefined;

        try {
            for (var _iterator19 = atomicStates[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                var state = _step19.value;
                var _iteratorNormalCompletion20 = true;
                var _didIteratorError20 = false;
                var _iteratorError20 = undefined;

                try {
                    loop: for (var _iterator20 = [state].concat(query.getAncestors(state))[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                        var s = _step20.value;
                        var _iteratorNormalCompletion21 = true;
                        var _didIteratorError21 = false;
                        var _iteratorError21 = undefined;

                        try {
                            for (var _iterator21 = s.transitions[Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                                var t = _step21.value;

                                if (transitionSelector(t, currentEvent, e, selectEventlessTransitions)) {
                                    enabledTransitions.add(t);
                                    break loop;
                                }
                            }
                        } catch (err) {
                            _didIteratorError21 = true;
                            _iteratorError21 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion21 && _iterator21.return) {
                                    _iterator21.return();
                                }
                            } finally {
                                if (_didIteratorError21) {
                                    throw _iteratorError21;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError20 = true;
                    _iteratorError20 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion20 && _iterator20.return) {
                            _iterator20.return();
                        }
                    } finally {
                        if (_didIteratorError20) {
                            throw _iteratorError20;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError19 = true;
            _iteratorError19 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion19 && _iterator19.return) {
                    _iterator19.return();
                }
            } finally {
                if (_didIteratorError19) {
                    throw _iteratorError19;
                }
            }
        }

        var priorityEnabledTransitions = this._removeConflictingTransition(enabledTransitions);

        this._log("priorityEnabledTransitions", priorityEnabledTransitions);

        return priorityEnabledTransitions;
    },

    _computeExitSet: function _computeExitSet(transitions) {
        var statesToExit = new Set();
        var _iteratorNormalCompletion22 = true;
        var _didIteratorError22 = false;
        var _iteratorError22 = undefined;

        try {
            for (var _iterator22 = transitions[Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                var t = _step22.value;

                if (t.targets) {
                    var scope = t.scope;
                    var _iteratorNormalCompletion23 = true;
                    var _didIteratorError23 = false;
                    var _iteratorError23 = undefined;

                    try {
                        for (var _iterator23 = this._getFullConfiguration()[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                            var s = _step23.value;

                            if (query.isDescendant(s, scope)) statesToExit.add(s);
                        }
                    } catch (err) {
                        _didIteratorError23 = true;
                        _iteratorError23 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion23 && _iterator23.return) {
                                _iterator23.return();
                            }
                        } finally {
                            if (_didIteratorError23) {
                                throw _iteratorError23;
                            }
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError22 = true;
            _iteratorError22 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion22 && _iterator22.return) {
                    _iterator22.return();
                }
            } finally {
                if (_didIteratorError22) {
                    throw _iteratorError22;
                }
            }
        }

        return statesToExit;
    },

    /** @private */
    _removeConflictingTransition: function _removeConflictingTransition(enabledTransitions) {
        var _this9 = this;

        var filteredTransitions = new this.opts.Set();
        //toList sorts the transitions in the order of the states that selected them
        var _iteratorNormalCompletion24 = true;
        var _didIteratorError24 = false;
        var _iteratorError24 = undefined;

        try {
            for (var _iterator24 = enabledTransitions.iter()[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                var t1 = _step24.value;

                var t1Preempted = false;
                var transitionsToRemove = new Set();
                var _iteratorNormalCompletion25 = true;
                var _didIteratorError25 = false;
                var _iteratorError25 = undefined;

                try {
                    var _loop3 = function _loop3() {
                        var t2 = _step25.value;

                        //TODO: can we compute this statically? for example, by checking if the transition scopes are arena orthogonal?
                        var t1ExitSet = _this9._computeExitSet([t1]);
                        var t2ExitSet = _this9._computeExitSet([t2]);
                        var hasIntersection = [].concat(_toConsumableArray(t1ExitSet)).some(function (s) {
                            return t2ExitSet.has(s);
                        }) || [].concat(_toConsumableArray(t2ExitSet)).some(function (s) {
                            return t1ExitSet.has(s);
                        });
                        _this9._log('t1ExitSet', t1.source.id, [].concat(_toConsumableArray(t1ExitSet)).map(function (s) {
                            return s.id;
                        }));
                        _this9._log('t2ExitSet', t2.source.id, [].concat(_toConsumableArray(t2ExitSet)).map(function (s) {
                            return s.id;
                        }));
                        _this9._log('hasIntersection', hasIntersection);
                        if (hasIntersection) {
                            if (t2.source.descendants.indexOf(t1.source) > -1) {
                                //is this the same as being ancestrally related?
                                transitionsToRemove.add(t2);
                            } else {
                                t1Preempted = true;
                                return 'break';
                            }
                        }
                    };

                    for (var _iterator25 = filteredTransitions.iter()[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
                        var _ret3 = _loop3();

                        if (_ret3 === 'break') break;
                    }
                } catch (err) {
                    _didIteratorError25 = true;
                    _iteratorError25 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion25 && _iterator25.return) {
                            _iterator25.return();
                        }
                    } finally {
                        if (_didIteratorError25) {
                            throw _iteratorError25;
                        }
                    }
                }

                if (!t1Preempted) {
                    var _iteratorNormalCompletion26 = true;
                    var _didIteratorError26 = false;
                    var _iteratorError26 = undefined;

                    try {
                        for (var _iterator26 = transitionsToRemove[Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
                            var t3 = _step26.value;

                            filteredTransitions.remove(t3);
                        }
                    } catch (err) {
                        _didIteratorError26 = true;
                        _iteratorError26 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion26 && _iterator26.return) {
                                _iterator26.return();
                            }
                        } finally {
                            if (_didIteratorError26) {
                                throw _iteratorError26;
                            }
                        }
                    }

                    filteredTransitions.add(t1);
                }
            }
        } catch (err) {
            _didIteratorError24 = true;
            _iteratorError24 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion24 && _iterator24.return) {
                    _iterator24.return();
                }
            } finally {
                if (_didIteratorError24) {
                    throw _iteratorError24;
                }
            }
        }

        return filteredTransitions;
    },

    _log: function _log() {
        if (printTrace) {
            var args = Array.from(arguments);
            this.opts.console.log(args[0] + ': ' + args.slice(1).map(function (arg) {
                return arg === null ? 'null' : arg === undefined ? 'undefined' : typeof arg === 'string' ? arg : arg.toString() === '[object Object]' ? util.inspect(arg) : arg.toString();
            }).join(', ') + '\n');
        }
    },

    /**
    * @interface Listener
    */

    /**
    * @function
    * @name Listener#onEntry 
    * @param {string} stateId
    */

    /**
    * @function
    * @name Listener#onExit 
    * @param {string} stateId
    */

    /**
    * @function
    * @name Listener#onTransition 
    * @param {string} sourceStateId Id of the source state
    * @param {Array<string>} targetStatesIds Ids of the target states
    * @param {number} transitionIndex Index of the transition relative to other transitions originating from source state.
    */

    /**
    * @function
    * @name Listener#onError
    * @param {Error} errorInfo
    */

    /**
    * @function
    * @name Listener#onBigStepBegin
    */

    /**
    * @function
    * @name Listener#onBigStepResume
    */

    /**
    * @function
    * @name Listener#onBigStepSuspend
    */

    /**
    * @function
    * @name Listener#onBigStepEnd
    */

    /**
    * @function
    * @name Listener#onSmallStepBegin
    * @param {string} event
    */

    /**
    * @function
    * @name Listener#onSmallStepEnd
    */

    /** 
    * Provides a generic mechanism to subscribe to state change and runtime
    * error notifications.  Can be used for logging and debugging. For example,
    * can attach a logger that simply logs the state changes.  Or can attach a
    * network debugging client that sends state change notifications to a
    * debugging server.
    * This is an alternative interface to {@link EventEmitter.prototype#on}.
    * @memberof BaseInterpreter.prototype 
    * @param {Listener} listener
    */
    registerListener: function registerListener(listener) {
        BaseInterpreter.EVENTS.forEach(function (event) {
            if (listener[event]) this.on(event, listener[event]);
        }, this);
    },

    /** 
    * Unregister a Listener
    * @memberof BaseInterpreter.prototype 
    * @param {Listener} listener
    */
    unregisterListener: function unregisterListener(listener) {
        BaseInterpreter.EVENTS.forEach(function (event) {
            if (listener[event]) this.off(event, listener[event]);
        }, this);
    },

    /** 
    * Query the model to get all transition events.
    * @return {Array<string>} Transition events.
    * @memberof BaseInterpreter.prototype 
    */
    getAllTransitionEvents: function getAllTransitionEvents() {
        var events = {};
        function getEvents(state) {

            if (state.transitions) {
                for (var txIdx = 0, txLen = state.transitions.length; txIdx < txLen; txIdx++) {
                    events[state.transitions[txIdx].event] = true;
                }
            }

            if (state.states) {
                for (var stateIdx = 0, stateLen = state.states.length; stateIdx < stateLen; stateIdx++) {
                    getEvents(state.states[stateIdx]);
                }
            }
        }

        getEvents(this._model);

        return Object.keys(events);
    },

    /**
    * Three things capture the current snapshot of a running SCION interpreter:
    *
    *      <ul>
    *      <li> basic configuration (the set of basic states the state machine is in)</li>
    *      <li> history state values (the states the state machine was in last time it was in the parent of a history state)</li>
    *      <li> the datamodel</li>
    *      </ul>
    *      
    * The snapshot object can be serialized as JSON and saved to a database. It can
    * later be passed to the SCXML constructor to restore the state machine
    * using the snapshot argument.
    *
    * @return {Snapshot} 
    * @memberof BaseInterpreter.prototype 
    */
    getSnapshot: function getSnapshot() {
        return [this.getConfiguration(), this._serializeHistory(), this._isInFinalState, this._model.$serializeDatamodel(), this._internalEventQueue.slice()];
    },

    _serializeHistory: function _serializeHistory() {
        var o = {};
        Object.keys(this._historyValue).forEach(function (sid) {
            o[sid] = this._historyValue[sid].map(function (state) {
                return state.id;
            });
        }, this);
        return o;
    }
});

/**
 * @class
 * @extends BaseInterpreter
 * @memberof scion
 */
function Statechart(model, opts) {
    opts = opts || {};

    opts.InterpreterScriptingContext = opts.InterpreterScriptingContext || InterpreterScriptingContext;

    this._isStepping = false;

    BaseInterpreter.call(this, model, opts); //call super constructor

    module.exports.emit('new', this);
}

function beget(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

// Do nothing

function nop() {}

//Statechart.prototype = Object.create(BaseInterpreter.prototype);
//would like to use Object.create here, but not portable, but it's too complicated to use portably
Statechart.prototype = beget(BaseInterpreter.prototype);

/**
 * @interface Event
 */

/** 
* @member name
* @memberof Event.prototype 
* @type string
* @description The name of the event
*/

/** 
* @member data
* @memberof Event.prototype 
* @type any
* @description The event data
*/

/** 
* An SCXML interpreter takes SCXML events as input, where an SCXML event is an
* object with "name" and "data" properties. These can be passed to method `gen`
* as two positional arguments, or as a single object.
* @function gen
* @memberof Statechart.prototype 
* @param {string|Event} evtObjOrName
* @param {any=} optionalData
* @emits BaseInterpreter#onEntry
* @emits BaseInterpreter#onExit
* @emits BaseInterpreter#onTransition
* @emits BaseInterpreter#onDefaultEntry
* @emits BaseInterpreter#onError
* @emits BaseInterpreter#onBigStepBegin
* @emits BaseInterpreter#onBigStepEnd
* @emits BaseInterpreter#onBigStepSuspend
* @emits BaseInterpreter#onBigStepResume
* @emits BaseInterpreter#onSmallStepBegin
* @emits BaseInterpreter#onSmallStepEnd
* @emits BaseInterpreter#onBigStepEnd
* @emits BaseInterpreter#onExitInterpreter
*/
Statechart.prototype.gen = function (evtObjOrName, optionalData) {

    var currentEvent;
    switch (typeof evtObjOrName === 'undefined' ? 'undefined' : _typeof(evtObjOrName)) {
        case 'string':
            currentEvent = { name: evtObjOrName, data: optionalData };
            break;
        case 'object':
            if (typeof evtObjOrName.name === 'string') {
                currentEvent = evtObjOrName;
            } else {
                throw new Error('Event object must have "name" property of type string.');
            }
            break;
        default:
            throw new Error('First argument to gen must be a string or object.');
    }

    if (this._isStepping) throw new Error('Cannot call gen during a big-step');

    //otherwise, kick him off
    this._isStepping = true;

    this._performBigStep(currentEvent);

    this._isStepping = false;
    return this.getConfiguration();
};

/**
* Injects an external event into the interpreter asynchronously
* @function genAsync
* @memberof Statechart.prototype 
* @param {Event}  currentEvent The event to inject
* @param {genCallback} cb Callback invoked with an error or the interpreter's stable configuration
* @emits BaseInterpreter#onEntry
* @emits BaseInterpreter#onExit
* @emits BaseInterpreter#onTransition
* @emits BaseInterpreter#onDefaultEntry
* @emits BaseInterpreter#onError
* @emits BaseInterpreter#onBigStepBegin
* @emits BaseInterpreter#onBigStepEnd
* @emits BaseInterpreter#onBigStepSuspend
* @emits BaseInterpreter#onBigStepResume
* @emits BaseInterpreter#onSmallStepBegin
* @emits BaseInterpreter#onSmallStepEnd
* @emits BaseInterpreter#onBigStepEnd
* @emits BaseInterpreter#onExitInterpreter
*/
Statechart.prototype.genAsync = function (currentEvent, cb) {
    if (currentEvent !== null && ((typeof currentEvent === 'undefined' ? 'undefined' : _typeof(currentEvent)) !== 'object' || !currentEvent || typeof currentEvent.name !== 'string')) {
        throw new Error('Expected currentEvent to be null or an Object with a name');
    }

    if (typeof cb !== 'function') {
        cb = nop;
    }

    this._externalEventQueue.push([currentEvent, cb]);

    //the semantics we want are to return to the cb the results of processing that particular event.
    function nextStep(e, c) {
        this._performBigStepAsync(e, function (err, config) {
            c(err, config);

            if (this._externalEventQueue.length) {
                nextStep.apply(this, this._externalEventQueue.shift());
            } else {
                this._isStepping = false;
            }
        }.bind(this));
    }
    if (!this._isStepping) {
        this._isStepping = true;
        nextStep.apply(this, this._externalEventQueue.shift());
    }
};

function InterpreterScriptingContext(interpreter) {
    this._interpreter = interpreter;
    this._timeoutMap = {};
    this._invokeMap = {};
    this._timeouts = new Set();
}

//Regex from:
//  http://daringfireball.net/2010/07/improved_regex_for_matching_urls
//  http://stackoverflow.com/a/6927878
var validateUriRegex = /(#_.*)|\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

//TODO: consider whether this is the API we would like to expose
InterpreterScriptingContext.prototype = {
    invokeSendTargetRegex: /^#_(.*)$/,
    scxmlSendTargetRegex: /^#_scxml_(.*)$/,
    raise: function raise(event) {
        this._installDefaultPropsOnEvent(event, true);
        this._interpreter._internalEventQueue.push(event);
    },
    parseXmlStringAsDOM: function parseXmlStringAsDOM(xmlString) {
        return (this._interpreter.opts.xmlParser || InterpreterScriptingContext.xmlParser).parse(xmlString);
    },
    invoke: function invoke(invokeObj) {
        var _this10 = this;

        //look up invoker by type. assume invokers are passed in as an option to constructor
        this._invokeMap[invokeObj.id] = new Promise(function (resolve, reject) {
            (_this10._interpreter.opts.invokers || InterpreterScriptingContext.invokers)[invokeObj.type](_this10._interpreter, invokeObj, function (err, session) {
                if (err) return reject(err);

                _this10._interpreter.emit('onInvokedSessionInitialized', session);
                resolve(session);
            });
        });
    },
    cancelInvoke: function cancelInvoke(invokeid) {
        var _this11 = this;

        //TODO: on cancel invoke clean up this._invokeMap
        var sessionPromise = this._invokeMap[invokeid];
        this._interpreter._log('cancelling session with invokeid ' + invokeid);
        if (sessionPromise) {
            this._interpreter._log('sessionPromise found');
            sessionPromise.then(function (session) {
                _this11._interpreter._log('resolved session ' + invokeid + '. cancelling... ');
                session.cancel();
                //clean up
                delete _this11._invokeMap[invokeid];
            }, function (err) {
                //TODO: dispatch error back into the state machine as error.communication
            });
        }
    },
    _installDefaultPropsOnEvent: function _installDefaultPropsOnEvent(event, isInternal) {
        if (!isInternal) {
            event.origin = this._interpreter.opts._x._ioprocessors.scxml.location; //TODO: preserve original origin when we autoforward? 
            event.origintype = event.type || SCXML_IOPROCESSOR_TYPE;
        }
        if (typeof event.type === 'undefined') {
            event.type = isInternal ? 'internal' : 'external';
        }
        ['name', 'sendid', 'invokeid', 'data', 'origin', 'origintype'].forEach(function (prop) {
            if (typeof event[prop] === 'undefined') {
                event[prop] = undefined;
            }
        });
    },
    send: function send(event, options) {
        this._interpreter._log('send event', event, options);
        options = options || {};
        var sendType = options.type || SCXML_IOPROCESSOR_TYPE;
        //TODO: move these out
        function validateSend(event, options, sendAction) {
            if (event.target) {
                var targetIsValidUri = validateUriRegex.test(event.target);
                if (!targetIsValidUri) {
                    throw { name: "error.execution", data: 'Target is not valid URI', sendid: event.sendid, type: 'platform' };
                }
            }
            if (sendType !== SCXML_IOPROCESSOR_TYPE) {
                //TODO: extend this to support HTTP, and other IO processors
                throw { name: "error.execution", data: 'Unsupported event processor type', sendid: event.sendid, type: 'platform' };
            }

            sendAction.call(this, event, options);
        }

        function defaultSendAction(event, options) {
            var _this12 = this;

            if (typeof setTimeout === 'undefined') throw new Error('Default implementation of Statechart.prototype.send will not work unless setTimeout is defined globally.');

            var match;
            if (event.target === '#_internal') {
                this.raise(event);
            } else {
                this._installDefaultPropsOnEvent(event, false);
                event.origintype = SCXML_IOPROCESSOR_TYPE; //TODO: extend this to support HTTP, and other IO processors
                //TODO : paramterize this based on send/@type?
                if (!event.target) {
                    doSend.call(this, this._interpreter);
                } else if (event.target === '#_parent') {
                    if (this._interpreter.opts.parentSession) {
                        event.invokeid = this._interpreter.opts.invokeid;
                        doSend.call(this, this._interpreter.opts.parentSession);
                    } else {
                        throw { name: "error.communication", data: 'Parent session not specified', sendid: event.sendid, type: 'platform' };
                    }
                } else if (match = event.target.match(this.scxmlSendTargetRegex)) {
                    var targetSessionId = match[1];
                    var session = this._interpreter.opts.sessionRegistry.get(targetSessionId);
                    if (session) {
                        doSend.call(this, session);
                    } else {
                        throw { name: 'error.communication', sendid: event.sendid, type: 'platform' };
                    }
                } else if (match = event.target.match(this.invokeSendTargetRegex)) {
                    //TODO: test this code path.
                    var invokeId = match[1];
                    this._invokeMap[invokeId].then(function (session) {
                        doSend.call(_this12, session);
                    });
                } else {
                    throw new Error('Unrecognized send target.'); //TODO: dispatch error back into the state machine
                }
            }

            function doSend(session) {
                //TODO: we probably now need to refactor data structures:
                //    this._timeouts
                //    this._timeoutMap
                var timeoutHandle = setTimeout(function () {
                    if (event.sendid) delete this._timeoutMap[event.sendid];
                    this._timeouts.delete(timeoutOptions);
                    if (this._interpreter.opts.doSend) {
                        this._interpreter.opts.doSend(session, event);
                    } else {
                        session[this._interpreter.opts.sendAsync ? 'genAsync' : 'gen'](event);
                    }
                }.bind(this), options.delay || 0);

                var timeoutOptions = {
                    sendOptions: options,
                    timeoutHandle: timeoutHandle
                };
                if (event.sendid) this._timeoutMap[event.sendid] = timeoutHandle;
                this._timeouts.add(timeoutOptions);
            }
        }

        function publish() {
            this._interpreter.emit(event.name, event.data);
        }

        //choose send function
        //TODO: rethink how this custom send works
        var sendFn;
        if (event.type === 'https://github.com/jbeard4/SCION#publish') {
            sendFn = publish;
        } else if (this._interpreter.opts.customSend) {
            sendFn = this._interpreter.opts.customSend;
        } else {
            sendFn = defaultSendAction;
        }

        options = options || {};

        this._interpreter._log("sending event", event.name, "with content", event.data, "after delay", options.delay);

        validateSend.call(this, event, options, sendFn);
    },
    cancel: function cancel(sendid) {
        if (this._interpreter.opts.customCancel) {
            return this._interpreter.opts.customCancel.apply(this, [sendid]);
        }

        if (typeof clearTimeout === 'undefined') throw new Error('Default implementation of Statechart.prototype.cancel will not work unless setTimeout is defined globally.');

        if (sendid in this._timeoutMap) {
            this._interpreter._log("cancelling ", sendid, " with timeout id ", this._timeoutMap[sendid]);
            clearTimeout(this._timeoutMap[sendid]);
        }
    }
};

module.exports = extend(new EventEmitter(), {
    BaseInterpreter: BaseInterpreter,
    Statechart: Statechart,
    ArraySet: ArraySet,
    STATE_TYPES: constants.STATE_TYPES,
    initializeModel: initializeModel,
    InterpreterScriptingContext: InterpreterScriptingContext
});

}).call(this,require('_process'))

},{"./ArraySet":1,"./constants":2,"./helpers":3,"./query":4,"_process":6,"tiny-events":7,"util":10}],6:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],7:[function(require,module,exports){
function EventEmitter() {
    this._listeners = {};
}

EventEmitter.prototype.on = function _on(type, listener) {
    if (!Array.isArray(this._listeners[type])) {
        this._listeners[type] = [];
    }

    if (this._listeners[type].indexOf(listener) === -1) {
        this._listeners[type].push(listener);
    }

    return this;
};

EventEmitter.prototype.once = function _once(type, listener) {
    var self = this;

    function __once() {
        for (var args = [], i = 0; i < arguments.length; i += 1) {
            args[i] = arguments[i];
        }

        self.off(type, __once);
        listener.apply(self, args);
    }

    __once.listener = listener;

    return this.on(type, __once);
};

EventEmitter.prototype.off = function _off(type, listener) {
    if (!Array.isArray(this._listeners[type])) {
        return this;
    }

    if (typeof listener === 'undefined') {
        this._listeners[type] = [];
        return this;
    }

    var index = this._listeners[type].indexOf(listener);

    if (index === -1) {
        for (var i = 0; i < this._listeners[type].length; i += 1) {
            if (this._listeners[type][i].listener === listener) {
                index = i;
                break;
            }
        }
    }

    this._listeners[type].splice(index, 1);
    return this;
};

EventEmitter.prototype.emit = function _emit(type) {
    if (!Array.isArray(this._listeners[type])) {
        return this;
    }

    for (var args = [], i = 1; i < arguments.length; i += 1) {
        args[i - 1] = arguments[i];
    }

    this._listeners[type].forEach(function __emit(listener) {
        listener.apply(this, args);
    }, this);

    return this;
};

module.exports.EventEmitter = EventEmitter;

},{}],8:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],9:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],10:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./support/isBuffer":9,"_process":6,"inherits":8}]},{},[5])(5)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvQXJyYXlTZXQuanMiLCJsaWIvY29uc3RhbnRzLmpzIiwibGliL2hlbHBlcnMuanMiLCJsaWIvcXVlcnkuanMiLCJsaWIvc2Npb24uanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3RpbnktZXZlbnRzL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy91dGlsL25vZGVfbW9kdWxlcy9pbmhlcml0cy9pbmhlcml0c19icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL3V0aWwvc3VwcG9ydC9pc0J1ZmZlckJyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdXRpbC91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQTtBQUNBLFNBQVMsUUFBVCxDQUFrQixDQUFsQixFQUFxQjtBQUNqQixRQUFJLEtBQUssRUFBVDtBQUNBLFNBQUssQ0FBTCxHQUFTLElBQUksR0FBSixDQUFRLENBQVIsQ0FBVDtBQUNIOztBQUVELFNBQVMsU0FBVCxHQUFxQjs7QUFFakIsU0FBTSxhQUFTLENBQVQsRUFBWTtBQUNkLGFBQUssQ0FBTCxDQUFPLEdBQVAsQ0FBVyxDQUFYO0FBQ0gsS0FKZ0I7O0FBTWpCLFlBQVMsZ0JBQVMsQ0FBVCxFQUFZO0FBQ2pCLGVBQU8sS0FBSyxDQUFMLENBQU8sTUFBUCxDQUFjLENBQWQsQ0FBUDtBQUNILEtBUmdCOztBQVVqQixXQUFRLGVBQVMsQ0FBVCxFQUFZO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ2hCLGlDQUFjLEVBQUUsQ0FBaEIsOEhBQW1CO0FBQUEsb0JBQVYsQ0FBVTs7QUFDZixxQkFBSyxDQUFMLENBQU8sR0FBUCxDQUFXLENBQVg7QUFDSDtBQUhlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBSWhCLGVB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBiZWdpbiBBcnJheVNldCAqL1xuXG4vKiogQGNvbnN0cnVjdG9yICovXG5mdW5jdGlvbiBBcnJheVNldChsKSB7XG4gICAgbCA9IGwgfHwgW107XG4gICAgdGhpcy5vID0gbmV3IFNldChsKTsgICAgICAgIFxufVxuXG5BcnJheVNldC5wcm90b3R5cGUgPSB7XG5cbiAgICBhZGQgOiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHRoaXMuby5hZGQoeCk7XG4gICAgfSxcblxuICAgIHJlbW92ZSA6IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuby5kZWxldGUoeCk7XG4gICAgfSxcblxuICAgIHVuaW9uIDogZnVuY3Rpb24obCkge1xuICAgICAgICBmb3IgKHZhciB2IG9mIGwubykge1xuICAgICAgICAgICAgdGhpcy5vLmFkZCh2KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgZGlmZmVyZW5jZSA6IGZ1bmN0aW9uKGwpIHtcbiAgICAgICAgZm9yICh2YXIgdiBvZiBsLm8pIHtcbiAgICAgICAgICAgIHRoaXMuby5kZWxldGUodik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIGNvbnRhaW5zIDogZnVuY3Rpb24oeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vLmhhcyh4KTtcbiAgICB9LFxuXG4gICAgaXRlciA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLm8pO1xuICAgIH0sXG5cbiAgICBpc0VtcHR5IDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5vLnNpemU7XG4gICAgfSxcblxuICAgIHNpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vLnNpemU7XG4gICAgfSxcblxuICAgIGVxdWFscyA6IGZ1bmN0aW9uKHMyKSB7XG4gICAgICAgIGlmICh0aGlzLm8uc2l6ZSAhPT0gczIuc2l6ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciB2IG9mIHRoaXMubykge1xuICAgICAgICAgICAgaWYgKCFzMi5jb250YWlucyh2KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICB0b1N0cmluZyA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vLnNpemUgPT09IDAgPyAnPGVtcHR5PicgOiBBcnJheS5mcm9tKHRoaXMubykuam9pbignLFxcbicpO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXlTZXQ7XG4iLCJ2YXIgU1RBVEVfVFlQRVMgPSB7XG4gICAgQkFTSUM6IDAsXG4gICAgQ09NUE9TSVRFOiAxLFxuICAgIFBBUkFMTEVMOiAyLFxuICAgIEhJU1RPUlk6IDMsXG4gICAgSU5JVElBTDogNCxcbiAgICBGSU5BTDogNVxufTtcblxuY29uc3QgU0NYTUxfSU9QUk9DRVNTT1JfVFlQRSA9ICdodHRwOi8vd3d3LnczLm9yZy9UUi9zY3htbC8jU0NYTUxFdmVudFByb2Nlc3NvcidcbmNvbnN0IEhUVFBfSU9QUk9DRVNTT1JfVFlQRSA9ICdodHRwOi8vd3d3LnczLm9yZy9UUi9zY3htbC8jQmFzaWNIVFRQRXZlbnRQcm9jZXNzb3InXG5jb25zdCBSWF9UUkFJTElOR19XSUxEQ0FSRCA9IC9cXC5cXCokLztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNUQVRFX1RZUEVTIDogU1RBVEVfVFlQRVMsXG4gIFNDWE1MX0lPUFJPQ0VTU09SX1RZUEUgIDogU0NYTUxfSU9QUk9DRVNTT1JfVFlQRSxcbiAgSFRUUF9JT1BST0NFU1NPUl9UWVBFICA6IEhUVFBfSU9QUk9DRVNTT1JfVFlQRSwgXG4gIFJYX1RSQUlMSU5HX1dJTERDQVJEICA6IFJYX1RSQUlMSU5HX1dJTERDQVJEIFxufTtcbiIsImNvbnN0IGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyksXG4gICAgICBTVEFURV9UWVBFUyA9IGNvbnN0YW50cy5TVEFURV9UWVBFUyxcbiAgICAgIFJYX1RSQUlMSU5HX1dJTERDQVJEID0gY29uc3RhbnRzLlJYX1RSQUlMSU5HX1dJTERDQVJEO1xuXG5jb25zdCBwcmludFRyYWNlID0gZmFsc2U7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBleHRlbmQgOiBleHRlbmQsXG4gIHRyYW5zaXRpb25XaXRoVGFyZ2V0cyA6IHRyYW5zaXRpb25XaXRoVGFyZ2V0cyxcbiAgdHJhbnNpdGlvbkNvbXBhcmF0b3IgOiB0cmFuc2l0aW9uQ29tcGFyYXRvcixcbiAgaW5pdGlhbGl6ZU1vZGVsIDogaW5pdGlhbGl6ZU1vZGVsLFxuICBpc0V2ZW50UHJlZml4TWF0Y2ggOiBpc0V2ZW50UHJlZml4TWF0Y2gsXG4gIGlzVHJhbnNpdGlvbk1hdGNoIDogaXNUcmFuc2l0aW9uTWF0Y2gsXG4gIHNjeG1sUHJlZml4VHJhbnNpdGlvblNlbGVjdG9yIDogc2N4bWxQcmVmaXhUcmFuc2l0aW9uU2VsZWN0b3IsXG4gIGV2ZW50bGVzc1RyYW5zaXRpb25TZWxlY3RvciA6IGV2ZW50bGVzc1RyYW5zaXRpb25TZWxlY3RvcixcbiAgZ2V0VHJhbnNpdGlvbldpdGhIaWdoZXJTb3VyY2VDaGlsZFByaW9yaXR5IDogZ2V0VHJhbnNpdGlvbldpdGhIaWdoZXJTb3VyY2VDaGlsZFByaW9yaXR5LFxuICBzb3J0SW5FbnRyeU9yZGVyIDogc29ydEluRW50cnlPcmRlcixcbiAgZ2V0U3RhdGVXaXRoSGlnaGVyU291cmNlQ2hpbGRQcmlvcml0eSA6IGdldFN0YXRlV2l0aEhpZ2hlclNvdXJjZUNoaWxkUHJpb3JpdHksXG4gIGluaXRpYWxpemVNb2RlbEdlbmVyYXRvckZuIDogaW5pdGlhbGl6ZU1vZGVsR2VuZXJhdG9yRm4sXG4gIGRlc2VyaWFsaXplU2VyaWFsaXplZENvbmZpZ3VyYXRpb24gOiBkZXNlcmlhbGl6ZVNlcmlhbGl6ZWRDb25maWd1cmF0aW9uLFxuICBkZXNlcmlhbGl6ZUhpc3RvcnkgOiBkZXNlcmlhbGl6ZUhpc3Rvcnlcbn07XG5cbmZ1bmN0aW9uIGV4dGVuZCAodG8sIGZyb20pe1xuICBPYmplY3Qua2V5cyhmcm9tKS5mb3JFYWNoKGZ1bmN0aW9uKGspe1xuICAgIHRvW2tdID0gZnJvbVtrXTsgXG4gIH0pO1xuICByZXR1cm4gdG87XG59O1xuXG5mdW5jdGlvbiB0cmFuc2l0aW9uV2l0aFRhcmdldHModCl7XG4gICAgcmV0dXJuIHQudGFyZ2V0cztcbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvbkNvbXBhcmF0b3IodDEsIHQyKSB7XG4gICAgcmV0dXJuIHQxLmRvY3VtZW50T3JkZXIgLSB0Mi5kb2N1bWVudE9yZGVyO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplTW9kZWwocm9vdFN0YXRlKXtcbiAgICB2YXIgdHJhbnNpdGlvbnMgPSBbXSwgaWRUb1N0YXRlTWFwID0gbmV3IE1hcCgpLCBkb2N1bWVudE9yZGVyID0gMDtcblxuXG4gICAgLy9UT0RPOiBuZWVkIHRvIGFkZCBmYWtlIGlkcyB0byBhbnlvbmUgdGhhdCBkb2Vzbid0IGhhdmUgdGhlbVxuICAgIC8vRklYTUU6IG1ha2UgdGhpcyBzYWZlciAtIGJyZWFrIGludG8gbXVsdGlwbGUgcGFzc2VzXG4gICAgdmFyIGlkQ291bnQgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlSWQodHlwZSl7XG4gICAgICAgIGlmKGlkQ291bnRbdHlwZV0gPT09IHVuZGVmaW5lZCkgaWRDb3VudFt0eXBlXSA9IDA7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgIHZhciBjb3VudCA9IGlkQ291bnRbdHlwZV0rKztcbiAgICAgICAgICB2YXIgaWQgPSAnJGdlbmVyYXRlZC0nICsgdHlwZSArICctJyArIGNvdW50OyBcbiAgICAgICAgfSB3aGlsZSAoaWRUb1N0YXRlTWFwLmhhcyhpZCkpXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd3JhcEluRmFrZVJvb3RTdGF0ZShzdGF0ZSl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAkZGVzZXJpYWxpemVEYXRhbW9kZWwgOiBzdGF0ZS4kZGVzZXJpYWxpemVEYXRhbW9kZWwgfHwgZnVuY3Rpb24oKXt9LFxuICAgICAgICAgICAgJHNlcmlhbGl6ZURhdGFtb2RlbCA6IHN0YXRlLiRzZXJpYWxpemVEYXRhbW9kZWwgfHwgZnVuY3Rpb24oKXsgcmV0dXJuIG51bGw7fSxcbiAgICAgICAgICAgICRpZFRvU3RhdGVNYXAgOiBpZFRvU3RhdGVNYXAsICAgLy9rZWVwIHRoaXMgZm9yIGhhbmR5IGRlc2VyaWFsaXphdGlvbiBvZiBzZXJpYWxpemVkIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgICAgIGRvY1VybCA6IHN0YXRlLmRvY1VybCxcbiAgICAgICAgICAgIHN0YXRlcyA6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICR0eXBlIDogJ2luaXRpYWwnLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9ucyA6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQgOiBzdGF0ZVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3RhdGVcbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgc3RhdGVzV2l0aEluaXRpYWxBdHRyaWJ1dGVzID0gW107XG5cbiAgICAvKipcbiAgICAgIEB0aGlzIHtTQ1RyYW5zaXRpb259XG4gICAgKi9cbiAgICBmdW5jdGlvbiB0cmFuc2l0aW9uVG9TdHJpbmcoc291cmNlU3RhdGUpe1xuICAgICAgcmV0dXJuIGAke3NvdXJjZVN0YXRlfSAtLSAke3RoaXMuZXZlbnRzID8gJygnICsgdGhpcy5ldmVudHMuam9pbignLCcpICsgJyknIDogbnVsbH0ke3RoaXMuY29uZCA/ICdbJyArIHRoaXMuY29uZC5uYW1lICsgJ10nIDogJyd9IC0tPiAke3RoaXMudGFyZ2V0cyA/IHRoaXMudGFyZ2V0cy5qb2luKCcsJykgOiBudWxsfWA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICBAdGhpcyB7U0NTdGF0ZX1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHN0YXRlVG9TdHJpbmcoKXtcbiAgICAgIHJldHVybiB0aGlzLmlkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlU3RhdGVJZE1hcChzdGF0ZSl7XG4gICAgICAvL3BvcHVsYXRlIHN0YXRlIGlkIG1hcFxuICAgICAgaWYoc3RhdGUuaWQpe1xuICAgICAgICAgIGlkVG9TdGF0ZU1hcC5zZXQoc3RhdGUuaWQsIHN0YXRlKTtcbiAgICAgIH1cblxuICAgICAgaWYoc3RhdGUuc3RhdGVzKSB7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGxlbiA9IHN0YXRlLnN0YXRlcy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgICBwb3B1bGF0ZVN0YXRlSWRNYXAoc3RhdGUuc3RhdGVzW2pdKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhdmVyc2UoYW5jZXN0b3JzLHN0YXRlKXtcblxuICAgICAgICBpZihwcmludFRyYWNlKSBzdGF0ZS50b1N0cmluZyA9IHN0YXRlVG9TdHJpbmc7XG5cbiAgICAgICAgLy9hZGQgdG8gZ2xvYmFsIHRyYW5zaXRpb24gYW5kIHN0YXRlIGlkIGNhY2hlc1xuICAgICAgICBpZihzdGF0ZS50cmFuc2l0aW9ucykgdHJhbnNpdGlvbnMucHVzaC5hcHBseSh0cmFuc2l0aW9ucyxzdGF0ZS50cmFuc2l0aW9ucyk7XG5cbiAgICAgICAgLy9jcmVhdGUgYSBkZWZhdWx0IHR5cGUsIGp1c3QgdG8gbm9ybWFsaXplIHRoaW5nc1xuICAgICAgICAvL3RoaXMgd2F5IHdlIGNhbiBjaGVjayBmb3IgdW5zdXBwb3J0ZWQgdHlwZXMgYmVsb3dcbiAgICAgICAgc3RhdGUuJHR5cGUgPSBzdGF0ZS4kdHlwZSB8fCAnc3RhdGUnO1xuXG4gICAgICAgIC8vYWRkIGFuY2VzdG9ycyBhbmQgZGVwdGggcHJvcGVydGllc1xuICAgICAgICBzdGF0ZS5hbmNlc3RvcnMgPSBhbmNlc3RvcnM7XG4gICAgICAgIHN0YXRlLmRlcHRoID0gYW5jZXN0b3JzLmxlbmd0aDtcbiAgICAgICAgc3RhdGUucGFyZW50ID0gYW5jZXN0b3JzWzBdO1xuICAgICAgICBzdGF0ZS5kb2N1bWVudE9yZGVyID0gZG9jdW1lbnRPcmRlcisrOyBcblxuICAgICAgICAvL2FkZCBzb21lIGluZm9ybWF0aW9uIHRvIHRyYW5zaXRpb25zXG4gICAgICAgIHN0YXRlLnRyYW5zaXRpb25zID0gc3RhdGUudHJhbnNpdGlvbnMgfHwgW107XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBsZW4gPSBzdGF0ZS50cmFuc2l0aW9ucy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSBzdGF0ZS50cmFuc2l0aW9uc1tqXTtcbiAgICAgICAgICAgIHRyYW5zaXRpb24uZG9jdW1lbnRPcmRlciA9IGRvY3VtZW50T3JkZXIrKzsgXG4gICAgICAgICAgICB0cmFuc2l0aW9uLnNvdXJjZSA9IHN0YXRlO1xuICAgICAgICAgICAgaWYocHJpbnRUcmFjZSkgdHJhbnNpdGlvbi50b1N0cmluZyA9IHRyYW5zaXRpb25Ub1N0cmluZy5iaW5kKHRyYW5zaXRpb24sIHN0YXRlKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvL3JlY3Vyc2l2ZSBzdGVwXG4gICAgICAgIGlmKHN0YXRlLnN0YXRlcykge1xuICAgICAgICAgICAgdmFyIGFuY3MgPSBbc3RhdGVdLmNvbmNhdChhbmNlc3RvcnMpO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGxlbiA9IHN0YXRlLnN0YXRlcy5sZW5ndGg7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgICAgIHRyYXZlcnNlKGFuY3MsIHN0YXRlLnN0YXRlc1tqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldHVwIGZhc3Qgc3RhdGUgdHlwZVxuICAgICAgICBzd2l0Y2goc3RhdGUuJHR5cGUpe1xuICAgICAgICAgICAgY2FzZSAncGFyYWxsZWwnOlxuICAgICAgICAgICAgICAgIHN0YXRlLnR5cGVFbnVtID0gU1RBVEVfVFlQRVMuUEFSQUxMRUw7XG4gICAgICAgICAgICAgICAgc3RhdGUuaXNBdG9taWMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2luaXRpYWwnIDogXG4gICAgICAgICAgICAgICAgc3RhdGUudHlwZUVudW0gPSBTVEFURV9UWVBFUy5JTklUSUFMO1xuICAgICAgICAgICAgICAgIHN0YXRlLmlzQXRvbWljID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2hpc3RvcnknIDpcbiAgICAgICAgICAgICAgICBzdGF0ZS50eXBlRW51bSA9IFNUQVRFX1RZUEVTLkhJU1RPUlk7XG4gICAgICAgICAgICAgICAgc3RhdGUuaXNBdG9taWMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZmluYWwnIDogXG4gICAgICAgICAgICAgICAgc3RhdGUudHlwZUVudW0gPSBTVEFURV9UWVBFUy5GSU5BTDtcbiAgICAgICAgICAgICAgICBzdGF0ZS5pc0F0b21pYyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdzdGF0ZScgOiBcbiAgICAgICAgICAgIGNhc2UgJ3NjeG1sJyA6XG4gICAgICAgICAgICAgICAgaWYoc3RhdGUuc3RhdGVzICYmIHN0YXRlLnN0YXRlcy5sZW5ndGgpe1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS50eXBlRW51bSA9IFNUQVRFX1RZUEVTLkNPTVBPU0lURTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuaXNBdG9taWMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUudHlwZUVudW0gPSBTVEFURV9UWVBFUy5CQVNJQztcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuaXNBdG9taWMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQgOlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBzdGF0ZSB0eXBlOiAnICsgc3RhdGUuJHR5cGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9kZXNjZW5kYW50cyBwcm9wZXJ0eSBvbiBzdGF0ZXMgd2lsbCBub3cgYmUgcG9wdWxhdGVkLiBhZGQgZGVzY2VuZGFudHMgdG8gdGhpcyBzdGF0ZVxuICAgICAgICBpZihzdGF0ZS5zdGF0ZXMpe1xuICAgICAgICAgICAgc3RhdGUuZGVzY2VuZGFudHMgPSBzdGF0ZS5zdGF0ZXMuY29uY2F0KHN0YXRlLnN0YXRlcy5tYXAoZnVuY3Rpb24ocyl7cmV0dXJuIHMuZGVzY2VuZGFudHM7fSkucmVkdWNlKGZ1bmN0aW9uKGEsYil7cmV0dXJuIGEuY29uY2F0KGIpO30sW10pKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzdGF0ZS5kZXNjZW5kYW50cyA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluaXRpYWxDaGlsZHJlbjtcbiAgICAgICAgaWYoc3RhdGUudHlwZUVudW0gPT09IFNUQVRFX1RZUEVTLkNPTVBPU0lURSl7XG4gICAgICAgICAgICAvL3NldCB1cCBpbml0aWFsIHN0YXRlXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkoc3RhdGUuaW5pdGlhbCkgfHwgdHlwZW9mIHN0YXRlLmluaXRpYWwgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgICAgICAgICBzdGF0ZXNXaXRoSW5pdGlhbEF0dHJpYnV0ZXMucHVzaChzdGF0ZSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL3Rha2UgdGhlIGZpcnN0IGNoaWxkIHRoYXQgaGFzIGluaXRpYWwgdHlwZSwgb3IgZmlyc3QgY2hpbGRcbiAgICAgICAgICAgICAgICBpbml0aWFsQ2hpbGRyZW4gPSBzdGF0ZS5zdGF0ZXMuZmlsdGVyKGZ1bmN0aW9uKGNoaWxkKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkLiR0eXBlID09PSAnaW5pdGlhbCc7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzdGF0ZS5pbml0aWFsUmVmID0gW2luaXRpYWxDaGlsZHJlbi5sZW5ndGggPyBpbml0aWFsQ2hpbGRyZW5bMF0gOiBzdGF0ZS5zdGF0ZXNbMF1dO1xuICAgICAgICAgICAgICAgIGNoZWNrSW5pdGlhbFJlZihzdGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vaG9vayB1cCBoaXN0b3J5XG4gICAgICAgIGlmKHN0YXRlLnR5cGVFbnVtID09PSBTVEFURV9UWVBFUy5DT01QT1NJVEUgfHxcbiAgICAgICAgICAgICAgICBzdGF0ZS50eXBlRW51bSA9PT0gU1RBVEVfVFlQRVMuUEFSQUxMRUwpe1xuXG4gICAgICAgICAgICB2YXIgaGlzdG9yeUNoaWxkcmVuID0gc3RhdGUuc3RhdGVzLmZpbHRlcihmdW5jdGlvbihzKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcy4kdHlwZSA9PT0gJ2hpc3RvcnknO1xuICAgICAgICAgICAgfSk7IFxuXG4gICAgICAgICAgIHN0YXRlLmhpc3RvcnlSZWYgPSBoaXN0b3J5Q2hpbGRyZW47XG4gICAgICAgIH1cblxuICAgICAgICAvL25vdyBpdCdzIHNhZmUgdG8gZmlsbCBpbiBmYWtlIHN0YXRlIGlkc1xuICAgICAgICBpZighc3RhdGUuaWQpe1xuICAgICAgICAgICAgc3RhdGUuaWQgPSBnZW5lcmF0ZUlkKHN0YXRlLiR0eXBlKTtcbiAgICAgICAgICAgIGlkVG9TdGF0ZU1hcC5zZXQoc3RhdGUuaWQsIHN0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbm9ybWFsaXplIG9uRW50cnkvb25FeGl0LCB3aGljaCBjYW4gYmUgc2luZ2xlIGZuIG9yIGFycmF5LCBvciBhcnJheSBvZiBhcnJheXMgKGJsb2NrcylcbiAgICAgICAgWydvbkVudHJ5Jywnb25FeGl0J10uZm9yRWFjaChmdW5jdGlvbihwcm9wKXtcbiAgICAgICAgICBpZiAoc3RhdGVbcHJvcF0pIHtcbiAgICAgICAgICAgIGlmKCFBcnJheS5pc0FycmF5KHN0YXRlW3Byb3BdKSl7XG4gICAgICAgICAgICAgIHN0YXRlW3Byb3BdID0gW3N0YXRlW3Byb3BdXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCFzdGF0ZVtwcm9wXS5ldmVyeShmdW5jdGlvbihoYW5kbGVyKXsgcmV0dXJuIEFycmF5LmlzQXJyYXkoaGFuZGxlcik7IH0pKXtcbiAgICAgICAgICAgICAgc3RhdGVbcHJvcF0gPSBbc3RhdGVbcHJvcF1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHN0YXRlLmludm9rZXMgJiYgIUFycmF5LmlzQXJyYXkoc3RhdGUuaW52b2tlcykpIHtcbiAgICAgICAgICAgIHN0YXRlLmludm9rZXMgPSBbc3RhdGUuaW52b2tlc107XG4gICAgICAgICAgICBzdGF0ZS5pbnZva2VzLmZvckVhY2goIGludm9rZSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpbnZva2UuZmluYWxpemUgJiYgIUFycmF5LmlzQXJyYXkoaW52b2tlLmZpbmFsaXplKSkge1xuICAgICAgICAgICAgICAgIGludm9rZS5maW5hbGl6ZSA9IFtpbnZva2UuZmluYWxpemVdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9UT0RPOiBjb252ZXJ0IGV2ZW50cyB0byByZWd1bGFyIGV4cHJlc3Npb25zIGluIGFkdmFuY2VcblxuICAgIGZ1bmN0aW9uIGNoZWNrSW5pdGlhbFJlZihzdGF0ZSl7XG4gICAgICBpZighc3RhdGUuaW5pdGlhbFJlZikgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gbG9jYXRlIGluaXRpYWwgc3RhdGUgZm9yIGNvbXBvc2l0ZSBzdGF0ZTogJyArIHN0YXRlLmlkKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29ubmVjdEludGlhbEF0dHJpYnV0ZXMoKXtcbiAgICAgIGZvciAodmFyIGogPSAwLCBsZW4gPSBzdGF0ZXNXaXRoSW5pdGlhbEF0dHJpYnV0ZXMubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgdmFyIHMgPSBzdGF0ZXNXaXRoSW5pdGlhbEF0dHJpYnV0ZXNbal07XG5cbiAgICAgICAgdmFyIGluaXRpYWxTdGF0ZXMgPSBBcnJheS5pc0FycmF5KHMuaW5pdGlhbCkgPyBzLmluaXRpYWwgOiBbcy5pbml0aWFsXTtcbiAgICAgICAgcy5pbml0aWFsUmVmID0gaW5pdGlhbFN0YXRlcy5tYXAoZnVuY3Rpb24oaW5pdGlhbFN0YXRlKXsgcmV0dXJuIGlkVG9TdGF0ZU1hcC5nZXQoaW5pdGlhbFN0YXRlKTsgfSk7XG4gICAgICAgIGNoZWNrSW5pdGlhbFJlZihzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgUlhfV0hJVEVTUEFDRSA9IC9cXHMrLztcblxuICAgIGZ1bmN0aW9uIGNvbm5lY3RUcmFuc2l0aW9uR3JhcGgoKXtcbiAgICAgICAgLy9ub3JtYWxpemUgYXMgd2l0aCBvbkVudHJ5L29uRXhpdFxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdHJhbnNpdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0ID0gdHJhbnNpdGlvbnNbaV07XG4gICAgICAgICAgICBpZiAodC5vblRyYW5zaXRpb24gJiYgIUFycmF5LmlzQXJyYXkodC5vblRyYW5zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgdC5vblRyYW5zaXRpb24gPSBbdC5vblRyYW5zaXRpb25dO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL25vcm1hbGl6ZSBcImV2ZW50XCIgYXR0cmlidXRlIGludG8gXCJldmVudHNcIiBhdHRyaWJ1dGVcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdC5ldmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0LmV2ZW50cyA9IHQuZXZlbnQudHJpbSgpLnNwbGl0KFJYX1dISVRFU1BBQ0UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIHQuZXZlbnQ7XG5cbiAgICAgICAgICAgIGlmKHQudGFyZ2V0cyB8fCAodHlwZW9mIHQudGFyZ2V0ID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgICAgICAvL3RhcmdldHMgaGF2ZSBhbHJlYWR5IGJlZW4gc2V0IHVwXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9ICAgXG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiB0LnRhcmdldCA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBpZFRvU3RhdGVNYXAuZ2V0KHQudGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBpZighdGFyZ2V0KSB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBmaW5kIHRhcmdldCBzdGF0ZSB3aXRoIGlkICcgKyB0LnRhcmdldCk7XG4gICAgICAgICAgICAgICAgdC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgdC50YXJnZXRzID0gW3QudGFyZ2V0XTtcbiAgICAgICAgICAgIH1lbHNlIGlmKEFycmF5LmlzQXJyYXkodC50YXJnZXQpKXtcbiAgICAgICAgICAgICAgICB0LnRhcmdldHMgPSB0LnRhcmdldC5tYXAoZnVuY3Rpb24odGFyZ2V0KXtcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gaWRUb1N0YXRlTWFwLmdldCh0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIXRhcmdldCkgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gZmluZCB0YXJnZXQgc3RhdGUgd2l0aCBpZCAnICsgdC50YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgIH1lbHNlIGlmKHR5cGVvZiB0LnRhcmdldCA9PT0gJ29iamVjdCcpe1xuICAgICAgICAgICAgICAgIHQudGFyZ2V0cyA9IFt0LnRhcmdldF07XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zaXRpb24gdGFyZ2V0IGhhcyB1bmtub3duIHR5cGU6ICcgKyB0LnRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL2hvb2sgdXAgTENBIC0gb3B0aW1pemF0aW9uXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0cmFuc2l0aW9ucy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIHQgPSB0cmFuc2l0aW9uc1tpXTtcbiAgICAgICAgICAgIGlmKHQudGFyZ2V0cykgdC5sY2NhID0gZ2V0TENDQSh0LnNvdXJjZSx0LnRhcmdldHNbMF0pOyAgICAvL0ZJWE1FOiB3ZSB0ZWNobmljYWxseSBkbyBub3QgbmVlZCB0byBoYW5nIG9udG8gdGhlIGxjY2EuIG9ubHkgdGhlIHNjb3BlIGlzIHVzZWQgYnkgdGhlIGFsZ29yaXRobVxuXG4gICAgICAgICAgICB0LnNjb3BlID0gZ2V0U2NvcGUodCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTY29wZSh0cmFuc2l0aW9uKXtcbiAgICAgICAgLy9UcmFuc2l0aW9uIHNjb3BlIGlzIG5vcm1hbGx5IHRoZSBsZWFzdCBjb21tb24gY29tcG91bmQgYW5jZXN0b3IgKGxjY2EpLlxuICAgICAgICAvL0ludGVybmFsIHRyYW5zaXRpb25zIGhhdmUgYSBzY29wZSBlcXVhbCB0byB0aGUgc291cmNlIHN0YXRlLlxuICAgICAgICB2YXIgdHJhbnNpdGlvbklzUmVhbGx5SW50ZXJuYWwgPSBcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLnR5cGUgPT09ICdpbnRlcm5hbCcgJiZcbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24uc291cmNlLnR5cGVFbnVtID09PSBTVEFURV9UWVBFUy5DT01QT1NJVEUgJiYgICAvL2lzIHRyYW5zaXRpb24gc291cmNlIGEgY29tcG9zaXRlIHN0YXRlXG4gICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLnNvdXJjZS5wYXJlbnQgJiYgICAgLy9yb290IHN0YXRlIHdvbid0IGhhdmUgcGFyZW50XG4gICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uLnRhcmdldHMgJiYgLy9kb2VzIGl0IHRhcmdldCBpdHMgZGVzY2VuZGFudHNcbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb24udGFyZ2V0cy5ldmVyeShcbiAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbih0YXJnZXQpeyByZXR1cm4gdHJhbnNpdGlvbi5zb3VyY2UuZGVzY2VuZGFudHMuaW5kZXhPZih0YXJnZXQpID4gLTE7fSk7XG5cbiAgICAgICAgaWYoIXRyYW5zaXRpb24udGFyZ2V0cyl7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfWVsc2UgaWYodHJhbnNpdGlvbklzUmVhbGx5SW50ZXJuYWwpe1xuICAgICAgICAgICAgcmV0dXJuIHRyYW5zaXRpb24uc291cmNlOyBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gdHJhbnNpdGlvbi5sY2NhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TENDQShzMSwgczIpIHtcbiAgICAgICAgdmFyIGNvbW1vbkFuY2VzdG9ycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgbGVuID0gczEuYW5jZXN0b3JzLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICB2YXIgYW5jID0gczEuYW5jZXN0b3JzW2pdO1xuICAgICAgICAgICAgaWYoKGFuYy50eXBlRW51bSA9PT0gU1RBVEVfVFlQRVMuQ09NUE9TSVRFIHx8IGFuYy50eXBlRW51bSA9PT0gU1RBVEVfVFlQRVMuUEFSQUxMRUwpICYmXG4gICAgICAgICAgICAgICAgYW5jLmRlc2NlbmRhbnRzLmluZGV4T2YoczIpID4gLTEpe1xuICAgICAgICAgICAgICAgIGNvbW1vbkFuY2VzdG9ycy5wdXNoKGFuYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGlmKCFjb21tb25BbmNlc3RvcnMubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZCBub3QgZmluZCBMQ0EgZm9yIHN0YXRlcy5cIik7XG4gICAgICAgIHJldHVybiBjb21tb25BbmNlc3RvcnNbMF07XG4gICAgfVxuXG4gICAgLy9tYWluIGV4ZWN1dGlvbiBzdGFydHMgaGVyZVxuICAgIC8vRklYTUU6IG9ubHkgd3JhcCBpbiByb290IHN0YXRlIGlmIGl0J3Mgbm90IGEgY29tcG91bmQgc3RhdGVcbiAgICBwb3B1bGF0ZVN0YXRlSWRNYXAocm9vdFN0YXRlKTtcbiAgICB2YXIgZmFrZVJvb3RTdGF0ZSA9IHdyYXBJbkZha2VSb290U3RhdGUocm9vdFN0YXRlKTsgIC8vSSB3aXNoIHdlIGhhZCBwb2ludGVyIHNlbWFudGljcyBhbmQgY291bGQgbWFrZSB0aGlzIGEgQy1zdHlsZSBcIm91dCBhcmd1bWVudFwiLiBJbnN0ZWFkIHdlIHJldHVybiBoaW1cbiAgICB0cmF2ZXJzZShbXSxmYWtlUm9vdFN0YXRlKTtcbiAgICBjb25uZWN0VHJhbnNpdGlvbkdyYXBoKCk7XG4gICAgY29ubmVjdEludGlhbEF0dHJpYnV0ZXMoKTtcblxuICAgIHJldHVybiBmYWtlUm9vdFN0YXRlO1xufVxuXG5cbmZ1bmN0aW9uIGlzRXZlbnRQcmVmaXhNYXRjaChwcmVmaXgsIGZ1bGxOYW1lKSB7XG4gICAgcHJlZml4ID0gcHJlZml4LnJlcGxhY2UoUlhfVFJBSUxJTkdfV0lMRENBUkQsICcnKTtcblxuICAgIGlmIChwcmVmaXggPT09IGZ1bGxOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChwcmVmaXgubGVuZ3RoID4gZnVsbE5hbWUubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoZnVsbE5hbWUuY2hhckF0KHByZWZpeC5sZW5ndGgpICE9PSAnLicpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAoZnVsbE5hbWUuaW5kZXhPZihwcmVmaXgpID09PSAwKTtcbn1cblxuZnVuY3Rpb24gaXNUcmFuc2l0aW9uTWF0Y2godCwgZXZlbnROYW1lKSB7XG4gICAgcmV0dXJuIHQuZXZlbnRzLnNvbWUoKHRFdmVudCkgPT4ge1xuICAgICAgICByZXR1cm4gdEV2ZW50ID09PSAnKicgfHwgaXNFdmVudFByZWZpeE1hdGNoKHRFdmVudCwgZXZlbnROYW1lKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2N4bWxQcmVmaXhUcmFuc2l0aW9uU2VsZWN0b3IodCwgZXZlbnQsIGV2YWx1YXRvciwgc2VsZWN0RXZlbnRsZXNzVHJhbnNpdGlvbnMpIHtcbiAgICByZXR1cm4gKCBcbiAgICAgIHNlbGVjdEV2ZW50bGVzc1RyYW5zaXRpb25zID8gXG4gICAgICAgICF0LmV2ZW50cyA6XG4gICAgICAgICh0LmV2ZW50cyAmJiBldmVudCAmJiBldmVudC5uYW1lICYmIGlzVHJhbnNpdGlvbk1hdGNoKHQsIGV2ZW50Lm5hbWUpKVxuICAgICAgKVxuICAgICAgJiYgKCF0LmNvbmQgfHwgZXZhbHVhdG9yKHQuY29uZCkpO1xufVxuXG5mdW5jdGlvbiBldmVudGxlc3NUcmFuc2l0aW9uU2VsZWN0b3Ioc3RhdGUpe1xuICByZXR1cm4gc3RhdGUudHJhbnNpdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKHRyYW5zaXRpb24peyByZXR1cm4gIXRyYW5zaXRpb24uZXZlbnRzIHx8ICggdHJhbnNpdGlvbi5ldmVudHMgJiYgdHJhbnNpdGlvbi5ldmVudHMubGVuZ3RoID09PSAwICk7IH0pO1xufVxuXG4vL3ByaW9yaXR5IGNvbXBhcmlzb24gZnVuY3Rpb25zXG5mdW5jdGlvbiBnZXRUcmFuc2l0aW9uV2l0aEhpZ2hlclNvdXJjZUNoaWxkUHJpb3JpdHkoX2FyZ3MpIHtcbiAgICBsZXQgdDEgPSBfYXJnc1swXSwgdDIgPSBfYXJnc1sxXTtcbiAgICB2YXIgciA9IGdldFN0YXRlV2l0aEhpZ2hlclNvdXJjZUNoaWxkUHJpb3JpdHkodDEuc291cmNlLCB0Mi5zb3VyY2UpO1xuICAgIC8vY29tcGFyZSB0cmFuc2l0aW9ucyBiYXNlZCBmaXJzdCBvbiBkZXB0aCwgdGhlbiBiYXNlZCBvbiBkb2N1bWVudCBvcmRlclxuICAgIGlmICh0MS5zb3VyY2UuZGVwdGggPCB0Mi5zb3VyY2UuZGVwdGgpIHtcbiAgICAgICAgcmV0dXJuIHQyO1xuICAgIH0gZWxzZSBpZiAodDIuc291cmNlLmRlcHRoIDwgdDEuc291cmNlLmRlcHRoKSB7XG4gICAgICAgIHJldHVybiB0MTtcbiAgICB9IGVsc2Uge1xuICAgICAgIGlmICh0MS5kb2N1bWVudE9yZGVyIDwgdDIuZG9jdW1lbnRPcmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIHQxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHQyO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzb3J0SW5FbnRyeU9yZGVyKHMxLCBzMil7XG4gIHJldHVybiBnZXRTdGF0ZVdpdGhIaWdoZXJTb3VyY2VDaGlsZFByaW9yaXR5KHMxLCBzMikgKiAtMVxufVxuXG5mdW5jdGlvbiBnZXRTdGF0ZVdpdGhIaWdoZXJTb3VyY2VDaGlsZFByaW9yaXR5KHMxLCBzMikge1xuICAgIC8vY29tcGFyZSBzdGF0ZXMgYmFzZWQgZmlyc3Qgb24gZGVwdGgsIHRoZW4gYmFzZWQgb24gZG9jdW1lbnQgb3JkZXJcbiAgICBpZiAoczEuZGVwdGggPiBzMi5kZXB0aCkge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlIGlmIChzMS5kZXB0aCA8IHMyLmRlcHRoKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vRXF1YWxpdHlcbiAgICAgICAgaWYgKHMxLmRvY3VtZW50T3JkZXIgPCBzMi5kb2N1bWVudE9yZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIGlmIChzMS5kb2N1bWVudE9yZGVyID4gczIuZG9jdW1lbnRPcmRlcikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZU1vZGVsR2VuZXJhdG9yRm4obW9kZWxGbiwgb3B0cywgaW50ZXJwcmV0ZXIpe1xuICAgIHJldHVybiBtb2RlbEZuLmNhbGwoaW50ZXJwcmV0ZXIsXG4gICAgICAgIG9wdHMuX3gsXG4gICAgICAgIG9wdHMuX3guX3Nlc3Npb25pZCxcbiAgICAgICAgb3B0cy5feC5faW9wcm9jZXNzb3JzLFxuICAgICAgICBpbnRlcnByZXRlci5pc0luLmJpbmQoaW50ZXJwcmV0ZXIpKTtcbn1cblxuZnVuY3Rpb24gZGVzZXJpYWxpemVTZXJpYWxpemVkQ29uZmlndXJhdGlvbihzZXJpYWxpemVkQ29uZmlndXJhdGlvbixpZFRvU3RhdGVNYXApe1xuICByZXR1cm4gc2VyaWFsaXplZENvbmZpZ3VyYXRpb24ubWFwKGZ1bmN0aW9uKGlkKXtcbiAgICB2YXIgc3RhdGUgPSBpZFRvU3RhdGVNYXAuZ2V0KGlkKTtcbiAgICBpZighc3RhdGUpIHRocm93IG5ldyBFcnJvcignRXJyb3IgbG9hZGluZyBzZXJpYWxpemVkIGNvbmZpZ3VyYXRpb24uIFVuYWJsZSB0byBsb2NhdGUgc3RhdGUgd2l0aCBpZCAnICsgaWQpO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlc2VyaWFsaXplSGlzdG9yeShzZXJpYWxpemVkSGlzdG9yeSxpZFRvU3RhdGVNYXApe1xuICB2YXIgbyA9IHt9O1xuICBPYmplY3Qua2V5cyhzZXJpYWxpemVkSGlzdG9yeSkuZm9yRWFjaChmdW5jdGlvbihzaWQpe1xuICAgIG9bc2lkXSA9IHNlcmlhbGl6ZWRIaXN0b3J5W3NpZF0ubWFwKGZ1bmN0aW9uKGlkKXtcbiAgICAgIHZhciBzdGF0ZSA9IGlkVG9TdGF0ZU1hcC5nZXQoaWQpO1xuICAgICAgaWYoIXN0YXRlKSB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGxvYWRpbmcgc2VyaWFsaXplZCBoaXN0b3J5LiBVbmFibGUgdG8gbG9jYXRlIHN0YXRlIHdpdGggaWQgJyArIGlkKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvO1xufVxuXG4iLCIvL21vZGVsIGFjY2Vzc29yIGZ1bmN0aW9uc1xuY29uc3QgcXVlcnkgPSB7XG4gICAgaXNEZXNjZW5kYW50IDogZnVuY3Rpb24oczEsIHMyKXtcbiAgICAgIC8vUmV0dXJucyAndHJ1ZScgaWYgc3RhdGUxIGlzIGEgZGVzY2VuZGFudCBvZiBzdGF0ZTIgKGEgY2hpbGQsIG9yIGEgY2hpbGQgb2YgYSBjaGlsZCwgb3IgYSBjaGlsZCBvZiBhIGNoaWxkIG9mIGEgY2hpbGQsIGV0Yy4pIE90aGVyd2lzZSByZXR1cm5zICdmYWxzZScuXG4gICAgICByZXR1cm4gczIuZGVzY2VuZGFudHMuaW5kZXhPZihzMSkgPiAtMTtcbiAgICB9LFxuICAgIGdldEFuY2VzdG9yczogZnVuY3Rpb24ocywgcm9vdCkge1xuICAgICAgICB2YXIgYW5jZXN0b3JzLCBpbmRleCwgc3RhdGU7XG4gICAgICAgIGluZGV4ID0gcy5hbmNlc3RvcnMuaW5kZXhPZihyb290KTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBzLmFuY2VzdG9ycy5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcy5hbmNlc3RvcnM7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGdldEFuY2VzdG9yc09yU2VsZjogZnVuY3Rpb24ocywgcm9vdCkge1xuICAgICAgICByZXR1cm4gW3NdLmNvbmNhdChxdWVyeS5nZXRBbmNlc3RvcnMocywgcm9vdCkpO1xuICAgIH0sXG4gICAgZ2V0RGVzY2VuZGFudHNPclNlbGY6IGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgcmV0dXJuIFtzXS5jb25jYXQocy5kZXNjZW5kYW50cyk7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBxdWVyeTtcbiIsIi8vICAgQ29weXJpZ2h0IDIwMTItMjAxMiBKYWNvYiBCZWFyZCwgSU5GSUNPTiwgYW5kIG90aGVyIFNDSU9OIGNvbnRyaWJ1dG9yc1xuLy9cbi8vICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vICAgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyAgIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vICAgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gICBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vICAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gICBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuLyoqXG4gKiBTQ0lPTi1DT1JFIGdsb2JhbCBvYmplY3RcbiAqIEBuYW1lc3BhY2Ugc2Npb25cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtmdW5jdGlvbn0gRm5Nb2RlbFxuICovXG5cbi8qKlxuICogQW4gQXJyYXkgb2Ygc3RyaW5ncyByZXByZXNlbnRpbmcgdGhlIGlkcyBhbGwgb2YgdGhlIGJhc2ljIHN0YXRlcyB0aGVcbiAqIGludGVycHJldGVyIGlzIGluIGFmdGVyIGEgYmlnLXN0ZXAgY29tcGxldGVzLlxuICogQHR5cGVkZWYge0FycmF5PHN0cmluZz59IENvbmZpZ3VyYXRpb25cbiAqL1xuXG4vKipcbiAqIEEgc2V0IG9mIGJhc2ljIGFuZCBjb21wb3NpdGUgc3RhdGUgaWRzLlxuICogQHR5cGVkZWYge0FycmF5PHN0cmluZz59IEZ1bGxDb25maWd1cmF0aW9uXG4gKi9cblxuLyoqXG4gKiBBIHNldCBvZiBiYXNpYyBhbmQgY29tcG9zaXRlIHN0YXRlIGlkcy5cbiAqIEB0eXBlZGVmIHtBcnJheTxzdHJpbmc+fSBGdWxsQ29uZmlndXJhdGlvblxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCd0aW55LWV2ZW50cycpLkV2ZW50RW1pdHRlcixcbiAgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKSxcbiAgQXJyYXlTZXQgPSByZXF1aXJlKCcuL0FycmF5U2V0JyksXG4gIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyksXG4gIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKSxcbiAgcXVlcnkgPSByZXF1aXJlKCcuL3F1ZXJ5JyksXG4gIGV4dGVuZCA9IGhlbHBlcnMuZXh0ZW5kLFxuICB0cmFuc2l0aW9uV2l0aFRhcmdldHMgPSBoZWxwZXJzLnRyYW5zaXRpb25XaXRoVGFyZ2V0cyxcbiAgdHJhbnNpdGlvbkNvbXBhcmF0b3IgPSBoZWxwZXJzLnRyYW5zaXRpb25Db21wYXJhdG9yLFxuICBpbml0aWFsaXplTW9kZWwgPSBoZWxwZXJzLmluaXRpYWxpemVNb2RlbCxcbiAgaXNFdmVudFByZWZpeE1hdGNoID0gaGVscGVycy5pc0V2ZW50UHJlZml4TWF0Y2gsXG4gIGlzVHJhbnNpdGlvbk1hdGNoID0gaGVscGVycy5pc1RyYW5zaXRpb25NYXRjaCxcbiAgc2N4bWxQcmVmaXhUcmFuc2l0aW9uU2VsZWN0b3IgPSBoZWxwZXJzLnNjeG1sUHJlZml4VHJhbnNpdGlvblNlbGVjdG9yLFxuICBldmVudGxlc3NUcmFuc2l0aW9uU2VsZWN0b3IgPSBoZWxwZXJzLmV2ZW50bGVzc1RyYW5zaXRpb25TZWxlY3RvcixcbiAgZ2V0VHJhbnNpdGlvbldpdGhIaWdoZXJTb3VyY2VDaGlsZFByaW9yaXR5ID0gaGVscGVycy5nZXRUcmFuc2l0aW9uV2l0aEhpZ2hlclNvdXJjZUNoaWxkUHJpb3JpdHksXG4gIHNvcnRJbkVudHJ5T3JkZXIgPSBoZWxwZXJzLnNvcnRJbkVudHJ5T3JkZXIsXG4gIGdldFN0YXRlV2l0aEhpZ2hlclNvdXJjZUNoaWxkUHJpb3JpdHkgPSBoZWxwZXJzLmdldFN0YXRlV2l0aEhpZ2hlclNvdXJjZUNoaWxkUHJpb3JpdHksXG4gIGluaXRpYWxpemVNb2RlbEdlbmVyYXRvckZuID0gaGVscGVycy5pbml0aWFsaXplTW9kZWxHZW5lcmF0b3JGbixcbiAgZGVzZXJpYWxpemVTZXJpYWxpemVkQ29uZmlndXJhdGlvbiA9IGhlbHBlcnMuZGVzZXJpYWxpemVTZXJpYWxpemVkQ29uZmlndXJhdGlvbixcbiAgZGVzZXJpYWxpemVIaXN0b3J5ID0gaGVscGVycy5kZXNlcmlhbGl6ZUhpc3RvcnksXG4gIEJBU0lDID0gY29uc3RhbnRzLlNUQVRFX1RZUEVTLkJBU0lDLFxuICBDT01QT1NJVEUgPSBjb25zdGFudHMuU1RBVEVfVFlQRVMuQ09NUE9TSVRFLFxuICBQQVJBTExFTCA9IGNvbnN0YW50cy5TVEFURV9UWVBFUy5QQVJBTExFTCxcbiAgSElTVE9SWSA9IGNvbnN0YW50cy5TVEFURV9UWVBFUy5ISVNUT1JZLFxuICBJTklUSUFMID0gY29uc3RhbnRzLlNUQVRFX1RZUEVTLklOSVRJQUwsXG4gIEZJTkFMID0gY29uc3RhbnRzLlNUQVRFX1RZUEVTLkZJTkFMLFxuICBTQ1hNTF9JT1BST0NFU1NPUl9UWVBFICA9IGNvbnN0YW50cy5TQ1hNTF9JT1BST0NFU1NPUl9UWVBFO1xuXG5jb25zdCBwcmludFRyYWNlID0gdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICEhcHJvY2Vzcy5lbnYuREVCVUc7XG5cbkJhc2VJbnRlcnByZXRlci5FVkVOVFMgPSBbXG4gICdvbkVudHJ5JyxcbiAgJ29uRXhpdCcsXG4gICdvblRyYW5zaXRpb24nLFxuICAnb25EZWZhdWx0RW50cnknLFxuICAnb25FcnJvcicsXG4gICdvbkJpZ1N0ZXBCZWdpbicsXG4gICdvbkJpZ1N0ZXBFbmQnLFxuICAnb25CaWdTdGVwU3VzcGVuZCcsXG4gICdvbkJpZ1N0ZXBSZXN1bWUnLFxuICAnb25TbWFsbFN0ZXBCZWdpbicsXG4gICdvblNtYWxsU3RlcEVuZCcsXG4gICdvbkJpZ1N0ZXBFbmQnLFxuICAnb25FeGl0SW50ZXJwcmV0ZXInXG5dO1xuXG4vKiogXG4gKiBAZGVzY3JpcHRpb24gVGhlIFNDWE1MIGNvbnN0cnVjdG9yIGNyZWF0ZXMgYW4gaW50ZXJwcmV0ZXIgaW5zdGFuY2UgZnJvbSBhIG1vZGVsIG9iamVjdC5cbiAqIEBhYnN0cmFjdFxuICogQGNsYXNzIEJhc2VJbnRlcnByZXRlclxuICogQG1lbWJlcm9mIHNjaW9uXG4gKiBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcbiAqIEBwYXJhbSB7Rm5Nb2RlbH0gbW9kZWxPckZuR2VuZXJhdG9yXG4gKiBAcGFyYW0gb3B0c1xuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLnNlc3Npb25pZF0gVXNlZCB0byBwb3B1bGF0ZSBTQ1hNTCBfc2Vzc2lvbmlkLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gW29wdHMuZ2VuZXJhdGVTZXNzaW9uaWRdIEZhY3RvcnkgdXNlZCB0byBnZW5lcmF0ZSBzZXNzaW9uaWQgaWYgc2Vzc2lvbmlkIGtleXdvcmQgaXMgbm90IHNwZWNpZmllZFxuICogQHBhcmFtIHtNYXA8c3RyaW5nLCBCYXNlSW50ZXJwcmV0ZXI+fSBbb3B0cy5zZXNzaW9uUmVnaXN0cnldIE1hcCB1c2VkIHRvIG1hcCBzZXNzaW9uaWQgc3RyaW5ncyB0byBTdGF0ZWNoYXJ0IGluc3RhbmNlcy5cbiAqIEBwYXJhbSBbb3B0cy5TZXRdIENsYXNzIHRvIHVzZSBhcyBhbiBBcnJheVNldC4gRGVmYXVsdHMgdG8gRVM2IFNldC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0cy5wYXJhbXNdICBVc2VkIHRvIHBhc3MgcGFyYW1zIGZyb20gaW52b2tlLiBTZXRzIHRoZSBkYXRhbW9kZWwgd2hlbiBpbnRlcnByZXRlciBpcyBpbnN0YW50aWF0ZWQuXG4gKiBAcGFyYW0ge1NuYXBzaG90fSBbb3B0cy5zbmFwc2hvdF0gU3RhdGUgbWFjaGluZSBzbmFwc2hvdC4gVXNlZCB0byByZXN0b3JlIGEgc2VyaWFsaXplZCBzdGF0ZSBtYWNoaW5lLlxuICogQHBhcmFtIHtTdGF0ZWNoYXJ0fSBbb3B0cy5wYXJlbnRTZXNzaW9uXSAgVXNlZCB0byBwYXNzIHBhcmVudCBzZXNzaW9uIGR1cmluZyBpbnZva2UuXG4gKiBAcGFyYW0ge3N0cmluZyB9W29wdHMuaW52b2tlaWRdICBTdXBwb3J0IGZvciBpZCBvZiBpbnZva2UgZWxlbWVudCBhdCBydW50aW1lLlxuICogQHBhcmFtIFtvcHRzLmNvbnNvbGVdXG4gKiBAcGFyYW0gW29wdHMudHJhbnNpdGlvblNlbGVjdG9yXVxuICogQHBhcmFtIFtvcHRzLmN1c3RvbUNhbmNlbF1cbiAqIEBwYXJhbSBbb3B0cy5jdXN0b21TZW5kXVxuICogQHBhcmFtIFtvcHRzLnNlbmRBc3luY11cbiAqIEBwYXJhbSBbb3B0cy5kb1NlbmRdXG4gKiBAcGFyYW0gW29wdHMuaW52b2tlcnNdXG4gKiBAcGFyYW0gW29wdHMueG1sUGFyc2VyXVxuICogQHBhcmFtIFtvcHRzLmludGVycHJldGVyU2NyaXB0aW5nQ29udGV4dF1cbiAqL1xuZnVuY3Rpb24gQmFzZUludGVycHJldGVyKG1vZGVsT3JGbkdlbmVyYXRvciwgb3B0cyl7XG5cbiAgICBFdmVudEVtaXR0ZXIuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuX3NjcmlwdGluZ0NvbnRleHQgPSBvcHRzLmludGVycHJldGVyU2NyaXB0aW5nQ29udGV4dCB8fCAob3B0cy5JbnRlcnByZXRlclNjcmlwdGluZ0NvbnRleHQgPyBuZXcgb3B0cy5JbnRlcnByZXRlclNjcmlwdGluZ0NvbnRleHQodGhpcykgOiB7fSk7IFxuXG5cbiAgICB0aGlzLm9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgdGhpcy5vcHRzLmdlbmVyYXRlU2Vzc2lvbmlkID0gdGhpcy5vcHRzLmdlbmVyYXRlU2Vzc2lvbmlkIHx8IEJhc2VJbnRlcnByZXRlci5nZW5lcmF0ZVNlc3Npb25pZDtcbiAgICB0aGlzLm9wdHMuc2Vzc2lvbmlkID0gdGhpcy5vcHRzLnNlc3Npb25pZCB8fCB0aGlzLm9wdHMuZ2VuZXJhdGVTZXNzaW9uaWQoKTtcbiAgICB0aGlzLm9wdHMuc2Vzc2lvblJlZ2lzdHJ5ID0gdGhpcy5vcHRzLnNlc3Npb25SZWdpc3RyeSB8fCBCYXNlSW50ZXJwcmV0ZXIuc2Vzc2lvblJlZ2lzdHJ5OyAgLy9UT0RPOiBkZWZpbmUgYSBiZXR0ZXIgaW50ZXJmYWNlLiBGb3Igbm93LCBhc3N1bWUgYSBNYXA8c2Vzc2lvbmlkLCBzZXNzaW9uPlxuXG5cbiAgICBsZXQgX2lvcHJvY2Vzc29ycyA9IHt9O1xuICAgIF9pb3Byb2Nlc3NvcnNbU0NYTUxfSU9QUk9DRVNTT1JfVFlQRV0gPSB7XG4gICAgICBsb2NhdGlvbiA6IGAjX3NjeG1sXyR7dGhpcy5vcHRzLnNlc3Npb25pZH1gXG4gICAgfVxuICAgIF9pb3Byb2Nlc3NvcnMuc2N4bWwgPSBfaW9wcm9jZXNzb3JzW1NDWE1MX0lPUFJPQ0VTU09SX1RZUEVdOyAgICAvL2FsaWFzXG5cbiAgICAvL1NDWE1MIHN5c3RlbSB2YXJpYWJsZXM6XG4gICAgb3B0cy5feCA9IHtcbiAgICAgICAgX3Nlc3Npb25pZCA6IG9wdHMuc2Vzc2lvbmlkLFxuICAgICAgICBfaW9wcm9jZXNzb3JzIDogX2lvcHJvY2Vzc29yc1xuICAgIH07XG5cblxuICAgIHZhciBtb2RlbDtcbiAgICBpZih0eXBlb2YgbW9kZWxPckZuR2VuZXJhdG9yID09PSAnZnVuY3Rpb24nKXtcbiAgICAgICAgbW9kZWwgPSBpbml0aWFsaXplTW9kZWxHZW5lcmF0b3JGbihtb2RlbE9yRm5HZW5lcmF0b3IsIG9wdHMsIHRoaXMpO1xuICAgIH1lbHNlIGlmKHR5cGVvZiBtb2RlbE9yRm5HZW5lcmF0b3IgPT09ICdvYmplY3QnKXtcbiAgICAgICAgbW9kZWwgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1vZGVsT3JGbkdlbmVyYXRvcikpOyAvL2Fzc3VtZSBvYmplY3RcbiAgICB9ZWxzZXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIG1vZGVsIHR5cGUuIEV4cGVjdGVkIG1vZGVsIGZhY3RvcnkgZnVuY3Rpb24sIG9yIHNjanNvbiBvYmplY3QuJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fbW9kZWwgPSBpbml0aWFsaXplTW9kZWwobW9kZWwpO1xuXG4gICAgdGhpcy5vcHRzLmNvbnNvbGUgPSBvcHRzLmNvbnNvbGUgfHwgKHR5cGVvZiBjb25zb2xlID09PSAndW5kZWZpbmVkJyA/IHtsb2cgOiBmdW5jdGlvbigpe319IDogY29uc29sZSk7ICAgLy9yZWx5IG9uIGdsb2JhbCBjb25zb2xlIGlmIHRoaXMgY29uc29sZSBpcyB1bmRlZmluZWRcbiAgICB0aGlzLm9wdHMuU2V0ID0gdGhpcy5vcHRzLlNldCB8fCBBcnJheVNldDtcbiAgICB0aGlzLm9wdHMudHJhbnNpdGlvblNlbGVjdG9yID0gdGhpcy5vcHRzLnRyYW5zaXRpb25TZWxlY3RvciB8fCBzY3htbFByZWZpeFRyYW5zaXRpb25TZWxlY3RvcjtcblxuICAgIHRoaXMub3B0cy5zZXNzaW9uUmVnaXN0cnkuc2V0KFN0cmluZyh0aGlzLm9wdHMuc2Vzc2lvbmlkKSwgdGhpcyk7XG5cbiAgICB0aGlzLl9zY3JpcHRpbmdDb250ZXh0LmxvZyA9IHRoaXMuX3NjcmlwdGluZ0NvbnRleHQubG9nIHx8IChmdW5jdGlvbiBsb2coKXsgXG4gICAgICBpZih0aGlzLm9wdHMuY29uc29sZS5sb2cuYXBwbHkpe1xuICAgICAgICB0aGlzLm9wdHMuY29uc29sZS5sb2cuYXBwbHkodGhpcy5vcHRzLmNvbnNvbGUsIGFyZ3VtZW50cyk7IFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZyBvbiBvbGRlciBJRSBkb2VzIG5vdCBzdXBwb3J0IEZ1bmN0aW9uLmFwcGx5LCBzbyBqdXN0IHBhc3MgaGltIHRoZSBmaXJzdCBhcmd1bWVudC4gQmVzdCB3ZSBjYW4gZG8gZm9yIG5vdy5cbiAgICAgICAgdGhpcy5vcHRzLmNvbnNvbGUubG9nKEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShhcmd1bWVudHMpLmpvaW4oJywnKSk7IFxuICAgICAgfVxuICAgIH0uYmluZCh0aGlzKSk7ICAgLy9zZXQgdXAgZGVmYXVsdCBzY3JpcHRpbmcgY29udGV4dCBsb2cgZnVuY3Rpb25cblxuICAgIHRoaXMuX2V4dGVybmFsRXZlbnRRdWV1ZSA9IFtdO1xuICAgIHRoaXMuX2ludGVybmFsRXZlbnRRdWV1ZSA9IFtdO1xuXG4gICAgaWYob3B0cy5wYXJhbXMpe1xuICAgICAgdGhpcy5fbW9kZWwuJGRlc2VyaWFsaXplRGF0YW1vZGVsKG9wdHMucGFyYW1zKTsgICAvL2xvYWQgdXAgdGhlIGRhdGFtb2RlbFxuICAgIH1cblxuICAgIC8vY2hlY2sgaWYgd2UncmUgbG9hZGluZyBmcm9tIGEgcHJldmlvdXMgc25hcHNob3RcbiAgICBpZihvcHRzLnNuYXBzaG90KXtcbiAgICAgIHRoaXMuX2NvbmZpZ3VyYXRpb24gPSBuZXcgdGhpcy5vcHRzLlNldChkZXNlcmlhbGl6ZVNlcmlhbGl6ZWRDb25maWd1cmF0aW9uKG9wdHMuc25hcHNob3RbMF0sIHRoaXMuX21vZGVsLiRpZFRvU3RhdGVNYXApKTtcbiAgICAgIHRoaXMuX2hpc3RvcnlWYWx1ZSA9IGRlc2VyaWFsaXplSGlzdG9yeShvcHRzLnNuYXBzaG90WzFdLCB0aGlzLl9tb2RlbC4kaWRUb1N0YXRlTWFwKTsgXG4gICAgICB0aGlzLl9pc0luRmluYWxTdGF0ZSA9IG9wdHMuc25hcHNob3RbMl07XG4gICAgICB0aGlzLl9tb2RlbC4kZGVzZXJpYWxpemVEYXRhbW9kZWwob3B0cy5zbmFwc2hvdFszXSk7ICAgLy9sb2FkIHVwIHRoZSBkYXRhbW9kZWxcbiAgICAgIHRoaXMuX2ludGVybmFsRXZlbnRRdWV1ZSA9IG9wdHMuc25hcHNob3RbNF07XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLl9jb25maWd1cmF0aW9uID0gbmV3IHRoaXMub3B0cy5TZXQoKTtcbiAgICAgIHRoaXMuX2hpc3RvcnlWYWx1ZSA9IHt9O1xuICAgICAgdGhpcy5faXNJbkZpbmFsU3RhdGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvL2FkZCBkZWJ1ZyBsb2dnaW5nXG4gICAgQmFzZUludGVycHJldGVyLkVWRU5UUy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgIHRoaXMub24oZXZlbnQsIHRoaXMuX2xvZy5iaW5kKHRoaXMsZXZlbnQpKTtcbiAgICB9LCB0aGlzKTtcbn1cblxuLy9zb21lIGdsb2JhbCBzaW5nbGV0b25zIHRvIHVzZSB0byBnZW5lcmF0ZSBpbi1tZW1vcnkgc2Vzc2lvbiBpZHMsIGluIGNhc2UgdGhlIHVzZXIgZG9lcyBub3Qgc3BlY2lmeSB0aGVzZSBkYXRhIHN0cnVjdHVyZXNcbkJhc2VJbnRlcnByZXRlci5zZXNzaW9uSWRDb3VudGVyID0gMTtcbkJhc2VJbnRlcnByZXRlci5nZW5lcmF0ZVNlc3Npb25pZCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiBCYXNlSW50ZXJwcmV0ZXIuc2Vzc2lvbklkQ291bnRlcisrO1xufVxuQmFzZUludGVycHJldGVyLnNlc3Npb25SZWdpc3RyeSA9IG5ldyBNYXAoKTtcblxuLyoqXG4gKiBAaW50ZXJmYWNlIEV2ZW50RW1pdHRlclxuICovXG5cbi8qKlxuKiBAZXZlbnQgQmFzZUludGVycHJldGVyI29uRXJyb3JcbiogQHByb3BlcnR5IHtzdHJpbmd9IHRhZ25hbWUgVGhlIG5hbWUgb2YgdGhlIGVsZW1lbnQgdGhhdCBwcm9kdWNlZCB0aGUgZXJyb3IuIFxuKiBAcHJvcGVydHkge251bWJlcn0gbGluZSBUaGUgbGluZSBpbiB0aGUgc291cmNlIGZpbGUgaW4gd2hpY2ggdGhlIGVycm9yIG9jY3VycmVkLlxuKiBAcHJvcGVydHkge251bWJlcn0gY29sdW1uIFRoZSBjb2x1bW4gaW4gdGhlIHNvdXJjZSBmaWxlIGluIHdoaWNoIHRoZSBlcnJvciBvY2N1cnJlZC5cbiogQHByb3BlcnR5IHtzdHJpbmd9IHJlYXNvbiBBbiBpbmZvcm1hdGl2ZSBlcnJvciBtZXNzYWdlLiBUaGUgdGV4dCBpcyBwbGF0Zm9ybS1zcGVjaWZpYyBhbmQgc3ViamVjdCB0byBjaGFuZ2UuXG4qL1xuXG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbmFtZSBFdmVudEVtaXR0ZXIucHJvdG90eXBlI29uXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtjYWxsYmFja30gbGlzdGVuZXJcbiAqL1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSNvbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtjYWxsYmFja30gbGlzdGVuZXJcbiAqL1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSNvZmZcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge2NhbGxiYWNrfSBsaXN0ZW5lclxuICovXG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbmFtZSBFdmVudEVtaXR0ZXIucHJvdG90eXBlI2VtaXRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge2FueX0gYXJnc1xuICovXG5cbkJhc2VJbnRlcnByZXRlci5wcm90b3R5cGUgPSBleHRlbmQoYmVnZXQoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSkse1xuICBcbiAgICAvKiogXG4gICAgKiBDYW5jZWxzIHRoZSBzZXNzaW9uLiBUaGlzIGNsZWFycyBhbGwgdGltZXJzOyBwdXRzIHRoZSBpbnRlcnByZXRlciBpbiBhXG4gICAgKiBmaW5hbCBzdGF0ZTsgYW5kIHJ1bnMgYWxsIGV4aXQgYWN0aW9ucyBvbiBjdXJyZW50IHN0YXRlcy5cbiAgICAqIEBtZW1iZXJvZiBCYXNlSW50ZXJwcmV0ZXIucHJvdG90eXBlXG4gICAgKi9cbiAgICBjYW5jZWwgOiBmdW5jdGlvbigpe1xuICAgICAgZGVsZXRlIHRoaXMub3B0cy5wYXJlbnRTZXNzaW9uO1xuICAgICAgaWYodGhpcy5faXNJbkZpbmFsU3RhdGUpIHJldHVybjtcbiAgICAgIHRoaXMuX2lzSW5GaW5hbFN0YXRlID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2xvZyhgc2Vzc2lvbiBjYW5jZWxsZWQgJHt0aGlzLm9wdHMuaW52b2tlaWR9YCk7XG4gICAgICB0aGlzLl9leGl0SW50ZXJwcmV0ZXIobnVsbCk7XG4gICAgfSxcblxuICAgIF9leGl0SW50ZXJwcmV0ZXIgOiBmdW5jdGlvbihldmVudCl7XG4gICAgICAvL1RPRE86IGNhbmNlbCBpbnZva2VkIHNlc3Npb25zXG4gICAgICAvL2NhbmNlbCBhbGwgZGVsYXllZCBzZW5kcyB3aGVuIHdlIGVudGVyIGludG8gYSBmaW5hbCBzdGF0ZS5cbiAgICAgIHRoaXMuX2NhbmNlbEFsbERlbGF5ZWRTZW5kcygpO1xuXG4gICAgICBsZXQgc3RhdGVzVG9FeGl0ID0gdGhpcy5fZ2V0RnVsbENvbmZpZ3VyYXRpb24oKS5zb3J0KGdldFN0YXRlV2l0aEhpZ2hlclNvdXJjZUNoaWxkUHJpb3JpdHkpO1xuXG4gICAgICBmb3IgKHZhciBqID0gMCwgbGVuID0gc3RhdGVzVG9FeGl0Lmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgdmFyIHN0YXRlRXhpdGVkID0gc3RhdGVzVG9FeGl0W2pdO1xuXG4gICAgICAgICAgaWYoc3RhdGVFeGl0ZWQub25FeGl0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgZXhpdElkeCA9IDAsIGV4aXRMZW4gPSBzdGF0ZUV4aXRlZC5vbkV4aXQubGVuZ3RoOyBleGl0SWR4IDwgZXhpdExlbjsgZXhpdElkeCsrKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgYmxvY2sgPSBzdGF0ZUV4aXRlZC5vbkV4aXRbZXhpdElkeF07XG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBibG9ja0lkeCA9IDAsIGJsb2NrTGVuID0gYmxvY2subGVuZ3RoOyBibG9ja0lkeCA8IGJsb2NrTGVuOyBibG9ja0lkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvblJlZiA9IGJsb2NrW2Jsb2NrSWR4XTtcbiAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uUmVmLmNhbGwodGhpcy5fc2NyaXB0aW5nQ29udGV4dCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVFcnJvcihlLCBhY3Rpb25SZWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy9jYW5jZWwgaW52b2tlZCBzZXNzaW9uXG4gICAgICAgICAgaWYoc3RhdGVFeGl0ZWQuaW52b2tlcykgc3RhdGVFeGl0ZWQuaW52b2tlcy5mb3JFYWNoKCBpbnZva2UgPT4ge1xuICAgICAgICAgICAgdGhpcy5fc2NyaXB0aW5nQ29udGV4dC5jYW5jZWxJbnZva2UoaW52b2tlLmlkKTtcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgLy9pZiBoZSBpcyBhIHRvcC1sZXZlbCA8ZmluYWw+IHN0YXRlLCB0aGVuIHJldHVybiB0aGUgZG9uZSBldmVudFxuICAgICAgICAgIGlmKCBzdGF0ZUV4aXRlZC4kdHlwZSA9PT0gJ2ZpbmFsJyAmJlxuICAgICAgICAgICAgICBzdGF0ZUV4aXRlZC5wYXJlbnQuJHR5cGUgPT09ICdzY3htbCcpe1xuXG4gICAgICAgICAgICBpZih0aGlzLm9wdHMucGFyZW50U2Vzc2lvbil7XG4gICAgICAgICAgICAgIHRoaXMuX3NjcmlwdGluZ0NvbnRleHQuc2VuZCh7XG4gICAgICAgICAgICAgICAgdGFyZ2V0OiAnI19wYXJlbnQnLCBcbiAgICAgICAgICAgICAgICBuYW1lOiAnZG9uZS5pbnZva2UuJyArIHRoaXMub3B0cy5pbnZva2VpZCxcbiAgICAgICAgICAgICAgICBkYXRhIDogc3RhdGVFeGl0ZWQuZG9uZWRhdGEgJiYgc3RhdGVFeGl0ZWQuZG9uZWRhdGEuY2FsbCh0aGlzLl9zY3JpcHRpbmdDb250ZXh0LCBldmVudClcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3B0cy5zZXNzaW9uUmVnaXN0cnkuZGVsZXRlKHRoaXMub3B0cy5zZXNzaW9uaWQpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdvbkV4aXRJbnRlcnByZXRlcicsIGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgLyoqIFxuICAgICAqIFN0YXJ0cyB0aGUgaW50ZXJwcmV0ZXIuIFNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbmNlLCBhbmQgc2hvdWxkIGJlIGNhbGxlZFxuICAgICAqIGJlZm9yZSBTdGF0ZWNoYXJ0LnByb3RvdHlwZSNnZW4gaXMgY2FsbGVkIGZvciB0aGUgZmlyc3QgdGltZS4gIFJldHVybnMgYVxuICAgICAqIENvbmZpZ3VyYXRpb24uXG4gICAgICogQHJldHVybiB7Q29uZmlndXJhdGlvbn1cbiAgICAgKiBAbWVtYmVyb2YgQmFzZUludGVycHJldGVyLnByb3RvdHlwZVxuICAgICAqIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25FbnRyeVxuICAgICAqIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25FeGl0XG4gICAgICogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvblRyYW5zaXRpb25cbiAgICAgKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uRGVmYXVsdEVudHJ5XG4gICAgICogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkVycm9yXG4gICAgICogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkJpZ1N0ZXBCZWdpblxuICAgICAqIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25CaWdTdGVwRW5kXG4gICAgICogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkJpZ1N0ZXBTdXNwZW5kXG4gICAgICogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkJpZ1N0ZXBSZXN1bWVcbiAgICAgKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uU21hbGxTdGVwQmVnaW5cbiAgICAgKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uU21hbGxTdGVwRW5kXG4gICAgICogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkJpZ1N0ZXBFbmRcbiAgICAgKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uRXhpdEludGVycHJldGVyXG4gICAgICovXG4gICAgc3RhcnQgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5faW5pdFN0YXJ0KCk7XG4gICAgICAgIHRoaXMuX3BlcmZvcm1CaWdTdGVwKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbmZpZ3VyYXRpb24oKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGNhbGxiYWNrIGlzIGRpc3BsYXllZCBhcyBhIGdsb2JhbCBtZW1iZXIuXG4gICAgICogQGNhbGxiYWNrIGdlbkNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gICAgICogQHBhcmFtIHtDb25maWd1cmF0aW9ufSBjb25maWd1cmF0aW9uXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBTdGFydHMgdGhlIGludGVycHJldGVyIGFzeW5jaHJvbm91c2x5XG4gICAgICogQHBhcmFtICB7Z2VuQ2FsbGJhY2t9IGNiIENhbGxiYWNrIGludm9rZWQgd2l0aCBhbiBlcnJvciBvciB0aGUgaW50ZXJwcmV0ZXIncyBzdGFibGUgY29uZmlndXJhdGlvblxuICAgICAqIEBtZW1iZXJvZiBCYXNlSW50ZXJwcmV0ZXIucHJvdG90eXBlIFxuICAgICAqIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25FbnRyeVxuICAgICAqIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25FeGl0XG4gICAgICogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvblRyYW5zaXRpb25cbiAgICAgKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uRGVmYXVsdEVudHJ5XG4gICAgICogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkVycm9yXG4gICAgICogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkJpZ1N0ZXBCZWdpblxuICAgICAqIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25CaWdTdGVwRW5kXG4gICAgICogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkJpZ1N0ZXBTdXNwZW5kXG4gICAgICogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkJpZ1N0ZXBSZXN1bWVcbiAgICAgKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uU21hbGxTdGVwQmVnaW5cbiAgICAgKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uU21hbGxTdGVwRW5kXG4gICAgICogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkJpZ1N0ZXBFbmRcbiAgICAgKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uRXhpdEludGVycHJldGVyXG4gICAgICovXG4gICAgc3RhcnRBc3luYyA6IGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIGNiID0gdGhpcy5faW5pdFN0YXJ0KGNiKTtcbiAgICAgICAgdGhpcy5nZW5Bc3luYyhudWxsLCBjYik7XG4gICAgfSxcblxuICAgIF9pbml0U3RhcnQgOiBmdW5jdGlvbihjYil7XG4gICAgICAgIGlmICh0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNiID0gbm9wO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbG9nKFwicGVyZm9ybWluZyBpbml0aWFsIGJpZyBzdGVwXCIpO1xuXG4gICAgICAgIC8vV2UgZWZmZWN0aXZlbHkgbmVlZCB0byBmaWd1cmUgb3V0IHN0YXRlcyB0byBlbnRlciBoZXJlIHRvIHBvcHVsYXRlIGluaXRpYWwgY29uZmlnLiBhc3N1bWluZyByb290IGlzIGNvbXBvdW5kIHN0YXRlIG1ha2VzIHRoaXMgc2ltcGxlLlxuICAgICAgICAvL2J1dCBpZiB3ZSB3YW50IGl0IHRvIGJlIHBhcmFsbGVsLCB0aGVuIHRoaXMgYmVjb21lcyBtb3JlIGNvbXBsZXguIHNvIHdoZW4gaW5pdGlhbGl6aW5nIHRoZSBtb2RlbCwgd2UgYWRkIGEgJ2Zha2UnIHJvb3Qgc3RhdGUsIHdoaWNoXG4gICAgICAgIC8vbWFrZXMgdGhlIGZvbGxvd2luZyBvcGVyYXRpb24gc2FmZS5cbiAgICAgICAgdGhpcy5fbW9kZWwuaW5pdGlhbFJlZi5mb3JFYWNoKCBzID0+IHRoaXMuX2NvbmZpZ3VyYXRpb24uYWRkKHMpICk7XG5cbiAgICAgICAgcmV0dXJuIGNiO1xuICAgIH0sXG5cbiAgICAvKiogXG4gICAgKiBSZXR1cm5zIHN0YXRlIG1hY2hpbmUge0BsaW5rIENvbmZpZ3VyYXRpb259LlxuICAgICogQHJldHVybiB7Q29uZmlndXJhdGlvbn1cbiAgICAqIEBtZW1iZXJvZiBCYXNlSW50ZXJwcmV0ZXIucHJvdG90eXBlIFxuICAgICovXG4gICAgZ2V0Q29uZmlndXJhdGlvbiA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlndXJhdGlvbi5pdGVyKCkubWFwKGZ1bmN0aW9uKHMpe3JldHVybiBzLmlkO30pO1xuICAgIH0sXG5cbiAgICBfZ2V0RnVsbENvbmZpZ3VyYXRpb24gOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlndXJhdGlvbi5pdGVyKCkuXG4gICAgICAgICAgICAgICAgbWFwKGZ1bmN0aW9uKHMpeyByZXR1cm4gW3NdLmNvbmNhdChxdWVyeS5nZXRBbmNlc3RvcnMocykpO30sdGhpcykuXG4gICAgICAgICAgICAgICAgcmVkdWNlKGZ1bmN0aW9uKGEsYil7cmV0dXJuIGEuY29uY2F0KGIpO30sW10pLiAgICAvL2ZsYXR0ZW5cbiAgICAgICAgICAgICAgICByZWR1Y2UoZnVuY3Rpb24oYSxiKXtyZXR1cm4gYS5pbmRleE9mKGIpID4gLTEgPyBhIDogYS5jb25jYXQoYik7fSxbXSk7IC8vdW5pcVxuICAgIH0sXG5cblxuICAgIC8qKiBcbiAgICAqIEByZXR1cm4ge0Z1bGxDb25maWd1cmF0aW9ufVxuICAgICogQG1lbWJlcm9mIEJhc2VJbnRlcnByZXRlci5wcm90b3R5cGUgXG4gICAgKi9cbiAgICBnZXRGdWxsQ29uZmlndXJhdGlvbiA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RnVsbENvbmZpZ3VyYXRpb24oKS5tYXAoZnVuY3Rpb24ocyl7cmV0dXJuIHMuaWQ7fSk7XG4gICAgfSxcblxuXG4gICAgLyoqIFxuICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAqIEBtZW1iZXJvZiBCYXNlSW50ZXJwcmV0ZXIucHJvdG90eXBlIFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlTmFtZVxuICAgICovXG4gICAgaXNJbiA6IGZ1bmN0aW9uKHN0YXRlTmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRGdWxsQ29uZmlndXJhdGlvbigpLmluZGV4T2Yoc3RhdGVOYW1lKSA+IC0xO1xuICAgIH0sXG5cbiAgICAvKiogXG4gICAgKiBJcyB0aGUgc3RhdGUgbWFjaGluZSBpbiBhIGZpbmFsIHN0YXRlP1xuICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAqIEBtZW1iZXJvZiBCYXNlSW50ZXJwcmV0ZXIucHJvdG90eXBlIFxuICAgICovXG4gICAgaXNGaW5hbCA6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNJbkZpbmFsU3RhdGU7XG4gICAgfSxcblxuICAgIC8qKiBAcHJpdmF0ZSAqL1xuICAgIF9wZXJmb3JtQmlnU3RlcCA6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRFdmVudCwga2VlcEdvaW5nLCBhbGxTdGF0ZXNFeGl0ZWQsIGFsbFN0YXRlc0VudGVyZWQ7XG4gICAgICAgIFthbGxTdGF0ZXNFeGl0ZWQsIGFsbFN0YXRlc0VudGVyZWQsIGtlZXBHb2luZywgY3VycmVudEV2ZW50XSA9IHRoaXMuX3N0YXJ0QmlnU3RlcChlKTtcblxuICAgICAgICB3aGlsZSAoa2VlcEdvaW5nKSB7XG4gICAgICAgICAgW2N1cnJlbnRFdmVudCwga2VlcEdvaW5nXSA9IHRoaXMuX3NlbGVjdFRyYW5zaXRpb25zQW5kUGVyZm9ybVNtYWxsU3RlcChjdXJyZW50RXZlbnQsIGFsbFN0YXRlc0VudGVyZWQsIGFsbFN0YXRlc0V4aXRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9maW5pc2hCaWdTdGVwKGN1cnJlbnRFdmVudCwgYWxsU3RhdGVzRW50ZXJlZCwgYWxsU3RhdGVzRXhpdGVkKTtcbiAgICB9LFxuXG4gICAgX3NlbGVjdFRyYW5zaXRpb25zQW5kUGVyZm9ybVNtYWxsU3RlcCA6IGZ1bmN0aW9uKGN1cnJlbnRFdmVudCwgYWxsU3RhdGVzRW50ZXJlZCwgYWxsU3RhdGVzRXhpdGVkKXtcbiAgICAgICAgLy9maXJzdCBzZWxlY3Qgd2l0aCBudWxsIGV2ZW50XG4gICAgICAgIHZhciBzZWxlY3RlZFRyYW5zaXRpb25zICA9IHRoaXMuX3NlbGVjdFRyYW5zaXRpb25zKGN1cnJlbnRFdmVudCwgdHJ1ZSk7XG4gICAgICAgIGlmKHNlbGVjdGVkVHJhbnNpdGlvbnMuaXNFbXB0eSgpKXtcbiAgICAgICAgICBsZXQgZXYgPSB0aGlzLl9pbnRlcm5hbEV2ZW50UXVldWUuc2hpZnQoKTtcbiAgICAgICAgICBpZihldil7IFxuICAgICAgICAgICAgY3VycmVudEV2ZW50ID0gZXY7XG4gICAgICAgICAgICBzZWxlY3RlZFRyYW5zaXRpb25zID0gdGhpcy5fc2VsZWN0VHJhbnNpdGlvbnMoY3VycmVudEV2ZW50LCBmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXNlbGVjdGVkVHJhbnNpdGlvbnMuaXNFbXB0eSgpKXtcbiAgICAgICAgICB0aGlzLmVtaXQoJ29uU21hbGxTdGVwQmVnaW4nLCBjdXJyZW50RXZlbnQpO1xuICAgICAgICAgIGxldCBzdGF0ZXNFeGl0ZWQsIHN0YXRlc0VudGVyZWQ7XG4gICAgICAgICAgW3N0YXRlc0V4aXRlZCwgc3RhdGVzRW50ZXJlZF0gPSB0aGlzLl9wZXJmb3JtU21hbGxTdGVwKGN1cnJlbnRFdmVudCwgc2VsZWN0ZWRUcmFuc2l0aW9ucyk7XG4gICAgICAgICAgaWYoc3RhdGVzRXhpdGVkKSBzdGF0ZXNFeGl0ZWQuZm9yRWFjaCggcyA9PiBhbGxTdGF0ZXNFeGl0ZWQuYWRkKHMpICk7XG4gICAgICAgICAgaWYoc3RhdGVzRW50ZXJlZCkgc3RhdGVzRW50ZXJlZC5mb3JFYWNoKCBzID0+IGFsbFN0YXRlc0VudGVyZWQuYWRkKHMpICk7XG4gICAgICAgICAgdGhpcy5lbWl0KCdvblNtYWxsU3RlcEVuZCcsIGN1cnJlbnRFdmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGtlZXBHb2luZyA9ICFzZWxlY3RlZFRyYW5zaXRpb25zLmlzRW1wdHkoKSB8fCB0aGlzLl9pbnRlcm5hbEV2ZW50UXVldWUubGVuZ3RoO1xuICAgICAgICByZXR1cm4gW2N1cnJlbnRFdmVudCwga2VlcEdvaW5nXTtcbiAgICB9LFxuXG4gICAgX3N0YXJ0QmlnU3RlcCA6IGZ1bmN0aW9uKGUpe1xuICAgICAgICB0aGlzLmVtaXQoJ29uQmlnU3RlcEJlZ2luJywgZSk7XG5cbiAgICAgICAgLy9kbyBhcHBseUZpbmFsaXplIGFuZCBhdXRvZm9yd2FyZFxuICAgICAgICB0aGlzLl9jb25maWd1cmF0aW9uLml0ZXIoKS5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgICBpZihzdGF0ZS5pbnZva2VzKSBzdGF0ZS5pbnZva2VzLmZvckVhY2goIGludm9rZSA9PiAge1xuICAgICAgICAgICAgaWYoaW52b2tlLmF1dG9mb3J3YXJkKXtcbiAgICAgICAgICAgICAgLy9hdXRvZm9yd2FyZFxuICAgICAgICAgICAgICB0aGlzLl9zY3JpcHRpbmdDb250ZXh0LnNlbmQoe1xuICAgICAgICAgICAgICAgIHRhcmdldDogYCNfJHtpbnZva2UuaWR9YCwgXG4gICAgICAgICAgICAgICAgbmFtZTogZS5uYW1lLFxuICAgICAgICAgICAgICAgIGRhdGEgOiBlLmRhdGFcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihpbnZva2UuaWQgPT09IGUuaW52b2tlaWQpe1xuICAgICAgICAgICAgICAvL2FwcGx5RmluYWxpemVcbiAgICAgICAgICAgICAgaWYoaW52b2tlLmZpbmFsaXplKSBpbnZva2UuZmluYWxpemUuZm9yRWFjaCggYWN0aW9uID0+ICB0aGlzLl9ldmFsdWF0ZUFjdGlvbihlLCBhY3Rpb24pKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgfSlcbiAgICAgICAgfSk7IFxuXG4gICAgICAgIGlmIChlKSB0aGlzLl9pbnRlcm5hbEV2ZW50UXVldWUucHVzaChlKTtcblxuICAgICAgICBsZXQgYWxsU3RhdGVzRXhpdGVkID0gbmV3IFNldCgpLCBhbGxTdGF0ZXNFbnRlcmVkID0gbmV3IFNldCgpO1xuICAgICAgICBsZXQga2VlcEdvaW5nID0gdHJ1ZTtcbiAgICAgICAgbGV0IGN1cnJlbnRFdmVudCA9IGU7XG4gICAgICAgIHJldHVybiBbYWxsU3RhdGVzRW50ZXJlZCwgYWxsU3RhdGVzRXhpdGVkLCBrZWVwR29pbmcsIGN1cnJlbnRFdmVudF07XG4gICAgfSxcblxuICAgIF9maW5pc2hCaWdTdGVwIDogZnVuY3Rpb24oZSwgYWxsU3RhdGVzRW50ZXJlZCwgYWxsU3RhdGVzRXhpdGVkLCBjYil7XG4gICAgICAgIGxldCBzdGF0ZXNUb0ludm9rZSA9IEFycmF5LmZyb20obmV3IFNldChbLi4uYWxsU3RhdGVzRW50ZXJlZF0uZmlsdGVyKHMgPT4gcy5pbnZva2VzICYmICFhbGxTdGF0ZXNFeGl0ZWQuaGFzKHMpKSkpLnNvcnQoc29ydEluRW50cnlPcmRlcik7XG5cbiAgICAgICAgLy8gSGVyZSB3ZSBpbnZva2Ugd2hhdGV2ZXIgbmVlZHMgdG8gYmUgaW52b2tlZC4gVGhlIGltcGxlbWVudGF0aW9uIG9mICdpbnZva2UnIGlzIHBsYXRmb3JtLXNwZWNpZmljXG4gICAgICAgIHN0YXRlc1RvSW52b2tlLmZvckVhY2goIHMgPT4ge1xuICAgICAgICAgICAgcy5pbnZva2VzLmZvckVhY2goIGYgPT4gIHRoaXMuX2V2YWx1YXRlQWN0aW9uKGUsZikgKVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYW5jZWwgaW52b2tlIGZvciBhbGxTdGF0ZXNFeGl0ZWRcbiAgICAgICAgYWxsU3RhdGVzRXhpdGVkLmZvckVhY2goIHMgPT4ge1xuICAgICAgICAgIGlmKHMuaW52b2tlcykgcy5pbnZva2VzLmZvckVhY2goIGludm9rZSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9zY3JpcHRpbmdDb250ZXh0LmNhbmNlbEludm9rZShpbnZva2UuaWQpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRPRE86IEludm9raW5nIG1heSBoYXZlIHJhaXNlZCBpbnRlcm5hbCBlcnJvciBldmVudHMgYW5kIHdlIGl0ZXJhdGUgdG8gaGFuZGxlIHRoZW0gICAgICAgIFxuICAgICAgICAvL2lmIG5vdCBpbnRlcm5hbFF1ZXVlLmlzRW1wdHkoKTpcbiAgICAgICAgLy8gICAgY29udGludWVcblxuICAgICAgICB0aGlzLl9pc0luRmluYWxTdGF0ZSA9IHRoaXMuX2NvbmZpZ3VyYXRpb24uaXRlcigpLmV2ZXJ5KGZ1bmN0aW9uKHMpeyByZXR1cm4gcy50eXBlRW51bSA9PT0gRklOQUw7IH0pO1xuICAgICAgICBpZih0aGlzLl9pc0luRmluYWxTdGF0ZSl7XG4gICAgICAgICAgdGhpcy5fZXhpdEludGVycHJldGVyKGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdCgnb25CaWdTdGVwRW5kJyk7XG4gICAgICAgIGlmKGNiKSBjYih1bmRlZmluZWQsIHRoaXMuZ2V0Q29uZmlndXJhdGlvbigpKTtcbiAgICB9LFxuXG4gICAgX2NhbmNlbEFsbERlbGF5ZWRTZW5kcyA6IGZ1bmN0aW9uKCl7XG4gICAgICBmb3IoIGxldCB0aW1lb3V0T3B0aW9ucyBvZiB0aGlzLl9zY3JpcHRpbmdDb250ZXh0Ll90aW1lb3V0cyl7XG4gICAgICAgIGlmKCF0aW1lb3V0T3B0aW9ucy5zZW5kT3B0aW9ucy5kZWxheSkgY29udGludWU7XG4gICAgICAgIHRoaXMuX2xvZygnY2FuY2VsbGluZyBkZWxheWVkIHNlbmQnLCB0aW1lb3V0T3B0aW9ucyk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0T3B0aW9ucy50aW1lb3V0SGFuZGxlKTtcbiAgICAgICAgdGhpcy5fc2NyaXB0aW5nQ29udGV4dC5fdGltZW91dHMuZGVsZXRlKHRpbWVvdXRPcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuX3NjcmlwdGluZ0NvbnRleHQuX3RpbWVvdXRNYXApLmZvckVhY2goZnVuY3Rpb24oa2V5KXtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3NjcmlwdGluZ0NvbnRleHQuX3RpbWVvdXRNYXBba2V5XTtcbiAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICBfcGVyZm9ybUJpZ1N0ZXBBc3luYyA6IGZ1bmN0aW9uKGUsIGNiKSB7XG4gICAgICAgIGxldCBjdXJyZW50RXZlbnQsIGtlZXBHb2luZywgYWxsU3RhdGVzRXhpdGVkLCBhbGxTdGF0ZXNFbnRlcmVkO1xuICAgICAgICBbYWxsU3RhdGVzRXhpdGVkLCBhbGxTdGF0ZXNFbnRlcmVkLCBrZWVwR29pbmcsIGN1cnJlbnRFdmVudF0gPSB0aGlzLl9zdGFydEJpZ1N0ZXAoZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gbmV4dFN0ZXAoZW1pdCl7XG4gICAgICAgICAgdGhpcy5lbWl0KGVtaXQpO1xuICAgICAgICAgIFtjdXJyZW50RXZlbnQsIGtlZXBHb2luZ10gPSB0aGlzLl9zZWxlY3RUcmFuc2l0aW9uc0FuZFBlcmZvcm1TbWFsbFN0ZXAoY3VycmVudEV2ZW50LCBhbGxTdGF0ZXNFbnRlcmVkLCBhbGxTdGF0ZXNFeGl0ZWQpO1xuXG4gICAgICAgICAgaWYoa2VlcEdvaW5nKXtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnb25CaWdTdGVwU3VzcGVuZCcpO1xuICAgICAgICAgICAgc2V0SW1tZWRpYXRlKG5leHRTdGVwLmJpbmQodGhpcyksJ29uQmlnU3RlcFJlc3VtZScpO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5fZmluaXNoQmlnU3RlcChjdXJyZW50RXZlbnQsIGFsbFN0YXRlc0VudGVyZWQsIGFsbFN0YXRlc0V4aXRlZCwgY2IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBuZXh0U3RlcC5jYWxsKHRoaXMsJ29uQmlnU3RlcEJlZ2luJyk7XG4gICAgfSxcblxuICAgIC8qKiBAcHJpdmF0ZSAqL1xuICAgIF9wZXJmb3JtU21hbGxTdGVwIDogZnVuY3Rpb24oY3VycmVudEV2ZW50LCBzZWxlY3RlZFRyYW5zaXRpb25zKSB7XG5cbiAgICAgICAgdGhpcy5fbG9nKFwic2VsZWN0aW5nIHRyYW5zaXRpb25zIHdpdGggY3VycmVudEV2ZW50XCIsIGN1cnJlbnRFdmVudCk7XG5cbiAgICAgICAgdGhpcy5fbG9nKFwic2VsZWN0ZWQgdHJhbnNpdGlvbnNcIiwgc2VsZWN0ZWRUcmFuc2l0aW9ucyk7XG5cbiAgICAgICAgbGV0IHN0YXRlc0V4aXRlZCxcbiAgICAgICAgICAgIHN0YXRlc0VudGVyZWQ7XG5cbiAgICAgICAgaWYgKCFzZWxlY3RlZFRyYW5zaXRpb25zLmlzRW1wdHkoKSkge1xuXG4gICAgICAgICAgICAvL3dlIG9ubHkgd2FudCB0byBlbnRlciBhbmQgZXhpdCBzdGF0ZXMgZnJvbSB0cmFuc2l0aW9ucyB3aXRoIHRhcmdldHNcbiAgICAgICAgICAgIC8vZmlsdGVyIG91dCB0YXJnZXRsZXNzIHRyYW5zaXRpb25zIGhlcmUgLSB3ZSB3aWxsIG9ubHkgdXNlIHRoZXNlIHRvIGV4ZWN1dGUgdHJhbnNpdGlvbiBhY3Rpb25zXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRUcmFuc2l0aW9uc1dpdGhUYXJnZXRzID0gbmV3IHRoaXMub3B0cy5TZXQoc2VsZWN0ZWRUcmFuc2l0aW9ucy5pdGVyKCkuZmlsdGVyKHRyYW5zaXRpb25XaXRoVGFyZ2V0cykpO1xuXG4gICAgICAgICAgICBzdGF0ZXNFeGl0ZWQgPSB0aGlzLl9leGl0U3RhdGVzKGN1cnJlbnRFdmVudCwgc2VsZWN0ZWRUcmFuc2l0aW9uc1dpdGhUYXJnZXRzKVxuICAgICAgICAgICAgdGhpcy5fZXhlY3V0ZVRyYW5zaXRpb25zKGN1cnJlbnRFdmVudCwgc2VsZWN0ZWRUcmFuc2l0aW9ucyk7XG4gICAgICAgICAgICBzdGF0ZXNFbnRlcmVkID0gdGhpcy5fZW50ZXJTdGF0ZXMoY3VycmVudEV2ZW50LCBzZWxlY3RlZFRyYW5zaXRpb25zV2l0aFRhcmdldHMpXG5cbiAgICAgICAgICAgIHRoaXMuX2xvZyhcIm5ldyBjb25maWd1cmF0aW9uIFwiLCB0aGlzLl9jb25maWd1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbc3RhdGVzRXhpdGVkLCBzdGF0ZXNFbnRlcmVkXTtcbiAgICB9LFxuXG4gICAgX2V4aXRTdGF0ZXMgOiBmdW5jdGlvbihjdXJyZW50RXZlbnQsIHNlbGVjdGVkVHJhbnNpdGlvbnNXaXRoVGFyZ2V0cyl7XG4gICAgICAgIGxldCBiYXNpY1N0YXRlc0V4aXRlZCwgc3RhdGVzRXhpdGVkO1xuICAgICAgICBbYmFzaWNTdGF0ZXNFeGl0ZWQsIHN0YXRlc0V4aXRlZF0gPSB0aGlzLl9nZXRTdGF0ZXNFeGl0ZWQoc2VsZWN0ZWRUcmFuc2l0aW9uc1dpdGhUYXJnZXRzKTsgXG5cbiAgICAgICAgdGhpcy5fbG9nKCdleGl0aW5nIHN0YXRlcycpXG4gICAgICAgIGZvciAodmFyIGogPSAwLCBsZW4gPSBzdGF0ZXNFeGl0ZWQubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZUV4aXRlZCA9IHN0YXRlc0V4aXRlZFtqXTtcblxuICAgICAgICAgICAgaWYoc3RhdGVFeGl0ZWQuaXNBdG9taWMpIHRoaXMuX2NvbmZpZ3VyYXRpb24ucmVtb3ZlKHN0YXRlRXhpdGVkKTtcblxuICAgICAgICAgICAgdGhpcy5fbG9nKFwiZXhpdGluZyBcIiwgc3RhdGVFeGl0ZWQuaWQpO1xuXG4gICAgICAgICAgICAvL2ludm9rZSBsaXN0ZW5lcnNcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnb25FeGl0JyxzdGF0ZUV4aXRlZC5pZClcblxuICAgICAgICAgICAgaWYoc3RhdGVFeGl0ZWQub25FeGl0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBleGl0SWR4ID0gMCwgZXhpdExlbiA9IHN0YXRlRXhpdGVkLm9uRXhpdC5sZW5ndGg7IGV4aXRJZHggPCBleGl0TGVuOyBleGl0SWR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJsb2NrID0gc3RhdGVFeGl0ZWQub25FeGl0W2V4aXRJZHhdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBibG9ja0lkeCA9IDAsIGJsb2NrTGVuID0gYmxvY2subGVuZ3RoOyBibG9ja0lkeCA8IGJsb2NrTGVuOyBibG9ja0lkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uUmVmID0gYmxvY2tbYmxvY2tJZHhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uUmVmLmNhbGwodGhpcy5fc2NyaXB0aW5nQ29udGV4dCwgY3VycmVudEV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVFcnJvcihlLCBhY3Rpb25SZWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGY7XG4gICAgICAgICAgICBpZiAoc3RhdGVFeGl0ZWQuaGlzdG9yeVJlZikge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaGlzdG9yeVJlZiBvZiBzdGF0ZUV4aXRlZC5oaXN0b3J5UmVmKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhpc3RvcnlSZWYuaXNEZWVwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmID0gZnVuY3Rpb24oczApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gczAudHlwZUVudW0gPT09IEJBU0lDICYmIHN0YXRlRXhpdGVkLmRlc2NlbmRhbnRzLmluZGV4T2YoczApID4gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZiA9IGZ1bmN0aW9uKHMwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMwLnBhcmVudCA9PT0gc3RhdGVFeGl0ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vdXBkYXRlIGhpc3RvcnlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlzdG9yeVZhbHVlW2hpc3RvcnlSZWYuaWRdID0gc3RhdGVzRXhpdGVkLmZpbHRlcihmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RhdGVzRXhpdGVkO1xuICAgIH0sXG5cbiAgICBfZXhlY3V0ZVRyYW5zaXRpb25zIDogZnVuY3Rpb24oY3VycmVudEV2ZW50LCBzZWxlY3RlZFRyYW5zaXRpb25zKXtcbiAgICAgICAgdmFyIHNvcnRlZFRyYW5zaXRpb25zID0gc2VsZWN0ZWRUcmFuc2l0aW9ucy5pdGVyKCkuc29ydCh0cmFuc2l0aW9uQ29tcGFyYXRvcik7XG5cbiAgICAgICAgdGhpcy5fbG9nKFwiZXhlY3V0aW5nIHRyYW5zaXRpdGlvbiBhY3Rpb25zXCIpO1xuICAgICAgICBmb3IgKHZhciBzdHhJZHggPSAwLCBsZW4gPSBzb3J0ZWRUcmFuc2l0aW9ucy5sZW5ndGg7IHN0eElkeCA8IGxlbjsgc3R4SWR4KyspIHtcbiAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uID0gc29ydGVkVHJhbnNpdGlvbnNbc3R4SWR4XTtcblxuICAgICAgICAgICAgdmFyIHRhcmdldElkcyA9IHRyYW5zaXRpb24udGFyZ2V0cyAmJiB0cmFuc2l0aW9uLnRhcmdldHMubWFwKGZ1bmN0aW9uKHRhcmdldCl7cmV0dXJuIHRhcmdldC5pZDt9KTtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KCdvblRyYW5zaXRpb24nLHRyYW5zaXRpb24uc291cmNlLmlkLHRhcmdldElkcywgdHJhbnNpdGlvbi5zb3VyY2UudHJhbnNpdGlvbnMuaW5kZXhPZih0cmFuc2l0aW9uKSk7XG5cbiAgICAgICAgICAgIGlmKHRyYW5zaXRpb24ub25UcmFuc2l0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB0eElkeCA9IDAsIHR4TGVuID0gdHJhbnNpdGlvbi5vblRyYW5zaXRpb24ubGVuZ3RoOyB0eElkeCA8IHR4TGVuOyB0eElkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpb25SZWYgPSB0cmFuc2l0aW9uLm9uVHJhbnNpdGlvblt0eElkeF07XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgYWN0aW9uUmVmLmNhbGwodGhpcy5fc2NyaXB0aW5nQ29udGV4dCwgY3VycmVudEV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlRXJyb3IoZSwgYWN0aW9uUmVmKTtcbiAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICB9LFxuXG4gICAgX2VudGVyU3RhdGVzIDogZnVuY3Rpb24oY3VycmVudEV2ZW50LCBzZWxlY3RlZFRyYW5zaXRpb25zV2l0aFRhcmdldHMpe1xuICAgICAgICB0aGlzLl9sb2coXCJlbnRlcmluZyBzdGF0ZXNcIik7XG5cbiAgICAgICAgbGV0IHN0YXRlc0VudGVyZWQgPSBuZXcgU2V0KCk7XG4gICAgICAgIGxldCBzdGF0ZXNGb3JEZWZhdWx0RW50cnkgPSBuZXcgU2V0KCk7XG4gICAgICAgIC8vIGluaXRpYWxpemUgdGhlIHRlbXBvcmFyeSB0YWJsZSBmb3IgZGVmYXVsdCBjb250ZW50IGluIGhpc3Rvcnkgc3RhdGVzXG4gICAgICAgIGxldCBkZWZhdWx0SGlzdG9yeUNvbnRlbnQgPSB7fTtcbiAgICAgICAgdGhpcy5fY29tcHV0ZUVudHJ5U2V0KHNlbGVjdGVkVHJhbnNpdGlvbnNXaXRoVGFyZ2V0cywgc3RhdGVzRW50ZXJlZCwgc3RhdGVzRm9yRGVmYXVsdEVudHJ5LCBkZWZhdWx0SGlzdG9yeUNvbnRlbnQpOyBcbiAgICAgICAgc3RhdGVzRW50ZXJlZCA9IFsuLi5zdGF0ZXNFbnRlcmVkXS5zb3J0KHNvcnRJbkVudHJ5T3JkZXIpOyBcblxuICAgICAgICB0aGlzLl9sb2coXCJzdGF0ZXNFbnRlcmVkIFwiLCBzdGF0ZXNFbnRlcmVkKTtcblxuICAgICAgICBmb3IgKHZhciBlbnRlcklkeCA9IDAsIGVudGVyTGVuID0gc3RhdGVzRW50ZXJlZC5sZW5ndGg7IGVudGVySWR4IDwgZW50ZXJMZW47IGVudGVySWR4KyspIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZUVudGVyZWQgPSBzdGF0ZXNFbnRlcmVkW2VudGVySWR4XTtcblxuICAgICAgICAgICAgaWYoc3RhdGVFbnRlcmVkLmlzQXRvbWljKSB0aGlzLl9jb25maWd1cmF0aW9uLmFkZChzdGF0ZUVudGVyZWQpO1xuXG4gICAgICAgICAgICB0aGlzLl9sb2coXCJlbnRlcmluZ1wiLCBzdGF0ZUVudGVyZWQuaWQpO1xuXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ29uRW50cnknLHN0YXRlRW50ZXJlZC5pZCk7XG5cbiAgICAgICAgICAgIGlmKHN0YXRlRW50ZXJlZC5vbkVudHJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBlbnRyeUlkeCA9IDAsIGVudHJ5TGVuID0gc3RhdGVFbnRlcmVkLm9uRW50cnkubGVuZ3RoOyBlbnRyeUlkeCA8IGVudHJ5TGVuOyBlbnRyeUlkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBibG9jayA9IHN0YXRlRW50ZXJlZC5vbkVudHJ5W2VudHJ5SWR4XTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYmxvY2tJZHggPSAwLCBibG9ja0xlbiA9IGJsb2NrLmxlbmd0aDsgYmxvY2tJZHggPCBibG9ja0xlbjsgYmxvY2tJZHgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvblJlZiA9IGJsb2NrW2Jsb2NrSWR4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvblJlZi5jYWxsKHRoaXMuX3NjcmlwdGluZ0NvbnRleHQsIGN1cnJlbnRFdmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlRXJyb3IoZSwgYWN0aW9uUmVmKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHN0YXRlc0ZvckRlZmF1bHRFbnRyeS5oYXMoc3RhdGVFbnRlcmVkKSl7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpbml0aWFsU3RhdGUgb2Ygc3RhdGVFbnRlcmVkLmluaXRpYWxSZWYpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ29uRGVmYXVsdEVudHJ5JywgaW5pdGlhbFN0YXRlLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5pdGlhbFN0YXRlLnR5cGVFbnVtID09PSBJTklUSUFMKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0cmFuc2l0aW9uID0gaW5pdGlhbFN0YXRlLnRyYW5zaXRpb25zWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0cmFuc2l0aW9uLm9uVHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nKCdleGVjdXRpbmcgaW5pdGlhbCB0cmFuc2l0aW9uIGNvbnRlbnQgZm9yIGluaXRpYWwgc3RhdGUgb2YgcGFyZW50IHN0YXRlJyxzdGF0ZUVudGVyZWQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHR4SWR4ID0gMCwgdHhMZW4gPSB0cmFuc2l0aW9uLm9uVHJhbnNpdGlvbi5sZW5ndGg7IHR4SWR4IDwgdHhMZW47IHR4SWR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvblJlZiA9IHRyYW5zaXRpb24ub25UcmFuc2l0aW9uW3R4SWR4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25SZWYuY2FsbCh0aGlzLl9zY3JpcHRpbmdDb250ZXh0LCBjdXJyZW50RXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVFcnJvcihlLCBhY3Rpb25SZWYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGlmKGRlZmF1bHRIaXN0b3J5Q29udGVudFtzdGF0ZUVudGVyZWQuaWRdKXtcbiAgICAgICAgICAgICAgICBsZXQgdHJhbnNpdGlvbiA9IGRlZmF1bHRIaXN0b3J5Q29udGVudFtzdGF0ZUVudGVyZWQuaWRdXG4gICAgICAgICAgICAgICAgaWYodHJhbnNpdGlvbi5vblRyYW5zaXRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2coJ2V4ZWN1dGluZyBoaXN0b3J5IHRyYW5zaXRpb24gY29udGVudCBmb3IgaGlzdG9yeSBzdGF0ZSBvZiBwYXJlbnQgc3RhdGUnLHN0YXRlRW50ZXJlZC5pZCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHR4SWR4ID0gMCwgdHhMZW4gPSB0cmFuc2l0aW9uLm9uVHJhbnNpdGlvbi5sZW5ndGg7IHR4SWR4IDwgdHhMZW47IHR4SWR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpb25SZWYgPSB0cmFuc2l0aW9uLm9uVHJhbnNpdGlvblt0eElkeF07XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25SZWYuY2FsbCh0aGlzLl9zY3JpcHRpbmdDb250ZXh0LCBjdXJyZW50RXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUVycm9yKGUsIGFjdGlvblJlZik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgZW50ZXJJZHggPSAwLCBlbnRlckxlbiA9IHN0YXRlc0VudGVyZWQubGVuZ3RoOyBlbnRlcklkeCA8IGVudGVyTGVuOyBlbnRlcklkeCsrKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGVFbnRlcmVkID0gc3RhdGVzRW50ZXJlZFtlbnRlcklkeF07XG4gICAgICAgICAgICBpZihzdGF0ZUVudGVyZWQudHlwZUVudW0gPT09IEZJTkFMKXtcbiAgICAgICAgICAgICAgbGV0IHBhcmVudCA9IHN0YXRlRW50ZXJlZC5wYXJlbnQ7XG4gICAgICAgICAgICAgIGxldCBncmFuZHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICAgICAgICAgIHRoaXMuX2ludGVybmFsRXZlbnRRdWV1ZS5wdXNoKHtuYW1lIDogXCJkb25lLnN0YXRlLlwiICsgcGFyZW50LmlkLCBkYXRhIDogc3RhdGVFbnRlcmVkLmRvbmVkYXRhICYmIHN0YXRlRW50ZXJlZC5kb25lZGF0YS5jYWxsKHRoaXMuX3NjcmlwdGluZ0NvbnRleHQsIGN1cnJlbnRFdmVudCl9KTtcbiAgICAgICAgICAgICAgaWYoZ3JhbmRwYXJlbnQgJiYgZ3JhbmRwYXJlbnQudHlwZUVudW0gPT09IFBBUkFMTEVMKXtcbiAgICAgICAgICAgICAgICAgIGlmKGdyYW5kcGFyZW50LnN0YXRlcy5ldmVyeShzID0+IHRoaXMuaXNJbkZpbmFsU3RhdGUocykgKSl7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5faW50ZXJuYWxFdmVudFF1ZXVlLnB1c2goe25hbWUgOiBcImRvbmUuc3RhdGUuXCIgKyBncmFuZHBhcmVudC5pZH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RhdGVzRW50ZXJlZDtcbiAgICB9LFxuXG4gICAgaXNJbkZpbmFsU3RhdGUgOiBmdW5jdGlvbihzKXtcbiAgICAgICAgaWYocy50eXBlRW51bSA9PT0gQ09NUE9TSVRFKXtcbiAgICAgICAgICAgIHJldHVybiBzLnN0YXRlcy5zb21lKHMgPT4gcy50eXBlRW51bSA9PT0gRklOQUwgJiYgdGhpcy5fY29uZmlndXJhdGlvbi5jb250YWlucyhzKSk7XG4gICAgICAgIH1lbHNlIGlmKHMudHlwZUVudW0gPT09IFBBUkFMTEVMKXtcbiAgICAgICAgICAgIHJldHVybiBzLnN0YXRlcy5ldmVyeSh0aGlzLmlzSW5GaW5hbFN0YXRlLmJpbmQodGhpcykpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqIEBwcml2YXRlICovXG4gICAgX2V2YWx1YXRlQWN0aW9uIDogZnVuY3Rpb24oY3VycmVudEV2ZW50LCBhY3Rpb25SZWYpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gYWN0aW9uUmVmLmNhbGwodGhpcy5fc2NyaXB0aW5nQ29udGV4dCwgY3VycmVudEV2ZW50KTsgICAgIC8vU0NYTUwgc3lzdGVtIHZhcmlhYmxlc1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICB0aGlzLl9oYW5kbGVFcnJvcihlLCBhY3Rpb25SZWYpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9oYW5kbGVFcnJvciA6IGZ1bmN0aW9uKGUsIGFjdGlvblJlZil7XG4gICAgICBsZXQgZXZlbnQgPSBcbiAgICAgICAgZSBpbnN0YW5jZW9mIEVycm9yIHx8ICh0eXBlb2YgZS5fX3Byb3RvX18ubmFtZSA9PT0gJ3N0cmluZycgJiYgZS5fX3Byb3RvX18ubmFtZS5tYXRjaCgvXi4qRXJyb3IkLykpID8gIC8vd2UgY2FuJ3QganVzdCBkbyAnZSBpbnN0YW5jZW9mIEVycm9yJywgYmVjYXVzZSB0aGUgRXJyb3Igb2JqZWN0IGluIHRoZSBzYW5kYm94IGlzIGZyb20gYSBkaWZmZXJlbnQgY29udGV4dCwgYW5kIGluc3RhbmNlb2Ygd2lsbCByZXR1cm4gZmFsc2VcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOidlcnJvci5leGVjdXRpb24nLFxuICAgICAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgICAgdGFnbmFtZTogYWN0aW9uUmVmLnRhZ25hbWUsIFxuICAgICAgICAgICAgICBsaW5lOiBhY3Rpb25SZWYubGluZSwgXG4gICAgICAgICAgICAgIGNvbHVtbjogYWN0aW9uUmVmLmNvbHVtbixcbiAgICAgICAgICAgICAgcmVhc29uOiBlLm1lc3NhZ2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlIDogJ3BsYXRmb3JtJ1xuICAgICAgICAgIH0gOiBcbiAgICAgICAgICAoZS5uYW1lID8gXG4gICAgICAgICAgICBlIDogXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6J2Vycm9yLmV4ZWN1dGlvbicsXG4gICAgICAgICAgICAgIGRhdGE6ZSxcbiAgICAgICAgICAgICAgdHlwZSA6ICdwbGF0Zm9ybSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgdGhpcy5faW50ZXJuYWxFdmVudFF1ZXVlLnB1c2goZXZlbnQpO1xuICAgICAgdGhpcy5lbWl0KCdvbkVycm9yJywgZXZlbnQpO1xuICAgIH0sXG5cbiAgICAvKiogQHByaXZhdGUgKi9cbiAgICBfZ2V0U3RhdGVzRXhpdGVkIDogZnVuY3Rpb24odHJhbnNpdGlvbnMpIHtcbiAgICAgICAgdmFyIHN0YXRlc0V4aXRlZCA9IG5ldyB0aGlzLm9wdHMuU2V0KCk7XG4gICAgICAgIHZhciBiYXNpY1N0YXRlc0V4aXRlZCA9IG5ldyB0aGlzLm9wdHMuU2V0KCk7XG5cbiAgICAgICAgLy9TdGF0ZXMgZXhpdGVkIGFyZSBkZWZpbmVkIHRvIGJlIGFjdGl2ZSBzdGF0ZXMgdGhhdCBhcmVcbiAgICAgICAgLy9kZXNjZW5kYW50cyBvZiB0aGUgc2NvcGUgb2YgZWFjaCBwcmlvcml0eS1lbmFibGVkIHRyYW5zaXRpb24uXG4gICAgICAgIC8vSGVyZSwgd2UgaXRlcmF0ZSB0aHJvdWdoIHRoZSB0cmFuc2l0aW9ucywgYW5kIGNvbGxlY3Qgc3RhdGVzXG4gICAgICAgIC8vdGhhdCBtYXRjaCB0aGlzIGNvbmRpdGlvbi4gXG4gICAgICAgIHZhciB0cmFuc2l0aW9uTGlzdCA9IHRyYW5zaXRpb25zLml0ZXIoKTtcbiAgICAgICAgZm9yICh2YXIgdHhJZHggPSAwLCB0eExlbiA9IHRyYW5zaXRpb25MaXN0Lmxlbmd0aDsgdHhJZHggPCB0eExlbjsgdHhJZHgrKykge1xuICAgICAgICAgICAgdmFyIHRyYW5zaXRpb24gPSB0cmFuc2l0aW9uTGlzdFt0eElkeF07XG4gICAgICAgICAgICB2YXIgc2NvcGUgPSB0cmFuc2l0aW9uLnNjb3BlLFxuICAgICAgICAgICAgICAgIGRlc2MgPSBzY29wZS5kZXNjZW5kYW50cztcblxuICAgICAgICAgICAgLy9Gb3IgZWFjaCBzdGF0ZSBpbiB0aGUgY29uZmlndXJhdGlvblxuICAgICAgICAgICAgLy9pcyB0aGF0IHN0YXRlIGEgZGVzY2VuZGFudCBvZiB0aGUgdHJhbnNpdGlvbiBzY29wZT9cbiAgICAgICAgICAgIC8vU3RvcmUgYW5jZXN0b3JzIG9mIHRoYXQgc3RhdGUgdXAgdG8gYnV0IG5vdCBpbmNsdWRpbmcgdGhlIHNjb3BlLlxuICAgICAgICAgICAgdmFyIGNvbmZpZ0xpc3QgPSB0aGlzLl9jb25maWd1cmF0aW9uLml0ZXIoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGNmZ0lkeCA9IDAsIGNmZ0xlbiA9IGNvbmZpZ0xpc3QubGVuZ3RoOyBjZmdJZHggPCBjZmdMZW47IGNmZ0lkeCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlID0gY29uZmlnTGlzdFtjZmdJZHhdO1xuICAgICAgICAgICAgICAgIGlmKGRlc2MuaW5kZXhPZihzdGF0ZSkgPiAtMSl7XG4gICAgICAgICAgICAgICAgICAgIGJhc2ljU3RhdGVzRXhpdGVkLmFkZChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlc0V4aXRlZC5hZGQoc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYW5jZXN0b3JzID0gcXVlcnkuZ2V0QW5jZXN0b3JzKHN0YXRlLHNjb3BlKTsgXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGFuY0lkeCA9IDAsIGFuY0xlbiA9IGFuY2VzdG9ycy5sZW5ndGg7IGFuY0lkeCA8IGFuY0xlbjsgYW5jSWR4KyspIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZXNFeGl0ZWQuYWRkKGFuY2VzdG9yc1thbmNJZHhdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzb3J0ZWRTdGF0ZXNFeGl0ZWQgPSBzdGF0ZXNFeGl0ZWQuaXRlcigpLnNvcnQoZ2V0U3RhdGVXaXRoSGlnaGVyU291cmNlQ2hpbGRQcmlvcml0eSk7XG4gICAgICAgIHJldHVybiBbYmFzaWNTdGF0ZXNFeGl0ZWQsIHNvcnRlZFN0YXRlc0V4aXRlZF07XG4gICAgfSxcblxuICAgIF9jb21wdXRlRW50cnlTZXQgOiBmdW5jdGlvbih0cmFuc2l0aW9ucywgc3RhdGVzVG9FbnRlciwgc3RhdGVzRm9yRGVmYXVsdEVudHJ5LCBkZWZhdWx0SGlzdG9yeUNvbnRlbnQpe1xuICAgICAgZm9yKGxldCB0IG9mIHRyYW5zaXRpb25zLml0ZXIoKSl7XG4gICAgICAgICAgZm9yKGxldCBzIG9mIHQudGFyZ2V0cyl7XG4gICAgICAgICAgICAgIHRoaXMuX2FkZERlc2NlbmRhbnRTdGF0ZXNUb0VudGVyKHMsc3RhdGVzVG9FbnRlciwgc3RhdGVzRm9yRGVmYXVsdEVudHJ5LCBkZWZhdWx0SGlzdG9yeUNvbnRlbnQpIFxuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgYW5jZXN0b3IgPSB0LnNjb3BlO1xuICAgICAgICAgIGZvcihsZXQgcyBvZiB0aGlzLl9nZXRFZmZlY3RpdmVUYXJnZXRTdGF0ZXModCkpe1xuICAgICAgICAgICAgICB0aGlzLl9hZGRBbmNlc3RvclN0YXRlc1RvRW50ZXIocywgYW5jZXN0b3IsIHN0YXRlc1RvRW50ZXIsIHN0YXRlc0ZvckRlZmF1bHRFbnRyeSwgZGVmYXVsdEhpc3RvcnlDb250ZW50KVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgX2dldEVmZmVjdGl2ZVRhcmdldFN0YXRlcyA6IGZ1bmN0aW9uKHRyYW5zaXRpb24pe1xuICAgICAgbGV0IHRhcmdldHMgPSBuZXcgU2V0KCk7XG4gICAgICBmb3IobGV0IHMgb2YgdHJhbnNpdGlvbi50YXJnZXRzKXtcbiAgICAgICAgICBpZihzLnR5cGVFbnVtID09PSBISVNUT1JZKXtcbiAgICAgICAgICAgICAgaWYocy5pZCBpbiB0aGlzLl9oaXN0b3J5VmFsdWUpXG4gICAgICAgICAgICAgICAgICB0aGlzLl9oaXN0b3J5VmFsdWVbcy5pZF0uZm9yRWFjaCggc3RhdGUgPT4gdGFyZ2V0cy5hZGQoc3RhdGUpKVxuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICBbLi4udGhpcy5fZ2V0RWZmZWN0aXZlVGFyZ2V0U3RhdGVzKHMudHJhbnNpdGlvbnNbMF0pXS5mb3JFYWNoKCBzdGF0ZSA9PiB0YXJnZXRzLmFkZChzdGF0ZSkpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGFyZ2V0cy5hZGQocylcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFyZ2V0c1xuICAgIH0sXG5cbiAgICBfYWRkRGVzY2VuZGFudFN0YXRlc1RvRW50ZXIgOiBmdW5jdGlvbihzdGF0ZSxzdGF0ZXNUb0VudGVyLCBzdGF0ZXNGb3JEZWZhdWx0RW50cnksIGRlZmF1bHRIaXN0b3J5Q29udGVudCl7XG4gICAgICBpZihzdGF0ZS50eXBlRW51bSA9PT0gSElTVE9SWSl7XG4gICAgICAgICAgaWYodGhpcy5faGlzdG9yeVZhbHVlW3N0YXRlLmlkXSl7XG4gICAgICAgICAgICAgIGZvcihsZXQgcyBvZiB0aGlzLl9oaXN0b3J5VmFsdWVbc3RhdGUuaWRdKVxuICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkRGVzY2VuZGFudFN0YXRlc1RvRW50ZXIocyxzdGF0ZXNUb0VudGVyLCBzdGF0ZXNGb3JEZWZhdWx0RW50cnksIGRlZmF1bHRIaXN0b3J5Q29udGVudClcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIGZvcihsZXQgcyBvZiB0aGlzLl9oaXN0b3J5VmFsdWVbc3RhdGUuaWRdKVxuICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkQW5jZXN0b3JTdGF0ZXNUb0VudGVyKHMsIHN0YXRlLnBhcmVudCwgc3RhdGVzVG9FbnRlciwgc3RhdGVzRm9yRGVmYXVsdEVudHJ5LCBkZWZhdWx0SGlzdG9yeUNvbnRlbnQpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlZmF1bHRIaXN0b3J5Q29udGVudFtzdGF0ZS5wYXJlbnQuaWRdID0gc3RhdGUudHJhbnNpdGlvbnNbMF1cbiAgICAgICAgICAgIGZvcihsZXQgcyBvZiBzdGF0ZS50cmFuc2l0aW9uc1swXS50YXJnZXRzKVxuICAgICAgICAgICAgICAgIHRoaXMuX2FkZERlc2NlbmRhbnRTdGF0ZXNUb0VudGVyKHMsc3RhdGVzVG9FbnRlcixzdGF0ZXNGb3JEZWZhdWx0RW50cnksIGRlZmF1bHRIaXN0b3J5Q29udGVudClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZm9yKGxldCBzIG9mIHN0YXRlLnRyYW5zaXRpb25zWzBdLnRhcmdldHMpXG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkQW5jZXN0b3JTdGF0ZXNUb0VudGVyKHMsIHN0YXRlLnBhcmVudCwgc3RhdGVzVG9FbnRlciwgc3RhdGVzRm9yRGVmYXVsdEVudHJ5LCBkZWZhdWx0SGlzdG9yeUNvbnRlbnQpXG4gICAgICAgICAgICBcbiAgICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlc1RvRW50ZXIuYWRkKHN0YXRlKVxuICAgICAgICAgIGlmKHN0YXRlLnR5cGVFbnVtID09PSBDT01QT1NJVEUpe1xuICAgICAgICAgICAgICBzdGF0ZXNGb3JEZWZhdWx0RW50cnkuYWRkKHN0YXRlKVxuICAgICAgICAgICAgICAvL2ZvciBlYWNoIHN0YXRlIGluIGluaXRpYWxSZWYsIGlmIGl0IGlzIGFuIGluaXRpYWwgc3RhdGUsIHRoZW4gYWRkIGFuY2VzdG9ycyBhbmQgZGVzY2VuZGFudHMuXG4gICAgICAgICAgICAgIGZvcihsZXQgcyBvZiBzdGF0ZS5pbml0aWFsUmVmKXtcbiAgICAgICAgICAgICAgICAgIGxldCB0YXJnZXRzID0gcy50eXBlRW51bSA9PT0gSU5JVElBTCA/IHMudHJhbnNpdGlvbnNbMF0udGFyZ2V0cyA6IFtzXTsgXG4gICAgICAgICAgICAgICAgICBmb3IobGV0IHRhcmdldFN0YXRlIG9mIHRhcmdldHMpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGREZXNjZW5kYW50U3RhdGVzVG9FbnRlcih0YXJnZXRTdGF0ZSxzdGF0ZXNUb0VudGVyLCBzdGF0ZXNGb3JEZWZhdWx0RW50cnksIGRlZmF1bHRIaXN0b3J5Q29udGVudClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmb3IobGV0IHMgb2Ygc3RhdGUuaW5pdGlhbFJlZil7XG4gICAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0cyA9IHMudHlwZUVudW0gPT09IElOSVRJQUwgPyBzLnRyYW5zaXRpb25zWzBdLnRhcmdldHMgOiBbc107IFxuICAgICAgICAgICAgICAgICAgZm9yKGxldCB0YXJnZXRTdGF0ZSBvZiB0YXJnZXRzKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkQW5jZXN0b3JTdGF0ZXNUb0VudGVyKHRhcmdldFN0YXRlLCBzdGF0ZSwgc3RhdGVzVG9FbnRlciwgc3RhdGVzRm9yRGVmYXVsdEVudHJ5LCBkZWZhdWx0SGlzdG9yeUNvbnRlbnQpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgaWYoc3RhdGUudHlwZUVudW0gPT09IFBBUkFMTEVMKXtcbiAgICAgICAgICAgICAgICAgIGZvcihsZXQgY2hpbGQgb2Ygc3RhdGUuc3RhdGVzKXtcbiAgICAgICAgICAgICAgICAgICAgICBpZighWy4uLnN0YXRlc1RvRW50ZXJdLnNvbWUocyA9PiBxdWVyeS5pc0Rlc2NlbmRhbnQocywgY2hpbGQpKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZERlc2NlbmRhbnRTdGF0ZXNUb0VudGVyKGNoaWxkLHN0YXRlc1RvRW50ZXIsIHN0YXRlc0ZvckRlZmF1bHRFbnRyeSwgZGVmYXVsdEhpc3RvcnlDb250ZW50KSBcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIF9hZGRBbmNlc3RvclN0YXRlc1RvRW50ZXIgOiBmdW5jdGlvbihzdGF0ZSwgYW5jZXN0b3IsIHN0YXRlc1RvRW50ZXIsIHN0YXRlc0ZvckRlZmF1bHRFbnRyeSwgZGVmYXVsdEhpc3RvcnlDb250ZW50KXtcbiAgICAgIGxldCB0cmF2ZXJzZSA9IChhbmMpID0+IHtcbiAgICAgICAgICBpZihhbmMudHlwZUVudW0gPT09IFBBUkFMTEVMKXtcbiAgICAgICAgICAgICAgZm9yKGxldCBjaGlsZCBvZiBhbmMuc3RhdGVzKXtcbiAgICAgICAgICAgICAgICAgIGlmKGNoaWxkLnR5cGVFbnVtICE9PSBISVNUT1JZICYmICFbLi4uc3RhdGVzVG9FbnRlcl0uc29tZShzID0+IHF1ZXJ5LmlzRGVzY2VuZGFudChzLCBjaGlsZCkpKXtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGREZXNjZW5kYW50U3RhdGVzVG9FbnRlcihjaGlsZCxzdGF0ZXNUb0VudGVyLCBzdGF0ZXNGb3JEZWZhdWx0RW50cnksIGRlZmF1bHRIaXN0b3J5Q29udGVudCkgXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZm9yKGxldCBhbmMgb2YgcXVlcnkuZ2V0QW5jZXN0b3JzKHN0YXRlLGFuY2VzdG9yKSl7XG4gICAgICAgICAgc3RhdGVzVG9FbnRlci5hZGQoYW5jKVxuICAgICAgICAgIHRyYXZlcnNlKGFuYylcbiAgICAgIH1cbiAgICAgIHRyYXZlcnNlKGFuY2VzdG9yKVxuICAgIH0sXG5cbiAgICAvKiogQHByaXZhdGUgKi9cbiAgICBfc2VsZWN0VHJhbnNpdGlvbnMgOiBmdW5jdGlvbihjdXJyZW50RXZlbnQsIHNlbGVjdEV2ZW50bGVzc1RyYW5zaXRpb25zKSB7XG4gICAgICAgIHZhciB0cmFuc2l0aW9uU2VsZWN0b3IgPSB0aGlzLm9wdHMudHJhbnNpdGlvblNlbGVjdG9yO1xuICAgICAgICB2YXIgZW5hYmxlZFRyYW5zaXRpb25zID0gbmV3IHRoaXMub3B0cy5TZXQoKTtcblxuICAgICAgICB2YXIgZSA9IHRoaXMuX2V2YWx1YXRlQWN0aW9uLmJpbmQodGhpcyxjdXJyZW50RXZlbnQpO1xuXG4gICAgICAgIGxldCBhdG9taWNTdGF0ZXMgPSB0aGlzLl9jb25maWd1cmF0aW9uLml0ZXIoKS5zb3J0KHRyYW5zaXRpb25Db21wYXJhdG9yKTtcbiAgICAgICAgZm9yKGxldCBzdGF0ZSBvZiBhdG9taWNTdGF0ZXMpe1xuICAgICAgICAgICAgbG9vcDogZm9yKGxldCBzIG9mIFtzdGF0ZV0uY29uY2F0KHF1ZXJ5LmdldEFuY2VzdG9ycyhzdGF0ZSkpKXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHQgb2Ygcy50cmFuc2l0aW9ucyl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRyYW5zaXRpb25TZWxlY3Rvcih0LCBjdXJyZW50RXZlbnQsIGUsIHNlbGVjdEV2ZW50bGVzc1RyYW5zaXRpb25zKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkVHJhbnNpdGlvbnMuYWRkKHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgbG9vcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwcmlvcml0eUVuYWJsZWRUcmFuc2l0aW9ucyA9IHRoaXMuX3JlbW92ZUNvbmZsaWN0aW5nVHJhbnNpdGlvbihlbmFibGVkVHJhbnNpdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuX2xvZyhcInByaW9yaXR5RW5hYmxlZFRyYW5zaXRpb25zXCIsIHByaW9yaXR5RW5hYmxlZFRyYW5zaXRpb25zKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwcmlvcml0eUVuYWJsZWRUcmFuc2l0aW9ucztcbiAgICB9LFxuXG4gICAgXG4gICAgX2NvbXB1dGVFeGl0U2V0IDogZnVuY3Rpb24odHJhbnNpdGlvbnMpIHtcbiAgICAgIGxldCBzdGF0ZXNUb0V4aXQgPSBuZXcgU2V0KCk7XG4gICAgICBmb3IobGV0IHQgb2YgdHJhbnNpdGlvbnMpe1xuICAgICAgICAgIGlmKHQudGFyZ2V0cyl7XG4gICAgICAgICAgICAgIGxldCBzY29wZSA9IHQuc2NvcGU7XG4gICAgICAgICAgICAgIGZvcihsZXQgcyBvZiB0aGlzLl9nZXRGdWxsQ29uZmlndXJhdGlvbigpKXtcbiAgICAgICAgICAgICAgICAgIGlmKHF1ZXJ5LmlzRGVzY2VuZGFudChzLHNjb3BlKSkgc3RhdGVzVG9FeGl0LmFkZChzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZXNUb0V4aXQ7IFxuICAgIH0sXG4gICBcblxuICAgIC8qKiBAcHJpdmF0ZSAqL1xuICAgIF9yZW1vdmVDb25mbGljdGluZ1RyYW5zaXRpb24gOiBmdW5jdGlvbihlbmFibGVkVHJhbnNpdGlvbnMpIHtcbiAgICAgIGxldCBmaWx0ZXJlZFRyYW5zaXRpb25zID0gbmV3IHRoaXMub3B0cy5TZXQoKVxuICAgICAgLy90b0xpc3Qgc29ydHMgdGhlIHRyYW5zaXRpb25zIGluIHRoZSBvcmRlciBvZiB0aGUgc3RhdGVzIHRoYXQgc2VsZWN0ZWQgdGhlbVxuICAgICAgZm9yKCBsZXQgdDEgb2YgZW5hYmxlZFRyYW5zaXRpb25zLml0ZXIoKSl7XG4gICAgICAgICAgbGV0IHQxUHJlZW1wdGVkID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHRyYW5zaXRpb25zVG9SZW1vdmUgPSBuZXcgU2V0KClcbiAgICAgICAgICBmb3IgKGxldCB0MiBvZiBmaWx0ZXJlZFRyYW5zaXRpb25zLml0ZXIoKSl7XG4gICAgICAgICAgICAgIC8vVE9ETzogY2FuIHdlIGNvbXB1dGUgdGhpcyBzdGF0aWNhbGx5PyBmb3IgZXhhbXBsZSwgYnkgY2hlY2tpbmcgaWYgdGhlIHRyYW5zaXRpb24gc2NvcGVzIGFyZSBhcmVuYSBvcnRob2dvbmFsP1xuICAgICAgICAgICAgICBsZXQgdDFFeGl0U2V0ID0gdGhpcy5fY29tcHV0ZUV4aXRTZXQoW3QxXSk7XG4gICAgICAgICAgICAgIGxldCB0MkV4aXRTZXQgPSB0aGlzLl9jb21wdXRlRXhpdFNldChbdDJdKTtcbiAgICAgICAgICAgICAgbGV0IGhhc0ludGVyc2VjdGlvbiA9IFsuLi50MUV4aXRTZXRdLnNvbWUoIHMgPT4gdDJFeGl0U2V0LmhhcyhzKSApICB8fCBbLi4udDJFeGl0U2V0XS5zb21lKCBzID0+IHQxRXhpdFNldC5oYXMocykpO1xuICAgICAgICAgICAgICB0aGlzLl9sb2coJ3QxRXhpdFNldCcsdDEuc291cmNlLmlkLFsuLi50MUV4aXRTZXRdLm1hcCggcyA9PiBzLmlkICkpXG4gICAgICAgICAgICAgIHRoaXMuX2xvZygndDJFeGl0U2V0Jyx0Mi5zb3VyY2UuaWQsWy4uLnQyRXhpdFNldF0ubWFwKCBzID0+IHMuaWQgKSlcbiAgICAgICAgICAgICAgdGhpcy5fbG9nKCdoYXNJbnRlcnNlY3Rpb24nLGhhc0ludGVyc2VjdGlvbilcbiAgICAgICAgICAgICAgaWYoaGFzSW50ZXJzZWN0aW9uKXtcbiAgICAgICAgICAgICAgICAgIGlmKHQyLnNvdXJjZS5kZXNjZW5kYW50cy5pbmRleE9mKHQxLnNvdXJjZSkgPiAtMSl7ICAgIC8vaXMgdGhpcyB0aGUgc2FtZSBhcyBiZWluZyBhbmNlc3RyYWxseSByZWxhdGVkP1xuICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25zVG9SZW1vdmUuYWRkKHQyKVxuICAgICAgICAgICAgICAgICAgfWVsc2V7IFxuICAgICAgICAgICAgICAgICAgICAgIHQxUHJlZW1wdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKCF0MVByZWVtcHRlZCl7XG4gICAgICAgICAgICAgIGZvcihsZXQgdDMgb2YgdHJhbnNpdGlvbnNUb1JlbW92ZSl7XG4gICAgICAgICAgICAgICAgICBmaWx0ZXJlZFRyYW5zaXRpb25zLnJlbW92ZSh0MylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmaWx0ZXJlZFRyYW5zaXRpb25zLmFkZCh0MSlcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICAgICAgICAgXG4gICAgICByZXR1cm4gZmlsdGVyZWRUcmFuc2l0aW9ucztcbiAgICB9LFxuXG4gICAgX2xvZyA6IGZ1bmN0aW9uKCl7XG4gICAgICBpZihwcmludFRyYWNlKXtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5mcm9tKGFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMub3B0cy5jb25zb2xlLmxvZyggXG4gICAgICAgICAgYCR7YXJnc1swXX06ICR7XG4gICAgICAgICAgICBhcmdzLnNsaWNlKDEpLm1hcChmdW5jdGlvbihhcmcpe1xuICAgICAgICAgICAgICByZXR1cm4gYXJnID09PSBudWxsID8gJ251bGwnIDogXG4gICAgICAgICAgICAgICAgKCBhcmcgPT09IHVuZGVmaW5lZCA/ICd1bmRlZmluZWQnIDogXG4gICAgICAgICAgICAgICAgICAoIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnID8gYXJnIDogXG4gICAgICAgICAgICAgICAgICAgICggYXJnLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gdXRpbC5pbnNwZWN0KGFyZykgOiBhcmcudG9TdHJpbmcoKSkpKTtcblxuICAgICAgICAgICAgfSkuam9pbignLCAnKVxuICAgICAgICAgIH1cXG5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogQGludGVyZmFjZSBMaXN0ZW5lclxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEBmdW5jdGlvblxuICAgICogQG5hbWUgTGlzdGVuZXIjb25FbnRyeSBcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZUlkXG4gICAgKi9cblxuICAgIC8qKlxuICAgICogQGZ1bmN0aW9uXG4gICAgKiBAbmFtZSBMaXN0ZW5lciNvbkV4aXQgXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc3RhdGVJZFxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEBmdW5jdGlvblxuICAgICogQG5hbWUgTGlzdGVuZXIjb25UcmFuc2l0aW9uIFxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZVN0YXRlSWQgSWQgb2YgdGhlIHNvdXJjZSBzdGF0ZVxuICAgICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSB0YXJnZXRTdGF0ZXNJZHMgSWRzIG9mIHRoZSB0YXJnZXQgc3RhdGVzXG4gICAgKiBAcGFyYW0ge251bWJlcn0gdHJhbnNpdGlvbkluZGV4IEluZGV4IG9mIHRoZSB0cmFuc2l0aW9uIHJlbGF0aXZlIHRvIG90aGVyIHRyYW5zaXRpb25zIG9yaWdpbmF0aW5nIGZyb20gc291cmNlIHN0YXRlLlxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEBmdW5jdGlvblxuICAgICogQG5hbWUgTGlzdGVuZXIjb25FcnJvclxuICAgICogQHBhcmFtIHtFcnJvcn0gZXJyb3JJbmZvXG4gICAgKi9cblxuICAgIC8qKlxuICAgICogQGZ1bmN0aW9uXG4gICAgKiBAbmFtZSBMaXN0ZW5lciNvbkJpZ1N0ZXBCZWdpblxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEBmdW5jdGlvblxuICAgICogQG5hbWUgTGlzdGVuZXIjb25CaWdTdGVwUmVzdW1lXG4gICAgKi9cblxuICAgIC8qKlxuICAgICogQGZ1bmN0aW9uXG4gICAgKiBAbmFtZSBMaXN0ZW5lciNvbkJpZ1N0ZXBTdXNwZW5kXG4gICAgKi9cblxuICAgIC8qKlxuICAgICogQGZ1bmN0aW9uXG4gICAgKiBAbmFtZSBMaXN0ZW5lciNvbkJpZ1N0ZXBFbmRcbiAgICAqL1xuXG4gICAgLyoqXG4gICAgKiBAZnVuY3Rpb25cbiAgICAqIEBuYW1lIExpc3RlbmVyI29uU21hbGxTdGVwQmVnaW5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgICovXG5cbiAgICAvKipcbiAgICAqIEBmdW5jdGlvblxuICAgICogQG5hbWUgTGlzdGVuZXIjb25TbWFsbFN0ZXBFbmRcbiAgICAqL1xuXG5cbiAgICAvKiogXG4gICAgKiBQcm92aWRlcyBhIGdlbmVyaWMgbWVjaGFuaXNtIHRvIHN1YnNjcmliZSB0byBzdGF0ZSBjaGFuZ2UgYW5kIHJ1bnRpbWVcbiAgICAqIGVycm9yIG5vdGlmaWNhdGlvbnMuICBDYW4gYmUgdXNlZCBmb3IgbG9nZ2luZyBhbmQgZGVidWdnaW5nLiBGb3IgZXhhbXBsZSxcbiAgICAqIGNhbiBhdHRhY2ggYSBsb2dnZXIgdGhhdCBzaW1wbHkgbG9ncyB0aGUgc3RhdGUgY2hhbmdlcy4gIE9yIGNhbiBhdHRhY2ggYVxuICAgICogbmV0d29yayBkZWJ1Z2dpbmcgY2xpZW50IHRoYXQgc2VuZHMgc3RhdGUgY2hhbmdlIG5vdGlmaWNhdGlvbnMgdG8gYVxuICAgICogZGVidWdnaW5nIHNlcnZlci5cbiAgICAqIFRoaXMgaXMgYW4gYWx0ZXJuYXRpdmUgaW50ZXJmYWNlIHRvIHtAbGluayBFdmVudEVtaXR0ZXIucHJvdG90eXBlI29ufS5cbiAgICAqIEBtZW1iZXJvZiBCYXNlSW50ZXJwcmV0ZXIucHJvdG90eXBlIFxuICAgICogQHBhcmFtIHtMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAqL1xuICAgIHJlZ2lzdGVyTGlzdGVuZXIgOiBmdW5jdGlvbihsaXN0ZW5lcil7XG4gICAgICAgIEJhc2VJbnRlcnByZXRlci5FVkVOVFMuZm9yRWFjaChmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgaWYobGlzdGVuZXJbZXZlbnRdKSB0aGlzLm9uKGV2ZW50LGxpc3RlbmVyW2V2ZW50XSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKiogXG4gICAgKiBVbnJlZ2lzdGVyIGEgTGlzdGVuZXJcbiAgICAqIEBtZW1iZXJvZiBCYXNlSW50ZXJwcmV0ZXIucHJvdG90eXBlIFxuICAgICogQHBhcmFtIHtMaXN0ZW5lcn0gbGlzdGVuZXJcbiAgICAqL1xuICAgIHVucmVnaXN0ZXJMaXN0ZW5lciA6IGZ1bmN0aW9uKGxpc3RlbmVyKXtcbiAgICAgICAgQmFzZUludGVycHJldGVyLkVWRU5UUy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICBpZihsaXN0ZW5lcltldmVudF0pIHRoaXMub2ZmKGV2ZW50LGxpc3RlbmVyW2V2ZW50XSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICAvKiogXG4gICAgKiBRdWVyeSB0aGUgbW9kZWwgdG8gZ2V0IGFsbCB0cmFuc2l0aW9uIGV2ZW50cy5cbiAgICAqIEByZXR1cm4ge0FycmF5PHN0cmluZz59IFRyYW5zaXRpb24gZXZlbnRzLlxuICAgICogQG1lbWJlcm9mIEJhc2VJbnRlcnByZXRlci5wcm90b3R5cGUgXG4gICAgKi9cbiAgICBnZXRBbGxUcmFuc2l0aW9uRXZlbnRzIDogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGV2ZW50cyA9IHt9O1xuICAgICAgICBmdW5jdGlvbiBnZXRFdmVudHMoc3RhdGUpe1xuXG4gICAgICAgICAgICBpZihzdGF0ZS50cmFuc2l0aW9ucyl7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgdHhJZHggPSAwLCB0eExlbiA9IHN0YXRlLnRyYW5zaXRpb25zLmxlbmd0aDsgdHhJZHggPCB0eExlbjsgdHhJZHgrKykge1xuICAgICAgICAgICAgICAgICAgICBldmVudHNbc3RhdGUudHJhbnNpdGlvbnNbdHhJZHhdLmV2ZW50XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzdGF0ZS5zdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzdGF0ZUlkeCA9IDAsIHN0YXRlTGVuID0gc3RhdGUuc3RhdGVzLmxlbmd0aDsgc3RhdGVJZHggPCBzdGF0ZUxlbjsgc3RhdGVJZHgrKykge1xuICAgICAgICAgICAgICAgICAgICBnZXRFdmVudHMoc3RhdGUuc3RhdGVzW3N0YXRlSWR4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZ2V0RXZlbnRzKHRoaXMuX21vZGVsKTtcblxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBUaHJlZSB0aGluZ3MgY2FwdHVyZSB0aGUgY3VycmVudCBzbmFwc2hvdCBvZiBhIHJ1bm5pbmcgU0NJT04gaW50ZXJwcmV0ZXI6XG4gICAgKlxuICAgICogICAgICA8dWw+XG4gICAgKiAgICAgIDxsaT4gYmFzaWMgY29uZmlndXJhdGlvbiAodGhlIHNldCBvZiBiYXNpYyBzdGF0ZXMgdGhlIHN0YXRlIG1hY2hpbmUgaXMgaW4pPC9saT5cbiAgICAqICAgICAgPGxpPiBoaXN0b3J5IHN0YXRlIHZhbHVlcyAodGhlIHN0YXRlcyB0aGUgc3RhdGUgbWFjaGluZSB3YXMgaW4gbGFzdCB0aW1lIGl0IHdhcyBpbiB0aGUgcGFyZW50IG9mIGEgaGlzdG9yeSBzdGF0ZSk8L2xpPlxuICAgICogICAgICA8bGk+IHRoZSBkYXRhbW9kZWw8L2xpPlxuICAgICogICAgICA8L3VsPlxuICAgICogICAgICBcbiAgICAqIFRoZSBzbmFwc2hvdCBvYmplY3QgY2FuIGJlIHNlcmlhbGl6ZWQgYXMgSlNPTiBhbmQgc2F2ZWQgdG8gYSBkYXRhYmFzZS4gSXQgY2FuXG4gICAgKiBsYXRlciBiZSBwYXNzZWQgdG8gdGhlIFNDWE1MIGNvbnN0cnVjdG9yIHRvIHJlc3RvcmUgdGhlIHN0YXRlIG1hY2hpbmVcbiAgICAqIHVzaW5nIHRoZSBzbmFwc2hvdCBhcmd1bWVudC5cbiAgICAqXG4gICAgKiBAcmV0dXJuIHtTbmFwc2hvdH0gXG4gICAgKiBAbWVtYmVyb2YgQmFzZUludGVycHJldGVyLnByb3RvdHlwZSBcbiAgICAqL1xuICAgIGdldFNuYXBzaG90IDogZnVuY3Rpb24oKXtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMuZ2V0Q29uZmlndXJhdGlvbigpLFxuICAgICAgICB0aGlzLl9zZXJpYWxpemVIaXN0b3J5KCksXG4gICAgICAgIHRoaXMuX2lzSW5GaW5hbFN0YXRlLFxuICAgICAgICB0aGlzLl9tb2RlbC4kc2VyaWFsaXplRGF0YW1vZGVsKCksXG4gICAgICAgIHRoaXMuX2ludGVybmFsRXZlbnRRdWV1ZS5zbGljZSgpXG4gICAgICBdO1xuICAgIH0sXG5cbiAgICBfc2VyaWFsaXplSGlzdG9yeSA6IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgbyA9IHt9O1xuICAgICAgT2JqZWN0LmtleXModGhpcy5faGlzdG9yeVZhbHVlKS5mb3JFYWNoKGZ1bmN0aW9uKHNpZCl7XG4gICAgICAgIG9bc2lkXSA9IHRoaXMuX2hpc3RvcnlWYWx1ZVtzaWRdLm1hcChmdW5jdGlvbihzdGF0ZSl7cmV0dXJuIHN0YXRlLmlkfSk7XG4gICAgICB9LHRoaXMpO1xuICAgICAgcmV0dXJuIG87XG4gICAgfVxufSk7XG5cbi8qKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBCYXNlSW50ZXJwcmV0ZXJcbiAqIEBtZW1iZXJvZiBzY2lvblxuICovXG5mdW5jdGlvbiBTdGF0ZWNoYXJ0KG1vZGVsLCBvcHRzKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICBvcHRzLkludGVycHJldGVyU2NyaXB0aW5nQ29udGV4dCA9IG9wdHMuSW50ZXJwcmV0ZXJTY3JpcHRpbmdDb250ZXh0IHx8IEludGVycHJldGVyU2NyaXB0aW5nQ29udGV4dDtcblxuICAgIHRoaXMuX2lzU3RlcHBpbmcgPSBmYWxzZTtcblxuICAgIEJhc2VJbnRlcnByZXRlci5jYWxsKHRoaXMsbW9kZWwsb3B0cyk7ICAgICAvL2NhbGwgc3VwZXIgY29uc3RydWN0b3JcblxuICAgIG1vZHVsZS5leHBvcnRzLmVtaXQoJ25ldycsdGhpcyk7XG59XG5cbmZ1bmN0aW9uIGJlZ2V0KG8pe1xuICAgIGZ1bmN0aW9uIEYoKXt9XG4gICAgRi5wcm90b3R5cGUgPSBvO1xuICAgIHJldHVybiBuZXcgRigpO1xufVxuXG4vLyBEbyBub3RoaW5nXG5cbmZ1bmN0aW9uIG5vcCgpIHt9XG5cbi8vU3RhdGVjaGFydC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEJhc2VJbnRlcnByZXRlci5wcm90b3R5cGUpO1xuLy93b3VsZCBsaWtlIHRvIHVzZSBPYmplY3QuY3JlYXRlIGhlcmUsIGJ1dCBub3QgcG9ydGFibGUsIGJ1dCBpdCdzIHRvbyBjb21wbGljYXRlZCB0byB1c2UgcG9ydGFibHlcblN0YXRlY2hhcnQucHJvdG90eXBlID0gYmVnZXQoQmFzZUludGVycHJldGVyLnByb3RvdHlwZSk7ICAgIFxuXG4vKipcbiAqIEBpbnRlcmZhY2UgRXZlbnRcbiAqL1xuXG4vKiogXG4qIEBtZW1iZXIgbmFtZVxuKiBAbWVtYmVyb2YgRXZlbnQucHJvdG90eXBlIFxuKiBAdHlwZSBzdHJpbmdcbiogQGRlc2NyaXB0aW9uIFRoZSBuYW1lIG9mIHRoZSBldmVudFxuKi9cblxuLyoqIFxuKiBAbWVtYmVyIGRhdGFcbiogQG1lbWJlcm9mIEV2ZW50LnByb3RvdHlwZSBcbiogQHR5cGUgYW55XG4qIEBkZXNjcmlwdGlvbiBUaGUgZXZlbnQgZGF0YVxuKi9cblxuLyoqIFxuKiBBbiBTQ1hNTCBpbnRlcnByZXRlciB0YWtlcyBTQ1hNTCBldmVudHMgYXMgaW5wdXQsIHdoZXJlIGFuIFNDWE1MIGV2ZW50IGlzIGFuXG4qIG9iamVjdCB3aXRoIFwibmFtZVwiIGFuZCBcImRhdGFcIiBwcm9wZXJ0aWVzLiBUaGVzZSBjYW4gYmUgcGFzc2VkIHRvIG1ldGhvZCBgZ2VuYFxuKiBhcyB0d28gcG9zaXRpb25hbCBhcmd1bWVudHMsIG9yIGFzIGEgc2luZ2xlIG9iamVjdC5cbiogQGZ1bmN0aW9uIGdlblxuKiBAbWVtYmVyb2YgU3RhdGVjaGFydC5wcm90b3R5cGUgXG4qIEBwYXJhbSB7c3RyaW5nfEV2ZW50fSBldnRPYmpPck5hbWVcbiogQHBhcmFtIHthbnk9fSBvcHRpb25hbERhdGFcbiogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkVudHJ5XG4qIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25FeGl0XG4qIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25UcmFuc2l0aW9uXG4qIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25EZWZhdWx0RW50cnlcbiogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkVycm9yXG4qIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25CaWdTdGVwQmVnaW5cbiogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkJpZ1N0ZXBFbmRcbiogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvbkJpZ1N0ZXBTdXNwZW5kXG4qIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25CaWdTdGVwUmVzdW1lXG4qIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25TbWFsbFN0ZXBCZWdpblxuKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uU21hbGxTdGVwRW5kXG4qIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25CaWdTdGVwRW5kXG4qIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25FeGl0SW50ZXJwcmV0ZXJcbiovXG5TdGF0ZWNoYXJ0LnByb3RvdHlwZS5nZW4gPSBmdW5jdGlvbihldnRPYmpPck5hbWUsb3B0aW9uYWxEYXRhKSB7XG5cbiAgICB2YXIgY3VycmVudEV2ZW50O1xuICAgIHN3aXRjaCh0eXBlb2YgZXZ0T2JqT3JOYW1lKXtcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgIGN1cnJlbnRFdmVudCA9IHtuYW1lIDogZXZ0T2JqT3JOYW1lLCBkYXRhIDogb3B0aW9uYWxEYXRhfTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgaWYodHlwZW9mIGV2dE9iak9yTmFtZS5uYW1lID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICAgICAgY3VycmVudEV2ZW50ID0gZXZ0T2JqT3JOYW1lO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFdmVudCBvYmplY3QgbXVzdCBoYXZlIFwibmFtZVwiIHByb3BlcnR5IG9mIHR5cGUgc3RyaW5nLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIGdlbiBtdXN0IGJlIGEgc3RyaW5nIG9yIG9iamVjdC4nKTtcbiAgICB9XG5cbiAgICBpZih0aGlzLl9pc1N0ZXBwaW5nKSB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIGdlbiBkdXJpbmcgYSBiaWctc3RlcCcpO1xuXG4gICAgLy9vdGhlcndpc2UsIGtpY2sgaGltIG9mZlxuICAgIHRoaXMuX2lzU3RlcHBpbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5fcGVyZm9ybUJpZ1N0ZXAoY3VycmVudEV2ZW50KTtcblxuICAgIHRoaXMuX2lzU3RlcHBpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcy5nZXRDb25maWd1cmF0aW9uKCk7XG59O1xuXG4vKipcbiogSW5qZWN0cyBhbiBleHRlcm5hbCBldmVudCBpbnRvIHRoZSBpbnRlcnByZXRlciBhc3luY2hyb25vdXNseVxuKiBAZnVuY3Rpb24gZ2VuQXN5bmNcbiogQG1lbWJlcm9mIFN0YXRlY2hhcnQucHJvdG90eXBlIFxuKiBAcGFyYW0ge0V2ZW50fSAgY3VycmVudEV2ZW50IFRoZSBldmVudCB0byBpbmplY3RcbiogQHBhcmFtIHtnZW5DYWxsYmFja30gY2IgQ2FsbGJhY2sgaW52b2tlZCB3aXRoIGFuIGVycm9yIG9yIHRoZSBpbnRlcnByZXRlcidzIHN0YWJsZSBjb25maWd1cmF0aW9uXG4qIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25FbnRyeVxuKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uRXhpdFxuKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uVHJhbnNpdGlvblxuKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uRGVmYXVsdEVudHJ5XG4qIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25FcnJvclxuKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uQmlnU3RlcEJlZ2luXG4qIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25CaWdTdGVwRW5kXG4qIEBlbWl0cyBCYXNlSW50ZXJwcmV0ZXIjb25CaWdTdGVwU3VzcGVuZFxuKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uQmlnU3RlcFJlc3VtZVxuKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uU21hbGxTdGVwQmVnaW5cbiogQGVtaXRzIEJhc2VJbnRlcnByZXRlciNvblNtYWxsU3RlcEVuZFxuKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uQmlnU3RlcEVuZFxuKiBAZW1pdHMgQmFzZUludGVycHJldGVyI29uRXhpdEludGVycHJldGVyXG4qL1xuU3RhdGVjaGFydC5wcm90b3R5cGUuZ2VuQXN5bmMgPSBmdW5jdGlvbihjdXJyZW50RXZlbnQsIGNiKSB7XG4gICAgaWYgKGN1cnJlbnRFdmVudCAhPT0gbnVsbCAmJiAodHlwZW9mIGN1cnJlbnRFdmVudCAhPT0gJ29iamVjdCcgfHwgIWN1cnJlbnRFdmVudCB8fCB0eXBlb2YgY3VycmVudEV2ZW50Lm5hbWUgIT09ICdzdHJpbmcnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGN1cnJlbnRFdmVudCB0byBiZSBudWxsIG9yIGFuIE9iamVjdCB3aXRoIGEgbmFtZScpO1xuICAgIH1cbiAgICBcbiAgICBpZiAodHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNiID0gbm9wO1xuICAgIH1cblxuICAgIHRoaXMuX2V4dGVybmFsRXZlbnRRdWV1ZS5wdXNoKFtjdXJyZW50RXZlbnQsIGNiXSk7XG5cbiAgICAvL3RoZSBzZW1hbnRpY3Mgd2Ugd2FudCBhcmUgdG8gcmV0dXJuIHRvIHRoZSBjYiB0aGUgcmVzdWx0cyBvZiBwcm9jZXNzaW5nIHRoYXQgcGFydGljdWxhciBldmVudC5cbiAgICBmdW5jdGlvbiBuZXh0U3RlcChlLCBjKXtcbiAgICAgIHRoaXMuX3BlcmZvcm1CaWdTdGVwQXN5bmMoZSwgZnVuY3Rpb24oZXJyLCBjb25maWcpIHtcbiAgICAgICAgICBjKGVyciwgY29uZmlnKTtcblxuICAgICAgICAgIGlmKHRoaXMuX2V4dGVybmFsRXZlbnRRdWV1ZS5sZW5ndGgpe1xuICAgICAgICAgICAgbmV4dFN0ZXAuYXBwbHkodGhpcyx0aGlzLl9leHRlcm5hbEV2ZW50UXVldWUuc2hpZnQoKSk7XG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB0aGlzLl9pc1N0ZXBwaW5nID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgaWYoIXRoaXMuX2lzU3RlcHBpbmcpeyBcbiAgICAgIHRoaXMuX2lzU3RlcHBpbmcgPSB0cnVlO1xuICAgICAgbmV4dFN0ZXAuYXBwbHkodGhpcyx0aGlzLl9leHRlcm5hbEV2ZW50UXVldWUuc2hpZnQoKSk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gSW50ZXJwcmV0ZXJTY3JpcHRpbmdDb250ZXh0KGludGVycHJldGVyKSB7XG4gICAgdGhpcy5faW50ZXJwcmV0ZXIgPSBpbnRlcnByZXRlcjtcbiAgICB0aGlzLl90aW1lb3V0TWFwID0ge307XG4gICAgdGhpcy5faW52b2tlTWFwID0ge307XG4gICAgdGhpcy5fdGltZW91dHMgPSBuZXcgU2V0KClcbn1cblxuLy9SZWdleCBmcm9tOlxuLy8gIGh0dHA6Ly9kYXJpbmdmaXJlYmFsbC5uZXQvMjAxMC8wNy9pbXByb3ZlZF9yZWdleF9mb3JfbWF0Y2hpbmdfdXJsc1xuLy8gIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzY5Mjc4NzhcbnZhciB2YWxpZGF0ZVVyaVJlZ2V4ID0gLygjXy4qKXxcXGIoKD86W2Etel1bXFx3LV0rOig/OlxcL3sxLDN9fFthLXowLTklXSl8d3d3XFxkezAsM31bLl18W2EtejAtOS5cXC1dK1suXVthLXpdezIsNH1cXC8pKD86W15cXHMoKTw+XSt8XFwoKFteXFxzKCk8Pl0rfChcXChbXlxccygpPD5dK1xcKSkpKlxcKSkrKD86XFwoKFteXFxzKCk8Pl0rfChcXChbXlxccygpPD5dK1xcKSkpKlxcKXxbXlxcc2AhKClcXFtcXF17fTs6J1wiLiw8Pj/Cq8K74oCc4oCd4oCY4oCZXSkpL2k7XG5cbi8vVE9ETzogY29uc2lkZXIgd2hldGhlciB0aGlzIGlzIHRoZSBBUEkgd2Ugd291bGQgbGlrZSB0byBleHBvc2VcbkludGVycHJldGVyU2NyaXB0aW5nQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgaW52b2tlU2VuZFRhcmdldFJlZ2V4ICA6IC9eI18oLiopJC8sXG4gICAgc2N4bWxTZW5kVGFyZ2V0UmVnZXggIDogL14jX3NjeG1sXyguKikkLyxcbiAgICByYWlzZSA6IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgdGhpcy5faW5zdGFsbERlZmF1bHRQcm9wc09uRXZlbnQoZXZlbnQsIHRydWUpO1xuICAgICAgICB0aGlzLl9pbnRlcnByZXRlci5faW50ZXJuYWxFdmVudFF1ZXVlLnB1c2goZXZlbnQpOyBcbiAgICB9LFxuICAgIHBhcnNlWG1sU3RyaW5nQXNET00gOiBmdW5jdGlvbih4bWxTdHJpbmcpe1xuICAgICAgcmV0dXJuICh0aGlzLl9pbnRlcnByZXRlci5vcHRzLnhtbFBhcnNlciB8fCBJbnRlcnByZXRlclNjcmlwdGluZ0NvbnRleHQueG1sUGFyc2VyKS5wYXJzZSh4bWxTdHJpbmcpO1xuICAgIH0sXG4gICAgaW52b2tlIDogZnVuY3Rpb24oaW52b2tlT2JqKXtcbiAgICAgIC8vbG9vayB1cCBpbnZva2VyIGJ5IHR5cGUuIGFzc3VtZSBpbnZva2VycyBhcmUgcGFzc2VkIGluIGFzIGFuIG9wdGlvbiB0byBjb25zdHJ1Y3RvclxuICAgICAgdGhpcy5faW52b2tlTWFwW2ludm9rZU9iai5pZF0gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICh0aGlzLl9pbnRlcnByZXRlci5vcHRzLmludm9rZXJzIHx8IEludGVycHJldGVyU2NyaXB0aW5nQ29udGV4dC5pbnZva2VycylbaW52b2tlT2JqLnR5cGVdKHRoaXMuX2ludGVycHJldGVyLCBpbnZva2VPYmosIChlcnIsIHNlc3Npb24pID0+IHtcbiAgICAgICAgICBpZihlcnIpIHJldHVybiByZWplY3QoZXJyKTtcblxuICAgICAgICAgIHRoaXMuX2ludGVycHJldGVyLmVtaXQoJ29uSW52b2tlZFNlc3Npb25Jbml0aWFsaXplZCcsIHNlc3Npb24pO1xuICAgICAgICAgIHJlc29sdmUoc2Vzc2lvbik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBjYW5jZWxJbnZva2UgOiBmdW5jdGlvbihpbnZva2VpZCl7XG4gICAgICAvL1RPRE86IG9uIGNhbmNlbCBpbnZva2UgY2xlYW4gdXAgdGhpcy5faW52b2tlTWFwXG4gICAgICBsZXQgc2Vzc2lvblByb21pc2UgPSB0aGlzLl9pbnZva2VNYXBbaW52b2tlaWRdO1xuICAgICAgdGhpcy5faW50ZXJwcmV0ZXIuX2xvZyhgY2FuY2VsbGluZyBzZXNzaW9uIHdpdGggaW52b2tlaWQgJHtpbnZva2VpZH1gKTtcbiAgICAgIGlmKHNlc3Npb25Qcm9taXNlKXtcbiAgICAgICAgdGhpcy5faW50ZXJwcmV0ZXIuX2xvZyhgc2Vzc2lvblByb21pc2UgZm91bmRgKTtcbiAgICAgICAgc2Vzc2lvblByb21pc2UudGhlbiggXG4gICAgICAgICAgKChzZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcnByZXRlci5fbG9nKGByZXNvbHZlZCBzZXNzaW9uICR7aW52b2tlaWR9LiBjYW5jZWxsaW5nLi4uIGApO1xuICAgICAgICAgICAgc2Vzc2lvbi5jYW5jZWwoKTsgXG4gICAgICAgICAgICAvL2NsZWFuIHVwXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5faW52b2tlTWFwW2ludm9rZWlkXTtcbiAgICAgICAgICB9KSwgXG4gICAgICAgICAgKCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAvL1RPRE86IGRpc3BhdGNoIGVycm9yIGJhY2sgaW50byB0aGUgc3RhdGUgbWFjaGluZSBhcyBlcnJvci5jb21tdW5pY2F0aW9uXG4gICAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgX2luc3RhbGxEZWZhdWx0UHJvcHNPbkV2ZW50IDogZnVuY3Rpb24oZXZlbnQsaXNJbnRlcm5hbCl7XG4gICAgICBpZighaXNJbnRlcm5hbCl7IFxuICAgICAgICBldmVudC5vcmlnaW4gPSB0aGlzLl9pbnRlcnByZXRlci5vcHRzLl94Ll9pb3Byb2Nlc3NvcnMuc2N4bWwubG9jYXRpb247ICAgICAvL1RPRE86IHByZXNlcnZlIG9yaWdpbmFsIG9yaWdpbiB3aGVuIHdlIGF1dG9mb3J3YXJkPyBcbiAgICAgICAgZXZlbnQub3JpZ2ludHlwZSA9IGV2ZW50LnR5cGUgfHwgU0NYTUxfSU9QUk9DRVNTT1JfVFlQRTtcbiAgICAgIH1cbiAgICAgIGlmKHR5cGVvZiBldmVudC50eXBlID09PSAndW5kZWZpbmVkJyl7XG4gICAgICAgIGV2ZW50LnR5cGUgPSBpc0ludGVybmFsID8gJ2ludGVybmFsJyA6ICdleHRlcm5hbCc7XG4gICAgICB9XG4gICAgICBbXG4gICAgICAgICduYW1lJyxcbiAgICAgICAgJ3NlbmRpZCcsXG4gICAgICAgICdpbnZva2VpZCcsXG4gICAgICAgICdkYXRhJyxcbiAgICAgICAgJ29yaWdpbicsXG4gICAgICAgICdvcmlnaW50eXBlJ1xuICAgICAgXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICBpZih0eXBlb2YgZXZlbnRbcHJvcF0gPT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICBldmVudFtwcm9wXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBzZW5kIDogZnVuY3Rpb24oZXZlbnQsIG9wdGlvbnMpe1xuICAgICAgICB0aGlzLl9pbnRlcnByZXRlci5fbG9nKCdzZW5kIGV2ZW50JywgZXZlbnQsIG9wdGlvbnMpO1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdmFyIHNlbmRUeXBlID0gb3B0aW9ucy50eXBlIHx8IFNDWE1MX0lPUFJPQ0VTU09SX1RZUEU7XG4gICAgICAgIC8vVE9ETzogbW92ZSB0aGVzZSBvdXRcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRhdGVTZW5kKGV2ZW50LCBvcHRpb25zLCBzZW5kQWN0aW9uKXtcbiAgICAgICAgICBpZihldmVudC50YXJnZXQpe1xuICAgICAgICAgICAgdmFyIHRhcmdldElzVmFsaWRVcmkgPSB2YWxpZGF0ZVVyaVJlZ2V4LnRlc3QoZXZlbnQudGFyZ2V0KVxuICAgICAgICAgICAgaWYoIXRhcmdldElzVmFsaWRVcmkpe1xuICAgICAgICAgICAgICB0aHJvdyB7IG5hbWUgOiBcImVycm9yLmV4ZWN1dGlvblwiLCBkYXRhOiAnVGFyZ2V0IGlzIG5vdCB2YWxpZCBVUkknLCBzZW5kaWQ6IGV2ZW50LnNlbmRpZCwgdHlwZSA6ICdwbGF0Zm9ybScgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoIHNlbmRUeXBlICE9PSBTQ1hNTF9JT1BST0NFU1NPUl9UWVBFKSB7ICAvL1RPRE86IGV4dGVuZCB0aGlzIHRvIHN1cHBvcnQgSFRUUCwgYW5kIG90aGVyIElPIHByb2Nlc3NvcnNcbiAgICAgICAgICAgICAgdGhyb3cgeyBuYW1lIDogXCJlcnJvci5leGVjdXRpb25cIiwgZGF0YTogJ1Vuc3VwcG9ydGVkIGV2ZW50IHByb2Nlc3NvciB0eXBlJywgc2VuZGlkOiBldmVudC5zZW5kaWQsIHR5cGUgOiAncGxhdGZvcm0nIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VuZEFjdGlvbi5jYWxsKHRoaXMsIGV2ZW50LCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRlZmF1bHRTZW5kQWN0aW9uIChldmVudCwgb3B0aW9ucykge1xuXG4gICAgICAgICAgaWYoIHR5cGVvZiBzZXRUaW1lb3V0ID09PSAndW5kZWZpbmVkJyApIHRocm93IG5ldyBFcnJvcignRGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBvZiBTdGF0ZWNoYXJ0LnByb3RvdHlwZS5zZW5kIHdpbGwgbm90IHdvcmsgdW5sZXNzIHNldFRpbWVvdXQgaXMgZGVmaW5lZCBnbG9iYWxseS4nKTtcblxuICAgICAgICAgIHZhciBtYXRjaDtcbiAgICAgICAgICBpZihldmVudC50YXJnZXQgPT09ICcjX2ludGVybmFsJyl7XG4gICAgICAgICAgICB0aGlzLnJhaXNlKGV2ZW50KTtcbiAgICAgICAgICB9ZWxzZXsgXG4gICAgICAgICAgICB0aGlzLl9pbnN0YWxsRGVmYXVsdFByb3BzT25FdmVudChldmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgZXZlbnQub3JpZ2ludHlwZSA9IFNDWE1MX0lPUFJPQ0VTU09SX1RZUEU7ICAgICAgLy9UT0RPOiBleHRlbmQgdGhpcyB0byBzdXBwb3J0IEhUVFAsIGFuZCBvdGhlciBJTyBwcm9jZXNzb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE8gOiBwYXJhbXRlcml6ZSB0aGlzIGJhc2VkIG9uIHNlbmQvQHR5cGU/XG4gICAgICAgICAgICBpZighZXZlbnQudGFyZ2V0KXtcbiAgICAgICAgICAgICAgZG9TZW5kLmNhbGwodGhpcywgdGhpcy5faW50ZXJwcmV0ZXIpO1xuICAgICAgICAgICAgfWVsc2UgaWYoZXZlbnQudGFyZ2V0ID09PSAnI19wYXJlbnQnKXtcbiAgICAgICAgICAgICAgaWYodGhpcy5faW50ZXJwcmV0ZXIub3B0cy5wYXJlbnRTZXNzaW9uKXtcbiAgICAgICAgICAgICAgICBldmVudC5pbnZva2VpZCA9IHRoaXMuX2ludGVycHJldGVyLm9wdHMuaW52b2tlaWQ7XG4gICAgICAgICAgICAgICAgZG9TZW5kLmNhbGwodGhpcywgdGhpcy5faW50ZXJwcmV0ZXIub3B0cy5wYXJlbnRTZXNzaW9uKTtcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgeyBuYW1lIDogXCJlcnJvci5jb21tdW5pY2F0aW9uXCIsIGRhdGE6ICdQYXJlbnQgc2Vzc2lvbiBub3Qgc3BlY2lmaWVkJywgc2VuZGlkOiBldmVudC5zZW5kaWQsIHR5cGUgOiAncGxhdGZvcm0nIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZihtYXRjaCA9IGV2ZW50LnRhcmdldC5tYXRjaCh0aGlzLnNjeG1sU2VuZFRhcmdldFJlZ2V4KSl7XG4gICAgICAgICAgICAgIGxldCB0YXJnZXRTZXNzaW9uSWQgPSBtYXRjaFsxXTtcbiAgICAgICAgICAgICAgbGV0IHNlc3Npb24gPSB0aGlzLl9pbnRlcnByZXRlci5vcHRzLnNlc3Npb25SZWdpc3RyeS5nZXQodGFyZ2V0U2Vzc2lvbklkKVxuICAgICAgICAgICAgICBpZihzZXNzaW9uKXtcbiAgICAgICAgICAgICAgICBkb1NlbmQuY2FsbCh0aGlzLHNlc3Npb24pO1xuICAgICAgICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cge25hbWUgOiAnZXJyb3IuY29tbXVuaWNhdGlvbicsIHNlbmRpZDogZXZlbnQuc2VuZGlkLCB0eXBlIDogJ3BsYXRmb3JtJ307XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKG1hdGNoID0gZXZlbnQudGFyZ2V0Lm1hdGNoKHRoaXMuaW52b2tlU2VuZFRhcmdldFJlZ2V4KSl7XG4gICAgICAgICAgICAgIC8vVE9ETzogdGVzdCB0aGlzIGNvZGUgcGF0aC5cbiAgICAgICAgICAgICAgdmFyIGludm9rZUlkID0gbWF0Y2hbMV1cbiAgICAgICAgICAgICAgdGhpcy5faW52b2tlTWFwW2ludm9rZUlkXS50aGVuKCAoc2Vzc2lvbikgPT4ge1xuICAgICAgICAgICAgICAgIGRvU2VuZC5jYWxsKHRoaXMsc2Vzc2lvbik7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VucmVjb2duaXplZCBzZW5kIHRhcmdldC4nKTsgLy9UT0RPOiBkaXNwYXRjaCBlcnJvciBiYWNrIGludG8gdGhlIHN0YXRlIG1hY2hpbmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBkb1NlbmQoc2Vzc2lvbil7XG4gICAgICAgICAgICAvL1RPRE86IHdlIHByb2JhYmx5IG5vdyBuZWVkIHRvIHJlZmFjdG9yIGRhdGEgc3RydWN0dXJlczpcbiAgICAgICAgICAgIC8vICAgIHRoaXMuX3RpbWVvdXRzXG4gICAgICAgICAgICAvLyAgICB0aGlzLl90aW1lb3V0TWFwXG4gICAgICAgICAgICB2YXIgdGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50LnNlbmRpZCkgZGVsZXRlIHRoaXMuX3RpbWVvdXRNYXBbZXZlbnQuc2VuZGlkXTtcbiAgICAgICAgICAgICAgdGhpcy5fdGltZW91dHMuZGVsZXRlKHRpbWVvdXRPcHRpb25zKTtcbiAgICAgICAgICAgICAgaWYodGhpcy5faW50ZXJwcmV0ZXIub3B0cy5kb1NlbmQpe1xuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVycHJldGVyLm9wdHMuZG9TZW5kKHNlc3Npb24sIGV2ZW50KTtcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc2Vzc2lvblt0aGlzLl9pbnRlcnByZXRlci5vcHRzLnNlbmRBc3luYyA/ICdnZW5Bc3luYycgOiAnZ2VuJ10oZXZlbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIG9wdGlvbnMuZGVsYXkgfHwgMCk7XG5cbiAgICAgICAgICAgIHZhciB0aW1lb3V0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgc2VuZE9wdGlvbnMgOiBvcHRpb25zLFxuICAgICAgICAgICAgICB0aW1lb3V0SGFuZGxlIDogdGltZW91dEhhbmRsZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChldmVudC5zZW5kaWQpIHRoaXMuX3RpbWVvdXRNYXBbZXZlbnQuc2VuZGlkXSA9IHRpbWVvdXRIYW5kbGU7XG4gICAgICAgICAgICB0aGlzLl90aW1lb3V0cy5hZGQodGltZW91dE9wdGlvbnMpOyBcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBwdWJsaXNoKCl7XG4gICAgICAgICAgdGhpcy5faW50ZXJwcmV0ZXIuZW1pdChldmVudC5uYW1lLGV2ZW50LmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9jaG9vc2Ugc2VuZCBmdW5jdGlvblxuICAgICAgICAvL1RPRE86IHJldGhpbmsgaG93IHRoaXMgY3VzdG9tIHNlbmQgd29ya3NcbiAgICAgICAgdmFyIHNlbmRGbjsgICAgICAgICBcbiAgICAgICAgaWYoZXZlbnQudHlwZSA9PT0gJ2h0dHBzOi8vZ2l0aHViLmNvbS9qYmVhcmQ0L1NDSU9OI3B1Ymxpc2gnKXtcbiAgICAgICAgICBzZW5kRm4gPSBwdWJsaXNoO1xuICAgICAgICB9ZWxzZSBpZih0aGlzLl9pbnRlcnByZXRlci5vcHRzLmN1c3RvbVNlbmQpe1xuICAgICAgICAgIHNlbmRGbiA9IHRoaXMuX2ludGVycHJldGVyLm9wdHMuY3VzdG9tU2VuZDtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgc2VuZEZuID0gZGVmYXVsdFNlbmRBY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zPW9wdGlvbnMgfHwge307XG5cbiAgICAgICAgdGhpcy5faW50ZXJwcmV0ZXIuX2xvZyhcInNlbmRpbmcgZXZlbnRcIiwgZXZlbnQubmFtZSwgXCJ3aXRoIGNvbnRlbnRcIiwgZXZlbnQuZGF0YSwgXCJhZnRlciBkZWxheVwiLCBvcHRpb25zLmRlbGF5KTtcblxuICAgICAgICB2YWxpZGF0ZVNlbmQuY2FsbCh0aGlzLCBldmVudCwgb3B0aW9ucywgc2VuZEZuKTtcbiAgICB9LFxuICAgIGNhbmNlbCA6IGZ1bmN0aW9uKHNlbmRpZCl7XG4gICAgICAgIGlmKHRoaXMuX2ludGVycHJldGVyLm9wdHMuY3VzdG9tQ2FuY2VsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW50ZXJwcmV0ZXIub3B0cy5jdXN0b21DYW5jZWwuYXBwbHkodGhpcywgW3NlbmRpZF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICd1bmRlZmluZWQnICkgdGhyb3cgbmV3IEVycm9yKCdEZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIFN0YXRlY2hhcnQucHJvdG90eXBlLmNhbmNlbCB3aWxsIG5vdCB3b3JrIHVubGVzcyBzZXRUaW1lb3V0IGlzIGRlZmluZWQgZ2xvYmFsbHkuJyk7XG5cbiAgICAgICAgaWYgKHNlbmRpZCBpbiB0aGlzLl90aW1lb3V0TWFwKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcnByZXRlci5fbG9nKFwiY2FuY2VsbGluZyBcIiwgc2VuZGlkLCBcIiB3aXRoIHRpbWVvdXQgaWQgXCIsIHRoaXMuX3RpbWVvdXRNYXBbc2VuZGlkXSk7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dE1hcFtzZW5kaWRdKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kKG5ldyBFdmVudEVtaXR0ZXIse1xuICAgIEJhc2VJbnRlcnByZXRlcjogQmFzZUludGVycHJldGVyLFxuICAgIFN0YXRlY2hhcnQ6IFN0YXRlY2hhcnQsXG4gICAgQXJyYXlTZXQgOiBBcnJheVNldCxcbiAgICBTVEFURV9UWVBFUyA6IGNvbnN0YW50cy5TVEFURV9UWVBFUyxcbiAgICBpbml0aWFsaXplTW9kZWwgOiBpbml0aWFsaXplTW9kZWwsXG4gICAgSW50ZXJwcmV0ZXJTY3JpcHRpbmdDb250ZXh0IDogSW50ZXJwcmV0ZXJTY3JpcHRpbmdDb250ZXh0XG59KTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBfb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5fbGlzdGVuZXJzW3R5cGVdKSkge1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0gPSBbXTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbGlzdGVuZXJzW3R5cGVdLmluZGV4T2YobGlzdGVuZXIpID09PSAtMSkge1xuICAgICAgICB0aGlzLl9saXN0ZW5lcnNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBfb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIF9fb25jZSgpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYub2ZmKHR5cGUsIF9fb25jZSk7XG4gICAgICAgIGxpc3RlbmVyLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH1cblxuICAgIF9fb25jZS5saXN0ZW5lciA9IGxpc3RlbmVyO1xuXG4gICAgcmV0dXJuIHRoaXMub24odHlwZSwgX19vbmNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gX29mZih0eXBlLCBsaXN0ZW5lcikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLl9saXN0ZW5lcnNbdHlwZV0pKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyc1t0eXBlXSA9IFtdO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnNbdHlwZV0uaW5kZXhPZihsaXN0ZW5lcik7XG5cbiAgICBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbGlzdGVuZXJzW3R5cGVdW2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2xpc3RlbmVyc1t0eXBlXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gX2VtaXQodHlwZSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLl9saXN0ZW5lcnNbdHlwZV0pKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZvciAodmFyIGFyZ3MgPSBbXSwgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgdGhpcy5fbGlzdGVuZXJzW3R5cGVdLmZvckVhY2goZnVuY3Rpb24gX19lbWl0KGxpc3RlbmVyKSB7XG4gICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4iLCJpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvclxuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIG9sZCBzY2hvb2wgc2hpbSBmb3Igb2xkIGJyb3dzZXJzXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3JcbiAgICB2YXIgVGVtcEN0b3IgPSBmdW5jdGlvbiAoKSB7fVxuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGVcbiAgICBjdG9yLnByb3RvdHlwZSA9IG5ldyBUZW1wQ3RvcigpXG4gICAgY3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjdG9yXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCdWZmZXIoYXJnKSB7XG4gIHJldHVybiBhcmcgJiYgdHlwZW9mIGFyZyA9PT0gJ29iamVjdCdcbiAgICAmJiB0eXBlb2YgYXJnLmNvcHkgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbidcbiAgICAmJiB0eXBlb2YgYXJnLnJlYWRVSW50OCA9PT0gJ2Z1bmN0aW9uJztcbn0iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGYpIHtcbiAgaWYgKCFpc1N0cmluZyhmKSkge1xuICAgIHZhciBvYmplY3RzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG9iamVjdHMucHVzaChpbnNwZWN0KGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0cy5qb2luKCcgJyk7XG4gIH1cblxuICB2YXIgaSA9IDE7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICB2YXIgbGVuID0gYXJncy5sZW5ndGg7XG4gIHZhciBzdHIgPSBTdHJpbmcoZikucmVwbGFjZShmb3JtYXRSZWdFeHAsIGZ1bmN0aW9uKHgpIHtcbiAgICBpZiAoeCA9PT0gJyUlJykgcmV0dXJuICclJztcbiAgICBpZiAoaSA+PSBsZW4pIHJldHVybiB4O1xuICAgIHN3aXRjaCAoeCkge1xuICAgICAgY2FzZSAnJXMnOiByZXR1cm4gU3RyaW5nKGFyZ3NbaSsrXSk7XG4gICAgICBjYXNlICclZCc6IHJldHVybiBOdW1iZXIoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVqJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYXJnc1tpKytdKTtcbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgfSk7XG4gIGZvciAodmFyIHggPSBhcmdzW2ldOyBpIDwgbGVuOyB4ID0gYXJnc1srK2ldKSB7XG4gICAgaWYgKGlzTnVsbCh4KSB8fCAhaXNPYmplY3QoeCkpIHtcbiAgICAgIHN0ciArPSAnICcgKyB4O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgKz0gJyAnICsgaW5zcGVjdCh4KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbihmbiwgbXNnKSB7XG4gIC8vIEFsbG93IGZvciBkZXByZWNhdGluZyB0aGluZ3MgaW4gdGhlIHByb2Nlc3Mgb2Ygc3RhcnRpbmcgdXAuXG4gIGlmIChpc1VuZGVmaW5lZChnbG9iYWwucHJvY2VzcykpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXhwb3J0cy5kZXByZWNhdGUoZm4sIG1zZykuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKHByb2Nlc3Mubm9EZXByZWNhdGlvbiA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBmbjtcbiAgfVxuXG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgZnVuY3Rpb24gZGVwcmVjYXRlZCgpIHtcbiAgICBpZiAoIXdhcm5lZCkge1xuICAgICAgaWYgKHByb2Nlc3MudGhyb3dEZXByZWNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvY2Vzcy50cmFjZURlcHJlY2F0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICAgIH1cbiAgICAgIHdhcm5lZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGRlcHJlY2F0ZWQ7XG59O1xuXG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0Vudmlyb247XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24oc2V0KSB7XG4gIGlmIChpc1VuZGVmaW5lZChkZWJ1Z0Vudmlyb24pKVxuICAgIGRlYnVnRW52aXJvbiA9IHByb2Nlc3MuZW52Lk5PREVfREVCVUcgfHwgJyc7XG4gIHNldCA9IHNldC50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWRlYnVnc1tzZXRdKSB7XG4gICAgaWYgKG5ldyBSZWdFeHAoJ1xcXFxiJyArIHNldCArICdcXFxcYicsICdpJykudGVzdChkZWJ1Z0Vudmlyb24pKSB7XG4gICAgICB2YXIgcGlkID0gcHJvY2Vzcy5waWQ7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uKCkge307XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWJ1Z3Nbc2V0XTtcbn07XG5cblxuLyoqXG4gKiBFY2hvcyB0aGUgdmFsdWUgb2YgYSB2YWx1ZS4gVHJ5cyB0byBwcmludCB0aGUgdmFsdWUgb3V0XG4gKiBpbiB0aGUgYmVzdCB3YXkgcG9zc2libGUgZ2l2ZW4gdGhlIGRpZmZlcmVudCB0eXBlcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcHJpbnQgb3V0LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgdGhhdCBhbHRlcnMgdGhlIG91dHB1dC5cbiAqL1xuLyogbGVnYWN5OiBvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMqL1xuZnVuY3Rpb24gaW5zcGVjdChvYmosIG9wdHMpIHtcbiAgLy8gZGVmYXVsdCBvcHRpb25zXG4gIHZhciBjdHggPSB7XG4gICAgc2VlbjogW10sXG4gICAgc3R5bGl6ZTogc3R5bGl6ZU5vQ29sb3JcbiAgfTtcbiAgLy8gbGVnYWN5Li4uXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIGN0eC5kZXB0aCA9IGFyZ3VtZW50c1syXTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNCkgY3R4LmNvbG9ycyA9IGFyZ3VtZW50c1szXTtcbiAgaWYgKGlzQm9vbGVhbihvcHRzKSkge1xuICAgIC8vIGxlZ2FjeS4uLlxuICAgIGN0eC5zaG93SGlkZGVuID0gb3B0cztcbiAgfSBlbHNlIGlmIChvcHRzKSB7XG4gICAgLy8gZ290IGFuIFwib3B0aW9uc1wiIG9iamVjdFxuICAgIGV4cG9ydHMuX2V4dGVuZChjdHgsIG9wdHMpO1xuICB9XG4gIC8vIHNldCBkZWZhdWx0IG9wdGlvbnNcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5zaG93SGlkZGVuKSkgY3R4LnNob3dIaWRkZW4gPSBmYWxzZTtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5kZXB0aCkpIGN0eC5kZXB0aCA9IDI7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY29sb3JzKSkgY3R4LmNvbG9ycyA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmN1c3RvbUluc3BlY3QpKSBjdHguY3VzdG9tSW5zcGVjdCA9IHRydWU7XG4gIGlmIChjdHguY29sb3JzKSBjdHguc3R5bGl6ZSA9IHN0eWxpemVXaXRoQ29sb3I7XG4gIHJldHVybiBmb3JtYXRWYWx1ZShjdHgsIG9iaiwgY3R4LmRlcHRoKTtcbn1cbmV4cG9ydHMuaW5zcGVjdCA9IGluc3BlY3Q7XG5cblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnIDogWzEsIDIyXSxcbiAgJ2l0YWxpYycgOiBbMywgMjNdLFxuICAndW5kZXJsaW5lJyA6IFs0LCAyNF0sXG4gICdpbnZlcnNlJyA6IFs3LCAyN10sXG4gICd3aGl0ZScgOiBbMzcsIDM5XSxcbiAgJ2dyZXknIDogWzkwLCAzOV0sXG4gICdibGFjaycgOiBbMzAsIDM5XSxcbiAgJ2JsdWUnIDogWzM0LCAzOV0sXG4gICdjeWFuJyA6IFszNiwgMzldLFxuICAnZ3JlZW4nIDogWzMyLCAzOV0sXG4gICdtYWdlbnRhJyA6IFszNSwgMzldLFxuICAncmVkJyA6IFszMSwgMzldLFxuICAneWVsbG93JyA6IFszMywgMzldXG59O1xuXG4vLyBEb24ndCB1c2UgJ2JsdWUnIG5vdCB2aXNpYmxlIG9uIGNtZC5leGVcbmluc3BlY3Quc3R5bGVzID0ge1xuICAnc3BlY2lhbCc6ICdjeWFuJyxcbiAgJ251bWJlcic6ICd5ZWxsb3cnLFxuICAnYm9vbGVhbic6ICd5ZWxsb3cnLFxuICAndW5kZWZpbmVkJzogJ2dyZXknLFxuICAnbnVsbCc6ICdib2xkJyxcbiAgJ3N0cmluZyc6ICdncmVlbicsXG4gICdkYXRlJzogJ21hZ2VudGEnLFxuICAvLyBcIm5hbWVcIjogaW50ZW50aW9uYWxseSBub3Qgc3R5bGluZ1xuICAncmVnZXhwJzogJ3JlZCdcbn07XG5cblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICtcbiAgICAgICAgICAgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cblxuZnVuY3Rpb24gc3R5bGl6ZU5vQ29sb3Ioc3RyLCBzdHlsZVR5cGUpIHtcbiAgcmV0dXJuIHN0cjtcbn1cblxuXG5mdW5jdGlvbiBhcnJheVRvSGFzaChhcnJheSkge1xuICB2YXIgaGFzaCA9IHt9O1xuXG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24odmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMpIHtcbiAgLy8gUHJvdmlkZSBhIGhvb2sgZm9yIHVzZXItc3BlY2lmaWVkIGluc3BlY3QgZnVuY3Rpb25zLlxuICAvLyBDaGVjayB0aGF0IHZhbHVlIGlzIGFuIG9iamVjdCB3aXRoIGFuIGluc3BlY3QgZnVuY3Rpb24gb24gaXRcbiAgaWYgKGN0eC5jdXN0b21JbnNwZWN0ICYmXG4gICAgICB2YWx1ZSAmJlxuICAgICAgaXNGdW5jdGlvbih2YWx1ZS5pbnNwZWN0KSAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcywgY3R4KTtcbiAgICBpZiAoIWlzU3RyaW5nKHJldCkpIHtcbiAgICAgIHJldCA9IGZvcm1hdFZhbHVlKGN0eCwgcmV0LCByZWN1cnNlVGltZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgLy8gUHJpbWl0aXZlIHR5cGVzIGNhbm5vdCBoYXZlIHByb3BlcnRpZXNcbiAgdmFyIHByaW1pdGl2ZSA9IGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKTtcbiAgaWYgKHByaW1pdGl2ZSkge1xuICAgIHJldHVybiBwcmltaXRpdmU7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuICB2YXIgdmlzaWJsZUtleXMgPSBhcnJheVRvSGFzaChrZXlzKTtcblxuICBpZiAoY3R4LnNob3dIaWRkZW4pIHtcbiAgICBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpO1xuICB9XG5cbiAgLy8gSUUgZG9lc24ndCBtYWtlIGVycm9yIGZpZWxkcyBub24tZW51bWVyYWJsZVxuICAvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvaWUvZHd3NTJzYnQodj12cy45NCkuYXNweFxuICBpZiAoaXNFcnJvcih2YWx1ZSlcbiAgICAgICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgdmFyIG4gPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbiArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSlcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoJ3VuZGVmaW5lZCcsICd1bmRlZmluZWQnKTtcbiAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xuICAgIHZhciBzaW1wbGUgPSAnXFwnJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKS5yZXBsYWNlKC9eXCJ8XCIkL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgIHJldHVybiBjdHguc3R5bGl6ZShzaW1wbGUsICdzdHJpbmcnKTtcbiAgfVxuICBpZiAoaXNOdW1iZXIodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG4gIGlmIChpc0Jvb2xlYW4odmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKVxuICAgIHJldHVybiBjdHguc3R5bGl6ZSgnbnVsbCcsICdudWxsJyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0RXJyb3IodmFsdWUpIHtcbiAgcmV0dXJuICdbJyArIEVycm9yLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSArICddJztcbn1cblxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsXG4gICAgICAgICAgU3RyaW5nKGkpLCB0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5wdXNoKCcnKTtcbiAgICB9XG4gIH1cbiAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIGlmICgha2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleSwgYXJyYXkpIHtcbiAgdmFyIG5hbWUsIHN0ciwgZGVzYztcbiAgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSkgfHwgeyB2YWx1ZTogdmFsdWVba2V5XSB9O1xuICBpZiAoZGVzYy5nZXQpIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbR2V0dGVyL1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZGVzYy5zZXQpIHtcbiAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICghaGFzT3duUHJvcGVydHkodmlzaWJsZUtleXMsIGtleSkpIHtcbiAgICBuYW1lID0gJ1snICsga2V5ICsgJ10nO1xuICB9XG4gIGlmICghc3RyKSB7XG4gICAgaWYgKGN0eC5zZWVuLmluZGV4T2YoZGVzYy52YWx1ZSkgPCAwKSB7XG4gICAgICBpZiAoaXNOdWxsKHJlY3Vyc2VUaW1lcykpIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCBkZXNjLnZhbHVlLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgcmVjdXJzZVRpbWVzIC0gMSk7XG4gICAgICB9XG4gICAgICBpZiAoc3RyLmluZGV4T2YoJ1xcbicpID4gLTEpIHtcbiAgICAgICAgaWYgKGFycmF5KSB7XG4gICAgICAgICAgc3RyID0gc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICcgKyBsaW5lO1xuICAgICAgICAgIH0pLmpvaW4oJ1xcbicpLnN1YnN0cigyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHIgPSAnXFxuJyArIHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICtcbiAgICAgICAgICAgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIG91dHB1dC5qb2luKCcsXFxuICAnKSArXG4gICAgICAgICAgICcgJyArXG4gICAgICAgICAgIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cblxuLy8gTk9URTogVGhlc2UgdHlwZSBjaGVja2luZyBmdW5jdGlvbnMgaW50ZW50aW9uYWxseSBkb24ndCB1c2UgYGluc3RhbmNlb2ZgXG4vLyBiZWNhdXNlIGl0IGlzIGZyYWdpbGUgYW5kIGNhbiBiZSBlYXNpbHkgZmFrZWQgd2l0aCBgT2JqZWN0LmNyZWF0ZSgpYC5cbmZ1bmN0aW9uIGlzQXJyYXkoYXIpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXIpO1xufVxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNCb29sZWFuKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nO1xufVxuZXhwb3J0cy5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsID0gaXNOdWxsO1xuXG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PSBudWxsO1xufVxuZXhwb3J0cy5pc051bGxPclVuZGVmaW5lZCA9IGlzTnVsbE9yVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuZXhwb3J0cy5pc051bWJlciA9IGlzTnVtYmVyO1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc1N5bWJvbChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnO1xufVxuZXhwb3J0cy5pc1N5bWJvbCA9IGlzU3ltYm9sO1xuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuZXhwb3J0cy5pc1VuZGVmaW5lZCA9IGlzVW5kZWZpbmVkO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChyZSkge1xuICByZXR1cm4gaXNPYmplY3QocmUpICYmIG9iamVjdFRvU3RyaW5nKHJlKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59XG5leHBvcnRzLmlzUmVnRXhwID0gaXNSZWdFeHA7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBpc0RhdGUoZCkge1xuICByZXR1cm4gaXNPYmplY3QoZCkgJiYgb2JqZWN0VG9TdHJpbmcoZCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbmV4cG9ydHMuaXNEYXRlID0gaXNEYXRlO1xuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGUpICYmXG4gICAgICAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJyB8fFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ251bWJlcicgfHxcbiAgICAgICAgIHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgICB0eXBlb2YgYXJnID09PSAnc3ltYm9sJyB8fCAgLy8gRVM2IHN5bWJvbFxuICAgICAgICAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5cbmZ1bmN0aW9uIHBhZChuKSB7XG4gIHJldHVybiBuIDwgMTAgPyAnMCcgKyBuLnRvU3RyaW5nKDEwKSA6IG4udG9TdHJpbmcoMTApO1xufVxuXG5cbnZhciBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJyxcbiAgICAgICAgICAgICAgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbi8vIDI2IEZlYiAxNjoxOTozNFxuZnVuY3Rpb24gdGltZXN0YW1wKCkge1xuICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gIHZhciB0aW1lID0gW3BhZChkLmdldEhvdXJzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRNaW51dGVzKCkpLFxuICAgICAgICAgICAgICBwYWQoZC5nZXRTZWNvbmRzKCkpXS5qb2luKCc6Jyk7XG4gIHJldHVybiBbZC5nZXREYXRlKCksIG1vbnRoc1tkLmdldE1vbnRoKCldLCB0aW1lXS5qb2luKCcgJyk7XG59XG5cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coJyVzIC0gJXMnLCB0aW1lc3RhbXAoKSwgZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKSk7XG59O1xuXG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyLlxuICpcbiAqIFRoZSBGdW5jdGlvbi5wcm90b3R5cGUuaW5oZXJpdHMgZnJvbSBsYW5nLmpzIHJld3JpdHRlbiBhcyBhIHN0YW5kYWxvbmVcbiAqIGZ1bmN0aW9uIChub3Qgb24gRnVuY3Rpb24ucHJvdG90eXBlKS4gTk9URTogSWYgdGhpcyBmaWxlIGlzIHRvIGJlIGxvYWRlZFxuICogZHVyaW5nIGJvb3RzdHJhcHBpbmcgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSByZXdyaXR0ZW4gdXNpbmcgc29tZSBuYXRpdmVcbiAqIGZ1bmN0aW9ucyBhcyBwcm90b3R5cGUgc2V0dXAgdXNpbmcgbm9ybWFsIEphdmFTY3JpcHQgZG9lcyBub3Qgd29yayBhc1xuICogZXhwZWN0ZWQgZHVyaW5nIGJvb3RzdHJhcHBpbmcgKHNlZSBtaXJyb3IuanMgaW4gcjExNDkwMykuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB3aGljaCBuZWVkcyB0byBpbmhlcml0IHRoZVxuICogICAgIHByb3RvdHlwZS5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ3RvciBDb25zdHJ1Y3RvciBmdW5jdGlvbiB0byBpbmhlcml0IHByb3RvdHlwZSBmcm9tLlxuICovXG5leHBvcnRzLmluaGVyaXRzID0gcmVxdWlyZSgnaW5oZXJpdHMnKTtcblxuZXhwb3J0cy5fZXh0ZW5kID0gZnVuY3Rpb24ob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG4iXX0=
