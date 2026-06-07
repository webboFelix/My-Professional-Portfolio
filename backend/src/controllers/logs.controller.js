import * as storage from '../services/storage.service.js';
import { v4 as uuidv4 } from 'uuid';

const COLLECTION = 'logs';

const SIMULATED = [
  { level: 'INFO', source: 'siem', message: 'Correlation rule fired — low severity' },
  { level: 'WARN', source: 'proxy', message: 'Unusual traffic spike on /login' },
  { level: 'INFO', source: 'vpn', message: 'Tunnel established — geo: EU-West' },
  { level: 'CRITICAL', source: 'edr', message: 'Malware signature match — quarantined' },
  { level: 'INFO', source: 'backup', message: 'Incremental backup completed' },
];

export async function getLogs(req, res, next) {
  try {
    const logs = await storage.listItems(COLLECTION);
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 100);
    res.json(logs.slice(-limit).reverse());
  } catch (err) {
    next(err);
  }
}

export async function appendLog(req, res, next) {
  try {
    const logs = await storage.listItems(COLLECTION);
    const entry = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      level: req.body.level || 'INFO',
      source: req.body.source || 'api',
      message: req.body.message || 'Manual log entry',
    };
    logs.push(entry);
    await storage.replaceAll(COLLECTION, logs.slice(-200));
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
}

export async function streamSimulatedLog(req, res, next) {
  try {
    const pick = SIMULATED[Math.floor(Math.random() * SIMULATED.length)];
    const logs = await storage.listItems(COLLECTION);
    const entry = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      ...pick,
    };
    logs.push(entry);
    await storage.replaceAll(COLLECTION, logs.slice(-200));
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
}
