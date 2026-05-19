import { supabase } from './supabase';

// Generate OTP (6 digits)
export async function generateOTP(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  const { error } = await supabase
    .from('otp_tokens')
    .insert([{ user_email: email, otp_code: otp, expires_at: expiresAt.toISOString() }]);
  
  if (error) throw error;
  return otp;
}

// Verify OTP
export async function verifyOTP(email, otp) {
  const { data, error } = await supabase
    .from('otp_tokens')
    .select('*')
    .eq('user_email', email)
    .eq('otp_code', otp)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !data) return false;

  // Mark as used
  await supabase
    .from('otp_tokens')
    .update({ used: true })
    .eq('id', data.id);

  return true;
}

// Sign up
export async function signup(email, password, fullName, userType) {
  // Simple password hash (in production, use bcryptjs on backend)
  const passwordHash = btoa(password + 'salt');

  const { data, error } = await supabase
    .from('users')
    .insert([{
      email,
      password_hash: passwordHash,
      full_name: fullName,
      user_type: userType,
      verified: false
    }])
    .select();

  if (error) throw error;
  return data[0];
}

// Get user by email
export async function getUser(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error) throw error;
  return data;
}

// Update password (OTP protected)
export async function updatePassword(email, newPassword) {
  const passwordHash = btoa(newPassword + 'salt');

  const { error } = await supabase
    .from('users')
    .update({ password_hash: passwordHash, updated_at: new Date().toISOString() })
    .eq('email', email);

  if (error) throw error;
}

// Login
export async function login(email, password) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) throw new Error('User not found');

  const passwordHash = btoa(password + 'salt');
  if (data.password_hash !== passwordHash) {
    throw new Error('Invalid password');
  }

  return data;
}
