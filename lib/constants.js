var STATE_TYPES = {
    BASIC: 0,
    COMPOSITE: 1,
    PARALLEL: 2,
    HISTORY: 3,
    INITIAL: 4,
    FINAL: 5
};

const SCXML_IOPROCESSOR_TYPE = 'http://www.w3.org/TR/scxml/#SCXMLEventProcessor'
const HTTP_IOPROCESSOR_TYPE = 'http://www.w3.org/TR/scxml/#BasicHTTPEventProcessor'
const RX_TRAILING_WILDCARD = /\.\*$/;

module.exports = {
  STATE_TYPES : STATE_TYPES,
  SCXML_IOPROCESSOR_TYPE  : SCXML_IOPROCESSOR_TYPE,
  HTTP_IOPROCESSOR_TYPE  : HTTP_IOPROCESSOR_TYPE, 
  RX_TRAILING_WILDCARD  : RX_TRAILING_WILDCARD 
};
