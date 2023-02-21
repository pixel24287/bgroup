# 첫 번째 작품

## 사용 프레임워크
1. ckeditor5 : 블로그처럼 글을 작성하고, 이미지, 영상 업로드 등을 도와주는 에디터이다.
2. axios : ajax 요청을 할때 다양한 보안옵션을 재공해주며 간단하게 비동기 서버 통신을 가능하게 해주는 툴이다.
3. cookie : 서버에서 받은 정보를 쿠키로 보관하는 프레임워크이다.
4. jwt-decode : cookie나 세션방식을 대체하기 위해 사용하는 일종의 보안토큰으로 해시 암호화된 토큰을 해석해서 정보를 반환해준다.
5. swiper : 무한 스크롤링을 간단하게 구현하기 위해 사용된 프레임워크이다.
6. xlsx : 전달받은 데이터를 엑셀파일로 만들어주는 프레임워크이다.


## 기능과 사용기술

## 1. 회원가입, 로그인

1-1 회원가입에는 아이디나 이메일의 중복체크를 위해 서버와의 통신으로 데이터베이스에서 아이디나 이메일의 중복여부를 확인하도록 했다.

1-2 비밀번호 중복확인으로 사용자가 해당 비밀번호를 정확히 입력했는지 확인하도록 했다.

1-3 비밀번호는 crypto-js로 암호화시켜서 저장했다.

1-4 로그인할시 해당 아이디와 비밀번호 조회로 일치하면 아이디와 닉네임, 사용자 index등을 전송해서 jwt 토큰으로 암호화해서 전송받는다.

1-5 전송받은 토큰은 httponly, secure 옵션을 켜서 저장한다. (xss 공격 방어)

1-6 이 방식보단 refresh token을 저장해서 httponly, secure옵션을 키고, access token은 state에 저장해서 새로고침 시 refresh token을 이용해 불러오는 것이 좋다.


## 2. 검색

2-1 제목, 제목과 내용검색등 다양한 검색이 가능하도록 했다.

2-2 라우터와 체크박스에 따라 검색 조건이 다른 영역에서 호출하도록 했다.

2-3 데이터는 페이징에 따라 일부분씩 전송된다.

## 3. 페이징

3-1 각 state에 저장된 페이징 숫자에 따라 불러올 데이터를 쿼리문에 작성했다.

3-2 시작과 끝, 각 숫자를 누르면 해당 숫자가 state로 저장되면서 useEffect로 데이터 새로고침됨다. (state가 아닌 라우터에 저장하는게 좋다.)

3-3 검색 페이징과 일반 페이징은 사용하는 쿼리가 달라서 컴포넌트도 분리해두었다.

## 4. 컨텐츠 리스트 화면

4-1 각 컨텐츠들은 json의 배열에 저장되어 있고, 정보들은 컴포넌트를 통해 보여지도록 했다.

4-2 랜더링 없이 화면전환이 되도록 next link를 이용해 구현했다.

## 5. 컨텐츠 생성 에디터 화면

5-1 ckeditor5 를 사용해 이미지 업로드, 내용 검색을 위해 html문을 제거하도록 정규식을 이용해 문자 제거, url을 이용해 영상 업로드 등을 구현했다.

5-2 이미지 업로드는 config 에 이미지 업로드 플러그인을 추가해서 이미지 업로드가 정상적으로 되면 이미지 업로드된 주소를 받아서 이미지가 보이도록 구현했다.

5-3 이미지 용량을 제한해두는것과, 이미지 업로드 숫자를 제한해두는 작업도 추가하는게 좋다. (업로드 하려할때 이미지 용량 미리 확인, 서버에서도 한번 더 확인)

5-3 이미지 업로드 후 새로고침하거나 뒤로가기를 하면 서버에 필요없는 이미지가 영구적으로 저장되서 이 문제를 해결하고자 서버에 임시폴더를 만드는게 좋다.
