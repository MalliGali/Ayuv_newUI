export interface ScheduleMessage {
    "schMsgId": string,
    "mtshTitle": string,
    "mtshMsg": string,
    "mtshCreatedBy": string,
    'mtshCreatedAt': string,
    "mtshSqid": string,
    "mtshId": string,
    "mtshMsgCount": number,
    "mtshFreq": string,
    "mtshFreqPeriod": string,
    "mtshLog": string,
    "active": boolean,
    "gpId": number,
    "category": string,
    "mtshMsgTo": string
}

export interface AyuvScheduleMessage {
    "schMsgId": string,
    "mtshTitle": string,
    "mtshMsg": string,
    "mtshCreatedBy": string,
    'mtshCreatedAt': string,
    "mtshSqid": string,
    "mtshId": string,
    "mtshMsgCount": number,
    "mtshFreq": string,
    "mtshFreqPeriod": string,
    "mtshLog": string,
    "active": boolean,
    "gpId": number,
    "category": string,
    "mtshMsgTo": string
}

export interface ScheduleMessageSent {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    templateId: string,
    templateType: string,
    templeteMessages: [{
        templetMessage: string,
        scheduleDate: string,
    }],
    templateTitle: string
}
