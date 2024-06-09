<template>
  <div class="flex justify-center flex-row bg-gray-100">
    <div class="relative poppins-regular max-w-[1440px] bg-white ">
      <Header></Header>
      <slot />
      <Footer></Footer>
      <ToasterAlert></ToasterAlert>
      <Toaster />
    </div>
  </div>
</template>