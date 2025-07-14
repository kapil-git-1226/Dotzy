import React from 'react'
import { Link } from 'react-router-dom';

const LinkCard = ({url, fetchUrls}) => {


  return (
    <div className='flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg'>
        <img src={url?.qr} alt="QR Code" className='h-32 object-contain ring ring-blue-500 self-start' />
        <Link to={`/link/${url?.id}`}>
            <span>{url.title}</span>
            <span>
              https://dotzy.vercel.app/{url?.custom_url ? url?.custom_url : url.short_url}
            </span>
        </Link>
    </div>
  )
};

export default LinkCard