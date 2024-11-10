import React from 'react';

interface ContentInputProps {
  content: string;
  setContent: (value: string) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({ content, setContent }) => (
  <textarea
    placeholder="내용을 입력하세요"
    value={content}
    onChange={(e) => setContent(e.target.value)}
    className="w-full h-[586px] rounded-[8px] px-3 py-2 pad:text-[20px] ph:text-[16px] font-[500] text-[black] placeholder-gray-40
    focus:shadow-outline focus:shadow-primary-50 focus:outline-none resize-none mb-10"
    style={{ boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 1)' }}
  />
);

export default ContentInput;
