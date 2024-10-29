import { userLoggedIn, setLoading } from "../../auth/authSlice";
import { apiSlice } from "../apiSlice/apiSlice";
import { AdminEmailSignup, EmailLogin, EmailSignup, FacebookLogin } from "./types";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        facebookLogin: builder.mutation<any, FacebookLogin>({
            query: (data) => ({
                url: '/api/users/facebook-login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users'],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Set loading state to true before making the request
                    dispatch(setLoading(true));

                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // updating redux store
                    dispatch(userLoggedIn({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // Set loading state to false after the request is successful
                    dispatch(setLoading(false));
                }
                catch (err) {
                    // Set loading state to false in case of error
                    dispatch(setLoading(false));
                }
            }
        }),

        emailLogin: builder.mutation<any, EmailLogin>({
            query: (data) => ({
                url: '/api/users/email-login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users'],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Set loading state to true before making the request
                    dispatch(setLoading(true));

                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // updating redux store
                    dispatch(userLoggedIn({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // Set loading state to false after the request is successful
                    dispatch(setLoading(false));
                }
                catch (err) {
                    // Set loading state to false in case of error
                    dispatch(setLoading(false));
                }
            }
        }),

        emailSignup: builder.mutation<any, EmailSignup>({
            query: (data) => ({
                url: '/api/users/email-signup',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users'],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Set loading state to true before making the request
                    dispatch(setLoading(true));

                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // updating redux store
                    dispatch(userLoggedIn({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // Set loading state to false after the request is successful
                    dispatch(setLoading(false));
                }
                catch (err) {
                    // Set loading state to false in case of error
                    dispatch(setLoading(false));
                }
            }
        }),

        adminEmailSignup: builder.mutation<any, AdminEmailSignup>({
            query: (data) => ({
                url: '/api/users/admin-email-signup',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Users'],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Set loading state to true before making the request
                    dispatch(setLoading(true));

                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // updating redux store
                    dispatch(userLoggedIn({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // Set loading state to false after the request is successful
                    dispatch(setLoading(false));
                }
                catch (err) {
                    // Set loading state to false in case of error
                    dispatch(setLoading(false));
                }
            }
        }),

        getFacebookUsers: builder.query<any, any>({
            query: () => ({
                url: `/api/users/facebook-users`,
                method: "GET"
            }),
            keepUnusedDataFor: 0, // default 60 seconds
            providesTags: ['Users']
        }),

        getFacebookUser: builder.query<any, string>({
            query: (facebookId) => ({
                url: `/api/users/facebook-users/${facebookId}`,
                method: 'GET'
            }),
            keepUnusedDataFor: 0,
            providesTags: (result, error, arg) => [{ type: 'User', id: arg }]
        }),

        getFacebookUserPosts: builder.query<any, string>({
            query: (facebookId) => ({
                url: `/api/users/facebook-users/posts/${facebookId}`,
                method: 'GET'
            }),
            keepUnusedDataFor: 0,
            providesTags: (result, error, arg) => [{ type: 'Posts', id: arg }]
        }),

        getFacebookUserLikedPages: builder.query<any, string>({
            query: (facebookId) => ({
                url: `/api/users/facebook-users/likes/${facebookId}`,
                method: 'GET'
            }),
            keepUnusedDataFor: 0,
            providesTags: (result, error, arg) => [{ type: 'Likes', id: arg }]
        }),
    })
})

export const {
    useFacebookLoginMutation,
    useEmailLoginMutation,
    useEmailSignupMutation,
    useAdminEmailSignupMutation,
    useGetFacebookUsersQuery,
    useGetFacebookUserQuery,
    useGetFacebookUserPostsQuery,
    useGetFacebookUserLikedPagesQuery
} = userApi;
