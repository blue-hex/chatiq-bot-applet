module.exports = {
    plugins: [
      require('postcss-prefix-selector')({
        prefix: '.iq',  // The prefix to add
        transform: function (prefix, selector, prefixedSelector) {
          if (selector.startsWith('html') || selector.startsWith('body')) {
            return selector.replace(/html|body/, prefix);
          }
          return prefixedSelector;
        }
      })
    ]
  };
  