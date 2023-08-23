'use client';
import va from '@vercel/analytics';
import JSZip from 'jszip';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { classNames } from '@core/classnames';
import { fbEvent } from '@core/fpixel';

type DetailNavMenuType = {
  fontNameMM: string;
  createdBy: string;
  fileName: string;
  fontNameEn: string;
  creatorLink?: string;
  downloadLink?: string;
};

const DetailNavMenu = ({
  fontNameMM,
  fileName,
  createdBy,
  fontNameEn,
  creatorLink,
  downloadLink,
}: DetailNavMenuType) => {
  const [isHide, setIsHide] = useState<boolean>(true);
  const t = useTranslations('Index');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const pathname = usePathname();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleButtonClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const showModal = () => {
    setIsHide((prev) => !prev);
  };

  const handleDownload = async (name: string) => {
    va.track('download-font', { fontName: name });
    console.log(name);
    setIsDisabled(true);
    if (downloadLink) {
      window.open(downloadLink, '_blank');
      return;
    }
    try {
      const response = await fetch(`/api/fonts?name=${name}`);
      const data = await response.json();
      const zip = new JSZip();
      const folder: any = zip.folder('fonts');

      // Define the font files to include in the zip
      const fontFiles = data;

      // Add font files to the zip
      await Promise.all(
        fontFiles.map(async (file: any) => {
          const res: any = await fetch(file.url);
          const blob = await res.blob();
          folder.file(file.name, blob);
        })
      );

      // Generate the zip file
      setTimeout(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          // Create a temporary link and trigger the download
          const link = document.createElement('a');
          link.href = URL.createObjectURL(content);
          link.download = name;
          link.click();
        });
        setIsDisabled(false);
      }, 1000);
    } catch (error) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    fbEvent('download-font', { fontName: name });
  };

  return (
    <div className="text-lg ">
      <div className="flex flex-row justify-between ">
        <div className="flex flex-col items-left">
          <p className="mb-1 mr-5 font-medium">{pathname?.includes('/en/') ? fontNameEn : fontNameMM}</p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(creatorLink && 'hover:underline hover:animate-shake', 'text-sm ')}
            href={creatorLink ? creatorLink : 'https://www.facebook.com/profile.php?id=100093490448936'}
          >
            {createdBy === undefined ? t('create-by') : createdBy}
          </a>
        </div>
        <div className="flex flex-row items-center">
          {/* <p className="hidden mr-5 md:flex">{t('terms-and-conditions')}</p> */}
          <div className="relative">
            <button
              disabled={isDisabled}
              onClick={() => {
                handleDownload(fileName);
              }}
              className="p-4 px-3 py-2 mr-4 border-2 border-black rounded-md cursor-pointer bg-secondary text-darkblue"
            >
              {isDisabled && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-2 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#292D53"
                  ></path>
                </svg>
              )}
              {t('download')}
            </button>
            {showAlert && (
              <div className="absolute p-2 leading-normal border-2 rounded right-3 bg-primary dark:bg-lightblue min-w-max">
                <p>Download ရယူရန်မရသေးပါ။ အဆင်မပြေမှုအတွက်တောင်းပန်ပါတယ်။</p>
              </div>
            )}
          </div>
          {/* <div className="relative">
            <EllipsisHorizontalIcon className="w-10 h-10 text-secondary" onClick={showModal} />
            {!isHide && (
              <div className="absolute p-2 leading-normal border-2 rounded bg-primary dark:bg-lightblue min-w-max">
                <div className="flex flex-row justify-between mb-2 ">
                  <p>အစီရင်ခံရန်</p>
                  <XMarkIcon className="w-6" onClick={showModal} />
                </div>
                <p>ဒီဖောင့်ကိုသင်ပိုင်ပါသည်</p>
                <p>ဖောင့်ကိုဝက်ဆိုဒ်မှဖျက်ပါမည်</p>
                <p>ဒီဖောင့်ကိုအခကြေးငွေပေးဆောင်ရပါမည်</p>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DetailNavMenu;
