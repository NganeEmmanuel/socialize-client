import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FollowComponent = ({ userId, currentUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    // Fetch user's following status, followers count, and following count from the server
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/v1/users/${userId}`);
        setIsFollowing(response.data.isFollowing);
        setFollowerCount(response.data.followerCount);
        setFollowingCount(response.data.followingCount);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleFollow = async () => {
    try {
      await axios.post(`/api/v1/user/follow`, {  userId: currentUserId });
      setIsFollowing(true);
      setFollowerCount(followerCount + 1);

      // Send a notification to the followed user
      await axios.post(`/api/v1/notifications`, {
        recipientId: userId,
        message: 'You have a new follower!',
      });
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.delete(`/api/v1/user/follow`, { data: {  userId: currentUserId  } });
      setIsFollowing(false);
      setFollowerCount(followerCount - 1);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <div>
      {isFollowing ? (
        <button onClick={handleUnfollow}>Unfollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
      <div>Followers: {followerCount}</div>
      <div>Following: {followingCount}</div>
    </div>
  );
};

export default FollowComponent;