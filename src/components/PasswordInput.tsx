import { useState } from 'react'

export type PasswordInputProps = {
  id: string
  label: string
  value: string
  onChange: (next: string) => void
  disabled?: boolean
}

export function PasswordInput(_props: PasswordInputProps) {
  // TODO: render a <label> linked to the <input> via htmlFor / id
  // TODO: render a controlled <input> whose `type` toggles between "password" and "text"
  // TODO: render a toggle <button type="button"> that flips the visibility
  // TODO: the button's accessible name must be "Show password" when hidden
  //       and "Hide password" when visible
  // TODO: the button must reflect the toggle state via aria-pressed
  // TODO: when `disabled` is true, both the input and the button must be disabled
  // TODO: the input must NOT default to type="text" — it must start hidden ("password")
  const { disabled, id, label, value, onChange } = _props
  const [buttonType, setButtonType] = useState('password')
  const [buttonText, setButtonText] = useState('Show password')
  const [isPressed, setIsPressed] = useState(false)

  const toggle = () => {
    setButtonType(prev => (prev === 'password' ? 'text' : 'password'))
    setButtonText(prev => (prev === 'Show password' ? 'Hide password' : 'Show password'))
    setIsPressed(prev => !prev)
  }

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input aria-label='Password' type={buttonType} disabled={disabled} id={id} value={value} onChange={event => onChange(event.target.value)} />
      <button type='button' aria-pressed={isPressed} onClick={toggle} disabled={disabled}>
        {buttonText}
      </button>
    </>
  )
}
