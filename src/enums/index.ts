export enum DEL_FLAG {
  VALID = 1,
  INVALID = 0,
}

export enum MODE {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

export enum PERMISSION {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum AUTH_METHOD {
  FB = "FB",
  GOOGLE = "GOOGLE",
  PASSWORD = "PASSWORD",
}

export enum LOADING_STATUS {
  IDLE = "IDLE",
  LOADING = "LOADING",
  FULFILLED = "FULFILLED",
  ERROR = "FULFILLED",
}

export enum POST_STATUS {
  UNAPPROVED = "UNAPPROVED",
  APPROVED = "APPROVED",
  BLOCKED = "BLOCKED",
}

export enum ORDER_BY {
  CREATE_AT = "CREATE_AT",
  VIEW = "VIEW",
}
