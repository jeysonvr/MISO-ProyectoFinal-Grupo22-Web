import React from 'react';

import { ICardResult } from '../ISearchResult';
import Button, { ButtonStyle } from '../../button/Button';

const ResultCard = ({ usuario, country, idiomas, ctaLabel, habilidadesTecnicas }: ICardResult) => {
  const techSkills = habilidadesTecnicas?.map((skill: any) => idiomas === 'en' ? skill?.descripcion_en : skill?.descripcion) || [];

  const userNameArray = usuario.nombre_completo.split(' ');
  const nameInitials = userNameArray?.[0]?.[0] + (userNameArray?.[1]?.[0] || '');

  return (
    <div className="flex items-center space-x-4 p-2 m-2 border border-gray-50 max-w-4xl">
      <div className="flex-shrink-0">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
          <span className="font-medium text-gray-600 uppercase">{nameInitials}</span>
        </div>
      </div>
      <div className="flex-1 min-w-0 pl-5"
        style={{ width: '800px' }}
      >
        <p className="text-sm text-gray-900 truncate font-semibold">
          {usuario.nombre_completo}
        </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          {
            <>
              <p>{country} {idiomas?.length ? ` | ${idiomas.map((idioma: any) => idioma.idioma)?.join(',')}` : ''}</p>
              <ul
                className="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row"
                id="pills-tab"
                role="list"
                data-te-nav-ref>
                {
                  techSkills.map((skill: string, id: number) => (
                    <li key={id}>
                      <p
                        className="my-2 rounded bg-neutral-100 p-2 font-light uppercase leading-tight text-neutral-600 md:mr-2"
                        style={{ fontSize: '10px' }}
                      >{skill}</p>
                    </li>
                  ))
                }
              </ul>
            </>
          }
        </p>
      </div>
      <Button
        style={ButtonStyle.primary}
        text={ctaLabel || ''}
      />
    </div>
  )
}

export default ResultCard;
