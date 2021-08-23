export interface InteractiveMessage {
    "mtsIMId": string,
    "mtsIMTitle": string,
    "mtsIMMsg": string,
    "mtsIMSQID": number,
    "mtsIMCreatedBy": string,
    "mtsIMCreatedAt": string,
    "mtsIMLog": string,
    "mtsIMState": boolean,
    "mtsIMFrom": string,
    "mtsIMTo": string,
    "templetId": number,
    "mtsCategory": string,
    "smcId": number,
    "gpId": number
  }
  
  export interface MesssageISend {
    "messageSms" : string,
    "mobileNumber" : string,
  }
  