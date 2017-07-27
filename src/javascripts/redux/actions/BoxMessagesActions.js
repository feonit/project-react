export const BOX_MESSAGE_ADD_TYPICAL_MESSAGE = 'BOX_MESSAGE_ADD_TYPICAL_MESSAGE'

export function addTypicalMessage(level, text){
    return { level: level, text: text }
}

export const BOX_MESSAGE_REMOVE_MESSAGE = 'BOX_MESSAGE_REMOVE_MESSAGE'

export function removeMessage(id) {
    return { type: BOX_MESSAGE_REMOVE_MESSAGE, messageId: id }
}