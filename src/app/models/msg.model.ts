export interface Message {
    "mtsID": string,
    "mtsTitle" : string,
    "mtsMsg" : string,
    "mtsCreatedBy": string,
    "mtsCreatedAt": string,
    "mtsLastUpdatedBy": string,
    "mtsLastUpdatedAt": string,
    "mtsLog": string,
    "mtsState": boolean,
    "mtsFrom": string,
    "mtsTo": string,
    "smcId": string,
    "mtsCategory": string,
    "gpId": string,
    "image": string,
    "acceptResponse": boolean
}

export interface AyuvMessage {
    "mtsTitle" : string,
    "mtsMsg" : string,
    "mtsCreatedBy": string,
    "mtsCreatedAt": string,
    "mtsLastUpdatedBy": string,
    "mtsLastUpdatedAt": string,
    "mtsLog": string,
    "mtsState": string,
    "mtsFrom": string,
    "mtsTo": string,
    "smcId": string,
    "mtsCategory": string,
    "gpId": string,
    // "image": string,
    "acceptResponse": string
}

export interface MesssageSend {
    "messageSms" : string,
    "mobileNumber" : string,
}
