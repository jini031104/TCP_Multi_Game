import { HANDELR_IDS } from '../constants/handlerIds.js';

const handlers = {
    [HANDELR_IDS.INITIAL]: {
        protoType: 'initial.InitialPayload',
    },
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
    if (!handlers[handlerId] || !handlers[handlerId].protoType) {
        throw Error();
    }
    return handlers[handlerId].protoType;
};
