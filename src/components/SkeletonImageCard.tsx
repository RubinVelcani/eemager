const SkeletonImageCard = () => {
  return (
    <div className='w-full bg-gray-200 mx-auto rounded-md p-4'>
      <div className='w-full h-[300px] shrink-0 bg-gray-300 rounded-md animate-pulse'></div>
      <div className='flex flex-col gap-2 pt-4'>
        <div className='w-full h-7 bg-gray-300 rounded-md px-4 animate-pulse delay-200'></div>
        <div className='w-full h-10 flex justify-between bg-gray-300 rounded-md px-4 py-2 animate-pulse delay-200'>
          <div className='w-[65px] h-6 bg-gray-300 rounded-md animate-pulse delay-200'></div>
          <div className='w-[65px] h-6 bg-gray-300 rounded-md animate-pulse delay-200'></div>
          <div className='w-[65px] h-6 bg-gray-300 rounded-md animate-pulse delay-200'></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonImageCard