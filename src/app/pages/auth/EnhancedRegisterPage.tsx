import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { UserCircle, PenTool, Book } from 'lucide-react';
import { SERVER_URL } from '../../lib/supabase';
import { publicAnonKey } from '/utils/supabase/info';

export const EnhancedRegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'reader' | 'author'>('reader');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password, name, role }),
      });

      const data = await response.json();

      if (response.ok) {
        if (role === 'author') {
          toast.success('Author account created! Awaiting admin approval.');
          toast.info('You will receive an email once your account is approved.');
        } else {
          toast.success('Account created successfully!');
        }
        navigate('/login');
      } else {
        toast.error(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Join VERITUS INTERNATIONAL</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account to get started
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Fill in your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Account Type Selection */}
              <div className="space-y-3">
                <Label>Account Type</Label>
                <RadioGroup value={role} onValueChange={(value: 'reader' | 'author') => setRole(value)}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <RadioGroupItem value="reader" id="reader" className="peer sr-only" />
                      <Label
                        htmlFor="reader"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 cursor-pointer peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-750 dark:peer-data-[state=checked]:bg-blue-950"
                      >
                        <Book className="mb-3 h-8 w-8 text-blue-600" />
                        <div className="space-y-1 text-center">
                          <p className="font-medium">Reader</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Read articles, comment, and subscribe
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div>
                      <RadioGroupItem value="author" id="author" className="peer sr-only" />
                      <Label
                        htmlFor="author"
                        className="flex flex-col items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 cursor-pointer peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-750 dark:peer-data-[state=checked]:bg-blue-950"
                      >
                        <PenTool className="mb-3 h-8 w-8 text-purple-600" />
                        <div className="space-y-1 text-center">
                          <p className="font-medium">Author</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Create and publish articles
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {role === 'author' && (
                  <p className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 p-3 rounded-lg">
                    <strong>Note:</strong> Author accounts require admin approval before you can start publishing articles.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-500">At least 6 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                </span>
                <Link to="/login" className="text-blue-600 hover:underline font-medium">
                  Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
