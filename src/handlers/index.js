import { HANDELR_IDS } from '../constants/handlerIds.js';
import initialHandler from './user/initial.handler.js';

const handlers = {
    [HANDELR_IDS.INITIAL]: {
        handler: initialHandler,
        protoType: 'initial.InitialPayload',
    },
};

export const getHandlerById = (handlerId) => {
    if (!handlers[handlerId] || !handlers[handlerId].protoType) {
        throw Error();
    }
    return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
    if (!handlers[handlerId] || !handlers[handlerId].protoType) {
        throw Error();
    }
    return handlers[handlerId].protoType;
};
