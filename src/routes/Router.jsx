import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { PasswordModal } from "@components/@commons";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const Main = lazy(() => import("@pages/main/Main"));
const Login = lazy(() => import("@pages/login/Login"));
const RedirectPage = lazy(() => import("@pages/login/RedirectPage"));
const LogoutRedirectPage = lazy(() => import("@pages/logout/LogoutRedirectPage"));
const Search = lazy(() => import("@pages/search/Search"));
const MyPage = lazy(() => import("@pages/mypage/MyPage"));
const CreateStudyRoom = lazy(() => import("@pages/studyroom/CreateStudyRoom"));
const JoinStudyRoom = lazy(() => import("@pages/studyroom/JoinStudyRoom"));
const StudyRoom = lazy(() => import("@pages/studyroom/StudyRoom"));
const ShareTimetable = lazy(() => import("@pages/share-timetable/ShareTimetable"));
const NotFoundPage = lazy(() => import("@pages/not-found/NotFoundPage"));

function Router() {
  const location = useLocation();

  return (
    <Suspense fallback={null}>
      <Routes location={location.state?.background ?? location}>
        <Route path="/" element={<Main />} />
        <Route path="/search/*" element={<Search />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login/oauth2/code/kakao" element={<RedirectPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/logout/oauth2/code/kakao" element={<LogoutRedirectPage />} />
          <Route path="/studyroom/create" element={<CreateStudyRoom />} />
          <Route path="/studyroom/:roomId/setting" element={<JoinStudyRoom />} />
          <Route path="/studyroom/:roomId" element={<StudyRoom />} />
          <Route path="/share/timetable" element={<ShareTimetable />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {location.state?.background && (
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/check-password/:roomId" element={<PasswordModal />} />
          </Route>
        </Routes>
      )}
    </Suspense>
  );
}

export default Router;
