import Image from 'next/image';
import React from 'react';

function Background({ children }) {
  return (
    <div>
      <section className="bg-primary">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
              width={400}
              height={400}
            />
          </aside>

          <main className="flex items-center justify-center px-md py-md sm:px-lg lg:col-span-7 lg:px-lg lg:py-lg xl:col-span-6">
            {children}
          </main>
        </div>
      </section>
    </div>
  );
}

export default Background;
