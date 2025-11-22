export default function highlightLastTwoWords(text: string) {
  if (!text) return '';

  const words = text.split(' ');
  if (words.length <= 2) return text; // nothing to split

  const lastTwo = words.slice(-2).join(' ');
  const rest = words.slice(0, -2).join(' ');

  return (
    <>
      {rest} <span className='text-[#71C9CE]'>{lastTwo}</span>
    </>
  );
}
