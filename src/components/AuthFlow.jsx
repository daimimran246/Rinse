import { useState } from 'react';
import { generateOTP, verifyOTP, signup, login } from '../lib/auth';
import { sendOTPEmail } from '../lib/notifications';

export function AuthFlow({ userType, onLogin }) {
  const [step, setStep] = useState('email'); // email → otp → password → success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(true);

  const handleSendOTP = async () => {
    setLoading(true);
    setError('');
    try {
      const generatedOtp = await generateOTP(email);
      await sendOTPEmail(email, generatedOtp);
      setStep('otp');
    } catch (e) {
      setError(e.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError('');
    try {
      const valid = await verifyOTP(email, otp);
      if (!valid) throw new Error('Invalid OTP');
      if (isSignup) {
        setStep('password');
      } else {
        setStep('login-password');
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const user = await signup(email, password, fullName, userType);
      onLogin(user);
      setStep('success');
    } catch (e) {
      setError(e.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const user = await login(email, password);
      onLogin(user);
      setStep('success');
    } catch (e) {
      setError(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.card}>
        <div style={styles.logo}>rinse</div>

        {step === 'email' && (
          <>
            <h2 style={styles.title}>{isSignup ? 'Welcome to Rinse' : 'Sign in'}</h2>
            <p style={styles.subtitle}>{isSignup ? 'Creating a new account' : 'Back to your account'}</p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={styles.input}
              disabled={loading}
            />
            {error && <div style={styles.errorBox}>{error}</div>}
            <button onClick={handleSendOTP} disabled={loading || !email} style={styles.btn}>
              {loading ? 'Sending...' : 'Send OTP →'}
            </button>
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setEmail('');
                setError('');
              }}
              style={{ ...styles.btn, background: 'transparent', color: '#00d4aa', border: '1px solid #00d4aa' }}
            >
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </>
        )}

        {step === 'otp' && (
          <>
            <h2 style={styles.title}>Check your email</h2>
            <p style={styles.subtitle}>Enter the 6-digit code we sent</p>
            <input
              type="text"
              placeholder="000000"
              value={otp}
              onChange={e => setOtp(e.target.value.slice(0, 6))}
              maxLength="6"
              style={{ ...styles.input, textAlign: 'center', letterSpacing: '10px', fontSize: 20, fontWeight: 700 }}
              disabled={loading}
            />
            {error && <div style={styles.errorBox}>{error}</div>}
            <button onClick={handleVerifyOTP} disabled={loading || otp.length !== 6} style={styles.btn}>
              {loading ? 'Verifying...' : 'Verify Code →'}
            </button>
            <button onClick={() => setStep('email')} style={{ ...styles.btn, background: 'transparent', color: '#00d4aa', border: '1px solid #00d4aa' }}>
              ← Back
            </button>
          </>
        )}

        {step === 'password' && (
          <>
            <h2 style={styles.title}>Create account</h2>
            <p style={styles.subtitle}>Secure your account</p>
            <input
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              style={styles.input}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password (min 8 characters)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...styles.input, marginTop: 12 }}
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              style={{ ...styles.input, marginTop: 12 }}
              disabled={loading}
            />
            {error && <div style={styles.errorBox}>{error}</div>}
            <button onClick={handleSignup} disabled={loading || password.length < 8} style={styles.btn}>
              {loading ? 'Creating...' : 'Create Account →'}
            </button>
          </>
        )}

        {step === 'login-password' && (
          <>
            <h2 style={styles.title}>Welcome back!</h2>
            <p style={styles.subtitle}>Enter your password to continue</p>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.input}
              disabled={loading}
            />
            {error && <div style={styles.errorBox}>{error}</div>}
            <button onClick={handleLogin} disabled={loading || !password} style={styles.btn}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </>
        )}

        {step === 'success' && (
          <>
            <div style={styles.successIcon}>✓</div>
            <h2 style={styles.title}>You're all set!</h2>
            <p style={styles.subtitle}>Welcome to Rinse</p>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  root: { minHeight: '100vh', background: '#080f0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans'" },
  card: { background: '#0d1616', borderRadius: 20, padding: '40px 24px', width: '100%', maxWidth: 400, border: '1px solid #1a2828', textAlign: 'center' },
  logo: { fontSize: 36, fontWeight: 800, color: '#00d4aa', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8, margin: '0 0 8px' },
  subtitle: { fontSize: 13, color: '#556', marginBottom: 20, margin: '0 0 20px' },
  input: { width: '100%', background: '#101a1a', border: '1px solid #1e2a2a', borderRadius: 12, color: '#eee', padding: '14px 16px', fontSize: 14, marginBottom: 12, boxSizing: 'border-box' },
  errorBox: { background: '#2a0f0f', border: '1px solid #5a1a1a', color: '#ff6b6b', borderRadius: 8, padding: '10px', marginBottom: 12, fontSize: 12 },
  btn: { width: '100%', padding: '14px', background: '#00d4aa', border: 'none', borderRadius: 12, color: '#000', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', marginBottom: 10 },
  successIcon: { width: 64, height: 64, borderRadius: '50%', background: '#00d4aa', color: '#000', fontSize: 28, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }
};
