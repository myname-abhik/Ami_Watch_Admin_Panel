const crypto = require('crypto');

const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
const sign = (payload) =>
  crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
const hash = (v) => crypto.createHash('sha256').update(String(v || '')).digest();

// POST /admin/api/login  { password } -> { token }  (token valid for 12h)
exports.login = (req, res) => {
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD is not set on the server' });
  }
  if (!crypto.timingSafeEqual(hash(req.body.password), hash(process.env.ADMIN_PASSWORD))) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  const exp = String(Date.now() + 12 * 60 * 60 * 1000);
  res.json({ token: `${exp}.${sign(exp)}` });
};

// Guards every admin route except login
exports.verify = (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  const [exp, sig] = token.split('.');
  try {
    if (exp && sig && Number(exp) > Date.now() &&
        crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(sign(exp)))) {
      return next();
    }
  } catch (e) { /* fall through */ }
  res.status(401).json({ error: 'Session expired, please sign in again' });
};
