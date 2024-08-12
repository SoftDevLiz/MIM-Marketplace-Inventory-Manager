// Define the type of the `versions` object
interface Versions {
    node: () => string;
    chrome: () => string;
    electron: () => string;
}

// Extend the Window interface to include `versions`
interface Window {
    versions: Versions;
}
