"use client";

import { useCallback, useEffect, useState } from 'react';

const cookieCutter = require('cookie-cutter');

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
  const [userEmail, setUserEmail] = useState(undefined); // User email
  const [profileMetadata, setProfileMetadata] = useState(undefined); // Metadata depending on profile type
  const [profileInformation, setProfileInformation] = useState(undefined); // Profile information

  const onFormSubmit = useCallback((e: any) => {
    e.preventDefault();
    const idiomas = e.target.language.value.split(',');
    const habilidadesBlandas = e.target.softSkills.value.split(',');
    const habilidadesTecnicas = e.target.techSkills.value.split(',');

    // Academic info
    let informacionAcademica: any = [];
    if (e.target.educative_institution_name.length) {
      e.target.educative_institution_name.forEach((institution: any, index: number) => {
        informacionAcademica.push({
          institucion: institution.value,
          titulo: e.target.academic_title[index].value,
          en_curso: e.target.academic_inProgress[index].checked ? 1 : 0,
          fecha_inicio: e.target.academic_startDate[index].value,
          fecha_fin: e.target.academic_endDate[index].value,
        })
      })
    } else {
      informacionAcademica = [
        {
          institucion: e.target.educative_institution_name.value,
          titulo: e.target.degree.value,
          en_curso: e.target.isInProgress.checked ? 1 : 0,
          fecha_inicio: e.target.startDate.value,
          fecha_fin: e.target.endDate.value,
        }
      ]
    }

    // Laboral info
    let experiencia: any = [];
    if (e.target.companyName.length) {
      e.target.companyName.forEach((company: any, index: number) => {
        experiencia.push({
          nombre_empresa: company.value,
          fecha_inicio: e.target.laboral_startDate[index].value,
          fecha_fin: e.target.laboral_endDate[index].value,
          actual: e.target.laboral_isCurrent[index].checked ? 1 : 0,
          descripcion_actividades: e.target.laboral_activityDescription[index].value,
          id_rol: e.target.laboral_rol[index].value,
        })
      })
    } else {
      experiencia = [
        {
          nombre_empresa: e.target.companyName.value,
          fecha_inicio: e.target.laboral_startDate.value,
          fecha_fin: e.target.laboral_endDate.value,
          actual: e.target.laboral_isCurrent.checked ? 1 : 0,
          descripcion_actividades: e.target.laboral_activityDescription.value,
          id_rol: e.target.laboral_rol.value,
        }
      ]
    }

    // Build request object
    const bodyObject = {
      edad: e.target.age.value,
      numero_telefono: e.target.phone_number.value,
      email: userEmail,
      id_pais: e.target.candidate_country.value,
      habilidadesBlandas,
      habilidadesTecnicas,
      idiomas,
      experiencia,
      informacionAcademica,
    }

    // Send request
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyObject),
    });

    // TODO: Show success message
  }, [userEmail]);

  const handleCancel = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUserType(userData.type);
    setUserEmail(userData.email);
  }, []);

  useEffect(() => {
    if (!userType) return;

    // Language
    const lang = cookieCutter.get('NEXT_LOCALE');

    // Query params
    const queryParams = (lang && lang !== 'es') ? `language=${lang}` : '';

    // Get profile metadata
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/${mapUser[userType]}/metadata/?${queryParams}`)
      .then(res => res.json())
      .then(data => setProfileMetadata(data));
  }, [userType]);

  useEffect(() => {
    if (!userEmail) return;
    // Get user profile data
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/info/${userEmail}`)
      .then(res => res.json())
      .then(data => setProfileInformation(data));
  }, [userType, userEmail]);

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
            <PersonalInfoForm labels={labels} metadata={profileMetadata} profileData={profileInformation} />
            <AcademicInfoForm labels={labels} profileData={profileInformation} />
            <LaboralInfoForm labels={labels} metadata={profileMetadata} profileData={profileInformation} />
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
