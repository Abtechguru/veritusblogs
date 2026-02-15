import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { User, Mail, Lock, Edit2, Save } from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await updateProfile({ name, bio });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'author':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'sub-admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">My Profile</h1>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="w-32 h-32 mb-4">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-2xl">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role.toUpperCase()}
                    </Badge>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                      Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Details Card */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Profile Details</CardTitle>
                    {!isEditing ? (
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleSaveProfile} disabled={loading}>
                          <Save className="h-4 w-4 mr-2" />
                          {loading ? 'Saving...' : 'Save'}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="account">
                    <TabsList className="mb-4">
                      <TabsTrigger value="account">Account</TabsTrigger>
                      <TabsTrigger value="bio">Bio</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          <User className="inline h-4 w-4 mr-2" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          <Mail className="inline h-4 w-4 mr-2" />
                          Email
                        </Label>
                        <Input
                          id="email"
                          value={user.email}
                          disabled
                          className="bg-gray-50 dark:bg-gray-900"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Email cannot be changed
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>
                          <Lock className="inline h-4 w-4 mr-2" />
                          Role
                        </Label>
                        <Input
                          value={user.role.toUpperCase()}
                          disabled
                          className="bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="bio" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bio">Biography</Label>
                        <Textarea
                          id="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          disabled={!isEditing}
                          rows={8}
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Articles</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Comments</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Bookmarks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
