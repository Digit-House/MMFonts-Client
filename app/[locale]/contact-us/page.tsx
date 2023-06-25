'use client';

import { CheckCircleIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { FramerMotionWrapper } from '@components/index';

const ContactUs = () => {
  const [isCopied, setCopied] = useState<boolean>(false);
  const t = useTranslations('Index');

  const copyToClipboard = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      },
      (err) => {
        console.log('failed to copy', err.mesage);
      }
    );
  };

  return (
    <FramerMotionWrapper>
      <div className="flex flex-col items-center justify-center flex-1 text-left md:text-center">
        <div className="w-full mt-10 mb-10 md:w-3/4">
          <p className="mb-3 text-xl font-semibold">{t('purpose')}</p>
          <p className="mb-8 text-base">{t('purpose-paragraph')}</p>
          <p className="mb-3 text-xl font-medium">{t('copyright')}</p>
          <p className="mb-8 text-base">{t('copyright-paragraph')}</p>
          <p className="mb-3 text-xl font-medium">{t('support-us')}</p>
          <p className="text-base">{t('support-us-paragraph')}</p>
        </div>
        <div className="flex flex-col w-full md:w-2/5 lg:w-2/6 ">
          <p className="mb-3 text-xl font-medium">{t('contact-us')}</p>
          <div className="flex md:items-center md:justify-center">
            <div className="flex flex-row w-48 h-10 ">
              <a href="mailto:mmfontshub@gmail.com" className="flex items-center mr-3 text-base ">
                <p>mmfontshub@gmail.com</p>
              </a>
              <span
                onClick={() => copyToClipboard('mmfontshub@gmail.com')}
                className="flex flex-row transition-all duration-1000"
              >
                {!isCopied ? (
                  <DocumentDuplicateIcon className="w-6 hover:text-darkblue hover:animate-shake hover:w-7" />
                ) : (
                  <CheckCircleIcon className="transition-all w-7 text-secondary duration-3000" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </FramerMotionWrapper>
  );
};

export default ContactUs;
