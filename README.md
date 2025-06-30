# 🎬 OZ_REACT_MINI_11

TMDB API와 Supabase를 활용하여 인기 영화를 탐색하고, 유저 인증 및 북마크 기능을 제공하는 영화 추천 웹 애플리케이션입니다.

---

## 📌 주요 기능

- TMDB API 연동을 통한 인기 영화 목록 제공
- 영화 상세 정보 확인
- 검색 기능 (디바운싱 적용)
- 무한 스크롤을 통한 인기 영화 페이징
- 유저 회원가입 / 로그인 / 로그아웃 (Supabase Auth)
- 유저 프로필 및 북마크 기능
- 성인/부적절 콘텐츠 필터링

---

## 📁 폴더 구조

```
src/
├── components/
│   ├── common/
│   ├── FormInputs/
│   ├── Layout/
│   ├── Movie/
│   └── NavBar/
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── movies/
│   │   ├── MovieList.jsx
│   │   └── MovieDetail.jsx
│   ├── mypage/
│   │   └── MyPage.jsx
│   └── search/
│       └── SearchResult.jsx
├── hooks/
├── supabase/
│   ├── auth/
│   ├── context/
│   └── utilities/
├── utils/
│   ├── apiUrls.js
│   └── filterMovies.js
├── App.jsx
└── main.jsx
```

---

## ⚙️ 사용 기술

- **React (Vite 기반)**
- **Tailwind CSS** – 반응형 스타일링
- **TMDB API** – 영화 데이터 제공
- **Supabase** – 인증 및 데이터 저장
- **React Router v6** – 페이지 라우팅
- **Context API** – 전역 유저 상태 관리
- **Custom Hooks** – 디바운스, 스로틀 등 사용자 정의 훅 적용

---

## 💾 설치 및 실행 방법

```bash
# 1. 프로젝트 클론
git clone https://github.com/ElviaChoi/oz_react_mini_11.git
cd oz_react_mini_11

# 2. 패키지 설치
npm install

# 3. 환경변수 설정 (.env 파일 생성)
# 루트 디렉토리에 .env 파일을 만들고 아래 항목 추가
```

```
VITE_TMDB_READ_ACCESS_TOKEN=YOUR_TMDB_ACCESS_TOKEN
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

```bash
# 4. 개발 서버 실행
npm run dev
```

---

## 🚫 콘텐츠 필터링

- 로맨스(genre_id: 10749) 장르와 성인 콘텐츠(adult: true)는 제외됩니다.
- 부적절한 키워드(예: 'erotic', '섹스', '야동' 등)가 포함된 영화는 필터링됩니다.

---

## ✍️ 작성자

- 프론트엔드 미니 프로젝트: 오즈코딩스쿨 React 과정
- 제출자: **[최시영]**
