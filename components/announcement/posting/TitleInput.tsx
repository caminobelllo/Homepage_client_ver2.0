import React from 'react';

interface TitleInputProps {
  title: string;
  setTitle: (value: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, setTitle }) => (
  <input
    type="text"
    placeholder="제목"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full pad:h-[64px] ph:h-[52px] rounded-[8px] px-3 py-2 pad:text-[32px] ph:text-[24px] font-[500] text-[black] placeholder-gray-40
    focus:shadow-outline focus:shadow-primary-50 focus:outline-none mb-10"
    style={{ boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 1)' }}
  />
);

export default TitleInput;
