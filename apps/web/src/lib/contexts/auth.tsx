import { Accessor, createContext, createSignal } from "solid-js";

interface IAuthContext {
  isLoggedIn: Accessor<boolean>;
  isLogging: Accessor<boolean>;
  setLoggedIn: (value: boolean) => void;
  setLogging: (value: boolean) => void;
}

const AuthContext = createContext<IAuthContext>({
  isLoggedIn: () => false,
  setLoggedIn: (value: boolean) => {
    console.log("Setting logged in to " + value);
  },
  isLogging: () => false,
  setLogging: (value: boolean) => {
    console.log("Setting logging to " + value);
  },
});

function AuthProvider(props: any) {
  const [isLoggedIn, setLoggedIn] = createSignal(false);
  const [isLogging, setLogging] = createSignal(false);
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoggedIn, isLogging, setLogging }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
