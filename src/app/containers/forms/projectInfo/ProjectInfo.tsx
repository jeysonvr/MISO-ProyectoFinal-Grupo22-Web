'use client'

import { useEffect, useState } from 'react';

import PillEditor from "../../../components/pillEditor/PillEditor";
import Button, { ButtonStyle, IconType } from '../../../components/button/Button';
import RoleProfileForm from './RoleProfile';
import { useParams } from 'next/navigation';

const ProjectInfoForm = ({ labels, metadata, projectData}: any) => {
  const [selectedStatus, setSelectedStatus] = useState(projectData?.id_estado);
  const [selectedRole, setSelectedRole] = useState(projectData?.rolesProyecto);
  
  const rolesMetadata = metadata?.roles?.map(({ id, rol }: any) => ({ id, value: rol })) || [];

  const technicalSkillsMetadata = metadata?.habilidadesTecnicas?.map(({ id, descripcion }: any) => ({ id, value: descripcion })) || [];
  const locationssoftSkillsMetadata = metadata?.habilidadesBlandas?.map(({ id, descripcion }: any) => ({ id, value: descripcion })) || [];

  const [projectMetadata, setprojectMetadata] = useState(undefined); // Metadata depending on profile type
  const [projectInformation, setprojectInformation] = useState(undefined); // Profile information
  const { locale } = useParams();
    
  const onSelectedStatus = (e: any) => {
    setSelectedStatus(e.target.value);
  }

  const onSelectedRole = (e: any) => {
    setSelectedRole(e.target.value);
  }

  useEffect(() => {
    setSelectedStatus(projectData?.id_estado);
  }, [projectData?.id_estado]);
  
  useEffect(() => {
    setSelectedRole(projectData?.rolesProyecto);
  }, [projectData?.rolesProyecto]);

  useEffect(() => {
    // Query params
    const queryParams = (locale !== 'es') ? `language=${locale}` : '';

    // Get profile metadata
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/metadata/?${queryParams}`)
        .then(res => res.json())
        .then(data => setprojectMetadata(data));
  }, [locale]);

  return (
    <div
      className="blockp-6 bg-white border border-gray-200 rounded-lg px-10 py-5 items-center" id='create_project'>
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{labels.cta_new_project}</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_name}</label>
          <input
            type="text"
            minLength={3}
            id="projectName"
            defaultValue={projectData?.nombre}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required />
        </div>
        <div>
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_status}</label>
          <select
            id="status"
            className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedStatus}
            onChange={onSelectedStatus}
          >
            <option value={1}>Activo</option>
            <option value={2}>Inactivo</option>

          </select>
        </div>
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-1">
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_description}</label>
          <textarea
            rows={2}
            minLength={3}
            id="description"
            defaultValue={projectData?.descripcion}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required />
        </div>
      </div>
      <RoleProfileForm labels={labels} metadata={projectMetadata} projectData={projectInformation} />
    </div>
  )
}

export default ProjectInfoForm;
