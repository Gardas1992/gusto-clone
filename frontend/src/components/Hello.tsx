interface Props {
  name: string;
}

export default function Hello({ name }: Props) {
  return <p>Hello, {name}! The front‑end is working.</p>;
}
