interface BackToTopProps {
  id: string;
}

export default function BackToTop({ id }: BackToTopProps) {
  return (
    <p style={{ textAlign: "center" }}>
      <a href={`#${id}`}>Back to Top</a>
    </p>
  );
}
