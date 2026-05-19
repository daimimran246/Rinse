import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Bookings
export async function getBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createBooking(booking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select();
  if (error) throw error;
  return data[0];
}

export async function updateBookingStatus(bookingId, status) {
  const { error } = await supabase
    .from('bookings')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', bookingId);
  if (error) throw error;
}

// Runners
export async function getRunners() {
  const { data, error } = await supabase
    .from('runners')
    .select('*')
    .eq('verified', true);
  if (error) throw error;
  return data;
}

export async function getAvailableGigs() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// Gig Proofs
export async function submitGigProof(gigId, runnerId, photoUrl, notes) {
  const { data, error } = await supabase
    .from('gig_proofs')
    .insert([{ gig_id: gigId, runner_id: runnerId, photo_url: photoUrl, notes }])
    .select();
  if (error) throw error;
  return data[0];
}

// Notifications
export async function logNotification(notification) {
  const { data, error } = await supabase
    .from('notifications')
    .insert([notification])
    .select();
  if (error) throw error;
  return data[0];
}

// Customer Service Leads
export async function submitServiceLead(lead) {
  const { data, error } = await supabase
    .from('customer_service_leads')
    .insert([lead])
    .select();
  if (error) throw error;
  return data[0];
}
