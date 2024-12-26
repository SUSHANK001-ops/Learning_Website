import React, { useState, useEffect } from 'react';
import { Pencil, Upload, Star, Settings, Bell, Share2 } from 'lucide-react';
import { auth } from './firebase';
import { updateProfile } from 'firebase/auth';
import Navbar from './Navbar';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    photoURL: '/api/placeholder/100/100'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const upcomingFeatures = [
    {
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      title: 'Premium Features',
      description: 'Access exclusive content and features'
    },
    {
      icon: <Settings className="w-5 h-5 text-blue-500" />,
      title: 'Advanced Settings',
      description: 'Customize your profile experience'
    },
    {
      icon: <Bell className="w-5 h-5 text-purple-500" />,
      title: 'Notifications',
      description: 'Stay updated with important alerts'
    },
    {
      icon: <Share2 className="w-5 h-5 text-green-500" />,
      title: 'Social Sharing',
      description: 'Connect with friends and share updates'
    }
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Check if there's a local image
        const localImageKey = `userPhoto_${currentUser.uid}`;
        const savedPhoto = localStorage.getItem(localImageKey);
        
        setUser({
          name: currentUser.displayName || '',
          email: currentUser.email || '',
          photoURL: savedPhoto || '/api/placeholder/100/100'
        });
        setNewName(currentUser.displayName || '');
      } else {
        setUser({
          name: '',
          email: '',
          photoURL: '/api/placeholder/100/100'
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const validateImage = (file) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return false;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB limit
    if (file.size > maxSize) {
      setError('Image size should be less than 5MB');
      return false;
    }

    return true;
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !auth.currentUser) return;

    setError('');
    setImageError(false);
    setIsLoading(true);

    if (!validateImage(file)) {
      setIsLoading(false);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const base64String = reader.result;
          const localImageKey = `userPhoto_${auth.currentUser.uid}`;
          
          localStorage.setItem(localImageKey, base64String);
          
          const photoURLForFirebase = `local_photo_${auth.currentUser.uid}`;
          await updateProfile(auth.currentUser, {
            photoURL: photoURLForFirebase
          });

          setUser(prev => ({ ...prev, photoURL: base64String }));
          setIsLoading(false);
        } catch (error) {
          console.error('Error updating profile:', error);
          setError('Failed to update profile picture. Please try again.');
          setIsLoading(false);
        }
      };

      reader.onerror = () => {
        setError('Failed to read image file. Please try again.');
        setIsLoading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
      setImageError(true);
      setIsLoading(false);
    }
  };

  const handleNameUpdate = async () => {
    if (!newName.trim() || !auth.currentUser) {
      setError('Name cannot be empty');
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: newName
      });

      setUser(prev => ({ ...prev, name: newName }));
      setIsEditing(false);
      setError('');
    } catch (error) {
      setError('Failed to update name. Please try again.');
      console.error('Name update error:', error);
    }
  };

  return (

    <>  
    <Navbar />
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center">
        {/* Profile Picture Section */}
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={() => {
                  setImageError(true);
                  setUser(prev => ({ ...prev, photoURL: '/api/placeholder/100/100' }));
                }}
              />
            )}
          </div>
          <label
            htmlFor="photo-upload"
            className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
          >
            <Upload className="w-4 h-4 text-white" />
            <input
              type="file"
              id="photo-upload"
              className="hidden"
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>

        {/* Profile Text */}
        <p className="mt-2 text-gray-600 text-sm">Profile</p>

        {/* Name Section */}
        <div className="mb-4 mt-4">
          {isEditing ? (
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleNameUpdate}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Email Section */}
        <p className="text-gray-600">{user.email}</p>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>

      {/* Coming Soon Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">New Features Coming Soon</h3>
          <p className="text-sm text-gray-500">Stay tuned for exciting updates!</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {upcomingFeatures.map((feature, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors duration-300 cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h4 className="font-medium text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Beta Access Section */}
        <div className="mt-6 text-center">
          <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
            <Star className="w-4 h-4 mr-2" />
            Join us Today
          </button>
          <p className="mt-2 text-xs text-gray-500">Be the first to try new features!</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserProfile;