import { FullPageSpinner } from "components/lib/lib";
import React from "react";

const MainApp = React.lazy(() => import(/* webpackPrefetch: true */ "./main"));

function App() {
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <MainApp />
    </React.Suspense>
  );
}

export default App;
