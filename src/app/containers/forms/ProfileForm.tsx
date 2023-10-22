"use client";

import { useCallback, useEffect, useState } from 'react';

import AcademicInfoForm from './academicInfo/AcademicInfo';
import PersonalInfoForm from "./personalInfo/PersonalInfo";
import LaboralInfoForm from './laboralInfo/LaboralInfo';
import Button, { ButtonStyle, IconType } from '../../components/button/Button';
import { UserType } from '../../contants/userType';
import GeneralInfoForm from './generalInfo/GeneralInfo';

const mapUser = {
  [UserType.company]: 'empresa',
  [UserType.candidate]: 'candidato',
};

const ProfileForm = ({ labels }: any) => {
  const [userType, setUserType] = useState(undefined); // User type
  const [profileMetadata, setProfileMetadata] = useState(undefined); // Metadata depending on profile type

  const onFormSubmit = useCallback((e: any) => {
    e.preventDefault();
    // TODO: Build request object (e.targe)
  }, []);

  const handleCancel = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    const type = JSON.parse(localStorage.getItem('user') || '{}').type;
    setUserType(type);
  }, []);

  useEffect(() => {
    if (!userType) return;
    // Get profile metadata - company
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/${mapUser[userType]}/metadata/`)
      .then(res => res.json())
      .then(data => setProfileMetadata(data));
  }, [userType]);

  return (
    <form onSubmit={onFormSubmit}>
      <div className='text-right'>
        <Button
          style={ButtonStyle.secondary}
          type={'button'}
          text={labels.cta_cancel}
          onClick={handleCancel}
        />
        <Button
          style={ButtonStyle.primary}
          type={'submit'}
          icon={IconType.save}
          text={labels.cta_save}
        />
      </div>
      {
        userType === UserType.candidate && (
          <>
            <PersonalInfoForm labels={labels} metadata={profileMetadata} />
            <AcademicInfoForm labels={labels} />
            <LaboralInfoForm labels={labels} metadata={profileMetadata} />
          </>
        )
      }
      {
        userType === UserType.company && (
          <GeneralInfoForm labels={labels} metadata={profileMetadata} />
        )
      }
    </form>
  )
}

export default ProfileForm;
