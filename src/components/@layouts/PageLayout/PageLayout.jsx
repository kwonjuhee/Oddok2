import { useNavigate } from "react-router-dom";
import { Header, Footer, MobileHeader } from "@components/@layouts";
import PlusFloatingButton from "@components/main/PlusFloatingButton/PlusFloatingButton";
import { useMediaQuery } from "@hooks";
import styles from "./PageLayout.module.css";

function PageLayout({ children }) {
  const navigate = useNavigate();
  const { isMobile } = useMediaQuery();

  const clickPlusFloatingButton = () => {
    navigate("/studyroom/create");
  };

  return (
    <div className={styles.container}>
      {!isMobile ? <Header /> : <MobileHeader />}
      <div className={styles.inner}>{children}</div>
      <Footer />
      {isMobile && <PlusFloatingButton onClick={clickPlusFloatingButton} />}
    </div>
  );
}

export default PageLayout;
