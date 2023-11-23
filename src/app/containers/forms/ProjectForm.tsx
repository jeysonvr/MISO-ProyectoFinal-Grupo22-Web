"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { useParams } from 'next/navigation';

import toast from 'react-hot-toast';

import '../../globals.css';
import Button, { ButtonStyle, IconType } from '../../components/button/Button';
import ProjectInfoForm from "./projectInfo/ProjectInfo";
import Grid from "../Grid/Grid"
const ProjectForm = ({ labels }: any) => {
    const { locale } = useParams();

    const [isContainerOpen, setIsContainerOpen] = useState(false);
    const [projectMetadata, setprojectMetadata] = useState(undefined); // Metadata depending on profile type
    const [projectInformation, setprojectInformation] = useState(undefined); // Profile information
    const id_Company = useRef();
    const [projectsCompany, setProjectsCompany] = useState([]);

    const openContainer = () => {
        setIsContainerOpen(true);
    };

    const closeContainer = () => {
        setIsContainerOpen(false);
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user') ?? '{}');
        const userEmail = userData.email;

        fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/empresa/info/${userEmail}`)
            .then(result => result.json())
            .then(data => {
                id_Company.current = data.id;
                fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/empresa/proyecto/${data.id}`)
                    .then((result) => {
                        if (result.status !== 200) {
                            Promise.reject();
                            return;
                        }
                        return result.json();
                    })
                    .then((data) => {
                        setProjectsCompany(data)
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, []);

    const getData = (data: any) => {
        let roles: any = [];
        let profile: any = [];

        const rolesProfile = document.querySelectorAll('#role');

        // Roles profile
        if (rolesProfile.length > 1) {
            data.role.forEach((rol: any, index: number) => {
                if (!rol?.value) return;
                profile.habilidadesBlandas = data.soft_skills[index].value ? data.soft_skills[index].value.split(',') : [];
                profile.habilidadesTecnicas = data.technical_skills[index].value ? data.technical_skills[index].value.split(',') : [];
                roles.push({
                    id_rol: data.role[index].value,
                    habilidadesBlandas: profile.habilidadesBlandas.map((valor: any) => Number(valor)),
                    habilidadesTecnicas: profile.habilidadesTecnicas.map((valor: any) => Number(valor)), 
                })
            })
        } else {
            profile.habilidadesBlandas = data.soft_skills.value ? data.soft_skills.value.split(',') : [];
            profile.habilidadesTecnicas = data.technical_skills.value ? data.technical_skills.value.split(',') : [];    
            roles = [
            {
                id_rol: roles[0] = parseInt(data.role.value),
                habilidadesBlandas: profile.habilidadesBlandas.map((valor: any) => Number(valor)),
                habilidadesTecnicas: profile.habilidadesTecnicas.map((valor: any) => Number(valor)), 
            }
            ]
        }

        return {
            nombre: data.projectName.value,
            descripcion: data.description.value,
            rolesProyecto: roles,
            id_estado: parseInt(data.status.value),
            id_empresa: id_Company.current,
        }
    }

    const onFormSubmit = useCallback(async (e: any) => {
        e.preventDefault();

        const bodyPayload = getData(e.target);

        const toastWait = toast.loading(labels.alert_please_wait);
        await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/empresa/proyecto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyPayload),
        })
            .then(resp => {
                // Success - created
                if (resp.status === 201) {
                    toast.dismiss(toastWait);
                    toast.success(labels.alert_successfully_created);
                    return;
                }

                return Promise.reject();
            })
            .catch(() => {
                toast.dismiss(toastWait);
                toast.error(labels.alert_try_again);
            });
    }, [labels.alert_please_wait, labels.alert_successfully_created, labels.alert_try_again]);

    useEffect(() => {
        // Query params
        const queryParams = (locale !== 'es') ? `language=${locale}` : '';

        // Get profile metadata
        fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/metadata/?${queryParams}`)
            .then(res => res.json())
            .then(data => setprojectMetadata(data));
    }, [locale]);

    const headers = [
        labels.label_name,
        labels.label_description,
        labels.label_status
      ]

    const content = ()=>{
        if(projectsCompany.length > 0){
            return projectsCompany?.map((row:any, index: number)=>{
                return {
                    "nombre": row.nombre,
                    "descripcion":row.descripcion,
                    "estado": row.id_estado === 1 ? labels.label_active : labels.label_inactive           
                }
            })
        }
        return []
    }
    return (
        <div className="mx-auto max-w-screen-xl p-4" id="createProject">
            {
                isContainerOpen ? (
                    <form onSubmit={onFormSubmit}>
                        <ProjectInfoForm labels={labels} metadata={projectMetadata} projectData={projectInformation} />
                        <div className='text-right'>
                            <Button
                                style={ButtonStyle.secondary}
                                type={'button'}
                                text={labels.cta_cancel}
                                onClick={closeContainer}
                            />
                            <Button
                                style={ButtonStyle.primary}
                                type={'submit'}
                                icon={IconType.save}
                                text={labels.cta_save}
                            />
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="absolute top-20 right-20 p-4">
                            <Button
                                style={ButtonStyle.primary}
                                icon={IconType.save}
                                text={labels.cta_new_project}
                                onClick={openContainer}
                            />
                        </div>
                        <div>
                            <Grid labels={labels} headers={headers} content={content()} />
                        </div>
                    </>
                )
            }
        </div>
    );
}

export default ProjectForm;
