function home() {
  return (
    <div className='flex flex-col justify-center items-start h-[calc(100lvh-5rem)] px-20 gap-3 max-w-6xl mx-auto'>
      <p className='font-mono'>👋 Hey there!</p>
      <p className='font-dm font-semibold text-4xl'>
        I'm Harry and I like Building
        <span className='text-[#71C9CE]'> BEAUTFIUL WEBSITES</span>
      </p>
      <p className='font-dm text-lg'>
        I'm a software developer specializing in improving&nbsp;
        <span className='bg-linear-to-r from-amber-400 via-green-500 to-[#71C9CE] inline-block text-transparent bg-clip-text'>
          user experience.
        </span>
      </p>
    </div>
  );
}

export default home;
