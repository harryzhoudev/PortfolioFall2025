function about() {
  return (
    <div className='flex flex-col justify-center items-center p-20 gap-8 max-w-6xl mx-auto min-h-[calc(100vh-5rem)]'>
      <div className='flex gap-8 md:flex-row flex-col justify-center items-center'>
        <div className='flex md:flex-1 flex-col gap-4 order-1 md:order-2'>
          <h1 className='font-bold font-dm text-4xl text-[#71C9CE]'>
            WHO I AM
          </h1>
          <p className='text-justify font-dm font-semibold text-gray-500'>
            My love for web development started back when I would go to the
            library to play Flash games on Mofunzone after school. From there, I
            developed a passion for technology and software. Years later, I
            enrolled into Centennial College for software striving to build
            websites and applications that solves real world challenges.
          </p>
          <p className='text-justify font-dm font-semibold text-gray-500'>
            When I'm not at my computer coding, you can find me hiking, gaming,
            or trying new foods! I'm never sitting still, unless i'm coding!
          </p>
        </div>
        <div className='border-[#A6E3E9] border-8 overflow-hidden rounded-full max-w-64 max-h-64 order-2 md:order-1 shadow-md shadow-gray-400'>
          <img
            className='w-full h-full object-cover'
            src='../src/assets/selfie.jpg'
            alt='profile picture'
          />
        </div>
      </div>
      <button
        onClick={() => {
          const link = document.createElement('a');
          link.href = '/resume.pdf';
          link.download = 'HarryZhouResume.pdf'; // file name when downloaded
          link.click();
        }}
        className='border-3 border-[#A6E3E9] rounded-4xl text-gray-500 px-5 py-1 hover:bg-[#71C9CE] hover:border-[#71C9CE] hover:text-[#E3FDFD] bg-[#A6E3E9] transition-all duration-300 font-dm font-bold hover:cursor-pointer shadow-xs shadow-gray-300'
      >
        My Resume
      </button>
    </div>
  );
}

export default about;
