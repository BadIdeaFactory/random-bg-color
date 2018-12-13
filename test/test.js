const expect = require('chai').expect;
const jsdom = require('jsdom');
const setRandomBgColor = require('../src/index.js');
const { JSDOM } = jsdom;

describe('setRandomBgColor', function () {
  // Reset the JSDOM environment before each test
  beforeEach(function () {
    // Attach JSDOM environment to Node global object,
    // in precisely the way their documentation warns us not to
    const window = new JSDOM('').window;
    global.document = window.document;
    global.Element = window.Element;
  });

  it('sets the body background color', function () {
    setRandomBgColor();

    expect(document.body.style.backgroundColor).to.match(/rgb\([0-9]+, [0-9]+, [0-9]+\)/);
    expect(document.body.style.transition).to.equal('background-color 120ms');
  });

  it('does not add transition if `disallowTransition` is true', function () {
    setRandomBgColor(null, { disallowTransition: true });

    expect(document.body.style.backgroundColor).to.match(/rgb\([0-9]+, [0-9]+, [0-9]+\)/);
    expect(document.body.style.transition).to.equal(undefined);
  });

  it('sets the background color for an element selector', function () {
    document.body.innerHTML = '<p id="my-el">foo</p>'
    setRandomBgColor('#my-el');

    const el = document.body.querySelector('#my-el');
    expect(el.style.backgroundColor).to.match(/rgb\([0-9]+, [0-9]+, [0-9]+\)/);
    expect(el.style.transition).to.equal('background-color 120ms');
  });

  it('sets the background color for multiple elements via selector', function () {
    document.body.innerHTML = '<ul><li>foo</li><li>bar</li></ul>'
    setRandomBgColor('ul > li');

    const els = document.body.querySelectorAll('ul > li');
    for (let i = 0; i < els.length; i++) {
      const el = els[i]
      expect(el.style.backgroundColor).to.match(/rgb\([0-9]+, [0-9]+, [0-9]+\)/);
      expect(el.style.transition).to.equal('background-color 120ms');
    }
  });

  it('sets the background color for element passed directly', function () {
    const el = document.createElement('div');
    setRandomBgColor(el);

    expect(el.style.backgroundColor).to.match(/rgb\([0-9]+, [0-9]+, [0-9]+\)/);
    expect(el.style.transition).to.equal('background-color 120ms');
  });

  // Reset the global object and JSDOM after each test
  afterEach(function () {
    global.document = undefined;
    global.Element = undefined;
  });
});
