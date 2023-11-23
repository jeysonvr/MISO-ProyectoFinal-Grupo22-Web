"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import { useAppContext } from "../../providers/AppProvider";
import { UserType } from '../../contants/userType';
import { UrlPath } from '../../contants/urlPath';
import Button, { ButtonStyle } from '../../components/button/Button';

/**
 * Home page
 * @returns JSX
 */
export const HomeContainer = ({ labels }: any) => {
  const router = useRouter();
  const appContext = useAppContext();

  const userEmail = appContext?.user?.email;
  if (typeof userEmail === 'undefined') return null;

  if (appContext?.user?.type !== UserType.anonymous) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">{labels.title_part_1}
          <span className="relative whitespace-nowrap">
            <svg aria-hidden="true" viewBox="0 0 418 42"
              className="absolute left-0 top-2/3 h-[0.58em] w-full" preserveAspectRatio="none"
              style={{ fill: '#B6E5E1' }}
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
            </svg>
            <span className="relative">{labels.title_part_2}</span>
          </span>{labels.title_part_3}
        </h1 >
        <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">{labels.label_motivation}</p>
        <div className="mt-10 flex justify-center gap-x-6"><a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900" color="slate" href={UrlPath.profile}>
          {labels.cta_edit_profile}
        </a>
          <a
            className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300" color="slate"
            href="https://www.youtube.com/watch?v=Tt08KmFfIYQ"
            target='_blank'
          >
            <svg aria-hidden="true" className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current">
              <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z"></path>
            </svg>
            <span className="ml-3">{labels.cta_watch_video}</span>
          </a>
        </div>
        <div className="mt-36 lg:mt-44">
          <p className="font-display text-base text-slate-900">{labels.label_companies_looking}</p>
          <ul className="mt-8 flex items-center justify-center gap-x-8 sm:flex-col sm:gap-x-0 sm:gap-y-10 xl:flex-row xl:gap-x-12 xl:gap-y-0">
            <li>
              <ul className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0">
                <li className="flex">
                  <img alt="picsum" width="150" src="https://picsum.photos/seed/1/150" />
                </li>
                <li className="flex">
                  <img alt="picsum" width="150" src="https://picsum.photos/seed/2/150" />
                </li>
                <li className="flex">
                  <img alt="picsum" width="150" src="https://picsum.photos/seed/3/150" />
                </li>
              </ul>
            </li>
            <li>
              <ul className="flex flex-col items-center gap-y-8 sm:flex-row sm:gap-x-12 sm:gap-y-0" >
                <li className="flex">
                  <img alt="picsum" width="150" src="https://picsum.photos/seed/4/150" />
                </li>
                <li className="flex">
                  <img alt="picsum" width="150" src="https://picsum.photos/seed/5/150" />
                </li>
                <li className="flex">
                  <img alt="picsum" width="150" src="https://picsum.photos/seed/6/150" />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div >
    )
  }

return (
  <div className="container mx-auto px-4 flex flex-col justify-center items-center h-70vh bg-b6e5e1 text-center" style={{ height: '70vh' }}>
    <h1 className="opacity-0">Home page</h1>
    <div className="py-5">
      <span className="text-center text-2xl font-bold text-teal-700">{labels.label_oportunities}</span>
      <span className="text-center text-2xl font-bold text-black">{labels.label_for_you}</span>
    </div>
    <div className="ml-2">
      <Button
        style={ButtonStyle.primary}
        text={labels.cta_login}
        onClick={() => router.push(UrlPath.login)}
      />
      <Button
        style={ButtonStyle.primary}
        text={labels.cta_signup}
        onClick={() => router.push(UrlPath.register)}
      />
    </div>
    <div className="pb-5 pt-5 ">
      <span className="text-center text-black">{labels.label_phrase_1}</span>
      <br></br>
      <span className="text-center text-black">{labels.label_phrase_2}</span>
    </div>
  </div>
);
}
