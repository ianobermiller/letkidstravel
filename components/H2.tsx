import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function H2({ children }: Props) {
  return <h2 className='my-1 font-display text-3xl'>{children}</h2>;
}
