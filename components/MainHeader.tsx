export function MainHeader() {
  return (
    <section className='relative gap-2 border-b lg:mx-auto'>
      <img className='h-96 w-full  object-cover' src='/images/hero.webp' />
      <div className='balanced absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2 pt-10 text-center text-white'>
        <span className='mr-1 inline-block'>👋</span>Hi, we’re Olivia and Ian.
        We travel with our four children enjoying architecture, nature, baked
        goods, coffee, chocolate and most importantly living for Jesus.
      </div>
    </section>
  );
}
