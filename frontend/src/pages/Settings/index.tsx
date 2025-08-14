"use client";

import type React from "react";

import {
  User,
  Camera,
  Save,
  X,
  Plus,
  AlertTriangle,
  Settings as SettingsIcon,
  Shield,
  Bell,
  Eye,
  Lock,
  LogOut,
  UserX,
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Available hobbies with their icons and gradients
const availableHobbies = [
  { name: "Workout", icon: "dumbbell", gradient: "from-orange-500 to-red-500" },
  {
    name: "Cooking",
    icon: "chef-hat",
    gradient: "from-green-500 to-emerald-500",
  },
  { name: "Fishing", icon: "fish", gradient: "from-blue-500 to-cyan-500" },
  {
    name: "Camping",
    icon: "tent-tree",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    name: "Gaming",
    icon: "monitor-play",
    gradient: "from-red-500 to-pink-500",
  },
  {
    name: "Photography",
    icon: "camera",
    gradient: "from-purple-500 to-indigo-500",
  },
  { name: "Reading", icon: "book", gradient: "from-indigo-500 to-purple-500" },
  { name: "Music", icon: "music", gradient: "from-pink-500 to-rose-500" },
  { name: "Travel", icon: "plane", gradient: "from-cyan-500 to-blue-500" },
  { name: "Art", icon: "palette", gradient: "from-rose-500 to-pink-500" },
];

export default function Settings() {
  // Profile state
  const [profile, setProfile] = useState({
    name: "Achraf Ahrach",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    avatar: "img/aahrach.jpeg",
    gender: "male",
  });

  const [selectedHobbies, setSelectedHobbies] = useState([
    "Workout",
    "Cooking",
    "Fishing",
    "Camping",
    "Gaming",
    "Photography",
  ]);

  const [profileImages, setProfileImages] = useState([
    { id: 1, url: "/img/man_1.png" },
    { id: 2, url: "/img/man_2.png" },
    { id: 3, url: "/img/man_3.png" },
    { id: 4, url: "/img/man_4.png" },
    { id: 5, url: "/img/man_5.png" },
  ]);

  // Settings state
  const [settings, setSettings] = useState({
    showOnlineStatus: true,
    allowMessages: true,
    showAge: true,
    showLocation: true,
    emailNotifications: true,
    pushNotifications: true,
  });

  const [activeSection, setActiveSection] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleHobbyToggle = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: Date.now(),
          url: e.target?.result as string,
        };
        setProfileImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = (id: number) => {
    setProfileImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSaveProfile = () => {
    // Here you would typically save to your backend
    console.log("Saving profile:", { profile, selectedHobbies, profileImages });
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    // Here you would typically call your delete account API
    console.log("Deleting account...");
    setShowDeleteConfirm(false);
  };

  const renderProfileSection = () => (
    // <div className="min-h-screen w-screen pt-24 bg-gradient-to-br from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end flex items-center justify-center space-y-6">
    <div className="space-y-6 ">
      {/* Profile Picture */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Profile Picture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[0.15rem]">
                <img
                  src={profile.avatar || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-white">
              <p className="font-medium">Change Profile Picture</p>
              <p className="text-sm text-gray-300">JPG, PNG or GIF (max 5MB)</p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Basic Info */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => handleProfileUpdate("name", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-white">
              About Me
            </Label>
            <Textarea
              id="description"
              value={profile.description}
              onChange={(e) =>
                handleProfileUpdate("description", e.target.value)
              }
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
              placeholder="Tell others about yourself..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Hobbies & Interests */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Hobbies & Interests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {availableHobbies.map((hobby) => (
              <button
                key={hobby.name}
                onClick={() => handleHobbyToggle(hobby.name)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedHobbies.includes(hobby.name)
                    ? `bg-gradient-to-r ${hobby.gradient} border-transparent text-white`
                    : "bg-white/10 border-white/20 text-gray-300 hover:border-white/40"
                }`}
              >
                <div className="text-sm font-medium">{hobby.name}</div>
              </button>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-3">
            Selected: {selectedHobbies.length} hobbies
          </p>
        </CardContent>
      </Card>

      {/* Photo Gallery */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Photo Gallery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {profileImages.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full aspect-[3/4] object-cover rounded-lg"
                />
                <button
                  onClick={() => handleImageDelete(image.id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="aspect-[3/4] border-2 border-dashed border-white/30 rounded-lg flex flex-col items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-colors"
            >
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm">Add Photo</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Visibility Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Show Online Status</Label>
              <p className="text-sm text-gray-400">
                Let others see when you're online
              </p>
            </div>
            <Switch
              checked={settings.showOnlineStatus}
              onCheckedChange={(checked: boolean) =>
                setSettings((prev) => ({ ...prev, showOnlineStatus: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Show Age</Label>
              <p className="text-sm text-gray-400">
                Display your age on your profile
              </p>
            </div>
            <Switch
              checked={settings.showAge}
              onCheckedChange={(checked: boolean) =>
                setSettings((prev) => ({ ...prev, showAge: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Show Location</Label>
              <p className="text-sm text-gray-400">
                Display your city on your profile
              </p>
            </div>
            <Switch
              checked={settings.showLocation}
              onCheckedChange={(checked: boolean) =>
                setSettings((prev) => ({ ...prev, showLocation: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Message Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Allow Messages</Label>
              <p className="text-sm text-gray-400">
                Let matched users send you messages
              </p>
            </div>
            <Switch
              checked={settings.allowMessages}
              onCheckedChange={(checked: boolean) =>
                setSettings((prev) => ({ ...prev, allowMessages: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationSection = () => (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Email Notifications</Label>
              <p className="text-sm text-gray-400">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked: boolean) =>
                setSettings((prev) => ({
                  ...prev,
                  emailNotifications: checked,
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-white">Push Notifications</Label>
              <p className="text-sm text-gray-400">
                Receive push notifications on your device
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked: boolean) =>
                setSettings((prev) => ({ ...prev, pushNotifications: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAccountSection = () => (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Account Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
              >
                <UserX className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-slate-800 border-slate-700">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Delete Account
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-300">
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers,
                  including your profile, matches, and messages.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 px-4 py-8 bg-gradient-to-br from-twilight-gradient-start via-twilight-gradient-middle to-twilight-gradient-end">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-300">
            Manage your profile and account preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 sticky top-8">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveSection("profile")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === "profile"
                        ? "bg-blue-500 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveSection("privacy")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === "privacy"
                        ? "bg-blue-500 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    Privacy
                  </button>
                  <button
                    onClick={() => setActiveSection("notifications")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === "notifications"
                        ? "bg-blue-500 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Bell className="w-4 h-4" />
                    Notifications
                  </button>
                  <button
                    onClick={() => setActiveSection("account")}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === "account"
                        ? "bg-blue-500 text-white"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <SettingsIcon className="w-4 h-4" />
                    Account
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === "profile" && renderProfileSection()}
            {activeSection === "privacy" && renderPrivacySection()}
            {activeSection === "notifications" && renderNotificationSection()}
            {activeSection === "account" && renderAccountSection()}

            {/* Save Button */}
            {activeSection === "profile" && (
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
