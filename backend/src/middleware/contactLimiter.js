import rateLimit from 'express-rate-limit';

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many contact requests. Try again later.' },
});
