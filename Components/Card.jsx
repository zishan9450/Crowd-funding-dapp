// import React from 'react'

// const Card = ({ allcampaign, setOpenModel, setDonate, title }) => {
//   console.log(allcampaign);

//   const daysLeft = (deadline) => {
//     const difference = new Date(deadline).getTime() - Date.now();
//     const remainingDays = difference / (1000 * 3600 * 24);
//     return remainingDays.toFixed(0);
//   }
//   return (
//     <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
//       <p className='py-16 text-2xl font-bold leading-5'>{title}</p>
//       <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
//         {allcampaign?.map((campaign, i) => (
//           <div 
//             onClick={() => (setDonate(campaign), setOpenModel(true))}
//             key={i+1}
//             className='cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded'
//           >
//             <img
//               src="https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
//               className='object-cover w-full h-64 rounded'
//               alt=''
//             />
//             <div className='py-5 pl-2'>
//               <p className='mb-2 text-xs font-semibold text-gray-600 uppercase'>
//                 Days Left: {daysLeft(campaign.deadline)}
//               </p>
//               <a
//                 href='/'
//                 aria-label='Article'
//                 className='inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700'
//               >
//                 <p className='text-2xl font-bold leading-5'>{campaign.title}</p>
//               </a>
//               <p className='mb-4 text-gray-700'>{campaign.description}</p>
//               <div className='flex space-x-4'>
//                 <p className='font-semibold'> Target: {campaign.target} ETH</p>

//                 <p className='font-semibold'> Raised: {campaign.amountCollected} ETH</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Card

import React, { useContext } from 'react';
import { CrowdFundingContext } from '../Context/CrowdFunding'; // Adjust the path as necessary

const Card = ({ allcampaign, setOpenModel, setDonate, title }) => {
  const { deleteCampaign, currentAccount } = useContext(CrowdFundingContext); // Include currentAccount here

  const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    return remainingDays.toFixed(0);
  };

  // const handleDelete = async (campaignId) => {
  //   if (window.confirm('Are you sure you want to delete this campaign?')) {
  //     await deleteCampaign(campaignId);
  //     window.location.reload();  // Optionally reload or update state to reflect changes
  //   }
  // };

  const handleDelete = async (campaignId) => {
    try {
      if (window.confirm('Are you sure you want to delete this campaign?')) {
        await deleteCampaign(campaignId);
        window.location.reload();  // Optionally reload or update state to reflect changes
      }
    } catch (error) {
        console.error("Failed to delete campaign:", error);
    }
};

  return (
    <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
      <p className='py-16 text-2xl font-bold leading-5'>{title}</p>
      <div className='grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full'>
        {allcampaign?.map((campaign, i) => (
          <div 
            onClick={() => (setDonate(campaign), setOpenModel(true))}
            key={i + 1} 
            className='cursor-pointer border overflow-hidden transition-shadow duration-300 bg-white rounded'>
            <img
              src="https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260"
              className='object-cover w-full h-64 rounded'
              alt=''
            />
            <div className='py-5 pl-2'>
              <p className='mb-2 text-xs font-semibold text-gray-600 uppercase'>
                Days Left: {daysLeft(campaign.deadline)}
              </p>
              <p className='text-2xl font-bold leading-5'>{campaign.title}</p>
              <p className='mb-4 text-gray-700'>{campaign.description}</p>
              <div className='flex space-x-4'>
                <p className='font-semibold'>Target: {campaign.target} ETH</p>
                <p className='font-semibold'>Raised: {campaign.amountCollected} ETH</p>
              </div>
              {campaign.owner.toLowerCase() === currentAccount.toLowerCase() && (
                <button
                  onClick={() => handleDelete(campaign.pId)}
                  className="mt-4 bg-red-500 text-white p-2 rounded"
                >
                  Delete Campaign
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;

