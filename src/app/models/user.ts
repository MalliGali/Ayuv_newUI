export interface UserAyuv {
    ayvuId: string,
    userFirstName: string,
    userLastName: string,
    nhsEmailId: string,
    phoneNumber: string,
    practice: string,
    active: boolean,
    username: string,
    password: string,
    registrationStatus: string,
    gpId: number,
    roleId: number
}
export interface RegisterUser {
    ayvuId: string,
    userFirstName: string,
    userLastName: string,
    nhsEmailId: string,
    phoneNumber: string,
    practice: string,
    username: string,
    password: string,
    gpId: number,
    roleId: number,
    registrationStatus: string,
    verificationCode: string,
    active: boolean
}
export interface UserAyuvCreate {
    userFirstName: string,
    userLastName: string,
    nhsEmailId: string,
    phoneNumber: string,
    practice: string,
    active: boolean,
    username: string,
    password: string,
    registrationStatus: string,
    gpId: number,
    roleId: number
}
export interface Password {
    ayvuId: string,
    password: string,
    newPassword: string,
    confPassword: string
}

export interface ForgotPassword {
   emailId : any;
}
