CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE users ADD CONSTRAINT tenant_isolation 
  CHECK (tenant_id IS NOT NULL);
