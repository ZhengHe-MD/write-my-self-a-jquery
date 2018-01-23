define(function() {
  const DOMElement = {
    // properties
    selector: null,
    element: null,

    init: function(selector) {
      this.selector = selector
      this.element = document.querySelector(selector)
    },

    eventHandler: {
      events: [],

      findEvent: function({ eventName, handler, targetElement }) {
        const isHandlerEqual = event => event.handler === handler
        const isTargetElementEqual = event => event.targetElement === targetElement
        const isEventNameEqual = event => event.name === eventName
        const predicateList = []
        if (handler !== undefined) predicateList.push(isHandlerEqual)
        if (targetElement !== undefined) predicateList.push(isTargetElementEqual)
        if (eventName !== undefined) predicateList.push(isEventNameEqual)

        return this.events.filter(function(event) {
          return predicateList.every(fn => fn(event))
        })[0]
      },

      bindEvent: function({ eventName, handler, targetElement }) {
        // bind event listener to DOM element
        targetElement.addEventListener(eventName, handler, false)

        const matchedEvent = this.findEvent({ eventName, targetElement })

        if (matchedEvent === undefined) {
          this.events.push({
            targetElement,
            name: eventName,
            handlers: [handler]
          })
        } else {
          if (!matchedEvent.handlers.includes(handler)) {
            matchedEvent.handlers = [ ...matchedEvent.handlers, handler ]
          } else {
            console.info("handler exists")
          }
        }
      },

      unbindEvent: function({ eventName, handler, targetElement }) {
        const matchedEvent = this.findEvent({ eventName, targetElement })

        if (matchedEvent !== undefined) {
          if (matchedEvent.handlers.includes(handler)) {
            targetElement.removeEventListener(eventName, handler, false)
            matchedEvent.handlers = matchedEvent.handlers.filter(hd => hd !== handler)
          }
        }
      }
    },

    on: function(eventName, handler) {
      this.eventHandler.bindEvent({ eventName, handler, targetElement: this.element })
    },

    off: function(eventName, handler) {
      this.eventHandler.unbindEvent({ eventName, handler, targetElement: this.element })
    }
  }
  return DOMElement
})