module.exports = function (options = {}) {
  const settings = {
    sensitiveKeywords: ["password", "api_key"],
    replacementChar: "*",
    ...options
  };

  return {
    defaultOptions() {
      return { ...settings };
    },

    async sanitizeData(data) {
      if (typeof data !== "string") {
        throw new TypeError("Input must be a string");
      }

      let result = data;

      for (const keyword of settings.sensitiveKeywords) {
        const escapedKeyword = keyword.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );

        result = result.replace(
          new RegExp(escapedKeyword, "gi"),
          settings.replacementChar.repeat(keyword.length)
        );
      }

      return result;
    }
  };
};