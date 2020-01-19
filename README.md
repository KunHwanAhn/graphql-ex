# graphql-ex
GraphQL Sample Project

> NOTE: 본 프로젝트는 GraphQL Server만 포함하고 있는 저장소입니다. 샘플용 Client가 필요하면 Client 저장소인 graphql-client-ex를 참조하시면 됩니다.

# 개발환경
- node.js v12
- yarn v1.21
- MongoDB v4.2.2

## Optional
- Docker v19.03.5

# 실행방법
1. 저장소 Clone
2. 저장소 안에서 의존성 설치
   ```bash
   $ yarn

   # or you can use npm
   $ npm i
   ```
3. MongoDB 설치
   - [MongoDB Community Edition Page](https://docs.mongodb.com/manual/administration/install-community/)
   - or Use Docker
      ```bash
      docker container run -itd --name gql_mongo -p 27017:27017 mongo:4.2.2
      ```

4. 실행
   ```bash
   $ yarn serve

   # or you can use npm
   $ npm run serve
   ```

# GraphQL Client 저장소
[graphql-client-ex](https://github.com/KunHwanAhn/graphql-client-ex)
