import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load env variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("⚠️ Warning: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be in the backend .env file to use the Admin API.");
}

// Initialize Supabase Admin Client
const supabaseAdmin = createClient(supabaseUrl || 'http://placeholder.com', supabaseServiceKey || 'placeholder', {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Endpoint: HR creates an employee
app.post('/api/hr/create-employee', async (req, res) => {
  const { email, password, hrId } = req.body;

  if (!email || !password || !hrId) {
    return res.status(400).json({ error: 'Missing required fields (email, password, hrId)' });
  }

  try {
    // 1. Create User via Admin Auth API
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the user
    });

    if (authError) throw new Error(authError.message);

    const employeeId = authData.user.id;

    // 2. Insert into Profiles as 'employee'
    const { error: profileError } = await supabaseAdmin.from('profiles').insert({
      id: employeeId,
      email: email,
      role: 'employee'
    });

    if (profileError) {
      // Rollback logic (soft deleting user from auth if profile fails)
      await supabaseAdmin.auth.admin.deleteUser(employeeId);
      throw new Error(`Failed to create profile: ${profileError.message}`);
    }

    // 3. Link HR and Employee in the employees table
    const { error: linkError } = await supabaseAdmin.from('employees').insert({
      hr_id: hrId,
      employee_id: employeeId
    });

    if (linkError) {
      console.warn("Could not link hr to employee:", linkError.message);
    }

    return res.status(200).json({ 
      success: true, 
      user: authData.user,
      message: "Employee successfully created!" 
    });

  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
