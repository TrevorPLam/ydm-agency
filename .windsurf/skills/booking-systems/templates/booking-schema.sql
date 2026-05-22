CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  resource_id UUID NOT NULL,
  user_id UUID NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_bookings_resource_time ON bookings(resource_id, start_time, end_time);
