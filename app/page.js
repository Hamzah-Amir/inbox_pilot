import Image from "next/image";

export default function Home() {
  return (
    <>
      <main>
        <section className="hero p-10">
          <div className="  border-2 bg-linear-to-l from-[#6f3dda]  via-[#6c49e9]  to-[#4a1883]  border-purple-700 w-44 h-12 flex items-center rounded-4xl">
            <p className="mx-auto bg-clip-text ">Powered by GPT-4</p>
          </div>
        </section>
      </main>
    </>
  );
}
