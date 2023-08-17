import React from 'react';

// Create a context with a default value of an empty array
export const ProfileContext = React.createContext({
    profiles: [],
    profile: "",
    setProfile: () => {},
    setProfiles: () => {},
});
