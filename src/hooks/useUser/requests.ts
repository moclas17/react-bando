import axios from 'axios';
import endpoints from '@config/endpoints';

import { User } from '@hooks/useUser/MagicUserProvider';

type GetUserDataRequest = () => Promise<Partial<User>>;
export const getUserData: GetUserDataRequest = () =>
  axios
    .get(endpoints.userKyc)
    .then(({ data }) => ({
      id: data.id,
      kycLevel: data.kyc_level,
      externalId: data.external_id,
      firstName: data.first_name,
      lastName: data.last_name,
      killbId: data.killb_id,
      dateOfBirth: data.date_of_birth,
      phone: data.phone,
      nationalIdNumber: data.national_id_number,
      email: data.email,
    }))
    .catch((error) => {
      if (error.response.data.success) return Promise.resolve({ kycLevel: 0 });
      return Promise.reject(error);
    });
