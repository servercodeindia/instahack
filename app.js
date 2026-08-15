const express = require('express');

const fs = require('fs');

const app = express();

// Load configuration from file
let config;
try {
  config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
} catch (err) {
  console.error("Error loading configuration:", err);
  process.exit(1);
}

// Initialize session analysis module (for testing purposes only)
const sessionAnalysis = require('./sessionAnalysis')(config.sessionAnalysis);

// Initialize password strength evaluation module
const passwordEvaluator = require('./passwordEvaluator')(config.passwordEvaluator);

// Initialize lockout simulation module (for testing rate limiting)
const lockoutSimulator = require('./lockoutSimulator')(config.lockoutSimulator);

// Initialize data sanitization module (to protect sensitive information)
const dataSanitizer = require('./dataSanitizer')(config.dataSanitizer);

app.use(express.json());

app.post('/session-analysis', async (req, res) => {
  try {
 const targetUsername = req.body.targetUsername;
 const sessionInfo = await sessionAnalysis.analyzeSession(targetUsername);
 res.json({ sessionId: sessionInfo });
  } catch (err) {
 console.error("Error analyzing session:", err);
 res.status(500).json({ error: "Failed to analyze session" });
  }
});

app.post('/password-evaluation', async (req, res) => {
  try {
 const targetPasswordHash = req.body.targetPasswordHash;
 const passwordStrengthReport = await passwordEvaluator.evaluatePassword(targetPasswordHash);
 res.json({ report: passwordStrengthReport });
  } catch (err) {
 console.error("Error evaluating password:", err);
 res.status(500).json({ error: "Failed to evaluate password" });
  }
});

app.post('/lockout-simulation', async (req, res) => {
  try {
 const targetIpAddressList = req.body.targetIpAddressList;
 await lockoutSimulator.simulateLockouts(targetIpAddressList);
 res.json({ success: true });
  } catch (err) {
 console.error("Error simulating lockouts:", err);
 res.status(500).json({ error: "Failed to simulate lockouts" });
  }
});

app.post('/data-sanitization', async (req, res) => {
  try {
 const targetDataString = req.body.targetDataString;
 const sanitizedDataString = await dataSanitizer.sanitizeData(targetDataString);
 res.json({ sanitizedData: sanitizedDataString });
  } catch (err) {
 console.error("Error sanitizing data:", err);
 res.status(500).json({ error: "Failed to sanitize data" });
  }
});

const port = process.env.PORT || config.server.port || 3000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
