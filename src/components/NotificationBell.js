import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import axios from "axios";
import { getAuthToken } from "@/services/APIs/helper";
import { getUser } from "@/services/firebase-services/cookies";

export default function NotificationBell({ role }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = await getAuthToken();
      const user = getUser();
      
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { 
            role,
            userId: user?._id 
          }
        }
      );
      
      if (response.data?.status && Array.isArray(response.data.data)) {
        setNotifications(response.data.data);
      } else {
        throw new Error('Invalid notification data received');
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setError('Failed to load notifications');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role) {
      fetchNotifications();
      // Refresh notifications every 2 minutes
      const interval = setInterval(fetchNotifications, 120000);
      return () => clearInterval(interval);
    }
  }, [role]);

  // Handle notification click
  const handleNotificationClick = (notification) => {
    // Add navigation based on notification type
    switch (notification.type) {
      case 'book':
        // Navigate to books page
        window.location.href = '/books';
        break;
      case 'registration':
        // Navigate to authors page
        window.location.href = '/authors';
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative notification-container">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }} 
        className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-6 h-6 text-gray-800" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="sticky top-0 bg-white p-3 border-b">
            <h4 className="text-sm font-semibold">Notifications</h4>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-4 text-gray-500">Loading notifications...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-500">{error}</div>
            ) : notifications.length === 0 ? (
              <p className="text-sm px-4 py-6 text-gray-500 text-center">No new notifications</p>
            ) : (
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div 
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification)}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="text-sm font-medium text-gray-900">{notification.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                    <div className="text-xs text-gray-400 mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
