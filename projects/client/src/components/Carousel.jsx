import React from 'react'
import {Carousel} from 'flowbite-react'

const CarouselComponent = () => {
  return (
    <div>
      <div className=''>
        <div className="h-56 sm:h-64 md:h-[500px] xl:h-[650px]">
          <Carousel>
            <div className='h-56 sm:h-64 md:h-[500px] xl:h-[650px] bg-cover bg-center' style={{backgroundImage:'url(https://images.unsplash.com/photo-1576091358783-a212ec293ff3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80)'}}>
              <div className='container mx-auto'>
                <div className='grid grid-cols-2 gap-4 place-content-end '>
                  <div className='text-xs mt-32 md:mt-72 lg:mt-96 backdrop-blur-sm bg-white/30 lg:text-3xl text-center max-w-xs py-5 text-blue-900 '>
                    Memenuhi kebutuhan untuk kesehatan anda
                    </div>
                </div>
              </div>
            </div>
            <div className='h-56 sm:h-64 md:h-[500px] xl:h-[650px] bg-cover bg-center' style={{backgroundImage:'url(https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80)'}}>
              <div className='container mx-auto'>
                <div className='grid grid-cols-2 gap-4 place-content-end '>
                  <div className='text-xs mt-32 md:mt-72 lg:mt-96 backdrop-blur-sm bg-white/30 lg:text-3xl px-2 max-w-sm py-5 text-blue-900 '>
                   Terpercaya dengan terdaftarnya kami di BPOM
                    </div>
                </div>
              </div>
            </div>
            <div className='h-56 sm:h-64 md:h-[500px] xl:h-[650px] bg-cover bg-center' style={{backgroundImage:'url(https://images.unsplash.com/photo-1584988299603-3ab9216625bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80)'}}>
              <div className='container mx-auto'>
                <div className='grid grid-cols-2 gap-4 place-content-end '>
                  <div className='text-xs mt-32 md:mt-72 lg:mt-96 backdrop-blur-sm bg-white/30 lg:text-3xl px-2 max-w-sm py-5 text-blue-900 '>
                    Berikan resep anda dan kami akan menyediakannya
                    </div>
                </div>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      
    </div>
  )
}

export default CarouselComponent