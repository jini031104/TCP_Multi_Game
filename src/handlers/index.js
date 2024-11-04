import { HANDELR_IDS } from '../constants/handlerIds.js';

const handlers = {
    [HANDELR_IDS.INITIAL]: {
        protoType: 'initial.InitialPayload',
    },
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
    if (!handlers[handlerId] || handlers[handlerId].protoType) {
        console.error(`프로토타입을 찾을 수 없다: ID ${handlerId}`);
        throw Error();
    }
    return handlers[handlerId].protoType;
};
