function defaultOptions() {
  return {
    targetDomainName: 'http://localhost/yourtestsite',
    cookieName: 'sessionid'
  };
}

async function analyzeSession(options = defaultOptions()) {
  try {
    const response = await fetch(`${options.targetDomainName}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const html = await response.text();

    const cookieValueMatchArray = html.match(
      new RegExp(`${options.cookieName}=([^;]+)`)
    );

    if (!cookieValueMatchArray) {
      throw new Error(
        `Could not extract ${options.cookieName} from HTML`
      );
    }

    return cookieValueMatchArray[1];
  } catch (err) {
    throw new Error(`Error analyzing session: ${err.message}`);
  }
}

module.exports = {
  defaultOptions,
  analyzeSession
};