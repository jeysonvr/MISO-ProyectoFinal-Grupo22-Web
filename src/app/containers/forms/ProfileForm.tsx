/* istanbul ignore file */
"use client";

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import toast from 'react-hot-toast';

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
  const { locale } = useParams();
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
      if (data?.educative_institution_name?.length) {
        data.educative_institution_name.forEach((institution: any, index: number) => {
          if (!institution?.value) return;
          informacionAcademica.push({
            institucion: institution.value,
            titulo: data.academic_title[index].value,
            en_curso: data.academic_inProgress[index].checked ? 1 : 0,
            fecha_inicio: data.academic_startDate[index].value,
            fecha_fin: data.academic_endDate[index].value,
          })
        })
      } else if (data?.educative_institution_name?.value) {
        informacionAcademica = [
          {
            institucion: data.educative_institution_name.value,
            titulo: data.degree.value,
            en_curso: data.isInProgress.checked ? 1 : 0,
            fecha_inicio: data.startDate.value,
            fecha_fin: data.endDate.value,
          }
        ]
      }

      // Laboral info
      if (data?.companyName?.length) {
        data.companyName.forEach((company: any, index: number) => {
          if (!company?.value) return;
          experiencia.push({
            nombre_empresa: company.value,
            fecha_inicio: data.laboral_startDate[index].value,
            fecha_fin: data.laboral_endDate[index].value,
            actual: data.laboral_isCurrent[index].checked ? 1 : 0,
            descripcion_actividades: data.laboral_activityDescription[index].value,
            id_rol: data.laboral_rol[index].value,
          })
        })
      } else if (data?.companyName?.value) {
        experiencia = [
          {
            nombre_empresa: data.companyName.value,
            fecha_inicio: data.laboral_startDate.value,
            fecha_fin: data.laboral_endDate.value,
            actual: data.laboral_isCurrent.checked ? 1 : 0,
            descripcion_actividades: data.laboral_activityDescription.value,
            id_rol: data.laboral_rol.value,
          }
        ]
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

    const toastWait = toast.loading(labels.alert_please_wait);
    // Send request
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/${mapUser[userType]}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyPayload),
    })
      .then(resp => {
        if (resp.status !== 200) {
          return Promise.reject();
        }
        toast.dismiss(toastWait);
        toast.success(labels.alert_update_success, {
          icon: '💾',
        });
      })
      .catch(() => {
        toast.dismiss(toastWait);
        toast.error(labels.alert_try_again);
      });

    //creacion de la evaluacion básica

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

    // Query params
    const queryParams = (locale !== 'es') ? `language=${locale}` : '';

    // Get profile metadata
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/${mapUser[userType]}/metadata/?${queryParams}`)
      .then(res => res.json())
      .then(data => setProfileMetadata(data));
  }, [userType, locale]);

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
