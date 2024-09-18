import Image from 'next/image';

export default function Avatar({ user, className }) {
  let backgroundColor;
  if (user.username.length % 3 === 0) {
    backgroundColor = 'bg-[#B8BB26]';
  } else if (user.username.length % 3 === 1) {
    backgroundColor = 'bg-[#458588]';
  } else {
    backgroundColor = 'bg-[#CC241D]';
  }

  return (
    <div className={`rounded-[var(--radius)] ${backgroundColor} ${className}`}>
      <Image
        src='/copluk-icon-nobg.png'
        alt='avatar'
        width={128}
        height={128}
      />
    </div>
  );
}
