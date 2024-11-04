import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';
import { packetNames } from '../protobuf/packetNames.js';

// import.meta.url = 현재 파일의 절대 경로
const __filename = fileURLToPath(import.meta.url);
// 현재 파일이 위치한, 파일 이름을 제외한 경로. 즉, 위에서 디렉토리 경로만 추출
const __dirname = path.dirname(__filename);
// 최상위 경로 + protobuf 폴더
const protoDir = path.join(__dirname, '../protobuf');

// 주어진 파일 경로 내 모든 .proto 파일을 재귀적으로 찾는 함수
const getAllProtoFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const filePath = path.join(dir, file);

        // statSync() => filePath에 뭔가가 있는데
        // isDirectory() => 이게 디렉토리인지 아닌지...
        // 만약 디렉토리면 다시 재귀로 돌아가서...(왜냐하면 우리는 파일을 원하는거니까)
        if (fs.statSync(filePath).isDirectory()) {
            getAllProtoFiles(filePath, fileList);
        } else if (path.extname(file) === '.proto') {
            fileList.push(filePath);
        }
    });
    return fileList;
};

// 모든 .proto 파일 경로를 가져옴
const protoFiles = getAllProtoFiles(protoDir);

// 로드된 프로토 메시지들을 저장할 객체
// = 결과적으로 사용하게 될 객체
const protoMessages = {};

export const loadProtos = async () => {
    try {
        const root = new protobuf.Root();
        // 비동기 병렬 처리로 프로토 파일 로드
        await Promise.all(protoFiles.map((file) => root.load(file)));

        // packageName = 각 .proto 파일의 패키지 이름
        // types = packetNames.js 파일의 객체
        for (const [packageName, types] of Object.entries(packetNames)) {
            protoMessages[packageName] = {};
            for (const [type, typeName] of Object.entries(types)) {
                protoMessages[packageName][type] = root.lookupType(typeName);
            }
        }
        console.log('Protobuf 파일이 로드되었다.');
    } catch (error) {
        console.error('Protobuf 파일 로드 중 오류가 발생했다: ', error);
    }
};

// 원본이 바뀔 확룔을 고려해 얕은 복사본을 사용한다.
export const getProtoMessages = () => {
    return { ...protoMessages };
};
