let bespoke = require('bespoke'),
  beachday = require('bespoke-theme-beachday'),
  keys = require('bespoke-keys'),
  touch = require('bespoke-touch'),
  bullets = require('bespoke-bullets'),
  scale = require('bespoke-scale'),
  hash = require('bespoke-hash'),
  overview = require('bespoke-simple-overview'),
  progress = require('bespoke-progress'),
  state = require('bespoke-state'),
  markdown = require('bespoke-markdownit'),
  markdownItAnchor = require('markdown-it-anchor'),
  markdownItDefList = require('markdown-it-deflist'),
  markdownItAbbr = require('markdown-it-abbr'),
  markdownItContainer = require('markdown-it-container'),
  markdownItDecorate = require('markdown-it-decorate'),
  markdownItEmoji = require('markdown-it-emoji'),
  forms = require('bespoke-forms'),
  backdrop = require('bespoke-backdrop'),
  proceed = require('./bespoke-proceed'),
  easter = require('./easter'),
  tutorial = require('./tutorial');

// Bespoke.js
bespoke.from('article', [
  markdown({
    backdrop: function(slide, value) {
      slide.setAttribute('data-bespoke-backdrop', value);
    },
    scripts: function(slide, url) {
      var placeToPutScripts = document.body;
      url = !Array.isArray(url) ? [url] : url;

      function loadScriptChain(i) {
        var s = document.createElement('script');
        s.src = url[i];
        if (i < url.length - 1) {
          s.addEventListener('load', function () {
              loadScriptChain(i+1);
          });
        }
        placeToPutScripts.appendChild(s);
      }
      loadScriptChain(0);
    },
    styles: function(slide, value) {
      var placeToPutStyles = document.head;
      value = !Array.isArray(value) ? [value] : value;
      value.forEach(function (url) {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = url;
        placeToPutStyles.appendChild(l);
      });
    },
    embeddedStyles: function(slide, styleString) {
      if (typeof styleString !== 'string') {
        console.log('Esperava que o metadado "embeddedStyles" tivesse como ' +
          'valor uma string, mas foi passado via arquivo markdown um ' +
          typeof styleString);
      }
      var s = document.createElement('style');
      s.innerHTML = styleString;
      document.head.appendChild(s);
    },
    elementStyles: function(slideEl, elementsAndTheirStyles) {
      Object.keys(elementsAndTheirStyles).forEach(function(selector) {
        Array.from(slideEl.querySelectorAll(selector))
          .forEach(function(el) {
            return el.setAttribute('style', elementsAndTheirStyles[selector]);
          });
      });
    },
    slideHash: function(slide, value) {
      slide.setAttribute('data-bespoke-hash', value);
    },
    layout: function(slide, value) {
      slide.classList.add('layout-' + value);
    },
    state: function(slide, value) {
      slide.setAttribute('data-bespoke-state', value);
    },
    preventSelection: function(slide, unselectableElementsSelector) {
      var els = slide.querySelectorAll(unselectableElementsSelector);
      els.forEach(function(el) {
        el.onselectstart = function() { return false };
        el.onmousedown = function() { return false };
        el.setAttribute('unselectable', 'on');
        el.style.userSelect = 'none';
      });
    },
    fullScreenElement: function(slide, elementSelector) {
      let el = slide.querySelector(elementSelector);
      let requestFullScreenName = document.documentElement.requestFullScreen ?
        'requestFullScreen' : `${['webkit', 'moz'].find(p => document.documentElement[`${p}RequestFullScreen`])}RequestFullScreen`;
      let exitFullScreenName = document.exitFullScreen ?
        'exitFullScreen' : `${['webkitExit', 'webkitCancel', 'mozExit', 'mozCancel']
          .find(p => document[`${p}FullScreen`])}FullScreen`;

      if (requestFullScreenName && exitFullScreenName) {
        this.on('activate', function(e) {
          if (e.slide === slide) {
            el[requestFullScreenName]();
          }
        });
        this.on('deactivate', function(e) {
          if (e.slide === slide) {
            document[exitFullScreenName]();
          }
        });
      }
    },
    fullPageElement: function(slide, elementSelector) {
      let el = slide.querySelector(elementSelector);
      el.style.width = window.getComputedStyle(slide).width;
      el.style.height = window.getComputedStyle(slide).height;
      el.style.position = 'absolute';
      el.style.left = el.style.top = '0';
      // fix for chrome hiding the video controls behind (or under) the video
      // from: https://stackoverflow.com/questions/22217084/video-tag-at-chrome-overlays-on-top
      el.style.backfaceVisibility = 'hidden';
      el.style.transform = 'translateZ(0)';
    },
    playMediaOnActivation: function(slide, { selector, delay = '1500'}) {
      let els = slide.querySelectorAll(selector);
      this.on('activate', function(e) {
        if (e.slide === slide) {
          setTimeout(() => {
            Array.from(els).forEach(e => e.play ? e.play() : null);
          }, delay);
        }
      });
      this.on('deactivate', function(e) {
        if (e.slide === slide) {
          setTimeout(() => {
            Array.from(els).forEach(e => e.pause ? e.pause() : null);
          }, delay);
        }
      });
    }
  }, [
    [
      markdownItContainer,
      'figure',
      {
        validate: function(params) {
          return params.trim().match(/^figure.*$/);
        },
        render: function(tokens, idx, options, env, self) {
          // formato:
          // ::: figure .primeira-classe.segunda.terceira background-color: white; color: black;
          // ...conteúdo markdown...
          // :::
          // as classes devem estar "coladas" uma na outra e são opcionais
          // após as classes, é possível definir uma string de estilos, que
          // também é opcional. Se a string de estilos for definida, é
          // necessário definir pelo menos 1 classe (ou então colocar apenas um
          // ponto final sem nome de classe)
          var m = tokens[idx].info.trim().match(/^figure\s+([^\s]*)\s*(.*)?$/),
            className = '',
            styleString = '';

          if (tokens[idx].nesting === 1) {
            // opening tag
            if (!!m && Array.isArray(m)) {
              className = (m[1] || '').trim().replace(/\./g, ' ');
              styleString = (m[2] || '').trim();
            }
            return '<figure class="' + className + '" style="' + styleString + '">\n';
          } else {
            // closing tag
            return '</figure>\n';
          }
        }
      }
    ],
    [
      markdownItContainer,
      'result',
      {
        validate: function(params) {
          return params.trim().match(/^result.*$/);
        },
        render: function(tokens, idx, options, env, self) {
          // formato:
          // ::: result .primeira-classe.segunda.terceira background-color: white; color: black;
          // ...conteúdo markdown...
          // :::
          // as classes devem estar "coladas" uma na outra e são opcionais
          // após as classes, é possível definir uma string de estilos, que
          // também é opcional. Se a string de estilos for definida, é
          // necessário definir pelo menos 1 classe (ou então colocar apenas um
          // ponto final sem nome de classe)
          var m = tokens[idx].info.trim().match(/^result\s+([^\s]*)\s*(.*)?$/),
            className = '',
            styleString = '';

          if (tokens[idx].nesting === 1) {
            // opening tag
            if (!!m && Array.isArray(m)) {
              className = (m[1] || '').trim().replace(/\./g, ' ');
              styleString = (m[2] || '').trim();
            }
            return '<div class="result ' + className + '" style="' + styleString + '" data-before="Resultado">\n';
          } else {
            // closing tag
            return '</div>\n';
          }
        }
      }
    ],
    [
      markdownItContainer,
      'did-you-know',
      {
        validate: function(params) {
          return params.trim().match(/^did\-you\-know.*$/);
        },
        render: function(tokens, idx, options, env, self) {
          // formato:
          // ::: did-you-know .primeira-classe.segunda.terceira background-color: white; color: black;
          // ...conteúdo markdown...
          // :::
          // as classes devem estar "coladas" uma na outra e são opcionais
          // após as classes, é possível definir uma string de estilos, que
          // também é opcional. Se a string de estilos for definida, é
          // necessário definir pelo menos 1 classe (ou então colocar apenas um
          // ponto final sem nome de classe)
          var m = tokens[idx].info.trim().match(/^did\-you\-know\s+([^\s]*)\s*(.*)?$/),
            className = '',
            styleString = '';

          if (tokens[idx].nesting === 1) {
            // opening tag
            if (!!m && Array.isArray(m)) {
              className = (m[1] || '').trim().replace(/\./g, ' ');
              styleString = (m[2] || '').trim();
            }
            return '<div class="did-you-know ' + className + '" style="' + styleString + '" data-before="Você Sabia??">\n';
          } else {
            // closing tag
            return '</div>\n';
          }
        }
      }
    ],
    [
      markdownItContainer,
      'gallery',
      {
        validate: (params) => params.trim().match(/^gallery.*$/),
        render: (tokens, idx, options, env, self) => {
          // formato:
          // ::: gallery .primeira-classe.segunda.terceira background-color: white; color: black;
          // - [![Descricao](imagem)](link)
          // - [![Descricao](imagem)](link)
          // :::
          // as classes devem estar "coladas" uma na outra e são opcionais
          // após as classes, é possível definir uma string de estilos, que
          // também é opcional. Se a string de estilos for definida, é
          // necessário definir pelo menos 1 classe (ou então colocar apenas um
          // ponto final sem nome de classe)
          const m = tokens[idx].info.trim().match(/^gallery\s+([^\s]*)\s*(.*)?$/);
          let  className = '',
            styleString = '';

          if (tokens[idx].nesting === 1) {
            // opening tag
            if (!!m && Array.isArray(m)) {
              className = (m[1] || '').trim().replace(/\./g, ' ');
              styleString = (m[2] || '').trim();
            }
            return `<div class="gallery ${className}" style="${styleString}">\n`;
          } else {
            // closing tag
            return '</div>\n';
          }
        }
      }
    ],
    markdownItAnchor,
    markdownItDefList,
    markdownItAbbr,
    markdownItDecorate,
    markdownItEmoji
  ]),
  beachday({ insertFonts: false }),
  keys(),
  touch(),
  overview({ insertStyles: false }),
  bullets('.bullet, .bulleted li, .bulleted dd, .bulleted-dt dt, .bulleted-dt dd'),
  // still need to improve bespokeProceed: give feedback to user, switch to JSON comments etc.
  proceed(),
  scale('transform'),
  progress(), // progress must be after scale
  hash(),
  state(),
  forms(),
  backdrop(),
  tutorial(document.getElementsByClassName('tutorial')[0])
]);

easter();

// Used to load gmaps api async (it requires a callback to be passed)
window.noop = function() {};
