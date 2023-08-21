export function MainHeader() {
  return (
    <div className='relative mx-3 mb-4 max-w-5xl gap-2 lg:mx-auto'>
      <img
        className='my-2 h-96 w-full rounded-2xl object-cover'
        src='/images/hero.webp'
      />
      <div className='balanced absolute bottom-0 m-2 rounded-xl bg-white/80 p-2 text-center'>
        <span className='mr-1 inline-block'>👋</span>Hi, we’re Olivia and Ian.
        We travel with our four children enjoying architecture, nature, baked
        goods, coffee, chocolate and most importantly living for Jesus.
      </div>
    </div>
  );
}
