# TCP 통신을 기반으로 한 캐릭터 이동

### 개요

---

TCP 통신을 기반으로 유니티와 연동하여 캐릭터 이동을 구현했다.

이 과정에서 추측항법 및 레이턴시가 사용되었다.

### 기술 스택

---

-   Node.js
-   AWS EC2
-   AWS RDS

## 프로젝트 실행

1. 의존성 설치

```
npm install
```

2. 실행

```
npm run dev
```

## 클라이언트

https://github.com/jini031104/TCP_Multi_Game_Unity

## 트러블 슈팅

### 배경

2인 이상의 클라이언트가 서버에 접속하고자 할 때 문제 발생.

동시 접속이면 서로가 보여야 하는데 그러지 않았음. 즉, 서로 개별적인 공간으로 접속.

### 문제점

TCP 통신을 하는 의미가 없으며, 멀티 게임에 있어서 매우 치명적인 상황.

### 해결 과정

에러를 확인해보니 string 타입이 들어가야 할 곳에 숫자 타입이 들어가 있었음.

디버깅을 통해 createLocationPacket()에서 인코딩을 진행할 때 생기는 문제임을 파악.
해당 함수가 사용되는 곳을 찾아내었고, 들어가는 데이터를 console.log()로 확인. playerId가 숫자로 들어가고 있음을 발견.

이후 gameNotification.LocationUpdate의 각 필드들의 타입을 확인. playerId가 string 타입이었다.

다만 과제에서 정의된 패킷 구조를 확인해보면, 해당 playerId는 숫자 타입이 맞았다. 즉, 내가 타입을 잘못 지정한 것.

따라서 해당 타입을 uint32로 변경하여 TCP 통신이 정상적으로 될 수 있도록 수정하였다.