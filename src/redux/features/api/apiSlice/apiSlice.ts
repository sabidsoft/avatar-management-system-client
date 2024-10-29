import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../../app/store';
import { BASE_URL } from '../../../../utils/baseUrl';

export const apiSlice = createApi({
    reducerPath: 'avatarManagementApi',
    tagTypes: ['Users', 'User', 'Posts', 'Likes'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: async (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({})
})

