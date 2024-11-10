'use client';
import CommunityRule from '@/components/announcement/posting/CommunityRule';
import ContentInput from '@/components/announcement/posting/ContentInput';
import ImageUpload from '@/components/announcement/posting/ImageUpload';
import TitleInput from '@/components/announcement/posting/TitleInput';
import TopButtons from '@/components/announcement/posting/TopButtons';
import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const isPostActive = title.trim() !== '' && content.trim() !== '';

  return (
    <div className="relative flex flex-col items-center mt-[96px] mb-[-160px] font-pretendard">
      <section className="dt:w-[1200px] pad:w-[786px] ph:w-[328px] dt:pb-[578px] pad:pb-[559px] ph:pb-[171px]">
        <TopButtons isPostActive={isPostActive} />
        <TitleInput title={title} setTitle={setTitle} />
        <ContentInput content={content} setContent={setContent} />
        <ImageUpload />
        <CommunityRule />
      </section>
    </div>
  );
};

export default Page;
