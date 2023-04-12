const getStorage = (session) => (session ? sessionStorage : localStorage);

export default getStorage;
