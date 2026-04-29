import { useState } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PasswordInput } from "../components/PasswordInput";

function Harness({
  initialValue = "",
  disabled = false,
}: {
  initialValue?: string;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(initialValue);
  return (
    <PasswordInput
      id="pw"
      label="Password"
      value={value}
      onChange={setValue}
      disabled={disabled}
    />
  );
}

describe("PasswordInput", () => {
  it("renders an accessible input associated with its label", () => {
    render(<Harness />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });

  it("starts with the password hidden (type='password')", () => {
    render(<Harness />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    expect(input.type).toBe("password");
  });

  it("renders a toggle button labeled 'Show password' initially", () => {
    render(<Harness />);

    const button = screen.getByRole("button", { name: /show password/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("toggles the input to type='text' and updates the button label when clicked", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const showBtn = screen.getByRole("button", { name: /show password/i });

    await user.click(showBtn);

    expect(input.type).toBe("text");
    const hideBtn = screen.getByRole("button", { name: /hide password/i });
    expect(hideBtn).toHaveAttribute("aria-pressed", "true");
  });

  it("toggles back to hidden when clicked again", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /show password/i });

    await user.click(button);
    await user.click(screen.getByRole("button", { name: /hide password/i }));

    expect(input.type).toBe("password");
    expect(
      screen.getByRole("button", { name: /show password/i })
    ).toHaveAttribute("aria-pressed", "false");
  });

  it("is a controlled input that reflects the value prop", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    await user.type(input, "hunter2");

    expect(input.value).toBe("hunter2");
  });

  it("preserves the typed value when toggling visibility", async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    await user.type(input, "s3cret!");
    await user.click(screen.getByRole("button", { name: /show password/i }));

    expect(input.value).toBe("s3cret!");
    expect(input.type).toBe("text");
  });

  it("disables both the input and the toggle button when disabled is true", () => {
    render(<Harness disabled />);

    const input = screen.getByLabelText("Password") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /show password/i });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
