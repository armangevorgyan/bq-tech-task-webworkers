export default function NotionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* You can add any common layout elements here */}
      {children}
    </section>
  );
}
