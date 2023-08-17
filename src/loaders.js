export async function getProfileLoader() {
    const response = await fetch("http://localhost:3000/users");
    const profiles = await response.json();
    return {profiles};
}