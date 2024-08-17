import Image from "next/image";

export default function Layout({ children }) {
  return (
    <main className='h-screen flex justify-center sm:items-center sm:p-5'>
      <div className="rounded-[var(--radius)] min-h-96 w-[50rem] flex flex-col p-10 max-sm:gap-y-10 sm:bg-zinc-100 sm:bg-zinc-900 max-sm:border-0">
        <Image src="/copluk.png" alt="copl.uk logo" width={100} height={100} />
        <div className="grow flex flex-col justify-center">
          {children}
        </div>
      </div>
    </main>
  );
}