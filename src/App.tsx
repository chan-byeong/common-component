import './app.css';
import { Button } from './components/ui/button';
import { buttonOverrides } from './app.css.ts';
import { ComplexButton } from './components/templates/complex-button';
import { BasicExample } from './components/templates/modal-example';

import { useRef } from 'react';
function App() {
  const parentRef = useRef<HTMLButtonElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ color: 'black' }}>Button Components</h1>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <Button onClick={() => parentRef.current?.click()}>
              Parent Button
            </Button>
            <Button onClick={() => buttonRef.current?.click()}>
              Button Ref
            </Button>
            <Button asChild ref={parentRef}>
              <ComplexButton
                ref={buttonRef}
                variant='default'
                size='lg'
                onAction={(e) => console.log('Action!', e)}
                onHover={(e) => console.log('Hovered!', e)}
                aria-label='복잡한 버튼'
                aria-describedby='button-description'
                styleOverride={{ marginTop: '10px' }}
                isLoading={false}
                iconPosition='left'
              >
                클릭하세요
              </ComplexButton>
            </Button>
          </div>

          <Button
            onClick={() => console.log('clicked')}
            className={buttonOverrides}
            variant='default'
            size='default'
            aria-label='Default Button'
          >
            Default
          </Button>

          <Button variant='outline' size='default'>
            Outline
          </Button>
          <Button variant='ghost' size='default' tabIndex={-1}>
            <a href='https://www.google.com' target='_blank' tabIndex={-1}>
              Google
            </a>
          </Button>
          <Button variant='destructive' size='default'>
            Destructive
          </Button>
          <Button variant='secondary' size='default'>
            Secondary
          </Button>
          <Button variant='link' size='default'>
            Link
          </Button>
          <Button size='icon'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-plus'
            >
              <path d='M5 12h14'></path>
              <path d='M12 5v14'></path>
            </svg>
          </Button>
          <Button size='icon-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-plus'
            >
              <path d='M5 12h14'></path>
              <path d='M12 5v14'></path>
            </svg>
          </Button>
          <Button size='icon-lg'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-plus'
            >
              <path d='M5 12h14'></path>
              <path d='M12 5v14'></path>
            </svg>
          </Button>

          <Button asChild>
            <a href='https://www.google.com' target='_blank'>
              Google
            </a>
          </Button>
        </div>
        <div>
          <BasicExample />
        </div>
      </div>
    </>
  );
}

export default App;
