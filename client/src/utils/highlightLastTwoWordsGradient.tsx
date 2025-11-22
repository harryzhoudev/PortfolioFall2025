export default function highlightLastTwoWordsGradient(text: string) {
  if (!text) return '';

  const words = text.split(' ');
  if (words.length <= 2) return text;

  const lastTwo = words.slice(-2).join(' ');
  const rest = words.slice(0, -2).join(' ');

  return (
    <>
      {rest}{' '}
      <span className='bg-linear-to-r from-amber-400 via-green-500 to-[#71C9CE] text-transparent bg-clip-text inline-block'>
        {lastTwo}
      </span>
    </>
  );
}
