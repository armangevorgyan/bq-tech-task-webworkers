'use client';
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

import React from 'react';
import { NotionRenderer as BaseNotionRenderer, BlockMapType } from 'react-notion';
import Link from 'next/link';

interface NotionRendererProps {
  blockMap: BlockMapType;
}

const NotionRenderer: React.FC<NotionRendererProps> = ({ blockMap }) => {
  console.log(blockMap)
  return (
    <>
      <BaseNotionRenderer
        blockMap={blockMap}
        fullPage
        customBlockComponents={{
          page: ({ blockValue, renderComponent }) => (
            <Link legacyBehavior href={`/notion/${blockValue.id}`}>{renderComponent()}</Link>
          )
        }}
      />
      <style jsx global>{`
        div :global(.notion-code) {
          box-sizing: border-box;
        }

        body {
          padding: 0;
          margin: 0;    
        }
      `}</style>
    </>
  );
};

export default NotionRenderer;
