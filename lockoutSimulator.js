module.exports = function (options = {}) {
  const settings = {
    botnetIoTDeviceList: ['test-client-1', 'test-client-2'],
    exponentialBackoffInitialDelayMs: 1000,
    maxLoginAttemptsPerIp: 5,
    rateLimitResetIntervalMs: 60000,
    ...options
  };

  return {
    defaultOptions() {
      return {
        ...settings
      };
    },

    async simulateLockouts(clients = settings.botnetIoTDeviceList) {
      if (!Array.isArray(clients)) {
        throw new TypeError('clients must be an array');
      }

      const results = [];

      for (const client of clients) {
        let attempts = 0;

        for (
          let attempt = 1;
          attempt <= settings.maxLoginAttemptsPerIp;
          attempt++
        ) {
          attempts++;

          results.push({
            client,
            attempt,
            status: attempt >= settings.maxLoginAttemptsPerIp
              ? 'rate_limited'
              : 'allowed'
          });
        }
      }

      return {
        simulated: true,
        clientsTested: clients.length,
        results
      };
    }
  };
};