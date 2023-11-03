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

const buildAcademicObject = (element: any) => {
  return {
    institucion: element.educative_institution_name.value,
    titulo: element.academic_title.value,
    en_curso: element.academic_inProgress.checked ? 1 : 0,
    fecha_inicio: element.academic_startDate.value,
    fecha_fin: element.academic_endDate.value,
  }
}

const buildLaboralObject = (element: any) => {
  return {
    nombre_empresa: element.companyName.value,
    fecha_inicio: element.laboral_startDate.value,
    fecha_fin: element.laboral_endDate.value,
    actual: element.laboral_isCurrent.checked ? 1 : 0,
    descripcion_actividades: element.laboral_activityDescription.value,
    id_rol: element.laboral_rol.value,
  }
}

const ProfileForm = ({ labels }: any) => {
  const [userType, setUserType] = useState(undefined); // User type
  const [userEmail, setUserEmail] = useState(undefined); // User email
  const [profileMetadata, setProfileMetadata] = useState(undefined); // Metadata depending on profile type
  const [profileInformation, setProfileInformation] = useState(undefined); // Profile information

  const getDataByRol = (data: any, rol?: string) => {
    // Candidate
    if (rol === UserType.candidate) {
      let personal: any = {};
      let informacionAcademica: any = [];
      let experiencia: any = [];

      // Personal info
      personal.idiomas = data.language.value ? data.language.value.split(',') : [];
      personal.habilidadesBlandas = data.softSkills.value ? data.softSkills.value.split(',') : [];
      personal.habilidadesTecnicas = data.techSkills.value ? data.techSkills.value.split(',') : [];

      // Academic info
      if (data.educative_institution_name?.length) {
        data.educative_institution_name.forEach((institution: any) => {
          if (institution?.value) {
            informacionAcademica.push(buildAcademicObject(institution));
          };
        })
      } else if (data.educative_institution_name?.value) {
        informacionAcademica = [buildAcademicObject(data)]
      }

      // Laboral info
      if (data.companyName?.length) {
        data.companyName.forEach((company: any, index: number) => {
          if (company?.value) {
            experiencia.push(buildLaboralObject(company));
          }
        })
      } else {
        if (data.companyName?.value) {
          experiencia = [buildLaboralObject(data)];
        }
      }

      return {
        edad: data.age.value,
        numero_telefono: data.phone_number.value,
        email: userEmail,
        id_pais: data.candidate_country.value,
        habilidadesBlandas: personal.habilidadesBlandas,
        habilidadesTecnicas: personal.habilidadesTecnicas,
        idiomas: personal.idiomas,
        experiencia,
        informacionAcademica,
      }
    }

    // Company
    return {
      email: userEmail,
      id_tipo_empresa: data.company_type.value,
      areasNegocio: data.business_vertical_selector.value ? data.business_vertical_selector.value.split(',') : [],
      ciudades: data.ubication_selector.value ? data.ubication_selector.value.split(',') : [],
    }
  }

  const onFormSubmit = useCallback((e: any) => {
    e.preventDefault();
    if (!userType) return;

    const bodyPayload = getDataByRol(e.target, userType);

    // Send request
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/${mapUser[userType]}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyPayload),
    });

    // TODO: Show success message
  }, [userEmail, userType]);

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
    if (!userEmail || !userType) return;
    // Get user profile data
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/${mapUser[userType]}/info/${userEmail}`)
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
          <GeneralInfoForm labels={labels} metadata={profileMetadata} profileData={profileInformation} />
        )
      }
    </form>
  )
}

export default ProfileForm;
