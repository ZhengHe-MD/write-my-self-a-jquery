define(["lib/DOMElement"], function(DOMElement) {
  const $ = function(selector) {
    var domElement = Object.create(DOMElement)
    domElement.init(selector)
    return domElement
  }

  return $
})