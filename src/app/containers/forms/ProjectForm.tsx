"use client";

const cookieCutter = require('cookie-cutter');

import { useCallback, useState, useEffect, useRef } from "react";
import '../../globals.css';
import Button, { ButtonStyle, IconType } from '../../components/button/Button';
import ProjectInfoForm from "./projectInfo/ProjectInfo";
import Grid from "../Grid/Grid"
const ProjectForm = ({ labels }: any) => {

    const [isContainerOpen, setIsContainerOpen] = useState(false);
    const [isElementVisible, setElementVisibility] = useState(true);
    const [projectMetadata, setprojectMetadata] = useState(undefined); // Metadata depending on profile type
    const [projectInformation, setprojectInformation] = useState(undefined); // Profile information
    const id_Company = useRef();
    const [projectsCompany, setProjectsCompany] = useState([]);

    const openContainer = () => {
        setIsContainerOpen(true);
        setElementVisibility(false);
    };

    const closeContainer = () => {
        setIsContainerOpen(false);
        setElementVisibility(true);
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userEmail = userData.email;
      
        fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/empresa/info/${userEmail}`)
          .then((result) => {
            return result.json();  
          })
          .then((data) => {
            id_Company.current = data.id;
          })
          .then((data) => {
            fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/empresa/proyecto/${id_Company.current}`)
            .then((result) => {
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
        let project: any = [];

        roles[0] = parseInt(data.role.value);

        project.habilidadesBlandas = data.soft_skills.value ? data.soft_skills.value.split(',') : [];
        project.habilidadesTecnicas = data.technical_skills.value ? data.technical_skills.value.split(',') : [];

    
        return {
            nombre: data.projectName.value,
            descripcion: data.description.value,
            rolesProyecto: roles,
            habilidadesBlandas: project.habilidadesBlandas.map((valor: any) => Number(valor)),
            habilidadesTecnicas: project.habilidadesTecnicas.map((valor: any) => Number(valor)),
            id_estado: parseInt(data.status.value),
            id_empresa: id_Company.current,
        }

    }

    const onFormSubmit = useCallback(async (e: any) => {
        e.preventDefault();

        const bodyPayload = getData(e.target);

        try {
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
                    alert('Proyecto creado');
                }

            })
            .catch(error => console.error('Error:', error));

        } catch (error) {
            console.error('Error:', error);
        }

    }, []);

    useEffect(() => {
        // Language
        const lang = cookieCutter.get('NEXT_LOCALE');
    
        // Query params
        const queryParams = (lang && lang !== 'es') ? `language=${lang}` : '';
    
        // Get profile metadata
        fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato/metadata/?${queryParams}`)
          .then(res => res.json())
          .then(data => setprojectMetadata(data));
    }, []);
    const headers = [
        labels.label_name, 
        labels.label_description,
        labels.label_status
      ]
    const content = projectsCompany.map((row:any, index: number)=>{
        return {
            "nombre": row.nombre,
            "descripcion":row.descripcion,
            "estado": row.id_estado === 1 ? labels.label_active : labels.label_inactive           
        }
    })
    return (
        <div className="mx-auto max-w-screen-xl p-4" id="createProject">
            <div className="absolute top-20 right-20 p-4">
                {isElementVisible && (
                    <Button
                        style={ButtonStyle.primary}
                        type={'submit'}
                        icon={IconType.save}
                        text={labels.cta_new_project}
                        onClick={openContainer}
                    />
                )}
            </div>
            {isElementVisible && (
                    <div>
                        <Grid labels={labels} headers={headers} content={content} />
                    </div>
                )}
            <form onSubmit={onFormSubmit}>
                {isContainerOpen && (
                    <div>
                        <Container onClose={closeContainer}>
                            <ProjectInfoForm labels={labels} metadata={projectMetadata} projectData={projectInformation} />
                        </Container>
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
                    </div>
                )}
            </form>
        </div>
    );
    
    function Container({ onClose, children }: any) {
        return (
            <div className="mx-auto max-w-screen-xl p-4">
                {children}
                <br></br>
            </div>
        );
    }

}

export default ProjectForm;
