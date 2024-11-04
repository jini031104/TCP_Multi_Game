import { CLIENT_VERSION } from '../../constants/env.js';
import { getProtoTypeNameByHandlerId } from '../../handlers/index.js';
import { getProtoMessages } from '../../init/loadProto.js';

export const packetParser = (data) => {
    const protoMessages = getProtoMessages();
    const commonPacket = protoMessages.common.Packet;
    let packet;

    try {
        packet = commonPacket.decode(data);
    } catch (error) {
        console.error(error);
    }

    const handlerId = packet.handlerId;
    const userId = packet.userId;
    const clientVersion = packet.clientVersion;

    if (clientVersion !== CLIENT_VERSION) {
        console.error('클라이언트 버전이 일치하지 않다.');
        throw Error();
    }

    const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
    const [namespace, typeName] = protoTypeName.split('.');
    const payloadType = protoMessages[namespace][typeName];
    let payload;

    try {
        payload = payloadType.decode(packet.payload);
    } catch (error) {
        console.error('패킷 구조가 일치하지 않다: ', error);
    }

    const expectedFields = Object.keys(payloadType.fields);
    const actualFields = Object.keys(payload);
    const missingFields = expectedFields.filter((field) => !actualFields.includes(field));
    if (missingFields.length > 0) {
        throw Error();
    }

    return { handlerId, userId, payload };
};
