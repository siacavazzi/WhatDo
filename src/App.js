import { Outlet } from 'react-router-dom'
import Header from './header'
import { useLoaderData } from 'react-router-dom'
import { getProfileLoader } from './loaders';
import { ProfileContext } from './ProfileContext';
import { useState } from 'react';

function App() {
    const [profiles, setProfiles] = useState(useLoaderData());
    const [profile, setProfile] = useState("")

    const contextValue = {
        profiles,
        profile,
        setProfile,
        setProfiles,
      };

    return (
        <div className="App">
            <ProfileContext.Provider value={contextValue}>
                <Header />
                <Outlet />
            </ProfileContext.Provider>

        </div>
    );
}

export default App;