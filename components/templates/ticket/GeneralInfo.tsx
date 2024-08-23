import React, { useState, useEffect, useCallback } from 'react';
import InfoTemplate from './InfoTemplate';

interface GeneralInfoProps {
  member: number;
  setMember: React.Dispatch<React.SetStateAction<number>>;
  onInfoComplete: (isComplete: boolean) => void;
  onInfoChange: (info: {
    buyer: string;
    phone_num: string;
    members: { name: string; phone_num: string }[];
  }) => void;
  userInfo: {
    buyer: string;
    phone_num: string;
    members: Array<{ name: string; phone_num: string }>;
  };
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  member,
  setMember,
  onInfoComplete,
  onInfoChange,
  userInfo,
}) => {
  const [buyer, setBuyer] = useState(userInfo.buyer || '');
  const [phone, setPhone] = useState(userInfo.phone_num || '');
  const [namesArray, setNamesArray] = useState<string[]>(
    userInfo.members.map((member) => member.name)
  );
  const [phonesArray, setPhonesArray] = useState<string[]>(
    userInfo.members.map((member) => member.phone_num)
  );
  const [companions, setCompanions] = useState<string[]>(
    userInfo.members.map((_, index) => `동반인 ${index + 1}`)
  );

  const handleBuyerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyer(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = event.target.value.replace(/[^0-9]/g, '');
    const limitedPhoneNumber = phoneNumber.slice(0, 11);
    setPhone(limitedPhoneNumber);
  };

  const handleNamesArrayChange = (index: number, value: string) => {
    const updatedNames = [...namesArray];
    updatedNames[index] = value;
    setNamesArray(updatedNames);
  };

  const handlePhonesArrayChange = (index: number, value: string) => {
    const phoneNumber = value.replace(/[^0-9]/g, '');
    const limitedPhoneNumber = phoneNumber.slice(0, 11);
    const updatedPhones = [...phonesArray];
    updatedPhones[index] = limitedPhoneNumber;
    setPhonesArray(updatedPhones);
  };

  const addCompanion = useCallback(() => {
    setCompanions((prevCompanions) => [
      ...prevCompanions,
      `동반인 ${prevCompanions.length + 1}`,
    ]);
    setNamesArray((prevNamesArray) => [...prevNamesArray, '']);
    setPhonesArray((prevPhonesArray) => [...prevPhonesArray, '']);
    setMember((prevMember) => {
      const newMember = prevMember + 1;
      localStorage.setItem('member', newMember.toString());
      return newMember;
    });
  }, [setMember]);

  const removeCompanion = useCallback(
    (index: number) => {
      setNamesArray((prevNamesArray) => {
        const updatedNames = [...prevNamesArray];
        updatedNames.splice(index, 1);
        return updatedNames;
      });

      setPhonesArray((prevPhonesArray) => {
        const updatedPhones = [...prevPhonesArray];
        updatedPhones.splice(index, 1);
        return updatedPhones;
      });

      setCompanions((prevCompanions) => {
        const updatedCompanions = [...prevCompanions];
        updatedCompanions.splice(index, 1);
        return updatedCompanions;
      });

      setMember((prevMember) => {
        const newMember = Math.max(prevMember - 1, 1);
        localStorage.setItem('member', newMember.toString());
        return newMember;
      });
    },
    [setMember]
  );

  useEffect(() => {
    const isFormComplete =
      buyer.trim() !== '' &&
      phone.trim() !== '' &&
      namesArray.slice(0, member - 1).every((name) => name.trim() !== '') &&
      phonesArray.slice(0, member - 1).every((phone) => phone.trim() !== '');

    onInfoComplete(isFormComplete);
  }, [buyer, phone, namesArray, phonesArray, member, onInfoComplete]);

  useEffect(() => {
    const updatedMembers = namesArray
      .slice(0, member - 1)
      .map((name, index) => ({ name, phone_num: phonesArray[index] }));
    if (
      buyer !== userInfo.buyer ||
      phone !== userInfo.phone_num ||
      !arraysEqual(updatedMembers, userInfo.members)
    ) {
      onInfoChange({ buyer, phone_num: phone, members: updatedMembers });
    }
  }, [buyer, phone, namesArray, phonesArray, onInfoChange, userInfo, member]);

  function arraysEqual(arr1: any[], arr2: any[]) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every(
      (value, index) =>
        value.name === arr2[index].name &&
        value.phone_num === arr2[index].phone_num
    );
  }

  return (
    <div className="flex flex-col mt-10 mb-10 w-full px-4 pad:px-12">
      <div className="flex flex-col pad:flex-row h-[55px] pad:h-[30px]">
        <div className="font-semibold text-lg pad:text-xl leading-[30px] text-gray-90">
          예매자 정보 입력
        </div>
        <div className="flex pad:ml-3 font-medium text-[16px] leading-6 text-gray-40 items-center">
          본인확인을 위해 정확한 정보를 입력해주세요.
        </div>
      </div>
      <div className="flex flex-col">
        <InfoTemplate
          index={0}
          member={member}
          role={'예매자'}
          handleBuyerChange={handleBuyerChange}
          handlePhoneChange={handlePhoneChange}
        />
      </div>
      {Array.from({ length: member - 1 }).map((_, index) => (
        <div key={index + 1} className="flex flex-row mt-2">
          <InfoTemplate
            index={index + 1}
            role={`동반인 ${index + 1}`}
            handleNamesArrayChange={(value) =>
              handleNamesArrayChange(index, value)
            }
            handlePhonesArrayChange={(value) =>
              handlePhonesArrayChange(index, value)
            }
            removeCompanion={() => removeCompanion(index)}
            companion={index + 1}
            member={member}
          />
        </div>
      ))}
      {member < 5 && (
        <button
          onClick={addCompanion}
          className="mt-6 flex items-center justify-center w-[282px] pad:w-[588px] h-[59px] bg-gray-5 rounded-xl text-gray-60 text-center font-normal leading-6 text-[18px]"
        >
          + 동반인 추가...
        </button>
      )}
    </div>
  );
};

export default GeneralInfo;
