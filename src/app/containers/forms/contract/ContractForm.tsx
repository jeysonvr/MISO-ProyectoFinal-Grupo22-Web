'use client'

import { useCallback, useEffect, useState } from 'react';
import Button, { ButtonStyle, IconType } from '../../../components/button/Button';
import toast from 'react-hot-toast';
interface IProyecto {
  rolesProyecto: any;
}
const ContractForm = ({ labels }: any) => {
  const [candidatoSeleccionado, setCandidatoSeleccionado] = useState('');
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState('');
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [listCandidatos, setListCandidatos] = useState([]);
  const [listEmpresas, setListEmpresas] = useState([]);
  const [listProyectos, setListProyectos] = useState([]);
  const [listRoles, setListRoles] = useState([]);

  useEffect(() => {
    // Get profile metadata
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/candidato`)
      .then(res => res.json())
      .then(data => setListCandidatos(data));

    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/empresa`)
      .then(res => res.json())
      .then(data => {
        setListEmpresas(data)
        setEmpresaSeleccionada(data[0].id)
      });
  }, []);

  const onFormSubmit = useCallback((e: any) => {
    e.preventDefault();
    const toastWait = toast.loading(labels.alert_please_wait);
    const body = {
      idUsuarioEmpleado: candidatoSeleccionado,
      idUsuarioEmpresa: empresaSeleccionada,
      idProyecto: proyectoSeleccionado,
      idRol: rolSeleccionado
    };
    // Send request
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/empresa/contrato`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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
  }, [
    candidatoSeleccionado, rolSeleccionado, proyectoSeleccionado, empresaSeleccionada,
    labels.alert_please_wait, labels.alert_try_again, labels.alert_update_success,
  ]);

  const handleCancel = useCallback(() => {
    window.location.reload();
  }, []);

  const onSelectedCandidateChange = (e: any) => {
    setCandidatoSeleccionado(e.target.value);
  }

  const onSelectedEmpresaChange = (e: any) => {
    setEmpresaSeleccionada(e.target.value);

    // llamar proyectos de la empresa
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/empresa/proyecto/${e.target.value}`)
      .then(res => res.json())
      .then(data => setListProyectos(data));

  }
  const getRoles = (proyecto: IProyecto) => {
    setListRoles(proyecto?.rolesProyecto)
  }
  const onSelectedProyectoChange = (e: any) => {
    setProyectoSeleccionado(e.target.value);

    const proyecto = listProyectos?.find(({ id }) => id == e.target.value);
    if (proyecto) getRoles(proyecto)
  }

  const onSelectedRolChange = (e: any) => {
    setRolSeleccionado(e.target.value);

  }

  return (
    <form onSubmit={onFormSubmit} className={"self-center w-5/6"}>
      <div
        className="blockp-6 bg-white border border-gray-200 rounded-lg px-10 py-5 cl-7 ">
        <div className="grid gap-6 mb-6">
          <div>
            <label htmlFor="candidate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_candidate}</label>
            <select
              id="candidate"
              className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={candidatoSeleccionado}
              onChange={onSelectedCandidateChange}
            >
              <option selected>{labels.label_candidate}</option>
              {
                listCandidatos.map((candidato: any, index: number) => (
                  <option key={candidato.id} value={candidato.usuario.id}>
                    {`${candidato.usuario.nombre_completo} - ${candidato.usuario.email}`}
                  </option>
                ))
              }
            </select>
          </div>

          <div>
            <label htmlFor="empresa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_company}</label>
            <select
              id="empresa"
              className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={onSelectedEmpresaChange}
            >
              <option selected>{labels.label_company}</option>
              {
                listEmpresas.map((empresa: any, index: number) => (
                  <option
                    key={empresa.id} value={empresa.id}>
                    {`${empresa.usuario.nombre_completo}`}
                  </option>
                ))
              }
            </select>
          </div>
          <div>
            <label htmlFor="proyectos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_project}</label>
            <select
              id="proyecto"
              className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={proyectoSeleccionado}
              onChange={onSelectedProyectoChange}
            >
              <option selected>{labels.label_project}</option>
              {
                listProyectos.map((proyecto: any, index: number) => (
                  <option
                    key={proyecto.id} value={proyecto.id}>
                    {`${proyecto.nombre}`}
                  </option>
                ))
              }
            </select>
          </div>
          <div>
            <label htmlFor="roles" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labels.label_rol}</label>
            <select
              id="rol"
              className="mb-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={rolSeleccionado}
              onChange={onSelectedRolChange}
            >
              <option selected>{labels.label_rol}</option>
              {
                listRoles.map((rol: any, index: number) => (
                  <option
                    key={rol.id} value={rol.id}>
                    {`${rol.rol}`}
                  </option>
                ))
              }
            </select>
          </div>
        </div>


      </div>
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
    </form>
  )
}

export default ContractForm;
