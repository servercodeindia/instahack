module.exports = function (options = {}) {
  const settings = {
    removeControlCharacters: true,
    trimWhitespace: true,
    maxLength: 10000,
    ...options
  };

  return {
    defaultOptions() {
      return { ...settings };
    },

    async sanitizeData(input) {
      if (typeof input !== 'string') {
        throw new TypeError('targetDataString must be a string');
      }

      let sanitized = input;

      if (settings.removeControlCharacters) {
        sanitized = sanitized.replace(
          /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
          ''
        );
      }

      if (settings.trimWhitespace) {
        sanitized = sanitized.trim();
      }

      if (sanitized.length > settings.maxLength) {
        sanitized = sanitized.slice(0, settings.maxLength);
      }

      return sanitized;
    }
  };
};