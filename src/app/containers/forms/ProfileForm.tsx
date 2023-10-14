"use client";

import { useCallback } from 'react';

import AcademicInfoForm from './academicInfo/AcademicInfo';
import PersonalInfoForm from "./personalInfo/PersonalInfo";
import LaboralInfoForm from './laboralInfo/LaboralInfo';
import Button, { ButtonStyle, IconType } from '../../components/button/Button';

const ProfileForm = ({ labels }: any) => {

  const onFormSubmit = useCallback((e: any) => {
    e.preventDefault();
    // TODO: Build request object (e.targe)
  }, []);

  const handleCancel = useCallback(() => {
    window.location.reload();
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
      <PersonalInfoForm labels={labels} />
      <AcademicInfoForm labels={labels} />
      <LaboralInfoForm labels={labels} />
    </form>
  )
}

export default ProfileForm;
