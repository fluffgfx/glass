'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactDom = require('react-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcSlider = require('rc-slider');

var _rcSlider2 = _interopRequireDefault(_rcSlider);

var _reactGlass = require('react-glass');

var _reactGlass2 = _interopRequireDefault(_reactGlass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sliderStyle = {
  width: '100%',
  marginTop: 30,
  marginBottom: 30,
  textAlign: 'center',
  display: 'inline-block'
};

var GlassDemo = function (_Component) {
  _inherits(GlassDemo, _Component);

  function GlassDemo(props) {
    _classCallCheck(this, GlassDemo);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GlassDemo).call(this, props));

    _this.state = {
      language: 'javascript',
      width: 600,
      height: 500,
      lineNumbers: true,
      autoSize: true
    };
    return _this;
  }

  _createClass(GlassDemo, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: 'pink-demo', style: {
            textAlign: 'center',
            width: '80vw',
            marginLeft: '10vw',
            marginRight: '10vw'
          } },
        _react2.default.createElement(
          'h1',
          { className: 'tk-lust-script' },
          'Glass'
        ),
        _react2.default.createElement(_reactGlass2.default, _extends({}, this.state, { style: {
            display: 'inline-block'
          } })),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'column' },
            _react2.default.createElement(
              'h3',
              null,
              'Language'
            ),
            _react2.default.createElement('input', { type: 'text', style: _extends({}, sliderStyle, {
                width: 100
              }), onChange: function onChange(e) {
                _this2.setState({ language: e.target.value });
              }, value: this.state.language }),
            _react2.default.createElement('br', null)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'column' },
            _react2.default.createElement(
              'h3',
              null,
              'Width'
            ),
            _react2.default.createElement(
              'div',
              { style: sliderStyle },
              _react2.default.createElement(_rcSlider2.default, { onChange: function onChange(e) {
                  _this2.setState({ width: parseInt(e, 10) });
                }, value: this.state.width, min: 200, max: 800 })
            ),
            _react2.default.createElement('br', null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'column' },
            _react2.default.createElement(
              'h3',
              null,
              'Height'
            ),
            _react2.default.createElement(
              'div',
              { style: sliderStyle },
              _react2.default.createElement(_rcSlider2.default, { onChange: function onChange(e) {
                  _this2.setState({ height: parseInt(e, 10) });
                }, value: this.state.height, min: 200, max: 800 })
            ),
            _react2.default.createElement('br', null)
          )
        )
      );
    }
  }]);

  return GlassDemo;
}(_react.Component);

(0, _reactDom.render)(_react2.default.createElement(GlassDemo, null), document.getElementById('root'));
