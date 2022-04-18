// /** @jsx jsx */
import { jsx } from "@emotion/react";

import {
  Modal,
  ModalContents,
  ModalOpenButton,
} from "./components/modal/modal";

function App() {
  return (
    <Modal>
      <ModalOpenButton>
        <button type="button">Open</button>
      </ModalOpenButton>
      <ModalContents aria-label="Login form" title="Login">
        <input type="text" />
      </ModalContents>
    </Modal>
  );
}

export default App;
