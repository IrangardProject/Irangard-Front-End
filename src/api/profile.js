import defaultProfileImg from '../assets/images/avatar.png';
import apiInstance from '../config/axios';

export const useGetProfile = username => {
  return apiInstance
    .get(`/accounts/profile/${username}`)
    .then(res => res.data)
    .then(data => {
      const {
        follower_number = 0,
        following_number = 0,
        following = true,
        full_name = '',
        email = '',
        username = '',
        about_me = '',
        id,
        is_owner = false,
      } = data;
      const profileImg = data?.image ? data.image : defaultProfileImg;
      return {
        follower_number,
        following_number,
        following,
        full_name,
        email,
        id,
        username,
        about_me,
        profileImg,
        is_owner,
      };
    });
};
export const usePutProfile = async (username, body, onError, onSuccess) => {
  try {
    const res = await apiInstance.put(`/accounts/profile/${username}`, body);
    const data = await res.data;
    onSuccess(data);
  } catch (error) {
    console.log("the error is: ", error);
    onError(error);
  }
};
