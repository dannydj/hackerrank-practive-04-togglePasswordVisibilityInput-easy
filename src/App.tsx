import { useState } from "react";
import { PasswordInput } from "./components/PasswordInput";

export function App() {
  const [password, setPassword] = useState("");

  return (
    <main className="container">
      <h1>Sign in</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <PasswordInput
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
        />
        <button type="submit" disabled={password.length === 0}>
          Sign in
        </button>
      </form>
    </main>
  );
}
