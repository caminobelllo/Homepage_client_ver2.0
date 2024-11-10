import React, { useEffect, useRef, useState } from 'react';

const ImageUpload = () => {
  const [images, setImages] = useState<string[]>([]);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 이미지 추가
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(
        (file) => URL.createObjectURL(file) // 이미지 미리 볼 수 있게
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
      setTimeout(checkScrollbar, 20);
    }
  };

  // 이미지 삭제
  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // 스크롤바 유무 감지 함수
  const checkScrollbar = () => {
    if (containerRef.current) {
      const hasScroll =
        containerRef.current.scrollWidth > containerRef.current.clientWidth;
      setHasScrollbar(hasScroll);
    }
  };

  // 이미지가 추가될 때마다 오른쪽으로 스크롤 이동
  useEffect(() => {
    if (hasScrollbar && containerRef.current) {
      setTimeout(() => {
        containerRef.current!.scrollLeft = containerRef.current!.scrollWidth;
      }, 20);
    }
  }, [images, hasScrollbar]);

  return (
    <div className="mb-10">
      <p className="text-gray-90 text-[20px] font-[400] leading-normal pad:mb-2 ph:mb-4">
        첨부파일 업로드<span className="ml-2">({images.length}/5)</span>
      </p>

      {/* container */}
      <div
        ref={containerRef}
        className="mt-2 overflow-x-auto w-full image-upload-scrollbar"
      >
        <div
          className={`flex ${
            images.length === 0 ? 'justify-center' : 'space-x-4'
          } ${hasScrollbar ? 'pb-[10px]' : ''}`}
        >
          {/* 이미지 */}
          {images.map((image, index) => (
            <div
              key={index}
              className="relative pad:h-[400px] ph:h-[328px] rounded-[12px] flex justify-center items-center overflow-hidden flex-shrink-0 group"
            >
              <img
                src={image}
                alt={`uploaded-${index}`}
                className="w-auto h-full object-cover rounded-[11px] transition duration-200 ease-in-out group-hover:blur-sm"
              />

              {/* Hover 시 blur 및 삭제 버튼 */}
              <div className="absolute top-0 left-0 h-full w-full pad:h-[400px] ph:h-[328px] bg-[black]/50 rounded-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <button
                  onClick={() => handleImageDelete(index)}
                  className="w-8 h-8 rounded-full bg-danger-40 text-[white] text-[24px] font-[500] flex items-center justify-center mb-1"
                >
                  -
                </button>
              </div>
            </div>
          ))}

          {/* 추가 버튼 box */}
          {images.length < 5 && (
            <label
              className="pad:w-[400px] ph:w-[328px] pad:h-[400px] ph:h-[328px] rounded-[12px] flex justify-center items-center cursor-pointer flex-shrink-0"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 1)' }}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div
                className="w-8 h-8 rounded-full bg-gray-10 flex justify-center items-center"
                style={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)' }}
              >
                <span className="text-gray-0 text-[24px] font-[500] leading-normal pb-1">
                  +
                </span>
              </div>
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
