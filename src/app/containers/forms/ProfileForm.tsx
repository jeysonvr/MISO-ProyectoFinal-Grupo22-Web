"use client";

import { useCallback, useEffect, useState } from 'react';

import AcademicInfoForm from './academicInfo/AcademicInfo';
import PersonalInfoForm from "./personalInfo/PersonalInfo";
import LaboralInfoForm from './laboralInfo/LaboralInfo';
import Button, { ButtonStyle, IconType } from '../../components/button/Button';
import { UserType } from '../../contants/userType';
import GeneralInfoForm from './generalInfo/GeneralInfo';

const ProfileForm = ({ labels }: any) => {

  // User type
  const [userType, setUserType] = useState(undefined);

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
            <PersonalInfoForm labels={labels} />
            <AcademicInfoForm labels={labels} />
            <LaboralInfoForm labels={labels} />
          </>
        )
      }
      {
        userType === UserType.company && (
          <GeneralInfoForm labels={labels}/>
        )
      }
    </form>
  )
}

export default ProfileForm;
