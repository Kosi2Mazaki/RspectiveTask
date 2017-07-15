export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';
export const SET_TYPE = 'SET_TYPE';

export const AlertType = {
    INFO: 'info',
    ERROR: 'danger',
}

export function showAlert(message) {
    return { type: SHOW_ALERT, message };
}

export function hideAlert() {
    return { type: HIDE_ALERT };
}

export function setType(messageType) {
    return { type: SET_TYPE, messageType };
}
