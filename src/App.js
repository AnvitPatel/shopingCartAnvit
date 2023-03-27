import Main from "./main";
import { Provider } from "react-redux";
import store from "redux/store";
import "./App.css"; 
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Main />
      </Provider>
    </div>
  );
}

export default App;
