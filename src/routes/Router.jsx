import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { PasswordModal } from "@components/@commons";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

const Main = lazy(() => import("@pages/Main/Main"));
const Login = lazy(() => import("@pages/Login/Login"));
const RedirectPage = lazy(() => import("@pages/Login/RedirectPage"));
const LogoutRedirectPage = lazy(() => import("@pages/LogoutRedirectPage/LogoutRedirectPage"));
const Search = lazy(() => import("@pages/Search/Search"));
const MyPage = lazy(() => import("@pages/MyPage/MyPage"));
const CreateRoom = lazy(() => import("@pages/CreateRoom"));
const JoinRoom = lazy(() => import("@pages/JoinRoom"));
const StudyRoom = lazy(() => import("@pages/StudyRoom/StudyRoom"));
const ShareStudyTime = lazy(() => import("@pages/ShareStudyTime/ShareStudyTime"));
const NotFoundPage = lazy(() => import("@pages/NotFoundPage/NotFoundPage"));

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
          <Route path="/studyroom/create" element={<CreateRoom />} />
          <Route path="/studyroom/:roomId/setting" element={<JoinRoom />} />
          <Route path="/studyroom/:roomId" element={<StudyRoom />} />
          <Route path="/share/study-time" element={<ShareStudyTime />} />
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
