import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <main className="grid min-h-full place-items-center ">
      <div className="text-center">
        <Image src="/images/404.png" alt="404 not found" width={300} height={300} sizes="100vw" />
        <h1 className="mt-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="flex items-center justify-center mt-10 gap-x-6">
          <Link href={'/'} className="rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm">
            Go back home
          </Link>
          <a href="mailto: mmfontshub@gmail.com" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
