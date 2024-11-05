import { HANDELR_IDS } from '../constants/handlerIds.js';
import locationUpdateHandler from './game/locationUpdate.handler.js';
import initialHandler from './user/initial.handler.js';

const handlers = {
    [HANDELR_IDS.INITIAL]: {
        handler: initialHandler,
        protoType: 'initial.InitialPayload',
    },
    [HANDELR_IDS.LOCATION_UPDATE]: {
        handler: locationUpdateHandler,
        protoType: 'game.LocationUpdatePayload',
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
