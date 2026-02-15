-- Campaign Donations Table
CREATE TABLE IF NOT EXISTS campaign_donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    message TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    campaign_id TEXT NOT NULL DEFAULT 'david-ombugadu-2027',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Campaign Signups Table
CREATE TABLE IF NOT EXISTS campaign_signups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    type TEXT NOT NULL CHECK (type IN ('volunteer', 'supporter')),
    campaign_id TEXT NOT NULL DEFAULT 'david-ombugadu-2027',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_campaign_donations_campaign_id ON campaign_donations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_donations_timestamp ON campaign_donations(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_campaign_signups_campaign_id ON campaign_signups(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_signups_email ON campaign_signups(email);

-- Enable Row Level Security (RLS)
ALTER TABLE campaign_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_signups ENABLE ROW LEVEL SECURITY;

-- RLS Policies for campaign_donations
-- Allow anyone to read donations (public transparency)
CREATE POLICY "Allow public read access to donations"
    ON campaign_donations
    FOR SELECT
    USING (true);

-- Allow anyone to insert donations (public contributions)
CREATE POLICY "Allow public insert of donations"
    ON campaign_donations
    FOR INSERT
    WITH CHECK (true);

-- Only authenticated users can update/delete (admin only)
CREATE POLICY "Allow authenticated users to update donations"
    ON campaign_donations
    FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete donations"
    ON campaign_donations
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- RLS Policies for campaign_signups
-- Allow anyone to read signups (public transparency)
CREATE POLICY "Allow public read access to signups"
    ON campaign_signups
    FOR SELECT
    USING (true);

-- Allow anyone to insert signups (public registration)
CREATE POLICY "Allow public insert of signups"
    ON campaign_signups
    FOR INSERT
    WITH CHECK (true);

-- Only authenticated users can update/delete (admin only)
CREATE POLICY "Allow authenticated users to update signups"
    ON campaign_signups
    FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete signups"
    ON campaign_signups
    FOR DELETE
    USING (auth.role() = 'authenticated');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_campaign_donations_updated_at
    BEFORE UPDATE ON campaign_donations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaign_signups_updated_at
    BEFORE UPDATE ON campaign_signups
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE campaign_donations IS 'Stores all campaign donations with donor information';
COMMENT ON TABLE campaign_signups IS 'Stores volunteer and supporter signups for campaigns';
COMMENT ON COLUMN campaign_donations.amount IS 'Donation amount in USD';
COMMENT ON COLUMN campaign_donations.campaign_id IS 'Identifier for the specific campaign (e.g., david-ombugadu-2027)';
COMMENT ON COLUMN campaign_signups.type IS 'Type of signup: volunteer or supporter';
