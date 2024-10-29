export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    facebookId?: string;
    profilePicture?: string;
    link?: string;
    gender: string;
    birthday: string;
    hometown: string;
    location: string;
    accessToken?: string;
    expiresIn?: number;
    dataAccessExpirationTime?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface InitialState {
    token: string | null;
    user: User | null;
    isLoading: boolean;
}