<template>
  <div class="flex justify-center flex-row">
    <div class="relative poppins-regular max-w-[1440px] ">
      <Header></Header>
      <slot />
      <Footer></Footer>
      <ToasterAlert></ToasterAlert>
      <Toaster />
    </div>
  </div>
</template>