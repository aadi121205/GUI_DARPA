const protocol = 'https:';
const host = window.location.hostname;
const port = '7000'; // or any other port you're using
export const SOCKET_URL = `${protocol}//${host}:${port}`;
console.log(SOCKET_URL);