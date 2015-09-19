[![Build status](https://travis-ci.org/jbeard4/SCION-CORE.svg?branch=master)](https://travis-ci.org/jbeard4/SCION-CORE)

# Overview

Statecharts is a powerful modelling language for developing **complex, timed, event-driven, state-based systems**. For an overview of Statecharts see [Statecharts: A Visual Formalism For Complex Systems](http://websrv0a.sdu.dk/ups/ESD/materials/harel-Statecharts.pdf) and [The Rhapsody Semantics of Statecharts](http://research.microsoft.com/pubs/148761/Charts04.pdf).

SCION-CORE is a small (2.9kb, minified and gzipped), embeddable implementation of Statecharts in ECMAScript (JavaScript). SCION-CORE lets you program with Statecharts using a simple JavaScript/JSON API. It can be used in the browser to manage complex user interface behaviour, or on the server under Node.js or Rhino to manage page navigation and asynchronous control flow. It can even be used in custom JavaScript environments, such as the Mozilla Spidermonkey shell. 

SCION-CORE is written so as to abstract out platform dependencies, and is implemented as a single UMD module, which makes it easy to deploy in any JavaScript environment. The philosophy of SCION-CORE is **"write once, embed everywhere"**.

SCION-CORE powers [SCION 2.0](https://github.com/jbeard4/SCION/tree/2.0.0), an implementation of [SCXML](http://www.w3.org/TR/scxml) in JavaScript, and as such, it supports all of the features of the SCXML core module, including compound states ( **OR** states), parallel states ( **AND** states), and history states. 

# Quickstart and Simple Use Case

Let's start with the simple example of drag-and-drop behaviour in the browser. You can run this demo live on jsfiddle [here](http://jsfiddle.net/jbeard4/MDkLe/2/).

An entity that can be dragged has two states: idle and dragging. If the entity is in an idle state, and it receives a mousedown event, then it starts dragging. While dragging, if it receives a mousemove event, then it changes its position. Also while dragging, when it receives a mouseup event, it returns to the idle state.

This natural-language description of behaviour can be described using the following simple state machine:

![Drag and Drop](http://jbeard4.github.com/SCION/img/drag_and_drop.png)

This state machine could be written in SCION-CORE's JSON syntax as follows:

```javascript
{
    "states" : [
        {
            "id" : "idle",
            "transitions" : [
                {
                    "event" : "mousedown",
                    "target" : "dragging",
                }
            ]
        },
        {
            "id" : "dragging",
            "transitions" : [
                {
                    "event" : "mouseup",
                    "target" : "idle",
                },
                {
                    "event" : "mousemove",
                    "target" : "dragging"
                }
            ]
        }
    ]
}
```

One can add action code in order to script an HTML DOM element, so as to change its position on mousemove events:

```javascript
//declare the your statechart model, same as before
var firstEvent,
    eventStamp,
    rectNode = document.getElementById('rect'),
    rectX = 0,
    rectY = 0;

var statechartModel = {
    states : [
        {
            id : 'idle',
            onEntry : function(){
                rectNode.textContent='idle';
            },
            transitions : [
                {
                    event : 'mousedown',
                    target : 'dragging',
                    onTransition : function(event){
                        eventStamp = firstEvent = event.data;
                    }
                }
            ]
        },
        {
            id : 'dragging',
            onEntry : function(){
                rectNode.textContent='dragging';
            },
            transitions : [
                {
                    event : 'mouseup',
                    target : 'idle'
                },
                {
                    event : 'mousemove',
                    target : 'dragging',
                    onTransition : function(event){
                        var dx = eventStamp.clientX - event.data.clientX;
                        var dy = eventStamp.clientY - event.data.clientY;

                        rectNode.style.left = (rectX -= dx) + 'px';
                        rectNode.style.top = (rectY -= dy) + 'px';
                        
                        eventStamp = event.data;
                    }
                }
            ]
        }
    ]
};
```

You can then perform the following steps to script web content:

1. Use the statecharts model object to instantiate the SCXML interpreter.
2. Connect relevant event listeners to the SCXML interpreter.
3. Call the `start` method on the SCXML interpreter to start execution of the statechart.


```html
<html>
    <head>
        <script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/1.2.4/es5-shim.min.js"></script>
        <script type="text/javascript" src="http://jbeard4.github.com/SCION-CORE/builds/latest/scion-min.js"></script>
    </head>
    <body>
        <div id="rect"/>
        <script>
            //declare the your statechart model, same as before
            var firstEvent,
                eventStamp,
                rectNode = document.getElementById('rect'),
                rectX = 0,
                rectY = 0;

            var statechartModel = {
                states : [
                    {
                        id : 'idle',
                        onEntry : function(){
                            rectNode.textContent='idle';
                        },
                        transitions : [
                            {
                                event : 'mousedown',
                                target : 'dragging',
                                onTransition : function(event){
                                    eventStamp = firstEvent = event.data;
                                }
                            }
                        ]
                    },
                    {
                        id : 'dragging',
                        onEntry : function(){
                            rectNode.textContent='dragging';
                        },
                        transitions : [
                            {
                                event : 'mouseup',
                                target : 'idle'
                            },
                            {
                                event : 'mousemove',
                                target : 'dragging',
                                onTransition : function(event){
                                    var dx = eventStamp.clientX - event.data.clientX;
                                    var dy = eventStamp.clientY - event.data.clientY;

                                    rectNode.style.left = (rectX -= dx) + 'px';
                                    rectNode.style.top = (rectY -= dy) + 'px';
                                    
                                    eventStamp = event.data;
                                }
                            }
                        ]
                    }
                ]
            };

            //instantiate the interpreter
            var interpreter = new scion.Statechart(statechartModel);

            //start the interpreter
            interpreter.start();

            function handleEvent(e){
                e.preventDefault();
                interpreter.gen({name : e.type,data: e});
            }

            //connect all relevant event listeners
            rectNode.addEventListener('mousedown',handleEvent,true);
            document.documentElement.addEventListener('mouseup',handleEvent,true);
            document.documentElement.addEventListener('mousemove',handleEvent,true);


        </script>
    </body>
</html>
```
# Installation

## Browser

Add the following script tags to your web page:

```html
<script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/1.2.4/es5-shim.min.js"></script>
<script type="text/javascript" src="http://jbeard4.github.io/SCION-CORE/repository/lib/scion.js"></script>
```

SCION-CORE is then available as the global variable `scion`.

<!-- TODO: test with RequireJS and add documentation for this -->

## Node.js

Install SCION-CORE via npm:

    npm install scion-core

## Rhino

Get it with git:

    git clone git://github.com/jbeard4/SCION-CORE.git

Rhino 1.7R3 supports CommonJS modules, so SCION-CORE can be used as follows:

```bash
#just put SCION-CORE/lib on your modules path
rhino -modules path/to/SCION-CORE/lib -main path/to/your/script.js
```

# Statecharts Model Schema

SCION-CORE is designed to allow you to specify the Statecharts model declaratively as a single JavaScript object literal, or as JSON. This section is intended to describe the schema of the Statecharts object model accepted by SCION-CORE. 

This section will also touch briefly on semantics, but is not meant to serve as a comprehensive reference.  Unlike SCXML.js, a formal semantics has not been defined for SCION-CORE. However it is very close to [Rhapsody Semantics](http://research.microsoft.com/pubs/148761/Charts04.pdf).

## States

A SCION-CORE model is made up of states. States can have id's, which are optional. Here is a SCION-CORE model which is a single state:

```
{
    id : 'foo'
}
```

States can contain other states hierarchically:

```javascript
{
    id : 'foo'
    states : [
        {
            id : 'bar'
        },
        {
            id : 'bat'
        }
    ]
}
```

By default, a parent state will be an "OR" state, which means it defines an XOR relationship between its children (if the state machine is in 'foo', then the state machine will either be in state 'bar' or 'bat', but will never be in both 'bar' and 'bat' simultaneously). 

By default, when entering a parent state, the first state in the parent's state array will be entered. So, for example, when the state machine is started with the above model, its **configuration** (the set of states the state machine is currently in) will be `['foo','bar']`;

There are other types of states, however, including "parallel" states, which defines an "AND" relationship between substates.

```javascript
{
    id : 'foo'
    $type : 'parallel'
    states : [
        {
            id : 'bar'
        },
        {
            id : 'bat'
        }
    ]
}
```

In this example, if the state machine is in state 'foo', then the state machine will also be in state 'bar' and state 'bat' simultaneously. So when the state machine is started with the above model, its configuration will be `['foo','bar','bat']`.

## Transitions

States are associated with **transitions**, which target other states. Transitions are optionally associated with an **event name**. A SCION-CORE event is an object with "name" and "data" properties. When an event is sent to the state machine, the interpreter will inspect the current configuration, and select the set of transitions that matches event name.


```javascript
{
    id : 'foo'
    states : [
        {
            id : 'bar',
            transitions : [
                {
                    target : 'bat',
                    event : 't'
                }
            ]
        },
        {
            id : 'bat'
        }
    ]
}
```

In this case, the state machine would start in configuration `['foo','bar']`. When event `{ name : 't' }` is sent to the state machine, then the state machine would transition to state 'bat', and the resulting configuration would be `['foo','bat']`.

If the transition does not have an event property, then it is known as a "default transition", and it will be selected regardless of the event's "name" property.

A transition can also be associated with a **condition**, which is an arbitrary JavaScript function that accepts an event as input, and returns a boolean value as output. Boolean true means the transition can be selected, while boolean false means the transition will not be selected.

```javascript
{
    id : 'foo'
    states : [
        {
            id : 'bar',
            transitions : [
                {
                    target : 'bat',
                    event : 't',
                    cond : function(event){
                        return event.data % 2;
                    }
                }
            ]
        },
        {
            id : 'bat'
        }
    ]
}
```

For example, the above model will only transition from 'bar' to 'bat', when `event.data` contains an odd number.

## Entry, Exit, and Transition Actions

States can be associated with **entry** and **exit** actions. These are JavaScript functions which are executed when the state is entered or exited.

Transitions can also be associated with actions.

Actions are executed in the following order: 

* State exit actions, ordered first by hierarchy (inner states first), and then by the order in which they appear in the document.
* Transition actions, based on document order.
* State entry actions, ordered first by hierarchy (outer states first), and then by the order in which they appear in the document.

```javascript
var buffer;

var model = {
    id : 'foo'
    onEntry : function(event){
        buffer = [];      //initialize array
    },
    states : [
        {
            id : 'bar',
            onEntry : function(event){
                buffer.push(1);
            },
            onExit : function(event){
                buffer.push(2);
            },
            transitions : [
                {
                    target : 'bat',
                    event : 't',
                    onTransition : function(event){
                        buffer.push(3);
                    }
                }
            ]
        },
        {
            id : 'bat',
            onEntry : function(event){
                buffer.push(event.data);
            }
        }
    ]
};

var sc = new scion.Statechart(model);
sc.start();     //buffer now contains [1]
sc.gen('t','x');    //buffer now contains [1,2,3,'x']
```

For the above model, when the state machine is started, 'foo' would be entered, thus initializing variable `buffer` with a new array; and then state 'bar' would be entered, pushing `1` to the buffer. After the invocation to `sc.start`, the buffer would then container `[1]`.

During the call to `sc.gen`, the exit action of state 'bar' would be executed, pushing `2` to the buffer, followed by transition action, pushing `3` to the buffer, followed by the entry action of `bat`, pushing the event data, string `"x"`, to the buffer. After the call to `sc.gen` completes, the buffer would contain [1,2,3,'x'].

## History

A **history** state is a special pseudo-state that allows the state machine to "remember" what substate it was in last time it was in a particular parent state. There are two types of history states: "deep" and "shallow".

The syntax for specifying history states is as follows:

```javascript
{
    states : [
        {
            id : 'foo',
            transitions : [
                { 
                    event : 't2'
                    target : 'bif'
                }
            ],
            states : [
                {
                    id : 'h',
                    $type : 'history',
                    isDeep : true
                    transitions : [
                        {
                            target : 'bar'
                        }
                    ]
                },
                {
                    id : 'bar',
                    transitions : [
                        { 
                            event : 't1'
                            target : 'bat2'
                        }
                    ]
                },
                {
                    id : 'bat',
                    substates : [
                        {
                            id : 'bat1'
                        },
                        {
                            id : 'bat2'
                        }
                    ]
                }
            ]
        },
        {
            id : 'bif',
            transitions : [
                {
                    target : 'h',
                    event : 't3'
                }
            ]
        }
    ]
}
```

The first time the state machine enters 'h', it it will transition to state 'bar'. After the call to sc.start(), the state machine will reside in ['foo','bar'].

After the state machine sends event `t1`, the state machine will transition to 'bat2', and will reside in configuration `['foo','bat','bat2']`.

After the state machine sends event `t2`, the state machine will transition to 'bif', and will reside in configuration `['bif']`.

Finally, after the state machine sends event `t3`, the state machine will transition to back to the history state 'h', which will "remember", the configuration the state machine was in last time it was in 'foo', and the state machine will complete in configuration `['foo','bat','bat2']`.

If property `isDeep` had not been set on the history state, then the state machine would only have remembered the child substates of `foo`, and the state machine would have completed in configuration `['foo','bat','bat1']`.

## Communications

The context object ("`this`") of onEntry, onExit, and onTransition functions contains the following methods:

* `send(event)`, which adds an event to the Statechart's outer queue
* `raise(event)`, which adds an event to the Statechart's inner queue 

# API

## new scion.Statechart(model)

The SCXML constructor creates an interpreter instance from a model object.

```javascript
    //same model can be used to create multiple interpreter instances
    var sc1 = new scion.Statechart(model),
        sc2 = new scion.Statechart(model);
```

## sc.start() : `<String>`[]

`sc.start` starts the SCION-CORE interpreter. `sc.start` should only be called once, and should be called before `sc.gen` is called for the first time.

Returns a "basic configuration", which is an Array of strings representing the ids all of the basic states the interpreter is in after the call to `sc.start` completes.

## sc.gen(String eventName, Object eventData) : `<String>`[]
## sc.gen({name : String, data : Object}) : `<String>`[]

An SCXML interpreter takes SCXML events as input, where an SCXML event is an object with "name" and "data" properties. These can be passed to method `gen` as two positional arguments, or as a single object.

`sc.gen` returns a "basic configuration", which is an Array of strings representing the ids all of the basic states the interpreter is in after the call to `sc.gen` completes.

```javascript
    var sc = new scion.Statechart(model),

    var data = {foo:1};
    var configuration = sc.gen("eventName",data); 

    //the following call is equivalent
    var configuration = sc.gen({name:"eventName",data:{foo:1}}); 
```

## sc.registerListener({onEntry : function(stateId){}, onExit : function(stateId){}, onTransition : function(sourceStateId,[targetStateIds,...]){}, onError: function(errorInfo){}})

Registers a callback to receive notification of state changes, as described above.

Each `onEntry`, `onExit`, `onTransition`, and `onError` callback is optional - if the property is not present, it will be ignored.

The `onError` callback receives an object containing the following properties:

* `tagname` - The name of the element that produced the error. 
* `line` - The line in the source file in which the error occurred.
* `column` - The column in the source file in which the error occurred.
* `reason` - An informative error message. The text is platform-specific and subject to change.

# Development

Run unit tests: `npm test`

# Support

[Mailing list](https://groups.google.com/group/scion-dev)
