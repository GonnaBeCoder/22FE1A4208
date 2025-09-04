import { randomUUID } from 'crypto';
import fs from 'fs';

export default function loggingMiddleware(req, res, next) {
  const logID = randomUUID();

  const logData = {
    logID,
    message: "log created successfully"
  };

  try {
    // Ensure folder exists (server start step will create data folder too, but safe here)
    fs.mkdirSync('./data', { recursive: true });
    fs.appendFileSync('./data/logs.txt', JSON.stringify(logData) + '\n');
  } catch (err) {
    // Do not use console.log per constraint; swallow or handle via external logger if available
  }

  // Attach logID to request so handlers can return it in responses if desired
  req.logID = logID;
  next();
}