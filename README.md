# 🎬 Pickflix: 영화 탐색 및 추천 서비스

TMDB API와 Supabase를 활용하여 인기 영화를 탐색하고, 유저 인증 및 북마크 기능을 제공하는 영화 추천 웹 애플리케이션입니다.

---

## 💡 프로젝트 개요

이 프로젝트는 React 기반의 프론트엔드 웹 애플리케이션으로, 사용자가 영화 정보를 쉽게 탐색하고 관리할 수 있도록 설계되었습니다. TMDB API를 통해 최신 영화 데이터를 가져오며, Supabase를 활용하여 사용자 인증 및 개인화된 북마크 기능을 제공합니다. 개발 과정에서 성능 최적화와 접근성 개선에 중점을 두어 사용자 경험을 향상시켰습니다.

---

## 📁 주요 폴더 구조

```
src/
├── components/
├── hooks/
├── pages/
├── store/
├── supabase/
├── utils/
├── App.jsx
└── main.jsx
```

---

## 📌 주요 기능

- TMDB API 연동을 통한 인기 영화 목록 제공
- 영화 상세 정보 확인
- 검색 기능 (디바운싱 적용)
- 무한 스크롤을 통한 인기 영화 페이징
- 유저 회원가입 / 로그인 / 로그아웃 (Supabase Auth)
- 유저 프로필 및 북마크 기능
- 성인/부적절 콘텐츠 필터링
- **개선된 스켈레톤 UI:** 로딩 중 사용자 경험을 위한 스켈레톤 UI 적용 및 최적화

---

## ✨ 데모 및 배포

### 🚀 배포 링크

[여기에 Vercel 배포 주소를 넣어주세요](YOUR_VERCEL_DEPLOYMENT_URL)

### 📸 스크린샷

<!-- 여기에 애플리케이션의 주요 화면 스크린샷을 추가해주세요. -->
<!-- 예시: ![메인 화면](path/to/your/screenshot1.png) -->

---

## 🚀 성능 최적화

애플리케이션의 로딩 속도 및 런타임 성능 향상을 위해 다음과 같은 최적화 기법을 적용했습니다.

- **이미지 지연 로딩 (Lazy Loading):** `loading="lazy"` 속성을 사용하여 뷰포트 밖에 있는 이미지의 로딩을 지연시켜 초기 로딩 속도를 개선했습니다.
- **페이지 코드 스플리팅 (Code Splitting):** `React.lazy`와 `React.Suspense`를 활용하여 페이지별 코드를 분할 로드함으로써 초기 번들 크기를 줄이고 페이지 전환 속도를 향상시켰습니다.
- **불필요한 리렌더링 방지:** `React.memo`를 `MovieCard` 및 `MovieSlide` 컴포넌트에 적용하여 props 변경이 없는 경우 불필요한 리렌더링을 방지하고 런타임 성능을 최적화했습니다.

---

## ⚙️ 사용 기술

- **React (Vite 기반)**
- **Tailwind CSS** – 반응형 스타일링
- **TMDB API** – 영화 데이터 제공
- **Supabase** – 인증 및 데이터 저장
- **React Router v6** – 페이지 라우팅
- **Zustand & Context API** – 검색(Zustand) 및 유저 인증(Context) 등 전역 상태 관리
- **Custom Hooks** – 디바운스, 스로틀 등 사용자 정의 훅 적용
- **Mock Service Worker (MSW):** 개발 및 테스트 환경에서 API 요청을 모킹하여 실제 백엔드 없이도 프론트엔드 개발을 용이하게 합니다.
- **Gemini CLI:** 개발 과정에서 코드 개선, 최적화, 문서화 등에 활용된 AI 기반 CLI 어시스턴트.

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
- 부적절한 키워드가 포함된 영화는 필터링됩니다.

---

## ✍️ 작성자

프론트엔드 미니 프로젝트: 오즈코딩스쿨 React 과정
제출자: [최시영]
