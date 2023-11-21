'use client'

import { useCallback, useState } from 'react';

import PillEditor from "../../../components/pillEditor/PillEditor";
import Button, { ButtonStyle, IconType } from '../../../components/button/Button';

interface IRolesProfile {
    Rol: {
      rol: string;
    },
    TechSkills: {
      techSkill: string[];
    },
    SoftSkills:{
      softSkill: string[];
    }
}
  
  const EMPTY_REGISTER = {
    Rol: {
      rol: '',
    },
    TechSkills: {
      techSkill: [],
    },
    SoftSkills: {
      softSkill: [],
    }
}

const RoleProfileForm = ({ labels, metadata, projectData}: any) => {
    
    const [rolesProfile, setRolesProfile] = useState<IRolesProfile[]>(projectData?.rolesProyecto || [EMPTY_REGISTER]);
  
    const rolesMetadata = metadata?.roles?.map(({ id, rol }: any) => ({ id, value: rol })) || [];

    const technicalSkillsMetadata = metadata?.habilidadesTecnicas?.map(({ id, descripcion }: any) => ({ id, value: descripcion })) || [];
    const locationssoftSkillsMetadata = metadata?.habilidadesBlandas?.map(({ id, descripcion }: any) => ({ id, value: descripcion })) || [];

    const handleAddRegister = useCallback(() => {
        setRolesProfile((rolesProfile) => [...rolesProfile, EMPTY_REGISTER])
    }, []);

    const handleRemoveRegister = useCallback(() => {
        setRolesProfile((rolesProfile) => {
        if (rolesProfile.length <= 1) return [...rolesProfile];

        return [...rolesProfile.slice(0, rolesProfile.length - 1)];
        });
    }, []);

    return (
        <div
        className="blockp-6 bg-white border border-gray-200 rounded-lg px-10 py-5 items-center">      
        {
        rolesProfile.map((roles, idx) => (
            <><div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_role}</label>
                    <select
                        id="role"
                        className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        {rolesMetadata.map(({ id, value }: any) => (
                            <option
                            value={id} key={'rol-' + id}
                            defaultChecked={roles?.Rol?.rol === value}
                          >{value}</option>
                        ))}
                    </select>
                </div>
            </div><div className='mb-6'>
                    <PillEditor
                        title={labels.label_technical_skills}
                        ctaLabel={labels.cta_add}
                        id={'technical_skills'}
                        elements={technicalSkillsMetadata}
                        selectedPills={projectData?.habilidadesTecnicas?.map(({ id, descripcion }: any) => ({
                            pillValue: id,
                            pillText: descripcion,
                            }))}
                    />
                </div><div className='mb-10'>
                    <PillEditor
                        title={labels.label_soft_skills}
                        ctaLabel={labels.cta_add}
                        id={'soft_skills'}
                        elements={locationssoftSkillsMetadata}
                        selectedPills={projectData?.habilidadesBlandas?.map(({ id, descripcion }: any) => ({
                            pillValue: id,
                            pillText: descripcion,
                            }))}
                    />
                </div></>
            ))
        }
            <div className='text-right'>
            <Button
            style={ButtonStyle.primary}
            type={'button'}
            icon={IconType.trash}
            text={labels.cta_remove}
            onClick={handleRemoveRegister}
            />
            <Button
            style={ButtonStyle.primary}
            type={'button'}
            icon={IconType.plus}
            text={labels.cta_add}
            onClick={handleAddRegister}
            />
            </div>
        </div>
    )
}

export default RoleProfileForm;
