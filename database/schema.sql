-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (authentication)
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  email TEXT NOT NULL UNIQUE,
  user_type TEXT NOT NULL CHECK (user_type IN ('customer', 'runner')),
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  verified BOOLEAN DEFAULT false,
  updated_at TIMESTAMP DEFAULT now() NOT NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type ON users(user_type);

-- OTP Tokens table
CREATE TABLE otp_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  user_email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT false,
  attempts INTEGER DEFAULT 0
);

CREATE INDEX idx_otp_email ON otp_tokens(user_email);
CREATE INDEX idx_otp_expires ON otp_tokens(expires_at);

-- Runners table
CREATE TABLE runners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  user_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'offline')),
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  profile_image_url TEXT,
  verified BOOLEAN DEFAULT false,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_runners_email ON runners(email);
CREATE INDEX idx_runners_status ON runners(availability_status);
CREATE INDEX idx_runners_verified ON runners(verified);

-- Bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  updated_at TIMESTAMP DEFAULT now() NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_id UUID,
  service TEXT NOT NULL,
  pickup_day TEXT NOT NULL,
  pickup_time TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  price TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL CHECK (
    status IN ('pending', 'confirmed', 'collected', 'at_laundromat', 'ready', 'delivered', 'cancelled')
  ),
  runner_id UUID,
  FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (runner_id) REFERENCES runners(id) ON DELETE SET NULL
);

CREATE INDEX idx_bookings_email ON bookings(customer_email);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_runner ON bookings(runner_id);
CREATE INDEX idx_bookings_date ON bookings(pickup_day);

-- Gig Proofs table
CREATE TABLE gig_proofs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  gig_id UUID NOT NULL,
  runner_id UUID NOT NULL,
  photo_url TEXT NOT NULL,
  notes TEXT,
  submitted_at TIMESTAMP DEFAULT now() NOT NULL,
  FOREIGN KEY (gig_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (runner_id) REFERENCES runners(id) ON DELETE CASCADE
);

CREATE INDEX idx_gig_proofs_gig ON gig_proofs(gig_id);
CREATE INDEX idx_gig_proofs_runner ON gig_proofs(runner_id);

-- Notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  recipient_email TEXT NOT NULL,
  booking_id UUID,
  notification_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  sent BOOLEAN DEFAULT false,
  sent_at TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

CREATE INDEX idx_notifications_email ON notifications(recipient_email);
CREATE INDEX idx_notifications_booking ON notifications(booking_id);
CREATE INDEX idx_notifications_type ON notifications(notification_type);

-- Customer Service Leads table
CREATE TABLE customer_service_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now() NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  issue_category TEXT NOT NULL,
  message TEXT NOT NULL,
  priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  assigned_to TEXT
);

CREATE INDEX idx_leads_email ON customer_service_leads(customer_email);
CREATE INDEX idx_leads_status ON customer_service_leads(status);
CREATE INDEX idx_leads_priority ON customer_service_leads(priority);
