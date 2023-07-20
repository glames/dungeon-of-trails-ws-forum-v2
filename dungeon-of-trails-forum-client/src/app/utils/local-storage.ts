export const getAccessToken = () => localStorage.getItem('DoT-AT') || '';
export const setAccessToken = (at: string) =>
  localStorage.setItem('DoT-AT', at);
export const removeAccessToken = () => localStorage.removeItem('DoT-AT');

export const getRefreshToken = () => localStorage.getItem('DoT-FT') || '';
export const setRefreshToken = (ft: string) =>
  localStorage.setItem('DoT-FT', ft);
export const removeRefreshToken = () => localStorage.removeItem('DoT-FT');

export const getUserEmail = () => localStorage.getItem('DoT-UserEmail') || '';
export const getUserId = () => localStorage.getItem('DoT-UserId') || '';
export const getUserName = () => localStorage.getItem('DoT-Name') || '';
export const getUserAvatarURL = () => localStorage.getItem('DoT-AVT') || '';

export const removeUserEmail = () => localStorage.removeItem('DoT-UserEmail');
export const removeUserId = () => localStorage.removeItem('DoT-UserId');
export const removeUserName = () => localStorage.removeItem('DoT-Name');
export const removeUserAvatarURL = () => localStorage.removeItem('DoT-AVT');

export const setUserEmail = (at: string) =>
  localStorage.setItem('DoT-UserEmail', at);
export const setUserId = (ft: string) => localStorage.setItem('DoT-UserId', ft);
export const setUserName = (at: string) => localStorage.setItem('DoT-Name', at);
export const setUserAvatarURL = (ft: string) =>
  localStorage.setItem('DoT-AVT', ft);

export const removeAllUserInfo = () => {
  removeAccessToken();
  removeRefreshToken();
  removeUserEmail();
  removeUserId();
  removeUserName();
  removeUserAvatarURL();
};
