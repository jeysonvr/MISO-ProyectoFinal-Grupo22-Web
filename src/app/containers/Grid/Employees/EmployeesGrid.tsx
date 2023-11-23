"use client";

import React, { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { useParams } from 'next/navigation';

import toast from 'react-hot-toast';

import '../../../../app/globals.css';
import Button, { ButtonStyle, IconType } from '../../../components/button/Button';
import EmployeeEvaluationForm from "../../forms/employeeEvaluation/EmployeeEvaluation";

const EmployeesForm = ({ labels }: any) => {
    const { locale } = useParams();

    const [employeesCompany, setEmployeesCompany] = useState([]);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [isContainerOpen, setIsContainerOpen] = useState(false);
    const [idContract, setIdContract] = useState(null);
    const id_contract = useRef();

    const handleRowClick = (index: number) => {
        setSelectedRow(index === selectedRow ? null : index);
        setIsContainerOpen(true);
    };

    const closeContainer = () => {
        setIsContainerOpen(false);
    };
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const userEmail = userData.email;

        fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/empresa/info/${userEmail}`)
            .then(result => result.json())
            .then(data => {
                fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/empresa/contrato/3/${data.usuario.id}`)
                    .then((result) => {
                        if (result.status !== 200) {
                            Promise.reject();
                            return;
                        }
                        return result.json();
                    })
                    .then((data) => {
                        setEmployeesCompany(data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, []);

    const handleIdContractChange = (newIdContract: any) => {
        setIdContract(newIdContract);
        id_contract.current = newIdContract;
    };

    const headers = [
        labels.label_name,
        labels.label_start_date,
        labels.label_end_date,
        labels.label_status,
        labels.label_evaluation
    ];

    const content = employeesCompany?.map(({ id, empleado, fecha_inicio, fecha_fin, activo, evaluacion_desempeño }: any) => {
        return {
            id,
            empleado,
            fecha_inicio,
            fecha_fin,
            estado: activo ? labels.label_active : labels.label_inactive,
            evaluacion_desempeño: evaluacion_desempeño
        }
    });

    const getData = (data: any) => {
        return {
            id_contrato: id_contract.current,
            descripcion: data.description.value,
        };
    }

    const onFormSubmit = useCallback(async (e: any) => {
        e.preventDefault();

        const bodyPayload = getData(e.target);
        console.log('bodyPayload');
        console.log(bodyPayload);

        const toastWait = toast.loading(labels.alert_please_wait);
        await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/evaluacion/desempeno`, {
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
                    closeContainer();
                    return;
                }

                return Promise.reject();
            })
            .catch(() => {
                toast.dismiss(toastWait);
                toast.error(labels.alert_try_again);
            });
    }, []);


    return (
        <Suspense fallback={<p>{labels.label_loading}</p>}>
            {
                (!content || content.length === 0)
                    ? (
                        <p>{labels.label_no_content}</p>
                    ) : (
                        <div className="grid grid-cols-5">
                            {headers.map((header: any, index: number) => (
                                <div className='text-[#565E6C] font-light pt-5 pb-5 pl-5 pr-5 bg-[#FAFAFB]' key={index}>{header}</div>
                            ))}
                            {content.map((row: any, index: number) => (
                                <>
                                    <div className='text-[#565E6C] font-bold pt-5 pb-5 pl-5 pr-5' key={row.empleado.nombre_completo}>{row.empleado.nombre_completo}</div>
                                    <div className='text-[#565E6C] font-light pt-5 pb-5 pl-5 pr-5' key={row.fecha_inicio}>{row.fecha_inicio}</div>
                                    <div className='text-[#565E6C] font-light pt-5 pb-5 pl-5 pr-5' key={row.fecha_fin}>{row.fecha_fin}</div>
                                    {row.estado === 'Activo' ? (
                                        <div className='text-[#379AE6] font-light pt-5 pb-5 pl-5 pr-5' key={row.estado}>{row.estado}</div>
                                    ) :
                                        (
                                            <div className='text-[#DE3B40] font-light pt-5 pb-5 pl-5 pr-5' key={row.estado}>{row.estado}</div>
                                        )}
                                    {row.estado === 'Activo' ? (
                                        <div className='text-[#0EA89BFF] font-light pt-5 pb-5 pl-5 pr-5 underline cursor-pointer' key={index}
                                            onClick={() => handleRowClick(index)}>
                                            {labels.label_performance}
                                        </div>
                                    ) :
                                        (
                                            <div className='text-[#9095A0FF] font-light pt-5 pb-5 pl-5 pr-5' key={index}
                                                onClick={() => handleRowClick(index)}>{
                                                    labels.label_performance}
                                            </div>
                                        )}
                                </>
                            ))}
                        </div>
                    )
            }
            {selectedRow !== null && (
                <div className="container mx-auto p-4 min-w-full"
                    id="evaluationForm"
                    style={{
                        display: isContainerOpen ? 'flex' : 'none',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 999,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} >
                    {isContainerOpen && (
                        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '600px', width: '100%' }}>
                            <form onSubmit={onFormSubmit}>
                                <EmployeeEvaluationForm labels={labels} metadata={content[selectedRow]} onIdContractChange={handleIdContractChange} />
                                <div className='text-right'>
                                    <Button
                                        style={ButtonStyle.secondary}
                                        type={'button'}
                                        text={labels.cta_cancel}
                                        onClick={closeContainer} />
                                    <Button
                                        style={ButtonStyle.primary}
                                        type={'submit'}
                                        icon={IconType.save}
                                        text={labels.cta_save} />
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </Suspense>
    );
}

export default EmployeesForm;
