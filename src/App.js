import { FullPageSpinner } from "components/lib/lib";
import React from "react";

const MainApp = React.lazy(() => import(/* webpackPrefetch: true */ "./main"));

function App() {
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <MainApp />
    </React.Suspense>
    // <Modal>
    //   <ModalOpenButton>
    //     <button type="button">Open</button>
    //   </ModalOpenButton>
    //   <ModalContents aria-label="Login form" title="Login">
    //     <input type="text" />
    //   </ModalContents>
    // </Modal>
  );
}

export default App;
