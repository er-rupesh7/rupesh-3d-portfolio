import fs from 'fs';
import path from 'path';

export interface ContactRecord {
  id: string;
  email: string;
  ip: string;
  name: string;
  timestamp: number;
  expiresAt: number;
}

// 5 Days in Milliseconds
export const RATE_LIMIT_DAYS = 5;
export const RATE_LIMIT_MS = RATE_LIMIT_DAYS * 24 * 60 * 60 * 1000;

// Persistent file path
const DATA_DIR = path.join(process.cwd(), '.data');
const RECORDS_FILE = path.join(DATA_DIR, 'contact_records.json');

// In-memory fallback
let inMemoryRecords: ContactRecord[] = [];

// Ensure directory and load records
function loadRecords(): ContactRecord[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(RECORDS_FILE)) {
      const data = fs.readFileSync(RECORDS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        inMemoryRecords = parsed;
        return inMemoryRecords;
      }
    }
  } catch (err) {
    console.warn('Could not read persistent contact records file, using memory store:', err);
  }
  return inMemoryRecords;
}

function saveRecords(records: ContactRecord[]): void {
  inMemoryRecords = records;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(RECORDS_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write persistent contact records file:', err);
  }
}

/**
 * Clean up records older than 5 days
 */
export function pruneExpiredRecords(): void {
  const now = Date.now();
  const records = loadRecords();
  const activeRecords = records.filter((r) => r.expiresAt > now);
  if (activeRecords.length !== records.length) {
    saveRecords(activeRecords);
  }
}

/**
 * Format remaining milliseconds into human-readable string (e.g. "4 days, 18 hours")
 */
export function formatRemainingTime(ms: number): string {
  if (ms <= 0) return '0 minutes';
  const totalHours = Math.floor(ms / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''}${hours > 0 ? ` and ${hours} hour${hours > 1 ? 's' : ''}` : ''}`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` and ${minutes} min` : ''}`;
  }
  return `${Math.max(1, minutes)} minute${minutes > 1 ? 's' : ''}`;
}

/**
 * Check if an email or IP address is currently rate-limited
 */
export function checkRateLimit(email: string, ip: string): {
  isLimited: boolean;
  remainingTimeFormatted?: string;
  reason?: 'email' | 'ip';
  record?: ContactRecord;
} {
  pruneExpiredRecords();
  const now = Date.now();
  const records = loadRecords();

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedIP = ip.trim();

  // 1. Check by Email
  const emailRecord = records.find(
    (r) => r.email.toLowerCase() === normalizedEmail && r.expiresAt > now
  );
  if (emailRecord) {
    const remainingMs = emailRecord.expiresAt - now;
    return {
      isLimited: true,
      remainingTimeFormatted: formatRemainingTime(remainingMs),
      reason: 'email',
      record: emailRecord,
    };
  }

  // 2. Check by IP (ignore localhost/unknown if needed, or enforce)
  if (normalizedIP && normalizedIP !== '127.0.0.1' && normalizedIP !== '::1' && normalizedIP !== 'unknown') {
    const ipRecord = records.find(
      (r) => r.ip === normalizedIP && r.expiresAt > now
    );
    if (ipRecord) {
      const remainingMs = ipRecord.expiresAt - now;
      return {
        isLimited: true,
        remainingTimeFormatted: formatRemainingTime(remainingMs),
        reason: 'ip',
        record: ipRecord,
      };
    }
  }

  return { isLimited: false };
}

/**
 * Record a successful transmission
 */
export function recordTransmission(email: string, ip: string, name: string): ContactRecord {
  const now = Date.now();
  const newRecord: ContactRecord = {
    id: `rec_${now}_${Math.random().toString(36).substring(2, 8)}`,
    email: email.trim().toLowerCase(),
    ip: ip.trim(),
    name: name.trim(),
    timestamp: now,
    expiresAt: now + RATE_LIMIT_MS,
  };

  const records = loadRecords();
  // Filter out any existing older records for this email/IP
  const filtered = records.filter(
    (r) =>
      r.email.toLowerCase() !== newRecord.email &&
      (newRecord.ip === '127.0.0.1' || r.ip !== newRecord.ip)
  );

  filtered.push(newRecord);
  saveRecords(filtered);
  return newRecord;
}

/**
 * Helper to extract real client IP address from Next.js request headers
 */
export function extractClientIP(req: Request): string {
  const headers = req.headers;
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  const cfIp = headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp.trim();
  }
  return '127.0.0.1';
}
