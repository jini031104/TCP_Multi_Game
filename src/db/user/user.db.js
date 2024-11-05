import dbPool from '../database.js';
import { USER_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

export const findUserByDeviceID = async (deviceId) => {
    try {
        const [rows] = await dbPool.query(USER_QUERIES.FIND_USER_BY_DEVICE_ID, [deviceId]);
        return toCamelCase(rows[0]);
    } catch (error) {
        console.error('findUserByDeviceID 오류: ', error);
    }
};

export const createUser = async (deviceId) => {
    try {
        await dbPool.query(USER_QUERIES.CREATE_USER, [deviceId]);
        return { deviceId };
    } catch (error) {
        console.error('createUser 오류: ', error);
    }
};

export const updateUserLogin = async (deviceId) => {
    try {
        await dbPool.query(USER_QUERIES.UPDATE_USER_LOGIN, [deviceId]);
    } catch (error) {
        console.error('updateUserLogin 오류: ', error);
    }
};

export const updateUserLocation = async (x, y, deviceId) => {
    try {
        await dbPool.query(USER_QUERIES.UPDATE_USER_LOCATION, [x, y, deviceId]);
    } catch (error) {
        console.error('updateUserLocation 오류: ', error);
    }
};
