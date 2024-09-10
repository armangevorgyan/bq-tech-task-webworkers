import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { BlockMapType } from 'react-notion';

const DynamicNotionRenderer = dynamic(() => import('../../components/NotionRenderer'), { ssr: false });

interface PageProps {
  params: { pageId: string }
}

async function getData(pageId: string) {
  if (!pageId) {
    return {
      blockMap: null,
      title: ''
    };
  }

  const res = await fetch(`https://bq-notion-tech-task.armangev.workers.dev/v1/page/${pageId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  const blockMap = data as BlockMapType;
  const title = blockMap[Object.keys(blockMap)[0]]?.value.properties.title[0][0] || '';

  return {
    blockMap,
    title
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { title } = await getData(params.pageId);
  return { title };
}

export default async function NotionPage({ params }: PageProps) {
  const { blockMap, title } = await getData(params.pageId);

  if (!blockMap || Object.keys(blockMap).length === 0) {
    notFound();
  }

  return (
    <div>
      <h1>{title}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicNotionRenderer blockMap={blockMap} />
      </Suspense>
    </div>
  );
}
