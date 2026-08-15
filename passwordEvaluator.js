const fs = require('fs');

module.exports = function (options = {}) {
  const settings = {
    minLength: 12,
    requireUpperLowerCase: true,
    requireSpecialChars: true,
    blacklistWordsPath: './password_blacklist.txt',
    ...options
  };

  return {
    defaultOptions() {
      return { ...settings };
    },

    async evaluatePassword(password) {
      if (typeof password !== 'string') {
        throw new TypeError('Password must be a string');
      }

      const report = {
        length: password.length,
        meetsMinLength: password.length >= settings.minLength,
        hasUpperAndLower:
          /[A-Z]/.test(password) && /[a-z]/.test(password),
        hasSpecialChars:
          /[^A-Za-z0-9]/.test(password),
        foundInBlacklist: false
      };

      if (settings.requireUpperLowerCase && !report.hasUpperAndLower) {
        report.meetsUpperLowerRequirement = false;
      } else {
        report.meetsUpperLowerRequirement = true;
      }

      if (settings.requireSpecialChars && !report.hasSpecialChars) {
        report.meetsSpecialRequirement = false;
      } else {
        report.meetsSpecialRequirement = true;
      }

      if (fs.existsSync(settings.blacklistWordsPath)) {
        const blacklist = fs
          .readFileSync(settings.blacklistWordsPath, 'utf8')
          .split(/\r?\n/)
          .map(word => word.trim().toLowerCase())
          .filter(Boolean);

        report.foundInBlacklist =
          blacklist.includes(password.toLowerCase());
      }

      report.strong =
        report.meetsMinLength &&
        report.meetsUpperLowerRequirement &&
        report.meetsSpecialRequirement &&
        !report.foundInBlacklist;

      return report;
    }
  };
};