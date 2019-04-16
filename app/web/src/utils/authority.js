const localName = 'endowa-admin-authority';

export const getAuthority = (str) => {
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem(localName) : str;
  return authorityString || '';
}

export const setAuthority = (authority) =>  {
  return localStorage.setItem(localName, authority);
}
