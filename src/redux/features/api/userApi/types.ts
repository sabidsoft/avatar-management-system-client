export interface FacebookLogin {
    name: string;
    email: string;
    role: string;
    registerWith: string;
    facebookId: string;
    profilePicture: string;
    accessToken: string;
    expiresIn: number;
    dataAccessExpirationTime: number;
}

export interface EmailLogin {
    email: string;
    password: string;
}

export interface EmailSignup {
    name: string;
    email: string;
    role: string;
    registerWith: string;
    hometown: string;
    location: string;
    gender: string;
    birthday: string;
    password: string;
}

export interface AdminEmailSignup {
    name: string;
    email: string;
    role: string;
    registerWith: string;
    hometown: string;
    location: string;
    gender: string;
    birthday: string;
    adminCode: string;
    password: string;
}