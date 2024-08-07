interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icons: React.ComponentType;
}

export default function Button({ icons: Icons, ...props }: ButtonProps) {
  return <button {...props}>{Icons && <Icons />}</button>;
}
