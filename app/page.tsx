import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  const pageId = 'b60c0f1c-64fe-4ea0-8e19-68d02dd4f01a';
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href={`notion/${pageId}`}><h1>Link to Sample Page</h1></Link>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
