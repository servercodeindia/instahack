module.exports = function (options = {}) {
  const settings = {
    targetDomainName: 'http://localhost/yourtestsite',
    cookieName: 'sessionid',
    ...options
  };

  return {
    defaultOptions() {
      return {
        ...settings
      };
    },

    async analyzeSession() {
      const response = await fetch(`${settings.targetDomainName}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const html = await response.text();

      const match = html.match(
        new RegExp(`${settings.cookieName}=([^;]+)`)
      );

      if (!match) {
        throw new Error(
          `Could not extract ${settings.cookieName} from HTML`
        );
      }

      return match[1];
    }
  };
};